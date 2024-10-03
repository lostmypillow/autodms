<script setup>
import priortyUpBtn from "./priorityUpBtn.vue";
import priortyDownBtn from "./priorityDownBtn.vue";
import editDialog from "./editDialog.vue";
import editBtn from "./editBtn.vue";
import { store } from "./store.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  connectFirestoreEmulator,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);
// const newDate = new Date();
// const currentYear = newDate.getFullYear().toString();
// const currentDate =
//   String(newDate.getMonth() + 1).padStart(2, "0") +
//   String(newDate.getDate()).padStart(2, "0");
// const collectionName = currentYear + currentDate;
// console.log(collectionName);
const q = query(collection(db, "news"));
const unsub = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("New news content: ", change.doc.data());
      store.data.push(change.doc.data());
      console.log(store.data);
      if (change.doc.data().error) {
        console.log(
          "this is an unsupported link, moving to unsupported: " +
            change.doc.data()
        );
      } 
      // else {
      //   console.log(
      //     "this is a supported link, moving to main store: " + change.doc.data()
      //   );
      // }
    }
    if (change.type === "modified") {
      console.log("Modified city: ", change.doc.data());
      const findIndex = store.data.findIndex(
        (obj) => obj["id"] === change.doc.data()["id"]
      );
      store.data[findIndex] = change.doc.data();
      console.log(store.data);
    }
    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});
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
  <div class="flex md:flex-row flex-col w-full md:w-svw h-svh">
    <v-list class="md:w-1/5 px-4" v-for="i in store.navCategories">
      <v-list-subheader>
        {{ i }}
      </v-list-subheader>
      <v-list-item v-for="n in store.mockData" rounded class="mb-4 px-4 py-2">
        <v-card
          variant="tonal"
          rounded="xl"
          :title="n.priority + '. ' + n.title"
          :subtitle="n.date + ' / ' + n.source"
        >
          <v-card-actions>
            <priortyUpBtn :priority="n.priority" />

            <editBtn />

            <priortyDownBtn
              :priority="n.priority"
              :length="store.mockData.length"
            />
            <!--     @click="store.swapPriorities(n.category, n.priority, 'down')"
               -->

            <v-btn class="ml-0">Category</v-btn>
          </v-card-actions>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>
