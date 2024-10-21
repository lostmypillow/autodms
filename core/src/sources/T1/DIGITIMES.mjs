

export function DIGITIMES($) {
  const data = $.extract({
    title: "h1.news-title",
    date: {selector: "time:first", value: (el) => $(el).text().replace(/(\d{4})\/(\d{2})\/(\d{2}) .*/, '$1-$2-$3')},
    
    content: [
      {
        selector: "div#newsText.Article.clearfix.txt-20 > p",
        value: (el, key) => {
          // const sampleKey = this.findIndex(item  => item.includes("延伸閱讀"))
          if ($(el).text().trim().replace(/\t/g, '') != '') {
            return $(el).text().trim().replace(/\t/g, '').trim();
          }
        },
      },
    ],
  });
  data["source"] = "電子時報";
  data["author"] = $("font").first().text();
  return data;
}
