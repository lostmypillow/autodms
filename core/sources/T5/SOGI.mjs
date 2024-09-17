import * as cheerio from "cheerio";
export function SOGI(html) {
  const $ = cheerio.load(html);
  const data = $.extract({
    title: "h1.h1",
    author: {
      selector: "div.d-inline-block.mr-3 > a > a",
      value: function (el, key) {
        
            return $(el).text()
      
        
      },
    },
  });

  data["time"] = $("div.d-inline-block.mr-3")
    .first()
    .text()
    .replace("\n", "")
    .trim()
    .replace(/\//g, "-");

  data["content"] = $("div.editable.my-2")
    .html() // Get inner HTML of the div
    .split(/<br\s*\/?>\s*<br\s*\/?>/i) // Split by two consecutive <br> tags
    .map((line) => line.trim()) // Trim whitespace from each line
    .filter((line) => line.length > 0);
  return data;
}
