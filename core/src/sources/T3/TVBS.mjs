export function TVBS($) {
  const data = $.extract({
    title: {
      selector: "meta[property='og:title']",
      value: (el) => $(el).attr("content").replace("│TVBS新聞網", ""),
    },
    date: {
      selector: "meta[property='article:published_time']",
      value: (el) => $(el).attr("content").split('T')[0],
    },
    author: {
      selector: "div.author > a[href^='/news/searchresult']",
    },
    content: [
        {
            selector: "div#news_detail_div.article_content",
            value: (el) => $(el).html().split('<br>')
        }
    ]
  });
  data["source"] = "TVBS";
  return data;
}
