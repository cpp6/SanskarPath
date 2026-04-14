# SanskaarPath 🕉️

> **"Ancient Values. Modern Minds. Balanced Futures."**

A full-stack web platform that **reduces mobile addiction in children (age 4–16)** by converting screen time into value-based, structured, and meaningful learning.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **MongoDB** running locally (or MongoDB Atlas URI)

### Setup

```bash
# Install dependencies
npm install

# Configure environment (edit .env.local if needed)
# Default: mongodb://localhost:27017/sanskaarpath

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **"Seed DB"** from the admin panel, or visit:
```
POST http://localhost:3000/api/seed
```

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| **Parent** | parent@demo.com | demo123 |
| **Admin** | admin@sanskaarpath.com | admin123 |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| State | Zustand |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Charts | Recharts |
| Icons | Lucide React |

---

## 📁 Project Structure

```
sanskaarpath/
├── app/
│   ├── page.js                     # Landing page
│   ├── layout.js                   # Root layout
│   ├── globals.css                 # Global styles
│   ├── login/page.js               # Login
│   ├── signup/page.js              # Signup
│   ├── dashboard/
│   │   ├── child/page.js           # Child dashboard
│   │   ├── parent/page.js          # Parent dashboard
│   │   └── admin/page.js           # Admin panel
│   └── api/
│       ├── auth/signup/route.js    # POST signup
│       ├── auth/login/route.js     # POST login
│       ├── children/route.js       # GET/POST children
│       ├── children/[id]/route.js  # GET/PATCH child
│       ├── content/route.js        # GET/POST content
│       ├── content/[id]/approve/   # PATCH approve
│       ├── screentime/route.js     # POST/GET screen time
│       ├── progress/route.js       # GET progress
│       └── seed/route.js           # POST seed data
├── components/                     # UI components
├── hooks/                          # Custom hooks
├── lib/                            # DB, auth, store
├── models/                         # Mongoose models
├── utils/                          # Business logic
└── styles/                         # Additional styles
```

---

## ✨ Features

### For Children
- 📖 Age-based personalized content
- 🏆 XP, levels, and badge system
- 🔥 Daily streak tracker
- 🎯 Focus Mode with offline activities
- ⏱️ Screen time countdown timer
- 💬 Daily value quotes

### For Parents
- ⏱️ Screen time limit control
- 📊 Usage analytics charts
- 🔒 Lock/unlock content
- 🔔 Smart notifications
- 📈 Progress tracking

### For Admins
- 📝 Content management (CRUD)
- ✅ Approval workflow
- 📊 Platform analytics
- 🗄️ Database seeding

---

## 🧠 Smart Logic

- **Age Engine**: Content auto-filters by age group (4-6: moral stories, 7-9: ethics, 10-12: creativity, 13-16: life skills)
- **Gamification**: XP → Level (xp/100+1) → Badges (12 types)
- **Digital Wellbeing**: Timer countdown, auto-lock, offline suggestions
- **Inclusivity**: Content reflects respect, kindness, discipline, unity

---

> *"Technology should build character, not control it."*
