# 🏗️ CIELO Agency - System Architecture

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Tailwind)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Home   │  │Portfolio │  │  Brand   │  │   Jobs   │       │
│  │   Page   │  │  Pages   │  │  Audit   │  │  System  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  About   │  │Services  │  │  Admin   │  │Discovery │       │
│  │   Page   │  │  Pages   │  │  Panels  │  │   Forms  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ API Calls (REST)
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                    API LAYER (Utilities)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ careers-api │  │portfolio-api │  │brand-audit   │          │
│  │    .ts      │  │     .ts      │  │   -api.ts    │          │
│  └─────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ HTTP Requests
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│              BACKEND (Supabase Edge Functions)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Hono Web Server (index.tsx)                  │  │
│  │                                                            │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐   │  │
│  │  │Portfolio│  │Discovery│  │  Brand  │  │   Jobs   │   │  │
│  │  │  API    │  │   API   │  │  Audit  │  │   API    │   │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └──────────┘   │  │
│  │                                                            │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │  │
│  │  │  Auth   │  │ Storage │  │Webhooks │                  │  │
│  │  │Validator│  │  Upload │  │Processor│                  │  │
│  │  └─────────┘  └─────────┘  └─────────┘                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────┬──────────────────────┬──────────────┬─────────────────┘
          │                      │              │
          │                      │              │
          ▼                      ▼              ▼
┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐
│   Supabase DB   │  │  External APIs   │  │   Storage    │
│                 │  │                  │  │              │
│ ┌─────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────┐ │
│ │ job_roles   │ │  │ │   OpenAI     │ │  │ │Portfolio │ │
│ │ job_views   │ │  │ │   Agents     │ │  │ │ Images   │ │
│ │job_webhooks │ │  │ └──────────────┘ │  │ └──────────┘ │
│ └─────────────┘ │  │                  │  │              │
│                 │  │ ┌──────────────┐ │  └──────────────┘
│ ┌─────────────┐ │  │ │   Resend     │ │
│ │  KV Store   │ │  │ │   (Email)    │ │
│ │             │ │  │ └──────────────┘ │
│ │ • Portfolio │ │  │                  │
│ │ • Audits    │ │  │ ┌──────────────┐ │
│ │ • Forms     │ │  │ │    Slack     │ │
│ └─────────────┘ │  │ │  Webhooks    │ │
│                 │  │ └──────────────┘ │
└─────────────────┘  └──────────────────┘
```

---

## 🔄 Data Flow Diagrams

### Jobs System Data Flow

```
┌──────────────┐
│   User       │
│  Views Job   │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  JobDetail.tsx   │
│  Component       │
└──────┬───────────┘
       │
       │ useEffect on mount
       ▼
┌──────────────────┐
│ trackJobView()   │
│  from API util   │
└──────┬───────────┘
       │
       │ POST /jobs/:id/view
       ▼
┌──────────────────────┐
│   Server Endpoint    │
│  (index.tsx)         │
└──────┬───────────────┘
       │
       │ INSERT INTO job_views
       ▼
┌──────────────────────┐
│   Supabase DB        │
│   job_views table    │
└──────────────────────┘
```

### Job Creation Flow with Webhooks

```
┌─────────────┐
│   Admin     │
│ Creates Job │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ JobsAdmin.tsx   │
└──────┬──────────┘
       │
       │ createJob(data, token)
       ▼
┌─────────────────┐
│  careers-api.ts │
└──────┬──────────┘
       │
       │ POST /jobs
       ▼
┌──────────────────────┐
│  Server Endpoint     │
│  Validates token     │
└──────┬───────────────┘
       │
       │ INSERT INTO job_roles
       ▼
┌──────────────────────────────┐
│       Supabase DB            │
│                              │
│  1. Insert into job_roles    │
│  2. Trigger fires            │
│  3. notify_job_change()      │
│  4. Insert into job_webhooks │
└──────┬───────────────────────┘
       │
       │ Webhook created (status='pending')
       ▼
┌──────────────────────────────┐
│  Webhook Processor           │
│  (Manual or Cron)            │
│                              │
│  POST /jobs/webhooks/process │
└──────┬───────────────────────┘
       │
       │ Fetch pending webhooks
       ▼
