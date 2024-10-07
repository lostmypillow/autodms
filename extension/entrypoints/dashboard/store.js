import { reactive } from "vue";
import axios from "axios";
export const store = reactive({
  count: 0,
  isDialogOpen: false,
  data: [],
  isLoading: false,
  currentlyEditing: {},
  mockData: [
    {
      title: "efmekmfkemfkwmefmwefmwemfiwmefwmefmwefmkwefmkwemfkwefkmwkemfkwmf",
      priority: 1,
      date: "2024-09-25",
      source: "imasource",
      author: "imanauthor",
      category: "Qualcomm相關新聞",
    },
  ],
  original: {},
  navCategories: [
    "Qualcomm相關新聞",
    "MediaTek相關新聞",
    "無線通訊市場",
    "智慧型手機",
    "其他業界重要訊息",
  ],
  hasObjectChanged(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return true;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return true;
      }
    }

    return false;
  },
  sendToFunction(url, data) {
    this.isLoading = true;
    axios
      .post(url, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  findObjectIdByUrl(url) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].url === url) {
        return this.data[i].id;
      }
    }
    return null;
  },
  getUDate() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  },
  getByCategory (category) {
    const qcomm = this.data.filter((x) => (x.category == category));
    qcomm.sort((a, b) => a.priority - b.priority);
    return qcomm;
  }
});
