export function TECHORANGE($) {
  const data = $.extract({
    title: { selector: "title", value: (el) => $(el).text().trim() },

    date: {
      selector: "meta[property=article:modified_time]",
      value: (el) => $(el).attr("content").split("T")[0],
    },

    author: {
      selector: "meta[name=twitter:data1]",
      value: (el) => $(el).attr("content"),
    },

    content: [
      {
        selector: "div.elementor-widget-container > p",
        value: (el) => $(el).text().trim(),
      },
    ],
  });
  data["source"] = "科技報橘";
  return data;
}
