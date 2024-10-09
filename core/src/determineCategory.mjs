export function determineCategory(title) {
  if (!title) return "other";

  const keywordGroups = [
    // Qualcomm-related keywords
    [["高通", "Snapdragon", "驍龍"], "Qualcomm相關新聞"],

    // MediaTek-related keywords
    [
      [
        "聯發科",
        "MediaTek",
        "天璣",
        "Dimensity",
        "蔡力行",
      ],
      "MediaTek相關新聞",
    ],

    // Wireless communications-related keywords
    [
      [
        "6G",
        "無線通訊",
        "頻譜",
        "基頻",
        "無線",
        "射頻",
        "頻率",
        "網路整併",
        "台灣大",
        "基地台",
        "5G",

        "RF晶片",
        "Wi-Fi",
      ],
      "無線通訊市場",
    ],

    // Smartphones, consumer electronics, and other smart devices
    [
      [
        "智慧型手機",
        "手機",
        "平板",
        "智慧手錶",
        "PC",
        "XR",
        "汽車",
        "Exynos",
        "Samsung",
        "Galaxy",
        "Pixel",
        "iPad",
        "華為",
        "三星",
        "折疊手機",
        "Snapdragon 8 Gen",
        "小米",
        "Sony",
        "Nokia",
        "Apple",
        "華為海思",
        "vivo",
        "智慧音訊",
        "Xiaomi",
        "折疊機",
        "iPhone",
        "Mate",
        "Pixel",
      ],
      "智慧型手機/消費性電子產品",
    ],

    // Other important industry news
    [
      [
        "台積電",
        "Intel",
        "英特爾",
        "晶圓",
        "先進製程",
        "晶片",
        "三星",
        "台積",
        "OIP生態系",
        "Lunar Lake",
        "Ryzen",
        "代工",
        "封裝",
        "HBM",
        "SEMICON",
        "AMD",
        "Core Ultra",
        "x86",
        "AI",
        "半導體",
        "晶圓代工",
        "晶圓廠",
        "製程",
        "Altera",
      ],
      "其他業界重要訊息",
    ],
  ];

  for (const [keywords, category] of keywordGroups) {
    if (keywords.some((keyword) => title.includes(keyword))) {
      return category;
    }
  }

  return "other";
}
