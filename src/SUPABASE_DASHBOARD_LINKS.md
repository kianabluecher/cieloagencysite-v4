# 🔗 CIELO Agency - Supabase Dashboard Links

## 📍 Project Information

**Project ID**: `bagdhpqzwxelbgbvubfr`  
**Project URL**: `https://bagdhpqzwxelbgbvubfr.supabase.co`

---

## 🏠 Main Dashboard

**Project Home**  
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr

---

## 💾 Database

### View All Tables
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/database/tables

### KV Store Table (Main Data Storage)
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor

**Table Name**: `kv_store_27c238f7`

**What's Stored Here**:
- Portfolio projects (`portfolio:project:*`)
- Brand audit submissions (`brand-audit:*`)
- Discovery form submissions (`discovery:submission:*`)
- General inquiries (`inquiry:submission:*`)

### Run SQL Queries
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/sql/new

**Useful Queries**:

```sql
-- View all keys in KV store
SELECT key, value FROM kv_store_27c238f7 ORDER BY key;

-- Count total entries
SELECT COUNT(*) FROM kv_store_27c238f7;

-- View all portfolio projects
SELECT * FROM kv_store_27c238f7 WHERE key LIKE 'portfolio:project:%';

-- View all brand audits
SELECT * FROM kv_store_27c238f7 WHERE key LIKE 'brand-audit:%';

-- View all discovery submissions
SELECT * FROM kv_store_27c238f7 WHERE key LIKE 'discovery:submission:%';

-- View most recent entries
SELECT key, value->'submittedAt' as submitted_at 
FROM kv_store_27c238f7 
WHERE key LIKE 'brand-audit:%' 
ORDER BY value->'submittedAt' DESC 
LIMIT 10;
```

---

## 🗂️ Storage (Portfolio Images)

### Storage Overview
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/storage/buckets

### Portfolio Bucket
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/storage/buckets/make-27c238f7-portfolio

**Bucket Name**: `make-27c238f7-portfolio`  
**Access**: Public  
**Purpose**: Portfolio project images and media

### Upload Files
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/storage/buckets/make-27c238f7-portfolio/upload

---

## ⚡ Edge Functions (Backend Server)

### Functions Overview
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions

### Server Function
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7

**Function Name**: `make-server-27c238f7`  
**Path**: `/supabase/functions/server/index.tsx`

### View Server Logs (IMPORTANT for debugging)
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs

**What to Look For**:
- ✅ `Using OpenAI Agents SDK for brand positioning audit`
- ✅ `Brand positioning audit generated successfully`
- ✅ `Audit email sent successfully`
- ⚠️ Error messages and stack traces
- 📊 Request/response logs

### Function Metrics
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/metrics

**Monitor**:
- Invocation count
- Response times
- Error rates
- Resource usage

---

## 🔐 Authentication

### Auth Overview
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/auth/users

**Note**: Currently using token-based auth for team dashboard, not Supabase Auth users.

### Auth Settings
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/auth/settings

---

## 🔑 API Keys & Settings

### API Settings
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/settings/api

**Your API Keys** (already configured):
- `anon` / `public` key - For frontend
- `service_role` key - For backend (KEEP SECRET!)

### Project Configuration
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/settings/general

### Environment Variables
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/settings/environment-variables

**Currently Set**:
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `SUPABASE_DB_URL`
- ✅ `RESEND_API_KEY`
- ✅ `OPENAI_API_KEY`

---

## 📊 Monitoring & Analytics

### Database Usage
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/reports/database

### API Usage
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/reports/api

### Storage Usage
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/reports/storage

### Overall Usage Report
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/reports

---

## 🔍 Quick Access Shortcuts

### View Brand Audit Submissions
1. Go to: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor
2. Select table: `kv_store_27c238f7`
3. Filter by key: `brand-audit:%`

### View Portfolio Projects
1. Go to: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor
2. Select table: `kv_store_27c238f7`
3. Filter by key: `portfolio:project:%`

