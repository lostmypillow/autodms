const firebaseConfig = {
    apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
    authDomain: "compassprdms.firebaseapp.com",
    projectId: "compassprdms",
    storageBucket: "compassprdms.appspot.com",
    messagingSenderId: "189553958868",
    appId: "1:189553958868:web:38e313ca61559c42d74041",
  };
  
  import { initializeApp } from "firebase/app";
  import {
    collection,
    query,
    where,
    setDoc,
    onSnapshot,
    getFirestore,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    increment,
    doc,
    getCountFromServer,
  } from "firebase/firestore";
  import { store } from "../dashboard/store";
  import { connectFirestoreEmulator } from "firebase/firestore";
  const app = initializeApp(firebaseConfig);
  
  export const firebaseStore = reactive({
    db: null,
    originalDoc: null,
    currentlyEditingDoc: null,
    data: [],
  
    initDb() {
      this.db = getFirestore(app);
      connectFirestoreEmulator(this.db, "127.0.0.1", 8080);
      function handleSnapshot(querySnapshot) {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("New data: ", change.doc.data());
            this.data.push(change.doc.data());
          }
          // if (change.type === "modified") {
          //     console.log("Modified data: ", change.doc.data());
          //     const index = this.data.findIndex(obj => obj.id === change.doc.data().id);
          //     if (index !== -1) {
          //         // Overwrite the existing object
          //         this.data[index] = change.doc.data();
          //     }
          // }
          // if (change.type === "removed") {
          //     const index = this.data.findIndex(obj => obj.id === change.doc.data().id);
          //     if (index !== -1) {
          //         this.data.splice(index, 1);
          //     }
          //     console.log("Removed data: ", change.doc.data());
          // }
        });
      }
      const qualcomm = onSnapshot(
        query(this.collectionRef("Qualcomm相關新聞")),
        handleSnapshot
      );
  
      const mediatek = onSnapshot(
        query(this.collectionRef("MediaTek相關新聞")),
        handleSnapshot
      );
      const commu = onSnapshot(
        query(this.collectionRef("無線通訊市場")),
        handleSnapshot
      );
      const phone = onSnapshot(
        query(this.collectionRef("智慧型手機")),
        handleSnapshot
      );
      const other = onSnapshot(
        query(this.collectionRef("其他業界重要訊息")),
        handleSnapshot
      );
    },
    ////REFERENCES
    collectionRef(category) {
      return collection(this.db, store.currentYear, store.currentDate, category);
    },
    docRef(category, id) {
      return doc(
        this.db,
        store.currentYear + "/" + store.currentDate + "/" + category + "/" + id
      );
    },
    ////SNAPSHOTS
    async docSnap(category, id) {
      return await getDoc(this.docRef(data.category, data.id));
    },
    async returnPriority(category) {
      return (await getCountFromServer(this.collectionRef(category))).data()
        .count;
    },
    ////CREATE DOCUMENT
    async createDoc(data) {
      await setDoc(this.docRef(data.category, data.id), data, { merge: true });
      data["priority"] == undefined
        ? await updateDoc(this.docRef(data.category, data.id), {
            priority: await this.returnPriority(data.category),
          })
        : "";
    },
    setCurrentlyEditing(data) {
      const docSnap = this.docSnap(data.category, data.id);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.originalDoc = this.currentlyEditingDoc = docSnap.data();
      }
    },
    ////UPDATE DOCUMENT
    /////updating category: updateDoc(data)
    /////changing priority: updatedDoc(data, 'down')
    /////saving edits: updateDoc(data)
    async updateDoc(data, changeType) {
      var categoryChanged = determineCategoryChange(
        this.originalDoc,
        this.currentlyEditingDoc
      );
      if (categoryChanged) {
        //handle category change
        await deleteDoc(
          this.docRef(this.originalDoc.category, this.originalDoc.id)
        );
        delete this.currentlyEditingDoc["priority"];
        await addData(this.currentlyEditingDoc);
      } else if (changeType == "down" || changeType == "up") {
        //handle priority change
        // get the next doc of priority + 1's querysnapshot
        this.currentlyEditingDoc = data;
        const changedDocPriority =
          changeType == "down"
            ? this.currentlyEditingDoc.priority + 1
            : this.currentlyEditingDoc.priority - 1;
        const originalPriChange = changeType == "down" ? 1 : -1;
        const changedPriChange = changeType == "down" ? -1 : 1;
  
        const querySnapshot = await getDocs(
          query(
            this.collectionRef(this.currentlyEditingDoc.category),
            where("priority", "==", changedDocPriority),
            limit(1)
          )
        );
        //if querysnapshot is not empty, we get the next doc's data
        if (!querySnapshot.empty) {
          const nextDoc = querySnapshot.docs[0].data();
  
          await updateDoc(
            this.docRef(
              this.currentlyEditingDoc.category,
              this.currentlyEditingDoc.id
            ),
            {
              priority: increment(originalPriChange),
            }
          );
          await updateDoc(this.docRef(nextDoc.category, nextDoc.id), {
            priority: increment(changedPriChange),
          });
        } else {
          console.log("query snapshot is empty");
        }
      } else {
        //normal update
        await updateDoc(this.docRef(data.category, data.id), data);
      }
    },
    async readDoc(category) {
      return this.data
        .filter((x) => x.category == category)
        .sort((a, b) => a.priority - b.priority);
    },
  });
  