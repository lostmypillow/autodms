export function USTV($) {
  const data = $.extract({
    title: {
      selector: "title",
      value: (el) => $(el).text().split("|")[0].trim(),
    },
    date: "time.date",
    author: "a[href^='https://news.ustv.com.tw/reporter']:first",
    content: [
      {
        selector: "article.article p",
        value: (el) => $(el).html().split("<br>"),
      },
    ],
  });
  data["source"] = "非凡新聞";
  return data;
}
