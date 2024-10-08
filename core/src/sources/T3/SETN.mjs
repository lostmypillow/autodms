export function SETN($) {
  const data = $.extract({
    title: [{selector: "title", value: (el) => $(el).text().trim()}],

    date: [
      {
        selector: "meta[name=lastmod]",
        value: (el) => $(el).attr("content").split("T")[0],
      },
    ],
    author: [
      {
        selector: "div p:not([style]):first",
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
    ],
  });
  data["source"] = "三立新聞網";
  data["content"] = [];

  $("div p:not([style])")
    .slice(1)
    .each(function () {
      data["content"].push($(this).text());
    });
  return data;
}
