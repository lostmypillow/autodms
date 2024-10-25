import * as cheerio from "cheerio";

import { filterContent } from "./filterContent.mjs";
import { determineCategory } from "./determineCategory.mjs";
import { sources } from "./sources/index.mjs";

function determineSource(link) {
  for (const [key, value] of Object.entries(sources)) {
    if (link.includes(key)) {
      return value;
    }
  }
  return "unsupported";
}

function filterHTML(fullHTML) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = fullHTML;
  var scriptsAndStyles = tempDiv.querySelectorAll(
    "script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins"
  );
  scriptsAndStyles.forEach((tag) => tag.remove());
  console.log(tempDiv.innerHTML);
}

const convertArray = (inputArray) =>
  Array.isArray(inputArray) ? inputArray.toString().replace : inputArray;

export function processHTML(link, html) {
  const handlerFunction = determineSource(link);
  let scrapedContent;
  if (handlerFunction != "unsupported") {
    scrapedContent = handlerFunction(cheerio.load(html));

    scrapedContent["content"] = scrapedContent["content"]
      ? filterContent(scrapedContent["content"]).join("\n\n")
      : [];
    // scrapedContent["content"] = scrapedContent["content"].join("\n\n");

    scrapedContent["author"] = scrapedContent["author"]
      ? convertArray(scrapedContent["author"])
      : "";

    scrapedContent["date"] = scrapedContent["date"]
      ? convertArray(scrapedContent["date"])
      : "";

    scrapedContent["title"] = scrapedContent["title"]
      ? convertArray(scrapedContent["title"])
          .replace(/《[^》]*》/g, "")
          .trim()
      : "";

    scrapedContent["category"] = determineCategory(scrapedContent["title"]);
    scrapedContent["url"] = link;
  } else {
    scrapedContent = {
      error: handlerFunction,
      url: link,
    };
  }

  return scrapedContent;
}
