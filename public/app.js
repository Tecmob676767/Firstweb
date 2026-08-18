// Google Identity Services (GSI) client-side sign-in using the provided client_id
const CLIENT_ID = "109050233434-lc8cgd9tukdlriar7sf5kum38cgstvut.apps.googleusercontent.com";

const signinBtn = document.getElementById('signin-btn');
const signoutBtn = document.getElementById('signout-btn');
const statusEl = document.getElementById('status');
const userEl = document.getElementById('user');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPic = document.getElementById('user-pic');

// Simple JWT payload parser
function parseJwt (token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function showSignedIn(profile) {
  statusEl.textContent = 'Signed in';
  userEl.hidden = false;
  userName.textContent = profile.name || '';
  userEmail.textContent = profile.email || '';
  userPic.src = profile.picture || '';
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

// Load GSI script then initialize
function loadGsi() {
  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.async = true;
  s.defer = true;
  s.onload = initGsi;
  document.head.appendChild(s);
}

function handleCredentialResponse(response) {
  // response.credential is a JWT
  const payload = parseJwt(response.credential);
  if (payload) {
    // Save token if needed
    localStorage.setItem('g_token', response.credential);
    showSignedIn(payload);
  } else {
    console.error('Failed to parse credential');
  }
}

function initGsi() {
  /* global google */
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
  });

  // Render the official Google button into the signinBtn element
  google.accounts.id.renderButton(
    signinBtn,
    { theme: 'outline', size: 'large', text: 'signin_with' }
  );

  // If a token is present, try to parse and restore session
  const token = localStorage.getItem('g_token');
  if (token) {
    const payload = parseJwt(token);
    if (payload) showSignedIn(payload);
  }
}

signoutBtn.addEventListener('click', () => {
  localStorage.removeItem('g_token');
  // Prevent automatic account selection
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.disableAutoSelect();
  }
  showSignedOut();
});

// Kick off
loadGsi();
