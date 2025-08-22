
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "YOUR_APP_ID"
// };

// เริ่มใช้งาน Firebase
firebase.initializeApp(firebaseConfig);

// เรียกใช้งาน Firestore
const db = firebase.firestore();

// import { db } from "./firebase.js";
// import { collection, addDoc } from "firebase/firestore";

// ตัวอย่างการบันทึกข้อมูล
async function saveCustomer() {
  try {
    await addDoc(collection(db, "customers"), {
      name: "ลูกค้าทดสอบ",
      email: "test@example.com",
      createdAt: new Date()
    });
    console.log("บันทึกข้อมูลเรียบร้อย");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

saveCustomer();



import { db } from "./firebase.js";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const form = document.getElementById("customerForm");
const paymentType = document.getElementById("paymentType");
const cashFields = document.getElementById("cashFields");
const installmentFields = document.getElementById("installmentFields");
const totalIncomeEl = document.getElementById("totalIncome");

// เปลี่ยนฟิลด์ตามการเลือกชำระเงิน
paymentType.addEventListener("change", () => {
  if (paymentType.value === "cash") {
    cashFields.style.display = "block";
    installmentFields.style.display = "none";
  } else {
    cashFields.style.display = "none";
    installmentFields.style.display = "block";
  }
});

// สมมติว่าคนคีย์ชื่อเก็บไว้แบบนี้ (ทีหลังทำ Auth ได้)
const currentUser = "พนักงานA";

// ฟอร์ม submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    customerName: document.getElementById("customerName").value,
    address: document.getElementById("address").value,
    productName: document.getElementById("productName").value,
    price: parseFloat(document.getElementById("price").value),
    paymentType: paymentType.value,
    createdBy: currentUser,
    createdAt: new Date()
  };

  if (paymentType.value === "cash") {
    data.paidAmount = parseFloat(document.getElementById("paidAmount").value);
  } else {
    data.firstPayment = parseFloat(document.getElementById("firstPayment").value);
    data.installments = parseInt(document.getElementById("installments").value);
  }

  try {
    await addDoc(collection(db, "customers"), data);
    alert("บันทึกข้อมูลเรียบร้อย");
    form.reset();
    updateIncome();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// ฟังก์ชันรวมรายได้
async function updateIncome() {
  const q = query(collection(db, "customers"));
  const snapshot = await getDocs(q);

  let total = 0;
  snapshot.forEach((doc) => {
    const d = doc.data();
    if (d.paymentType === "cash" && d.paidAmount) {
      total += d.paidAmount;
    } else if (d.paymentType === "installment" && d.firstPayment) {
      total += d.firstPayment; // หรือจะบวกยอดรวมทั้งหมดก็ได้
    }
  });

  totalIncomeEl.textContent = total + " บาท";
}

// โหลดรายได้ทันทีเมื่อเข้าเว็บ
updateIncome();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj9gWD2Px4Fnh5x7dasYBOluTyMD6HUR0",
  authDomain: "webjj-376d9.firebaseapp.com",
  projectId: "webjj-376d9",
  storageBucket: "webjj-376d9.firebasestorage.app",
  messagingSenderId: "717462816877",
  appId: "1:717462816877:web:3e1d003f38ab7c70b29764",
  measurementId: "G-1PYYE92CPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);