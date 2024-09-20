import { dmsScrape } from "./index.mjs";

const testLinks = [
  "https://www.cool3c.com/article/202079",

  "https://www.kocpc.com.tw/archives/563640",
  "https://mashdigi.com/qualcomm-continues-to-launch-the-snapdragon-x-plus-processor-composed-of-8-sets-of-performance-cores-expanding-the-copilot-pc-product-lineup/",
  "https://www.sogi.com.tw/articles/samsung_galaxy_s25_ultra/6262880",
  "https://technews.tw/2024/09/12/snapdragon-8-gen-4-and-dimensity-9400-configuration-unveiled/",
  "https://www.xfastest.com/thread-291944-1-1.html",
  "https://www.ettoday.net/news/20240905/2810968.htm",
  "https://udn.com/news/story/7240/8145957",
  "https://money.udn.com/money/story/5613/8231957",
  "https://3c.ltn.com.tw/news/59270",
  "https://ec.ltn.com.tw/article/breakingnews/4790282",
  "https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?id=0000700414_DTZ3HLET2I9D7N38H02NN",
];

const buggedLinks = ["https://www.eprice.com.tw/mobile/talk/4523/5811558/1/"];
const testLink = [
  "https://www.ctee.com.tw/news/20240805700832-431207",
];
async function getTestLinks() {
  var response = [];
  for (const link of testLink) {
    response.push(await dmsScrape("link", link));
    // response = await fetch(link);
  }
  // return await response.text();
  return response;
}

console.log(await getTestLinks());
