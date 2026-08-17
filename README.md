# First web

Simple static web host for the "First web" project with Google Sign-In via Firebase Authentication.

Quick local run:
1. Ensure Node.js is installed.
2. In the project root:
n   npm start

This runs a minimal Node static server on http://localhost:3000.

Firebase (recommended free hosting + Auth):
1. Install Firebase CLI: `npm install -g firebase-tools`.2. `firebase login` then `firebase init` → choose Hosting and follow prompts (select or create a project; set public directory to `public`).
3. In Firebase console: enable Authentication → Sign-in method → Google.4. Copy the web app config from Project settings and paste it into `public/app.js` replacing the firebaseConfig placeholder.5. `firebase deploy` to publish. Your free URL will be `https://<project-id>.web.app` (or `firebaseapp.com`). Note: free hosting includes the provider domain (cannot remove provider name unless you add a custom domain).

Files:
- server.js — local Node static server (dev)
- public/index.html — client UI (Google Sign-In button)
- public/app.js — Firebase client initialization and auth handlers (replace firebaseConfig)- firebase.json, .firebaserc — templates for firebase deploy

If you want a custom domain with no provider name, add your domain in Firebase Hosting (requires domain ownership). Alternatively, host via GitHub Pages and add your domain in repository Settings → Pages.

To configure a custom domain and remove provider branding:
1. Purchase or use a domain you own.
2. Add the domain to Firebase Hosting or GitHub Pages and follow the provider's DNS verification steps.
3. For GitHub Pages, add your domain to `public/CNAME` (one line) and push; GitHub will provision TLS. For Firebase, add the domain in the console and verify.

If you'd like, provide a custom domain and OAuth client credentials and the assistant will finish the deployment and configuration.

License: MIT
