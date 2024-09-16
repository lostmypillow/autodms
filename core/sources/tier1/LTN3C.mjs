import * as cheerio from "cheerio";
export function LTN3C(html) {
  const $ = cheerio.load(html);
  const data = $.extract({
    headline: "div.whitecon.borderline.boxTitle.boxText h1",
    time: [
      {
        selector: "span.time",
        value: (el, key) => {
          const data = $(el).text().split(" ").slice(0)[0].replace(/\//g, "-");
          return data;
        },
      },
    ],
    author: [
      {
        selector: "span.author",
        value: (el) => {
          const data = $(el).text().split("").slice(-3).join("");
          return data;
        },
      },
    ],
    content: [
      {
        selector: "div.text p",
        value: (el, key) => {
          const text = $(el).text().trim();
          return text;
        },
      },
    ],
  });
  return data;
}
