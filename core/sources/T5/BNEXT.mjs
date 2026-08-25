export function BNEXT($) {
  const data = $.extract({
    title: {selector: "meta[property='og:title']", value: (el) => $(el).attr('content')},
    date: {
      selector: "meta[name='my:publish_date']",
      value: (el) => $(el).attr('content').split("T")[0],
    },
    author: "a[href^='https://www.bnext.com.tw/author/'] > span",
    content: [{
        selector: 'div.htmlview.article-content:first p'
    }]
  });
  data['source'] = '數位時代'
  return data;
  // return $.html()
}
