import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, collection as colSub, addDoc as addSubDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { format } from "https://cdn.jsdelivr.net/npm/date-fns@2.28.0/esm/index.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqxuye8G2GWgyrNWAwZZg6gz_XM0TlZEQ",
  authDomain: "rplsatu026-4f987.firebaseapp.com",
  projectId: "rplsatu026-4f987",
  storageBucket: "rplsatu026-4f987.appspot.com",
  messagingSenderId: "523064373703",
  appId: "1:523064373703:web:0c78d01dd1cac0faa9a9e2",
  measurementId: "G-BQHJZMNSN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatIcon = document.getElementById('chat-icon');
const chatPopup = document.getElementById('chat-popup');

// Fungsi untuk menampilkan/menyembunyikan chat
chatIcon.addEventListener('click', () => {
    chatPopup.classList.toggle('hidden');
    chatIcon.classList.add('hidden');
});

// Menutup chat ketika mengklik di luar popup
document.addEventListener('click', (e) => {
    if (!chatPopup.contains(e.target) && !chatIcon.contains(e.target)) {
        chatPopup.classList.add('hidden');
        chatIcon.classList.remove('hidden');
    }
});

// Fungsi untuk mengirim pesan ke Firestore
document.getElementById('send-btn').addEventListener('click', async () => {
    const name = document.getElementById('name-input').value;
    const message = document.getElementById('message-input').value;

    if (name && message) {
        try {
            await addDoc(collection(db, "chats"), {
                name: name,
                message: message,
                timestamp: new Date()
            });
            document.getElementById('name-input').value = '';
            document.getElementById('message-input').value = '';
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        alert("Nama dan pesan harus diisi!");
    }
});

// Fungsi untuk menampilkan pesan secara real-time
const chatOutput = document.getElementById("chat-output");

const q = query(collection(db, "chats"), orderBy("timestamp"));
onSnapshot(q, (querySnapshot) => {
    let output = "<ul>";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.timestamp.toDate();
        const formattedTime = format(date, 'dd MMM yyyy HH:mm');

        output += `
            <li>
                <span class="name">${data.name}</span>
                <span class="timestamp">${formattedTime}</span>
                <div class="message">${data.message}</div>
            </li>
        `;
    });
    output += "</ul>";
    chatOutput.innerHTML = output;
});