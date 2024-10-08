import { reactive } from "vue";
import axios from "axios";
// const editURL = "http://127.0.0.1:5001/compassprdms/asia-east1/update";
// const deleteURL = "http://127.0.0.1:5001/compassprdms/asia-east1/deleteDoc";
// const addURL = "http://127.0.0.1:5001/compassprdms/asia-east1/addhtml";
const editURL = "https://update-ud47er3zea-de.a.run.app";
const deleteURL = "https://deletedoc-ud47er3zea-de.a.run.app ";
const addURL = "https://addhtml-ud47er3zea-de.a.run.app";

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
  setCurrentlyEditing(id) {
    this.isDialogOpen = !this.isDialogOpen;
    this.currentlyEditing = this.data.filter((x) => x.id === id)[0];
  },
  sendHTML(data) {
    this.isLoading = true;
    axios
      .post(addURL, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.isLoading = false;
  },
  sendEdit(type, obj, direction) {
    this.isLoading = true;
    if (type == "data") {
      axios
        .post(
          editURL + "?id=" + this.currentlyEditing.id + "&edit=" + type,
          this.currentlyEditing
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type == "priority") {
      const sendObj =
        direction == "down"
          ? {
              sourceID: obj.id,
              sourceCategory: obj.category,
              sourcePriority: obj.priority,
              targetPriority: obj.priority + 1,
            }
          : {
              sourceID: obj.id,
              sourceCategory: obj.category,
              sourcePriority: obj.priority,
              targetPriority: obj.priority - 1,
            };
      axios
        .post(
          "http://127.0.0.1:5001/compassprdms/asia-east1/update/?id=" +
            obj.id +
            "&edit=" +
            type,
          sendObj
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type == "select") {
      axios
        .post(editURL + "/?id=" + this.currentlyEditing.id + "&edit=" + type, {
          selected_content: "",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.currentlyEditing = this.data.filter(
        (x) => x.id === this.currentlyEditing.id
      )[0];
    } else if ((type = "unselect")) {
      axios
        .post(editURL + "?id=" + this.currentlyEditing.id + "&edit=" + type)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.currentlyEditing = this.data.filter(
        (x) => x.id === this.currentlyEditing.id
      )[0];
    }
    this.isLoading = false;
  },
  sendDelete(id) {
    this.isLoading = true;
    axios
      .post(deleteURL + "?id=" + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
