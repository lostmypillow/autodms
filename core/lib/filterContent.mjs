export function filterContent(inputArray) {
  inputArray = inputArray.map((line) => line.trim());

  inputArray = inputArray.filter(
    (item) =>
      item !== "" &&
      !item.startsWith("一手掌握經濟脈動") &&
      item !== "《你可能還想看》" &&
      !item.includes("請繼續往下閱讀...") &&
      !item.startsWith("(") &&
      !item.startsWith("（") &&
      !item.startsWith("不用抽") &&
      !item.includes("核稿編輯") &&
      !item.startsWith("記者") &&
      !item.includes("圖／") &&
      !item.startsWith("▲") &&
      !item.startsWith("<") &&
      !item.includes("引用來源：") &&
      !item.startsWith("\\") &&
      !item.includes("<h2>") &&
      !item.includes("&nbsp;") &&
      !item.endsWith("：") &&
      !item.includes("訂閱手機王") &&
      !item.includes("想快速知道") &&
      !item.includes("資料來源：") &&
      !item.includes("&nbsp;") &&
      !item.includes("上傳") &&
      !item.includes("消息來源") && 
      !item.includes(".jpg") && 
      !item.startsWith("(") &&
      !item.includes("下載附件") &&
      !item.includes("保存到相冊") &&
      !item.includes(".png")
  );
  inputArray = inputArray.map((str) => str.replace(/<\/?[^>]+(>|$)/g, ""));
  inputArray = inputArray.map((line) => line.trim());
  return inputArray;
}
