# 🕉️ SANSKAARPATH — Hackathon Documentation

> **"Ancient Values. Modern Minds. Balanced Futures."**

---

## 📌 Problem Statement

Children aged 4–16 spend an average of **3–5 hours daily** on mobile devices, consuming content that offers **zero educational or moral value**. This leads to:

- 📉 Declining attention spans
- 😶 Loss of cultural and moral values
- 📱 Screen addiction and digital dependency
- 😔 Reduced social skills and emotional intelligence
- 🧠 Impaired cognitive development

**There is no mainstream platform** that converts screen time into structured, value-based learning while keeping parents in control.

---

## 💡 Our Solution — SanskaarPath

**SanskaarPath** is a full-stack web platform that **transforms mindless screen time into meaningful learning time** for children aged 4–16.

Instead of fighting screen time, we **redirect it** — offering age-appropriate stories, tasks, videos, and activities rooted in **universal human values**: kindness, respect, discipline, courage, and unity.

### Core Differentiators:
- ✅ **Not another ed-tech app** — we focus on **character building**, not academics
- ✅ **Anti-addictive by design** — no infinite scrolling, no autoplay, no dark patterns
- ✅ **Parent-first control model** — parents set limits, lock content, get notifications
- ✅ **Gamification without exploitation** — XP, badges, streaks motivate without manipulating
- ✅ **Inclusive values** — content reflects universal values, not biased toward any religion

---

## 🛠️ Tech Stack

| Layer | Technology | Why We Chose It |
|-------|-----------|----------------|
| **Frontend Framework** | Next.js 14 (App Router) | Server-side rendering, API routes, file-based routing — all in one |
| **Styling** | Tailwind CSS v3 | Rapid UI development with consistent design tokens |
| **State Management** | Zustand | Lightweight, simple global state without boilerplate |
| **Database** | MongoDB Atlas + Mongoose ODM | Flexible schema for diverse content types, cloud-hosted |
| **Authentication** | JWT + bcryptjs | Stateless auth with secure password hashing |
| **Charts** | Recharts | Lightweight React charting for usage analytics |
| **Icons** | Lucide React | Consistent, beautiful open-source icon set |
| **Fonts** | Google Fonts (Inter + Outfit) | Premium typography for professional feel |

### Architecture Pattern
```
Client (React/Next.js) → Next.js API Routes → Mongoose ODM → MongoDB Atlas
         ↕                        ↕
    Zustand Store            JWT Auth Layer
```

---

## 🏗️ Project Structure

```
sanskaarpath/
├── app/                          # Next.js 14 App Router
│   ├── page.js                   # Landing page
│   ├── layout.js                 # Root layout + metadata
│   ├── globals.css               # Design system (Tailwind)
│   ├── login/page.js             # Parent login
│   ├── signup/page.js            # Parent registration
│   ├── dashboard/
│   │   ├── child/page.js         # 👦 Child learning dashboard
│   │   ├── parent/page.js        # 👨‍👩‍👧 Parent control center
│   │   └── admin/page.js         # 🔧 Admin content panel
│   └── api/                      # RESTful API routes
│       ├── auth/signup/route.js
│       ├── auth/login/route.js
│       ├── children/route.js
│       ├── children/[id]/route.js
│       ├── content/route.js
│       ├── content/[id]/approve/route.js
│       ├── screentime/route.js
│       ├── progress/route.js
│       └── seed/route.js
├── components/                   # 14 reusable UI components
├── hooks/                        # Custom React hooks
├── lib/                          # DB connection, auth, Zustand store
├── models/                       # 4 Mongoose data models
├── utils/                        # Business logic engines
└── styles/                       # Additional styles
```

**Total: 40+ files** | **14 React components** | **9 API endpoints** | **4 database models**

---

## 🔐 Role-Based Access System

SanskaarPath implements a **three-tier role system** with distinct capabilities:

### 👦 Role 1: Child (Learner)
| Feature | Description |
|---------|-------------|
| Personalized Dashboard | Welcome by name, age-appropriate content auto-filtered |
| Daily Learning | Stories, videos, tasks matched to their age group |
| XP & Leveling | Earn XP by completing content, level up automatically |
| Badge Collection | 12 unique badges earned through milestones |
| Daily Streak | Track consecutive learning days with visual fire streak |
| Screen Time Timer | Live countdown showing remaining screen time |
| Daily Value Quote | Rotating inspirational quote from curated collection |
| Focus Mode | Full-screen overlay suggesting offline activities |
| Content Completion | Mark content as done, earn XP rewards |

