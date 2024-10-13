<script setup>
import Cards from "./Cards.vue";
import {store} from './store.js'
</script>
<template>
  <div class="flex md:flex-row flex-col w-full md:w-svw h-svh pt-8 px-4">
    <Cards
      v-for="x in store.compoundCategories"
      :category="x.value"
      :title="x.title"
    />
  </div>
</template>
