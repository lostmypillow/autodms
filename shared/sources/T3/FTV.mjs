export function FTV($) {
  const data = $.extract({
    title: {
      selector: "meta[property='og:title']",
      value: (el) => $(el).attr("content").replace(" - 民視新聞網", ""),
    },
    date: {
      selector: "meta[property='article:published_time']",
      value: (el) => $(el).attr("content").split("T")[0],
    },
    author: {
      selector: "div#preface > p:first",
      value: (el) =>
        $(el).text().includes("／")
          ? $(el).text().split("／")[1].replace("報導", "")
          : "",
    },
    content: [
      {
        selector: "div#preface > p",
        value: (el) => (!$(el).text().includes("報導") ? $(el).text() : ""),
      },

    ],
  });
  $("div#newscontent p").each((index, element) => {
    data['content'].push($(element).text());
  });
  
  
  data["source"] = "民視新聞網";
  return data;
}
