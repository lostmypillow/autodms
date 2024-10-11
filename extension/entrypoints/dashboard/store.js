import { reactive } from "vue";
import axios from "axios";
const editURL = "http://127.0.0.1:5001/compassprdms/asia-east1/update/?id=";
const deleteURL =
  "http://127.0.0.1:5001/compassprdms/asia-east1/deleteDoc/?id=";
const addURL = "http://127.0.0.1:5001/compassprdms/asia-east1/addhtml";
// const editURL = "https://update-ud47er3zea-de.a.run.app";
// const deleteURL = "https://deletedoc-ud47er3zea-de.a.run.app ";
// const addURL = "https://addhtml-ud47er3zea-de.a.run.app";

export const store = reactive({
  count: 0,
  isDialogOpen: false,
  isAddDialogOpen: false,
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
  setCurrentlyEditing(id) {
    this.currentlyEditing = this.data.filter((x) => x.id === id)[0];
  },
  async sendHTML(data) {
  this.isLoading = true
    await axios.post(addURL, data);

    this.isLoading = false;
  },
  async sendEdit(type, obj, direction) {
    this.isLoading = true;
    let response;
    const APIURL =
      type == "priority"
        ? editURL + obj.id + "&edit=" + type
        : editURL + this.currentlyEditing.id + "&edit=" + type;

    try {
      response =
        type == "data"
          ? await axios.post(APIURL, this.currentlyEditing)
          : type == "priority"
          ? await axios.post(APIURL, {
              sourceID: obj.id,
              sourceCategory: obj.category,
              sourcePriority: obj.priority,
              targetPriority:
                direction == "down" ? obj.priority + 1 : obj.priority - 1,
            })
          : await axios.post(APIURL);
    } catch (error) {
      conso;
    }

    type == "select" || type == "unselect"
      ? this.setCurrentlyEditing(this.currentlyEditing.id)
      : "";
    console.log(response);
    this.isLoading = false;
  },
  async sendDelete(id) {
    this.isLoading = true;
    await axios.post(deleteURL + id);
    this.isLoading = false;
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
  getByCategory(category) {
    const qcomm = this.data.filter((x) => x.category == category);
    qcomm.sort((a, b) => a.priority - b.priority);
    return qcomm;
  },
});
