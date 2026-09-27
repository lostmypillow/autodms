import type { CheerioAPI } from 'cheerio'
import type { NewsArticle } from 'shared/dmsScrape/interfaces.js'
export function COOL3C($: CheerioAPI): NewsArticle {
    const data: NewsArticle = {
        title: '',
        date: '',
        author: '',
        content: [],
        source: 'string;',
    }
    data.title = $(
        'header.col-12:nth-child(1) > div:nth-child(1) > h1:nth-child(1)'
    )
        .text()
        .replace(/[\u00A0\u3000]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace('\n', '')
        .replace(' ', '')
        .trim()
    data.date = $('meta[property="article:published_time"]')
        .attr('content')
        .split('T')[0]
        .trim()
    data.author = $('meta[name="author"]').attr('content').trim()

    $('div.row.content div p').each(function () {
        const text = $(this).html().trim()
        if (!text.startsWith('<img') && !text.startsWith('▲')) {
            data.content.push(text.replace('undefined', '').trim())
        }
    })
    data.source = 'Cool3c'
    return data
}
