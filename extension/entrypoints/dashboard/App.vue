<script setup>
import priortyUpBtn from "./priorityUpBtn.vue";
import priortyDownBtn from "./priorityDownBtn.vue";
import editDialog from "./editDialog.vue";
import { store } from "./store.js";

const currentId = ref("");
function openEditDialog(id) {
  store.isDialogOpen = true;
}

const currentCategoryyy = ref("");

const menuvmodel = ref(null);

const currentCat = ref("Qualcomm相關新聞");
</script>
<template>
  <v-toolbar :elevation="8">
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="tonal" rounded="xl" prepend-icon="mdi-export" class="mr-4"
      >Export</v-btn
    >
  </v-toolbar>
  <editDialog />
  <div class="flex flex-row w-svw h-svh">
    <v-list class="w-1/5" v-for="i in store.navCategories">
      <v-list-subheader>
        {{ i }}
      </v-list-subheader>
      <v-list-item v-for="n in store.mockData" rounded class="mb-4 px-4 py-2">
        <v-card
          variant="tonal"
          rounded="xl"
          :title="n.priority + '.' + n.title"
        >
          <v-card-actions>
            <priortyUpBtn :priority="n.priority" />

            <v-btn
              size="small"
              @click="openEditDialog(n.id)"
              rounded="xl"
              icon="mdi-pencil"
            />

            <priortyDownBtn
              :priority="n.priority"
              :length="store.mockData.length"
            />
            <!--     @click="store.swapPriorities(n.category, n.priority, 'down')"
               -->
          </v-card-actions>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>
