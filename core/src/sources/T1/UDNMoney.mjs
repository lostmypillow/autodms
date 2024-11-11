export function UDNMoney($) {
    const data = $.extract({
        title: "h1#story_art_title",
        date: {
            selector: "time.article-body__time",
            value: el => $(el).text().replaceAll("/", "-").slice(0, 10),
        },

        author: {
            selector: "div.article-body__info > span",
            value: el => $(el).text().replace(/.*記者(.{3}).*/, "$1")
        },

        content: [
            {
                selector: "section.article-body__editor p",
                value: el => $(el).text().trim()
                    .replace(/\$\(.*/s, "")
                ;

            },
        ],
    });
    data["source"] = "經濟日報";
    return data;
}

//minor unresolved additional headlines
