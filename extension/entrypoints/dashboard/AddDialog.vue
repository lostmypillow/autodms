<script setup>
import { store } from "./store.js";
const toFirebase = ref({
  title: "",
  date: "",
  source: "",
  author: "",
  url: "",
  category: "",
  content: "",
});
const contentUpdated = ref(false);
function handleClose() {
  store.isAddDialogOpen = !store.isAddDialogOpen;
  toFirebase.value = {
    title: "",
    date: "",
    source: "",
    author: "",
    url: "",
    category: "",
    content: "",
  };
  contentUpdated.value = false;
}
</script>
<template>
  <v-dialog v-model="store.isAddDialogOpen" persistent class="w-4/5">
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between mb-4">
        <p class="text-xl font-bold">Manual Import</p>
        <v-btn
          color="error"
          prepend-icon="mdi-close"
          rounded="xl"
          @click="handleClose"
          >{{ contentUpdated ? "Close & Import" : "Close" }}</v-btn
        >
      </div>

      <v-text-field
        autofocus
        label="Link"
        v-model="toFirebase.url"
        name="input-7-1"
        variant="outlined"
        class="w-full"
        @input="contentUpdated === false ? (contentUpdated = true) : ''"
      />
      <div class="flex flex-row w-full gap-4">
        <v-text-field
          class="w-full"
          v-model="toFirebase.title"
          label="title"
          variant="outlined"
          @input="contentUpdated === false ? (contentUpdated = true) : ''"
        ></v-text-field>
        <v-select
          class="w-fit grow-0 pr-4"
          label="Category"
          variant="outlined"
          :items="store.navCategories"
          v-model="toFirebase.category"
          @change="contentUpdated === false ? (contentUpdated = true) : ''"
        ></v-select>
      </div>
      <div class="flex w-full flex-row gap-4">
        <v-text-field
          v-model="toFirebase.date"
          label="date"
          variant="outlined"
          @input="contentUpdated === false ? (contentUpdated = true) : ''"
        ></v-text-field>
        <v-text-field
          v-model="toFirebase.source"
          label="source"
          variant="outlined"
          @input="contentUpdated === false ? (contentUpdated = true) : ''"
        ></v-text-field>
        <v-text-field
          v-model="toFirebase.author"
          label="author"
          variant="outlined"
          @input="contentUpdated === false ? (contentUpdated = true) : ''"
        ></v-text-field>
      </div>

      <v-textarea
        label="Content"
        v-model="toFirebase.content"
        name="input-7-1"
        variant="outlined"
        class="w-full"
        @input="contentUpdated === false ? (contentUpdated = true) : ''"
      ></v-textarea>
    </v-card>
  </v-dialog>
</template>
