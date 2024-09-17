import * as cheerio from "cheerio";
export function COOL3C(html) {
  const $ = cheerio.load(html);
  let data = {};
  data["title"] = $("li.breadcrumb-item.active")
    .text()
    .trim()
    .replace("\n", "");
  data["time"] = $("div.created.slacken span")
    .eq(1)
    .text()
    .trim()
    .split(" ")[0]
    .replace(/\./g, "-");
  data["author"] = $("div.author a").text().trim();

  data["content"] = [];
  $("div.row.content div p").each(function () {
    const text = $(this).html().trim();
    if (text.startsWith("<img") || text.startsWith("▲")) {
      return;
    } else {
      data["content"].push(text.replace("undefined", "").trim());
    }
  });
  data["source"] = "Cool3c";
  return data;
}
