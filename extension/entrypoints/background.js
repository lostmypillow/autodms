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
  let tempObj
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "importFromDash") {
      tempObj = message.data
      const url = message.data.url;
      browser.tabs.create({ url: url })
      .then((newTab) => {
        return browser.scripting.executeScript({
          target: { tabId: newTab.id },
          files: ["content-scripts/content.js"],
        });
      })
      .catch((error) => {
        console.error("Error creating tab or injecting script:", error);
      });
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
