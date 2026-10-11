import { reactive } from 'vue'
import axios, { type AxiosResponse } from 'axios'

export interface ArticleItem {
    PK: string
    SK: string
    id: string
    title: string
    date: string
    author: string
    source: string
    url: string
    category: string
    content: string
    orderKey: string
    updatedAt: string
    createdAt: string
    chineseSummaryTitle?: string
    chineseSummaryContent?: string
    englishSummaryTitle?: string
    englishSummaryContent?: string
    [key: string]: unknown
}

interface StoreState {
    count: number
    isDialogOpen: boolean
    isAddDialogOpen: boolean
    data: ArticleItem[]
    isLoading: boolean
    currentlyEditing: ArticleItem
    original: ArticleItem
    editDialogRef: HTMLDialogElement | null
    navCategories: string[]
    compoundCategories: Array<{ value: string; title: string }>
    sync(): Promise<void>
    setCurrentlyEditing(id: string | number): void
    sendManImport(data: unknown): Promise<AxiosResponse>
    sendEdit(): Promise<AxiosResponse>
    sendDelete(sk: string, pk: string): Promise<void>
}
export const store = reactive<StoreState>({
    count: 0,
    isDialogOpen: false,
    isAddDialogOpen: false,
    data: [],
    isLoading: false,
    currentlyEditing: {} as ArticleItem,
    original: {} as ArticleItem,
    editDialogRef: null,
    navCategories: [
        'Qualcomm相關新聞',
        'MediaTek相關新聞',
        '無線通訊市場',
        '智慧型手機/消費性電子產品',
        '其他業界重要訊息',
    ],
    compoundCategories: [
        {
            value: 'A',
            title: 'Qualcomm相關新聞',
        },
        {
            value: 'B',
            title: 'MediaTek相關新聞',
        },
        {
            value: 'C',
            title: '無線通訊市場',
        },
        {
            value: 'D',
            title: '智慧型手機/消費性電子產品',
        },
        {
            value: 'E',
            title: '其他業界重要訊息',
        },
    ],
    async sync(): Promise<void> {
        try {
            const response = await fetch(
                `/api/read/${new Date().toISOString().split('T')[0]}`
            )
            const data = await response.json()
            if (Array.isArray(data)) {
                this.data = data.sort((a, b) =>
                    a.orderKey < b.orderKey
                        ? -1
                        : a.orderKey > b.orderKey
                          ? 1
                          : 0
                )
            }
        } catch (e) {
            console.error('Failed to load data:', e)
        }
    },
    setCurrentlyEditing(id) {
        this.currentlyEditing = this.data.filter((x) => x.PK === id)[0] ?? ({} as ArticleItem)
    },
    async sendManImport(data) {
        return await axios.post('/api/add', data)
    },
    async sendEdit() {
        return await axios.post('/api/update', this.currentlyEditing)
    },
    async sendDelete(sk: string, pk:string):Promise<void> {
        await axios.delete(
            `/api/delete/${sk.split('#')[1]}/${pk.split('#')[1]}`
        )
        await store.sync()
    },
})
