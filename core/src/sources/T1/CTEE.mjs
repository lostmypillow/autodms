export function CTEE($) {
  const data = $.extract({
    title: { selector: "h1.main-title", value: (el) => $(el).text().trim() },
    date: {
      selector: "li.publish-date time",
      value: (el, key) => {
        const data = $(el).text().replaceAll('.', '');
        return data;
      },
    },

    author: {
      selector: "span.name",
      value: (el) => $(el).text().trim(),
    },
    content: [
      {
        selector: "article p",
        value: (el, key) => {
          // const sampleKey = this.findIndex(item  => item.includes("延伸閱讀"))
          if ($(el).text().trim()) {
            return $(el).text().trim();
          }
        },
      },
    ],
  });
  data["source"] = "工商時報";
  return data;
}
