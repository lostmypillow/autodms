<script setup>
import { store } from "./store.js";
const props = defineProps(["category", "title"]);
const handleEdit = (id) => {
  store.isDialogOpen = !store.isDialogOpen;
  store.setCurrentlyEditing(id);
};
</script>
<template>
  <v-card
    elevation="6"
    class="w-full"
    v-for="n in store.getByCategory(props.category)"
    variant="tonal"
    rounded="xl"
    :title="n.title"
    :subtitle="n.date + ' / ' + n.source + ' / ' + n.author"
  >
    <v-card-actions class="justify-between">
      <div class="flex flex-row items-center justify-center gap-4">
        <v-btn
          prepend-icon="mdi-arrow-up"
          size="small"
          :disabled="n.priority == 1"
          @click="store.sendEdit('priority', n, 'up')"
          :loading="store.isLoading"
          variant="outlined"
          rounded="xl"
          >Move Up</v-btn
        >

        <span class="text-lg">{{ n.priority }}</span>

        <v-btn
          prepend-icon="mdi-arrow-down"
          size="small"
          :disabled="n.priority == store.getByCategory(props.category).length"
          :loading="store.isLoading"
          @click="store.sendEdit('priority', n, 'down')"
          variant="outlined"
          rounded="xl"
          >Move Down</v-btn
        >
      </div>

      <v-btn
        @click="handleEdit(n.id)"
        rounded="xl"
        variant="outlined"
        prepend-icon="mdi-pencil"
        color="primary"
        >Edit</v-btn
      >
      <v-btn
        :loading="store.isLoading"
        rounded="xl"
        color="error"
        prepend-icon="mdi-delete"
        variant="outlined"
        @click="store.sendDelete(n.id)"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
