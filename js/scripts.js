import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { CONFIG } from './config.js';
import { initEffects } from './effects.js';
import { initCursor } from './cursor.js';

// Init global visual features
initEffects();
initCursor();

// Initialize Firebase
const app = initializeApp(CONFIG.FIREBASE);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
let isLoginInProgress = false;

// Simple date formatter (no external dependency)
function formatDate(date) {
  if (!date) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = months[date.getMonth()];
  const yy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `${dd} ${mm} ${yy} ${hh}:${mi}`;
}

// Wait for DOM to be ready
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  const chatIcon = document.getElementById('chat-icon');
  const chatPopup = document.getElementById('chat-popup');
  const loginBtn = document.getElementById('google-login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userInfoEl = document.getElementById('user-info');
  const userAvatar = document.getElementById('user-avatar');
  const userNameEl = document.getElementById('user-name');
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const chatOutput = document.getElementById('chat-output');

  if (!chatIcon || !chatPopup) return;

  // ---- CHAT TOGGLE ----
  chatIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    chatPopup.classList.remove('hidden');
    chatIcon.classList.add('hidden');
    // Scroll to latest message after popup is visible
    requestAnimationFrame(() => {
      if (chatOutput) chatOutput.scrollTop = chatOutput.scrollHeight;
    });
  });

  document.addEventListener('click', (e) => {
    // Don't close while Google login popup is open
    if (isLoginInProgress) return;
    if (!chatPopup.classList.contains('hidden') &&
      !chatPopup.contains(e.target) &&
      !chatIcon.contains(e.target)) {
      chatPopup.classList.add('hidden');
      chatIcon.classList.remove('hidden');
    }
  });

  // ---- AUTH STATE ----
  function updateAuthUI(user) {
    if (!loginBtn || !userInfoEl) return;
    if (user) {
      // Logged in: hide login, show user info
      loginBtn.style.display = 'none';
      userInfoEl.style.display = 'flex';
      if (userAvatar) {
        userAvatar.referrerPolicy = 'no-referrer';
        userAvatar.crossOrigin = 'anonymous';
        userAvatar.src = user.photoURL || '';
        userAvatar.style.display = user.photoURL ? 'block' : 'none';
      }
      if (userNameEl) { userNameEl.textContent = user.displayName || user.email || ''; }
      if (messageInput) { messageInput.disabled = false; messageInput.placeholder = 'Tulis pesan...'; }
      if (sendBtn) { sendBtn.disabled = false; }
    } else {
      // Not logged in: show login, hide user info
      loginBtn.style.display = 'flex';
      userInfoEl.style.display = 'none';
      if (userAvatar) { userAvatar.src = ''; userAvatar.style.display = 'none'; }
      if (userNameEl) { userNameEl.textContent = ''; }
      if (messageInput) { messageInput.disabled = true; messageInput.placeholder = 'Login untuk mengirim pesan...'; }
      if (sendBtn) { sendBtn.disabled = true; }
    }
  }

  // Set initial state immediately (before auth loads)
  if (userInfoEl) userInfoEl.style.display = 'none';
  if (userAvatar) userAvatar.style.display = 'none';

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) console.log('[Auth] UID:', user.uid); // for admin setup
    updateAuthUI(user);
  });

  // ---- LOGIN ----
  // Check for redirect result (in case signInWithRedirect was used)
  getRedirectResult(auth).catch(() => { });

  if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();
      loginBtn.disabled = true;
      loginBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Loading...';
      isLoginInProgress = true; // prevent click-outside from closing popup

      try {
        await signInWithPopup(auth, provider);
      } catch (err) {
        console.warn('Popup login failed, trying redirect:', err.code);
        if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
          try {
            await signInWithRedirect(auth, provider);
          } catch (redirectErr) {
            console.error('Redirect login also failed:', redirectErr);
          }
        } else {
          console.error('Login error:', err);
        }
      } finally {
        isLoginInProgress = false;
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="bx bxl-google"></i> Login';
      }
    });
  }

  // ---- LOGOUT ----
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      signOut(auth);
    });
  }

  // ---- SEND MESSAGE ----
  async function sendMessage() {
    if (!currentUser) return;
    const msg = messageInput ? messageInput.value.trim() : '';
    if (!msg) return;
    try {
      await addDoc(collection(db, "chats"), {
        uid: currentUser.uid,
        name: currentUser.displayName || currentUser.email,
        avatar: currentUser.photoURL || '',
        message: msg,
        timestamp: serverTimestamp()
      });
      if (messageInput) messageInput.value = '';
    } catch (e) {
      console.error("Send error:", e);
    }
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (messageInput) {
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  // ---- LISTEN MESSAGES ----
  if (chatOutput) {
    try {
      const q = query(collection(db, "chats"), orderBy("timestamp"));
      onSnapshot(q, (snap) => {
        let html = "<ul>";
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          const docId = docSnap.id;
          const date = d.timestamp ? d.timestamp.toDate() : null;
          const time = formatDate(date);
          // isOwn: match by uid (new msgs) OR by name (old msgs without uid)
          const isOwn = currentUser && (
            (d.uid && d.uid === currentUser.uid) ||
            (!d.uid && d.name === (currentUser.displayName || currentUser.email))
          );
          const isAdmin = currentUser && CONFIG.ADMIN_UIDS.includes(currentUser.uid);
          const canDelete = isOwn || isAdmin;
          const avatar = d.avatar
            ? `<img src="${d.avatar}" class="chat-avatar" alt="" referrerpolicy="no-referrer" />`
            : `<span class="chat-avatar-fallback">${(d.name || '?')[0].toUpperCase()}</span>`;
          const deleteBtn = canDelete
            ? `<button class="delete-msg-btn" data-id="${docId}" title="Hapus pesan"><i class="bx bx-trash"></i></button>`
            : '';

          if (isOwn) {
            html += `<li class="own">
              <div class="msg-header">
                <span class="msg-meta"><span class="timestamp">${time}</span>${deleteBtn}</span>
                <span class="name own-name">${d.name || 'Anonim'}</span>
                ${avatar}
              </div>
              <div class="message">${d.message}</div>
            </li>`;
          } else {
            html += `<li>
              <div class="msg-header">
                ${avatar}
                <span class="name">${d.name || 'Anonim'}</span>
                <span class="msg-meta">${deleteBtn}<span class="timestamp">${time}</span></span>
              </div>
              <div class="message">${d.message}</div>
            </li>`;
          }
        });
        html += "</ul>";
        // Simpan posisi scroll sebelum render ulang
        const wasAtBottom = chatOutput.scrollHeight - chatOutput.scrollTop - chatOutput.clientHeight < 80;
        const savedScrollTop = chatOutput.scrollTop;

        chatOutput.innerHTML = html;

        // Kalau sebelumnya di bawah (pesan baru masuk), scroll ke bawah
        // Kalau lagi scroll ke atas (misal hapus pesan), stay di posisi semula
        if (wasAtBottom) {
          chatOutput.scrollTop = chatOutput.scrollHeight;
        } else {
          chatOutput.scrollTop = savedScrollTop;
        }
      });
    } catch (e) {
      console.error("Firestore listen error:", e);
    }

    // ---- DELETE MESSAGE (event delegation) ----
    chatOutput.addEventListener('click', async (e) => {
      const btn = e.target.closest('.delete-msg-btn');
      if (!btn) return;
      e.stopPropagation();
      const id = btn.dataset.id;
      if (!id || !currentUser) return;
      const confirmed = confirm('Hapus pesan ini?');
      if (!confirmed) return;
      try {
        await deleteDoc(doc(db, "chats", id));
      } catch (err) {
        console.error('Delete error:', err);
      }
    });
  }

  // ---- SLIDESHOW TENTANG KAMI ----
  const imgElement = document.getElementById('slideshow-img');
  if (imgElement) {
    fetch('Fotbar.txt')
      .then(response => response.text())
      .then(data => {
        const urls = data.split('\n').map(url => url.trim()).filter(url => url.length > 0);
        if (urls.length > 0) {
          // Fungsi ubah kualitas foto ke resolusi HD (1920x1080)
          const getHdUrl = (url) => url.split('=')[0] + '=w1920-h1080-s-no-gm';

          // Fungsi untuk mengganti gambar dengan efek transisi mulus
          const transitionToImage = (url) => {
            const preloadedImg = new Image();
            preloadedImg.referrerPolicy = "no-referrer";
            preloadedImg.src = url;

            preloadedImg.onload = () => {
              imgElement.style.opacity = 0; // Fade-out gambar lama
              setTimeout(() => {
                imgElement.src = url;       // Tukar ke gambar baru
                imgElement.style.opacity = 1; // Fade-in gambar baru
              }, 1500); // Sinkron dengan transition CSS: opacity 1.5s
            };
          };

          // Biarkan gambar awal (placeholder di HTML) tampil selama 8.5 detik
          let currentIndex = 0;
          setTimeout(() => {
            // Transisi ke gambar pertama dari Fotbar.txt
            transitionToImage(getHdUrl(urls[currentIndex]));
            
            // Lanjutkan siklus untuk gambar berikutnya setiap 8.5 detik
            setInterval(() => {
              currentIndex = (currentIndex + 1) % urls.length;
              transitionToImage(getHdUrl(urls[currentIndex]));
            }, 8500);
          }, 8500);
        }
      })
      .catch(error => console.error('Error fetching Fotbar.txt:', error));
  }
});