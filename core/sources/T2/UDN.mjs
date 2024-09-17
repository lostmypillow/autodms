import * as cheerio from "cheerio";
export function UDN(html) {
  const $ = cheerio.load(html);
  const data = $.extract({
    headline: "h1.article-content__title",
    time: [
      {
        selector: "time.article-content__time",
        value: (el, key) => {
          const data = $(el).text().replace(/\//g, "-")
          .slice(0, 10);
          return data;
        },
      },
    ],
    author: "a[href^='/news/reporter/']",
    content: [
      {
        selector: "section.article-content__editor  p",
        value: (el, key) => {
          const text = $(el)
            .text()
            .trim();
          return text;
        },
      },
    ],
  });

  return data;
}
