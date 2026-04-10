# CIELO Agency Jobs System - Documentation

## 🎯 Overview

Complete careers/jobs system for CIELO Agency with:
- Public jobs page with CIELO branding
- Admin panel for job management
- Supabase PostgreSQL database
- Row Level Security (RLS)
- Soft delete functionality

**Version:** 2.0 (Supabase Table Integration)

---

## 📄 Pages

### 1. Jobs Page (`/jobs`)
**Access:** Footer → Company → Jobs [WE'RE HIRING]

**Public-facing careers page with:**
- Hero: "Build Brands That Move Fast"
- Mission statement about CIELO
- Benefits showcase:
  - Remote-first culture
  - Competitive pay
  - Growth opportunities
  - Flexible schedule
  - Creative freedom
  - Startup mindset
- Featured roles section (jobs where `featured = true`)
- All open positions grid
- CTA for unmatched candidates

**Design:** Dark theme, modern aesthetic, CIELO branding

### 2. Jobs Admin (`/jobs-admin`)
**Access:** Team Login → `/jobs-admin`

**Protected admin panel featuring:**
- View all jobs (open and closed separately)
- Create new job postings
- Edit existing jobs
- Close jobs (soft delete - sets status to 'closed')
- Toggle featured status
- Manage requirements array
- Set external application URLs
- Real-time updates

**Authentication:** Requires team login (same credentials as Portfolio Admin)

---

## 🗄️ Database Structure

### Table: `job_roles`

**Schema:**
```sql
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
```

**Columns:**
- `id` - UUID, auto-generated primary key
- `title` - Job title (required)
- `department` - e.g., "Design", "Engineering", "Marketing"
- `description` - Full job description
- `requirements` - PostgreSQL text array of job requirements
- `location` - e.g., "Remote", "San Francisco, CA"
- `type` - "Full-time", "Part-time", "Contract", "Remote", "Hybrid"
- `status` - "open" or "closed" (default: 'open')
- `featured` - Show in featured section (default: false)
- `url` - External application URL (optional)
- `posted_date` - Date posted (auto: current date)
- `updated_at` - Auto-updated timestamp

**Indexes:**
- `idx_job_roles_status` on `status`
- `idx_job_roles_featured` on `featured`
- `idx_job_roles_posted_date` on `posted_date DESC`

**Row Level Security (RLS):**
- **Public Read Policy:** `status = 'open'` (only open jobs visible)
- **Service Role Policy:** Full access for authenticated backend

---

## 🔐 Authentication

Jobs Admin requires team authentication:

**Credentials:**
- Email: `agency@cielo.marketing`
- Password: `cielo2024!`

**Flow:**
1. Navigate to `/team-login`
2. Enter credentials
3. Token stored in `sessionStorage.team_auth_token`
4. Access `/jobs-admin`

---

## 🔌 Backend API Endpoints

All endpoints in `/supabase/functions/server/index.tsx`

### Public Endpoints

#### GET /jobs
```bash
GET /make-server-27c238f7/jobs
Authorization: Bearer {publicAnonKey}

# Returns only open jobs, sorted by featured first, then date
Response: { "jobs": [...] }
```

#### GET /jobs/:id
```bash
GET /make-server-27c238f7/jobs/{job_id}
Authorization: Bearer {publicAnonKey}

Response: { "job": {...} }
```

### Protected Endpoints (Require X-Team-Token)

#### GET /jobs/admin/all
```bash
GET /make-server-27c238f7/jobs/admin/all
Authorization: Bearer {publicAnonKey}
X-Team-Token: {token}

# Returns all jobs including closed
Response: { "jobs": [...] }
```

#### POST /jobs
```bash
POST /make-server-27c238f7/jobs
Authorization: Bearer {publicAnonKey}
X-Team-Token: {token}
Content-Type: application/json

Body: {
  "title": "Senior Brand Strategist",
  "department": "Brand & Strategy",
  "description": "...",
  "requirements": ["5+ years experience", "..."],
  "location": "Remote",
  "type": "Full-time",
  "featured": true,
  "url": "https://apply.example.com/job-123"
}

Response: { "success": true, "job": {...} }
```

#### PUT /jobs/:id
```bash
PUT /make-server-27c238f7/jobs/{job_id}
Authorization: Bearer {publicAnonKey}
X-Team-Token: {token}
Content-Type: application/json

Body: { "featured": true, "description": "Updated..." }

Response: { "success": true, "job": {...} }
```

#### DELETE /jobs/:id
```bash
DELETE /make-server-27c238f7/jobs/{job_id}
Authorization: Bearer {publicAnonKey}
X-Team-Token: {token}

# Soft delete - sets status to 'closed'
Response: { "success": true, "message": "Job closed successfully" }
```

---

## 🛠️ Setup Instructions

### 1. Create Database Table

**Option A: Use SQL Migration File**
```bash
# Run the complete SQL migration
# File: /sql_migrations/create_job_roles_table.sql
```

**Option B: Manual Setup in Supabase Dashboard**
1. Go to Supabase Dashboard → SQL Editor
2. Copy SQL from `/sql_migrations/create_job_roles_table.sql`
3. Execute the migration
4. Verify table exists in Table Editor

### 2. Insert Sample Data

The migration includes 6 sample job postings:
- Senior Brand Strategist (Featured)
- Creative Director (Featured)
- Full-Stack Developer (Featured)
- Social Media Manager
- Motion Designer
- UI/UX Designer

### 3. Verify Setup

```sql
-- Check table exists
SELECT * FROM job_roles LIMIT 1;

-- Count jobs by status
SELECT status, COUNT(*) FROM job_roles GROUP BY status;

-- View featured jobs
SELECT title, department, location FROM job_roles WHERE featured = true;
```

### 4. Test Frontend

1. Navigate to `/jobs`
2. Verify jobs display correctly
3. Login at `/team-login`
4. Go to `/jobs-admin`
5. Test CRUD operations

---

## 📍 Access Points

Jobs can be accessed from:
1. **Footer** → Company → Jobs [WE'RE HIRING] ✅
2. **Direct URL** → `/jobs` ✅
3. **Admin** → `/jobs-admin` (after login) ✅

**Note:** Jobs was removed from the header menu per requirements.

---

## 🧪 Testing Checklist

### Database Setup
- [ ] Run SQL migration
- [ ] Verify `job_roles` table exists
- [ ] Check RLS policies are enabled
- [ ] Insert sample data
- [ ] Verify indexes created

### Public Page
- [ ] Navigate to `/jobs` from footer
- [ ] Hero section displays correctly
- [ ] Benefits grid shows 6 cards
- [ ] Featured roles appear first
- [ ] All jobs grid displays
- [ ] External links work (if URLs present)
- [ ] "Get In Touch" navigates to inquiry

### Admin Panel
- [ ] Login at `/team-login`
- [ ] Access `/jobs-admin`
- [ ] Jobs table loads
- [ ] Create new job
  - Fill all fields
  - Add requirements
  - Toggle featured
  - Set external URL
  - Submit successfully
- [ ] Edit job
  - Click edit icon
  - Modify fields
  - Save changes
- [ ] Close job
  - Click close/delete icon
  - Confirm action
  - Job moves to "Closed" section
- [ ] View public page from admin

### API Testing
- [ ] GET /jobs returns only open jobs
- [ ] GET /jobs/:id returns single job
- [ ] GET /jobs/admin/all returns all jobs (with token)
- [ ] POST /jobs creates job (with token)
- [ ] PUT /jobs/:id updates job (with token)
- [ ] DELETE /jobs/:id closes job (with token)
- [ ] Unauthorized requests return 401

---

## 🎨 Design System

### Colors
- Primary BG: `bg-neutral-950`
- Secondary BG: `bg-black`
- Text Primary: `text-white`
- Text Secondary: `text-[#7d8187]`
- Borders: `border-[#1f2228]`
- Badge (Footer): `bg-red-500/20 text-red-400 border-red-500/30`

### Typography
- Headlines: Default (no overrides)
- Labels: `font-['Geist_Mono']` with `tracking-[1.4px]` uppercase
- Body: Default system

### Layout
- Container: `max-w-7xl mx-auto`
- Section Padding: `px-6 py-24`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Cards: `rounded-2xl` with `border border-[#1f2228]`

---

## 🔄 Optional Integrations

### Notion Sync
Sync new jobs to Notion database via Make.com/Zapier:
- Trigger: Supabase webhook on INSERT
- Action: Create Notion page
- Map: title, department, location, url

### Slack Notifications
Send alerts when jobs are posted:
- Trigger: Supabase webhook on INSERT
- Action: Post to Slack channel
- Message: "🎉 New Job Posted: {title}"

### Google Sheets
Real-time sync to spreadsheet:
- Trigger: Supabase webhook on INSERT/UPDATE
- Action: Add/update row
- Columns: All job fields

### Email Notifications
Notify team of new applications:
- Trigger: Application form submission
- Action: Send email to team
- Include: Job title, candidate info

---

## 📊 Key Features

### Public Jobs Page
✅ CIELO Agency branding  
✅ "Build Brands That Move Fast" hero  
✅ Mission statement  
✅ 6 benefits cards  
✅ Featured roles section  
✅ All open positions grid  
✅ External application links  
✅ Responsive design  
✅ Dark theme  

### Admin Panel
✅ View open and closed jobs separately  
✅ Create job postings  
✅ Edit existing jobs  
✅ Close jobs (soft delete)  
✅ Requirements array management  
✅ Featured toggle  
✅ External URL support  
✅ Team authentication  
✅ Real-time updates  

### Backend
✅ Supabase PostgreSQL table  
✅ Row Level Security (RLS)  
✅ Public read policy (open jobs only)  
✅ Service role full access  
✅ Soft delete (status = 'closed')  
✅ Auto-updated timestamps  
✅ Indexed for performance  
✅ RESTful API  
✅ Protected endpoints  

---

## 🚀 Quick Start

1. **Create Table:**
   ```bash
   # Run SQL migration from /sql_migrations/create_job_roles_table.sql
   ```

2. **View Jobs:**
   ```bash
   # Navigate to footer → Company → Jobs
   # Or go to /jobs directly
   ```

3. **Manage Jobs:**
   ```bash
   # Login at /team-login
   # Go to /jobs-admin
   # Create, edit, or close jobs
   ```

---

## 🔍 Troubleshooting

### Issue: "Failed to fetch jobs"
**Solution:**
1. Verify `job_roles` table exists in Supabase
2. Check RLS policies are enabled
3. Ensure public read policy allows `status = 'open'`
4. Check browser console for errors
5. Verify Supabase Edge Functions are running

### Issue: Can't access Jobs Admin
**Solution:**
1. Login at `/team-login` first
2. Check `sessionStorage.team_auth_token` exists
3. Re-login if session expired
4. Verify credentials are correct

### Issue: Jobs not appearing on public page
**Solution:**
1. Check job `status = 'open'` in database
2. Verify RLS policy allows public read
3. Check network tab for API errors
4. Ensure data exists in `job_roles` table

### Issue: Can't create/edit jobs
**Solution:**
1. Verify team token is valid
2. Check all required fields are filled
3. Check browser console for validation errors
4. Verify backend endpoint is accessible
5. Check Supabase logs for errors

---

## 📁 Related Files

- `/components/pages/Jobs.tsx` - Public jobs page
- `/components/pages/JobsAdmin.tsx` - Admin panel
- `/components/Footer.tsx` - Footer with Jobs link
- `/supabase/functions/server/index.tsx` - Backend API
- `/sql_migrations/create_job_roles_table.sql` - Database migration
- `/JOBS_SETUP_GUIDE.md` - Detailed setup guide

---

## 📝 Notes

- Jobs are never truly deleted, only closed (soft delete)
- RLS ensures only open jobs are publicly visible
- Requirements stored as PostgreSQL text array
- Featured jobs appear first in all listings
- Application URLs are optional
- Timestamps update automatically
- Backend uses Supabase service role for full access

---

## ✅ System Status

**Database:** Requires manual table creation ⚠️  
**Frontend:** Production Ready ✅  
**Backend:** Production Ready ✅  
**Admin Panel:** Production Ready ✅  
**Documentation:** Complete ✅  
**Design:** CIELO Branded ✅  

---

## 📅 Changelog

### Version 2.0 (November 7, 2025)
- Migrated from KV store to Supabase table
- Added Row Level Security (RLS)
- Implemented soft delete (status field)
- Added requirements array field
- Updated content for CIELO Agency
- Removed from header menu (footer only)
- Added comprehensive setup guide
- Created SQL migration file

### Version 1.0
- Initial KV store implementation
- Basic CRUD operations
- AI company content

---

**Last Updated:** November 7, 2025  
**Status:** Production Ready  
**Version:** 2.0 (Supabase Table Integration)
