export async function scrape(link) {
    let response
try {
   response  = await fetch(link)
} catch (error) {
    
}
return  response.text()
}

// export function get() {

// }
console.log("test")
console.log(await scrape("https://www.ctee.com.tw/news/20240805700832-431207"))

