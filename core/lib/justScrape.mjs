import { processHTML } from "./processHTML.mjs";
import { filterContent } from "./filterContent.mjs";
import { determineCategory } from "./determineCategory.mjs";
export function justScrape(link, html) {
  try {
    var scrapedContent = processHTML(link, html);
    scrapedContent["content"]
      ? (scrapedContent["content"] = filterContent(scrapedContent["content"]))
      : "";

    Array.isArray(scrapedContent["author"])
      ? (scrapedContent["author"] = scrapedContent["author"].toString())
      : "";
    Array.isArray(scrapedContent["date"])
      ? (scrapedContent["date"] = scrapedContent["date"].toString())
      : "";
      scrapedContent["category"] = determineCategory(scrapedContent["title"])
    scrapedContent["url"] = link;
    scrapedContent['content'] = scrapedContent['content'].join('\n\n')
    return scrapedContent;
  } catch (error) {
    return error;
  }
}
