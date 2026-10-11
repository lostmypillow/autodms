export function SAYDIGI($) {
  const data = $.extract({
    title: { selector: "title", value: (el) => $(el).text().trim() },
    date: {
      selector: "meta[property=article:modified_time]",
      value: (el) => $(el).attr("content").split("T")[0],
    },

    author: {
      selector: "meta[name=author]",
      value: (el) => $(el).attr("content"),
    },

    content: [
      {
        selector: "div.cttt > p",
        value: (el) => $(el).text().trim(),
      },
    ],
  });
  data["source"] = "點子生活";
  return data;
}
