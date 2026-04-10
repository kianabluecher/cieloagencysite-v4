# Jobs System - Quick Reference Card

## 🚀 Quick Start (3 Steps)

### 1. Create Database Table
```bash
# In Supabase SQL Editor:
# Copy and run: /sql_migrations/create_job_roles_table.sql
```

### 2. View Public Page
```bash
# Navigate to: Footer → Company → Jobs [WE'RE HIRING]
# Or go directly to: /jobs
```

### 3. Manage Jobs
```bash
# Login: /team-login
# Email: agency@cielo.marketing
# Password: cielo2024!
# Then go to: /jobs-admin
```

---

## 📍 Access Points

| Location | URL | Notes |
|----------|-----|-------|
| Footer (Public) | `/jobs` | Under COMPANY section |
| Admin Panel | `/jobs-admin` | Requires login |
| Login | `/team-login` | Use agency credentials |

---

## 🗄️ Database

**Table:** `job_roles`

**Key Fields:**
- `title` - Job title (required)
- `department` - e.g., Design, Engineering
- `location` - e.g., Remote, San Francisco
- `type` - Full-time, Part-time, Contract, etc.
- `status` - 'open' or 'closed'
- `featured` - boolean (shows in featured section)
- `requirements` - text[] array
- `url` - External application link

**RLS:** ✅ Enabled (public can only view open jobs)

---

## 🔌 API Endpoints

### Public
```bash
GET  /make-server-27c238f7/jobs           # All open jobs
GET  /make-server-27c238f7/jobs/:id       # Single job
```

### Protected (Need X-Team-Token)
```bash
GET    /make-server-27c238f7/jobs/admin/all  # All jobs (inc. closed)
POST   /make-server-27c238f7/jobs            # Create job
PUT    /make-server-27c238f7/jobs/:id        # Update job
DELETE /make-server-27c238f7/jobs/:id        # Close job (soft delete)
```

---

## 🎨 Frontend Components

```
/components/pages/Jobs.tsx         → Public page
/components/pages/JobsAdmin.tsx    → Admin panel
/components/Footer.tsx             → Jobs link in footer
```

---

## 📝 Sample Job Creation

**Via Admin UI:**
1. Login → `/jobs-admin`
2. Click "Add Job"
3. Fill form:
   - Title: "Senior Brand Strategist"
   - Department: "Brand & Strategy"
   - Location: "Remote"
   - Type: "Full-time"
   - Description: "..."
   - Requirements: Add one by one
   - Featured: ✓ (if featured)
   - URL: (optional)
4. Submit

**Via API:**
```bash
POST /make-server-27c238f7/jobs
Headers:
  Authorization: Bearer {publicAnonKey}
  X-Team-Token: {token}
  Content-Type: application/json

Body:
{
  "title": "Senior Brand Strategist",
  "department": "Brand & Strategy",
  "location": "Remote",
  "type": "Full-time",
  "description": "Lead brand strategy...",
  "requirements": ["5+ years experience", "Portfolio required"],
  "featured": true,
  "url": "https://apply.workable.com/cielo/j/123"
}
```

---

## ✅ Testing Checklist

**Setup:**
- [ ] Table created
- [ ] Sample data inserted
- [ ] RLS enabled

**Public Page:**
- [ ] Navigate from footer
- [ ] Jobs display
- [ ] Featured section works
- [ ] CTA functions

**Admin:**
- [ ] Login successful
- [ ] Can view all jobs
- [ ] Can create job
- [ ] Can edit job
- [ ] Can close job

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| No jobs showing | Check table exists, verify status = 'open' |
| Can't login to admin | Use `agency@cielo.marketing` / `cielo2024!` |
| API errors | Check Supabase Edge Functions running |
| Can't create jobs | Verify team token valid, check required fields |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/sql_migrations/create_job_roles_table.sql` | Database setup |
| `/JOBS_SETUP_GUIDE.md` | Full setup guide |
| `/JOBS_SYSTEM_README.md` | Complete docs |
| `/components/pages/Jobs.tsx` | Public page |
| `/components/pages/JobsAdmin.tsx` | Admin panel |

---

## 💡 Pro Tips

- **Featured Jobs:** Set `featured = true` to show in featured section
- **Soft Delete:** Jobs are never deleted, just set to `status = 'closed'`
- **Requirements:** Add requirements one at a time in admin UI
- **External URLs:** Add application URLs to redirect applicants
- **RLS:** Only open jobs visible publicly, admin sees all

---

## 📞 Support

**Documentation:**
- Full Guide: `/JOBS_SETUP_GUIDE.md`
- README: `/JOBS_SYSTEM_README.md`
- SQL Migration: `/sql_migrations/create_job_roles_table.sql`

**Credentials:**
- Email: `agency@cielo.marketing`
- Password: `cielo2024!`

---

**Version:** 2.0  
**Last Updated:** November 7, 2025  
**Status:** Production Ready ✅
