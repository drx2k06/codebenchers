# SignBridge Edu — System Architecture

## 1. Overview & Monorepo Structure

SignBridge Edu is an accessible, multilingual AI-powered educational and communication platform tailored for underprivileged Class 8 students studying under the Karnataka State Board, primarily in Kannada, on basic shared smartphones with intermittent connectivity.

The platform preserves the complete SignBridge multimodal communication engine (ISL perception, 3D avatar, WebSockets gateway) while introducing a full-featured offline-first educational system.

```
SignBridge-Edu/
├── packages/
│   └── types/                 # Shared TypeScript contracts & educational data models
│       ├── src/
│       │   ├── index.ts       # Unified export surface
│       │   ├── edu.ts         # EducationTopic, QuizQuestion, Progress, Doubt types
│       │   ├── islVocabulary.ts # 50 ISL signs & metadata
│       │   └── ...
├── services/
│   └── gateway/               # Node.js + Express + WebSocket backend service
│       ├── src/
│       │   ├── server.ts      # REST & WS endpoints, progress sync, tutor doubt routing
│       │   ├── tutorAgent.ts  # Multimodal Gemini 2.0 Flash Kannada Science Tutor
│       │   ├── agent.ts       # ISL communication conversational assistant
│       │   └── ...
├── apps/
│   └── web/                   # Next.js 15 PWA frontend
│       ├── public/
│       │   ├── manifest.json  # PWA manifest
│       │   └── sw.js          # Service worker for offline asset & page caching
│       └── src/
│           ├── app/           # App router, layout.tsx, page.tsx
│           ├── components/
│           │   ├── tutor/     # ScienceTutorView (lessons, doubts, adaptive MCQs)
│           │   ├── dashboard/ # StudentDashboardView, ParentDashboardView
│           │   ├── vision/    # MediaPipe camera & gesture recognition
│           │   └── avatar/    # Three.js 3D ISL avatar
│           ├── lib/
│           │   ├── curriculum/# Karnataka Class 8 Science syllabus & search
│           │   ├── tutor/     # Adaptive difficulty engine & AI doubt resolver
│           │   ├── storage/   # Offline progress storage & background sync queue
│           │   └── speech/    # Streaming STT (kn-IN) and TTS singleton
└── scripts/
    └── test_edu_features.ts   # Automated verification suite (34 test cases)
```

---

## 2. Multilingual Foundation (Sprint 1)

1. **Languages Supported**:
   - `kn`: ಕನ್ನಡ (Kannada) — Primary educational language
   - `en`: English — Technical terminology in parentheses
   - `hi`: हिन्दी (Hindi) — Secondary
   - `te`: తెలుగు (Telugu) — Regional border accessibility

2. **Localization & Fallback (`apps/web/src/lib/i18n.tsx`)**:
   - `I18nProvider` with React Context.
   - Synchronizes language state to `localStorage` key `signbridge.language`.
   - Mutates `document.documentElement.lang` and `dir` dynamically on mount and on selection.
   - Fallback mechanism to English dictionary with warning in development mode.
   - Speech Recognition locale: `kn-IN` for Kannada, `en-US` for English, `hi-IN` for Hindi, `te-IN` for Telugu.
   - Speech Synthesis: `findVoiceForLanguage` searches for `kn-IN` voices; if absent, flags `ttsVoiceStatus: 'missing'` to notify the learner with a graceful warning while maintaining on-screen text.

---

## 3. Karnataka State Board Class 8 Science Curriculum

Curated in `apps/web/src/lib/curriculum/karnatakaClass8Science.ts`:
- **Aligned Chapters**:
  1. *Crop Production and Management* (ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ)
  2. *Microorganisms: Friend and Foe* (ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳು: ಮಿತ್ರ ಮತ್ತು ಶತ್ರು)
  3. *Force and Pressure* (ಬಲ ಮತ್ತು ಒತ್ತಡ)
  4. *Sound* (ಶಬ್ದ / ಧ್ವನಿ)
  5. *Light* (ಬೆಳಕು)
- **Pedagogical Features for Rural Learners**:
  - Everyday Karnataka analogies (e.g., bullock cart force, bicycle chain friction, temple bell vibration, curd fermentation using lactobacillus).
  - Bilingual scientific terminology (e.g. ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ [Photosynthesis], ಒತ್ತಡ [Pressure]).
  - Topic-wise lessons with bulleted takeaway points and practical low-cost home experiments.

---

## 4. Adaptive Practice Engine

Implemented in `apps/web/src/lib/tutor/adaptivePractice.ts`:
- **State-Dependent Difficulty Transitions**:
  - New chapter starts at `easy` difficulty.
  - Correct response on `easy` promotes to `medium`.
  - Correct response on `medium` promotes to `hard`.
  - Incorrect answer demotes or holds at `easy`, triggering a Kannada `remedialHintKn` extracted from the concept's rural analogy.
- **Analytics & Remediation**:
  - Tracks question attempt history.
  - Automatically classifies chapters with accuracy < 60% as `weakTopicsList`.
  - Generates actionable revision recommendations with priority scoring.

---

## 5. Multimodal Voice and Photo Question Architecture

1. **Voice Input Flow**:
   ```
   Student taps Mic -> STT Client (kn-IN) -> Interim Kannada Transcript -> Final Transcript -> AI Tutor
   ```
2. **Photo Input Flow**:
   ```
   Camera / Gallery -> Client Canvas Compression (max 800px, JPEG 0.7) -> Base64 Data URL -> Multimodal Gateway
   ```
3. **Gateway Routing (`services/gateway/src/tutorAgent.ts`)**:
   - Sends prompt + image parts to Google Gemini 2.0 Flash multimodal endpoint via JSON schema generation config.
   - If API key is unavailable or offline, immediately activates local knowledge-base semantic matching engine without blocking the student.

---

## 6. Offline-First Architecture & Service Worker

```
[Browser / PWA]
       │
  (Network Available?)
  ├── Yes ──> Gateway /api/tutor/doubt, /api/sync/progress
  └── No  ──> Local Offline Knowledge Engine (curriculum data bundled)
              └── Actions Queued in PENDING_QUEUE_KEY
                     │ (Network Restores via 'online' event)
                     └──> Background Sync Loop
```

- **Service Worker (`apps/web/public/sw.js`)**:
  - Pre-caches core app shell (`/`, `/manifest.json`, styles).
  - Stale-while-revalidate for static assets.
  - Network-first for `/api/` with structured offline JSON response.
- **Queue Synchronization (`apps/web/src/lib/storage/offlineStore.ts`)**:
  - Persists student attempts, quiz scores, and streak data in `localStorage`.
  - Enqueues actions with retry counter.
  - Automatically flushes queue via POST `/api/sync/progress` on network reconnection.

---

## 7. Dashboards & Privacy Guardrails

- **Student Dashboard**: Shows subject mastery (0-100%), 4 key performance indicators, weak topics requiring attention, and direct topic practice navigation.
- **Parent & Teacher Dashboard**: Non-technical Kannada overview focused on encouragement, weekly consistency, mastered chapters, and home science tips.
- **Privacy Assurance**: No phone numbers, GPS coordinates, or biometric identifiers are collected or transmitted.
