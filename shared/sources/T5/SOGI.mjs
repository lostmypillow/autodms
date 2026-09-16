export function SOGI($) {
  const data = $.extract({
    title: "h1.h1",
    author: {
      selector: "div.d-inline-block.mr-3",
      value: function (el, key) {
        let cleanedText = $(el)
          .text()
          .trim()
          .replace(/[\n\s]/g, "");
        if (cleanedText.includes("特約編輯")) {
          var match = cleanedText.match(/by(.*?)特約編輯/);
        } else if (cleanedText.includes("編輯")) {
          var match = cleanedText.match(/by(.*?)編輯/);
        } else {
          var match = null;
        }
        if (match) {
          let result = match[1]; // This will give you the text between "by" and "特約編輯"
          return result.trim(); // Trimming in case there are extra spaces
        } else {
          console.log("No match found");
        }
      },
    },
  });

  data["date"] = $("div.d-inline-block.mr-3")
    .first()
    .text()
    .replace("\n", "")
    .trim()
    .replace(/\//g, "-");

  data["content"] = $("div.editable.my-2")
    .html() // Get inner HTML of the div
    .split(/<br\s*\/?>\s*<br\s*\/?>/i) // Split by two consecutive <br> tags
    .map((line) => line.trim()) // Trim whitespace from each line
    .filter((line) => line.length > 0);

  data["source"] = "手機王";

  return data;
}
