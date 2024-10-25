export function MONEYDJ($) {
  const data = $.extract({
    title: {
      selector: 'meta[property="og:title"]',
      value: (el) => $(el).attr('content').replace("-MoneyDJ理財網", ""),
    },
    date: {
      selector: "time",
      value: (el) => $(el).attr("datetime").split("T")[0],
    },
    author: {
      selector: "p:first",
      value: (el) =>
        $(el).text().split(" ")[$(el).text().split(" ").indexOf("記者") + 1],
    },
    content: [
        {
            selector: 'article > p'
        }
    ]
  });
  data["source"] = "MoneyDJ";
  return data;
}
