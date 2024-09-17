export function TAISOUNDS($) {
  let data = {};
  data["title"] = $("div.news-box h1").text();
  data["date"] = "";
  data["source"] = "太報";
  data["author"] = $("a[href^='/more/reporternews']").text();
  data["content"] = [];
  return data;
}
