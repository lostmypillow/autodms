export function COMPOTECHASIA($) {
  const data = $.extract({
    title: [
      {
        selector: "title",
        value: (el) => $(el).text().trim().replace("_COMPOTECH ASIA", ""),
      },
    ],
    date: [
        {
            selector: "span.deta",
            value: (el) => $(el).text().split(" ")[0]
        }
    ],
    author: [
        {
            selector: "span:contains('本文作者：') > a",
            value: (el) => $(el).text().trim()
        }
    ],
    content: [
        {
            selector: "div.article_wz_text div",
            value: (el) => $(el).text()
        }
    ]
  });
  data["source"] = "智慧電子解決方案設計平台"
  return data
}
