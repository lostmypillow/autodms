export function LTNEC($) {
  const data = $.extract({
    headline: "div.whitecon.boxTitle.boxText h1",
    date: [
      {
        selector: "span.time:nth-of-type(1)",
        value: (el, key) => {
          const data = $(el).text().split(" ").slice(0)[0].replace(/\//g, "-");
          if (data != "") {
            return data;
          }
          
        },
      },
    ],
    author: [
      {
        selector: "div.text p:nth-of-type(2)",
        value: (el) => {
          const data = $(el).text().split("／")[0];
          return data;
        },
      },
    ],
    content: [
      {
        selector: "div.text p",
        value: (el, key) => {
          const text = $(el)
            .text()
            .trim()
            .replace(/〔.*?〕/g, "");
          return text;
        },
      },
    ],
  });

  return data;
}
