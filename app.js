
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "YOUR_APP_ID"
// };

// เริ่มใช้งาน Firebase
// firebase.initializeApp(firebaseConfig);

// // เรียกใช้งาน Firestore
// const db = firebase.firestore();

// // import { db } from "./firebase.js";
// // import { collection, addDoc } from "firebase/firestore";

// // ตัวอย่างการบันทึกข้อมูล
// async function saveCustomer() {
//   try {
//     await addDoc(collection(db, "customers"), {
//       name: "ลูกค้าทดสอบ",
//       email: "test@example.com",
//       createdAt: new Date()
//     });
//     console.log("บันทึกข้อมูลเรียบร้อย");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// saveCustomer();



// import { db } from "./firebase.js";
// import { collection, addDoc, getDocs, query } from "firebase/firestore";

// const form = document.getElementById("customerForm");
// const paymentType = document.getElementById("paymentType");
// const cashFields = document.getElementById("cashFields");
// const installmentFields = document.getElementById("installmentFields");
// const totalIncomeEl = document.getElementById("totalIncome");

// // เปลี่ยนฟิลด์ตามการเลือกชำระเงิน
// paymentType.addEventListener("change", () => {
//   if (paymentType.value === "cash") {
//     cashFields.style.display = "block";
//     installmentFields.style.display = "none";
//   } else {
//     cashFields.style.display = "none";
//     installmentFields.style.display = "block";
//   }
// });

// // สมมติว่าคนคีย์ชื่อเก็บไว้แบบนี้ (ทีหลังทำ Auth ได้)
// const currentUser = "พนักงานA";

