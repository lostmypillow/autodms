export function EPRICE($) {
  const data = $.extract({
    headline: "h1.title",
  });
  data["date"] = $("span.date")
    .first()
    .text()
    .replace(/.*?(\d{4}-\d{2}-\d{2}).*/, "$1");
  data["author"] = $("a.nickname").first().attr("title");

  data["content"] = $("div.user-comment-block")
    .first()
    .html() // Get inner HTML of the div
    .split(/<br\s*\/?>\s*<br\s*\/?>/i) // Split by two consecutive <br> tags
    .map((line) => line.trim()) // Trim whitespace from each line
    .filter((line) => line.length > 0);
    data["source"] = "ePrice"
  return data;
}
