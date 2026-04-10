import { sources } from './sources/index.mjs';
import type { LinkSupportStatus } from './types.ts';

export function checkLinkSupportStatus(link: string): LinkSupportStatus {
  let isSupported: boolean = false;
  let needsExt: boolean = false;
  for (const [key] of Object.entries(sources)) {
    if (link.includes(key)) {
      isSupported = true;
      break;
    } else {
      isSupported = false;
    }
  }
  const linksNeedText = [
    'https://www.digitimes',
    'https://www.ctee',
    'https://www.chinatimes',
    'https://buzzorange.com/techorange',
    'https://www.bnext.com.tw',
    'https://www.wealth.com.tw',
  ];
  for (const l of linksNeedText) {
    if (link.startsWith(l)) {
      needsExt = true;
      break;
    } else {
      needsExt = false;
    }
  }

  return {
    isSupported: isSupported,
    needsExt: needsExt,
  };
}
