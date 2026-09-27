export function MEM($) {
  const data = $.extract({
    title: "h1.mem-post-single-title",
    date: {
      selector: "meta[property=article:modified_time]",
      value: (el) => $(el).attr("content").split('T')[0],
    },
    content: [{
        selector: "div.mem-post-single-content.mem-section > p"
    }]
  });
  data['author'] = ''
  data['source'] = '新電子科技雜誌'
  return data;
// return $.html()
}
