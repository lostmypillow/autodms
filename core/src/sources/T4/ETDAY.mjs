export function ETDAY($) {
  const data = $.extract({
    title: "h1.title",
    date: {
      selector: "time.date",
      value: (el, key) => {
        const date = new Date($(el).attr("datetime"));

        // Format the date to "YYYY-MM-DD"
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },

    author: {
      selector: "div > p:first",
      value: (el) => {
        const data = $(el).text();

        return data.replace(/.*記者(.{3}).*/, "$1");
      },
    },

    content: [
      {
        selector: "div.story > p",
        value: (el, key) => {
          // if (key > 1) {
          return $(el).text().trim();
          // }
        },
      },
    ],
  });
  data["source"] = "ETtoday";
  return data;
}
