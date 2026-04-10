# 🔐 Team Dashboard - Complete Setup Guide

## Supabase Auth-Based Job Management System

**Last Updated**: November 7, 2025

---

## 📋 Overview

The Team Dashboard is a secure, authentication-based system for managing job postings using Supabase Auth. It replaces the simple token-based system with proper user authentication, permissions, and security.

### Key Features

✅ **Supabase Authentication** - Email/password, magic links, password reset
✅ **User Profiles** - Automatic profile creation with roles (admin/team)
✅ **Row Level Security** - Database-level access control
✅ **Job Management** - Create, edit, delete job postings
✅ **Analytics Dashboard** - View counts and job statistics
✅ **Real-time Updates** - Changes reflect immediately
✅ **Secure** - RLS policies protect data

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Run Database Migration (2 minutes)

```sql
-- In Supabase SQL Editor, run:
/sql_migrations/update_job_roles_with_auth.sql
```

This creates:
- ✅ Updates `job_roles` table with auth fields
- ✅ Creates `user_profiles` table
- ✅ Sets up RLS policies
- ✅ Creates triggers for auto-profile creation

### Step 2: Create First User (1 minute)

**Option A: Via Supabase Dashboard**
1. Go to Authentication → Users
2. Click "Add User"
3. Enter email and password
4. User profile auto-created!

**Option B: Via App Signup**
1. Navigate to `/team-login`
2. Click "Sign up"
3. Fill in details
4. Check email for confirmation
5. Confirm and sign in

### Step 3: Access Dashboard (30 seconds)

1. Go to `/team-login`
2. Enter credentials
3. Sign in → Redirects to `/team-dashboard`
4. Start managing jobs!

✅ Done!

---

## 📊 Database Schema

### job_roles Table (Updated)

```sql
job_roles (
  id                uuid PRIMARY KEY,
  title             text NOT NULL,
  department        text NOT NULL,
  description       text,
  requirements      text[],
  location          text NOT NULL,
  type              text DEFAULT 'Full-time',
  status            text DEFAULT 'open',
  featured          boolean DEFAULT false,
  url               text,
  posted_date       date DEFAULT now(),
  updated_at        timestamptz DEFAULT now(),
  created_by        uuid REFERENCES auth.users(id), -- NEW
  visibility        text DEFAULT 'public'           -- NEW
)
```

### user_profiles Table (NEW)

```sql
user_profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id),
  email       text,
  full_name   text,
  role        text DEFAULT 'team', -- 'admin' or 'team'
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
)
```

---

## 🔐 Authentication System

### Sign Up

```typescript
// App automatically handles signup
// User fills form at /team-login → "Sign up"
// Email confirmation sent
// Profile auto-created on first sign-in
```

### Sign In

```typescript
// Email + Password
await auth.signIn(email, password);

// Magic Link (passwordless)
await auth.signInWithMagicLink(email);
// User clicks link in email → signed in
```

### Password Reset

```typescript
// User clicks "Forgot password?"
await auth.resetPassword(email);
// Email sent with reset link
// User sets new password
```

### Sign Out

```typescript
await auth.signOut();
// Session cleared
// Redirects to login
```

---

## 🛡️ Row Level Security (RLS)

### Public Access

```sql
-- Anyone can view open jobs
CREATE POLICY "public_view_open_jobs"
  ON job_roles FOR SELECT
  USING (status = 'open' AND visibility = 'public');
```

### Authenticated Users

```sql
-- Can view all jobs (for dashboard)
CREATE POLICY "authenticated_view_all_jobs"
  ON job_roles FOR SELECT TO authenticated
  USING (true);

-- Can insert jobs (sets created_by automatically)
CREATE POLICY "authenticated_insert_jobs"
  ON job_roles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Can update/delete own jobs
CREATE POLICY "authenticated_update_own_jobs"
  ON job_roles FOR UPDATE TO authenticated
  USING (auth.uid() = created_by);
```

