import { processHTML } from "./processHTML.mjs";
import { filterContent } from "./filterContent.mjs";
export function justScrape(link, html) {
    try {
      var scrapedContent = processHTML(link, html)
      scrapedContent["content"] = scrapedContent["content"]
        ? filterContent(scrapedContent["content"])
        : "";
      scrapedContent["url"] = link;
      return scrapedContent;
    } catch (error) {
      return error;
    }
  }