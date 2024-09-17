import { LTN3C } from "./sources/T2/LTN3C.mjs";
import { LTNEC } from "./sources/T2/LTNEC.mjs";
import { UDN } from "./sources/T2/UDN.mjs";
import { UDNMoney } from "./sources/T1/UDNMoney.mjs";
import { ETDAY } from "./sources/T3/ETDAY.mjs";
import { EPRICE } from "./sources/T5/EPRICE.mjs";
import { COOL3C } from "./sources/T5/COOL3C.mjs";
import { MASHDIGI } from "./sources/T5/MASHDIGI.mjs";
import { SOGI } from "./sources/T5/SOGI.mjs";

export function getHandlerFunction(link) {
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
    return MASHDIGI
  } else if (link.includes("sogi")) {
    return SOGI
  }

  return null;
}
