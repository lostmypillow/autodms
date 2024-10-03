import { reactive } from "vue";
export const store = reactive({
  count: 0,
  isDialogOpen: false,
  data: [],
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
  navCategories: [
    "Qualcomm相關新聞",
    "MediaTek相關新聞",
    "無線通訊市場",
    "智慧型手機",
    "其他業界重要訊息",
  ],
});
