export function INSIDE($) {
  const data = $.extract({
    title: { selector: "title", value: (el) => $(el).text().trim() },
    author: "a.author.url.fn",
    date: {
      selector: "li.post_date:first span",
      value: (el) => $(el).text().replace(/\//g, "-"),
    },

    content: [{ selector: "section.js-article-content-body p" }],
  });
  data["source"] = "Inside";
  return data;
}
