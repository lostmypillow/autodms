export function XF($) {
  let data = {};
  data["title"] = $("span#thread_subject").text();

  const input = $('em[id^="authorposton"]').text();

  // Regular expression to match the date part and capture the year, month, and day
  const regex = /發表於 (\d{4})-(\d{1,2})-(\d{1,2})/;

  // Replace the matched date with the desired format
  const formattedDate = input.replace(regex, (match, year, month, day) => {
    // Ensure month and day are zero-padded to two digits
    const paddedMonth = month.padStart(2, "0");
    const paddedDay = day.padStart(2, "0");
    return `${year}-${paddedMonth}-${paddedDay}`;
  });
  data["date"] = formattedDate.slice(0, 10);
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
