import { justScrape } from "./justScrape.mjs";
export async function fetchAndScrape(link) {
    var response;
    try {
      if (
        // link.includes("digitimes") ||
        link.includes("chinatimes") ||
        link.includes("ctee") ||
        link.includes("buzzorange")
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