export function WEALTH($) {
  const data = $.extract({
    title: "title",
    date: {
      selector: "span.g4jRc.aDT8p.t1DSN.Z6TEj.JQK4Q",
      value: (el) => $(el).text().split(" ")[0].replace(/\//g, "-"),
    },
    author: "a[href^='/lists/authors']",
    content: [
      {
        selector: "div._Eqmk p",
      },
    ],
  });
  data["source"] = "財訊雙週刊";

  return data;
}
