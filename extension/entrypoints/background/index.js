import { connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getApps, initializeApp, getApp } from "firebase/app";
import { setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";
import { collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};
export default defineBackground(() => {
  const dateInstance = new Date();
  const currentYear = dateInstance.getFullYear().toString();
  const currentDate =
    String(dateInstance.getMonth() + 1).padStart(2, "0") +
    String(dateInstance.getDate()).padStart(2, "0");
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  function docRef(category, id) {
    return doc(db, currentYear + "/" + currentDate + "/" + category + "/" + id);
  }
  // function collectionRef(category) {
  //   return collection(db, currentYear, currentDate, category);
  // }
  async function createDoc(data) {
    await setDoc(docRef(data.category, data.id), data, { merge: true });
    console.log(data.category)
    console.log(data.id)
    // data["priority"] == undefined
    //   ? await updateDoc(docRef(data.category, data.id), {
    //       priority: (
    //         await getCountFromServer(collectionRef(data.category))
    //       ).data().count,
    //     })
    //   : "";
  }

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "importFull") {
      console.log(currentYear, currentDate);
      console.log("message recieved: ", message.data);
      createDoc(message.data);
      console.log("saved to Firestore");
      return true;
    }
  });
});
