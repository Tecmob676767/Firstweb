// Replace the firebaseConfig placeholders with values from your Firebase console.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Using Firebase modular SDK via CDN imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signinBtn = document.getElementById('signin-btn');
const signoutBtn = document.getElementById('signout-btn');
const statusEl = document.getElementById('status');
const userEl = document.getElementById('user');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPic = document.getElementById('user-pic');

signinBtn.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error('Sign-in error', e);
    alert('Sign-in failed: ' + e.message);
  }
});

signoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error('Sign-out error', e);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    statusEl.textContent = 'Signed in';
    userEl.style.display = 'flex';
    userName.textContent = user.displayName || '';
    userEmail.textContent = user.email || '';
    userPic.src = user.photoURL || '';
    signinBtn.style.display = 'none';
    signoutBtn.style.display = 'inline-block';
  } else {
    statusEl.textContent = 'Not signed in';
    userEl.style.display = 'none';
    userName.textContent = '';
    userEmail.textContent = '';
    userPic.src = '';
    signinBtn.style.display = 'inline-block';
    signoutBtn.style.display = 'none';
  }
});
