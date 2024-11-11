import { LTN3C } from "./T2/LTN3C.mjs";
import { LTNEC } from "./T2/LTNEC.mjs";
import { UDN } from "./T2/UDN.mjs";
import { UDNMoney } from "./T1/UDNMoney.mjs";
import { ETDAY } from "./T4/ETDAY.mjs";
import { EPRICE } from "./T5/EPRICE.mjs";
import { COOL3C } from "./T5/COOL3C.mjs";
import { MASHDIGI } from "./T5/MASHDIGI.mjs";
import { SOGI } from "./T5/SOGI.mjs";
import { TECHORANGE } from "./T5/TECHORANGE.mjs";
import { DIGITIMES } from "./T1/DIGITIMES.mjs";
import { KOCPC } from "./T5/KOCPC.mjs";
import { XF } from "./T5/XF.mjs";
import { TAISOUNDS } from "./T4/TAISOUNDS.mjs";
import { TECHNEWS } from "./T5/TECHNEWS.mjs";
import { CNA } from "./T4/CNA.mjs";
import { CTEE } from "./T1/CTEE.mjs";
import { CHINATIMES } from "./T2/CHINATIMES.mjs";
import { NXTAPPLE } from "./T2/NXTAPPLE.mjs";
import { SETN } from "./T3/SETN.mjs";
import { TECHBANG } from "./T5/TECHBANG.mjs";
import { CNYES } from "./T5/CNYES.mjs";
import { SAYDIGI } from "./T5/SAYDIGI.mjs";
import { COMPOTECHASIA } from "./T5/COMPOTECHASIA.mjs";
import { INSIDE } from "./T5/INSIDE.mjs";
import { AOTTER } from "./T5/AOTTER.mjs";
import { CTIMES } from "./T5/CTIMES.mjs";
import { NTDTV } from "./T5/NTDTV.mjs";
import { CW } from "./T3/CW.mjs";
import { CM } from "./T5/CM.mjs";
import { MEM } from "./T5/MEM.mjs";
import { CTWANT } from "./T5/CTWANT.mjs";
import { BNEXT } from "./T5/BNEXT.mjs";
import { LPCOMMENT } from "./T5/LPCOMMENT.mjs";
import { TECHUDN } from "./T2/TECHUDN.mjs";
import { INVESTOR } from "./T6/INVESTOR.mjs";
import { MONEYDJ } from "./T6/MONEYDJ.mjs";
import { WEALTH } from "./T6/WEALTH.mjs";
import { CTS } from "./T3/CTS.mjs";
import { EBC } from "./T3/EBC.mjs";
import { FTV } from "./T3/FTV.mjs";
import { TVBS } from "./T3/TVBS.mjs";
import { USTV } from "./T3/USTV.mjs";
import { GVM } from "./T4/GVM.mjs";
import { BSWEEKLY } from "./T2/BSWEEKLY.mjs";
export const sources = {
  "3c.ltn": LTN3C,
  "ec.ltn": LTNEC,
  "money.udn": UDNMoney,
  "tech.udn": TECHUDN,
  "udn": UDN,
  "ettoday": ETDAY,
  "eprice": EPRICE,
  "cool3c": COOL3C,
  "mashdigi": MASHDIGI,
  "sogi": SOGI,
  "techorange": TECHORANGE,
  "digitimes": DIGITIMES,
  "kocpc": KOCPC,
  "xfastest": XF,
  "taisounds": TAISOUNDS,
  "technews": TECHNEWS,
  "cna": CNA,
  "ctee": CTEE,
  "chinatimes": CHINATIMES,
  "nextapple": NXTAPPLE,
  "setn": SETN,
  "techbang": TECHBANG,
  "cnyes": CNYES,
  "saydigi": SAYDIGI,
  "compotechasia": COMPOTECHASIA,
  "inside": INSIDE,
  "aotter": AOTTER,
  "ctimes": CTIMES,
  "ntdtv": NTDTV,
  "cw": CW,
  "2cm": CM,
  "mem": MEM,
  "ctwant": CTWANT,
  "bnext": BNEXT,
  "lpcomment": LPCOMMENT,
  "investor": INVESTOR,
  "moneydj": MONEYDJ,
  "wealth": WEALTH,
  "cts": CTS,
  "ebc": EBC,
  "ftvnews": FTV,
  "tvbs": TVBS,
  "ustv": USTV,
  "gvm": GVM,
  "businessweekly": BSWEEKLY
};
export const newSources = [
  {
    "url": "3c.ltn",
    "ext": false,
    "title":
        {
          selector: "div.whitecon.borderline.boxTitle.boxText h1",
          value: null
        },
    "date":
        {
          selector: "span.time",
          value: x => x.text().split(" ").slice(0)[0].replaceAll("/", "-"),
        },
    "source": "自由時報",
    "author": {
      selector: "span.author",
      value: el => el.text().split("").slice(-3).join(""),
    },
    "content": {
      selector: "div.text p",
      value: null
    }
  },
  {
    "url": "ec.ltn",
    "ext": false,
    "title": {
      selector: "div.whitecon.boxTitle.boxText h1",
      value: null
    },
    "date": {
      selector: "span.time:nth-of-type(1)",
      value: x => x.text().split(" ").slice(0)[0].replaceAll("/", "-"),
    },
    "source": "自由時報",
    "author:": {
      selector: "div.text p:nth-of-type(2)",
      value: x =>  x.text().split("／")[0]
    },
    "content:": [
      {
        selector: "div.text p",
        value: x => x
            .text()
            .trim()
            .replace(/〔.*?〕/g, "")
      },
    ],
  },
  {
    "url": "money.udn",
    "ext": false,
    "title": {
      selector: "h1#story_art_title",
      value: null
    },
    "date": {
      selector: "time.article-body__time",
      value: x => x.text().replaceAll("/", "-").slice(0, 10),
    },
    "source": "經濟日報",
    "author": {
      selector: "div.article-body__info > span",
      value: x => x.text().replace(/.*記者(.{3}).*/, "$1")
    },
    "content": [
      {
        selector: "section.article-body__editor p",
        value: x=> x.text().trim()
      }
      ]
  },
  {
    "url": "tech.udn",
    "ext": false,
    "title": {
      selector: "h1.story-title",
      value: null
    },
    "date": {
      selector: "time.article-content__time",
      value: x => x.text().split(' ')[0]
    },
    "source": '聯合新聞網',
    "author": {
      selector: "a[href^='/tech/author']:first",
      value: null
    },
    "content": [
      {
        selector: "article.story-article > p",
        value: null
      }
    ]
  },
  {
    "url": "udn",
    "ext": false,
    "title": {
      selector: "h1.article-content__title",
      value: null
    },
    "date": {
      selector: "time.article-content__time",
      value: x => x.text().replaceAll("/", "-").slice(0, 10)
    },
    "source": "聯合報",
    "author": {
      selector: "a[href^='/news/reporter/']",
      value: null
    },
   "content": [
      {
        selector: "section.article-content__editor  p",
        value: x => x.text().trim()
      },
    ],
  },
  {
    "url": "ettoday",
    "ext": false,
    "title": {
      selector: "h1.title",
      value: null
    },
    "date": {
      selector: "time.date",
      value: x => (new Date(x.attr("datetime"))).toISOString().split("T")[0]
    },
    "source": "ETtoday",
    "author": {
      selector: "div > p:first",
      value: x => x.text().replace(/.*記者(.{3}).*/, "$1")
    },
    "content": [
      {
        selector: "div.story > p",
        value: x => x.text().trim()
      },
    ],
  },
  {
    "url": "eprice",
    "ext": false,
    "title": {
      selector: "h1.title",
      value: null
    },
    "date": {
      selector: "span.date:first",
      value: x => x.text().replace(/.*?(\d{4}-\d{2}-\d{2}).*/, "$1")
    },
    "source": "ePrice",
    "author": {
      selector: 'a.nickname:first'
    }
  },
  { "url": "cool3c", "ext": false },
  { "url": "mashdigi", "ext": false },
  { "url": "sogi", "ext": false },
  { "url": "techorange", "ext": true },
  { "url": "digitimes", "ext": true },
  { "url": "kocpc", "ext": false },
  { "url": "xfastest", "ext": false },
  { "url": "taisounds", "ext": false },
  { "url": "technews", "ext": false },
  { "url": "cna", "ext": false },
  { "url": "ctee", "ext": true },
  { "url": "chinatimes", "ext": true },
  { "url": "nextapple", "ext": false },
  { "url": "setn", "ext": false },
  { "url": "techbang", "ext": false },
  { "url": "cnyes", "ext": false },
  { "url": "saydigi", "ext": false },
  { "url": "compotechasia", "ext": false },
  { "url": "inside", "ext": false },
  { "url": "aotter", "ext": false },
  { "url": "ctimes", "ext": false },
  { "url": "ntdtv", "ext": false },
  { "url": "cw", "ext": false },
  { "url": "2cm", "ext": false },
  { "url": "mem", "ext": false },
  { "url": "ctwant", "ext": false },
  { "url": "bnext", "ext": true },
  { "url": "lpcomment", "ext": false },
  { "url": "investor", "ext": false },
  { "url": "moneydj", "ext": false },
  { "url": "wealth", "ext": true },
  { "url": "cts", "ext": false },
  { "url": "ebc", "ext": false },
  { "url": "ftvnews", "ext": false },
  { "url": "tvbs", "ext": false },
  { "url": "ustv", "ext": false },
  { "url": "gvm", "ext": false },
  { "url": "businessweekly", "ext": false }
]
