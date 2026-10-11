export function CTS($) {
  const data = $.extract({
    title: {
      selector: "meta[name='title']",
      value: (el) => $(el).attr("content").replace(" - 華視新聞網", ""),
    },
    author: {
      selector: "div.artical-content > p:first",
      value: (el) => $(el).text().replace(/ /g, '').slice(0, $(el).text().replace(/ /g, '').indexOf('綜合報導')),
    },
    content: [
        {
            selector: "div.artical-content > p",
            value: (el) => $(el).text().includes('綜合報導') ? '' :$(el).text()
        },
    ],
    date: {
      selector: "time.artical-time",
      value: (el) => $(el).attr('datetime').split('T')[0].replace(/\//g, '-')
    }

  });
  data['source'] = '華視'
  return data;
}