┌──────────────────────────────┐
│   External Services          │
│                              │
│  ┌────────────┐             │
│  │   Slack    │             │
│  └────────────┘             │
│                              │
│  ┌────────────┐             │
│  │   Email    │             │
│  └────────────┘             │
│                              │
│  ┌────────────┐             │
│  │  Zapier    │             │
│  └────────────┘             │
└──────────────────────────────┘
```

### Search Flow

```
┌──────────────┐
│   User       │
│ Types Query  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│   Jobs.tsx       │
│  Search Input    │
└──────┬───────────┘
       │
       │ handleSearch()
       ▼
┌──────────────────┐
│ searchJobs()     │
│  from API util   │
└──────┬───────────┘
       │
       │ GET /jobs/search?q=designer&department=Design
       ▼
┌──────────────────────────┐
│   Server Endpoint        │
│  Builds Supabase query   │
│  with filters            │
└──────┬───────────────────┘
       │
       │ SELECT * FROM job_roles
       │ WHERE status='open'
       │ AND department='Design'
       │ AND title ILIKE '%designer%'
       ▼
┌──────────────────────────┐
│   Supabase DB            │
│   Returns filtered jobs  │
└──────┬───────────────────┘
       │
       │ jobs[]
       ▼
┌──────────────────────────┐
│   Jobs.tsx               │
│   Displays results       │
└──────────────────────────┘
```

---

## 🔐 Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Public Internet                        │
└───────────────────────┬──────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│                  Frontend (React)                         │
│                                                           │
│  Authentication:                                          │
│  • No auth required for public pages                     │
│  • Team token stored in sessionStorage for admin         │
│                                                           │
│  API Calls Include:                                       │
│  • Authorization: Bearer {publicAnonKey}                 │
│  • X-Team-Token: {teamToken} (admin only)               │
└───────────────────────┬──────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│              Supabase Edge Function (Server)              │
│                                                           │
│  Security Layers:                                         │
│  1. CORS validation                                       │
│  2. Token validation (admin endpoints)                   │
│  3. RLS enforcement (database level)                     │
│                                                           │
│  Token Validation:                                        │
│  const token = c.req.header("X-Team-Token");            │
│  if (!validTokens.has(token)) return 401;                │
└───────────────────────┬──────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│                  Supabase Database                        │
│                                                           │
│  Row Level Security (RLS):                               │
│                                                           │
│  job_roles:                                              │
│  • SELECT: status = 'open' (public)                      │
│  • ALL: auth.role() = 'service_role' (admin)            │
│                                                           │
│  job_views:                                              │
│  • INSERT: true (anyone can track)                       │
│  • SELECT: auth.role() = 'service_role' (admin only)    │
│                                                           │
│  job_webhooks:                                           │
│  • ALL: auth.role() = 'service_role' (admin only)       │
└──────────────────────────────────────────────────────────┘
```

### Security Principles

1. **Defense in Depth**
   - Frontend validation
   - Server-side validation
   - Database RLS policies

2. **Least Privilege**
   - Public: Read-only access to open jobs
   - Admin: Full access with token
   - Service role: Database-level operations only

3. **Separation of Concerns**
   - `publicAnonKey`: Limited permissions for public
   - `SERVICE_ROLE_KEY`: Never exposed to frontend
   - Team tokens: Validated server-side

---

## 📊 Database Schema

### Entity Relationship Diagram

