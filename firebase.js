// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjgWD2Px4Fnh5x7dasYBO1uTyMD6HUR0",
  authDomain: "webjj-376d9.firebaseapp.com",
  databaseURL: "https://webjj-376d9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webjj-376d9",
  storageBucket: "webjj-376d9.appspot.com",
  messagingSenderId: "717462816877",
  appId: "1:717462816877:web:3e1d003f38ab7c70b29764",
  measurementId: "G-1PY9E92CPQ"
};
export const app = initializeApp(firebaseConfig);
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