### Check Server Logs for Errors
1. Go to: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs
2. Set time range: Last 24 hours
3. Look for red error messages

### Upload Portfolio Images
1. Go to: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/storage/buckets/make-27c238f7-portfolio
2. Click "Upload file"
3. Select images
4. Copy public URL for use in portfolio

---

## 🛠️ Management Tasks

### 1. View Latest Brand Audits
**SQL Query**:
```sql
SELECT 
  key,
  value->>'companyName' as company,
  value->>'email' as email,
  value->>'focusArea' as focus,
  value->>'submittedAt' as submitted
FROM kv_store_27c238f7 
WHERE key LIKE 'brand-audit:%'
ORDER BY value->>'submittedAt' DESC
LIMIT 20;
```

Run at: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/sql/new

### 2. Check Total Submissions
**SQL Query**:
```sql
SELECT 
  CASE 
    WHEN key LIKE 'brand-audit:%' THEN 'Brand Audits'
    WHEN key LIKE 'portfolio:project:%' THEN 'Portfolio Projects'
    WHEN key LIKE 'discovery:submission:%' THEN 'Discovery Forms'
    ELSE 'Other'
  END as type,
  COUNT(*) as count
FROM kv_store_27c238f7
GROUP BY type
ORDER BY count DESC;
```

### 3. Export All Data
1. Go to: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor
2. Select `kv_store_27c238f7` table
3. Click "Export" button
4. Choose format (CSV or JSON)

### 4. Backup Database
https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/settings/backups

---

## 📧 Email Testing (Resend)

While Resend logs are in their own dashboard, you can verify email sending in Supabase logs:

**Check Logs For**:
```
"Audit email sent successfully to [email]"
```

At: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs

---

## 🐛 Debugging Guide

### If Brand Audits Aren't Working

1. **Check Server Logs**  
   https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs
   - Look for error messages
   - Verify OpenAI API calls

2. **Verify Environment Variables**  
   https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/settings/environment-variables
   - Ensure `OPENAI_API_KEY` is set
   - Check `RESEND_API_KEY` for emails

3. **Check Database**  
   https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor
   - Verify submissions are being stored
   - Look at `kv_store_27c238f7` table

4. **Test Health Endpoint**  
   Open browser console:
   ```javascript
   fetch('https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/health')
     .then(r => r.json())
     .then(console.log);
   ```

### If Portfolio Isn't Loading

1. **Check KV Store**  
   https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor
   - Look for keys starting with `portfolio:project:`

2. **Check Storage Bucket**  
   https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/storage/buckets/make-27c238f7-portfolio
   - Verify images are uploaded
   - Check bucket is public

3. **Check Function Logs**  
   https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs
   - Look for portfolio endpoint errors

---

## 📱 Mobile Access

All these links work on mobile devices! Bookmark these for quick access:

**Most Important Links**:
1. 📊 **Server Logs**: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs
2. 💾 **Database**: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/editor
3. 🏠 **Dashboard**: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr

---

## 🔔 Notifications

Set up email notifications for errors:

1. Go to: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/settings/notifications
2. Enable "Function errors"
3. Add your email
4. Get notified of backend issues

---

## 📋 Quick Reference Card

```
PROJECT ID:      bagdhpqzwxelbgbvubfr
DATABASE TABLE:  kv_store_27c238f7
STORAGE BUCKET:  make-27c238f7-portfolio
FUNCTION NAME:   make-server-27c238f7
BASE URL:        https://bagdhpqzwxelbgbvubfr.supabase.co

KEY PREFIXES:
- portfolio:project:*
- brand-audit:*
- discovery:submission:*
- inquiry:submission:*
```

---

## 🎯 Next Steps

1. **Bookmark this page** for easy access
2. **Check Server Logs** regularly: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions/make-server-27c238f7/logs
3. **Monitor Database Growth**: https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/reports/database
4. **Test a Brand Audit** and watch the logs in real-time

---

**All links are ready to use! Just click and explore your Supabase dashboard.** 🚀
