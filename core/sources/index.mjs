import { filterContent } from "../lib/filterContent.mjs";
import { LTN3C } from "./tier1/LTN3C.mjs";
import { LTNEC } from "./tier1/LTNEC.mjs";

export { LTN3C, LTNEC };
export function getContentFromHTML(link, html) {
  let content;
  switch (true) {
    case link.includes("3c.ltn"):
      content = LTN3C(html);
      break;
  }
  content['content'] = filterContent(content['content'])
  content['url'] = link
  return content;
}
