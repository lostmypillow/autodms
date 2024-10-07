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
  if (savedChangesExist.value == true) {
    sendToFunction(store.currentlyEditing);
    console.log("sent to function");
  }

  store.isDialogOpen = false;
  savedChangesExist.value = false;
}

const savedChangesExist = ref(false);
const currentStatus = ref("preview");
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" persistent class="w-4/5">
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between">
        <v-btn
          class="font-bold"
          prepend-icon="mdi-close"
          @click="handleClose"
          rounded="xl"
          color="error"
        >
          Close
        </v-btn>
        <span class="text-xs text-center"
          >ID {{ store.currentlyEditing.id }}</span
        >
        <v-btn-toggle
          v-model="currentStatus"
          mandatory
          rounded="xl"
          color="primary"
        >
          <v-btn value="preview"> Preview </v-btn>

          <v-btn value="edit"> Edit </v-btn>
        </v-btn-toggle>

      </div>
      <!-- Preview -->
      <!-- <div v-if="currentStatus == 'preview'" class="px-4">
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
      </div> -->
      <!-- Preview End -->

      <!-- Editing -->
      <!-- <div v-else> -->
        <div class="flex flex-row">
          <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.title"
          label="Title"
          :readonly="currentStatus == 'preview'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
        <v-select
          class="w-fit grow-0 pr-4"
          label="Category"
          :items="[
            'qualcomm',
            'mediatek',
            'commu',
            'phone',
            'other',
          ]"
        
          v-model="store.currentlyEditing.category"
          
    @update:modelValue="savedChangesExist === false ? (savedChangesExist = true) : ''"
        
        ></v-select>
        <v-btn @click="console.log(store.currentlyEditing.category)">Check</v-btn>
        </div>
        
        <div class="flex flex-row">
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.date"
            label="Date"
            :readonly="currentStatus == 'preview'"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.source"
            label="Source"
            :readonly="currentStatus == 'preview'"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.author"
            :readonly="currentStatus == 'preview'"
            label="Author"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <!-- <v-select
          class="w-fit pl-4"
          label="Category"
          :items="[
            'qualcomm',
            'mediatek',
            'commu',
            'phone',
            'other',
          ]"
          v-model="store.currentlyEditing.category"
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
          :readonly="currentStatus == 'preview'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>

        <v-textarea
          label="Content"
          v-model="store.currentlyEditing.content"
          :readonly="currentStatus == 'preview'"
          name="input-7-1"
          variant="filled"
          class="mx-4"
          auto-grow
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-textarea>
      <!-- </div> -->
    </v-card>
  </v-dialog>
</template>
