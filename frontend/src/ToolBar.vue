<script setup>
import {
    ExternalHyperlink,
    Paragraph,
    patchDocument,
    PatchType,
    TextRun,
} from 'docx'
import Docxtemplater from 'docxtemplater'
import saveAs from 'file-saver'
import PizZip from 'pizzip'

import { store } from './store.js'
import { ref } from 'vue'
const exportOpen = ref(false)
const exporting = ref(false)
async function generateDocx() {
    exporting.value = true
    let count = 0
    try {
        const response = await fetch(browser.runtime.getURL('/input.docx'))
        const content = await response.arrayBuffer()
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            nullGetter() {
                return ''
            },
        })
        const tolist = []
        const processList = (category) => {
            const list = structuredClone(
                toRaw(store)
                    .data.filter((x) => x.category == category)
                    .sort((a, b) => a.priority - b.priority)
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
                              console.log('split content:', splitContent)
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

        const { toc: qualcommTOCs, data: qualcommList } =
            processList('qualcomm')
        const { toc: mediatekTOCs, data: mediatekList } =
            processList('mediatek')
        const { toc: commuTOCs, data: commuList } = processList('commu')
        const { toc: phoneTOCs, data: phoneList } = processList('phone')
        const { toc: otherTOCs, data: otherList } = processList('other')
        const selectedList = structuredClone(
            toRaw(store).data.filter(
                (x) => x.selected_content_chi !== undefined
            )
        )

        for (const element of selectedList) {
            tolist.push(element.url)
            element.url = '{{url' + count + '}}'
            count++
        }

        if (qualcommList.length > 0) {
            for (const element of qualcommList) {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            }
        }

        if (mediatekList.length > 0) {
            for (const element of mediatekList) {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            }
        }

        if (commuList.length > 0) {
            for (const element of commuList) {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            }
        }
        if (phoneList.length > 0) {
            for (const element of phoneList) {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            }
        }

        if (otherList.length > 0) {
            for (const element of otherList) {
                tolist.push(element.url)
                element.url = '{{url' + count + '}}'
                count++
            }
        }
        console.log('tolist:', tolist)
        doc.render({
            date: new Date().toISOString().split('T', 1)[0],
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

async function onFileChange(blob, listOfUrl) {
    if (!blob) {
        alert('Please provide a valid document blob.')
        return
    }
    const reader = new FileReader()
    reader.addEventListener('load', async (e) => {
        const arrayBuffer = e.target.result
        const patches = {}
        let count = 0
        for (const url of listOfUrl) {
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
            const doc = await patchDocument({
                data: arrayBuffer,
                patches: patches,
                outputType: 'uint8array',
            })
            console.log(doc)

            const patchedBlob = new Blob([doc], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            })
            console.log('patchedBlob')

            const newfilename =
                new Date().toISOString().split('T', 1)[0] + ' Qualcomm DMS.docx'
            saveAs(patchedBlob, newfilename)
        } catch (error) {
            console.error('Error patching document:', error)
            console.error(error.stack)
        }
    })

    reader.readAsArrayBuffer(blob)
}

async function exportDocx() {
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
    exporting.value = false
    exportOpen.value = !exportOpen.value
}
</script>
<template>
    <v-dialog v-model="exportOpen" class="w-1/2" persistent>
        <v-card class="p-8 flex flex-col gap-4" rounded="xl">
            <div class="flex flex-row items-center justify-between">
                <div
                    class="flex flex-row gap-4 w-full items-center justify-between"
                >
                    <p class="text-2xl font-bold pl-4">Export</p>

                    <v-btn
                        color="error"
                        :loading="exporting"
                        prepend-icon="mdi-close"
                        rounded="xl"
                        @click="exportOpen = !exportOpen"
                        >Close</v-btn
                    >
                </div>
            </div>

            <v-alert color="warning" icon="$warning" rounded="xl"
                >No program is perfect, remember to double check for
                errors!</v-alert
            >

            <v-btn color="primary" rounded="xl" @click="exportDocx"
                >I've double-checked, export to DOCX</v-btn
            >
        </v-card>
    </v-dialog>

    <v-toolbar elevation="6">
        <v-icon class="ml-4" icon="mdi-view-dashboard" />

        <v-toolbar-title class="font-extrabold">
            Dashboard
            <v-btn :prepend-icon="store.isLoading ? 'mdi-sync' : 'mdi-cloud'">{{
                store.isLoading ? 'Syncing' : 'Synced to Cloud'
            }}</v-btn>
        </v-toolbar-title>

        <v-spacer />

        <v-btn
            class="mr-4"
            prepend-icon="mdi-plus"
            rounded="xl"
            variant="tonal"
            @click="store.isAddDialogOpen = !store.isAddDialogOpen"
            >Manual Import</v-btn
        >

        <v-btn
            class="mr-4"
            prepend-icon="mdi-export"
            rounded="xl"
            variant="tonal"
            @click="exportOpen = !exportOpen"
            >Export</v-btn
        >
    </v-toolbar>
</template>
