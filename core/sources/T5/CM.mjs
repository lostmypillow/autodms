export function CM($) {
  const data = $.extract({
    title: {
      selector: "title",
      value: (el) => $(el).text().replace(" | 新通訊", ""),
    },
    date: "span.timeText",
    author: "a[href^='/2cm/Author.aspx']:first",
    content: [
      {
        selector: "div.tab-content > p",
      },
    ],
  });
  data["source"] = "新通訊元件雜誌";
  return data;
}
