export function filterContent(inputArray: string[]) {
  const excludedStartWords: string[] = [
    '一手掌握經濟脈動',
    '《你可能還想看》',
    '(',
    '不用抽',
    '記者',
    '▲',
    '<',
    '\\',
    '。',
    '此處',
    '還在靠社群媒體',
    '訂閱即同意',
    '＊本文開放',
    '（本文訊息',
    '相關資源',
    '• 更多關於：',
    '快加入 INSIDE',
    '責任編輯：',
    '現在，你也可以同步',
    '電獺少女 LINE ',
    '新唐人亞太電視',
    '延伸閱讀：',
    '《原文刊登',
    'MoneyDJ新聞',
    '＊編者按：',
    '（本文由',
    '新聞來源：',
    '★延伸閱讀★',
    '《民視新聞網》提醒您：',
    '◤',
    '👉',
    '下載TVBS新聞APP',
    '更多',
    '佳格食品集團',
  ];

  const excludedSubstrings: string[] = [
    '請繼續往下閱讀...',
    '核稿編輯',
    '圖／',
    '引用來源：',
    '訂閱手機王',
    '想快速知道',
    '資料來源：',
    '上傳',
    '消息來源',
    '.jpg',
    '下載附件',
    '保存到相冊',
    '.png',
    '，請點選',
    '，請造訪',
    '其他因素不同而產生差異',
    '中央社「一手新聞」 app',
    '本網站之文字、圖片及影音',
    '#content>a:hover {',
    'color: ',
    'text-decoration: ',
    '分享的貼文',
    ' 下載TVBS新聞APP',
  ];

  const excludedEndsWith: string[] = ['：'];

  // Strings to be replaced and their replacements
  interface ReplaceStrings {
    [key: string]: string;
  }
  const replaceStrings: ReplaceStrings = {
    '<h2>': '',
    '&nbsp;': '',
  };

  // Combined regex for general replacements
  const regex: RegExp = /<\/?[^>]+(>|$)|\s+/g;

  return inputArray
    .map((str: string): string => {
      // Apply string replacements
      for (const [target, replacement] of Object.entries(replaceStrings)) {
        str = str.replace(target, replacement);
      }
      return str.replace(regex, ' ').trim(); // Clean HTML and trim spaces
    })
    .filter((item: string): boolean => {
      // Filter based on start, substring, and length
      return !(
        item === '' ||
        excludedStartWords.some((word: string): boolean => item.startsWith(word)) ||
        excludedSubstrings.some((substring: string): boolean => item.includes(substring)) ||
        excludedEndsWith.some((end: string): boolean => item.endsWith(end)) ||
        item.length <= 2
      );
    });
}
