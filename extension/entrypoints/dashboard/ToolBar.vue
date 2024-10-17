<script setup>
import { store } from "./store.js";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";

import {
  patchDocument,
  PatchType,
  Paragraph,
  ExternalHyperlink,
  TextRun,
} from "docx";

async function generateDocx() {
  let count = 0;
  try {
    const response = await fetch(browser.runtime.getURL("/input.docx"));
    const content = await response.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter() {
        return "";
      },
    });
    const tolist = [];
    const processList = (category) => {
      const list = structuredClone(
        toRaw(store)
          .data.filter((x) => x.category == category)
          .sort((a, b) => a.priority - b.priority)
      );

      // Split content into paragraphs
      console.log(list[0]?.category, "starts");
      console.log(
        list.length > 0 ? list.map((item) => ({ headline: item.title })) : []
      );
      return {
        toc:
          list.length > 0 ? list.map((item) => ({ headline: item.title })) : [],
        data:
          list.length > 0
            ? list.map((x) => {
                const splitContent = x.content.split("\n\n");
                console.log("split content: ", splitContent);
                const mappedContent = splitContent.map((it) => ({ para: it }));
                console.log("mapped content", mappedContent);

                return {
                  ...x,
                  content: mappedContent,
                };
              })
            : [],
      };
    };

    const { toc: qualcommTOCs, data: qualcommList } = processList("qualcomm");
    const { toc: mediatekTOCs, data: mediatekList } = processList("mediatek");
    const { toc: commuTOCs, data: commuList } = processList("commu");
    const { toc: phoneTOCs, data: phoneList } = processList("phone");
    const { toc: otherTOCs, data: otherList } = processList("other");
    // const selectedList = structuredClone(
    //   toRaw(store).data.filter((x) => x.selected_content_chi !== undefined)
    // );

    // selectedList.forEach((element) => {
    //   tolist.push(element.url);
    //   element.url = "{{url" + count + "}}";
    //   count++;
    // });

    if (qualcommList.length > 0) {
      qualcommList.forEach((element) => {
        tolist.push(element.url);
        element.url = "{{url" + count + "}}";
        count++;
      });
    }

    if (mediatekList.length > 0) {
      mediatekList.forEach((element) => {
        tolist.push(element.url);
        element.url = "{{url" + count + "}}";
        count++;
      });
    }

    if (commuList.length > 0) {
      commuList.forEach((element) => {
        tolist.push(element.url);
        element.url = "{{url" + count + "}}";
        count++;
      });
    }
    if (phoneList.length > 0) {
      phoneList.forEach((element) => {
        tolist.push(element.url);
        element.url = "{{url" + count + "}}";
        count++;
      });
    }

    if (otherList.length > 0) {
      otherList.forEach((element) => {
        tolist.push(element.url);
        element.url = "{{url" + count + "}}";
        count++;
      });
    }
    console.log("tolist: ", tolist);
    doc.render({
      date: new Date().toISOString().split("T")[0],
      // selectedList: selectedList,
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
    });

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // saveAs(out, 'debug.docx');
    return [out, tolist];
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
}

async function onFileChange(blob, listOfUrl) {
  if (!blob) {
    alert("Please provide a valid document blob.");
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    const arrayBuffer = e.target.result;
    let patches = {};
    let count = 0;
    for (let url of listOfUrl) {
      const patchName = "url" + count;
      console.log(`dealing with url${count}: ${url}`)
      console.log("url encoded:" + encodeURI(url))

      const patchData = {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph({
            children: [
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: encodeURI(url).replace(/&/g, "&amp;"),
                    color: "0563C1",
                    underline: {
                      color: "0563C1",
                    },
                  }),
                ],
                link: encodeURI(url).replace(/&/g, "&amp;"),
              }),
            ],
          }),
        ],
      };
      count++;
      patches[patchName] = patchData;
    }

    try {
      const doc = await patchDocument(arrayBuffer, {
        patches,
      });

      const patchedBlob = new Blob([doc], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const newfilename =
        new Date().toISOString().split("T")[0] + " Qualcomm DMS.docx";
      saveAs(patchedBlob, newfilename);
    } catch (error) {
      console.error("Error patching document:", error);
    }
  };

  reader.readAsArrayBuffer(blob);
}

async function exportDocx() {
  try {
    const docBlob = await generateDocx();

    if (docBlob[0]) {
      await onFileChange(docBlob[0], docBlob[1]);
    } else {
      console.error("Invalid document blob generated.");
    }
  } catch (error) {
    console.error("Error handling document generation and patching:", error);
  }
}
</script>
<template>
  <v-toolbar elevation="6">
    <v-icon icon="mdi-view-dashboard" class="ml-4"></v-icon>
    <v-toolbar-title class="font-extrabold">
      Dashboard
      <v-btn :prepend-icon="store.isLoading ? 'mdi-sync' : 'mdi-cloud'">{{
        store.isLoading ? "Syncing" : "Synced to Cloud"
      }}</v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn
      variant="tonal"
      rounded="xl"
      prepend-icon="mdi-plus"
      class="mr-4"
      @click="store.isAddDialogOpen = !store.isAddDialogOpen"
      >Manual Import</v-btn
    >

    <v-btn
      variant="tonal"
      rounded="xl"
      prepend-icon="mdi-export"
      class="mr-4"
      @click="exportDocx"
      >Export</v-btn
    >
  </v-toolbar>
</template>
