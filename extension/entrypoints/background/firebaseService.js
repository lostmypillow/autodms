import { connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getApp } from "firebase/app";
import { getApps } from "firebase/app";
class FirebaseService {
  constructor() {
    if (!FirebaseService.instance) {
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
      };

      // Initialize Firebase if it's not already initialized
      if (!getApps().length === 0) {
        this.app = initializeApp(firebaseConfig);
      } else {
        this.app = getApp();
      }

      // Initialize Firestore
      this.db = getFirestore(this.app);
      connectFirestoreEmulator(this.db, "127.0.0.1", 8080);
  
  )
        

      FirebaseService.instance = this;
    }

    return FirebaseService.instance;
  }

  // Method to get Firestore instance
  getFirestore() {
    return this.db;
  }
  docRef(category, id) {
    return doc(
      this.db,
      this.currentYear + "/" + this.currentDate + "/" + category + "/" + id
    );
  }
}

// Create a single instance and freeze it to ensure it's immutable
const instance = new FirebaseService();
Object.freeze(instance);

export default instance;
