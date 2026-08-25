export function EPRICE($) {
  $('a[href^="https://www.eprice.com.tw/ad/"]').remove()
  const data = $.extract({
    title: "h1.title",
  });
  data["date"] = $("span.date")
    .first()
    .text()
    .replace(/.*?(\d{4}-\d{2}-\d{2}).*/, "$1");
  data["author"] = $("a.nickname").first().attr("title");

  data["content"] = $("div.user-comment-block")
    .first()
    .html() // Get inner HTML of the div
    .split(/<br\s*\/?>/i) // Split by a single <br> tag

  
    data["source"] = "ePrice"
  return data;
}
