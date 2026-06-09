# 🌟 Remix Video: SPIKED AI | Cognitive Intelligence

An elite, full-stack cognitive intelligence platform and neural sales simulation engine. Powered by Gemini, and designed to prepare enterprise-class sales executives to handle hyper-skeptical executive buying committees, refine strategic objection defenses, and master the complex dynamics of high-stakes deal cycles.

---

## 🏛️ System Architecture Overview

SPIKED AI represents a decoupled, full-stack architecture running a React 19 + TypeScript SPA on the front-end (bundled via Vite) and a robust Express backend running as an ES module during development and compiled to a single, self-contained CommonJS target (`dist/server.cjs`) using `esbuild` for production deployment.

```
                  +----------------------------------------------+
                  |            Vite SPA Front-End (React 19)     |
                  +----------------------+-----------------------+
                                         |
                                         | Secure REST / WebSocket Link
                                         v
                  +----------------------+-----------------------+
                  |         Express Full-Stack Server            |
                  +----+-----------------+------------------+----+
                       |                 |                  |
                       |                 |                  |
                       v                 v                  v
        +--------------+---+   +---------++--------+   +----+-------------+
        | Firebase Admin   |   | Better-SQLite3    |   | Google Workspace |
        | Cloud Firestore  |   | Session Engine    |   | OAuth 2.0 Hub    |
        +--------------+---+   +---------++--------+   +----+-------------+
                       |                 |                  |
                       v                 v                  v
               * Cloud Data       * 2FA MFA Sessions   * Google Drive Docs
               * Shared Chats     * Log Audits         * Google Calendar Preps
               * Sync Profile                          * Gmail Client Briefings
```

*   **Front-End Client:** Engineered with **React 19**, **Zustand** state synchronization, **motion/react** fluid animation blocks, and customized typographic interfaces utilizing responsive styling, a whole-screen Magnifier Zoom framework, and a Text-Only Zoom system.
*   **Application Backend:** Powered by **Express v5** with integrated **cookie-parser**, **express-session**, **request-ip** detection, **ua-parser-js** telemetry, and customized session invalidation workflows.
*   **Data Tier:** Twin persistence layers:
    *   **Google Cloud Firestore:** For non-relational document libraries, user configurations, chat share metrics, and cloud-synced meeting portfolios.
    *   **Better-SQLite3:** Local high-performance relational state database (stored in `sessions.db`) utilized to persist active machine tokens, Multi-Factor Authentication secrets, session history, and system logs.

---

## 🚀 Key Feature Modules

### 1. Strategic Priming & Intel Core Settings
Establish a complete deal context by supplying strategic metadata or ingestion materials:
*   **KYC Intelligent Extraction:** Drag-and-drop file ingestion handles PDF or text-heavy contracts, project manuals, and request-for-proposals. Processing leverages Gemini to systematically isolate strategic targets, buyer organizations, decision-makers, and latent project resistance points.
*   **Custom Parameter Tuning:** Interactively adjust seller names, target product domains, meeting foci, thinking profiles, objection difficulty levels, and response parameters down to fine-grained, styled guidelines.

### 2. Strategic Enterprise Lab
Leverages the ingestion library to construct a strategic playbook:
*   **Strategic Action Pillars:** Generates action-oriented methodologies, assigning tactical play-by-play timelines aligned directly to client challenges.
*   **Competitive Wedge Synthesis:** Dynamically identifies primary market threats (e.g., Cognigy, Amelia) and constructs defensible differentiation angles.
*   **Defensive Objections Matrix:** Precomputes typical friction scenarios and drafts counter-strategies to neutralize pushback.

### 3. Cognitive Assessment Lab (Hands-on Assignments)
Tests and validates deal-readiness before team members interface with actual decision-makers:
*   **Neural Mission Ingest:** Evaluates deep comprehension of target products and client pain points using automated quiz and validation structures.
*   **Logic Gap Analysis:** pinpoints specific comprehension deficits, tracing references back to source documents, and provides comprehensive instructional solutions.

### 4. Progressive Deal Stage Simulations
Allows participants to play through a multi-stage sales journey rather than a single disjointed conversation:
*   **Pre-negotiated Phases:** Interactive paths representing standard sales gates: *Ice-Breaker Discovery*, *Core Value Propositions*, *Pricing Scrutiny*, *Legal Review*, and *Closing Alignments*.
*   **Automated Stage Gates:** Refuses passage to the next commercial phase if strategic qualifiers or pricing agreements are not cleanly met.

