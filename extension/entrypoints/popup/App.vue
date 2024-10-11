<script lang="ts" setup>
const tab = ref(null);
const toFirebase = ref({
  title: "",
  date: "",
  source: "",
  author: "",
  url: "",
  category: "",
  content: "",
});
function handleClick() {
  browser.runtime.sendMessage({ action: "importFull", data: toFirebase.value });

}
const navCategories = [
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機",
  "其他業界重要訊息",
];
const isImporting = ref(false);
const importType = ref("link");
const dialog = ref(false);

</script>

<template>
  <div class="w-[200px] h-[200px] flex flex-col items-center justify-center">

      <!-- <div class="flex flex-col w-full h-1/2 items-center justify-center">
        <v-btn size="large" rounded="xl" @click="dialog = true">Import</v-btn>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          sunt animi eius at saepe quo distinctio harum odio voluptatum,
          similique, totam impedit nihil a nobis, doloribus culpa hic itaque
          inventore!
        </p>
      </div> -->

      <div class="flex flex-col w-full h-1/2 items-center justify-center gap-4">
        <h1 class="text-2xl font-bold">JDMS</h1>
        <v-btn
       
          rounded="xl"
          @click="
            browser.tabs.create({
              url: browser.runtime.getURL('/dashboard.html'),
              
            })
          "
          >Dashboard ></v-btn
        >
      </div>
    </div>

    <!-- <div
 
      class="h-full w-full top-0 z-500 absolute bg-black p-4"
    >
      <div class="flex flex-row w-full items-center justify-between mb-4">
        <v-btn  variant="tonal" prepend-icon="mdi-close" rounded="xl" @click="dialog = false">Close</v-btn>
        <p class="text-xl font-bold">Import</p>
        <v-btn
          prepend-icon="mdi-send"
         
          rounded="xl"
          @click="handleClick"
          :loading="isImporting"
          >Import</v-btn
        >
      </div>

      <v-text-field
        autofocus
        label="Link"
        v-model="toFirebase.url"
        name="input-7-1"
        variant="filled"
        class="w-full"
      />
      <v-text-field
        class="w-full"
        v-model="toFirebase.title"
        label="title"
      ></v-text-field>

      <div class="flex w-full flex-row gap-4">
        <v-text-field v-model="toFirebase.date" label="date"></v-text-field>
        <v-text-field v-model="toFirebase.source" label="source"></v-text-field>
        <v-text-field v-model="toFirebase.author" label="author"></v-text-field>
      </div>
      <v-select
        label="Category"
        :items="navCategories"
        v-model="toFirebase.category"
      ></v-select>
      <v-textarea
        label="Content"
        v-model="toFirebase.content"
        name="input-7-1"
        variant="filled"
        class="w-full"
      ></v-textarea>
    </div> -->

</template>
