import { processHTML } from './processHTML.mjs';
import { v4 as uuid } from 'uuid';
import * as cheerio from 'cheerio';
import { checkLinkSupportStatus } from './checkLinkSupportStatus.js';
import type { LinkSupportStatus } from './types.ts';

export async function dmsScrape(link: string, html: string | null = null) {
  if (html) {
    return processHTML(link, html);
  }
  const linkSupportStatus: LinkSupportStatus = checkLinkSupportStatus(link);
  if (!linkSupportStatus.isSupported) {
    return {
      error: 'Link not supported',
      title: '',
      url: link,
      id: uuid(),
    };
  }
  if (linkSupportStatus.needsExt) {
    return {
      error: 'Supported But Needs extension',
      title: '',
      url: link,
      id: uuid(),
    };
  }

  if (!checkLinkSupportStatus(link).needsExt) {
    if (link.includes('lpcomment') && link.includes('/amp/')) {
      link = link.replace('amp/', '');
    }
    const $ = cheerio.load(await (await fetch(link)).text());
    $('script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins').remove();
    $('*').each(function () {
      let content: string | null = $(this).html();
      if (content) {
        content = content.replace(/\$\{/g, '');
        $(this).html(content);
      }
    });
    return processHTML(link, $.html());
  } else {
    return {
      error: 'Not Supported At All',
      title: '',
      url: link,
      id: uuid(),
    };
  }
}
