var fullHTML = document.documentElement.outerHTML;

// Create a temporary DOM element to manipulate the HTML
var tempDiv = document.createElement('div');
tempDiv.innerHTML = fullHTML;

// Remove all <script> and <style> tags
var scriptsAndStyles = tempDiv.querySelectorAll('script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins');
scriptsAndStyles.forEach(tag => tag.remove());

// Print the HTML without the <script> and <style> tags
console.log(tempDiv.innerHTML);