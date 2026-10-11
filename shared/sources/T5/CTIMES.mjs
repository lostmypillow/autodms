export function CTIMES($) {
  const data = $.extract({
    title: "title",
    date: {
      selector: "div.gary12",
      value: (el) =>
        $(el)
          .text()
          .trim()
          .split("】")[1]
          .trim()
          .split(" ")[0]
          .replace(/(\d{4})年(\d{1,2})月(\d{1,2})日/, "$1-$2-$3"),
    },
    author: "a[href*='V=AUTHOR']:first",
    content: [
      {
        selector: "span.news > p",
        value: (el) => $(el).text().trim(),
      },
    ],
  });
  data["source"] = "CTIMES";
  return data;
}
