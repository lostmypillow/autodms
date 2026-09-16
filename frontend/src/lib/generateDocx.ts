import { store } from '../store.js'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import saveAs from 'file-saver'
import { toRaw } from 'vue'
import {
    patchDocument,
    PatchType,
    Paragraph,
    ExternalHyperlink,
    TextRun,
} from 'docx'

async function generateDocx() {
    let count = 0
    try {
        const response = await fetch('/input.docx')
        const content = await response.arrayBuffer()
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            nullGetter() {
                return ''
            },
        })
        const tolist: never[] = []
        const processList = (category) => {
            const list = structuredClone(
                toRaw(store)
                    .data.filter((x) => x.category == category)
                    .sort((a, b) => (a.orderKey  < b.orderKey ? -1 : a.orderKey  > b.orderKey  ? 1 : 0))
            )

            // Split content into paragraphs
            console.log(list[0]?.category, 'starts')
            console.log(
                list.length > 0
                    ? list.map((item) => ({ headline: item.title }))
                    : []
            )
            return {
                toc:
                    list.length > 0
                        ? list.map((item) => ({ headline: item.title }))
                        : [],
                data:
                    list.length > 0
                        ? list.map((x) => {
                              const splitContent = x.content.split('\n\n')
                              console.log('split content: ', splitContent)
                              const mappedContent = splitContent.map((it) => ({
                                  para: it,
                              }))
                              console.log('mapped content', mappedContent)

                              return {
                                  ...x,
                                  content: mappedContent,
                              }
                          })
                        : [],
            }
        }

        const { toc: qualcommTOCs, data: qualcommList } = processList('A')
        const { toc: mediatekTOCs, data: mediatekList } = processList('B')
        const { toc: commuTOCs, data: commuList } = processList('C')
        const { toc: phoneTOCs, data: phoneList } = processList('D')
        const { toc: otherTOCs, data: otherList } = processList('E')
        const selectedList = structuredClone(
            toRaw(store).data.filter(
                (x) => x.selected_content_chi !== undefined
            )
        )

        selectedList.forEach((element) => {
            tolist.push(element.url)
            element.url = '{{url' + count + '}}'
            count++
        })

        if (qualcommList.length > 0) {
            qualcommList.forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
        }

        if (mediatekList.length > 0) {
            mediatekList.forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
        }

        if (commuList.length > 0) {
            commuList.forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
        }
        if (phoneList.length > 0) {
            phoneList.forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
        }

        if (otherList.length > 0) {
            otherList.forEach((element) => {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            })
        }
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

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        // saveAs(out, 'debug.docx');
        return [out, tolist]
    } catch (error) {
        console.error('Error generating document:', error)
        throw error
    }
}

export async function onFileChange(blob, listOfUrl) {
    if (!blob) {
        alert('Please provide a valid document blob.')
        return
    }
    const reader = new FileReader()
    reader.onload = async (e) => {
        const arrayBuffer = e.target.result
        let patches = {}
        let count = 0
        for (let url of listOfUrl) {
            const patchName = 'url' + count
            console.log(`dealing with url${count}: ${url}`)
            console.log('url encoded:' + encodeURI(url))

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
            count++
            patches[patchName] = patchData
        }
        console.log('Array buffer')
        console.log(arrayBuffer instanceof ArrayBuffer)

        try {
            const doc = await patchDocument(arrayBuffer, {
                patches: patches,
                outputType: 'uint8array',
            })
            console.log(doc)

            const patchedBlob = new Blob([doc], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            })
            console.log('patchedBlob')

            const newfilename =
                new Date().toISOString().split('T')[0] + ' Qualcomm DMS.docx'
            saveAs(patchedBlob, newfilename)
        } catch (error) {
            console.error('Error patching document:', error)
            console.error(error.stack)
        }
    }

    reader.readAsArrayBuffer(blob)
}

export async function exportDocx() {
    try {
        const docBlob = await generateDocx()

        if (docBlob[0]) {
            await onFileChange(docBlob[0], docBlob[1])
        } else {
            console.error('Invalid document blob generated.')
        }
    } catch (error) {
        console.error('Error handling document generation and patching:', error)
    }
}
