export function TECHORANGE($) {
  let data = {};
  data["title"] = $("h1.elementor-heading-title").text();
console.log($.html())
//   data["date"] = $("time").text();
//   data["source"] = "科技報橘";
//   data["author"] = $(
//     "span.elementor-icon-list-text.elementor-post-info__item.elementor-post-info__item--type-author"
//   )
//     .text()
//     .trim();
//   data["content"] = [];

//   $("div.elementor-widget-container > p").each((index, element) => {
//     if (
//       !$(element).text().trim().startsWith("還在靠社群媒體") &&
//       !$(element).text().trim().startsWith("訂閱即同意") &&
//       !$(element).text().trim().startsWith("＊本文開放")
//     ) {
//       data["content"].push($(element).text().trim());
//     }
//   });
  return data
}
