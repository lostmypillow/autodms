import { processHTML } from "./processHTML.mjs";
import { v4 as uuid } from "uuid";
import * as cheerio from "cheerio";
import { sources } from "./sources/index.mjs";

function checkLink(link) {
  let isSupported;
  let needsExt;
  for (const [key, value] of Object.entries(sources)) {
    if (link.includes(key)) {
      isSupported = true;
      break;
    } else {
      isSupported = false;
    }
  }
  let resp;
  const linksNeedText = [
    "https://www.digitimes",
    "https://www.ctee",
    "https://www.chinatimes",
    "https://buzzorange.com/techorange",
    "https://www.bnext.com.tw",
    "https://www.wealth.com.tw"
  ];
  for (const l of linksNeedText) {
    if (link.startsWith(l)) {
      needsExt = true;
      break;
    } else {
      needsExt = false;
    }
  }

  return {
    isSupported: isSupported,
    needsExt: needsExt,
  };
}
export async function dmsScrape(link, html) {
  if (checkLink(link).isSupported && !checkLink(link).needsExt) {
    if (link.includes("lpcomment") && link.includes("/amp/")) {
      link = link.replace("amp/", "");
    }
    let $ = cheerio.load(await (await fetch(link)).text());
    $(
      "script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins"
    ).remove();
    $("*").each(function () {
      let content = $(this).html();
      content = content.replace(/\$\{/g, "");
      $(this).html(content);
    });
    return processHTML(link, $.html());
  } else if (
    checkLink(link).isSupported &&
    checkLink(link).needsExt &&
    html == undefined
  ) {
    return {
      error: "Supported But Needs extension",
      title: "Supported But Needs extension",
      url: link,
      id: uuid(),
    };
  } else if (
    checkLink(link).isSupported &&
    checkLink(link).needsExt &&
    html != undefined
  ) {
    return processHTML(link, html);
  } else {
    return {
      error: "Not Supported At All",
      title: "Not Supported At All",
      url: link,
      id: uuid(),
    };
  }
}
