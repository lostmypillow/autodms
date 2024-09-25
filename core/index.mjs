import { processHTML } from "./lib/processHTML.mjs";
export async function dmsScrape(type, link, html) {
  return type == "link"
    ? processHTML(link, await (await fetch(link)).text())
    : type == "html"
    ? processHTML(link, html)
    : { error: "Must specify type", url: link };
}
