# Edge Function Deployment Fix

## Problem
The Edge Function `make-server-27c238f7` is not responding, causing:
- ❌ `Failed to fetch` errors when saving Jira credentials
- ❌ `Failed to fetch` errors when fetching projects
- ❌ Profile fetch errors (non-critical, handled gracefully)

## Root Cause
The Edge Function needs to be **redeployed** to Supabase after recent code changes.

## Solution

### Quick Test First
1. Navigate to `/diagnostic` in your browser
2. Click "Run All Diagnostics"
3. Check if "Health Check" passes or fails

If Health Check **fails**, follow the deployment steps below.

### Deployment Steps

#### Option 1: Via Supabase CLI (Recommended)
```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref bagdhpqzwxelbgbvubfr

# Deploy the Edge Function
supabase functions deploy make-server-27c238f7
```

#### Option 2: Via Supabase Dashboard
1. Go to https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr
2. Navigate to **Edge Functions** in the left sidebar
3. Find `make-server-27c238f7` in the list
4. Click **Deploy** or **Redeploy**
5. Wait for deployment to complete (usually 30-60 seconds)

#### Option 3: Manual Deploy (If CLI fails)
1. Go to https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr/functions
2. Click **Create a new function**
3. Name: `make-server-27c238f7`
4. Copy entire contents of `/supabase/functions/server/index.tsx`
5. Paste into the editor
6. Click **Deploy**

### After Deployment

1. **Test Health Check**:
   ```bash
   curl https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/health
   # Should return: {"status":"ok"}
   ```

2. **Run Diagnostics**:
   - Navigate to `/diagnostic`
   - Click "Run All Diagnostics"
   - All tests should pass ✅

3. **Test Jira Integration**:
   - Go to Settings page (`/team-dashboard` → Settings)
   - Save Jira credentials
   - Go to Main Dashboard
   - Click "Refresh Data"
   - Should see Jira data load successfully

## Verification

After deployment, you should see:
- ✅ Health Check: ONLINE
- ✅ CORS Test: Configured
- ✅ Auth Test: Authenticated
- ✅ Jira Endpoint: Working
- ✅ Direct Jira API: Connected

## Troubleshooting

### If deployment fails with syntax error:
The code has been verified and should deploy successfully. If you see syntax errors:
1. Check Supabase logs: Dashboard → Logs → Edge Functions
2. Look for specific error messages
3. Ensure all dependencies are available

### If health check still fails after deployment:
1. Wait 60 seconds and try again (cold start)
2. Check Supabase status: https://status.supabase.com
3. Verify environment variables are set:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `GOOGLE_SHEETS_CREDENTIALS`
   - etc.

### If Jira endpoint fails but health check passes:
1. Verify Jira credentials are correct
2. Test direct Jira API (diagnostic will show)
3. Check Jira API token hasn't expired

## Files Involved
- `/supabase/functions/server/index.tsx` - Main server file
- `/supabase/functions/server/jira_integration.tsx` - Jira integration
- `/supabase/functions/server/kv_store.tsx` - KV store (protected, don't modify)

## Important Notes
- The Edge Function serves ALL backend endpoints (forms, Jira, Fathom, etc.)
- Deployment is required after ANY changes to `/supabase/functions/server/` files
- The diagnostic page at `/diagnostic` helps identify issues quickly
