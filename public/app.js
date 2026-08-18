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

// UX helpers
function showSignedIn(user) {
  statusEl.textContent = 'Signed in';
  userEl.hidden = false;
  userName.textContent = user.displayName || '';
  userEmail.textContent = user.email || '';
  userPic.src = user.photoURL || '';
  signinBtn.hidden = true;
  signoutBtn.hidden = false;
}
function showSignedOut() {
  statusEl.textContent = 'Not signed in';
  userEl.hidden = true;
  userName.textContent = '';
  userEmail.textContent = '';
  userPic.src = '';
  signinBtn.hidden = false;
  signoutBtn.hidden = true;
}

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
    showSignedIn(user);
  } else {
    showSignedOut();
  }
});
