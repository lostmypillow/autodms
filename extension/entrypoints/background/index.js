import axios from "axios";
export default defineBackground(() => {
  function sendToFunction(url, data) {
    axios
      .post(url, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "importFromBackground") {
      const data = message.data;
      browser.tabs.create({ url: data.url }, (newTab) => {
        browser.scripting.executeScript({
          target: { tabId: newTab.id },
          files: ["content.js"],
        });
      });
    } else if (message.action === "HTMLFromContent") {
      sendToFunction("/exthtml", {
        html: message.html,
        url: message.url,
      });

      browser.tabs.remove(sender.tab.id);
    }
  });
});

//   browser.tabs.create({ url: message.url }, (newTab) => {
//     // Inject the content script into the new tab
//     browser.scripting.executeScript({
//         target: { tabId: newTab.id },
//         files: ['content.js']
//     });

//     // Set a listener to receive the response from the content script
//     browser.runtime.onMessage.addListener((request, sender) => {
//         if (request.action === "sendHTMLFromContent") {
//             console.log("Received HTML:", request.html);
//             // You can handle the received HTML here

//             // Optionally, close the tab after receiving the HTML
//             browser.tabs.remove(sender.tab.id);
//         }
//     });
// });
// console.log(currentYear, currentDate);
// console.log("message recieved: ", message.data);
// createDoc(message.data);
// console.log("saved to Firestore");
// return true;
