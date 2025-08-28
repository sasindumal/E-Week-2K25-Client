# E‑Week 2K25 Public Website 🌐

Public‑facing React app for E‑Week 2025 – home, events, leaderboard, downloads, and media.

## ✨ Features
- 🏠 Home and About
- 🗓️ Events browsing
- 🏆 Leaderboard
- ⬇️ Downloads (includes Android APK)
- 🎞️ Video player and media assets

## 🧰 Tech Stack
- ⚛️ React (Create React App)
- 🧭 react-router-dom
- 📡 axios
- 🎛️ framer‑motion, lucide‑react

## 🚀 Quick Start
1) Install deps: `npm install`
2) Run dev server: `npm start` (http://localhost:3000)

Backend expected: E‑Week server running locally (default 5001) or your deployed API.

## 🔧 Scripts
- `npm start` – start dev server
- `npm run build` – production build
- `npm test` – tests

## 📁 Main Routes (React Router)
- `/` – Home
- `/about` – About E‑Week
- `/events` – Events
- `/leaderboard` – Leaderboard
- `/downloads` – Downloads (bundles `public/E-Week-2k25.apk`)
- `/VideoPlayer` – Video player

## 🗂️ Assets
Key files live in `public/` (icons, images, manifest, APK, etc.).

## 🔐 Environment (optional)
- `REACT_APP_API_URL` – Override API base URL (or use proxy)

---
Proudly crafted for E‑Week 2025 ✨
