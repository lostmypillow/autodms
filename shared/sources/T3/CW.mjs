export function CW($) {
  const data = $.extract({
    title: { selector: "title", value: (el) => $(el).text().split("｜")[0] },
    date: {
      selector: "meta[property=article:modified_time]",
      value: (el) => $(el).attr("content").split("T")[0],
    },
    author: {
      selector: 'a[href^="https://www.cw.com.tw/author/"]:first',
      value: (el) => $(el).text().trim(),
    },
    content: [
      {
        selector: "div.article__content.py20 > p",
        value: (el) => $(el).text().trim(),
      },
    ],
  });
  data["source"] = "天下雜誌";
  return data;
  //     return $.html()
}
