export function TECHUDN($) {
    const data  = $.extract({
title: "h1.story-title",
date: {selector: "time.article-content__time", value: (el) => $(el).text().split(' ')[0]},
author: "a[href^='/tech/author']:first",
content: [
    {
        selector: "article.story-article > p"
    }
]

    })
    data['source'] = '聯合新聞網'
    return data 
}