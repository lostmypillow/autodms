<script setup>
const props = defineProps(["isDialogOpen"]);
const currentId = ref("");
let original;
import { store } from "./store.js";
onMounted(() => {

});

const meow = ref(false);
const count = ref(0);
function handleClose() {
  console.log("original: " + original.date);
  console.log("store: " + store.currentlyEditing.date);
  store.isDialogOpen = false;
}
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" persistent>
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between">
        <p class="p-4 text-xl">
          News Content No {{ store.currentlyEditing.id }}
        </p>
        <v-btn
          class="ms-auto font-bold"
          prepend-icon="mdi-close"
          @click="handleClose"
          rounded="xl"
        >
          Close
        </v-btn>
      </div>

      <v-text-field
        class="px-4"
        v-model="store.currentlyEditing.title"
        label="Title"
        @input="console.log('someone touch')"
      ></v-text-field>
      <div class="flex flex-row">
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.date"
          label="Date"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.source"
          label="Source"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.author"
          label="Author"
        ></v-text-field>
        <!-- <v-select
          class="w-fit pl-4"
          label="Category"
          :items="[
            'qualcomm',
            'MediaTek相關新聞',
            '無線通訊市場',
            '智慧型手機/消費性電子產品',
            '其他業界重要訊息',
          ]"
          v-model="currentId"
          variant="underlined"
        ></v-select> -->
        <!--  @update:model-value="
            store.changeCategory(
              currentId,
              store.data.find((x) => x.id == currentId).category
            )
          " -->
      </div>

      <div class="flex flex-row px-4 gap-2">
        <v-text-field
          label="URL"
          v-model="store.currentlyEditing.url"
        ></v-text-field>
        <v-btn
          variant="tonal"
          :href="store.currentlyEditing.url"
          target="_blank"
          rel="noopener noreferrer"
          icon="mdi-web"
        ></v-btn>
      </div>

      <v-textarea
        label="Content"
        v-model="store.currentlyEditing.content"
        name="input-7-1"
        variant="filled"
        class="mx-4"
        auto-grow
      ></v-textarea>
    </v-card>
  </v-dialog>
</template>
