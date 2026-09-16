export function GVM($) {
  const data = $.extract({
    title: { selector: "div.article-head", value: (el) => $(el).attr("title") },
    author: {
      selector: "div.article-head",
      value: (el) => $(el).attr("author"),
    },
    date: {
      selector: "div.article-head",
      value: (el) => $(el).attr("pub_date"),
    },
    content: [
      {
        selector: "div.article-content.article-content_level-0 p",
      },
    ],
  });
  data["source"] = "遠見";
  return data;
}
