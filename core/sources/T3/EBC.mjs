export function EBC($) {
    const data = $.extract({
title: "div.article_header > h1",
date: "div.article_date",
author: {selector: "a[href^='/search/author/']", value: (el) => $(el).text().trim()},
content: [
    {
        selector: "div.article_content > p"
    }
]
    })
    return data
}