export function DIGITIMES($) {
  let data = {};
  data["title"] = $("h1.news-title").text();
  data["date"] = $("time").text();
  data["source"] = "電子時報";
  data["author"] = $("font").first().text();
  data["content"] = [];
  return data;
}
