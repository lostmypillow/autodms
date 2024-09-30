<script setup>
const props = defineProps(["isDialogOpen"]);
const currentId = ref("");
import { store } from "./store.js";
</script>

<template>
  <v-dialog v-model="store.isDialogOpen">
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between">
        <p class="p-4 text-xl">News Content No</p>
        <v-btn
          class="ms-auto font-bold"
          prepend-icon="mdi-close"
          @click="store.isDialogOpen = false"
          rounded="xl"
        >
          Close
        </v-btn>
      </div>

      <v-text-field
        class="px-4"
        v-model="currentId"
        label="Title"
      ></v-text-field>
      <div class="flex flex-row">
        <v-text-field
          class="px-4"
          v-model="currentId"
          label="Date"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="currentId"
          label="Source"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="currentId"
          label="Author"
        ></v-text-field>
        <v-select
          class="w-fit pl-4"
          label="Category"
          :items="[
            'Qualcomm相關新聞',
            'MediaTek相關新聞',
            '無線通訊市場',
            '智慧型手機/消費性電子產品',
            '其他業界重要訊息',
          ]"
          v-model="currentId"
          variant="underlined"
        ></v-select>
        <!--  @update:model-value="
            store.changeCategory(
              currentId,
              store.data.find((x) => x.id == currentId).category
            )
          " -->
      </div>

      <div class="flex flex-row px-4 gap-2">
        <v-text-field v-model="currentId"></v-text-field>
        <v-btn
          variant="tonal"
          :href="currentId"
          target="_blank"
          rel="noopener noreferrer"
          icon="mdi-web"
        ></v-btn>
      </div>

      <v-textarea
        label="Content"
        v-model="currentId"
        name="input-7-1"
        variant="filled"
        class="mx-4"
        auto-grow
      ></v-textarea>
    </v-card>
  </v-dialog>
</template>
