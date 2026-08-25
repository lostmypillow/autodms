export function CNA($) {
  const data = $.extract({
    title: "h1:first",
    content: [
      {
        selector: "div.paragraph > p",
        value: (el, key) => {
          return $(el).text();
        },
      },
    ],
    author: {
      selector: "div.paragraph > p",
      value: (el, key) => {
        if ($(el).text().includes("（中央社")) {
          let index = $(el).text().indexOf("記者");

          // Extract the 3 characters after "記者"
          return $(el)
            .text()
            .substring(index + 2, index + 5);
          // return index
        }
      },
    },
  });
  data["date"] = $('meta[property="article:published_time"]')
    .attr("content")
    .slice(0, 10);
  data["source"] = "中央社";
  return data;
}
