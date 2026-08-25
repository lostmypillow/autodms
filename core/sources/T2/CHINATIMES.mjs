/////chinatimes bug time wrong
// https://www.chinatimes.com/realtimenews/20240820002976-260412?chdtv
// case link.includes("chinatimes"):
//   title = $("h1.article-title").text();
//   date_source_author =
//     $("span.date").first().text() +
//     " / " +
//     $("div.source").text() +
//     " / " +
//     $("div.author").text();

//   content = [];
//   $("div.article-body p").each((index, element) => {
//     if (!$(element).text().trim() == "") {
//       content.push($(element).text().trim());
//     }
//   });
//   break;
//////
export function CHINATIMES($) {
  const data = $.extract({
    title: "h1.article-title",
    date: {
      selector: "span.date:first",
      value: (el) => $(el).text().replace(/\//g, "-"),
    },

    source: { selector: "div.source", value: (el) => $(el).text().trim() },
    author: { selector: "div.author", value: (el) => $(el).text().trim() },
    content: [
      {
        selector: "div.article-body p",
        value: (el) => {
          if ($(el).text().trim() !== "") {
            return $(el).text().trim();
          }
        },
      },
    ],
  });
  return data;
}
