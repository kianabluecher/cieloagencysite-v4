# How to View Submissions in Admin Dashboard

## Issue: "Can't see submissions in admin dashboard"

This happens because **only users with admin privileges can view submissions**. Here's how to fix it:

---

## Solution 1: Sign in with the Owner Account (Recommended)

The **owner account** automatically has full admin access.

1. Go to `/team-login`
2. Sign in with the email/password you set in these environment variables:
   - `OWNER_EMAIL`
   - `OWNER_PASSWORD`

The owner account is automatically created when the server starts and has full admin privileges.

---

## Solution 2: Promote Your Current User to Admin

If you're signed in with a Google account or other non-owner account, you need to be promoted to admin:

### Step 1: Check Your Current Role

Open the browser console and look for this log when you navigate to "Submissions Management":

```
👤 Current user: {
  email: "your-email@gmail.com",
  role: "team",  // ← This should be "admin" to see submissions
  isOwner: false,
  metadata: {...}
}
```

### Step 2: Promote Yourself to Admin

**Option A - Via User Management (if you have owner access):**
1. Sign in as the owner
2. Go to "User Management"
3. Find your Google account
4. Click "Promote to Admin"

**Option B - Via Supabase Dashboard:**
1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Find your user
4. Click to edit
5. Update `user_metadata` to include:
   ```json
   {
     "role": "admin"
   }
   ```

**Option C - Via SQL:**
```sql
-- Update user metadata to make them admin
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-email@example.com';
```

---

## Solution 3: Verify Submissions Exist in KV Store

Submissions are stored in the Supabase KV store table. To check if any exist:

1. Go to Supabase Dashboard → Table Editor
2. Open table: `kv_store_27c238f7`
3. Look for keys starting with:
   - `lets-talk:`
   - `rapid-delivery:`
   - `brand-web-download:`
   - `social-media-download:`
   - `discovery:submission:`
   - `brand-audit:`

If there are no rows with these prefixes, it means **no forms have been submitted yet**.

---

## Testing the Fix

After promoting your account to admin:

1. Sign out and sign back in (to refresh your session)
2. Go to Team Dashboard → Submissions Management
3. Check the browser console for:
   ```
   👤 Current user: {
     email: "your-email@example.com",
     role: "admin",  // ✅ Should now be "admin"
     isOwner: false,
     metadata: {...}
   }
   ```
4. You should now see:
   - **If submissions exist:** A table with all form submissions
   - **If no submissions:** A message saying "No submissions found. Forms will appear here when submitted."

---

## Understanding the Permissions System

### Roles:
- **owner** - Full access (set via `is_owner: true` in user_metadata)
- **admin** - Full access (set via `role: "admin"` in user_metadata)  
- **team** - Limited access (default role for new signups)

### What Admins Can See:
✅ Submissions Management  
✅ User Management  
✅ Portfolio Management  
✅ Jobs Management  
✅ Blog Management  
✅ Settings  
✅ Brand Guidelines  
✅ Team Management  
✅ Main Dashboard (with Jira)  
✅ Meetings Management  
✅ Links Management  
✅ Gallery Management  

### What Team Members Can See:
✅ Main Dashboard (limited view)  
❌ All other admin features

---

## Error Messages Explained

| Message | Meaning | Fix |
|---------|---------|-----|
| "Access denied. Admin privileges required." | Your role is not "admin" | Promote user to admin |
| "No submissions found." | No forms submitted yet or you have admin access | Submit a form from the website |
| "Authentication failed. Please sign in again." | Session expired | Sign in again |
| "Please sign in to view submissions" | Not logged in | Go to `/team-login` |

---

## Quick Checklist

- [ ] I'm signed in to the admin dashboard
- [ ] My user has `role: "admin"` OR `is_owner: true` in metadata
- [ ] I've refreshed my session (sign out and back in)
- [ ] There are submissions in the `kv_store_27c238f7` table
- [ ] The browser console shows my role as "admin"

If all boxes are checked and you still can't see submissions, check the server logs for any errors at the `/admin/submissions` endpoint.

---

## Need More Help?

Check the browser console for detailed error messages. The SubmissionsManagement component now logs:
- ✅ Your current user role and permissions
- ✅ The API request being made
- ✅ Server response status and errors
- ✅ Number of submissions loaded

This will help diagnose exactly what's preventing you from viewing submissions.
