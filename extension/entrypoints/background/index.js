export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "importFull") {
      console.log("message recieved: ", message.data);
    }
  });
});
