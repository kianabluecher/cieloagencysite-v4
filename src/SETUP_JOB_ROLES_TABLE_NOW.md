# 🚀 Quick Setup: Job Roles Table for CIELO Agency

## ⚠️ IMPORTANT: Database Table Required

Your Jobs system requires the `job_roles` table in Supabase. Follow these steps to set it up:

---

## 📋 Setup Steps

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### Step 2: Run the Migration Script

1. Open the file: `/RUN_THIS_TO_CREATE_JOB_ROLES_TABLE.sql`
2. Copy **ALL** the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Cmd/Ctrl + Enter)

### Step 3: Verify Success

You should see:
- ✅ Table created successfully
- ✅ 5 sample jobs inserted
- ✅ Indexes created
- ✅ RLS policies configured

---

## 🧪 Test the System

After running the SQL:

### 1. Test Public Jobs Page
- Navigate to: **`/jobs`**
- You should see 5 sample job listings
- Featured jobs appear at the top

### 2. Test Admin Panel
- Login at: **`/team-login`**
- Navigate to: **`/jobs-admin`**
- Try creating a new job posting
- Edit or close existing jobs

---

## 📊 What Gets Created

### Database Table: `job_roles`

```
├── Columns:
│   ├── id (uuid, primary key)
│   ├── title (text)
│   ├── department (text)
│   ├── description (text)
│   ├── requirements (text array)
│   ├── location (text)
│   ├── type (text)
│   ├── status (text: 'open' or 'closed')
│   ├── featured (boolean)
│   ├── url (text, optional)
│   ├── posted_date (date)
│   └── updated_at (timestamp)
│
├── Indexes:
│   ├── idx_job_roles_status
│   ├── idx_job_roles_featured
│   └── idx_job_roles_posted_date
│
└── RLS Policies:
    ├── Public can view open jobs
    └── Service role can manage all jobs
```

### Sample Data (5 Jobs)

1. **Senior Brand Strategist** (Featured, Brand & Strategy)
2. **Creative Director** (Featured, Design)
3. **Full-Stack Developer** (Featured, Development)
4. **Social Media Manager** (Marketing)
5. **Motion Designer** (Design, Contract)

---

## 🔐 Security Features

- **Row Level Security (RLS)** enabled
- Public users can only view jobs with `status = 'open'`
- Admin operations require service role authentication
- Jobs are soft-deleted (status set to 'closed', not removed)

---

## 🎯 After Setup

Once the table is created, your entire Jobs system will work:

✅ **Public Jobs Page** (`/jobs`)
- View all open positions
- Featured roles section
- Benefits showcase
- Apply links

✅ **Admin Panel** (`/jobs-admin`)
- Create new jobs
- Edit existing jobs
- Close/reopen jobs
- Toggle featured status
- Manage requirements

✅ **Backend API**
- GET /jobs (public)
- GET /jobs/:id (public)
- POST /jobs (admin)
- PUT /jobs/:id (admin)
- DELETE /jobs/:id (admin)

---

## ❓ Troubleshooting

### Error: "relation 'job_roles' does not exist"
- You need to run the SQL migration script
- Open `/RUN_THIS_TO_CREATE_JOB_ROLES_TABLE.sql`
- Run it in Supabase SQL Editor

### No jobs showing on `/jobs` page
- Check if sample data was inserted
- Run: `SELECT * FROM job_roles WHERE status = 'open';`
- If empty, re-run the INSERT statements from the SQL file

### Can't create jobs in admin panel
- Verify you're logged in at `/team-login`
- Check RLS policies are enabled
- Ensure service role key is configured

---

## 📚 Related Documentation

- Full guide: `/JOBS_SETUP_GUIDE.md`
- Migration file: `/RUN_THIS_TO_CREATE_JOB_ROLES_TABLE.sql`
- Admin panel: `/components/pages/JobsAdmin.tsx`
- Public page: `/components/pages/Jobs.tsx`

---

## ✅ Checklist

- [ ] Run SQL migration in Supabase
- [ ] Verify table exists in Supabase dashboard
- [ ] Test public jobs page at `/jobs`
- [ ] Test admin panel at `/jobs-admin`
- [ ] Create your first custom job posting

---

**Status**: Ready for setup ⚠️  
**Required Action**: Run SQL migration in Supabase Dashboard  
**Estimated Time**: 2 minutes