```
┌─────────────────────────────────┐
│         job_roles               │
├─────────────────────────────────┤
│ id: uuid (PK)                   │◄─────┐
│ title: text                     │      │
│ department: text                │      │
│ description: text               │      │
│ requirements: text[]            │      │
│ location: text                  │      │
│ type: text                      │      │
│ status: text                    │      │
│ featured: boolean               │      │
│ url: text                       │      │
│ posted_date: date               │      │
│ created_at: timestamptz         │      │
│ updated_at: timestamptz         │      │
└─────────────────────────────────┘      │
                                          │
         ┌────────────────────────────────┤
         │                                │
         │                                │
┌────────▼────────────────┐    ┌─────────▼──────────────┐
│      job_views          │    │    job_webhooks        │
├─────────────────────────┤    ├────────────────────────┤
│ id: uuid (PK)           │    │ id: uuid (PK)          │
│ job_id: uuid (FK)       │    │ job_id: uuid (FK)      │
│ viewed_at: timestamptz  │    │ event_type: text       │
│ user_agent: text        │    │ payload: jsonb         │
│ referrer: text          │    │ status: text           │
└─────────────────────────┘    │ webhook_url: text      │
                               │ sent_at: timestamptz   │
                               │ created_at: timestamptz│
                               └────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    KV Store (key-value)                   │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  portfolio:project:{id}      → Portfolio data            │
│  discovery:submission:{id}   → Form submissions          │
│  brand-audit:{id}            → Audit results             │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Indexes Strategy

```
job_roles:
  • idx_job_roles_status (status)              ← Filter open jobs
  • idx_job_roles_featured (featured)          ← Sort featured first
  • idx_job_roles_posted_date (posted_date)    ← Sort by date
  • idx_job_roles_department (department)      ← Search filter
  • idx_job_roles_location (location)          ← Search filter
  • idx_job_roles_type (type)                  ← Search filter

job_views:
  • idx_job_views_job_id (job_id)              ← Count per job
  • idx_job_views_viewed_at (viewed_at DESC)   ← Time series

job_webhooks:
  • idx_job_webhooks_job_id (job_id)           ← Find by job
  • idx_job_webhooks_status (status)           ← Find pending
  • idx_job_webhooks_event_type (event_type)   ← Filter events
```

---

## 🔌 API Architecture

### REST API Design

```
Base URL: /make-server-27c238f7

Naming Convention:
  Collection: /jobs
  Item:       /jobs/:id
  Action:     /jobs/search
  Nested:     /jobs/:id/view
  Admin:      /jobs/admin/all

HTTP Methods:
  GET     → Retrieve
  POST    → Create
  PUT     → Update
  DELETE  → Soft delete (status='closed')

Response Format:
  Success: { success: true, data: {...} }
  Error:   { error: "message", details: "..." }

Status Codes:
  200 → Success
  201 → Created
  400 → Bad request
  401 → Unauthorized
  404 → Not found
  500 → Server error
```

### Endpoint Organization

```
┌─────────────────────────────────────────────┐
│           Public Endpoints                   │
├─────────────────────────────────────────────┤
│ GET  /jobs                                   │
│ GET  /jobs/:id                               │
│ GET  /jobs/search                            │
│ POST /jobs/:id/view                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│        Protected Endpoints                   │
│        (Require X-Team-Token)                │
├─────────────────────────────────────────────┤
│ POST   /jobs                                 │
│ PUT    /jobs/:id                             │
│ DELETE /jobs/:id                             │
│ GET    /jobs/admin/all                       │
│ GET    /jobs/analytics                       │
│ POST   /jobs/webhooks/process                │
└─────────────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

```
┌───────────────────────────────────────────────────────┐
│                   Figma Make                          │
│              (Development Environment)                 │
└───────────────────────┬───────────────────────────────┘
                        │
                        │ Deploy
                        ▼
┌──────────────────────────────────────────────────────────┐
│                     Production                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────┐         ┌──────────────────┐       │
│  │   Frontend     │         │   Supabase       │       │
│  │   (React)      │◄───────►│   Edge Functions │       │
│  │                │         │   (Deno)         │       │
│  └────────────────┘         └────────┬─────────┘       │
│                                      │                   │
│                                      ▼                   │
│                            ┌──────────────────┐         │
│                            │  Supabase DB     │         │
│                            │  (PostgreSQL)    │         │
│                            └──────────────────┘         │
│                                                          │
│  External Services:                                      │
│  • Resend (Email)                                       │
│  • OpenAI (AI)                                          │
│  • Slack (Notifications)                                │
│  • Supabase Storage (Images)                            │
└──────────────────────────────────────────────────────────┘
```

---

## 📦 Component Architecture

### Frontend Component Hierarchy

```
App.tsx
│
├── Header
│   ├── Logo
│   ├── Navigation
│   └── CTA Button
│
├── Pages
│   ├── Home
│   ├── About
│   ├── Portfolio
│   │   ├── PortfolioShowcase
│   │   └── PortfolioDetail
│   │
│   ├── BrandAudit
│   │   └── AuditForm
│   │
│   ├── Jobs ⭐
│   │   ├── Hero Section
│   │   ├── Search & Filters
│   │   ├── Job List
│   │   └── CTA Section
│   │
│   ├── JobDetail ⭐
│   │   ├── Job Header
│   │   ├── About CIELO
│   │   ├── Job Description
│   │   └── Apply CTA
│   │
│   └── JobsAdmin ⭐
│       ├── Job Table
│       ├── Create/Edit Form
│       └── Analytics View
│
└── Footer
    ├── Links
    ├── Social
    └── Copyright
```

