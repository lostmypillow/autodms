<script setup>
const props = defineProps(["priority"]);
</script>

<template>
  <v-btn icon="mdi-arrow-up" size="small" :disabled="props.priority == 1" />
  <!--    @click="store.swapPriorities(n.category, n.priority, 'up')" -->
</template>
