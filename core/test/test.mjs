// const testLinks = [
//   "https://www.cool3c.com/article/202079",

import { dmsScrape } from "../src/index.mjs"

//   "https://www.kocpc.com.tw/archives/563640",
//   "https://mashdigi.com/qualcomm-continues-to-launch-the-snapdragon-x-plus-processor-composed-of-8-sets-of-performance-cores-expanding-the-copilot-pc-product-lineup/",
//   "https://www.sogi.com.tw/articles/samsung_galaxy_s25_ultra/6262880",
//   "https://technews.tw/2024/09/12/snapdragon-8-gen-4-and-dimensity-9400-configuration-unveiled/",
//   "https://www.xfastest.com/thread-291944-1-1.html",
//   "https://www.ettoday.net/news/20240905/2810968.htm",
//   "https://udn.com/news/story/7240/8145957",
//   "https://money.udn.com/money/story/5613/8231957",
//   "https://3c.ltn.com.tw/news/59270",
//   "https://ec.ltn.com.tw/article/breakingnews/4790282",
//   "https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?id=0000700414_DTZ3HLET2I9D7N38H02NN",
// ];

// const buggedLinks = ["https://www.eprice.com.tw/mobile/talk/4523/5811558/1/"];
// const testLink = [
//   "https://money.udn.com/money/story/5612/8219989",
// ];
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

// import { dmsScrape } from "../src/index.mjs";
// import { china1, china2, china3, ctee1, ctee2, ctee3, digi1, digi2 } from "./insidetest.js";

// console.log(await dmsScrape("html", "https://buzzorange.com/techorange/2024/10/03/eu-plans-to-hit-china-based-ev-makers-with-additional-tariffs/", techorangetest))

// const $ = cheerio.load(chinatest)
// console.log(CHINATIMES($))



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
const urls = [
  "https://money.udn.com/money/story/123398/8284364"
];

// const htmls = [
//   {
//     url: "https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?CnlID=1&cat=40&id=0000704572_U324G0818MRM9Y1TCLWJR&wpidx=3",
//     html: digi1
//   },
//   {
//     url: "https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?CnlID=1&Cat=40&id=0000704573_2546E95R6ZHTTV4VS0AV9&wpidx=4",
//     html: digi2
//   },
//   {
//     url: "https://www.ctee.com.tw/news/20241011700170-439901",
//     html: ctee1
//   },
//   {
//     url: "https://www.ctee.com.tw/news/20241010700051-439901",
//     html: ctee2
//   },
//   {
//     url: "https://www.chinatimes.com/realtimenews/20241010003610-260410?chdtv",
//     html: china1
//   },
//   {
//     url: "https://www.chinatimes.com/realtimenews/20241010002015-260410?chdtv",
//     html: china2
//   },
//   {
//     url: "https://www.chinatimes.com/realtimenews/20241009003816-260410?chdtv",
//     html: china3
//   },
//   {
//     url: "https://www.ctee.com.tw/news/20241010700054-439901",
//     html:ctee3
//   }

// ]
for (const url of urls) {
  await multscrape("link", url);
}
// for (const ht of htmls) {
//   await multscrape("html", ht.url, ht.html)
// }
// sogi leo
// mashdigi bug:https://mashdigi.com/ul-benchmark-cooperates-with-mediatek-to-add-a-test-project-called-opacity-micromap-to-the-android-version-of-3dmark/
// no match found: https://money.udn.com/money/story/5612/8282066 or https://www.sogi.com.tw/articles/mediatek/6263140
//xfastest time
/// sogi promotion: https://www.sogi.com.tw/articles/samsung_galaxy_tab_s10_ultra/6263080
// eprice title: https://www.eprice.com.tw/mobile/talk/102/5812686/1
///bug: https://www.cool3c.com/article/226021
// multscrape("https://3c.ltn.com.tw/news/59704")
// SETN headline
//udn bug: https://money.udn.com/money/story/123398/8284364

// async function multscrape(type, url, html) {
//   const data = type == "link"? await dmsScrape(type, url): await dmsScrape(type, url, html)
//   // const data = await dmsScrape("html", url, insidetest);
//   console.log(data.title);
//   console.log(data.date + " / " + data.source + " / " + data.author);
//   console.log(data.url);
//   console.log(data.content);
//   console.log();
// }
// console.log(COMPOTECHASIA(cheerio.load(compotechtest)))
// console.log(INSIDE(cheerio.load(insidetest)))

// console.log(await dmsScrape("link", "https://tw.nextapple.com/finance/20241009/6E1E2C3FF02D616024AC319E2B952A34"))

// const link = "https://www.chinatimes.com/newspapers/20240820000224-260204?chdtv"
// const check = "https://www.chinatimes"
// console.log(link.startsWith(check))
//sanitize titles

<<<<<<< Updated upstream
// console.log(await multscrape("link", "https://www.cool3c.com/article/226478"))
=======
// console.log(await multscrape("link", "https://www.cool3c.com/article/226478"))

// const inithtml = 

// console.log(await (await fetch("https://www.ntdtv.com.tw/b5/20240905/video/398013.html?IFA%E5%B1%95%E9%AB%98%E9%80%9A%E6%8E%A8%E5%B9%B3%E5%83%B9AI%20PC%E6%99%B6%E7%89%87%20%E5%8F%AB%E9%99%A3%E8%8B%B1%E7%89%B9%E7%88%BE%E8%88%87%E8%B6%85%E5%BE%AE")).text())
console.log(await dmsScrape("link", "https://www.ntdtv.com.tw/b5/20240905/video/398013.html?IFA%E5%B1%95%E9%AB%98%E9%80%9A%E6%8E%A8%E5%B9%B3%E5%83%B9AI%20PC%E6%99%B6%E7%89%87%20%E5%8F%AB%E9%99%A3%E8%8B%B1%E7%89%B9%E7%88%BE%E8%88%87%E8%B6%85%E5%BE%AE"))
>>>>>>> Stashed changes