---

## 🔄 State Management

### Component State Strategy

```
Jobs Component:
┌──────────────────────────────────┐
│  State:                          │
│  • jobs: Job[]                   │
│  • loading: boolean              │
│  • error: string                 │
│  • searchQuery: string           │
│  • selectedDepartment: string    │
│  • selectedLocation: string      │
│  • selectedType: string          │
└──────────────────────────────────┘

JobsAdmin Component:
┌──────────────────────────────────┐
│  State:                          │
│  • jobs: Job[]                   │
│  • loading: boolean              │
│  • editingJob: Job | null        │
│  • formData: Partial<Job>        │
│  • showForm: boolean             │
└──────────────────────────────────┘

Global State (sessionStorage):
┌──────────────────────────────────┐
│  • team_auth_token              │
└──────────────────────────────────┘
```

---

## 🎯 Performance Optimization

### Caching Strategy

```
┌──────────────────────────────────────────┐
│         Cache Layers                      │
├──────────────────────────────────────────┤
│                                           │
│  1. Browser Cache                        │
│     • Static assets (images, CSS)        │
│     • Service worker (future)            │
│                                           │
│  2. API Response Cache                   │
│     • Portfolio: 1 hour in-memory        │
│     • Jobs: No cache (real-time)         │
│                                           │
│  3. Database Query Cache                 │
│     • Supabase connection pooling        │
│     • Prepared statements                │
│                                           │
│  4. CDN Cache (Production)               │
│     • Static files                       │
│     • Image optimization                 │
└──────────────────────────────────────────┘
```

### Query Optimization

```sql
-- Efficient queries with indexes
SELECT * FROM job_roles 
WHERE status = 'open'          -- Uses idx_job_roles_status
ORDER BY featured DESC,        -- Uses idx_job_roles_featured
         posted_date DESC;     -- Uses idx_job_roles_posted_date

-- Pagination (future)
SELECT * FROM job_roles 
WHERE status = 'open'
LIMIT 20 OFFSET 0;

-- Analytics aggregation
SELECT job_id, COUNT(*) as views
FROM job_views
GROUP BY job_id;
```

---

## 📱 Responsive Design Strategy

```
Breakpoints:
├── Mobile:     < 768px
├── Tablet:     768px - 1024px
├── Desktop:    1024px - 1440px
└── Wide:       > 1440px

Layout Strategy:
├── Mobile-first approach
├── Flexbox for 1D layouts
├── Grid for 2D layouts
└── Tailwind breakpoints (sm, md, lg, xl)

Component Adaptation:
├── Header:      Hamburger menu → Full nav
├── Job List:    Stacked → Side-by-side
├── Forms:       Full width → Constrained
└── Images:      Responsive sizing
```

---

## 🎨 Design System Architecture

```
┌────────────────────────────────────────┐
│         Design Tokens                   │
├────────────────────────────────────────┤
│                                         │
│  Colors:                                │
│  • Neutral-950 (background)            │
│  • White/opacity (text)                │
│  • Orange-brown (accents)              │
│                                         │
│  Typography:                            │
│  • Geist Mono (labels)                 │
│  • Default (body)                      │
│                                         │
│  Spacing:                               │
│  • Tailwind scale (4px base)           │
│                                         │
│  Effects:                               │
│  • Glow: radial-gradient               │
│  • Blur: backdrop-blur                 │
│  • Transitions: 300ms                  │
└────────────────────────────────────────┘
         │
         │ Applied to
         ▼
┌────────────────────────────────────────┐
│      Component Library                  │
├────────────────────────────────────────┤
│  • ShadCN UI (40+ components)          │
│  • Custom components                   │
│  • Page-specific components            │
└────────────────────────────────────────┘
```

---

*Architecture documentation for CIELO Agency Complete System*
*Last updated: November 7, 2025*
