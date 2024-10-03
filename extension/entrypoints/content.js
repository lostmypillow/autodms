import { browser } from "wxt/browser";

export default defineContentScript({
  matches: ["https://*/*"],
  main() {
    // Get the full HTML of the document
    var fullHTML = document.documentElement.outerHTML;
    const pageURL = window.location.href;
    // Create a temporary DOM element to manipulate the HTML
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = fullHTML;

    // Remove all <script> and <style> tags
    var scriptsAndStyles = tempDiv.querySelectorAll("script, style, link");
    scriptsAndStyles.forEach((tag) => tag.remove());

    // Send the cleaned HTML back to the background script
    browser.runtime.sendMessage({
      action: "HTMLFromContent",
      html: tempDiv.innerHTML,
      url: pageURL
    });
  },
});
