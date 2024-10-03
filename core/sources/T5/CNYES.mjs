export function CNYES($) {
  const data = $.extract({
    title: [{ selector: "title", value: (el) => $(el).text().trim() }],
    date: [
      {
        selector: "p:contains('2024'):first",
        value: (el) => $(el).text().split("  ")[1].split(" ")[0],
      },
    ],
    author: [
      {
        selector: "p:contains('2024'):first",
        value: (el) => $(el).text().split("  ")[0].replace(" ", ""),
      },
    ],
    content: [
      {
        selector: "main#article-container section p",
        value: (el) => $(el).text().trim(),
      },
    ],
  });
  data["source"] = "鉅亨網"
  return data;
}
