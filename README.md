# 🌌 SPIKED AI: Enterprise Cognitive Intelligence & Sales Simulation Engine

An elite, full-stack cognitive intelligence platform and neural roleplay simulation. Powered by Google Gemini and designed to prepare enterprise-class sales executives to handle hyper-skeptical executive buying committees, refine strategic objection defenses, and master the complex dynamics of high-stakes deal cycles.

---

## 🏛️ Comprehensive System Architecture

SPIKED AI utilizes a modern, decoupled, full-stack architectural paradigm. It combines a client-side React 19 Single Page Application (SPA), bundled with Vite, with a robust Node.js backend running Express v5 that acts as a secure reverse proxy and analytical processor.

```
                          +----------------------------------------------+
                          |            Vite SPA Front-End (React 19)     |
                          |  - Zustand State Synchronizers               |
                          |  - Framer Motion Flow Transitions            |
                          |  - D3 & Recharts Visual Analytics            |
                          +----------------------+-----------------------+
                                                 |
                                                 | Secure Cookie-Parsed REST Core
                                                 v
                          +----------------------+-----------------------+
                          |         Express Full-Stack Server            |
                          |  - Multi-Factor Authentication Validation   |
                          |  - Google OAuth 2.0 Portal Protocol          |
                          |  - Gemini AI Orchestration Layer             |
                          +----+-----------------+------------------+----+
                               |                 |                  |
                               |                 |                  |
                               v                 v                  v
                +--------------+---+   +---------++--------+   +----+-------------+
                | Firebase Admin   |   | Better-SQLite3    |   | Google Workspace |
                | Cloud Firestore  |   | Security Registry |   | OAuth 2.0 Auth   |
                +--------------+---+   +---------++--------+   +----+-------------+
                               |                 |                  |
                               v                 v                  v
                       * Cloud Portfolios  * MFA Auth Secrets  * Gmail Briefings
                       * Shared Chats      * Device Tracking   * Google Drive Docs
                       * Quiz Collections  * Session History   * Calendar Syncs
```

### 1. Unified Client-Side Layer
*   **Reactive Rendering Suite:** Built on **React 19**, maximizing concurrent compilation features and hook optimization.
*   **Global State Hub:** Managed via **Zustand** stores, keeping transient state streams (such as pending OAuth processes, active audio recording blocks, and custom strategy layouts) coordinated with low render latency.
*   **Immersive Style Systems:** Styled with **Tailwind CSS v4** featuring the **Cosmic Twilight** aesthetic (deep obsidian spaces, starry borders, and high-contrast typography) supported by a **Magnifier Glass Viewport** system and **Fluid Animation Blocks** powered by `motion/react`.
*   **Interactive Visual Analytics:** Performance metrics (engagement curves, persuasion indices, and client risk signals) are tracked using vector-graphic **D3.js** layouts and modern **Recharts** charts.

### 2. High-Throughput Node.js Application Backend
*   **API Proxy Architecture:** Runs **Express v5** configured to mount Vite in middleware mode during local development. This enables hot asset reload and proxy routes to API points (`/api/*`) on a single port (**WAF-compliant Port 3000**), shielding sensitive API keys from browser clients.
*   **Dual Session Security Core:** Integrates standard **cookie-parser** and **express-session** alongside encrypted cookies, validating request tokens natively on incoming API transactions.

### 3. Balanced Dual-Storage Tier
*   **Google Cloud Firestore:** Governs non-relational document libraries, shared meeting portfolios, cloud-synced simulation configurations, active user profiles, and distributed quiz questions.
*   **Better-SQLite3 Relational Core:** A high-speed local SQL layer (housed in `sessions.db`) managing Multi-Factor Authentication (MFA) parameters, active device tokens, and analytical transaction logs.

---

## 🧠 Gemini Cognitive Orchestration & Prompt Engineering

The platform's cognitive operations are powered by the modern model suite from the **`@google/genai`** SDK. Models are mapped relative to their cognitive complexity, reasoning overhead, and target processing speeds.

