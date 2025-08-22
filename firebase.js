// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "1234567890",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


 // ฟังก์ชันบันทึกข้อมูล
async function saveData(name, amount) {
  try {
    await addDoc(collection(db, "sales"), {
      name: name,
      amount: amount,
      createdAt: new Date()
    });
    console.log("บันทึกข้อมูลสำเร็จ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}