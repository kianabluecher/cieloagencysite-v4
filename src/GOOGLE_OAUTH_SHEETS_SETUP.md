# 🎯 Google Sheets OAuth Integration - Complete Setup Guide

## ✅ What's Been Implemented

Your app now has **OAuth-based Google Sheets integration** that works alongside your existing Google sign-in!

### Files Created:
- ✅ `/supabase/functions/server/google_sheets_oauth.tsx` - OAuth token management
- ✅ `/components/GoogleSheetsConnect.tsx` - Connection UI component
- ✅ `/components/pages/GoogleSheetsCallback.tsx` - OAuth callback handler
- ✅ `/components/pages/admin/Settings.tsx` - Settings page with integrations
- ✅ Backend OAuth endpoints added to `/supabase/functions/server/index.tsx`
- ✅ All form endpoints updated to use OAuth (fallback to service account)
- ✅ Route added to App.tsx for OAuth callback
- ✅ Settings menu added to Admin Dashboard

---

## 🔧 Setup Steps (5 Minutes)

### Step 1: Update Google OAuth Client (2 min)

**Go to:** [Google Cloud Console - OAuth 2.0 Client IDs](https://console.cloud.google.com/apis/credentials)

**Project:** CIELO Agency Agent

**Find your OAuth Client ID** (the one you're using for admin sign-in)

**Add these authorized redirect URIs:**
```
https://YOUR_APP_DOMAIN/api/google-sheets-callback
http://localhost:3000/api/google-sheets-callback  (for testing)
```

Replace `YOUR_APP_DOMAIN` with your actual Figma Make app URL.

---

### Step 2: Add Google Sheets Scope (1 min)

Your OAuth client already has basic scopes. When you click "Connect Google Sheets" in the admin dashboard, Google will ask for permission to access Sheets. **No additional configuration needed** - the OAuth flow will request the `spreadsheets` scope automatically.

---

### Step 3: Verify Your Spreadsheet Setup (1 min)

**Spreadsheet ID:** `1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE`

**Required Sheets (tabs):**
1. **Let's Talk** - Columns A-F
2. **Brand & Web** - Columns A-F  
3. **Social Media** - Columns A-F
4. **Moodboard** - Columns A-F

**Column Headers (row 1):**
- A: Timestamp
- B: Email (or Name for Let's Talk)
- C: Company Name (where applicable)
- D: Additional Field 1
- E: Additional Field 2
- F: Form Name

---

### Step 4: Connect Google Sheets (1 min)

1. **Log into your Admin Dashboard** at `/team-dashboard`
2. **Click "Settings"** in the sidebar (new menu item at the bottom)
3. **Click "Connect Google Sheets"** button
4. **Authorize** when Google prompts
5. **Done!** You'll see a green checkmark ✅

---

## 🔄 How It Works

### Before Connection:
- Forms save to Supabase KV store ✅
- Email notifications sent ✅
- Google Sheets sync **fails silently** (logged in console)

### After OAuth Connection:
- Forms save to Supabase KV store ✅
- Email notifications sent ✅
- **Google Sheets sync works!** ✅

### OAuth Token Management:
- Access tokens auto-refresh (handled automatically)
- Tokens stored securely in Supabase KV store
- Falls back to service account if OAuth not connected

---

## 📊 Testing the Integration

### Test 1: Check Connection Status
1. Go to `/team-dashboard` → Settings
2. Should show **green checkmark** if connected

### Test 2: Submit a Form
1. Submit any form (Let's Talk, Brand & Web, etc.)
2. Check backend logs for: `✅ Successfully sent to Google Sheets (OAuth)`
3. Verify row appears in your Google Sheet

### Test 3: Disconnect & Reconnect
1. Click "Disconnect" in Settings
2. Verify forms still work (fallback to service account)
3. Click "Connect" again
4. Verify OAuth flow works

---

## 🐛 Troubleshooting

### Issue: "Failed to initiate OAuth"
**Fix:** Check that `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` are set in Supabase environment variables.

### Issue: "Redirect URI mismatch"
**Fix:** Make sure you added `/api/google-sheets-callback` to authorized redirect URIs in Google Console.

### Issue: "Google Sheets not connected"
**Fix:** 
1. Check Settings page - is it connected?
2. If not, click "Connect Google Sheets"
3. Check console logs for errors

### Issue: "Failed to append to sheet"
**Fix:**
1. Verify spreadsheet ID matches: `1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE`
2. Check sheet names match exactly (case-sensitive)
3. Ensure OAuth user has edit access to the spreadsheet

---

## 🎨 What the User Sees

### Admin Dashboard - Settings Page
```
┌─────────────────────────────────────────┐
│  Settings                               │
│  Manage integrations and configuration  │
├─────────────────────────────────────────┤
│                                         │
│  Integrations                           │
│  ┌─────────────────────────────────┐   │
│  │  📊 Google Sheets Integration   │   │
│  │     ✅ Connected                │   │
│  │                                 │   │
│  │  Form submissions are           │   │
│  │  automatically synced           │   │
│  │                                 │   │
│  │  [🔗 Disconnect]                │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### OAuth Popup Flow
1. User clicks "Connect Google Sheets"
2. Popup opens → Google sign-in
3. Google asks: "Allow access to Google Sheets?"
4. User clicks "Allow"
5. Popup closes → Dashboard shows "✅ Connected"

---

## 🔒 Security

- ✅ **Tokens stored securely** in Supabase KV (server-side only)
- ✅ **OAuth scopes limited** to Sheets read/write only
- ✅ **Admin-only feature** (requires admin role to connect)
- ✅ **Access token auto-refresh** (no manual intervention needed)
- ✅ **Service account fallback** (still works if OAuth disconnected)

---

## 📝 API Endpoints

### Check Connection Status
```
GET /make-server-27c238f7/auth/google-sheets/status
Authorization: Bearer {admin_access_token}
Response: { "connected": true/false }
```

### Initiate OAuth Flow
```
GET /make-server-27c238f7/auth/google-sheets/connect
Authorization: Bearer {admin_access_token}
Response: { "authUrl": "https://accounts.google.com/...", "redirectUri": "..." }
```

### Handle OAuth Callback
```
POST /make-server-27c238f7/auth/google-sheets/callback
Authorization: Bearer {admin_access_token}
Body: { "code": "...", "redirectUri": "..." }
Response: { "success": true, "message": "Connected" }
```

### Disconnect
```
POST /make-server-27c238f7/auth/google-sheets/disconnect
Authorization: Bearer {admin_access_token}
Response: { "success": true, "message": "Disconnected" }
```

---

## ✨ Next Steps

1. **Complete Step 1** above (add redirect URI to Google Console)
2. **Deploy your code** (backend + frontend changes are ready)
3. **Log into admin dashboard** and navigate to Settings
4. **Click "Connect Google Sheets"**
5. **Test by submitting a form**
6. **Check your Google Sheet** for the new row!

---

## 🎯 Quick Reference

| Item | Value |
|------|-------|
| **Spreadsheet ID** | `1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE` |
| **Callback URL** | `/api/google-sheets-callback` |
| **Settings Page** | `/team-dashboard` → Settings |
| **Required Scope** | `https://www.googleapis.com/auth/spreadsheets` |
| **OAuth Client** | Existing one from Google sign-in |

---

## 🚀 Success Checklist

- [ ] Added redirect URI to Google OAuth Client
- [ ] Deployed backend + frontend code
- [ ] Logged into admin dashboard
- [ ] Navigated to Settings
- [ ] Clicked "Connect Google Sheets"
- [ ] Authorized Google access
- [ ] Saw green checkmark ✅
- [ ] Submitted test form
- [ ] Verified row in Google Sheet
- [ ] Celebrated! 🎉

---

**Questions?** Check the troubleshooting section above or review the server logs for detailed error messages.
