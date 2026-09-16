<script setup lang="ts">
import { store } from '../store.js'
import { onMounted } from 'vue'
import CategoryColumns from '../components/CategoryColumns.vue'

//
// const q = query(collection(db, store.getUDate()))
// const unsub = onSnapshot(q, (snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//         store.isLoading = true
//         const docData = change.doc.data()
//         if (change.doc.metadata.hasPendingWrites) {
//             console.log('Local change detected, skipping')
//             return
//         }
//
//         if (change.type === 'added') {
//             store.data.push(docData)
//             store.isLoading = false
//             if (docData.error) {
//                 store.isLoading = true
//                 console.log(
//                     'this is an unsupported link, triggering background: '
//                 )
//                 chrome.runtime.sendMessage({
//                     action: 'importFromDash',
//                     data: docData,
//                 })
//             }
//         }
//         if (change.type === 'modified') {
//             const findIndex = store.data.findIndex(
//                 (obj) => obj['id'] === docData['id']
//             )
//             store.data[findIndex] = docData
//         }
//         if (change.type === 'removed') {
//             const index = store.data.findIndex((item) => item.id === docData.id)
//             if (index !== -1) {
//                 store.data.splice(index, 1)
//             }
//         }
//         store.isLoading = false
//     })
// })

// browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "HTMLFromContent") {
//     // setTimeout(loopInfo(1, false), 1500)
//     // browser.tabs.remove(sender.tab.id);
//     store.sendHTML({
//       id: store.findObjectIdByUrl(message.url),
//       url: message.url,
//       html: message.html,
//     });
//   }
// });

onMounted(async () => await store.sync())
</script>
<template>
    <div
        style="
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 1rem;
            align-items: start;
        "
    >
        <button v-for="x in store.compoundCategories" :value="x.value">
            {{ x.title }}
        </button>     
        

        <CategoryColumns />
    </div>
</template>
