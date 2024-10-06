import { dmsScrape } from "./index.mjs";
import * as cheerio from "cheerio"
import { cteetest } from "./test/tested/cteetest.js";
import { DIGITIMES } from "./sources/T1/DIGITIMES.mjs";
import { digitest } from "./test/tested/digitest.js";
import { chinatest } from "./test/tested/chinatest.js";
import { CHINATIMES } from "./sources/T2/CHINATIMES.mjs";
import { NXTAPPLE } from "./sources/T2/NXTAPPLE.mjs";
import { SETN } from "./sources/T3/SETN.mjs";
import { setntest } from "./test/tested/setntest.js";
import { techorangetest } from "./test/techrangetest.js";
import { TECHORANGE } from "./sources/T5/TECHORANGE.mjs";
import { TECHBANG } from "./sources/T5/TECHBANG.mjs";
import { techbangtest } from "./test/techbangtest.js";
import { CNYES } from "./sources/T5/CNYES.mjs";
import { cnyestest } from "./test/cnyestest.js";
import { SAYDIGI } from "./sources/T5/SAYDIGI.mjs";
import { saydigitest } from "./test/saydigitest.js";
import { COMPOTECHASIA } from "./sources/T5/COMPOTECHASIA.mjs";
import { compotechtest } from "./test/compotechtest.js";
import { INSIDE } from "./sources/T5/INSIDE.mjs";
import { insidetest } from "./test/insidetest.js";
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
  "https://money.udn.com/money/story/5612/8219989",
];
// async function getTestLinks() {
//   var response = [];
//   for (const link of testLink) {
//     response.push(await dmsScrape("link", link));
//     // response = await fetch(link);
//   }
//   // return await response.text();
//   return response;
// }

// console.log(await getTestLinks());

// console.log(await dmsScrape("html", "https://www.setn.com/News.aspx?NewsID=1526574", setntest))







// console.log(await dmsScrape("html", "https://buzzorange.com/techorange/2024/10/03/eu-plans-to-hit-china-based-ev-makers-with-additional-tariffs/", techorangetest))

// const $ = cheerio.load(chinatest)
// console.log(CHINATIMES($))

// const inithtml = await (await fetch("https://www.inside.com.tw/article/36326-meta-announces-300-quest-3s-a-cheaper")).text()

// let $ = cheerio.load(await (await fetch("https://www.inside.com.tw/article/36326-meta-announces-300-quest-3s-a-cheaper")).text())
// $('script, style, link').remove();
// let cleanedHTML = $.html();
// console.log(cleanedHTML)

// console.log(NXTAPPLE(cheerio.load(cleanedHTML)))
// ${
// console.log(CNYES(cheerio.load(cnyestest)))
// console.log(SAYDIGI(cheerio.load(saydigitest)))
// console.log(await dmsScrape("link", "https://www.compotechasia.com/a/press/2024/0919/58658.html"))

//seriosu bug: https://www.xfastest.com/thread-292861-1-1.html
// bug title: https://www.eprice.com.tw/mobile/talk/6113/5812708/1
//unwanted content: https://www.sogi.com.tw/articles/realme_13_pro_plus/6263085
/// undefined: https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?cnlid=1&id=0000703998_EAN8YJ9ZLL4AQU7Z9IWZT
// const urls = ["https://www.xfastest.com/thread-292892-1-1.html", "https://www.cool3c.com/article/225948" , "https://tw.nextapple.com/finance/20241002/F46EF42772FDB0898B925982A2D4F7D3" ]
// for (const url of urls) {
//   await multscrape(url);
// }

/// sogi promotion: https://www.sogi.com.tw/articles/samsung_galaxy_tab_s10_ultra/6263080
// eprice title: https://www.eprice.com.tw/mobile/talk/102/5812686/1
///bug: https://www.cool3c.com/article/226021
// multscrape("https://3c.ltn.com.tw/news/59704")

// async function multscrape(url) {
//   const data = await dmsScrape("link", url);
//   console.log(data.title);
//   console.log(data.date + ' / ' + data.source + ' / ' + data.author);
//   console.log(data.url);
//   console.log(data.content);
// }
// console.log(COMPOTECHASIA(cheerio.load(compotechtest)))
// console.log(INSIDE(cheerio.load(insidetest)))

console.log(await dmsScrape("html", "https://www.chinatimes.com/realtimenews/20240904005289-260410?chdtv", chinatest))
// const link = "https://www.chinatimes.com/newspapers/20240820000224-260204?chdtv"
// const check = "https://www.chinatimes"
// console.log(link.startsWith(check))