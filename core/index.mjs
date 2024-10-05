import { processHTML } from "./lib/processHTML.mjs";
import { v4 as uuid } from "uuid";
import * as cheerio from "cheerio";
function checkLink(link) {
  let resp;
  const linksNeedText = [
    "https://www.digitimes",
    "https://www.ctee",
    "https://www.chinatimes",
    "https://buzzorange.com/techorange",
  ];
  for (const l of linksNeedText) {
    if (link.startsWith(l)) {
      resp = true;
      break;
    } else {
      resp = false;
    }
  }
  return resp;
}
export async function dmsScrape(type, link, html) {
  var data;
  if (type == "link" && checkLink(link) === false) {
    let $ = cheerio.load(await (await fetch(link)).text());
    $("script, style, link").remove();
    $("*").each(function () {
      let content = $(this).html();
      content = content.replace(/\$\{/g, "");
      $(this).html(content);
    });
    let cleanedHTML = $.html();
    data = processHTML(link, cleanedHTML);
  } else if (type == "link" && checkLink(link) === true) {
    data = {
      error: "Needs extension",
      url: link,
      id: uuid(),
      category: "other"
    };
  } else if (type == "html") {
    data = processHTML(link, html);
  } else {
    data = {
      error: "Must specify type",
      url: link,
    };
  }
  return data;
}
