export function UDN($) {
  const data = $.extract({
    title: "h1.article-content__title",
    date: [
      {
        selector: "time.article-content__time",
        value: (el, key) => {
          const data = $(el).text().replace(/\//g, "-").slice(0, 10);
          return data;
        },
      },
    ],
    author: "a[href^='/news/reporter/']",
    content: [
      {
        selector: "section.article-content__editor  p",
        value: (el, key) => {
          const text = $(el).text().trim();
          return text;
        },
      },
    ],
  });
  data["source"] = "聯合報";
  return data;
}
