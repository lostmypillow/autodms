<script setup>
import {store} from './store.js'
import ExportBtn from "./exportBtn.vue";
</script>
<template>
     <v-toolbar >
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <p>{{ store.isLoading === true ? "sending data" : "Standby" }}</p>
    <v-spacer></v-spacer>
    <ExportBtn />
  </v-toolbar>
</template>