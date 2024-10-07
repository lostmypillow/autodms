<script setup>
import { store } from "./store.js";
import priortyUpBtn from "./priorityUpBtn.vue";
import priortyDownBtn from "./priorityDownBtn.vue";
import editBtn from "./editBtn.vue";

const props = defineProps(["category"]);
function handleEdit(id) {
  store.isDialogOpen = true;
  console.log(id);
  const currentDataArr = store.data.filter((x) => x.id === id);
  store.currentlyEditing = currentDataArr[0];
  console.log("currently editing: " + store.currentlyEditing);
}

async function handlePriority(obj, direction) {
  direction == "down"
    ? store.sendToFunction(
        "http://127.0.0.1:5001/compassprdms/asia-east1/priority",
        {
          sourceID: obj.id,
          sourceCategory: obj.category,
          sourcePriority: obj.priority,
          targetPriority: obj.priority + 1,
        }
      )
    : direction == "up"
    ? store.sendToFunction(
        "http://127.0.0.1:5001/compassprdms/asia-east1/priority",
        {
          sourceID: obj.id,
          sourceCategory: obj.category,
          sourcePriority: obj.priority,
          targetPriority: obj.priority - 1,
        }
      )
    : console.log("error");
  store.isLoading = false;
}
</script>
<template>
  <div class="w-1/5 h-full flex flex-col gap-4 items-center justify-start">
    {{ props.category }}
    <v-card
      v-for="n in store.getByCategory(props.category)"
      variant="tonal"
      rounded="xl"
      :title="n.title"
      :subtitle="n.date + ' / ' + n.source + ' / ' + n.author"
    >
      <v-card-actions class="justify-between">
        <priortyUpBtn :priority="n.priority" @click="handlePriority(n, 'up')" />

        <span class="text-lg">{{ n.priority }}</span>

        <priortyDownBtn
          :priority="n.priority"
          :length="store.data.length"
          @click="handlePriority(n, 'down')"
        />
        <editBtn @click="handleEdit(n.id)" />
      </v-card-actions>
    </v-card>
  </div>
</template>
