<script setup>
import Cards from "./Cards.vue";
import { store } from "./store.js";
const props = defineProps(["category"]);
</script>
<template>
  <div
    class="w-full h-full flex flex-col gap-6 items-center justify-start p-6"
  >
    <Cards :category="props.category" />
  </div>
</template>
