<script setup>
import { store } from "./store.js";
async function handleClose() {
  if (savedChangesExist.value == true) {
    await store.sendEdit("data");
    store.isDialogOpen = false;
    savedChangesExist.value = false;
    console.log("sent to function");
  } else {
    store.isDialogOpen = false;
  }
}

const savedChangesExist = ref(false);
const currentStatus = ref("preview");
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" persistent class="w-4/5">
    <v-card
     
      class="px-8 py-4 w-full flex flex-col gap-4"
      rounded="xl"
    >
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-4 items-center justify-center">
          <p class="text-xl font-bold">Edit</p>
          <v-btn
            class="font-bold"
            variant="outlined"
            :disabled="store.isLoading"
            :loading="store.isLoading"
            @click="
              store.currentlyEditing.selected_content == undefined
                ? store.sendEdit('select')
                : store.sendEdit('unselect')
            "
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

        <v-btn
          class="font-bold"
          prepend-icon="mdi-close"
          color="error"
          @click="handleClose"
          rounded="xl"
          :disabled="store.isLoading"
          :loading="store.isLoading"
        >
          {{ savedChangesExist ? "Save & Close" : "Close" }}
        </v-btn>
      </div>
 
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.title"
          label="Title"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
      
    

      <div class="flex flex-row">
        <v-select
          class="w-fit grow-0 pl-4"
          label="Category"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          :items="['qualcomm', 'mediatek', 'commu', 'phone', 'other']"
          v-model="store.currentlyEditing.category"
          @update:modelValue="
            savedChangesExist === false ? (savedChangesExist = true) : ''
          "
        ></v-select>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.date"
          label="Date"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.source"
          label="Source"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.currentlyEditing.author"
          label="Author"
          variant="outlined"
          :color="currentStatus == 'preview' ? 'warning' : 'success'"
          @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
        ></v-text-field>
      </div>
<div class="flex flex-row">
    <v-text-field
        label="URL"
        class="px-4"
        variant="outlined"
        :color="currentStatus == 'preview' ? 'warning' : 'success'"
        v-model="store.currentlyEditing.url"
        @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
      ></v-text-field>
      <v-btn class="mr-4" icon="mdi-link"  a :href="store.currentlyEditing.url" target="_blank"  rel="noopener noreferrer">

      </v-btn>
</div>
    

      <v-textarea
        label="Content"
        v-model="store.currentlyEditing.content"
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
        v-model="store.currentlyEditing.selected_content"
        label="Marked Content"
        @input="savedChangesExist === false ? (savedChangesExist = true) : ''"
      >
      </v-textarea>
    </v-card>
  </v-dialog>
</template>
