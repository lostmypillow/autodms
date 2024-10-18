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
const testRef = false;
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" persistent class="w-6/5">
    <v-card class="p-8 w-full flex flex-col gap-4" rounded="xl">
      <!-- Top Bar Start -->
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-4 items-center justify-center">
          <p class="text-2xl font-bold pl-4">Edit</p>
          <v-btn
            class="font-bold mx-4"
            variant="outlined"
            :disabled="store.isLoading"
            :loading="store.isLoading"
            @click="
              store.currentlyEditing.selected_content_chi == undefined
                ? store.sendEdit('select')
                : store.sendEdit('unselect')
            "
            :prepend-icon="
              store.currentlyEditing.selected_content_chi != undefined
                ? 'mdi-star'
                : 'mdi-star-outline'
            "
            rounded="xl"
          >
            {{
              store.currentlyEditing.selected_content_chi != undefined
                ? "已新增 中/英摘"
                : "新增 中/英摘"
            }}
          </v-btn>
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
      <!-- Top Bar End -->
      <!-- Main Content Start -->
      <div class="flex flex-row">
        <!-- Left Start -->
        <div class="flex flex-col gap-4 h-fit w-1/3">
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.title"
            label="Title"
            variant="outlined"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-select
            class="w-full px-4"
            label="Category"
            variant="outlined"
            :items="store.compoundCategories"
            item-title="title"
            item-value="value"
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
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.source"
            label="Source"
            variant="outlined"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.currentlyEditing.author"
            label="Author"
            variant="outlined"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>

          <v-text-field
            label="URL"
            class="px-4"
            variant="outlined"
            v-model="store.currentlyEditing.url"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-text-field>

         
        </div>
        <!-- Left End -->

        <!-- Middle Start -->
        <div
          :class="
            store.currentlyEditing.selected_content_chi == undefined
              ? 'w-2/3'
              : 'w-1/3'
          "
        >
          <v-textarea
            label="Content"
            v-model="store.currentlyEditing.content"
            variant="outlined"
            class="mx-4"
            auto-grow
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-textarea>
        </div>
        <!-- Middle End -->
        <!-- Right Start -->
        <div
          v-if="store.currentlyEditing.selected_content_chi !== undefined"
          class="w-1/3"
        >
          <v-text-field
            v-model="store.currentlyEditing.selected_content_chi_title"
            label="中文摘要 Title"
            class="mx-4"
            variant="outlined"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          />
          <v-textarea
            class="mx-4"
            variant="outlined"
            v-model="store.currentlyEditing.selected_content_chi"
            label="中文摘要"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          >
          </v-textarea>
          <v-text-field
            v-model="store.currentlyEditing.selected_content_eng_title"
            label="英文摘要 Title"
            class="mx-4"
            variant="outlined"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          />
          <v-textarea
            class="mx-4"
            variant="outlined"
            v-model="store.currentlyEditing.selected_content_eng"
            label="英文摘要"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          >
          </v-textarea>
        </div>
        <!-- Right End -->
      </div>
    </v-card>
  </v-dialog>
</template>
