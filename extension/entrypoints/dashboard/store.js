import { reactive } from "vue";
export const store = reactive({
  count: 0,
  isDialogOpen: false,
  mockData: [
    {
      title: "efmekmfkemfkwmefmwefmwemfiwmefwmefmwefmkwefmkwemfkwefkmwkemfkwmf",
      priority: 1,
    },
    { title: "imtitle", priority: 2 },
    { title: "imtitle", priority: 3 },
    { title: "imtitle", priority: 4 },
    { title: "imtitle", priority: 5 },
    { title: "imtitle", priority: 6 },
    { title: "imtitle", priority: 7 },

    { title: "imtitle", priority: 8 },
    { title: "imtitle", priority: 9 },
    { title: "imtitle", priority: 10 },

    { title: "imtitle", priority: 11 },
  ],
  navCategories: [
    "Qualcomm相關新聞",
    "MediaTek相關新聞",
    "無線通訊市場",
    "智慧型手機",
    "其他業界重要訊息",
  ],
});
