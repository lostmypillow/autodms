import * as cheerio from "cheerio";
export function MASHDIGI(html) {
  const $ = cheerio.load(html);
  let data = {};
  const link = $('link[rel="canonical"]').attr('href')
  data["title"] = $("h1.entry-title").text().trim();
  data["time"] = $('[href="' + link + '"] > time.entry-date.published').text();
  data["author"] = $("div.entry-meta span.author.vcard")
    .text()
    .replace(" (Mash Yang)", "");

  data["content"] = [];
  $("div.bialty-container p").each(function () {
    const htmlContent = $(this).html().trim();
    const textContent = $(this).text().trim();

    if (
      htmlContent.includes("<img") ||
      textContent.startsWith("▲") ||
      textContent === ""
    ) {
      return;
    } else {
      data["content"].push(textContent.replace("undefined", "").trim());
    }
  });
  data["source"] = "Mashdigi";
  return data;
}
