# CIELO Agency Jobs System - Complete Setup Guide

## 📋 Overview

Complete careers/jobs system with Supabase database integration, admin panel, and public job listings page designed for CIELO Agency.

---

## 🗄️ Database Setup

### Step 1: Create the `job_roles` Table

Run this SQL migration in your Supabase SQL Editor:

```sql
-- Create job_roles table
CREATE TABLE job_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  description text,
  requirements text[],
  location text NOT NULL,
  type text DEFAULT 'Full-time',
  status text DEFAULT 'open',
  featured boolean DEFAULT false,
  url text,
  posted_date date DEFAULT CURRENT_DATE,
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_job_roles_updated_at
  BEFORE UPDATE ON job_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for common queries
CREATE INDEX idx_job_roles_status ON job_roles(status);
CREATE INDEX idx_job_roles_featured ON job_roles(featured);
CREATE INDEX idx_job_roles_posted_date ON job_roles(posted_date DESC);

-- Enable Row Level Security
ALTER TABLE job_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (only open jobs)
CREATE POLICY "Public can view open jobs"
  ON job_roles
  FOR SELECT
  USING (status = 'open');

-- Create policy for authenticated users (service role) to manage all jobs
CREATE POLICY "Service role can manage all jobs"
  ON job_roles
  FOR ALL
  USING (auth.role() = 'service_role');
```

### Step 2: Insert Sample Data (Optional)

```sql
-- Insert sample job postings for CIELO Agency
INSERT INTO job_roles (title, department, description, requirements, location, type, status, featured, url) VALUES
(
  'Senior Brand Strategist',
  'Brand & Strategy',
  'Lead brand strategy development for high-growth startups and established companies. Work directly with founders to define positioning, messaging, and go-to-market strategy.',
  ARRAY[
    '5+ years experience in brand strategy or consulting',
    'Portfolio of successful brand launches',
    'Strong understanding of startup ecosystems',
    'Excellent communication and presentation skills'
  ],
  'Remote',
  'Full-time',
  'open',
  true,
  'https://apply.workable.com/cielo-agency/j/123456/'
),
(
  'Creative Director',
  'Design',
  'Own the creative vision across all client work. Lead a team of designers to deliver world-class brand identities, websites, and digital experiences.',
  ARRAY[
    '7+ years in creative leadership roles',
    'Strong portfolio of brand and digital work',
    'Experience managing creative teams',
    'Proficiency in Figma, Adobe Creative Suite'
  ],
  'Remote',
  'Full-time',
  'open',
  true,
  null
),
(
  'Full-Stack Developer',
  'Development',
  'Build cutting-edge websites and web applications for our clients. Work with modern tech stack (React, Next.js, Node, Supabase) to ship fast.',
  ARRAY[
    '3+ years full-stack development experience',
    'Strong React and TypeScript skills',
    'Experience with modern deployment (Vercel, Netlify)',
    'Portfolio of shipped projects'
  ],
  'Remote',
  'Full-time',
  'open',
  true,
  null
),
(
  'Social Media Manager',
  'Marketing',
  'Manage social media strategy and execution for multiple client accounts. Create engaging content, grow audiences, and drive meaningful engagement.',
  ARRAY[
    '3+ years managing brand social media',
    'Experience with content creation and copywriting',
    'Strong understanding of platform algorithms',
    'Analytics-driven mindset'
  ],
  'Remote',
  'Full-time',
  'open',
  false,
  null
),
(
  'Motion Designer',
  'Design',
  'Create stunning motion graphics and animations for brand campaigns, social media, and websites. Push the boundaries of what''s possible.',
  ARRAY[
    '3+ years motion design experience',
    'Expert in After Effects and Premiere Pro',
    'Strong design fundamentals',
    'Portfolio showcasing range of styles'
  ],
  'Remote',
  'Contract',
  'open',
  false,
  null
);
```

### Step 3: Create Storage Bucket (Optional)

For job-related assets (PDFs, images):

```sql
-- Create storage bucket for job assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('job_assets', 'job_assets', true);

-- Create policy for public access to job assets
CREATE POLICY "Public can view job assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'job_assets');

-- Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload job assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'job_assets' AND auth.role() = 'authenticated');
```

---

## 🎨 Frontend Pages

### 1. Public Jobs Page (`/jobs`)

