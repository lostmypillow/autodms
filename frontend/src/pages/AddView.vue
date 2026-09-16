<script setup lang="ts">
import { store } from '../store.js'
import { ref } from 'vue'
import ui from 'beercss'

const newArticle = ref({
    title: '',
    date: new Date().toISOString().split('T')[0],
    source: '',
    author: '',
    url: 'https://',
    category: '',
    content: '',
    englishSummaryTitle: '',
    chineseSummaryTitle: '',
    englishSummaryContent: '',
    chineseSummaryContent: '',
})
const responseFromApi = ref()
async function sendData() {
    responseFromApi.value = ''
    try {
        const response = await store.sendManImport(newArticle.value)
        console.log(JSON.stringify(response))
        responseFromApi.value = 'Article added!'
        ui('#snackbar')
        newArticle.value = {
            title: '',
            date: new Date().toISOString().split('T')[0],
            source: '',
            author: '',
            url: 'https://',
            category: 'E',
            content: '',
            englishSummaryTitle: '',
            chineseSummaryTitle: '',
            englishSummaryContent: '',
            chineseSummaryContent: '',
        }
    } catch (e) {
        if (e.response) {
            console.log('Data:', e.response.data)
        }

        if (e.response.data) {
            responseFromApi.value += `${JSON.stringify(e.response.data)}`
        }
        ui('#error-snackbar')
    }
}

const getClipboard = async () => {
    const text = await navigator.clipboard.readText()
    if (new URLPattern().test(text)) {
        newArticle.value.url = text
    }
    const preScrapeResult = (
        await (
            await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/scrape/${encodeURIComponent(text)}`
            )
        ).json()
    )?.result
    if (preScrapeResult) {
        newArticle.value = { ...newArticle.value, ...preScrapeResult }
    }

    // TODO: snackbar notifying pasted content is not link
}
</script>

<template>
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
            align-items: start;
            justify-content: space-between;
        "
    >
        <h6>Manual Import</h6>
        <button @click="sendData"><i>cloud_upload</i>上傳</button>
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
            <input type="text" v-model="newArticle.url" />
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
            <input type="text" v-model="newArticle.title" /><label>標題</label>
        </div>

        <!--                Category start-->

        <!--                 Date picker-->
        <div class="field label border" style="grid-column: span 1">
            <input type="date" v-model="newArticle.date" /><label>Date</label>
        </div>
        <div class="field label border" style="grid-column: span 1">
            <input type="text" v-model="newArticle.author" />

            <label>Author</label>
        </div>
        <div class="field label border" style="grid-column: span 1">
            <input type="text" v-model="newArticle.source" />
            <label>來源</label>
        </div>

        <div class="field label suffix border" style="grid-column: span 1">
            <select v-model="newArticle.category">
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
                v-model="newArticle.content"
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
            <input type="text" v-model="newArticle.chineseSummaryTitle" /><label
                >中文摘要 Title</label
            >
        </div>
        <div class="field label border" style="grid-column: span 4">
            <textarea
                v-model="newArticle.chineseSummaryContent"
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
            <input type="text" v-model="newArticle.chineseSummaryTitle" /><label
                >英文摘要 Title</label
            >
        </div>

        <div class="field label border" style="grid-column: span 4">
            <textarea
                v-model="newArticle.englishSummaryContent"
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
</template>