### 👨‍👩‍👧 Role 2: Parent (Guardian)
| Feature | Description |
|---------|-------------|
| Child Profile Management | Create multiple child profiles with name + age group |
| Screen Time Control | Slider to set daily limit (15 min – 3 hours) |
| Usage Analytics | 7-day bar chart showing daily screen time |
| Progress Tracking | View child's XP, level, badges, streak, completed content |
| Lock/Unlock Control | Instantly lock or unlock child's access |
| Smart Notifications | Alerts for: time limit reached, daily goal completed, streak milestones |
| Child View Toggle | Switch to see the app exactly as the child sees it |

### 🔧 Role 3: Admin (Platform Manager)
| Feature | Description |
|---------|-------------|
| Platform Analytics | Total users, children, content count, approval stats |
| Content Management | Full CRUD — add, edit, delete content with icon picker |
| Approval Workflow | Review queue for pending content with approve/reject |
| Database Seeding | One-click demo data population for demos |
| Content Categorization | Tag by category (story/video/task/activity) and age group |

---

## 🧩 Unique Features (Innovation Highlights)

### 1. 🧠 Age-Based Personalization Engine
Automatic content filtering based on developmental stage:

```
Age 4-6  → Moral stories, basic manners, sharing, gratitude
Age 7-9  → Ethics, history, good habits, teamwork, courage
Age 10-12 → Creative thinking, reasoning, empathy, leadership
Age 13-16 → Life skills, philosophy, mindfulness, self-improvement
```

This isn't just category filtering — each age group has **primary and secondary content types**, themed values, and tailored difficulty levels.

### 2. 📵 Digital Wellbeing System (Anti-Addiction)
- **Parent-set time limits** stored in database
- **Live countdown timer** visible to child
- **Auto-lock mechanism** when time runs out
- **Warning states** at 80% and 100% usage
- **Pause/Resume** controls
- **Offline activity suggestions** customized per age group
- **No addictive UX patterns** — no infinite scroll, no autoplay, no push notifications to child

### 3. 🎮 Gamification Without Manipulation
- **12 unique badges** across categories:
  - XP milestones (50, 100, 250, 500, 1000 XP)
  - Streak achievements (3, 7, 30 days)
  - Content milestones (5 stories, 10 tasks)
  - Special (Focus Mode, First Login)
- **Level system**: Level = floor(XP / 100) + 1
- **Level titles**: Beginner → Explorer → Achiever → Scholar → Master → Grandmaster
- **Visual progress bar** showing XP to next level
- **Daily goals** with completion tracking

### 4. 🎯 Focus Mode (Screen-Free Activities)
When activated, displays a **full-screen calming overlay** with curated offline activities:
- Age 4-6: "Draw your favorite animal", "Go for a nature walk"
- Age 7-9: "Write a short story about kindness", "Start a garden journal"
- Age 10-12: "Start a gratitude journal", "Design a poster about values"
- Age 13-16: "Practice 10 minutes of mindfulness", "Volunteer for community work"

### 5. 🔥 Daily Streak Tracker
- Visual 7-day calendar showing active learning days
- Automatic streak calculation with yesterday-check logic
- Streak badges at 3, 7, and 30 days
- Celebration messages for milestone streaks

### 6. 💬 Daily Value Quotes
- **30 curated quotes** from thought leaders (Gandhi, Buddha, Dalai Lama, Aristotle, etc.)
- **Deterministic daily rotation** — same quote for all users each day
- Includes the SanskaarPath motto: *"Technology should build character, not control it."*

### 7. 🔔 Smart Parent Notifications
Real-time notification system tracking:
- ⚠️ Screen time limit exceeded
- ✅ Daily goal completed
- 🔥 Streak milestones reached

---

## 🗄️ Database Schema Design

### Collections & Relationships

```
┌──────────┐       ┌──────────┐       ┌──────────────┐
│   User   │──1:N──│  Child   │──1:N──│ ActivityLog   │
│ (Parent) │       │          │       │               │
└──────────┘       └──────────┘       └──────────────┘
                        │
                        │ M:N (completedContentIds)
                        ▼
                   ┌──────────┐
                   │ Content  │
                   └──────────┘
```

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| **User** | name, email, password (hashed), role (parent/admin), children[] | Parent & admin accounts |
| **Child** | name, ageGroup, xp, level, badges[], streak, screenTimeLimit, progress, focusModeEnabled | Child profiles with gamification state |
| **Content** | title, description, category, ageGroup, approved, xpReward, icon | Learning content with approval workflow |
| **ActivityLog** | childId, usageTime, date, activitiesCompleted[] | Screen time & activity tracking |

