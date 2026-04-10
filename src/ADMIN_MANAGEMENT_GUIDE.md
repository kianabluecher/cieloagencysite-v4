# 🎯 Admin Management Guide - CIELO Agency

## ✅ Implementation Status

**YES**, your Team Dashboard has been **fully migrated** to the **Supabase Auth with Admin Role** approach! 🎉

All environment variable-based authentication (`OWNER_EMAIL`/`OWNER_PASSWORD` headers) has been replaced with secure Supabase Auth tokens and role-based access control.

---

## 🔐 How the New Admin System Works

### **Authentication Flow**
1. **Users sign in** via the Team Login page using Supabase Auth
2. **Session tokens** are stored in the browser
3. **Protected endpoints** verify the user's token and check for `is_admin: true` or `role: 'admin'` in user metadata
4. **Admin actions** (creating jobs, managing portfolio, etc.) require valid admin credentials

### **Admin vs Owner**
- **Owner**: The primary admin with full privileges (can promote/demote other admins)
  - Default email: `agency@cielo.marketing`
  - Default password: `agencycielo765598`
  - User metadata: `{ is_owner: true, role: 'admin' }`

- **Admin**: Team members with admin privileges (can manage content)
  - User metadata: `{ role: 'admin' }`

- **Regular Team**: Team members without admin access
  - User metadata: `{ role: 'team' }`

---

## 🚀 How to Manage Admin Users

### **Option 1: Initialize the Owner User (Automatic)**

The **owner user is automatically created** when the server starts **IF** you have set the following environment variables in Supabase:

```
OWNER_EMAIL=agency@cielo.marketing
OWNER_PASSWORD=agencycielo765598
```

**How to Check:**
1. Go to your Supabase Dashboard → Settings → Edge Functions
2. Look for environment variables `OWNER_EMAIL` and `OWNER_PASSWORD`
3. If they exist, the owner user is created automatically on server startup

---

### **Option 2: Manual Owner Initialization**

If the automatic creation didn't work, you can manually initialize the owner user:

#### **Step 1: Visit the Init Owner Page**
1. Navigate to the **Team Login** page
2. Click the **"🔧 Initialize Owner User"** button
3. This will automatically create the owner user with:
   - Email: `agency@cielo.marketing`
   - Password: `agencycielo765598`
   - Role: `admin` with `is_owner: true`

#### **Step 2: Login as Owner**
1. Return to **Team Login**
2. Sign in with:
   - Email: `agency@cielo.marketing`
   - Password: `agencycielo765598`

---

### **Option 3: Create Additional Admin Users**

Once you're logged in as the **owner**, you can promote other users to admin:

#### **Method 1: Via API (Programmatic)**

You can create a UI for this, or use the API directly:

**Endpoint**: `POST /make-server-27c238f7/auth/promote-admin`

**Request:**
```json
{
  "userId": "user-id-to-promote"
}
```

**Headers:**
```
Authorization: Bearer YOUR_SESSION_TOKEN
```

**Example using fetch:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/promote-admin`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`,
    },
    body: JSON.stringify({ userId: 'user-id-here' })
  }
);
```

#### **Method 2: Directly in Supabase Dashboard**

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Find the user you want to promote
3. Click on the user to edit
4. Scroll to **User Metadata** (raw JSON)
5. Add or update the metadata:
   ```json
   {
     "full_name": "User Name",
     "role": "admin"
   }
   ```
6. Click **Save**

---

## 📋 Available Admin Endpoints

Your server now has these admin management endpoints:

### **1. Get Current User Info**
- **Endpoint**: `GET /make-server-27c238f7/auth/me`
- **Purpose**: Get info about the currently logged-in user (including admin status)
- **Auth Required**: Yes (any authenticated user)

### **2. List All Users** (Owner Only)
- **Endpoint**: `GET /make-server-27c238f7/auth/users`
- **Purpose**: Get a list of all users in the system
- **Auth Required**: Yes (owner only)

### **3. Promote User to Admin** (Owner Only)
- **Endpoint**: `POST /make-server-27c238f7/auth/promote-admin`
- **Purpose**: Grant admin privileges to a user
- **Auth Required**: Yes (owner only)
- **Body**: `{ "userId": "user-id" }`

### **4. Demote Admin to Regular User** (Owner Only)
- **Endpoint**: `POST /make-server-27c238f7/auth/demote-admin`
- **Purpose**: Remove admin privileges from a user
- **Auth Required**: Yes (owner only)
- **Body**: `{ "userId": "user-id" }`

### **5. Initialize Owner User**
- **Endpoint**: `POST /make-server-27c238f7/auth/init-owner`
- **Purpose**: Create or confirm the owner user account
- **Auth Required**: No (public endpoint for setup)

---

## 🎨 Admin UI Recommendations

You may want to add a **User Management** section to the Team Dashboard where owners can:

1. **View all users** in a table
2. **See their roles** (owner, admin, team)
3. **Promote/demote users** with a button click
4. **View user creation dates** and last sign-in

**Example UI Flow:**
```
Team Dashboard
└── User Management (Owner Only)
    ├── User List Table
    │   ├── Email
    │   ├── Full Name
    │   ├── Role Badge (owner/admin/team)
    │   └── Actions (Promote/Demote buttons)
    └── Invite New User Form
