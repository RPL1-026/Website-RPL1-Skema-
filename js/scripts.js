import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, collection as colSub, addDoc as addSubDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";
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
const storage = getStorage(app);

const chatIcon = document.getElementById('chat-icon');
const chatPopup = document.getElementById('chat-popup');
const kiSection = document.getElementById('ki-wisata');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const nameInput = document.getElementById('uploader-name');
const gallery = document.getElementById('gallery');

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

// KI & Wisata
// Handle multiple file uploads

const overlay = document.getElementById('loading-overlay');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  overlay.classList.remove('hidden');  // show overlay

  const uploader = nameInput.value.trim() || 'Anonymous';
  const files = Array.from(fileInput.files);
  if (!files.length) {
    overlay.classList.add('hidden');
    return alert('Pilih file terlebih dahulu!');
  }

  for (const file of files) {
    const path = 'uploads/' + Date.now() + '_' + file.name;
    const ref = sRef(storage, path);
    try {
      await uploadBytes(ref, file);
      const url = await getDownloadURL(ref);
      await addDoc(collection(db, 'uploads'), {
        uploader,
        fileName: file.name,
        fileURL: url,
        storagePath: path,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
    }
  }

  uploadForm.reset();
  overlay.classList.add('hidden');  // hide overlay
});

// Realtime gallery stream
const uploadsQuery = query(collection(db, 'uploads'), orderBy('timestamp', 'asc'));
onSnapshot(uploadsQuery, (snapshot) => {
  gallery.innerHTML = '';
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const time = format(new Date(data.timestamp), 'dd MMM yyyy HH:mm');

    // Create gallery item
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <a href="${data.fileURL}" target="_blank">
        <img src="${data.fileURL}" alt="${data.fileName}" />
      </a>
      <div class="meta">
        <strong>${data.uploader}</strong><br>
        <small>${time}</small>
      </div>
      <div class="actions">
        <button class="comment-btn" data-id="${docSnap.id}">Komentar</button>
        <a href="${data.fileURL}" download class="download-btn">Download</a>
      </div>
      <div class="comments" id="comments-${docSnap.id}"></div>
    `;
    gallery.appendChild(item);

    // Attach comment handler
    const commentBtn = item.querySelector('.comment-btn');
    commentBtn.addEventListener('click', () => handleComment(docSnap.id));

    // Load comments
    renderComments(docSnap.id);
  });
});

// Handle comment creation
async function handleComment(uploadId) {
  const text = prompt('Tulis komentar Anda:');
  if (!text) return;
  try {
    await addSubDoc(colSub(db, 'uploads', uploadId, 'comments'), {
      text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Comment error:', error);
  }
  renderComments(uploadId);
}

// Render comments under each item
async function renderComments(uploadId) {
  const container = document.getElementById(`comments-${uploadId}`);
  const snaps = await getDocs(colSub(db, 'uploads', uploadId, 'comments'));
  container.innerHTML = '<ul>' + snaps.docs.map(c => {
    const d = c.data();
    const t = format(new Date(d.timestamp), 'dd MMM yyyy HH:mm');
    return `<li>${d.text} <small>${t}</small></li>`;
  }).join('') + '</ul>';
}