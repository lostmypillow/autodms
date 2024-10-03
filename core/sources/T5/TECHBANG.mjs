export function TECHBANG($) {
  const data = $.extract({
    title: [{ selector: "title", value: (el) => $(el).text().trim() }],
    date: [
      {
        selector: "meta[property=article:published_time]",
        value: (el) => $(el).attr("content").split("T")[0],
      },
    ],
    author: "a.nickname:first",
    content: [
        {
          selector: "div.article-content > p",
          value: (el) => $(el).text().trim(),
        },
      ],
  });
  data["source"] = "T客邦"
  return data;
}
