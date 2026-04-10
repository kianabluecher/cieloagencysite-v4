# 🔐 Owner Login - Quick Start Guide

## ✅ **Owner User is Now Auto-Created!**

The owner user **`agency@cielo.marketing`** is now **automatically created** when the server starts!

---

## 🚀 **How to Login (2 Simple Steps)**

### **Step 1: Initialize Owner User**

Click the **QuickNav** button (bottom right) → **"Initialize Owner"**

**OR** navigate to: `/init-owner`

This page will:
- ✅ Create the owner user in Supabase (if not exists)
- ✅ Confirm the email automatically
- ✅ Show you the credentials

**Owner Credentials:**
```
Email:    agency@cielo.marketing
Password: agencycielo765598
```

---

### **Step 2: Login**

1. Go to **Team Login** page (Footer → "Log In" → "Team Log In")
2. Enter credentials:
   - **Email:** `agency@cielo.marketing`
   - **Password:** `agencycielo765598`
3. Click **"Sign In"**

**Done!** You're logged in! 🎉

---

## 🔄 **What Happens Automatically**

### **Server Startup (Automatic)**
When the server starts, it automatically:
1. ✅ Checks if `agency@cielo.marketing` exists
2. ✅ Creates it if missing (with email confirmed)
3. ✅ Confirms email if it was unconfirmed

### **Manual Trigger (If Needed)**
If you need to force creation/confirmation:
1. Click **QuickNav** → **"Initialize Owner"**
2. The page auto-runs on load
3. Shows success message with credentials

---

## 🛠️ **Technical Details**

### **Server-Side Auto-Initialization**
Location: `/supabase/functions/server/index.tsx` (lines 27-70)

The server runs this code on startup:
```typescript
// Auto-create owner user on startup if not exists
const OWNER_EMAIL = "agency@cielo.marketing";
const OWNER_PASSWORD = "agencycielo765598";
const OWNER_NAME = "CIELO Agency";

// Checks if user exists
// Creates user with email_confirm: true if not exists
// Confirms email if user exists but unconfirmed
```

### **Manual Endpoint**
Endpoint: `POST /make-server-27c238f7/auth/init-owner`

This endpoint:
- Creates owner user if doesn't exist
- Confirms email if unconfirmed
- Returns success status

---

## 📊 **User Metadata**

The owner user is created with:
```json
{
  "email": "agency@cielo.marketing",
  "password": "agencycielo765598",
  "user_metadata": {
    "full_name": "CIELO Agency",
    "role": "admin",
    "is_owner": true
  },
  "email_confirm": true
}
```

---

## 🔍 **Troubleshooting**

### **Problem: "Email not confirmed" error**

**Solution:**
1. Go to **QuickNav** → **"Initialize Owner"**
2. This will automatically confirm the email
3. Try logging in again

---

### **Problem: "Invalid credentials" error**

**Possible causes:**
1. **Wrong password** - Make sure you're using: `agencycielo765598`
2. **Wrong email** - Make sure you're using: `agency@cielo.marketing`
3. **User doesn't exist** - Run "Initialize Owner" first

---

### **Problem: User not appearing in Supabase**

**Solution:**
1. Check Supabase Dashboard → Authentication → Users
2. If user doesn't exist, go to **"Initialize Owner"** page
3. It will create the user automatically
4. Refresh Supabase Dashboard to see the new user

---

## 🎯 **Quick Access Links**

- **Initialize Owner:** Click QuickNav → "Initialize Owner"
- **Team Login:** Footer → "Log In" → "Team Log In"
- **Supabase Dashboard:** https://supabase.com/dashboard/project/bagdhpqzwxelbgbvubfr

---

## ✨ **That's It!**

You now have a **fully automated** owner user creation system!

**No more manual user creation needed!** 🚀

---

**Last Updated:** November 29, 2025
