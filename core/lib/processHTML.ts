import * as cheerio from 'cheerio';

import { filterContent } from './filterContent.ts';
import { determineCategory } from './determineCategory.mjs';
import { sources } from '../sources/index.mjs';
import { NotSupportedError } from './customErrors.ts';

function determineSource(link: string): () => Record<string, any> {
  for (const [key, value] of Object.entries(sources)) {
    if (link.includes(key)) {
      return value;
    }
  }
  throw new NotSupportedError('AutoDMS does not support scraping for this website', link);
}
// function filterHTML(fullHTML) {
//   var tempDiv = document.createElement('div');
//   tempDiv.innerHTML = fullHTML;
//   var scriptsAndStyles = tempDiv.querySelectorAll(
//     'script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins',
//   );
//   scriptsAndStyles.forEach((tag) => tag.remove());
//   console.log(tempDiv.innerHTML);
// }

const convertArray = (inputArray) =>
  Array.isArray(inputArray) ? inputArray.toString().replace : inputArray;

export async function processHTML(link: string, html: string | null = null) {
  let sourceHTML = html;
  if (link && !html) {
    // Replace amp in URL
    if (link.includes('lpcomment') && link.includes('/amp/')) {
      link = link.replace('amp/', '');
    }

    // Scrape HTMl from fetch
    const $ = cheerio.load(await (await fetch(link)).text());

    // Remove unnecessary tags and symbols
    $('script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins').remove();
    $('*').each(function () {
      let content: string | null = $(this).html();
      if (content) {
        content = content.replace(/\$\{/g, '');
        $(this).html(content);
        sourceHTML = $.html();
      }
    });
  }
  if (!sourceHTML) {
    return;
  }

  const handlerFunction = determineSource(link);
  let scrapedContent;
  if (handlerFunction != 'unsupported') {
    scrapedContent = handlerFunction(cheerio.load(sourceHTML));

    scrapedContent['content'] = scrapedContent['content']
      ? filterContent(scrapedContent['content']).join('\n\n')
      : [];
    // scrapedContent["content"] = scrapedContent["content"].join("\n\n");

    scrapedContent['author'] = scrapedContent['author']
      ? convertArray(scrapedContent['author'])
      : '';

    scrapedContent['date'] = scrapedContent['date'] ? convertArray(scrapedContent['date']) : '';

    scrapedContent['title'] = scrapedContent['title']
      ? convertArray(scrapedContent['title'])
          .replace(/《[^》]*》/g, '')
          .trim()
      : '';

    scrapedContent['category'] = determineCategory(scrapedContent['title']);
    scrapedContent['url'] = link;
  } else {
    scrapedContent = {
      error: handlerFunction,
      url: link,
    };
  }

  return scrapedContent;
}
