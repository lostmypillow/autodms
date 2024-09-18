export function LTN3C($) {
  const data = $.extract({
    title: "div.whitecon.borderline.boxTitle.boxText h1",
    date: [
      {
        selector: "span.time",
        value: (el, key) => {
          const data = $(el).text().split(" ").slice(0)[0].replace(/\//g, "-");
          return data;
        },
      },
    ],
    author: [
      {
        selector: "span.author",
        value: (el) => {
          const data = $(el).text().split("").slice(-3).join("");
          return data;
        },
      },
    ],
    content: [
      {
        selector: "div.text p",
        value: (el, key) => {
          const text = $(el).text().trim();
          return text;
        },
      },
    ],
  });
  data["source"] = "自由時報"
  return data;
}