### Service Role

```sql
-- Full access for server operations
CREATE POLICY "service_role_full_access"
  ON job_roles FOR ALL TO service_role
  USING (true);
```

---

## 💼 Team Dashboard Features

### Dashboard Overview

- **Total Jobs** - Count of all job postings
- **Open Positions** - Currently hiring
- **Total Views** - Sum of all job views
- **Jobs Table** - View, edit, delete jobs
- **Search & Filter** - Find jobs quickly

### Create Job

1. Click "Create New Job"
2. Fill in details:
   - Title, Department, Location *
   - Type (Full-time, Contract, etc.)
   - Description
   - Requirements (add multiple)
   - Application URL
   - Featured toggle
   - Visibility (public/unlisted)
3. Click "Create Job"
4. Job appears in table immediately

### Edit Job

1. Click Edit icon on job row
2. Modify any fields
3. Click "Update Job"
4. Changes saved instantly

### Delete Job

1. Click Delete icon
2. Confirm deletion
3. Job removed permanently

### Analytics

- View count per job
- Total views across all jobs
- Job status (open/closed)
- Featured status

---

## 🎯 User Roles

### Team Role (Default)

- ✅ Create job postings
- ✅ Edit own jobs
- ✅ Delete own jobs
- ✅ View analytics
- ❌ Cannot edit others' jobs

### Admin Role

Currently same permissions as team. Can be expanded to:
- ✅ Edit any job
- ✅ Delete any job
- ✅ Manage users
- ✅ Advanced analytics

**To set admin role**:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'admin@cielo.agency';
```

---

## 🔄 Migration from Old System

### Old System (Token-Based)

```typescript
// TeamLogin with hardcoded password
// Jobs stored with no user tracking
// No authentication database
```

### New System (Supabase Auth)

```typescript
// Proper user accounts
// Jobs linked to creators
// Full audit trail
// Secure RLS policies
```

### Migration Steps

1. ✅ Run SQL migration (updates schema)
2. ✅ Create user accounts for team
3. ✅ Existing jobs keep working (created_by = null is ok)
4. ✅ New jobs track creator automatically
5. ✅ Old token system can be removed

**Note**: Existing jobs without `created_by` can still be viewed by all authenticated users. To assign ownership:

```sql
UPDATE job_roles 
SET created_by = (SELECT id FROM auth.users WHERE email = 'admin@cielo.agency')
WHERE created_by IS NULL;
```

---

## 📱 Frontend Components

### TeamLogin (`/components/pages/TeamLogin.tsx`)

**Features**:
- Email/password sign in
- Magic link sign in
- Sign up form
- Password reset
- Form validation
- Error handling

**Routes**:
- `/team-login` - Main login page

### TeamDashboard (`/components/pages/TeamDashboard.tsx`)

**Features**:
- Job list table
- Create/edit forms
- Search and filters
- Analytics stats
- Real-time updates
- User profile display

**Routes**:
- `/team-dashboard` - Main dashboard (auth required)

---

## 🔌 API Integration

### Supabase Client (`/utils/supabase/client.ts`)

Provides easy-to-use auth and database functions:

```typescript
import { auth, supabase } from './utils/supabase/client';

// Authentication
await auth.signIn(email, password);
await auth.signUp(email, password, fullName);
await auth.signInWithMagicLink(email);
await auth.signOut();

// Database
const { data, error } = await supabase
  .from('job_roles')
  .select('*')
  .eq('status', 'open');
```

### Direct Supabase Queries

The dashboard uses Supabase client directly:

```typescript
// Create job
const { data, error } = await supabase
  .from('job_roles')
  .insert([{ ...jobData, created_by: user.id }])
  .select()
  .single();

// Update job
await supabase
  .from('job_roles')
  .update(updates)
  .eq('id', jobId);

