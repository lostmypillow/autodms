export function filterContent(inputArray) {
  inputArray = inputArray.filter(
    (item) =>
      item !== "" &&
      !item.startsWith("一手掌握經濟脈動") &&
      item !== "《你可能還想看》" &&
      !item.includes("請繼續往下閱讀...") &&
      !item.startsWith("(") &&
      !item.startsWith("（") &&
      !item.startsWith("不用抽")
  );
  return inputArray
}
