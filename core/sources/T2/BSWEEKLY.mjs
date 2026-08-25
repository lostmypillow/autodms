export function BSWEEKLY($) {
  const data = $.extract({
    title: "h1.Single-title-main.col-lg-10",
    date: {
      selector: "meta[property='article:published_time']",
      value: (el) => $(el).attr("content").split("T")[0],
    },
    author: {
      selector: "div.Single-author-row-name",
      value: (el) => $(el).text().trim(),
    },
    content: [
        {
            selector: "div.Single-article.WebContent p"
        }
    ]
  });
  return data;
}
