import { getHandlerFunction } from "./getHandlerFunction.mjs";
import { filterContent } from "./filterContent.mjs";
let success = false;
export async function dmsScrape(type, link, html) {
  async function fetchAndScrape(link) {
    var response;
    try {
      if (
        link.includes("digitimes") ||
        link.includes("chinatimes") ||
        link.includes("ctee")
      ) {
        return "Must use extension";
      } else {
        response = await fetch(link);
        return justScrape(link, await response.text());
      }
    } catch (error) {
      return error;
    }
  }

  function justScrape(link, html) {
    try {
      var handlerFunction = getHandlerFunction(link);
      var scrapedContent =
        typeof handlerFunction == "function"
          ? handlerFunction(html)
          : { error: "source not supported" };
      scrapedContent["content"] = scrapedContent["content"]
        ? filterContent(scrapedContent["content"])
        : "";
      scrapedContent["url"] = link;
      return scrapedContent;
    } catch (error) {
      return error;
    }
  }

  return type == "link"
    ? await fetchAndScrape(link)
    : type == "html"
    ? justScrape(link, html)
    : "Must specify type";
}
console.log(
  await dmsScrape(
    "link",
    "https://www.sogi.com.tw/articles/google_pixel_9/6262585"
  )
);
