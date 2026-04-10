# 🚀 Careers System - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Database Setup (2 minutes)

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `/sql_migrations/create_job_roles_table.sql`
3. Click "Run"
4. ✅ Done! Tables, indexes, and sample data created

### Step 2: View Jobs Page (1 minute)

1. Navigate to `/jobs` in your app
2. ✅ See featured jobs with search/filters
3. Click any job to view details

### Step 3: Admin Panel (2 minutes)

1. Go to `/team-login` and enter team password
2. Navigate to `/jobs-admin`
3. Create, edit, or delete jobs
4. ✅ Changes appear instantly on public page

---

## 🎯 Quick Reference

### Public Pages
- `/jobs` - Browse all open positions with search
- `/job-{id}` - View job details and apply

### Admin Pages
- `/jobs-admin` - Manage all job postings
- Login required (use `/team-login`)

### API Endpoints
```bash
# Get all jobs
GET /jobs

# Search jobs
GET /jobs/search?department=Design&type=Full-time

# Admin: Create job (requires X-Team-Token)
POST /jobs

# Analytics (requires X-Team-Token)
GET /jobs/analytics
```

---

## 🔧 Common Tasks

### Add a New Job
1. Go to `/jobs-admin`
2. Click "Create New Job"
3. Fill in details
4. Toggle "Featured" if needed
5. Click "Create Job"

### Update a Job
1. Go to `/jobs-admin`
2. Click "Edit" on job row
3. Modify fields
4. Click "Update Job"

### Close a Job
1. Go to `/jobs-admin`
2. Click "Delete" on job row
3. Job status → "closed" (soft delete)
4. Disappears from public page

### View Analytics
```typescript
// In admin code
const analytics = await fetchJobAnalytics(teamToken);
console.log(analytics.jobs); // Jobs with view counts
```

### Setup Slack Notifications
1. Create Slack webhook: https://api.slack.com/messaging/webhooks
2. Add to Supabase env: `SLACK_WEBHOOK_URL`
3. Call webhook processor:
```bash
POST /jobs/webhooks/process
X-Team-Token: {your-team-token}
```

---

## 📊 Database Quick Queries

```sql
-- View all open jobs
SELECT * FROM job_roles WHERE status = 'open';

-- View analytics (jobs with view counts)
SELECT 
  jr.title, 
  jr.department, 
  COUNT(jv.id) as views 
FROM job_roles jr
LEFT JOIN job_views jv ON jr.id = jv.job_id
GROUP BY jr.id, jr.title, jr.department
ORDER BY views DESC;

-- View pending webhooks
SELECT * FROM job_webhooks WHERE status = 'pending';

-- Get total views per department
SELECT 
  jr.department,
  COUNT(jv.id) as total_views
FROM job_roles jr
LEFT JOIN job_views jv ON jr.id = jv.job_id
GROUP BY jr.department;
```

---

## 🎨 Customization Examples

### Change Glow Color
```tsx
// /components/pages/Jobs.tsx - Line ~186
// Current: Orange/Brown
background: 'radial-gradient(circle at top right, rgba(139, 92, 46, 0.6) 0%, rgba(92, 64, 35, 0.3) 30%, transparent 70%)'

// Purple
background: 'radial-gradient(circle at top right, rgba(147, 51, 234, 0.6) 0%, rgba(126, 34, 206, 0.3) 30%, transparent 70%)'

// Blue
background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.3) 30%, transparent 70%)'

// Green
background: 'radial-gradient(circle at top right, rgba(34, 197, 94, 0.6) 0%, rgba(21, 128, 61, 0.3) 30%, transparent 70%)'
```

### Add Salary Field
```sql
-- 1. Database
ALTER TABLE job_roles ADD COLUMN salary_range text;

-- 2. Update Job interface in /utils/careers-api.ts
export interface Job {
  // ... existing fields
  salary_range?: string;
}

-- 3. Add input in JobsAdmin.tsx
<input
  type="text"
  placeholder="e.g., $80k-$120k"
  value={formData.salary_range}
  onChange={(e) => setFormData({...formData, salary_range: e.target.value})}
/>

-- 4. Display in JobDetail.tsx
{job.salary_range && <p>{job.salary_range}</p>}
```

