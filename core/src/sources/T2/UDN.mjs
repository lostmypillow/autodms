export function UDN($) {
  const data = $.extract({
    title: "h1.article-content__title",
    date: {
      selector: "time.article-content__time",
      value: el => $(el).text().replaceAll("/", "-").slice(0, 10);
    },

    author: "a[href^='/news/reporter/']",
    content: [
      {
        selector: "section.article-content__editor  p",
        value: el => $(el).text().trim()
      },
    ],
  });
  data["source"] = "聯合報";
  return data;
}