### 5. Dual-Mode Dynamic Buyer Avatar (1.0 & 2.0)
Interactive dialogue engines mapping human responses to complex executive profiles:
*   **Simulation 1.0 (Skepical CIO):** Single-threaded conversation structure testing alignment capability against standard digital transformation resistance.
*   **Simulation 2.0 (The Buying Committee):** Allows real-time hot-swapping between key committee roles:
    *   **CIO:** Probes technical capability, scalability, cloud hosting, and governance rules.
    *   **CFO:** Deconstructs ROI claims, hidden support overheads, and total cost of ownership.
    *   **IT Director:** Explores implementation friction, training schedules, and security standards.
*   **High-Scrutiny Gatekeeper Engine:** Answers are audited in real-time. Vague answers undergo immediate **`[RESULT: FAIL]`** processing, assigning specific logic deficiencies, providing stylized instructions, generating optimal response copies, and triggering interactive retry loops.

### 6. Strategic Knowledge Retrieval (Spiked GPT)
A context-grounded strategic conversational engine:
*   **Vector Content Ingestion:** Connects with the processed folder libraries to ensure answers are strictly retrieved from authorized documents.
*   **Response Style Optimization:** Formulates intelligence across diverse structural methods (*ROI Forecast*, *Executive Summary*, *Data-Driven Insights*, *Anticipated Client Questions*, *Buying Fear Mitigation*).
*   **Angle Recommender & Validator:** Compares proposed styles against user inquiries and labels sub-optimal approaches with corrective recommendations.

### 7. Vocal Grooming Lab (Verbal & Pacing Audit)
Audits the physical, acoustic, and behavioral delivery of verbal presentations:
*   **Verbal Architecture Analyzer:** Extracts, transcribes, and evaluates user verbal transcripts, detailing grammatical structures, flow optimization, and strategic keywords used.
*   **Vocal Metrics Dashboard:** Synthesizes metrics including voice pace, tone variations, emotional baselines, and pitch, comparing them against the target vocal persona.
*   **System Status Narration:** Provides interactive voice-over status announcements for the user interface, reading node status, purpose, and operational guides using advanced voice generation.

### 8. The Live Roleplay Dashboard
An immersive training workspace:
*   **The 3-Panel Visual Console:** Keeps critical details within view:
    *   *Panel 1:* Live, interactive multi-device chat transcript with audio records.
    *   *Panel 2:* Grounded strategy recommendations, competitor wedge quick-links, and suggested coaching prompts.
    *   *Panel 3:* Real-time, interactive D3-based performance visualization charts summarizing compliance, engagement, risk, and persuasion curves.

### 9. Google Workspace Integration Hub
Bridges strategic simulations with active operational assets via Google OAuth 2.0:
*   **Google Calendar Prep Sync:** Scaffolds strategic meeting preparations by importing upcoming client meetings straight to the workspace.
*   **Google Drive Context Importer:** Directly connects and imports strategic project contracts, business profiles, or target folders as knowledge material.
*   **Gmail Briefing Distribution:** Automatically compiles generated sales strategies, competitive matrices, and meeting summaries into professional HTML briefings and sends them to team stakeholders.

### 10. Multi-Factor Authentication & Multi-Tenant Security
Engineered with premium enterprise security layers:
*   **Device Capacity Control:** Strict session limit controls enforced database-side. Limits active connections to 5 simultaneous devices per account, auto-revoking older connections if thresholds are breached.
*   **TOTP Authenticator Interface:** Complete user setup workflows for Google Authenticator or Authy using standard security QR-Codes, secret keys, and verified backup mechanisms.

---

## 🧠 Gemini Cognitive Orchestration Patterns

At the center of SPIKED AI is a highly advanced orchestration layer built using the modern **`@google/genai`** SDK. The platform employs state-of-the-art models for distinct cognitive weights, using customized thinking budgets to simulate real-world logical reasoning.

```
                      +----------------------------------------------+
                      |                 SPIKED AI                    |
                      +----------------------+-----------------------+
                                             |
                  +--------------------------+--------------------------+
                  |                                                     |
                  v                                                     v
   +--------------+---------------+                      +--------------+---------------+
   |      Deep Reasoning Node     |                      |     High-Speed Interactive   |
   +--------------+---------------+                      +--------------+---------------+
   | * gemini-3.1-pro-preview     |                      | * gemini-3-flash-preview     |
   | * Thinking Budget: 16k-32k   |                      | * Low Latency Flow           |
   | * Multi-Doc Ingestion        |                      | * Style Recommendations      |
   | * Multi-Persona Synthesis    |                      | * Response Validation        |
   +--------------+---------------+                      +--------------+---------------+
                  |                                                     |
                  +--------------------------+--------------------------+
                                             v
                              +--------------+---------------+
                              |    Vocal Synthesis Engine    |
                              +--------------+---------------+
                              | * gemini-3.1-flash-tts-preview|
                              | * Native Audio Modality      |
                              | * Personalized Voice Prints  |
                              +------------------------------+
```