// Delete job
await supabase
  .from('job_roles')
  .delete()
  .eq('id', jobId);
```

---

## 🎨 UI/UX Features

### Modern Design
- Dark theme (neutral-950 background)
- Clean, minimal interface
- Smooth transitions
- Responsive tables
- Toast notifications

### User Experience
- Loading states for all actions
- Success/error feedback
- Confirm before delete
- Auto-save indicators
- Search with instant results

### Accessibility
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML

---

## 🔧 Configuration

### Email Templates

Customize in Supabase Dashboard → Authentication → Email Templates:

- **Confirm signup** - Welcome email
- **Magic link** - Passwordless sign in
- **Reset password** - Password reset link
- **Change email** - Email change confirmation

### Email Provider

Set up in Supabase Dashboard → Project Settings → Auth:

- Default: Supabase built-in (limited to 3 emails/hour)
- Recommended: Custom SMTP (SendGrid, Resend, etc.)

### Session Duration

Configure in Supabase Dashboard:
```
JWT expiry: 3600 (1 hour)
Refresh token expiry: 2592000 (30 days)
```

---

## 🐛 Troubleshooting

### Can't Sign In

**Issue**: "Invalid credentials" error

**Solutions**:
1. Check email is confirmed (Auth → Users → Email confirmed)
2. Verify password is correct (min 6 characters)
3. Check Supabase project is running
4. Try password reset

### Jobs Not Loading

**Issue**: Dashboard shows empty

**Solutions**:
1. Check RLS policies are created
2. Verify user is authenticated
3. Check browser console for errors
4. Try refreshing page

### Can't Create Jobs

**Issue**: "Failed to create job" error

**Solutions**:
1. Verify all required fields filled
2. Check `created_by` is set to user ID
3. Ensure RLS policy allows insert
4. Check Supabase logs for errors

### Email Not Sending

**Issue**: No confirmation/reset emails

**Solutions**:
1. Check spam folder
2. Verify email template is enabled
3. Set up custom SMTP provider
4. Check Supabase email logs

### Session Expired

**Issue**: Logged out unexpectedly

**Solutions**:
1. Refresh token should auto-refresh
2. Check JWT expiry settings
3. Sign in again
4. Check browser console for auth errors

---

## 📈 Best Practices

### Security

✅ **Never share credentials** - Each team member has own account
✅ **Use strong passwords** - Min 12 characters, mix of types
✅ **Enable 2FA** (future) - Extra layer of security
✅ **Regular audits** - Review user access periodically
✅ **RLS policies** - Always enabled, never bypass

### Job Management

✅ **Mark as featured** - Highlight important roles (max 3-4)
✅ **Set visibility** - Use "unlisted" for draft/internal jobs
✅ **Update regularly** - Keep job details current
✅ **Close old jobs** - Set status to "closed" instead of deleting
✅ **Track ownership** - Know who created each job

### Performance

✅ **Use search** - Filter large job lists
✅ **Archive closed jobs** - Keep database clean
✅ **Monitor analytics** - Track which jobs get views
✅ **Optimize images** - If job descriptions have images
✅ **Regular backups** - Export data periodically

---

## 📊 Analytics & Reporting

### Available Metrics

```sql
-- Most viewed jobs
SELECT title, department, view_count 
FROM job_roles 
JOIN (
  SELECT job_id, COUNT(*) as view_count 
  FROM job_views 
  GROUP BY job_id
) v ON job_roles.id = v.job_id
ORDER BY view_count DESC;

-- Jobs by department
SELECT department, COUNT(*) as count, 
       SUM(CASE WHEN status='open' THEN 1 ELSE 0 END) as open_count
FROM job_roles 
GROUP BY department;

-- Jobs by creator
SELECT up.full_name, COUNT(*) as jobs_created
FROM job_roles jr
JOIN user_profiles up ON jr.created_by = up.id
GROUP BY up.full_name;

