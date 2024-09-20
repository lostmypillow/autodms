import { LTN3C } from "../sources/T2/LTN3C.mjs";
import { LTNEC } from "../sources/T2/LTNEC.mjs";
import { UDN } from "../sources/T2/UDN.mjs";
import { UDNMoney } from "../sources/T1/UDNMoney.mjs";
import { ETDAY } from "../sources/T4/ETDAY.mjs";
import { EPRICE } from "../sources/T5/EPRICE.mjs";
import { COOL3C } from "../sources/T5/COOL3C.mjs";
import { MASHDIGI } from "../sources/T5/MASHDIGI.mjs";
import { SOGI } from "../sources/T5/SOGI.mjs";
import * as cheerio from "cheerio";
import { TECHORANGE } from "../sources/T5/TECHORANGE.mjs";
import { DIGITIMES } from "../sources/T1/DIGITIMES.mjs";
import { KOCPC } from "../sources/T5/KOCPC.mjs";
import { XF } from "../sources/T5/XF.mjs";
import { TAISOUNDS } from "../sources/T4/TAISOUNDS.mjs";
import { TECHNEWS } from "../sources/T5/TECHNEWS.mjs";
import { CNA } from "../sources/T4/CNA.mjs";
import { handleUnsupported } from "../sources/handleUnsupported.mjs";
export function determineSource(link) {
  // if (link.includes("3c") == undefined) {
  //   return handleUnsupported;
  // } else
   if (link.includes("3c.ltn")) {
    return LTN3C; // Return the corresponding function
  } else if (link.includes("ec.ltn")) {
    return LTNEC;
  } else if (link.includes("money.udn")) {
    return UDNMoney;
  } else if (link.includes("udn")) {
    return UDN;
  } else if (link.includes("ettoday")) {
    return ETDAY;
  } else if (link.includes("eprice")) {
    return EPRICE;
  } else if (link.includes("cool3c")) {
    return COOL3C;
  } else if (link.includes("mashdigi")) {
    return MASHDIGI;
  } else if (link.includes("sogi")) {
    return SOGI;
  } else if (link.includes("techorange")) {
    return TECHORANGE;
  } else if (link.includes("digitimes")) {
    return DIGITIMES;
  } else if (link.includes("kocpc")) {
    return KOCPC;
  } else if (link.includes("xfastest")) {
    return XF;
  } else if (link.includes("taisounds")) {
    return TAISOUNDS;
  } else if (link.includes("technews")) {
    return TECHNEWS;
  } else if (link.includes("cna")) {
    return CNA;
  } else {
    return handleUnsupported(link);
  }
}

// export function processHTML(link, html) {
//   const handlerFunction = determineSource(link);
//   return handlerFunction == handleUnsupported
//     ? handlerFunction(cheerio.load(html))
//     : handlerFunction(link);
// }
