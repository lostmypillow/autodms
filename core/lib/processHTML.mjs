import * as cheerio from "cheerio";

import { filterContent } from "./filterContent.mjs";
import { determineCategory } from "./determineCategory.mjs";
import { sources } from "./sources.mjs";

function determineSource(link) {
  for (const [key, value] of Object.entries(sources)) {
    if (link.includes(key)) {
      return value;
    }
  }
  return "unsupported";
}

export function processHTML(link, html) {
  const handlerFunction = determineSource(link);
  let scrapedContent;
  if (handlerFunction != "unsupported") {
    scrapedContent = handlerFunction(cheerio.load(html));

    if (scrapedContent["content"]) {
      scrapedContent["content"] = filterContent(scrapedContent["content"]).join(
        "\n\n"
      );
    }

    if (Array.isArray(scrapedContent["author"])) {
      scrapedContent["author"] = scrapedContent["author"].toString();
    }
    if (Array.isArray(scrapedContent["date"])) {
      scrapedContent["date"] = scrapedContent["date"].toString();
    }

    if (Array.isArray(scrapedContent["title"])) {
      scrapedContent["title"] = scrapedContent["title"].toString();
    }

    scrapedContent["category"] = determineCategory(scrapedContent["title"]);
    scrapedContent["url"] = link;
  } else {
    scrapedContent = {
      error: handlerFunction,
      url: link,
      category: "other",
    };
  }


  return scrapedContent;
}
