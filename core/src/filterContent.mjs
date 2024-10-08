export function filterContent(inputArray) {
  const excludedStartWords = [
    "一手掌握經濟脈動", "《你可能還想看》", "(", "不用抽", "記者", "▲", "<", "\\", "。", 
    "此處", "還在靠社群媒體", "訂閱即同意", "＊本文開放", "（本文訊息", "相關資源", "• 更多關於：", "快加入 INSIDE"
  ];

  const excludedSubstrings = [
    "請繼續往下閱讀...", "核稿編輯", "圖／", "引用來源：", "<h2>", "&nbsp;", "訂閱手機王", 
    "想快速知道", "資料來源：", "上傳", "消息來源", ".jpg", "下載附件", "保存到相冊", ".png", 
    "，請點選", "，請造訪", "其他因素不同而產生差異", "中央社「一手新聞」 app", 
    "本網站之文字、圖片及影音", "#content>a:hover {", "color: ", "text-decoration: "
  ];

  const excludedEndsWith = ["："];

  // Combined regex for general replacements
  const regex = /<\/?[^>]+(>|$)|\s+/g;

  return inputArray
    .map((str) => str.replace(regex, " ").trim()) // Clean HTML and trim spaces
    .filter((item) => {
      // Filter based on start, substring, and length
      if (
        item === "" ||
        excludedStartWords.some((word) => item.startsWith(word)) ||
        excludedSubstrings.some((substring) => item.includes(substring)) ||
        excludedEndsWith.some((end) => item.endsWith(end)) ||
        item.length <= 2
      ) {
        return false;
      }
      return true;
    });
}
