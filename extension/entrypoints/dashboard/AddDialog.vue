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
function handleSelect() {
  if (toFirebase.value["selected_content_eng"] == undefined) {
    toFirebase.value["selected_content_eng"] = "";
    toFirebase.value["selected_content_chi"] = "";
  } else {
    delete toFirebase.value["selected_content_eng"];
    delete toFirebase.value["selected_content_chi"];
  }
}
async function handleClose() {
  savedChangesExist.value && toFirebase.value.category != ""
    ? await store.sendManImport(toFirebase.value)
    : toFirebase.value.category == ""
    ? (errorText.value = "Category Not Selected")
    : "";
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
  store.isAddDialogOpen = !store.isAddDialogOpen;
}
const savedChangesExist = ref(false);
const errorText = ref("Category Not Selected");
</script>
<template>
  <v-dialog v-model="store.isAddDialogOpen" persistent class="w-6/5">
    <v-card class="p-8 w-full flex flex-col gap-4" rounded="xl">
      <!-- Top Bar Start -->
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-4 items-center justify-center">
          <p class="text-2xl font-bold pl-4">Manual Import</p>
        </div>
        <v-alert
          v-if="toFirebase.category == ''"
          icon="$error"
          text="Category Not Selected"
          rounded="xl"
          class="ml-4 p-4"
          size="small"
          color="error"
        ></v-alert>
        <v-spacer></v-spacer>
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
        <div class="w-1/3">
          <v-text-field
            class="px-4"
            v-model="toFirebase.title"
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
            v-model="toFirebase.category"
            @update:modelValue="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          ></v-select>
          <div class="flex flex-row">
            <v-text-field
              class="px-4"
              v-model="toFirebase.date"
              label="Date"
              variant="outlined"
              @input="
                savedChangesExist === false ? (savedChangesExist = true) : ''
              "
            ></v-text-field>
            <v-text-field
              class="px-4"
              v-model="toFirebase.source"
              label="Source"
              variant="outlined"
              @input="
                savedChangesExist === false ? (savedChangesExist = true) : ''
              "
            ></v-text-field>
            <v-text-field
              class="px-4"
              v-model="toFirebase.author"
              label="Author"
              variant="outlined"
              @input="
                savedChangesExist === false ? (savedChangesExist = true) : ''
              "
            ></v-text-field>
          </div>
          <div class="flex flex-row">
            <v-text-field
              label="URL"
              class="px-4"
              variant="outlined"
              v-model="toFirebase.url"
              @input="
                savedChangesExist === false ? (savedChangesExist = true) : ''
              "
            ></v-text-field>
          </div>

          <v-btn
            class="font-bold ml-4"
            variant="outlined"
            :disabled="store.isLoading"
            :loading="store.isLoading"
            @click="handleSelect"
            :prepend-icon="
              toFirebase.selected_content_chi != undefined
                ? 'mdi-star'
                : 'mdi-star-outline'
            "
            rounded="xl"
            >{{
              toFirebase.selected_content_chi != undefined
                ? "已新增 中/英摘"
                : "新增 中/英摘"
            }}</v-btn
          >
        </div>

        <!-- Left End -->

        <!-- Middle Start -->
        <div
          :class="
            toFirebase.selected_content_chi == undefined ? 'w-2/3' : 'w-1/3'
          "
        >
          <v-textarea
            label="Content"
            v-model="toFirebase.content"
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
        <div v-if="toFirebase.selected_content_chi !== undefined" class="w-1/3">
          <v-text-field
            v-model="toFirebase.selected_content_chi_title"
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
            v-model="toFirebase.selected_content_chi"
            label="中文摘要"
            @input="
              savedChangesExist === false ? (savedChangesExist = true) : ''
            "
          >
          </v-textarea>
          <v-text-field
            v-model="toFirebase.selected_content_eng_title"
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
            v-model="toFirebase.selected_content_eng"
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
