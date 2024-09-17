import { fetchAndScrape } from "./lib/fetchAndScrape.mjs";
import { justScrape } from "./lib/justScrape.mjs";
export async function dmsScrape(type, link, html) {
  return type == "link"
    ? await fetchAndScrape(link)
    : type == "html"
    ? justScrape(link, html)
    : "Must specify type";
}
console.log(
  await dmsScrape(
    "link",
    "https://technews.tw/2024/09/12/snapdragon-8-gen-4-and-dimensity-9400-configuration-unveiled/"
  )
);
