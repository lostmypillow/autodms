export function TAISOUNDS($) {
  const data = $.extract({
    date: [
      {
        selector: "div.publish",
        value: (el, key) => {
          const eachValue = $(el).text().trim();
          if (eachValue !== "") {
            return eachValue.slice(0, 10);
          }
        },
      },
    ],
    
  });
  data["title"] = $("div.news-box h1").text();
  data["source"] = "太報";
  data["author"] = $("a[href^='/more/reporternews']").text();
  data["content"] = $("div.news-box-text.border").html().split("\n").filter((item) => item.includes("<br>")).toString().split(/<\/?[^>]+>/).filter((item)=> item != '')
  return data;
}
