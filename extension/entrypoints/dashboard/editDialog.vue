<script setup>
import axios from "axios";
const props = defineProps(["isDialogOpen"]);
const currentId = ref("");
let original;
import { store } from "./store.js";
const sendToFunction = (data) => {
  axios
    .post("http://127.0.0.1:5001/compassprdms/asia-east1/update", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const count = ref(0);
function handleClose() {
  if (savedChangesExist.value) {
    sendToFunction(store.currentlyEditing);
    console.log("sent to function");
  }

  store.isDialogOpen = false;
  savedChangesExist.value = false;
}
function handleEdit() {
  isEditing.value = !isEditing.value;
  savedChangesExist.value == false ? (savedChangesExist.value = true) : "";
}
const isEditing = ref(false);
const savedChangesExist = ref(false);
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" persistent>
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between">
        <v-btn
          class="font-bold"
          prepend-icon="mdi-close"
          @click="handleClose"
          rounded="xl"
          :disabled="isEditing"
          color="error"
        >
          Close
        </v-btn>
        <div class="p-4 text-xl text-center">
          {{ isEditing ? "Editing" : "Previewing" }} News Content
          <span class="text-xs">{{ store.currentlyEditing.id }}</span>
        </div>

        <v-btn
          :prepend-icon="isEditing ? 'mdi-floppy' : 'mdi-pen'"
          class="font-bold"
          rounded="xl"
          :color="isEditing ? 'warning' : ''"
          @click="handleEdit"
          >{{ isEditing ? "Save Changes" : "Edit This" }}</v-btn
        >
      </div>
      <!-- Preview -->
      <div v-if="!isEditing" class="px-4">
        <p class="text-lg">
          {{ store.currentlyEditing.title }}
          <br />
          {{ store.currentlyEditing.date }} /
          {{ store.currentlyEditing.source }} /
          {{ store.currentlyEditing.author }}
        </p>
        <a
          :href="store.currentlyEditing.url"
          class="underline text-blue text-lg"
          >{{ store.currentlyEditing.url }}</a
        >
        <p
          v-html="store.currentlyEditing.content.replace(/\n/g, '<br>')"
          class="text-lg"
        ></p>
      </div>
      <!-- Preview End -->

      <!-- Editing -->
      <div v-else>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.title"
          label="Title"
          @input="savedChangesExist !== false ? (savedChangesExist = true) : ''"
        ></v-text-field>

        <div class="flex flex-row">
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.date"
            label="Date"
            @input="
              savedChangesExist !== false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.source"
            label="Source"
            @input="
              savedChangesExist !== false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.author"
            label="Author"
            @input="
              savedChangesExist !== false ? (savedChangesExist = true) : ''
            "
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

        <v-text-field
          label="URL"
          class="px-4"
          v-model="store.currentlyEditing.url"
          @input="savedChangesExist !== false ? (savedChangesExist = true) : ''"
        ></v-text-field>

        <v-textarea
          label="Content"
          v-model="store.currentlyEditing.content"
          name="input-7-1"
          variant="filled"
          class="mx-4"
          auto-grow
          @input="savedChangesExist !== false ? (savedChangesExist = true) : ''"
        ></v-textarea>
      </div>
    </v-card>
  </v-dialog>
</template>
