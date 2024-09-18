import { fetchAndScrape } from "./lib/fetchAndScrape.mjs";
import { justScrape } from "./lib/justScrape.mjs";
export async function dmsScrape(type, link, html) {
  return type == "link"
    ? await fetchAndScrape(link)
    : type == "html"
    ? justScrape(link, html)
    : "Must specify type";
}
