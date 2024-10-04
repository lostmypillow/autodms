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
import axios from "axios";
const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};
function sendToFunction(url, data) {
  axios
    .post(url, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);
function getUTCDate() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // YYYY-MM-DD format
}
function findObjectIdByUrl(objects, url) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].url === url) {
      return objects[i].id;
    }
  }
  return null; // Return null if no object with matching URL is found
}

const q = query(collection(db, getUTCDate()));
const unsub = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("New news content: ", change.doc.data());
      store.data.push(change.doc.data());
      console.log(store.data);
      if (change.doc.data().error) {
        console.log("this is an unsupported link, triggering background: ");
        chrome.runtime.sendMessage({action: 'importFromDash', data: change.doc.data()});
      }
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
      const index = store.data.findIndex(
        (item) => item.id === change.doc.data().id
      );
      if (index !== -1) {
        store.data.splice(index, 1);
      }
    }
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "HTMLFromContent") {
  browser.tabs.remove(sender.tab.id);
const objectId = findObjectIdByUrl(store.data, message.url);

sendToFunction("http://127.0.0.1:5001/compassprdms/asia-east1/addexthtml", {id: objectId, url: message.url, html:message.html})
  }
}) 



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
