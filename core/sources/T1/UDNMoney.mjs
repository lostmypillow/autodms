import * as cheerio from "cheerio";
export function UDNMoney(html) {
  const $ = cheerio.load(html);
  const data = $.extract({
    headline: "h1#story_art_title",
    time: [
      {
        selector: "time.article-body__time",
        value: (el, key) => {
          const data = $(el).text().replace(/\//g, "-").slice(0, 10);
          return data;
        },
      },
    ],
    author: [
      {
        selector: "div.article-body__info > span",
        value: (el, key) => {
          const text = $(el).text();
          return text.replace(/.*記者(.{3}).*/, "$1");
        },
      },
    ],
    content: [
      {
        selector: "section.article-body__editor p",
        value: (el, key) => {
          if (!$(el).text().trim() == "") {
            return $(el)
              .text()
              .replace(/\$\(.*/s, "")
              .trim();
          }
        },
      },
    ],
  });
  data["source"] = "經濟日報";
  return data;
}
