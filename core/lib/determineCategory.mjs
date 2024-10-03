export function determineCategory(title) {
    switch (true) {
      case title.includes("高通"):
        return "qualcomm";
  
      case title.includes("聯發科"):
        return "mediatek";
  
      case title.includes("5G"):
        return "commu";
  
      case title.includes("OPPO") || title.includes("PC"):
        return "phone";
  
      default:
        return "other";
    }
  }