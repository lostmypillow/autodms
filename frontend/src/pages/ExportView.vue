<script setup lang="ts">
import { saveAs } from 'file-saver'
import { store } from '../store.js'
let count = 0
const tolist: string[] = []
const selectedList = store.data.filter(
    (x) => x.chineseSummaryContent !== undefined
)
const processList = (category: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const list = store.data
        .filter((x) => x.category == category)
        .sort((a, b) =>
            a.orderKey < b.orderKey ? -1 : a.orderKey > b.orderKey ? 1 : 0
        )
    const toc =
        list.length > 0 ? list.map((item) => ({ headline: item.title })) : []

    const data =
        list.length > 0
            ? list.map((x) => {
                  const splitContent = x.content.split('\n\n')
                  const mappedContent = splitContent.map((it) => ({
                      para: it,
                  }))
                  return {
                      ...x,
                      content: mappedContent,
                  }
              })
            : []
    return {
        toc: toc,
        data: data,
    }
}

const { toc: qualcommTOCs, data: qualcommList } = processList('A')
const { toc: mediatekTOCs, data: mediatekList } = processList('B')
const { toc: commuTOCs, data: commuList } = processList('C')
const { toc: phoneTOCs, data: phoneList } = processList('D')
const { toc: otherTOCs, data: otherList } = processList('E')

async function exportDocx() {
    try {
        const getDoc = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/export/${new Date().toISOString().split('T')[0]}`
        )
        saveAs(
            await getDoc.blob(),
            getDoc.headers
                .get('content-disposition')
                ?.split(';')[1]
                .replaceAll('"', '')
                .split('=')[1] ?? 'download.docx'
        )
    } catch (error) {
        console.error('Error handling document generation and patching:', error)
    }
}
</script>
<template>
    <div
        style="
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: start;
            justify-content: space-between;
        "
    >
        <h5>輸出預覽</h5>
        <div>
            <button @click="exportDocx" rounded="xl" color="primary">
                Export to DOCX
            </button>
        </div>
    </div>
    <h6>{{ new Date().toISOString().split('T')[0] }} Daily Media Scan</h6>
    <article>
        <h6>Qualcomm相關新聞</h6>
        <p v-for="h in qualcommTOCs">
            {{ h.headline }}
        </p>
        <h6>MediaTek相關新聞</h6>
        <p v-for="h in mediatekTOCs">
            {{ h.headline }}
        </p>
        <h6>無線通訊市場</h6>
        <p v-for="h in commuTOCs">{{ h.headline }}</p>
        <h6>智慧型手機/消費性電子產品</h6>
        <p v-for="h in phoneTOCs">{{ h.headline }}</p>
        <h6>其他業界重要訊息</h6>
        <p v-for="h in otherTOCs">{{ h.headline }}</p>
    </article>
    <article>
        <h6>Qualcomm相關新聞</h6>
        <hr />
        <div v-for="article in qualcommList">
            <h6>{{ article.title }}</h6>
            <p>
                {{ article.date }} / {{ article.source }} / {{ article.author }}
            </p>
            <a :href="article.url">{{ article.url }}</a>
            <p v-for="x in article.content[0].para.split('\n')">{{ x }}</p>
        </div>
    </article>
    <article>
        <h6>MediaTek相關新聞</h6>
        <hr />
        <div v-for="article in mediatekList">
            <h6>{{ article.title }}</h6>
            <p>
                {{ article.date }} / {{ article.source }} / {{ article.author }}
            </p>
            <a :href="article.url">{{ article.url }}</a>
            <p v-for="x in article.content[0].para.split('\n')">{{ x }}</p>
        </div>
    </article>
    <article>
        <h6>無線通訊市場</h6>
        <hr />
        <div v-for="article in commuList">
            <h6>{{ article.title }}</h6>
            <p>
                {{ article.date }} / {{ article.source }} / {{ article.author }}
            </p>
            <a :href="article.url">{{ article.url }}</a>
            <p v-for="x in article.content[0].para.split('\n')">{{ x }}</p>
        </div>
    </article>
    <article>
        <h6>智慧型手機/消費性電子產品</h6>
        <hr />
        <div v-for="article in phoneList">
            <h6>{{ article.title }}</h6>
            <p>
                {{ article.date }} / {{ article.source }} / {{ article.author }}
            </p>
            <a :href="article.url">{{ article.url }}</a>
            <p v-for="x in article.content[0].para.split('\n')">{{ x }}</p>
        </div>
    </article>
    <article>
        <h6>其他業界重要訊息</h6>
        <hr />
        <div v-for="article in otherList">
            <h6>{{ article.title }}</h6>
            <p>
                {{ article.date }} / {{ article.source }} / {{ article.author }}
            </p>
            <a :href="article.url">{{ article.url }}</a>
            <p v-for="x in article.content[0].para.split('\n')">{{ x }}</p>
        </div>
    </article>
</template>
