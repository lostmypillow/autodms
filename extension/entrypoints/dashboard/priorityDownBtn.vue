<script setup>
const props = defineProps(["priority", "length"]);
</script>

<template>
  <v-btn
              icon="mdi-arrow-down"
              size="small"
              :disabled="props.priority == props.length"
            />
</template>
