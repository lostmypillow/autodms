import { reactive } from "vue";
export const store = reactive({
  count: 0,
  isDialogOpen: false,
  data: [],
  currentlyEditing: {},
  mockData: [
    {
      title: "efmekmfkemfkwmefmwefmwemfiwmefwmefmwefmkwefmkwemfkwefkmwkemfkwmf",
      priority: 1,
      date: '2024-09-25',
      source: 'imasource',
      author: 'imanauthor',
      category: 'Qualcomm相關新聞'
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
    // Check if they have the same keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    // If the number of keys is different, they are not equal
    if (keys1.length !== keys2.length) {
      return true;
    }
  
    // Compare the values of each key
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return true; // Return true if any value is different
      }
    }
  
    return false; // Return false if no differences were found
  }
});
