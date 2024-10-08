<script setup>
import axios from "axios";
const props = defineProps(["isDialogOpen"]);
const currentId = ref("");
let original;
import { store } from "./store.js";

const count = ref(0);
function handleClose() {
  if (savedChangesExist.value == true) {
    store.sendEdit("data");
    console.log("sent to function");
  }

  if (!store.isLoading) {
     store.isDialogOpen = false;
  savedChangesExist.value = false;
  }
 
}

const savedChangesExist = ref(false);
const currentStatus = ref("preview");
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" persistent class="w-4/5">
    <v-card
      :border="
        currentStatus == 'preview'
          ? 'opacity-100 warning xl'
          : 'opacity-100 success xl'
      "
      class="px-8 py-4 w-full flex flex-col gap-4"
      rounded="xl"
    >
      <div class="flex flex-row w-full items-center justify-between">
        <v-btn
          class="font-bold"
          prepend-icon="mdi-close"
          @click="handleClose"
          rounded="xl"
          variant="outlined"
          :disabled="store.isLoading"
          :loading="store.isLoading"
        >
          Close
        </v-btn>
        <v-btn-toggle v-model="currentStatus" mandatory rounded="xl">
          <v-btn
            class="font-bold"
            color="warning"
            size="small"
            value="preview"
            :disabled="store.isLoading"
         
          >
            Previewing
          </v-btn>

          <v-btn
            class="font-bold"
            color="success"
            size="small"
            value="edit"
            :disabled="store.isLoading"
           
          >
            Editing
          </v-btn>
        </v-btn-toggle>
        <v-btn
          class="font-bold"
          variant="outlined"
          :disabled="store.isLoading"
          :loading="store.isLoading"
          @click="store.currentlyEditing.selected_content == undefined? store.sendEdit('select'): store.sendEdit('unselect')"

          :prepend-icon="
            store.currentlyEditing.selected_content != undefined
              ? 'mdi-star'
              : 'mdi-star-outline'
          "
          rounded="xl"
          >{{
            store.currentlyEditing.selected_content != undefined
              ? "Selected"
              : "Mark Selected"
          }}</v-btn
        >
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
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          :readonly="currentStatus == 'preview'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
        <v-select
          class="w-fit grow-0 pr-4"
          label="Category"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          :items="['qualcomm', 'mediatek', 'commu', 'phone', 'other']"
          :readonly="currentStatus == 'preview'"
          v-model="store.currentlyEditing.category"
          @update:modelValue="
            savedChangesExist === false ? (savedChangesExist = true) : ''
          "
        ></v-select>
      </div>

      <div class="flex flex-row">
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.date"
          label="Date"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          :readonly="currentStatus == 'preview'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.source"
          label="Source"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          :readonly="currentStatus == 'preview'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.author"
          :readonly="currentStatus == 'preview'"
          label="Author"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
      </div>

      <v-text-field
        label="URL"
        class="px-4"
        variant="outlined"
        :color="currentStatus == 'preview' ? 'warning' : 'success'"
        v-model="store.currentlyEditing.url"
        :readonly="currentStatus == 'preview'"
        @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
      ></v-text-field>

      <v-textarea
        label="Content"
        v-model="store.currentlyEditing.content"
        :readonly="currentStatus == 'preview'"
        variant="outlined"
        :color="currentStatus == 'preview' ? 'warning' : 'success'"
        class="mx-4"
        auto-grow
        @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
      ></v-textarea>

      <v-textarea
        v-if="store.currentlyEditing.selected_content != undefined"
        class="mx-4"
        variant="outlined"
        :color="currentStatus == 'preview' ? 'warning' : 'success'"
        :readonly="currentStatus == 'preview'"
        v-model="store.currentlyEditing.selected_content"
        label="Marked Content"
        @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
      >
      </v-textarea>
      <!-- </div> -->
    </v-card>
  </v-dialog>
</template>
