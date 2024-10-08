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
    });

    const processList = (list) => {
      // Split content into paragraphs
      console.log(list[0]?.category, "starts");

      return list.map((x) => {
        const splitContent = x.content.split("\n\n");
        console.log("split content: ", splitContent);
        const mappedContent = splitContent.map((it) => ({ para: it }));
        console.log("mapped content", mappedContent);

        return {
          ...x,
          content: mappedContent,
        };
      });
    };
    // const selectedLis = store.data.filter(
    //   (x) => x.selected_content !== undefined
    // );

    const qualcommLis = store.data
      .filter((x) => x.category == "qualcomm")
      .sort((a, b) => a.priority - b.priority);

    const mediatekLis = store.data
      .filter((x) => x.category == "mediatek")
      .sort((a, b) => a.priority - b.priority);

    const commuLis = store.data
      .filter((x) => x.category == "commu")
      .sort((a, b) => a.priority - b.priority);

    const phoneLis = store.data
      .filter((x) => x.category == "phone")
      .sort((a, b) => a.priority - b.priority);

    const otherLis = store.data
      .filter((x) => x.category == "other")
      .sort((a, b) => a.priority - b.priority);

    const qualcommList = processList(qualcommLis);
    const mediatekList = processList(mediatekLis);
    const commuList = processList(commuLis);
    const phoneList = processList(phoneLis);
    const otherList = processList(otherLis);
    const tolist = [];
    qualcommList.forEach((element) => {
      tolist.push(element.url);
      element.url = "{{url" + count + "}}";
      count++;
    });
    mediatekList.forEach((element) => {
      tolist.push(element.url);
      element.url = "{{url" + count + "}}";
      count++;
    });
    commuList.forEach((element) => {
      tolist.push(element.url);
      element.url = "{{url" + count + "}}";
      count++;
    });
    phoneList.forEach((element) => {
      tolist.push(element.url);
      element.url = "{{url" + count + "}}";
      count++;
    });

    otherList.forEach((element) => {
      tolist.push(element.url);
      element.url = "{{url" + count + "}}";
      count++;
    });

    const data = {
      date: new Date().toISOString().split("T")[0],
      qualcommList: qualcommList,
      mediatekList: mediatekList,
      commuList: commuList,
      phoneList: phoneList,
      otherList: otherList,
    };

    doc.render(data);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

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

      const patchData = {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph({
            children: [
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: url,
                    color: "0563C1",
                    underline: {
                      color: "0563C1",
                    },
                  }),
                ],
                link: url,
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
  <v-toolbar>
    <img class="ml-5" src="/src/32.png" alt="" />
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <p>
      <v-progress-circular
        indeterminate
        v-if="store.isLoading === true"
      ></v-progress-circular
      >{{ store.isLoading === true ? "sending data" : "Standby" }}
    </p>
    <v-spacer></v-spacer>
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
