export function ETDAY($) {
  const data = $.extract({
    title: "h1.title",
    date: {
      selector: "time.date",
      value: el => (new Date($(el).attr("datetime"))).toISOString().split("T")[0]
    },

    author: {
      selector: "div > p:first",
      value: (el) => $(el).text().replace(/.*記者(.{3}).*/, "$1")
    },

    content: [
      {
        selector: "div.story > p",
        value: el => $(el).text().trim()
      },
    ],
  });
  data["source"] = "ETtoday";
  return data;
}
