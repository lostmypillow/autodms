export function LTN3C($) {
  const data = $.extract({
    title: "div.whitecon.borderline.boxTitle.boxText h1",
    date: 
      {
        selector: "span.time",
        value: el => $(el).text().split(" ").slice(0)[0].replace(/\//g, "-"),
      },
   
    author: 
      {
        selector: "span.author",
        value: el => $(el).text().split("").slice(-3).join(""),
      },
  
    content: [
      {
        selector: "div.text p",

      },
    ],
  });
  data["source"] = "自由時報"
  return data;
}
