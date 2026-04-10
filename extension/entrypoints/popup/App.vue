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
  <div
    class="w-[300px] h-[400px] flex flex-col items-center justify-center p-4"
  >
    <div class="flex flex-col w-full h-1/2 items-center justify-center gap-4">
      <h1 class="flex text-2xl font-bold">AutoDMS</h1>

      <v-btn
        rounded="xl"
        prepend-icon="mdi-open-in-new"
        href="https://dms-docs.pages.dev/"
        target="_blank"
        rel="noopener noreferrer"
        >Need Help? Read Docs</v-btn
      >

      <v-btn
        rounded="xl"
        prepend-icon="mdi-view-dashboard"
        @click="
          browser.tabs.create({
            url: browser.runtime.getURL('/dashboard.html'),
          })
        "
        >Dashboard</v-btn
      >
    </div>

    <h2 class="text-lg font-semibold">Scan QR Code for LINE Bot:</h2>
    <img src="/line_qr.png" alt="" width="180" height="180" />
  </div>
</template>
