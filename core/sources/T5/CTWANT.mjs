export function CTWANT($) {
  const data = $.extract({
    title: "h1.p-article__title",
    date: {
      selector: "time.p-article-info__time",
      value: (el) => $(el).attr("datetime").split("T")[0],
    },
    author: {
      selector: "a[href^='/author/editor/']",
      value: (el) => $(el).text().split("：")[1],
    },
    content: [
      {
        selector: "article > div > p",
      },
    ],
  });
  data["source"] = "CTWant";
  return data;
}
