<script setup lang="ts">
import { store } from '../store.js'
import { onUnmounted, ref } from 'vue'
// import ui from 'beercss'
import { useDebounceFn } from '@vueuse/core'
const isSaving = ref(false)
const debouncedFn = useDebounceFn(async() => {
    isSaving.value = true
    console.log(store.currentlyEditing)
    const response = await store.sendEdit()
    store.setCurrentlyEditing(response.data.data.PK)
    await store.sync()

  isSaving.value = false
}, 300)
const responseFromApi = ref()
async function sendData() {
    isSaving.value = true
    console.log(store.currentlyEditing)
    const response = await store.sendEdit()
    console.log(response.data)
   await store.sync()
    isSaving.value = false
  store.isDialogOpen = !store.isDialogOpen

 
}

const getClipboard = async () => {
    const text = await navigator.clipboard.readText()
    if (new URLPattern().test(text)) {
        store.currentlyEditing.value.url = text
    }
    const preScrapeResult = (
        await (
            await fetch(
                `http://${import.meta.env.VITE_API_ENDPOINT}/scrape/${encodeURIComponent(text)}`
            )
        ).json()
    )?.result
    if (preScrapeResult) {
        store.currentlyEditing.value = {
            ...store.currentlyEditing.value,
            ...preScrapeResult,
        }
    }
}
// onUnmounted(async()=> sendData())
</script>

<template>
    <dialog
        :class="store.isDialogOpen ? 'active max' : 'max'"
     
    >
        <div class="snackbar primary top" id="snackbar">
            <span>{{ responseFromApi }}</span>
        </div>

        <div id="error-snackbar" class="snackbar error top">
            {{ responseFromApi }}
        </div>
        <!-- Top Bar Start -->
        <div
            style="
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
                justify-content: space-between;
            "
        >
            <h5>Edit</h5>
           
            <p>{{ isSaving? 'Saving...':  `Last Updated ${new Date(store.currentlyEditing.updatedAt).toLocaleString()}` }}</p>
            <button style="min-width: 90px; justify-content: center;" @click="() =>  sendData()">
           
               <i>close</i>
               Close
               
            </button>
        </div>
        <!-- Top Bar End -->
        <!-- Main Content Start -->
        <div
            style="
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                grid-template-rows: auto; /* Allow rows to shrink to input height */
                align-items: center; /* Align input baselines vertically */
                gap: 4px;
                margin-top: 0.5rem;
                width: 100%;
            "
        >
            <div class="field label border" style="grid-column: span 3">
                <input type="text" v-model="store.currentlyEditing.url"  />
                <label>連結</label>
            </div>
            <button
                class="border"
                style="margin-top: 2px; grid-column: span 1"
                @click="getClipboard"
            >
                <i>content_paste</i>
                <span>直接貼連結</span>
            </button>
            <div
                class="field label border"
                style="margin-top: 16px; grid-column: span 4"
            >
                <input
                    type="text"
                    v-model="store.currentlyEditing.title"
                    @input="debouncedFn"
                /><label>標題</label>
            </div>

            <!--                Category start-->

            <!--                 Date picker-->
            <div class="field label border" style="grid-column: span 1">
                <input
                    type="date"
                    v-model="store.currentlyEditing.date"
                /><label>Date</label>
            </div>
            <div class="field label border" style="grid-column: span 1">
                <input type="text" v-model="store.currentlyEditing.author" />

                <label>Author</label>
            </div>
            <div class="field label border" style="grid-column: span 1">
                <input type="text" v-model="store.currentlyEditing.source" />
                <label>來源</label>
            </div>

            <div class="field label suffix border" style="grid-column: span 1">
                <select v-model="store.currentlyEditing.category">
                    <option
                        v-for="category in store.compoundCategories"
                        :value="category.value"
                    >
                        {{ category.title }}
                    </option>
                </select>
                <label>種類</label>
                <i>arrow_drop_down</i>
            </div>

            <div class="field label border" style="grid-column: span 4">
                <textarea
                    v-model="store.currentlyEditing.content"
                    style="
                        width: 100%;
                        max-width: 100%;
                        box-sizing: border-box;
                        white-space: pre-wrap;
                        word-break: break-word;
                        resize: vertical;
                    "
                ></textarea>
                <label>內容</label>
            </div>

            <div
                class="field label border"
                style="margin-top: 16px; grid-column: span 4"
            >
                <input
                    type="text"
                    v-model="store.currentlyEditing.chineseSummaryTitle"
                /><label>中文摘要 Title</label>
            </div>
            <div class="field label border" style="grid-column: span 4">
                <textarea
                    v-model="store.currentlyEditing.chineseSummaryContent"
                    style="
                        width: 100%;
                        max-width: 100%;
                        box-sizing: border-box;
                        white-space: pre-wrap;
                        word-break: break-word;
                        resize: vertical;
                    "
                ></textarea>
                <label>中文摘要</label>
            </div>
            <div
                class="field label border"
                style="margin-top: 16px; grid-column: span 4"
            >
                <input
                    type="text"
                    v-model="store.currentlyEditing.chineseSummaryTitle"
                /><label>英文摘要 Title</label>
            </div>

            <div class="field label border" style="grid-column: span 4">
                <textarea
                    v-model="store.currentlyEditing.englishSummaryContent"
                    style="
                        width: 100%;
                        max-width: 100%;
                        box-sizing: border-box;
                        white-space: pre-wrap;
                        word-break: break-word;
                        resize: vertical;
                    "
                ></textarea>
                <label>英文摘要</label>
            </div>
        </div>
    </dialog>
</template>
