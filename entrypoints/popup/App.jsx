import { useState } from 'react';
import { browser } from 'wxt/browser';

function App() {
  const [count, setCount] = useState(0);
function openDash() {
browser.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
}
  return (
    <>
      <div>popup</div>
      <button onClick={openDash}>To Dashboard</button>
    </>
  );
}

export default App;
