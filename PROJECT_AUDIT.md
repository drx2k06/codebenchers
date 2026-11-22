# PROJECT_AUDIT.md — SignBridge (baseline before SignBridge Edu)

Audit date basis: repository at commit 1045b6ef7e7d0379e65f587832a88f3bc586a11a on branch main; work branch feature/signbridge-edu. Status labels: VERIFIED (read in source), UNCONFIRMED (not read or tool output unavailable).

## Repository
- Monorepo, root package.json name `signbridge-monorepo`, workspaces: `packages/*`, `services/*`, `apps/*`, `ml`. Root scripts: dev:gateway, dev:web, dev (concurrently), build, eval:ml, train, train:prototype, collect:data, generate:bootstrap, test:gateway. No root `test` script.
- Top-level counts (excluding .git/node_modules): apps 61 files, benchmarks 1, ml 45, packages 7, scripts 110, services 8.
- No .github/workflows directory. No Dockerfile found at root. UNCONFIRMED for services/gateway.

## Frontend — apps/web (VERIFIED)
- Next.js 15, strict TypeScript. Dependencies include Three.js, MediaPipe Tasks Vision; a Web Worker runs GRU inference. Scripts: dev, build, start, lint (port 3000). No test script.
- Single route. Sections (dashboard, meeting, history, settings, demo) are switched by internal state inside one top-level page component (useState/useEffect/useRef, no store or Context).
- Hooks: one for sign perception (MediaPipe + GRU), one for the realtime session (default room `main-room`).
- Browser model loaded from `/models/sbv-gru-v1/model.json` (apps/web/src/lib/ml/modelLoader.ts).
- Dataset API: apps/web/src/app/api/dataset/route.ts — GET creates the data directory; POST writes per-sign/per-signer JSON records with SHA-256 de-duplication. No auth check visible.

## Speech (VERIFIED in apps/web)
- STT: wrapper around browser speech recognition; language map falls back to en-US. No kn-IN entry.
- TTS: Web Speech synthesis, singleton player; falls back to en-IN.
- Phrase matcher maps English speech to sign sequences and an ISL intermediate representation. English only.

## Avatar and animation (VERIFIED structure; counts UNCONFIRMED)
- Animation controller (~1,260 lines) wraps Three.js AnimationMixer. Header claims 26 GLB clips and 24 procedural gestures for ~50 ISL concepts — UNCONFIRMED against assets.
- Ordering via an action execution manager with idempotency by event ID.
- Synonym map uses Hindi/Hinglish romanised glosses (DHANYAVAAD, PAANI, KHANA, GHAR).

## Sign vocabulary and ML (VERIFIED partially)
- packages/types/src/islVocabulary.ts exports ISL_VOCABULARY (line 40); visible entries include HELLO, NAME, NICE_TO_MEET_YOU, YOU, I_ME, MY, FRIEND, GOODBYE, DEAF, HEARING, HOW_ARE_YOU, GOOD, BAD, YES. Total count UNCONFIRMED.
- ml/python/train.py saves model_best.pt and exports model.onnx; ml/python/evaluate.py loads model_best.pt; dataset_loader.py body not read.
- Several scripts/*.ts and scripts/train_*.py read/write model.json and weights.bin.

## Gateway — services/gateway (VERIFIED)
- Express 4 + `ws` WebSocket server at path `/ws`. Scripts: dev (ts-node), build (tsc), start (node dist/server.js), test (ts-node src/testClient.ts).
- REST: GET /api/health, GET /api/vocabulary, GET /api/presets, GET /api/sessions/:id, GET /api/metrics. No POST/PUT/DELETE.
- WebSocket events: session.join, vision.prediction, vision.final, speech.partial, speech.final, message.create, session.clear, metric.record; broadcast to all clients in the session.
- Validation: none (express.json() only; WebSocket JSON cast without checks).
- Auth: none on REST or WebSocket; any client can join any sessionId and clear sessions.
- CORS: cors() with no options (all origins); WebSocketServer has no verifyClient/origin check.
- PORT from env, default 4000.
- Files: server.ts, agent.ts, speech.ts, store.ts, testClient.ts.

## AI agent — services/gateway/src/agent.ts (VERIFIED)
- Google Gemini model gemini-2.0-flash via raw fetch over HTTPS.
- Key from env GEMINI_API_KEY or GOOGLE_API_KEY. Key is passed as `?key=` query parameter — can appear in logs. Security gap.
- Offline fallbacks: (1) low-confidence ISL (<0.65) returns canned clarification with hard-coded en/hi/kn/te text; (2) no key or API error falls back to local response (generateContextualLocalResponse); lines beyond 119 not fully read.

## Storage and persistence
- No SQLite or database found. Dataset files on disk (apps/web dataset route). Gateway store.ts exists (content UNCONFIRMED).
- apps/web/src has no IndexedDB or localStorage usage. History is in-memory and lost on reload.

## Offline / PWA
- No service worker, no web app manifest. Next metadata only.

## Tests
- One STT test file in apps/web using English fixtures. No test runner dependency or script found. Gateway `test` script runs testClient.ts (a manual client, not a verified suite).

## Documentation at root (titles only, status not read)
V9_FINAL_VALIDATION_REPORT, V7_TRAINING_REPORT, V7_RECOGNITION_EVALUATION, V7_MODEL_AUDIT, V7_LATENCY_REPORT, V7_IMPLEMENTATION_REPORT, V7_DATASET_REPORT, V7_AVATAR_VISUAL_ENHANCEMENT, V7_ANIMATION_MAPPING_REPORT, V6_TEST_RESULTS, V6_IMPLEMENTATION_REPORT, V5_MODEL_EVALUATION, V5_LATENCY_BENCHMARK, V5_IMPLEMENTATION_REPORT, V5_DATASET_AUDIT, LATENCY_OPTIMIZATION_REPORT, ISL_MIGRATION_REPORT, ISL_DATASET_AUDIT, ACTION_LOOP_FIX_REPORT, SENTENCE_RECOGNITION_REPORT, plus README.md.

## Existing functionality that MUST be preserved
1. Speech-to-sign (phrase matcher + ISL representation + avatar).
2. Sign-to-text and sign-to-speech (MediaPipe + GRU worker, TTS).
3. 3D avatar and animation controller (Three.js).
4. Gateway REST endpoints and WebSocket event contract listed above (keep stable or version).
5. Gemini agent with offline fallback.
6. Dataset collection route and studio component.

## Gaps for SignBridge Edu (blockers)
1. Hard-coded `en` in three places (perception hook, speech-to-ISL panel, demo mode); no kn-IN in STT/TTS maps.
2. No i18n layer; UI strings English-only.
3. No persistence for progress, quizzes, or content.
4. No PWA (service worker, manifest).
5. No test runner wired into npm for new work.
6. Monolithic page state; extract routes/stores before adding education screens.
7. Kannada speech depends on browser kn-IN voices — UNVERIFIED on target devices.
8. Security: no gateway validation/auth, open CORS and WS origin, API key in query string, unauthenticated dataset POST.
9. Avatar vocabulary is Hindi/Hinglish-oriented, not Kannada.

## Unconfirmed items
- packages/types scripts/entry point; STT Web Speech constructor; TensorFlow.js usage; gateway store.ts and speech.ts contents; ml dataset_loader.py; root report contents; sign class total; avatar asset counts.
