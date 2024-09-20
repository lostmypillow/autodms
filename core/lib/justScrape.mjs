// import { processHTML } from "./determineSource.mjs";
import { filterContent } from "./filterContent.mjs";
import { determineCategory } from "./determineCategory.mjs";
import { determineSource } from "./determineSource.mjs";
import * as cheerio from 'cheerio'
export function justScrape(link, html) {
  try {
    const handlerFunction = determineSource(link);
    var scrapedContent =
      typeof handlerFunction == "function"
        ? handlerFunction(cheerio.load(html))
        : handlerFunction;
    if (scrapedContent["error"] == undefined) {
      scrapedContent["content"]
        ? (scrapedContent["content"] = filterContent(scrapedContent["content"]))
        : "";

      Array.isArray(scrapedContent["author"])
        ? (scrapedContent["author"] = scrapedContent["author"].toString())
        : "";
      Array.isArray(scrapedContent["date"])
        ? (scrapedContent["date"] = scrapedContent["date"].toString())
        : "";
      scrapedContent["category"] = determineCategory(scrapedContent["title"]);
      scrapedContent["url"] = link;
      scrapedContent["content"] = scrapedContent["content"].join("\n\n");
    }

    return scrapedContent;
  } catch (error) {
    return error;
  }
}
