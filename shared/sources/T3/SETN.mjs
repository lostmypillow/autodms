export function SETN($) {
  const data = $.extract({
      title: {
          selector: 'meta[property="og:title"]',
          value: (el) => $(el).attr('content').split('|')[0].trim() ?? '',
      },

      date: {
          selector: '.time_item span, .article_time_box span',
          value: (el) => {
              console.log('Found element:', $(el).html()); // see if this ever fires
              const raw = $(el).text().trim();
              return raw ? raw.split(/\s+/)[0].replace(/\//g, '-') : '';
          },
      },

      author: {
          selector: 'div p:not([style]):first',
          value: (el) =>
              $(el)
                  .text()
                  .match(/(?<=記者).{3}/)
                  ? $(el)
                        .text()
                        .match(/(?<=記者).{3}/)[0]
                        .trim()
                  : $(el).text(),
      },
  })
  data["source"] = "三立新聞網";
  data["content"] = [];

  $("div p:not([style])")
    .slice(1)
    .each(function () {
      data["content"].push($(this).text());
    });
  console.log(data)
  return data;
}
