export function TECHNEWS($) {
  let data = {};
  data["title"] = $("h1.entry-title").text();
  data["content"] = [];
  let dateParts = $("span.body:nth-of-type(4)")
    .text()
    .match(/(\d{4}) 年 (\d{2}) 月 (\d{2}) 日/);
  data["date"] = `${dateParts[1]}-${dateParts[2]}-${dateParts[3]}`;
  data["source"] = "科技新報";
  data["author"] = $("[rel=author]").text().replace(" ", "");

  $("div.indent p").each((i, element) => {
    data["content"].push($(element).text().trim());
  });

  return data;
}