### Models Utilized
*   **`gemini-3.1-pro-preview`:** Assigned to complex strategic reasoning, unified multi-document metadata extraction, and multi-persona buying evaluations. Configured with an adjusted thinking budget (up to **32,768 tokens**) to synthesize deep logical chains before rendering strategies.
*   **`gemini-3-flash-preview`:** Deployed for high-velocity interactive loops, style recommendation analysis, and real-time validation layers to maintain low latencies.
*   **`gemini-3.1-flash-tts-preview`:** Powering the vocal grooming engine, executing natural text-to-speech outputs by leveraging native representation of `AUDIO` modalities.

### Cognitive System Prompt Strategy
The simulator enforces character alignment by running strict behavioral instruction layers:
1.  **Scrutiny Calibration:** Responses scale directly with client settings (`Easy`, `Medium`, `Hard`). Advanced challenges require precise numerical support, ROI forecasts, and target-focused answers.
2.  **Structural Evaluations:** Models must validate answers before requesting the next point, rendering structured assessment metadata:
    ```json
    {
      "score": {
        "confidence": 85,
        "clarity": 90,
        "relevance": 75,
        "persuasiveness": 80,
        "empathy": 95
      },
      "feedback": "Coaching analysis utilizing technical enterprise sales methodology...",
      "strengths": ["Clear value alignment"],
      "improvements": ["Failed to provide exact ROI metrics"]
    }
    ```

---

## 🛠️ Installation & Setup

Before booting the local runtime environment, ensure you have **Node.js (v18+)** and a configured **Google Gemini API Key** and **Firebase project credentials**.

### 1. Ingest Dependencies
Install all modules, including React, tailwind plugins, firebase admin tooling, TOTP libraries, SQLite integrations, and developer dependencies:
```bash
npm install
```

### 2. Configure Environment Files
Clone the `.env.example` file and populate your local keys:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
GEMINI_API_KEY=your_gemini_api_key_here
SESSION_SECRET=a_secure_session_encryption_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### 3. Initialize the Development Environment
Boot the Express application. The server is configured to mount Vite in middleware mode during local development, serving hot assets and maintaining direct proxy channels to all API routes on a single port (**3000**):
```bash
npm run dev
```

### 4. Build for Production Optimization
When bundling the application for deployment (e.g., Cloud Run), compile the client assets into specialized static bundles and pack the server script into a single CommonJS module to bypass runtime import overheads:
```bash
npm run build
```
Launch the compiled production engine:
```bash
npm run start
```

---

## 📦 Database & Authentication Schema

### Sessions Relational Tables (SQLite - `sessions.db`)

#### `sessions`
Tracks active logins, devices, telemetry details, and auto-purges expired sessions:
```sql
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  deviceName TEXT,
  ipAddress TEXT,
  location TEXT,
  userAgent TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastActive DATETIME DEFAULT CURRENT_TIMESTAMP,
  expiresAt TEXT NOT NULL,
  deviceId TEXT,
  isRevoked INTEGER DEFAULT 0
);
```

#### `mfa_secrets`
Stores TOTP tokens for enrolled users:
```sql
CREATE TABLE IF NOT EXISTS mfa_secrets (
  userId TEXT PRIMARY KEY,
  secret TEXT NOT NULL,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### `user_settings`
Handles custom interface choices, preferences, and profiles:
```sql
CREATE TABLE IF NOT EXISTS user_settings (
  userId TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### `activity_logs`
Chronicles administrative and operational activities for security audits:
```sql
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  type TEXT NOT NULL,
  action TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔒 Security Standards

SPIKED AI strictly isolates sensitive variables from client viewports:
*   **Grounded REST Proxies:** No API keys are visible to client-side configurations. All interaction with the Gemini API, Firebase storage rules, and Google API interfaces is managed through restricted endpoint routes (`/api/*`).
*   **Dual Session Verification:** User requests must undergo dual verification. Incoming actions are validated through Firebase Auth tokens on the React front-end, and translated into SQLite session queries on the backend server before execution.
*   **MFA Safeguards:** If MFA is active, authentication pathways are blocked until the valid TOTP tokens are matched, preventing compromised accounts from accessing confidential data.

---

Designed with 🌌 **Cosmic Twilight styling**, SPIKED AI blends elite design with powerful full-stack and strategic capabilities. Prepared for high-fidelity performance evaluation and enterprise-ready security.
