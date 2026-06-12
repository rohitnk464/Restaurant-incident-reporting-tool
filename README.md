# 🌯 California Burrito — Incident Reporting Tool

A modern, real-time web-based incident reporting system built for **California Burrito** restaurant chain. Enables staff to quickly report operational incidents and managers to track, filter, and resolve them from a centralized dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?logo=google)

---

## 🚀 Live Demo

**Deployed URL:** [Coming Soon — Deploy to Vercel]

---

## ✨ Features

### Core Features
- ✅ **Incident Submission Form** — Report incidents with title, description, category, store location, severity, and date/time
- ✅ **Incident Dashboard** — View all incidents with real-time statistics
- ✅ **Advanced Filtering** — Filter by category, severity, status + full-text search
- ✅ **Incident Detail View** — Full incident details with status management
- ✅ **Status Workflow** — Track incidents through Open → In Progress → Resolved → Closed
- ✅ **CRUD Operations** — Create, Read, Update, Delete incidents via REST API
- ✅ **Form Validation** — Client-side and server-side validation with error messages

### Bonus Features
- 🤖 **AI-Powered Summaries** — Generate incident analysis using Google Gemini AI
- 📱 **Mobile Responsive** — Fully responsive design for on-floor reporting
- 🎨 **Premium Dark Mode UI** — California Burrito branded theme with glassmorphism effects
- 📊 **Stats Overview** — At-a-glance metrics (Total, Open, In Progress, Critical, Resolved)
- 🔄 **Status Updates** — Update incident status directly from the detail page
- 🗑️ **Delete Incidents** — Remove resolved incidents from the system
- ⚡ **Micro-Animations** — Smooth card entrance, hover effects, and transitions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (React) |
| **Styling** | Vanilla CSS with CSS Custom Properties |
| **Backend** | Next.js API Routes |
| **Database** | SQLite via Prisma ORM |
| **AI** | Google Gemini 2.0 Flash |
| **Fonts** | Inter + Outfit (Google Fonts) |
| **Deployment** | Vercel |

---

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- (Optional) Google Gemini API key for AI features

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/california-burrito-incidents.git
cd california-burrito-incidents
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key (optional):
```
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="your-gemini-api-key-here"
```

> **Note:** The AI summary feature is optional. The app works fully without a Gemini API key — the AI button will show a friendly error message if no key is configured.

### 4. Initialize Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Seed Sample Data (Optional)

```bash
node prisma/seed.js
```

This will populate the database with 10 realistic sample incidents.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📡 API Documentation

### Incidents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/incidents` | List all incidents (supports query params) |
| `POST` | `/api/incidents` | Create a new incident |
| `GET` | `/api/incidents/:id` | Get a single incident |
| `PUT` | `/api/incidents/:id` | Update an incident |
| `DELETE` | `/api/incidents/:id` | Delete an incident |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/summarize` | Generate AI summary for an incident |

### Query Parameters (GET /api/incidents)

| Param | Type | Example |
|-------|------|---------|
| `category` | string | `?category=POS Issue` |
| `severity` | string | `?severity=Critical` |
| `status` | string | `?status=Open` |
| `search` | string | `?search=fryer` |

---

## 🗄️ Database Schema

```prisma
model Incident {
  id            String   @id @default(cuid())
  title         String
  description   String
  category      String
  storeLocation String
  severity      String
  status        String   @default("Open")
  reportedAt    DateTime @default(now())
  updatedAt     DateTime @updatedAt
  aiSummary     String?
  createdAt     DateTime @default(now())
}
```

**Supported Values:**
- **Categories:** POS Issue, Delivery Delay, Inventory, Kitchen Equipment, Customer Complaint, Other
- **Severities:** Low, Medium, High, Critical
- **Statuses:** Open, In Progress, Resolved, Closed

---

## 📁 Project Structure

```
california-burrito-incidents/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.js                # Sample data seeder
│   └── dev.db                 # SQLite database (generated)
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with fonts & theme
│   │   ├── page.js            # Dashboard (home page)
│   │   ├── globals.css        # Full design system
│   │   ├── report/page.js     # Incident submission form
│   │   ├── incident/[id]/page.js  # Incident detail view
│   │   └── api/
│   │       ├── incidents/
│   │       │   ├── route.js       # GET + POST
│   │       │   └── [id]/route.js  # GET + PUT + DELETE
│   │       └── ai/summarize/route.js  # AI summary
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── StatsBar.js        # Dashboard statistics
│   │   ├── FilterBar.js       # Search & filter controls
│   │   ├── IncidentCard.js    # Incident card component
│   │   ├── IncidentForm.js    # Submission form
│   │   └── Toast.js           # Toast notifications
│   └── lib/
│       ├── prisma.js          # Prisma client singleton
│       ├── constants.js       # App constants
│       └── utils.js           # Helper functions
├── .env.example               # Environment template
├── package.json
└── README.md
```

---

## 🤔 Assumptions Made

1. **No Authentication** — The app is open-access (login is listed as an optional feature)
2. **SQLite Database** — Chosen for zero-configuration simplicity; production would use PostgreSQL
3. **Client-side Filtering** — Filtering is done client-side for demo scale; server-side filtering is also supported via API query params
4. **Sample Store Data** — Store locations are hardcoded constants (not a separate database table)
5. **AI Feature is Optional** — The app works fully without a Gemini API key; AI features degrade gracefully

---

## 📚 External Libraries & Services

| Library | Purpose |
|---------|---------|
| `next` | React framework with SSR and API routes |
| `prisma` / `@prisma/client` | Database ORM for SQLite |
| `@google/generative-ai` | Google Gemini AI SDK for incident summaries |
| **Google Fonts** | Inter (body) + Outfit (headings) |

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables:
   - `DATABASE_URL` = `file:./dev.db`
   - `GEMINI_API_KEY` = your key (optional)
4. Deploy!

> **Note:** For production deployment with SQLite on Vercel, consider using a cloud database like Turso or switching to PostgreSQL with Supabase/Neon.

---

## 📝 License

Built with ❤️ for California Burrito 🌯
