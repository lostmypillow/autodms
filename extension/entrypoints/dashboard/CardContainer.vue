<script setup>
import Cards from './Cards.vue';
</script>
<template>
      <div class="flex md:flex-row flex-col w-full md:w-svw h-svh pt-8 px-4"> <Cards v-for="cat in ['qualcomm', 'mediatek', 'commu', 'phone', 'other']" :category="cat" /></div>
</template>