---

## 🔗 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | Public | Register parent account |
| POST | `/api/auth/login` | Public | JWT login |
| GET | `/api/children` | Parent | List all children |
| POST | `/api/children` | Parent | Create child profile |
| GET | `/api/children/:id` | Parent | Get child details |
| PATCH | `/api/children/:id` | Parent | Update child (XP, streak, screen time, badges) |
| GET | `/api/content` | Public | Get content (filterable by ageGroup, category, approved) |
| POST | `/api/content` | Auth | Create content |
| PATCH | `/api/content/:id/approve` | Admin | Approve/reject content |
| DELETE | `/api/content/:id/approve` | Admin | Delete content |
| POST | `/api/screentime` | Parent | Log screen time usage |
| GET | `/api/screentime` | Parent | Get usage history |
| GET | `/api/progress` | Auth | Get progress (child-specific or platform stats) |
| POST | `/api/seed` | Public | Seed database with demo data |

---

## 🎨 Design Philosophy

### Calm UX Principles
- **No addictive patterns**: No infinite scroll, no autoplay, no push notifications
- **Soft color palette**: White, light blue, subtle saffron — calming, not stimulating
- **Clean typography**: Inter (body) + Outfit (headings) from Google Fonts
- **Generous whitespace**: Content breathes, reducing visual stress
- **Micro-animations**: Subtle fade-in, slide-up effects — not flashy or distracting
- **Mobile-first responsive**: Works seamlessly on phones, tablets, and desktops

### Design Tokens
| Token | Value | Usage |
|-------|-------|-------|
| Saffron | `#f97316` | Primary accent, CTAs, XP bar |
| Sky | `#0ea5e9` | Secondary accent, charts, info |
| Calm Gray | `#64748b` | Text, borders, subtle elements |
| Background | `#fafbff` | Page background |

---

## 🌍 Inclusivity & Values

SanskaarPath content is designed to be **universally inclusive**:

- ✅ **No religious bias** — values are universal (kindness, respect, discipline, unity)
- ✅ **Multicultural content** — quotes from leaders across cultures and time periods
- ✅ **Gender-neutral design** — no stereotyping in content or UI
- ✅ **Age-appropriate** — developmentally suitable for each age bracket
- ✅ **Positive framing** — encourages good behavior rather than punishing bad behavior

---

## 📊 Impact Metrics

| Metric | How We Measure |
|--------|---------------|
| Screen Time Reduction | Compare daily usage vs parent-set limits |
| Learning Engagement | Content completion rate, streak consistency |
| Value Absorption | Variety of content categories consumed |
| Parent Satisfaction | Control features used (limits set, notifications acted on) |
| Platform Growth | User signups, child profiles created, content added |

---

## 🚀 How to Run

```bash
# Clone and install
cd sanskaarpath
npm install

# Start development server
npm run dev

# Seed database (run once)
# Open PowerShell and run:
Invoke-RestMethod -Method POST -Uri http://localhost:3000/api/seed
```

**Access at**: http://localhost:3000

---

## 🔮 Future Roadmap

- 📱 Progressive Web App (PWA) for mobile installation
- 🤖 AI-powered content recommendations based on learning patterns
- 🎙️ Voice story playback for younger children
- 👨‍👩‍👧‍👦 Family challenges (collaborative learning goals)
- 🌐 Multi-language support (Hindi, Tamil, Bengali, etc.)
- 📊 Advanced analytics with learning insights
- 🔗 Integration with school systems
- 🎓 Teacher/mentor role for curated content

---

## 👥 Why SanskaarPath Wins

| Criteria | Our Strength |
|----------|-------------|
| **Innovation** | First platform to combine digital wellbeing + value-based learning + gamification |
| **Technical Depth** | Full-stack with real DB, auth, 3 roles, 9 API endpoints, 14 components |
| **Social Impact** | Directly addresses children's screen addiction — a global crisis |
| **Completeness** | Not a mockup — fully functional CRUD, real-time features, seeded demo data |
| **Design Quality** | Premium, calm UX with custom design system — not a template |
| **Scalability** | MongoDB Atlas cloud DB, JWT stateless auth, modular component architecture |

---

> *"Technology should build character, not control it."*
>
> — **SanskaarPath**
