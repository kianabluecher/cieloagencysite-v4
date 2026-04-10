# 🔑 CIELO Agency - Credentials & Quick Start

## 🚀 Immediate Access

### Dashboard Login URL
```
/team-login
```

### Test Credentials

#### Admin Account (Full Access)
```
Email: admin@cielo.agency
Password: CieloAdmin2025!
Role: admin
```

#### Team Member Account
```
Email: team@cielo.agency  
Password: CieloTeam2025!
Role: team
```

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Run Database Migrations

Go to **Supabase Dashboard → SQL Editor** and run these files in order:

1. `/sql_migrations/create_job_roles_table.sql`
2. `/sql_migrations/update_job_roles_with_auth.sql`
3. `/sql_migrations/create_portfolio_table.sql`
4. `/sql_migrations/create_unified_dashboard_tables.sql`

### Step 2: Create Your Admin Account

**Option A - Via Dashboard:**
```sql
-- Create user in Supabase Auth UI first, then run:
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

**Option B - Via Signup:**
1. Go to `/team-login`
2. Click "Sign up"
3. Enter your details
4. Manually set role to 'admin' in Supabase

### Step 3: Access Dashboard

1. Navigate to `/team-login`
2. Sign in with your credentials
3. Dashboard opens at `/team-dashboard`

---

## 📊 What You Get

### Unified Dashboard Features

| Tab | What It Shows | Actions Available |
|-----|---------------|-------------------|
| **Overview** | Stats, recent activity, quick actions | View metrics, navigate to sections |
| **Jobs** | Job postings management | Link to Jobs Admin panel |
| **Portfolio** | Portfolio projects | Link to Portfolio Admin |
| **Discovery** | Discovery form submissions | Update status, assign, prioritize |
| **Brand Audits** | AI brand audit requests | Track, update status, manage |
| **Contacts** | General inquiries | Respond, archive |

---

## 🗄️ All Tables in Supabase

After running migrations, you will have these tables:

✅ `job_roles` - Job postings
✅ `job_views` - Job analytics  
✅ `job_webhooks` - Webhook tracking
✅ `portfolio_projects` - Portfolio work
✅ `discovery_submissions` - Discovery forms
✅ `brand_audit_submissions` - Brand audits
✅ `contact_submissions` - Contact inquiries
✅ `team_activity_log` - Audit trail
✅ `user_profiles` - Team member profiles

**Each table has its own dedicated schema with proper RLS policies.**

---

## 🔐 Security Setup

### Row Level Security (RLS)

All tables have RLS enabled:
- ✅ Authenticated users can view/update submissions
- ✅ Service role has full access (for server)
- ✅ Public can only view open jobs
- ✅ Users can only edit their own jobs

### Authentication Methods

1. **Email/Password** - Standard login
2. **Magic Link** - Passwordless sign-in
3. **Password Reset** - Email-based recovery

---

## 📋 Dashboard Capabilities

### What Team Members Can Do:

#### Jobs Management
- Create new job postings
- Edit job details
- Mark as featured
- Set status (open/closed)
- Track views and analytics
- Filter and search

#### Discovery Form Management  
- View all submissions
- Update status: New → Contacted → Qualified → Converted
- Assign to team members
- Set priority levels
- Add internal notes
- Search and filter

#### Brand Audit Management
- View all brand audit requests
- See AI-generated audit results
- Update processing status
- Assign to team members
- Track completion

#### Contact Management
- View all general inquiries
- Update response status
- Archive old messages
- Assign follow-ups

---

## 🔄 Typical Workflows

### New Lead from Discovery Form
```
1. Form submitted → Status: "new"
2. Team reviews → Status: "contacted"
3. Call scheduled → Status: "qualified"
4. Deal closed → Status: "converted"
```

### Brand Audit Request
```
1. User submits form
2. AI generates audit → Status: "completed"
3. Results reviewed → Status: "sent"
4. Follow-up for project
```

### Job Posting
```
1. Create job posting
2. Set to "open" status
3. Mark as featured (optional)
4. Track applications
5. Close when filled
```

---

## 📞 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/team-login` | Team authentication |
| Dashboard | `/team-dashboard` | Unified management |
| Jobs Admin | `/jobs-admin` | Full jobs CRUD |
| Portfolio Admin | `/portfolio-admin` | Portfolio management |
| Public Jobs | `/jobs` | Public job listings |
| Public Portfolio | `/portfolio` | Public portfolio |

---

## ✅ Verification Checklist

After setup, verify these work:

- [ ] Can log in at `/team-login`
- [ ] Dashboard loads at `/team-dashboard`
- [ ] Can see overview stats
- [ ] Discovery tab shows submissions
- [ ] Brand Audits tab shows requests
- [ ] Jobs link works
- [ ] Portfolio link works
- [ ] Can update submission statuses
- [ ] Can log out successfully
- [ ] RLS policies prevent unauthorized access

---

## 🎯 Role Permissions

### Admin Role
- ✅ Full access to all features
- ✅ Manage all submissions
- ✅ Edit all jobs
- ✅ View all analytics
- ✅ Manage team members

### Team Role
- ✅ View all submissions
- ✅ Update statuses
- ✅ Create jobs (owns them)
- ✅ Edit own jobs
- ✅ View analytics
- ❌ Cannot manage users

---

## 🚨 Common Issues & Solutions

### "Access Denied" Error
**Solution:** Verify you're logged in and session is active

### Tables Don't Show Data
**Solution:** Check RLS policies exist, run migrations again

### Can't Update Status
**Solution:** Verify authenticated and have proper role

### Password Reset Not Working
**Solution:** Check email confirmation settings in Supabase

---

## 📊 Data Flow

```
PUBLIC FORMS
    ↓
SUPABASE TABLES
    ↓
TEAM DASHBOARD
    ↓
STATUS UPDATES
    ↓
CONVERSIONS/SALES
```

---

## 🔧 Environment Variables Required

These should already be set:

```env
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY (for emails)
OPENAI_API_KEY (for brand audits)
```

---

## 📈 Metrics You Can Track

- **Jobs:** Total, open, closed, views per job
- **Portfolio:** Total projects, published count
- **Discovery:** Total leads, conversion rate
- **Brand Audits:** Total requests, completion rate
- **Contacts:** Total inquiries, response rate

---

## 🎉 You're All Set!

Your unified team dashboard is now ready to:

✅ **Centralize** all business data
✅ **Track** leads and conversions  
✅ **Manage** jobs and portfolio
✅ **Analyze** performance
✅ **Collaborate** with your team

**Next Steps:**
1. Create team member accounts
2. Start updating submission statuses
3. Set up notification preferences
4. Configure automation workflows
5. Train your team on the dashboard

---

**For detailed documentation, see:** `/TEAM_DASHBOARD_COMPLETE_GUIDE.md`

**Last Updated:** November 7, 2025
**Version:** 2.0.0
**Status:** ✅ Ready to Use
