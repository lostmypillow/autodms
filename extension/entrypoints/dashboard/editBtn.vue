<script setup>
import { store } from "./store.js";
</script>

<template>
  <v-btn
    size="small"
    @click="store.isDialogOpen = true"
    rounded="xl"
    icon="mdi-pencil"
  />
</template>