### Change Application Email
```tsx
// /components/pages/JobDetail.tsx - Line ~387
// Current
onClick={() => window.open('mailto:careers@cieloagency.com?subject=Application: ' + job.title, '_blank')}

// Change to
onClick={() => window.open('mailto:hiring@yourcompany.com?subject=Application: ' + job.title, '_blank')}
```

---

## 🐛 Troubleshooting

### Jobs Not Loading?
```typescript
// Check browser console
// Expected: Fetch request to /jobs endpoint
// If fails: App falls back to sample data (this is normal!)
```

### Can't Create Jobs?
```typescript
// 1. Check you're logged in (/team-login)
// 2. Verify X-Team-Token header is being sent
// 3. Check Supabase service role key is set
```

### Analytics Not Tracking?
```typescript
// Views track automatically when job detail page loads
// Check job_views table in Supabase:
SELECT COUNT(*) FROM job_views;
```

### Webhooks Not Sending?
```bash
# 1. Check SLACK_WEBHOOK_URL is set in Supabase env
# 2. Manually process webhooks
POST /jobs/webhooks/process

# 3. Check webhook status
SELECT * FROM job_webhooks WHERE status = 'failed';
```

---

## 📈 Usage Examples

### Using the API Utility

```typescript
import { 
  fetchJobs, 
  searchJobs, 
  createJob,
  updateJob,
  deleteJob,
  fetchJobAnalytics 
} from './utils/careers-api';

// Fetch all open jobs
const jobs = await fetchJobs();

// Search with multiple filters
const designers = await searchJobs({
  department: 'Design',
  location: 'Remote',
  type: 'Full-time',
  query: 'senior'
});

// Create a new job (admin only)
const newJob = await createJob({
  title: 'Senior Product Designer',
  department: 'Design',
  location: 'Remote',
  type: 'Full-time',
  description: 'Design amazing products...',
  requirements: ['5+ years experience', 'Figma expert'],
  featured: true
}, teamToken);

// Get analytics
const stats = await fetchJobAnalytics(teamToken);
console.log(`Total views: ${stats.totalViews}`);
console.log(`Most viewed: ${stats.jobs[0].title} (${stats.jobs[0].views} views)`);
```

---

## ✅ Checklist

After setup, verify:

- [ ] Tables exist in Supabase (job_roles, job_views, job_webhooks)
- [ ] `/jobs` page loads with sample jobs
- [ ] Can search and filter jobs
- [ ] Job detail pages load correctly
- [ ] Can login to `/jobs-admin`
- [ ] Can create new job in admin panel
- [ ] New job appears on `/jobs` page
- [ ] Job views increment in analytics
- [ ] Webhooks create in job_webhooks table
- [ ] (Optional) Slack notifications work

---

## 🎯 What's Included

### Frontend
- ✅ Public jobs listing page with search/filters
- ✅ Job detail pages with automatic view tracking
- ✅ Admin panel for job management
- ✅ Responsive, modern UI with ambient glow effects
- ✅ Loading states and error handling

### Backend
- ✅ Complete REST API with all CRUD operations
- ✅ Search endpoint with multiple filters
- ✅ Analytics tracking system
- ✅ Webhook automation system
- ✅ RLS security policies

### Database
- ✅ job_roles table (main jobs)
- ✅ job_views table (analytics)
- ✅ job_webhooks table (notifications)
- ✅ Optimized indexes
- ✅ Automatic triggers

### Utilities
- ✅ Clean API wrapper (`careers-api.ts`)
- ✅ TypeScript types
- ✅ Error handling
- ✅ Loading states

---

## 📚 Further Reading

- **Full Documentation**: `/CAREERS_SYSTEM_COMPLETE.md`
- **Setup Guide**: `/JOBS_SETUP_GUIDE.md`
- **Database Migration**: `/sql_migrations/create_job_roles_table.sql`

---

## 🎉 You're All Set!

Your careers system is ready to:
- Post and manage job openings
- Track candidate interest with analytics
- Automate notifications via webhooks
- Provide a beautiful candidate experience

**Next**: Add your first real job posting at `/jobs-admin`! 🚀