```
                  +-------------------------------------------------------------+
                  |                  GEMINI COGNITIVE CORE                      |
                  +------------------------------+------------------------------+
                                                 |
                 +-------------------------------+-------------------------------+
                 |                                                               |
                 v                                                               v
  +--------------+---------------+                              +----------------+--------------+
  |    Deep Reasoning Engine     |                              |      High-Speed Interactive   |
  +--------------+---------------+                              +----------------+--------------+
  | * gemini-3.1-pro-preview     |                              | * gemini-3-flash-preview      |
  | * Thinking Budget: 32k       |                              | * low latency evaluation       |
  | * Complex Extraction         |                              | * style validator modules      |
  | * Matrix Ingestion           |                              | * quick-fire audio prompts     |
  +--------------+---------------+                              +----------------+--------------+
                 |                                                               |
                 +-------------------------------+-------------------------------+
                                                 v
                                  +--------------+---------------+
                                  |    Native TTS Vocal Node     |
                                  +--------------+---------------+
                                  | * gemini-3.1-flash-tts-prev  |
                                  | * Native AUDIO modalities    |
                                  | * Multi-voice prebuilt array |
                                  +------------------------------+
```

### 1. Cognitive Allocation Strategy
*   **`gemini-3.1-pro-preview`:** Handles unified multi-document analysis, competitive threat extraction, and complex strategy synthesis. It is configured with an active **thinking budget (up to 32,768 tokens)** to trace deep reasoning chains before producing strategies.
*   **`gemini-3-flash-preview`:** Drives conversational interfaces, real-time response evaluations, and high-speed cognitive validation frameworks to maintain responsive interface states.
*   **`gemini-3.1-flash-tts-preview`:** Performs text-to-speech rendering of simulated client conversations and system audio reports, using native representation of `AUDIO` modalities for realistic pacing and tone.

### 2. Robust Quota-Safe Request Handler
Our core orchestration uses an exponential backoff wrapper designed to handle high API traffic, recovering gracefully from `RESOURCE_EXHAUSTED` (HTTP 429) errors:

```typescript
async function withRetry<T>(fn: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isQuotaError = JSON.stringify(error).includes("RESOURCE_EXHAUSTED") || 
                           error.status === "RESOURCE_EXHAUSTED" || 
                           error.code === 429;
      if (isQuotaError) {
        let delay = Math.pow(2, i) * 2000; // 2s, 4s, 8s backoff
        console.warn(`Gemini API Quota exceeded. Retrying in ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}
