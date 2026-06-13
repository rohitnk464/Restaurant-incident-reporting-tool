# 🌯 California Burrito — Restaurant Incident Reporting Portal

A premium, production-ready incident command center and reporting console built for the **California Burrito** chain. Floor staff can instantly file operational logs, and managers/regional directors can monitor operations, track metrics, edit statuses, and review AI-powered impact reports in a centralized dashboard.

---

## 🔒 Demo Portal Credentials

To test the role-based access control (RBAC) and store data isolation, use the following pre-configured credentials:

### 1. Global Admin (Regional Director)
- **Role:** Regional Director (Sees all incidents across all locations)
- **Email:** `admin@californiaburrito.com`
- **Password:** `admin123`

### 2. Store Managers (Branch Restricted)
Each manager has a secure view restricted to their store location. They cannot view, edit, or delete logs belonging to other locations:
- **Downtown LA Store Manager:** 
  - **Email:** `dtla@californiaburrito.com` | **Password:** `manager123`
- **Santa Monica Store Manager:** 
  - **Email:** `sm@californiaburrito.com` | **Password:** `manager123`
- **San Diego Store Manager:** 
  - **Email:** `sd@californiaburrito.com` | **Password:** `manager123`
- **San Francisco Store Manager:** 
  - **Email:** `sf@californiaburrito.com` | **Password:** `manager123`
- **Oakland Store Manager:** 
  - **Email:** `oakland@californiaburrito.com` | **Password:** `manager123`

---

## ✨ Features & Architecture

### 🛡️ Production Security & RBAC
- **Public Reporting (`/report`):** Standard floor staff can submit incidents instantly without a login prompt, keeping reporting frictionless during peak rushes.
- **Secure Dashboard (`/`):** NextAuth.js safeguards the management dashboard, metrics panel, and detail pages.
- **Server-Side Security Enforcement:** All incident APIs (`GET`, `PUT`, `PATCH`, `DELETE` on `/api/incidents`) and AI APIs validate sessions. Managers are securely restricted to their own store's scope.

### 🎨 Premium UI/UX & Mobile Responsiveness
- **Brand Colors:** Sleek dark-cream layout utilizing California Burrito colors (Red: `#e61c24`, Green: `#225833`, Cream: `#fdf2d5`).
- **Full Responsiveness:** Navbars, filters, forms, stats grids, and analytics charts are fully responsive for desktops, laptops, tablets, and smartphones.
- **Sleek Graphics:** Interactive hover states, custom file-drop sections, and responsive mobile nav drawer.
- **Natural Image Blending:** Utilizes CSS `mix-blend-mode: multiply` on light mode to blend transparently with the background, with a clean border overlay frame in dark mode.

### 🤖 Gemini AI Summaries
- Integrates Google Gemini SDK (`gemini-3.5-flash` model) to summarize operational issues, assess business impact, and suggest actionable prevention steps.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Core Web App** | Next.js 16.2.9 (Turbopack) |
| **Styling** | Vanilla CSS + CSS Variables (Clean & responsive) |
| **Auth** | NextAuth.js (JWT strategy) |
| **Database** | SQLite via Prisma ORM |
| **AI SDK** | Google Gemini SDK (`gemini-3.5-flash`) |
| **Fonts** | Outfit (Headers) + Inter (Body) |

---

## 📦 Setup & Installation Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/rohitnk464/Restaurant-incident-reporting-tool.git
cd Restaurant-incident-reporting-tool/california-burrito-incidents
npm install
```

### 2. Configure Environment Variables
Create a `.env` (or `.env.local` for local runs) file in the root of the `california-burrito-incidents` directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="california-burrito-super-secret-key-2026"
GEMINI_API_KEY="[Your Google AI Studio API Key]"
```

### 3. Initialize & Seed Database
```bash
# Generate Prisma Client & Migrate DB schema
npx prisma generate
npx prisma db push

# Seed sample database
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 📡 API Endpoints

### 📋 Incidents API
* **`GET /api/incidents`** — List all incidents (Admins see all, managers are restricted to their store). Requires active login.
* **`POST /api/incidents`** — Submit an incident (Public access for staff).
* **`GET /api/incidents/[id]`** — View single incident details. Requires login + branch check.
* **`PUT /api/incidents/[id]`** / **`PATCH /api/incidents/[id]`** — Update details or status. Requires login + branch check.
* **`DELETE /api/incidents/[id]`** — Delete incident log. Requires login + branch check.

### 🤖 AI Summary API
* **`POST /api/ai/summarize`** — Triggers Gemini to analyze incident impact and suggest actions. Requires login + branch check.
