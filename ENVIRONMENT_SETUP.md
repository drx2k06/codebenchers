# SignBridge Edu — Environment & Developer Setup Guide

This guide describes how to configure, run, and test SignBridge Edu in local development and production environments.

---

## 1. System Prerequisites

- **Node.js**: v18.17.0 or higher (Tested with Node.js v22.23.2 on Windows x64)
- **Package Manager**: npm v9.0.0 or higher
- **Browser**: Google Chrome or Microsoft Edge (recommended for Web Speech API and WebGL support)

---

## 2. Environment Variables

Create `.env.local` inside `apps/web/` or define environment variables:

```bash
# Gateway Service
PORT=4000
GEMINI_API_KEY=your_gemini_api_key_here # Optional for online multimodal AI; falls back to offline engine

# Web Application
NEXT_PUBLIC_GATEWAY_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000/ws
```

---

## 3. Installation and Build

From the repository root directory (`SignBridge-Edu`):

```bash
# 1. Install all monorepo dependencies
npm install

# 2. Build shared contracts and gateway
npm --workspace=packages/types run build
npm --workspace=services/gateway run build

# 3. Build Next.js PWA web application
npm --workspace=apps/web run build
```

---

## 4. Running the Development Environment

Run both the Gateway backend and the Web frontend concurrently:

```bash
npm run dev
```

Or run them individually in separate terminals:

```bash
# Terminal 1: Gateway Server (Port 4000)
npm run dev:gateway

# Terminal 2: Next.js Frontend (Port 3000)
npm run dev:web
```

Access the application in your browser at: `http://localhost:3000`

---

## 5. Running Verification Tests

Execute the automated test suite verifying multilingual configs, Karnataka curriculum, adaptive difficulty, offline sync, and tutor responses:

```bash
npm test
```

---

## 6. Offline-First & Mobile Testing Guidelines

1. **Simulating Offline Mode in Chrome DevTools**:
   - Open Developer Tools (`F12`) -> Go to the **Network** tab.
   - Switch the throttling dropdown from **No throttling** to **Offline**.
   - Navigate through the *AI Science Tutor* (`ಕನ್ನಡ ಸೈನ್ಸ್ ಬೋಧಕ`) tab, read lessons, and submit practice answers.
   - Notice that the *Offline Mode Active* badge illuminates, the local curriculum engine resolves doubts immediately, and quiz submissions are safely stored in the pending queue.
   - Switch back to **Online** -> The queue flushes automatically in the background.

2. **Mobile Screen Emulation**:
   - Toggle Device Toolbar (`Ctrl+Shift+M`).
   - Select **Pixel 7** or **Galaxy S20** to verify touch targets (minimum 48px), responsive header chips, and low-bandwidth layouts.
