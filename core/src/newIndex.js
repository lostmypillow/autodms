import {newSources} from './sources/index.mjs'
import * as cheerio from "cheerio";
import {LTN3C} from "./sources/T2/LTN3C.mjs";

const NeedsExt = link => newSources.some(source => link.includes(source.url) && source.ext);
const DoesntNeedExt = link => newSources.some(source => link.includes(source.url) && !source.ext);
const unneededTags = "script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins"

function newScrape(link) {
    // receives link
    // link replacements if needed
    let html
    link = link.includes("lpcomment") && link.includes("/amp/") ? link.replace("amp/", "") : link
    //check if it's supported
    if (NeedsExt(link)) {
        //call content script
        html = ""

    } else if (DoesntNeedExt(link)) {
        console.log("im here")
        let $
        fetch(link)
            .then(res => res.text())
            .then(htmlText => {
                    $ = cheerio.load(htmlText)
                    $(unneededTags).remove();
                    $("*").each(function () {
                        let content = $(this).html();
                        content = content.replace(/\$\{/g, "");
                        $(this).html(content);
                    });
                    return $
                }
            )
            .then(filteredHTML => {
                const selectorData = newSources.find((obj) => link.includes(obj['url']))
                const createField = (source, fieldName) => ({
                    selector: source[fieldName].selector,
                    value: el => source[fieldName].value === null ? $(el).text().trim() : source[fieldName].value($(el))
                });
                const data = filteredHTML.extract({
                    title: createField(selectorData, 'title'),
                    date: createField(selectorData, 'date'),
                    author: createField(selectorData, "author"),
                    content: [createField(selectorData, 'content')]
                })
                data['source'] = selectorData['source']
                console.log(data)
            })
    } else {
        //not supported
        return "not supported"
    }

    // const extractedData = $.extract({
    //     title: {selector: "", value: el =>},
    //     date: "",
    //     author: "",
    //     content: [{
    //         selector: ""
    //     }]
    // })
    // extractedData['source'] = ''
    // return extractedData

    // put the html thru processor

}

// https://www.ctee.com.tw/news/20240805700832-431207
console.log(newScrape("https://3c.ltn.com.tw/news/59270"))