**Access:** Footer → Company → Jobs [WE'RE HIRING]

**Features:**
- Hero section: "Build Brands That Move Fast"
- Mission statement
- Benefits showcase (6 cards)
- Featured roles section
- All open positions grid
- CTA for unmatched candidates

**Data Source:** Fetches from `job_roles` table where `status = 'open'`

### 2. Jobs Admin Panel (`/jobs-admin`)

**Access:** Team Login → `/jobs-admin`

**Features:**
- View all jobs (open and closed)
- Create new job postings
- Edit existing jobs
- Close jobs (sets status to 'closed')
- Toggle featured status
- Add requirements (array)
- Set application URL

**Authentication:** Requires team login token

---

## 🔌 API Endpoints

All endpoints are in `/supabase/functions/server/index.tsx`

### Public Endpoints

#### GET /jobs
Get all open job postings.

```bash
GET /make-server-27c238f7/jobs
Authorization: Bearer {publicAnonKey}

Response:
{
  "jobs": [
    {
      "id": "uuid",
      "title": "Senior Brand Strategist",
      "department": "Brand & Strategy",
      "description": "...",
      "requirements": ["..."],
      "location": "Remote",
      "type": "Full-time",
      "status": "open",
      "featured": true,
      "url": "https://...",
      "posted_date": "2025-01-15",
      "updated_at": "2025-01-15T10:00:00Z"
    }
  ]
}
```

#### GET /jobs/:id
Get single job by ID.

```bash
GET /make-server-27c238f7/jobs/{job_id}
Authorization: Bearer {publicAnonKey}

Response:
{
  "job": { ... }
}
```

### Protected Endpoints (Require Team Token)

#### GET /jobs/admin/all
Get all jobs including closed (admin only).

```bash
GET /make-server-27c238f7/jobs/admin/all
Authorization: Bearer {publicAnonKey}
X-Team-Token: {team_token}

Response:
{
  "jobs": [ ... ] // includes closed jobs
}
```

#### POST /jobs
Create new job posting.

```bash
POST /make-server-27c238f7/jobs
Authorization: Bearer {publicAnonKey}
X-Team-Token: {team_token}
Content-Type: application/json

Body:
{
  "title": "UI/UX Designer",
  "department": "Design",
  "description": "Create beautiful user experiences...",
  "requirements": [
    "3+ years UX design experience",
    "Strong Figma skills"
  ],
  "location": "Remote",
  "type": "Full-time",
  "featured": false,
  "url": "https://apply.example.com/job-123"
}

Response:
{
  "success": true,
  "job": { ... }
}
```

#### PUT /jobs/:id
Update existing job.

```bash
PUT /make-server-27c238f7/jobs/{job_id}
Authorization: Bearer {publicAnonKey}
X-Team-Token: {team_token}
Content-Type: application/json

Body:
{
  "featured": true,
  "description": "Updated description..."
}

Response:
{
  "success": true,
  "job": { ... }
}
```

#### DELETE /jobs/:id
Close job (sets status to 'closed').

```bash
DELETE /make-server-27c238f7/jobs/{job_id}
Authorization: Bearer {publicAnonKey}
X-Team-Token: {team_token}

Response:
{
  "success": true,
  "message": "Job closed successfully"
}
```

---

## 🔐 Authentication

Jobs Admin requires team authentication:

**Credentials:**
- Email: `agency@cielo.marketing`
- Password: `cielo2024!`

**Access Flow:**
1. Navigate to `/team-login`
2. Enter credentials
3. Token stored in `sessionStorage` as `team_auth_token`
4. Navigate to `/jobs-admin`

---

## 🧪 Testing Checklist

### Setup
- [ ] Run SQL migration to create `job_roles` table
- [ ] Enable RLS policies
- [ ] Insert sample data (optional)
- [ ] Verify table exists in Supabase dashboard

### Public Page
- [ ] Navigate to `/jobs`
- [ ] Verify hero section loads
- [ ] Check benefits grid displays
- [ ] Confirm featured jobs appear
- [ ] Test all jobs grid
- [ ] Click "Get In Touch" → should navigate to inquiry

### Admin Panel
- [ ] Login at `/team-login`
- [ ] Navigate to `/jobs-admin`
- [ ] Verify jobs list loads
- [ ] Create new job:
  - Fill all fields
  - Add requirements
  - Toggle featured
  - Submit
- [ ] Edit job:
  - Click edit icon
  - Modify fields
  - Save
- [ ] Close job:
  - Click close icon
  - Confirm action
  - Verify moves to "Closed" section

### API
- [ ] Test GET /jobs (returns only open jobs)
- [ ] Test GET /jobs/:id
- [ ] Test POST /jobs (with token)
- [ ] Test PUT /jobs/:id (with token)
- [ ] Test DELETE /jobs/:id (sets status to closed)

---

## 🔄 Automation Setup (Optional)

### Notion Integration

When a job is added to `job_roles`, sync to Notion:

**Make.com Scenario:**
1. **Trigger:** Supabase Webhook (on INSERT to job_roles)
2. **Action:** Create Notion page in Jobs database
3. **Map Fields:**
   - Title → title
   - Department → Select/Multi-select
   - Location → Text
   - URL → URL property

### Slack Notifications

**Make.com Scenario:**
1. **Trigger:** Supabase Webhook (on INSERT to job_roles)
2. **Action:** Send Slack message to #team channel
3. **Message:**
   ```
   🎉 New Job Posted!
   Title: {title}
   Department: {department}
   Location: {location}
   Status: {status}
   ```

### Google Sheets Sync

**Make.com Scenario:**
1. **Trigger:** Supabase Webhook (on INSERT/UPDATE to job_roles)
2. **Action:** Add/Update row in Google Sheet
3. **Columns:** Title, Department, Location, Type, Status, Featured, Posted Date

---

## 📊 Database Schema Reference

```typescript
interface JobRole {
  id: string;              // uuid (auto-generated)
  title: string;           // Job title
  department: string;      // e.g., "Design", "Engineering"
  description: string;     // Full job description
  requirements: string[];  // Array of requirements
  location: string;        // e.g., "Remote", "San Francisco, CA"
  type: string;            // "Full-time", "Part-time", "Contract", "Remote", "Hybrid"
  status: string;          // "open" or "closed"
  featured: boolean;       // Show in featured section
  url: string | null;      // External application URL
  posted_date: string;     // Date job was posted (YYYY-MM-DD)
  updated_at: string;      // Last updated timestamp (ISO 8601)
}
```

---

## 🎯 Key Features

### Public Jobs Page
✅ CIELO Agency branding and messaging  
✅ "Build Brands That Move Fast" hero  
✅ Benefits showcase (Remote-first, Growth, Flexibility)  
✅ Featured roles section  
✅ All open positions grid  
✅ External application links  
✅ Responsive design  

### Admin Panel
✅ Full CRUD operations  
✅ Open vs Closed job sections  
✅ Featured toggle  
✅ Requirements array management  
✅ External URL support  
✅ Team authentication  
✅ Real-time updates  

### Backend
✅ Supabase PostgreSQL table  
✅ Row Level Security (RLS)  
✅ Public read policy for open jobs  
✅ Protected admin endpoints  
✅ Soft delete (status = 'closed')  
✅ Auto-updated timestamps  
✅ Indexed for performance  

---

## 🚀 Quick Start

1. **Create Database Table:**
   ```sql
   -- Run the SQL migration from Step 1 above
   ```

2. **Insert Sample Data:**
   ```sql
   -- Run sample data INSERT from Step 2 above
   ```

3. **View Public Page:**
   - Navigate to footer → Company → Jobs
   - Or go directly to `/jobs`

4. **Access Admin:**
   - Login at `/team-login`
   - Navigate to `/jobs-admin`
   - Create, edit, or close jobs

---

## 🎨 Design System

### Colors
- Background: `bg-neutral-950` / `bg-black`
- Text: `text-white` / `text-[#7d8187]`
- Borders: `border-[#1f2228]`
- Badge (Footer): `bg-red-500/20 text-red-400 border-red-500/30`
- Hover: `hover:border-white/20`

### Typography
- Headings: Default system (no font size/weight overrides)
- Labels: `font-['Geist_Mono']` with `tracking-[1.4px]` uppercase
- Body: Default

### Layout
- Max width: `max-w-7xl mx-auto`
- Padding: `px-6 py-24`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## 📝 Notes

- **Status Management:** Jobs are never truly deleted, only closed
- **RLS Policies:** Public can only view open jobs; admin has full access
- **Requirements:** Stored as PostgreSQL text array
- **Featured Jobs:** Appear first in listings and on homepage
- **Application URLs:** Optional external links for job applications
- **Auto-timestamps:** `updated_at` updates automatically on changes

---

## 🔗 Related Files

- `/components/pages/Jobs.tsx` - Public jobs page
- `/components/pages/JobsAdmin.tsx` - Admin panel
- `/components/Footer.tsx` - Footer with Jobs link
- `/supabase/functions/server/index.tsx` - Backend API
- `/JOBS_SYSTEM_README.md` - Original documentation

---

## ✅ System Status

**Database:** Requires manual table creation ⚠️  
**Frontend:** Production Ready ✅  
**Backend:** Production Ready ✅  
**Admin Panel:** Production Ready ✅  
**Documentation:** Complete ✅  

---

**Last Updated:** November 7, 2025  
**Version:** 2.0 (Supabase Table Integration)