-- Recent activity
SELECT title, status, updated_at
FROM job_roles 
ORDER BY updated_at DESC 
LIMIT 10;
```

### Export Data

```sql
-- Export all jobs as JSON
SELECT json_agg(job_roles) FROM job_roles;

-- Export to CSV (via Supabase Dashboard)
-- Table Editor → job_roles → Export → CSV
```

---

## 🔄 Future Enhancements

### Planned Features

- [ ] Applicant tracking system
- [ ] Email notifications for new applicants
- [ ] Bulk job operations
- [ ] Job templates
- [ ] Advanced analytics dashboard
- [ ] Team collaboration (assign reviewers)
- [ ] Interview scheduling
- [ ] Candidate pipeline
- [ ] Custom job forms
- [ ] API webhooks for job changes

### Possible Integrations

- [ ] LinkedIn job posting sync
- [ ] Indeed integration
- [ ] Slack notifications
- [ ] Calendar integration (interviews)
- [ ] Email campaigns to applicants
- [ ] ATS (Greenhouse, Lever, etc.)

---

## ✅ Testing Checklist

Before going live:

### Authentication
- [ ] Can sign up new user
- [ ] Email confirmation works
- [ ] Can sign in with email/password
- [ ] Magic link sign in works
- [ ] Password reset works
- [ ] Can sign out successfully
- [ ] Session persists after refresh
- [ ] Session expires after timeout

### Dashboard
- [ ] Dashboard loads after login
- [ ] Shows correct user info
- [ ] Displays job count stats
- [ ] Shows analytics data
- [ ] Search works
- [ ] Filters work

### Job Management
- [ ] Can create new job
- [ ] All fields save correctly
- [ ] Can edit existing job
- [ ] Can delete job (with confirmation)
- [ ] Featured toggle works
- [ ] Visibility options work
- [ ] Requirements array saves

### Security
- [ ] Can't access dashboard without login
- [ ] Can't edit others' jobs (if not admin)
- [ ] RLS policies enforce permissions
- [ ] Public can't see closed jobs
- [ ] Public can view open jobs

### UI/UX
- [ ] Loading states show
- [ ] Success messages display
- [ ] Error messages helpful
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Smooth transitions

---

## 📞 Support

### Common Questions

**Q: How do I add team members?**
A: Two ways:
1. Send them signup link: `/team-login` → "Sign up"
2. Create via Supabase Dashboard → Auth → Add User

**Q: Can I have multiple admins?**
A: Yes! Update role in database:
```sql
UPDATE user_profiles SET role = 'admin' WHERE email = 'user@email.com';
```

**Q: How do I delete a user?**
A: Supabase Dashboard → Auth → Users → Delete
(Profile and jobs remain but can be reassigned)

**Q: Can I customize email templates?**
A: Yes! Supabase Dashboard → Auth → Email Templates

**Q: How do I backup data?**
A: Export tables from Supabase Dashboard or use pg_dump

### Getting Help

1. **Check logs**: Supabase Dashboard → Logs
2. **Browser console**: Check for errors
3. **Network tab**: Verify API calls
4. **Supabase status**: status.supabase.com
5. **Documentation**: Full guides in `/`

---

## 🎉 Summary

You now have a complete, production-ready team dashboard with:

✅ **Secure authentication** - Supabase Auth with email/password & magic links
✅ **User management** - Profiles, roles, permissions
✅ **Job management** - Full CRUD with ownership tracking
✅ **Analytics** - View tracking and statistics
✅ **Row-level security** - Database-level access control
✅ **Modern UI** - Clean, responsive dashboard
✅ **Real-time updates** - Changes reflect immediately

**Next Steps**:
1. Run the SQL migration
2. Create your admin account
3. Start posting jobs!

---

*Team Dashboard Setup Guide for CIELO Agency*
*Version 2.0 - Auth-Based System*
*Last updated: November 7, 2025*
