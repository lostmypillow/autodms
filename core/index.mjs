import { getContentFromHTML } from "./sources/index.mjs";

export async function dmsScrape(inputData) {

  var content

  async function fetchWithFetch(link) {
    var response;
    try {
      response = await fetch(link);
    } catch (error) {

    }
    return getContentFromHTML(link,  response.text())
   ;
  }

  function getContentFromHTML(link, html) {
    var scrapedContent = link.includes("3c.ltn") ? 
        content = LTN3C(html): ""
    scrapedContent['content'] = filterContent(scrapedContent['content'])
    scrapedContent['url'] = link
    return content;
  }
  
inputData.startsWith("http") ? content = await fetchWithFetch(inputData) : content = getContentFromHTML("https://3c.ltn.com.tw/news/59270", html)
console.log(content)
return content
}
dmsScrape(html)

