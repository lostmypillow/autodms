export function determineCategory(title) {
  if (!title) return "other";

  const keywordGroups = [
    // Qualcomm-related keywords
    [
      [
        "高通",
        "Snapdragon",
        "驍龍",
        "Qualcomm",
        "Adreno",
        "Hexagon",
        "Spectra",
      ],
      "Qualcomm相關新聞",
    ],

    // "MediaTek相關新聞"
    [
      [
        "聯發科",
        "MediaTek",
        "天璣",
        "Dimensity",
        "蔡力行",
        "Helio",
        "MiraVision",
        "NeuroPilot",
        "AI Processing Unit",
      ],
      "mediatek",
    ],

    // "無線通訊市場"
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
        "Sub-6",
        "毫米波",
        "NB-IoT",
        "VoLTE",
        "衛星通訊",
      ],
      "commu",
    ],

    // "智慧型手機/消費性電子產品"
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
        "iPad",
        "華為",
        "三星",
        "折疊手機",
        "小米",
        "Sony",
        "Nokia",
        "Apple",
        "華為",
        "vivo",
        "智慧音訊",
        "Xiaomi",
        "折疊機",
        "iPhone",
        "Mate",
        "Pixel",
        "OPPO",
        "Realme",
        "Honor",
        "OnePlus",
        "車聯網",
        "智慧家居",
      ],
      "phone",
    ],

    // "其他業界重要訊息"
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
        "ARM",
        "RISC-V",
        "台灣IC設計",
        "英飛凌",
        "高效能計算",
        "電子設計自動化",
      ],
      "other",
    ],
  ];

  for (const [keywords, category] of keywordGroups) {
    if (keywords.some((keyword) => title.includes(keyword))) {
      return category;
    }
  }

  return "other";
}
