export function KOCPC($) {
  let data = {};

  data["title"] = $("h1.jeg_post_title").text();
  data["date"] = $('div.jeg_meta_date > a')
    .text()
    .replace(/(\d{4}) 年 (\d{2}) 月 (\d{2}) 日/, "$1-$2-$3");
  data["source"] = "電腦王阿達";
  data["author"] = $("div.jeg_meta_author a").text();
  data["content"] = [];

  $("div.Zi_ad_ar_iR p").each((index, element) => {
    if (
      !$(element).text().trim() == "" &&
      !$(element).text().startsWith("<img")
    ) {
      data["content"].push(
        $(element)
          .text()
          .trim()
          .replace(/<[^>]*>/g, "")
      );
    }
  });
  return data;
}
