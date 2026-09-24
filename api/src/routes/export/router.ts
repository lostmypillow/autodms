import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import {
    patchDocument,
    PatchType,
    Paragraph,
    ExternalHyperlink,
    TextRun,
    type IPatch,
} from 'docx'
import { Router } from 'express'
import type { Request, Response } from 'express'
import { docClient } from '../../lib/initTable.js'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { readFile } from 'node:fs/promises'
import type { DbArticleResult } from '../../schemas/schemas.js'
import path from 'node:path'
const tableName: string = process.env['TABLE_NAME'] || ''

// Returns a Node.js Buffer

const router = Router()
router.get('/:targetDate', async (req: Request, res: Response) => {
    try {
        const params = req.params
        const docsToExportResult = await docClient.send(
            new ScanCommand({
                TableName: tableName,
                FilterExpression: 'SK = :sortkey',
                ExpressionAttributeValues: {
                    ':sortkey': `DATE#${params.targetDate}`,
                },
            })
        )
        if (!docsToExportResult.Items) {
            return res.json({ status: 'empty db results' })
        }

        const docsToExport =
            (docsToExportResult.Items as DbArticleResult[]) ?? []

        let count = 0
        const content: Buffer = await readFile(
            path.join(import.meta.dirname, './input.docx')
        )
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            nullGetter() {
                return ''
            },
        })
        const tolist: string[] = []
        const selectedList = docsToExport.filter(
            (x) => x.chineseSummaryContent !== undefined
        )
        docsToExport
            .filter((x) => x.chineseSummaryContent !== '')
            .forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
        const processList = (category: 'A' | 'B' | 'C' | 'D' | 'E') => {
            const list = docsToExport
                .filter((x) => x.category == category)
                .sort((a, b) =>
                    a.orderKey < b.orderKey
                        ? -1
                        : a.orderKey > b.orderKey
                          ? 1
                          : 0
                )
            const toc =
                list.length > 0
                    ? list.map((item) => ({ headline: item.title }))
                    : []

            const data =
                list.length > 0
                    ? list.map((x) => {
                          const splitContent = x.content.split('\n\n')
                          const mappedContent = splitContent.map((it) => ({
                              para: it,
                          }))
                          return {
                              ...x,
                              content: mappedContent,
                          }
                      })
                    : []
            data.forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
            return {
                toc: toc,
                data: data,
            }
        }

        const { toc: qualcommTOCs, data: qualcommList } = processList('A')
        const { toc: mediatekTOCs, data: mediatekList } = processList('B')
        const { toc: commuTOCs, data: commuList } = processList('C')
        const { toc: phoneTOCs, data: phoneList } = processList('D')
        const { toc: otherTOCs, data: otherList } = processList('E')

        doc.render({
            date: new Date().toISOString().split('T')[0],
            selectedList: selectedList,
            qualcommTOCs: qualcommTOCs,
            mediatekTOCs: mediatekTOCs,
            commuTOCs: commuTOCs,
            phoneTOCs: phoneTOCs,
            otherTOCs: otherTOCs,
            qualcommList: qualcommList,
            mediatekList: mediatekList,
            commuList: commuList,
            phoneList: phoneList,
            otherList: otherList,
        })

        const generatedBuffer = doc.getZip().generate({
            type: 'nodebuffer',
            mimeType:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        const patches: Record<string, IPatch> = {}
        let patchCount = 0
        for (const url of tolist) {
            const patchData = {
                type: PatchType.DOCUMENT,
                children: [
                    new Paragraph({
                        children: [
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: encodeURI(url).replace(
                                            /&/g,
                                            '&amp;'
                                        ),
                                        color: '0563C1',
                                        underline: {
                                            color: '0563C1',
                                        },
                                    }),
                                ],
                                link: encodeURI(url).replace(/&/g, '&amp;'),
                            }),
                        ],
                    }),
                ],
            }
            patchCount++
            patches[`url${patchCount}`] = patchData
        }
        const docUint8Array = await patchDocument({
            data: generatedBuffer,
            patches: patches,
            outputType: 'uint8array',
        })

        const datePrefix = new Date().toISOString().split('T')[0]
        const filename = `${datePrefix} Qualcomm DMS.docx`

        // Convert Uint8Array to Node.js Buffer (zero-copy view)
        const fileBuffer = Buffer.from(
            docUint8Array.buffer,
            docUint8Array.byteOffset,
            docUint8Array.byteLength
        )

        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')

        // Set Headers
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

        // Include encodeURIComponent for full browser compatibility
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
        )

        res.setHeader('Content-Length', fileBuffer.length)

        // Send binary payload
        return res.end(fileBuffer)
    } catch (error) {
        console.error('Error handling document generation and patching:', error)
        return res.json({ status: 'failed' })
    }
})
export default router
