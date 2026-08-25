export function NTDTV($) {
  const data = $.extract({
    title: {
      selector: "title",
      value: (el) =>
        $(el).text().includes(" - 新唐人亞太電視台")
          ? $(el).text().replace(" - 新唐人亞太電視台", "")
          : $(el).text(),
    },
    date: {
      selector: "div.article_time",
      value: (el) => $(el).text().split(" ")[0],
    },
    author: {
      selector: "div#article_content > p:last",
      value: (el) => $(el).text().split(" ")[1],
    },
    content: [
        {
            selector: "div#article_content > p"
        }
    ]
  });
  data["source"] = "新唐人亞太電視台";
  return data;
}
