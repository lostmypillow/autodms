export function determineCategory(title) {
    switch (true) {
      case title.includes("高通"):
        return "Qualcomm相關新聞";
  
      case title.includes("聯發科"):
        return "MediaTek相關新聞";
  
      case title.includes("5G"):
        return "無線通訊市場";
  
      case title.includes("OPPO") || title.includes("PC"):
        return "智慧型手機/消費性電子產品";
  
      default:
        return "其他業界重要訊息";
    }
  }