// // ฟอร์ม submit
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const data = {
//     customerName: document.getElementById("customerName").value,
//     address: document.getElementById("address").value,
//     productName: document.getElementById("productName").value,
//     price: parseFloat(document.getElementById("price").value),
//     paymentType: paymentType.value,
//     createdBy: currentUser,
//     createdAt: new Date()
//   };

//   if (paymentType.value === "cash") {
//     data.paidAmount = parseFloat(document.getElementById("paidAmount").value);
//   } else {
//     data.firstPayment = parseFloat(document.getElementById("firstPayment").value);
//     data.installments = parseInt(document.getElementById("installments").value);
//   }

//   try {
//     await addDoc(collection(db, "customers"), data);
//     alert("บันทึกข้อมูลเรียบร้อย");
//     form.reset();
//     updateIncome();
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// });

// // ฟังก์ชันรวมรายได้
// async function updateIncome() {
//   const q = query(collection(db, "customers"));
//   const snapshot = await getDocs(q);

//   let total = 0;
//   snapshot.forEach((doc) => {
//     const d = doc.data();
//     if (d.paymentType === "cash" && d.paidAmount) {
//       total += d.paidAmount;
//     } else if (d.paymentType === "installment" && d.firstPayment) {
//       total += d.firstPayment; // หรือจะบวกยอดรวมทั้งหมดก็ได้
//     }
//   });

//   totalIncomeEl.textContent = total + " บาท";
// }

// // โหลดรายได้ทันทีเมื่อเข้าเว็บ
// updateIncome();


// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ตั้งค่า config ของคุณ (จาก Firebase Console)
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

// เริ่ม Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// ปุ่มบันทึก
document.getElementById("saveBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const order = document.getElementById("order").value;

  if (name.trim() === "" || order.trim() === "") {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  // push ข้อมูลเข้า DB
  const newRef = push(ref(db, "orders"));
  set(newRef, {
    customer: name,
    order: order,
    date: new Date().toLocaleString()
  });

  document.getElementById("name").value = "";
  document.getElementById("order").value = "";
});

// แสดงข้อมูลจาก Realtime Database
const tableBody = document.getElementById("dataTable");
const ordersRef = ref(db, "orders");

onValue(ordersRef, (snapshot) => {
  tableBody.innerHTML = ""; // ล้างก่อน
  snapshot.forEach(childSnapshot => {
    const data = childSnapshot.val();
    const row = `<tr>
      <td>${data.customer}</td>
      <td>${data.order}</td>
      <td>${data.date}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
});



                             // Pagelogin



// สมัคร
document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById("roleSection").classList.remove("hidden");
      localStorage.setItem("uid", userCredential.user.uid);
    })
    .catch(err => alert(err.message));
});

// บันทึก role
document.getElementById("saveRoleBtn").addEventListener("click", () => {
  const role = document.getElementById("roleSelect").value;
  const uid = localStorage.getItem("uid");
  set(ref(db, "users/" + uid), { role: role });
  alert("บันทึกบทบาทสำเร็จ กรุณา login ใหม่");
});

// ล็อกอิน
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      onValue(ref(db, "users/" + uid), snapshot => {
        if (snapshot.exists()) {
          const role = snapshot.val().role;
          loadRoleUI(role, uid);
        } else {
          alert("กรุณาเลือกบทบาทก่อนใช้งาน");
          document.getElementById("roleSection").classList.remove("hidden");
          localStorage.setItem("uid", uid);
        }
      });
    })
    .catch(err => alert(err.message));
});

// โหลด UI ตาม role
function loadRoleUI(role, uid) {
  if (role === "employee") {
    document.getElementById("employeeSection").classList.remove("hidden");
  }
  if (["manager", "accountant", "ceo"].includes(role)) {
    document.getElementById("dataSection").classList.remove("hidden");
  }
  if (role === "manager") {
    document.getElementById("actionCol").classList.remove("hidden");
  }
  loadData(role);
}

// บันทึกข้อมูล (employee)
document.getElementById("saveBtn")?.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const order = document.getElementById("order").value;
  if (!name || !order) return alert("กรอกข้อมูลให้ครบ");
  const newRef = push(ref(db, "orders"));
  set(newRef, { customer: name, order: order, date: new Date().toLocaleString() });
  document.getElementById("name").value = "";
  document.getElementById("order").value = "";
});

// โหลดข้อมูล
function loadData(role) {
  const tableBody = document.getElementById("dataTable");
  onValue(ref(db, "orders"), snapshot => {
    tableBody.innerHTML = "";
    snapshot.forEach(child => {
      const key = child.key;
      const data = child.val();
      let row = `<tr>
        <td>${data.customer}</td>
        <td>${data.order}</td>
        <td>${data.date}</td>`;
      if (role === "manager") {
        row += `<td>
          <button onclick="editData('${key}','${data.customer}','${data.order}')">แก้ไข</button>
          <button onclick="deleteData('${key}')">ลบ</button>
        </td>`;
      }
      row += "</tr>";
      tableBody.innerHTML += row;
    });
  });
}

// ฟังก์ชันแก้ไข/ลบ (สำหรับหัวหน้า)
window.editData = (key, customer, order) => {
  const newName = prompt("แก้ไขชื่อลูกค้า:", customer);
  const newOrder = prompt("แก้ไขรายการ:", order);
  if (newName && newOrder) {
    update(ref(db, "orders/" + key), { customer: newName, order: newOrder });
  }
};

window.deleteData = (key) => {
  if (confirm("คุณแน่ใจว่าจะลบข้อมูลนี้?")) {
    remove(ref(db, "orders/" + key));
  }
};



import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ... firebaseConfig + initializeApp ...

// const auth = getAuth();
// const db = getDatabase();

onAuthStateChanged(auth, user => {
  if (!user) {
    // ถ้าไม่ login → กลับไปหน้า login.html
    window.location.href = "login.html";
  } else {
    // TODO: โหลด role ของ user แล้วตรวจสอบว่าตรงกับหน้าปัจจุบันไหม
  }
});

document.getElementById("saveBtn")?.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const order = document.getElementById("order").value;
  const newRef = push(ref(db, "orders"));
  set(newRef, { customer: name, order: order, date: new Date().toLocaleString() });
  alert("บันทึกข้อมูลแล้ว");
});

window.logout = () => signOut(auth);
