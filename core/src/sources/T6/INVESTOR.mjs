export function INVESTOR($) {
  const data = $.extract({
    title: "h2.page-name",
    date: {
      selector: "div.time",
      value: (el) => $(el).text().split("　")[0].replace(/\//g, "-"),
    },
    author: {
      selector: "div.boxTitle > p:first",
      value: (el) => {
        function extractAuthor(text) {
            const match = text.match(/【財訊快報\／(.+?)】/);
            return match ? match[1] : null;
          }

        return extractAuthor($(el).text())
      },
    },
    content: [
        {
            selector: "div.boxTitle > p"
        }
    ]
  });
  data['source'] = '財訊快報'
  return data;
}
