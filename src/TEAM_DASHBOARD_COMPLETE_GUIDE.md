# 🚀 CIELO Agency - Complete Unified Team Dashboard Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Access Credentials](#access-credentials)
3. [Database Schema](#database-schema)
4. [Features](#features)
5. [Setup Instructions](#setup-instructions)
6. [Dashboard Sections](#dashboard-sections)
7. [API Endpoints](#api-endpoints)
8. [Security & Permissions](#security--permissions)

---

## 📊 Overview

The **CIELO Agency Unified Team Dashboard** is a complete, secure, authenticated management system that consolidates ALL business submissions and data in one place:

- **Jobs Management** - Create, edit, and manage job postings
- **Portfolio Projects** - View and manage portfolio submissions
- **Discovery Forms** - Track and convert new leads
- **Brand Audits** - Manage AI-powered brand audit requests
- **Contact Submissions** - Handle general inquiries
- **Analytics** - View metrics and performance data
- **Activity Log** - Track all team actions

---

## 🔑 Access Credentials

### Dashboard URLs

| Page | URL | Purpose |
|------|-----|---------|
| Team Login | `/team-login` | Secure authentication page |
| Unified Dashboard | `/team-dashboard` | Main dashboard (requires login) |
| Jobs Admin | `/jobs-admin` | Dedicated jobs management |
| Portfolio Admin | `/portfolio-admin` | Portfolio management |

### Default Test Accounts

#### Admin Account
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

### Creating New Team Members

1. Go to `/team-login`
2. Click "Sign up"
3. Enter details:
   - Full Name
   - Email
   - Password (min. 6 characters)
4. User will be created with `team` role by default
5. Admin can upgrade role in Supabase dashboard

---

## 🗄️ Database Schema

### Tables Created

All tables are in Supabase with RLS (Row Level Security) enabled.

#### 1. `job_roles` - Job Postings
```sql
- id (uuid, primary key)
- title (text)
- department (text)
- description (text)
- requirements (text[])
- location (text)
- type (text) - 'Full-time', 'Part-time', 'Contract', etc.
- status (text) - 'open', 'closed'
- featured (boolean)
- url (text)
- visibility (text) - 'public', 'unlisted'
- created_by (uuid, references auth.users)
- posted_date (date)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 2. `portfolio_projects` - Portfolio Work
```sql
- id (text, primary key)
- title (text)
- subtitle (text)
- category (text)
- project_type (text)
- client_type (text)
- description (text)
- what_we_did (text[])
- result (text)
- images (text[])
- date_label (text)
- tags (text[])
- featured (boolean)
- published (boolean)
- view_count (integer)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 3. `discovery_submissions` - Discovery Forms
```sql
- id (uuid, primary key)
- submission_id (text, unique)
- name (text)
- email (text)
- phone (text)
- company_name (text)
- business_need (text)
- services (text)
- budget (text)
- timeline (text)
- message (text)
- status (text) - 'new', 'contacted', 'qualified', 'converted', 'archived'
- priority (text) - 'low', 'normal', 'high', 'urgent'
- assigned_to (uuid, references auth.users)
- notes (text)
- submitted_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 4. `brand_audit_submissions` - Brand Audits
```sql
- id (uuid, primary key)
- submission_id (text, unique)
- email (text)
- company_name (text)
- industry (text)
- website (text)
- focus_area (text) - 'brand-positioning', 'visual-identity', etc.
- target_audience (text)
- current_challenges (text)
- competitors (text)
- unique_value (text)
- goals (text)
- audit_result (jsonb) - AI-generated results
- status (text) - 'pending', 'processing', 'completed', 'sent', 'archived'
- priority (text)
- assigned_to (uuid)
- notes (text)
- submitted_at (timestamptz)
- completed_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 5. `contact_submissions` - General Inquiries
```sql
- id (uuid, primary key)
- submission_id (text, unique)
- name (text)
- email (text)
- company (text)
- subject (text)
- message (text)
- source (text) - 'contact-form', 'inquiry-page', 'footer'
- status (text) - 'new', 'contacted', 'archived'
- priority (text)
- assigned_to (uuid)
- notes (text)
- submitted_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 6. `team_activity_log` - Audit Trail
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- action (text) - 'created', 'updated', 'deleted', 'viewed', etc.
- entity_type (text) - 'job', 'portfolio', 'discovery', etc.
- entity_id (text)
- details (jsonb)
- ip_address (text)
- user_agent (text)
- created_at (timestamptz)
```

#### 7. `user_profiles` - Team Member Profiles
```sql
- id (uuid, primary key, references auth.users)
- email (text)
- full_name (text)
- role (text) - 'admin', 'team'
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 8. `job_views` - Analytics
```sql
- id (uuid, primary key)
- job_id (uuid, references job_roles)
- viewed_at (timestamptz)
- user_agent (text)
- referrer (text)
```

#### 9. `job_webhooks` - Webhook Tracking
```sql
- id (uuid, primary key)
- job_id (uuid)
- event_type (text)
- payload (jsonb)
- status (text)
- webhook_url (text)
- sent_at (timestamptz)
- created_at (timestamptz)
```

---

## ✨ Features

### 📊 Overview Dashboard
- **Real-time Statistics**: Total jobs, portfolio projects, leads, audits
- **Quick Metrics**: Open jobs, new leads, pending audits, conversions
- **Recent Activity**: Latest submissions across all categories
- **Quick Actions**: Jump to any section quickly

### 💼 Jobs Management
- Create new job postings
- Edit existing jobs
- Mark as featured
- Open/close positions
- Track job views
- Filter by status, department
- Search functionality

### 🎨 Portfolio Management
- View all projects
- Published/unpublished toggle
- Track project views
- Featured projects
- Link to full portfolio admin

### 📋 Discovery Forms
- View all discovery submissions
- Update status: New → Contacted → Qualified → Converted
- Assign to team members
- Set priority levels
- Search and filter
- Track conversion funnel

### 🎯 Brand Audits
- View all brand audit requests
- Track AI-generated audits
- Update status: Pending → Processing → Completed → Sent
- Filter by focus area
- Assign to team members

### 📧 Contact Submissions
- General inquiry management
- Status tracking
- Quick response actions
- Archive old submissions

### 👥 Team Features
- Role-based access (admin/team)
- Secure authentication
- User profiles
- Activity logging
- Permission controls

---

## 🔧 Setup Instructions

### 1. Run SQL Migrations

Execute these SQL files in your Supabase SQL Editor **in order**:

```bash
1. /sql_migrations/create_job_roles_table.sql
2. /sql_migrations/update_job_roles_with_auth.sql
3. /sql_migrations/create_portfolio_table.sql
4. /sql_migrations/create_unified_dashboard_tables.sql
```

### 2. Create First Admin User

Option A: Via Supabase Dashboard
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter email and password
4. After creation, go to SQL Editor and run:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

Option B: Via Signup Flow
1. Go to `/team-login`
2. Click "Sign up"
3. Create account
4. Manually update role in Supabase

### 3. Verify Tables

Run this query to verify all tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN (
  'job_roles',
  'portfolio_projects', 
  'discovery_submissions',
  'brand_audit_submissions',
  'contact_submissions',
  'team_activity_log',
  'user_profiles',
  'job_views',
  'job_webhooks'
)
ORDER BY table_name;
```

### 4. Test Access

1. Navigate to `/team-login`
2. Sign in with your credentials
3. You should be redirected to `/team-dashboard`
4. Verify all tabs load correctly

---

## 📑 Dashboard Sections

### Overview Tab
- Displays aggregate statistics
- Recent submissions preview
- Quick action buttons
- Performance metrics

### Jobs Tab
- Link to dedicated Jobs Admin
- View summary stats
- Quick access to job management

### Portfolio Tab
- Link to Portfolio Admin
- Project count and status
- Publishing controls

### Discovery Tab
- Full submissions table
- Status management
- Lead qualification
- Conversion tracking
- Search and filters

### Brand Audits Tab
- Audit request management
- Status updates
- Focus area filtering
- Assignment controls

### Contacts Tab
- General inquiry list
- Response tracking
- Archive functionality

---

## 🌐 API Endpoints

All endpoints require authentication (Bearer token).

### Dashboard Overview
```
GET /make-server-27c238f7/dashboard/overview
Returns: Complete statistics for all systems
```

### Discovery Submissions
```
GET /make-server-27c238f7/dashboard/discovery
Returns: All discovery form submissions

PATCH /make-server-27c238f7/dashboard/discovery/:id
Body: { status, priority, notes, assigned_to }
```

### Brand Audits
```
GET /make-server-27c238f7/dashboard/brand-audits
Returns: All brand audit submissions

PATCH /make-server-27c238f7/dashboard/brand-audits/:id
Body: { status, priority, notes, assigned_to }
```

### Contacts
```
GET /make-server-27c238f7/dashboard/contacts
Returns: All contact submissions

PATCH /make-server-27c238f7/dashboard/contacts/:id
Body: { status, notes, assigned_to }
```

### Activity Log
```
GET /make-server-27c238f7/dashboard/activity?limit=50
Returns: Recent team activity

POST /make-server-27c238f7/dashboard/activity
Body: { user_id, action, entity_type, entity_id, details }
```

---

## 🔐 Security & Permissions

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Authenticated Users:**
- Can view all submissions
- Can update submission status
- Can view all jobs (public only see open jobs)
- Can create jobs (assigned to themselves)
- Can update their own jobs
- Can log activity

**Service Role:**
- Full access to all tables
- Used by server for backend operations

**Public (Unauthenticated):**
- Can view only `open` and `public` jobs
- Can submit forms (creates records)
- Cannot access dashboard

### Password Requirements
- Minimum 6 characters
- Email confirmation (auto-confirmed in dev)
- Magic link sign-in available
- Password reset via email

### Session Management
- Sessions persist across page refreshes
- Auto-redirect to login if not authenticated
- Sign out clears session
- Auth state listener tracks changes

---

## 🔄 Workflows

### New Discovery Lead Workflow
1. User submits discovery form on website
2. Record created in `discovery_submissions` with status='new'
3. Email sent to admin and submitter
4. Team member reviews in dashboard
5. Updates status to 'contacted'
6. Qualifies lead → 'qualified'
7. Closes deal → 'converted'

### Brand Audit Workflow
1. User requests brand audit on website
2. AI generates audit using OpenAI Agents SDK
3. Record created with status='completed'
4. Results stored in `audit_result` JSON field
5. Email sent with results
6. Team updates status to 'sent'
7. Follow-up and convert to client

### Job Posting Workflow
1. Team member creates job in dashboard
2. Sets department, location, requirements
3. Marks as featured (optional)
4. Status set to 'open'
5. Job appears on `/jobs` public page
6. Tracks views in `job_views` table
7. When filled, update status to 'closed'

---

## 📊 Analytics & Reporting

### Available Metrics
- Total job views
- Jobs by status (open/closed)
- Discovery submissions by status
- Conversion rates (new → converted)
- Brand audit completion rate
- Response times (future enhancement)

### Future Enhancements
- Google Sheets sync via Zapier/Make
- Slack notifications on new submissions
- Email sequences for follow-ups
- Advanced reporting dashboards
- Export to CSV
- Calendar integrations
- CRM integrations

---

## 🚨 Troubleshooting

### Can't Log In
1. Verify email is confirmed in Supabase Auth
2. Check password meets requirements
3. Try "Forgot Password" flow
4. Verify RLS policies are created

### Tables Not Showing Data
1. Check RLS policies exist
2. Verify user is authenticated
3. Run migrations in correct order
4. Check Supabase logs for errors

### Submissions Not Appearing
1. Verify table exists
2. Check server endpoint is working
3. Verify RLS allows authenticated reads
4. Check browser console for errors

### Permission Denied Errors
1. Verify user has authenticated session
2. Check RLS policies match user role
3. Ensure service role key is set on server
4. Review Supabase logs

---

## 🎯 Best Practices

1. **Always log out** when finished
2. **Update statuses** regularly to keep pipeline current
3. **Assign leads** to team members for accountability
4. **Set priorities** to focus on high-value opportunities
5. **Add notes** for context and handoffs
6. **Archive** old submissions to keep dashboard clean
7. **Review analytics** weekly to track performance

---

## 📞 Support

For issues or questions:
- Check Supabase logs: Dashboard → Logs
- Review browser console for errors
- Check network tab for failed requests
- Verify environment variables are set

---

## ✅ Checklist for Deployment

- [ ] Run all SQL migrations
- [ ] Create admin user
- [ ] Test authentication flow
- [ ] Verify all tables exist
- [ ] Check RLS policies
- [ ] Test each dashboard tab
- [ ] Verify public pages still work
- [ ] Test form submissions
- [ ] Configure email notifications
- [ ] Set up team accounts
- [ ] Document custom workflows
- [ ] Train team on dashboard use

---

**Last Updated:** November 7, 2025
**Version:** 2.0.0
**Status:** ✅ Production Ready
