import * as cheerio from 'cheerio'
export function XF($) {
  let data = $.extract({
    title: "span#thread_subject",
    date: {
      selector: 'em[id^="authorposton"]',
      value: (el) =>
        $(el).html().includes('span') ? cheerio.load($(el).html())('span').attr('title').split(' ')[0]  :
          $(el).text()
          .replace(
            /發表於 (\d{4})-(\d{1,2})-(\d{1,2})/,
            (match, year, month, day) => {
              const paddedMonth = month.padStart(2, "0");
              const paddedDay = day.padStart(2, "0");
              return `${year}-${paddedMonth}-${paddedDay}`;
            }
          ).split(' ')[0],
    },
  });

  data["source"] = "XFastest";
  data["author"] = $("a[href^='space-uid']").last().text();
  $('td[id^="post"]').each((index, element) => {
    let content = $(element)
      .html()
      .split(/<\/?[^>]+>/)
      .map((item) => item.trim()); // Trim all elements
    data["content"] = content;
  });
  return data;
}