```

### 3. Resilient Structural Output Parser
A common challenge in LLM orchestration is ensuring outputs conform to valid JSON arrays or objects. SPIKED AI features a multi-tiered structural recovery parser designed to extract JSON content even from wrapped Markdown code blocks, prefix text, or incomplete responses:

```typescript
function safeJsonParse(str: string) {
  let trimmed = str.trim();
  if (!trimmed) return {};

  const tryParse = (input: string) => {
    try {
      return JSON.parse(input);
    } catch (e: any) {
      const posMatch = e.message.match(/at position (\d+)/);
      if (posMatch) {
        try {
          return JSON.parse(input.substring(0, parseInt(posMatch[1], 10)));
        } catch (_) { return null; }
      }
      return null;
    }
  };

  let result = tryParse(trimmed);
  if (result) return result;

  // Markdown codeblock extract
  if (trimmed.includes("```")) {
    const clean = trimmed.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
    result = tryParse(clean);
    if (result) return result;
  }

  // Regex boundaries fallback
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    result = tryParse(trimmed.substring(firstBrace, lastBrace + 1));
    if (result) return result;
  }
  throw new Error("Unable to parse cognitive payload as valid JSON.");
}
```

---

## 🚀 Key Functional Modules

### 🗺️ Module 1: Strategic Onboarding & KYC Control Core
Establishes the targeted commercial bounds of the deal simulation:
*   **Dynamic Metadata Tuning:** Set your seller's name, target products, meeting foci, and simulation scenarios dynamically.
*   **Cognitive Slide Guides:** Configure objection thresholds (Easy, Medium, Hard) and adjust cognitive thinking budgets to control the simulation intensity.
*   **KYC Intelligent Document Extraction:** Drag-and-drop file uploader parsing contracts, RFPs, or product briefs. The ingestion layer analyzes materials to automatically identify key stakeholders, potential objections, and industry-specific keywords, immediately structuring them into the meeting context.

---

### 🛡️ Module 2: Enterprise Lobby Security & MFA Portal
SPIKED AI includes multi-tenant security layers designed to secure user sessions and enforce device limits:
*   **Google Authenticator TOTP Setup:** Users can configure classic Time-Based One-Time Passwords (TOTP). Generates standard QR-codes and secret keys compatible with security applications like Google Authenticator or Authy.
*   **SQLite Session Multi-Device Tracking:** Enforces account seat licensing by tracking active device IDs. If an account breaches the limit of **5 concurrent active sessions**, the system automatically revokes the oldest database session.
*   **Session History & Access Logs:** Interactive workspace auditing access locations, client IP addresses, browser agents, and timestamps in real-time.

---

### 🧪 Module 3: Executive Strategy & Competitive Wedge Lab
Processes document extraction payloads to synthesize high-impact enterprise sales playbooks:
*   **Strategic Action Pillars:** Outlines strategic actions aligned with the buyer's pain points.
*   **Competitive Wedge Synthesis:** Maps your direct competitors (e.g., Amelia, Cognigy) and constructs counter-arguments and feature wedges.
*   **Defensive Objections Matrix:** Generates potential issues the client might raise along with strategies to deflect and address them.

---

### 🎓 Module 4: Cognitive Assessment Lab (Assignments Mode)
Tests and verifies user retention on target products and company playbooks before they engage with clients:
*   **Quiz Engine:** Generates interactive questions based on uploaded documents. Supports multiple formats including Multiple Choice, Key Term Associations, and Open-Ended questions.
*   **Logic Gap Diagnostics:** Automatically identifies gaps in the user's answers, matching them back to the source document, and provides targeted feedback for study.

---

### 🛣️ Module 5: Progressive Stage Simulations
Allows users to experience a structured deal progression rather than single, isolated chats:
*   **Stage-Gated Sales Cycles:** Simulate the phases of an complex enterprise deal: *Ice-Breaker Discovery*, *Core Value Propositions*, *Pricing Scrutiny*, *Legal Review*, and *Closing Alignments*.
*   **Automated Stage Gates:** Monitors criteria during active chats. If the seller fails to handle objections or secure pricing agreements, the stage lock blocks them from advancing to the next negotiation phase.

---

### 👥 Module 6: Multi-Persona Buyer Committee (Avatar 2.0)
Simulates a realistic corporate buying committee. Users must tailor their vocabulary and arguments depending on which role is active:
*   **The Committee Panelists:**
    *   **The CIO (Chief Information Officer):** Investigates enterprise architecture, integration effort, scalability, and technical governance.
    *   **The CFO (Chief Financial Officer):** Evaluates ROI, payment structures, Total Cost of Ownership (TCO), and implementation risks.
    *   **The IT Director:** Focuses on deployment friction, support requirements, training cycles, and day-to-day usability.
*   **Real-time Member Interlock:** Switch between committee members on-the-fly during a live conversation. The AI dynamically adapts its tone and questions in response.
*   **Skeptical Gatekeeper Audits:** When answers are too brief or vague, the simulation triggers a fail state:
    ```
    [RESULT: FAIL]
    [DEFICIT: 45%]
    [COACHING: Your answer lacks concrete metrics.]
    [STYLE_GUIDE: Use the ROI Forecast framework.]
    [IDEAL_RESPONSE: Our platform cuts operational cost by 25%...]
    [RETRY_PROMPT: Let's try again: how does your platform reduce our costs?]
    ```

---

### 🎙️ Module 7: Vocal Grooming & Acoustic Feedback Lab
Addresses how something is said alongside what is said:
*   **Neural Vocal Signature Analysis:** Analyze your voice's acoustic characteristics. Extracts metrics like pitch, pacing, cadence, accent, and emotional baseline to create a vocal fingerprint.
*   **Vocal Metrics Dashboard:** Compares user delivery against target profiles and identifies verbal fillers or pacing issues.
*   **System Status Voice-Overs:** Features native voice output. Navigates menus and reads system alerts out loud in real-time, providing voice-guided simulation support.

---

### 📊 Module 8: The Live Roleplay Dashboard
An immersive training workspace:
*   **The 3-Panel Console:** Focuses all critical information on one cohesive dashboard:
    *   *Panel 1: The Interactive Transcription Rail* – Tracks both user text and voice recordings, displaying real-time speech-to-text transcripts.
    *   *Panel 2: Real-time Strategic Recommendations* – Dynamically updates with suggested objection counters and competitive wedges based on the active dialogue.
    *   *Panel 3: Neural Performance Charts* – Displays dynamic, D3-based line and radar charts that track metrics like Confidence, Relevance, and Persuasion in real-time.

---

### 🧠 Module 9: Strategic Knowledge Retrieval (Spiked GPT)
A context-grounded strategic conversational engine:
*   **Self-Organizing Folder Vault:** Categorizes uploaded files into structured directories (*Technical Architecture, Security & Compliance, Financial ROI, Training & Implementation, Miscellaneous*) using Gemini's classification layer.
*   **Response Style Optimization:** Formulate intelligence across structured strategic styles: *ROI Forecast*, *Executive Summary*, *Data-Driven Insights*, *Anticipated Client Questions*, *Buying Fear Mitigation*.
*   **Style Recommender & Validator:** Compares selected styles against your question, flagging inappropriate choices with recommendations for improvement.

---

### 🔌 Module 10: Google Workspace Integration Hub
Connects training simulations directly to active company systems using Google OAuth 2.0:
*   **Google Calendar Sync:** Sync upcoming client meetings to establish context before a simulation.
*   **Google Drive Context Importer:** Directly import project files, contracts, or presentation slides as training materials.
*   **Gmail Briefing Distribution:** Automatically compiles training metrics, scorecard breakdowns, and playbooks into professional HTML emails and distributes them to key stakeholders.

---

## 🗄️ Relational Database Schema & System Models

SPIKED AI utilizes SQLite (`sessions.db`) managed via `better-sqlite3`. The database initialization routine creates the following schema elements:

### 1. `sessions`
Enforces session security, active device limits, and tracks login locations.
```sql
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,                 -- SECURE UUIDv4 Token
  userId TEXT NOT NULL,                 -- Firebase Auth UID / Email Reference
  deviceName TEXT,                      -- User-Agent parsed Device (e.g. Chrome on macOS)
  ipAddress TEXT,                       -- Source IP Address
  location TEXT,                        -- GeoIP mapped Location
  userAgent TEXT,                       -- Full Browser User Agent string
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastActive DATETIME DEFAULT CURRENT_TIMESTAMP,
  isRevoked BOOLEAN DEFAULT 0,          -- 1 if session has been explicitly logged out or revoked
  expiresAt DATETIME,                   -- Time of session expiration (standard 30 days)
  deviceId TEXT                         -- Fingerprinted hardware device ID
);
```

### 2. `user_settings`
Stores user preferences, UI modifications, and strategic profiles in JSON format.
```sql
CREATE TABLE IF NOT EXISTS user_settings (
  userId TEXT PRIMARY KEY,              -- Firebase Auth UID Reference
  data TEXT NOT NULL,                   -- JSON payload containing Profile and UI Preferences
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3. `activity_logs`
An audit trail tracking user interactions and administrative events.
```sql
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,                 -- Log Transaction UUIDv4
  userId TEXT NOT NULL,                 -- Firebase Auth Reference
  type TEXT,                            -- Category (e.g., Authentication, Document Process)
  action TEXT,                          -- Human-readable description of the activity
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4. `mfa_secrets`
Stores TOTP authentication tokens.
```sql
CREATE TABLE IF NOT EXISTS mfa_secrets (
  userId TEXT PRIMARY KEY,              -- Fully verified Firebase Auth account
  secret TEXT NOT NULL,                 -- Encrypted BASE-32 Secret Token
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🏷️ REST API Endpoint Index

### 🔐 Authentication & Session Security EndPoints

#### `POST /api/auth/session/create`
Authenticates a user via Firebase ID Token and establishes a secure SQLite session context.
*   **Headers:** `Content-Type: application/json`
*   **Request Payload:**
    ```json
    {
      "idToken": "firebase_jwt_id_token",
      "deviceId": "client_hardware_fingerprint"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "success": true,
      "sessionId": "sqlite_session_uuid",
      "uid": "firebase_user_uid"
    }
    ```

#### `GET /api/auth/sessions`
Returns all active, expired, or revoked sessions registered to the current authenticated user.
*   **Cookies:** `express-session-cookie`
*   **Success Response (200 OK):**
    ```json
    {
      "sessions": [
        {
          "id": "session_uuid",
          "deviceName": "Safari on Safari OS",
          "ipAddress": "127.0.0.1",
          "location": "New York, USA",
          "isCurrent": true,
          "isRevoked": false,
          "createdAt": "2026-06-09T07:14:46Z",
          "expiresAt": "2026-07-09T07:14:46Z"
        }
      ]
    }
    ```

#### `POST /api/auth/sessions/revoke`
Revokes a targeted active session, forcing client logout on that device.
*   **Request Payload:**
    ```json
    {
      "sessionId": "session_uuid_to_revoke"
    }
    ```
*   **Success Response (200 OK):** `{"success": true}`

#### `POST /api/auth/sessions/revoke-others`
Revokes all other active sessions, keeping only the initiating device logged in.
*   **Success Response (200 OK):** `{"success": true}`

#### `POST /api/auth/heartbeat`
Updates the last active timestamp of the current session to maintain connection states.
*   **Success Response (200 OK):** `{"success": true}`

---

### 🛡️ Multi-Factor Authentication EndPoints

#### `GET /api/mfa/setup`
Initiates a new multi-factor setup. Generates a base-32 secret key and a companion QR-Code.
*   **Success Response (200 OK):**
    ```json
    {
      "qrCode": "data:image/png;base64,qr_bytes_payload",
      "secret": "JBSWY3DPEHPK3PXP"
    }
    ```

#### `POST /api/mfa/verify-and-enable`
Validates a six-digit TOTP token to complete MFA activation.
*   **Request Payload:**
    ```json
    {
      "token": "123456"
    }
    ```
*   **Success Response (200 OK):** `{"success": true}`

#### `POST /api/mfa/disable`
Disables multi-factor authentication and clears registered secrets.
*   **Success Response (200 OK):** `{"success": true}`

---

### 🔌 Google Workspace Integration EndPoints

#### `GET /api/auth/google/url`
Retrieves a Google OAuth 2.0 redirect URL structured with requested workspace permissions.
*   **Success Response (200 OK):**
    ```json
    {
      "url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
    }
    ```

#### `GET /api/calendar/upcoming`
Retrieves upcoming client meetings from the user's primary Google Calendar.
*   **Success Response (200 OK):** An array of Google Calendar event resources.

#### `POST /api/gmail/send-report`
Sends styled meeting briefings and strategies to stakeholders via the authenticated Gmail account.
*   **Request Payload:**
    ```json
    {
      "to": "client@enterprise.com",
      "subject": "Strategic Strategy Briefing - SPIKED AI",
      "body": "<html>...</html>"
    }
    ```
*   **Success Response (200 OK):** `{"success": true}`

#### `GET /api/drive/download/:fileId`
Downloads files from a connected Google Drive to use as knowledge sources.
*   **Success Response (200 OK):** Streams the target file with appropriate content-type headers.

---

## 🛠️ Installation & Environment Setup

Before starting the server, ensure **Node.js (v18+)** is installed, and a Google Cloud Firebase project is configured.

### 1. External Credentials Setup
You will need:
*   **Google Gemini API Key:** Required for cognitive and orchestration features.
*   **Google OAuth 2.0 Credentials:** Required for Google Workspace features, configured with these redirect URIs:
    *   Local Development redirect URI: `http://localhost:3000/auth/google/callback`

### 2. Dependency Ingestion
Run the packet installer to fetch and configure React, Tailwind, Better-SQLite3, and the Google API frameworks:
```bash
npm install
```

### 3. Application System Configuration
Create a `.env` file in the root workspace folder:
```bash
cp .env.example .env
```
Populate the system variables inside `.env`:
```env
# Google Gemini Access Key (Keep Secret)
GEMINI_API_KEY=your_gemini_api_key_value

# Session Encryption Keys
SESSION_SECRET=a_highly_secure_randomly_generated_hash_string

# Google Workspace Integration OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_from_gcp
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_gcp
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### 4. Running the Local Server
Boot the live dev environment. The node server launches the Express environment, compiles Vite client assets, and binds to port **`3000`**:
```bash
npm run dev
```

### 5. Compiling for Production
When deploying to services like Google Cloud Run, build optimized production bundles and a compact backend script to bypass runtime import overhead:
```bash
# Bundles client into raw static assets, compiles backend server via esbuild
npm run build
```
Start the production server:
```bash
npm run start
```

---

Designed with 🌌 **Cosmic Twilight styling**, SPIKED AI blends elite design with powerful full-stack and strategic capabilities. Prepared for high-fidelity performance evaluation and enterprise-ready security.
