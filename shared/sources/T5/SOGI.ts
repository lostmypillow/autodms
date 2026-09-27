import type { CheerioAPI } from 'cheerio'
import type { NewsArticle } from 'shared/dmsScrape/interfaces.js'

export function SOGI($: CheerioAPI): NewsArticle {
  const data = $.extract({
      title: 'h1.h1',
      author: {
          selector: 'div.d-inline-block:nth-child(2) > a:nth-child(2)',
      },
  })

  data['date'] = $('div.d-inline-block.mr-3')
      .first()
      .text()
      .replace('\n', '')
      .trim()
      .replace(/\//g, '-')
      .split(' (')[0]

    const $clone = $('div.editable.my-2').clone()

    // Replace <br> tags with newline tokens
    $clone.find('br').replaceWith('\n')

    data['content'] = $clone
        .text()
        // Replace non-breaking spaces, full-width spaces, and zero-width spaces
        .replace(
            /[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g,
            ' '
        )
        // Split on two or more consecutive newlines
        .split(/\n\s*\n+/)
        // Clean whitespace inside each paragraph
        .map((line) => line.replace(/\s+/g, ' ').trim())
        .filter((line) => line.length > 0)
  data["source"] = "手機王";

  return data;
}
