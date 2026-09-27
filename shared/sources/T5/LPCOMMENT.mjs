export function LPCOMMENT($) {
    const data  = $.extract({
title: "h1.entry-title",
date: "time.entry-date.updated.published",
author: "a.url.fn.n:first",
content: [{
    selector: "div.entry-content > p"
}]
    })
    data['source'] = 'LPComment'
    return data
}