```

---

## 🔒 Security Features Implemented

✅ **Token-based authentication** - No more environment variable headers  
✅ **Role-based access control** - Admin endpoints verify `role: 'admin'` in user metadata  
✅ **Owner protection** - Only owners can promote/demote admins  
✅ **Email confirmation** - Auto-confirmed for owner, optional for team members  
✅ **Session management** - Tokens expire and refresh automatically  
✅ **Middleware protection** - All admin endpoints use `verifyAdmin()` middleware  

---

## 📝 Quick Start Checklist

- [ ] **Set environment variables** in Supabase (optional for auto-creation)
  - `OWNER_EMAIL=agency@cielo.marketing`
  - `OWNER_PASSWORD=agencycielo765598`

- [ ] **Initialize owner user** (if not auto-created)
  - Visit Team Login → Click "🔧 Initialize Owner User"

- [ ] **Login as owner**
  - Email: `agency@cielo.marketing`
  - Password: `agencycielo765598`

- [ ] **Verify admin access**
  - Try accessing admin pages (Jobs Admin, Portfolio Admin, etc.)

- [ ] **Create additional admins** (optional)
  - Invite users via sign-up
  - Promote them using owner account

---

## ❓ FAQ

### **Q: Can I still use the same login I used before?**
**A:** Yes! If you were using `agency@cielo.marketing` as the `OWNER_EMAIL`, that's now your owner account. The password is the same one you had in `OWNER_PASSWORD` (default: `agencycielo765598`).

### **Q: What if I forgot the owner password?**
**A:** You can:
1. Use the **Password Reset** flow on the Team Login page
2. Manually reset it in Supabase Dashboard → Authentication → Users → Select User → Reset Password
3. Update the `OWNER_PASSWORD` environment variable and re-run the init-owner endpoint

### **Q: Can I create multiple owners?**
**A:** Technically yes, but it's not recommended. The system is designed for **one owner** and **multiple admins**. You can manually set `is_owner: true` in another user's metadata via Supabase Dashboard if needed.

### **Q: How do I revoke admin access?**
**A:** As the owner, use the `/auth/demote-admin` endpoint or manually change the user's metadata to `{ "role": "team" }` in Supabase Dashboard.

### **Q: Can admins create other admins?**
**A:** No. Only the **owner** can promote/demote users. Regular admins can only manage content (jobs, portfolio, etc.).

---

## 🎉 Summary

You now have a **fully functional, secure, Supabase-based admin system** with:

- ✅ **Owner account** with full privileges
- ✅ **Admin roles** for team members
- ✅ **Role-based access control** on all endpoints
- ✅ **Token-based authentication** (no more env var headers)
- ✅ **User management endpoints** for promoting/demoting admins

**Default Owner Credentials:**
- Email: `agency@cielo.marketing`
- Password: `agencycielo765598`

**Next Steps:**
1. Login as owner
2. Test admin functionality (create a job, manage portfolio)
3. (Optional) Create additional admin users
4. (Optional) Build a User Management UI in the dashboard

---

**Need help?** Check the server logs in Supabase Dashboard → Edge Functions → Logs to see authentication events.
