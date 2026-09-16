import { reactive } from 'vue'
import axios from 'axios'
const editURL = `${import.meta.env.VITE_API_ENDPOINT}/update`
const manualURL = `${import.meta.env.VITE_API_ENDPOINT}/add`
export const store = reactive({
    count: 0,
    isDialogOpen: false,
    isAddDialogOpen: false,
    data: [],
    isLoading: false,
    currentlyEditing: {},
    original: {},
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
    async sync() {
        try {
        const response = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/read/${new Date().toISOString().split('T')[0]}`
        )
        const data = await response.json()
        if (Array.isArray(data)) {
            this.data = data.sort((a, b) => (a.orderKey  < b.orderKey ? -1 : a.orderKey  > b.orderKey  ? 1 : 0))
        }
    } catch (e) {
        console.error('Failed to load data:', e)
    }
    },
    // hasObjectChanged(obj1, obj2) {
    //     const keys1 = Object.keys(obj1)
    //     const keys2 = Object.keys(obj2)

    //     if (keys1.length !== keys2.length) {
    //         return true
    //     }

    //     for (let key of keys1) {
    //         if (obj1[key] !== obj2[key]) {
    //             return true
    //         }
    //     }

    //     return false
    // },
    setCurrentlyEditing(id) {
        this.currentlyEditing = this.data.filter((x) => x.PK === id)[0]
    },
    async sendManImport(data) {
        return await axios.post(manualURL, data)
    },
    async sendHTML(data) {
        this.isLoading = true
        await axios.post(addURL, data)

        this.isLoading = false
    },
    async sendEdit() {
       return await axios.post(editURL, this.currentlyEditing)
    },
    async sendDelete(sk, pk) {
        await axios.delete(
            `${import.meta.env.VITE_API_ENDPOINT}/delete/${sk.split('#')[1]}/${pk.split('#')[1]}`
        )
        await store.sync()
        
    },
    findObjectIdByUrl(url) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].url === url) {
                return this.data[i].id
            }
        }
        return null
    },
    getUDate() {
        const now = new Date()
        const year = now.getUTCFullYear()
        const month = String(now.getUTCMonth() + 1).padStart(2, '0')
        const day = String(now.getUTCDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    },
    getByCategory(category) {
        const qcomm = this.data.filter((x) => x.category == category)
        qcomm.sort((a, b) => (a.orderKey  < b.orderKey ? -1 : a.orderKey  > b.orderKey  ? 1 : 0))
        return qcomm
    },
})
