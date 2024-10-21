export function AOTTER($) {
  const data = $.extract({
    title: [{ selector: "h1.ag-article__title", value: (el) => $(el).text().trim() }],
    author: [
      {
        selector: "a.ag-article__authorlink:first",
        value: (el) => ($(el).text() == "編輯室" ? "" : $(el).text()),
      },
    ],
    date: {selector: "time:first", value: (el) => $(el).text().replace(/\//g, '-')},
    content: [
      {
        selector: "div.ag-article__content > p",
        value: (el) => $(el).text().trim(),
      },
    ],
  });
  data['source'] = '電獺少女'
  return data;
}
