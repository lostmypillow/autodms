export function NXTAPPLE($) {
  const data = $.extract({
    title: "title",
   
    date: [
      {
        selector: "time:first",
        value: (el) => $(el).attr("datetime").split("T")[0],
      },
    ],
    author: [
      {
        selector: "a[href^='https://tw.nextapple.com/search/author/']",
        value: (el) => $(el).text().trim(),
      },
    ],
    content: [
      {
        selector: "div.post-content > p",
        value: (el) => {
          if ($(el).text().trim() !== "") {
            return $(el).text().trim();
          }
        },
      },
    ],
  });
  data["source"] =  "壹蘋新聞網"
  return data;
}
