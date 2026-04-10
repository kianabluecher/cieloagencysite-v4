# Quick Start: Google Sheets Integration

Get your forms syncing to Google Sheets in 3 simple steps.

---

## 🚀 3-Step Setup

### Step 1️⃣: Create Service Account (5 minutes)

1. Go to: https://console.cloud.google.com/
2. Click **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **Service Account**
4. Name: `cielo-forms` → Click **Create**
5. Skip role assignment → Click **Done**
6. Click on the service account you created
7. Go to **Keys** tab
8. Click **Add Key** → **Create New Key** → **JSON**
9. Save the downloaded file

### Step 2️⃣: Setup Google Sheet (3 minutes)

1. Open: https://docs.google.com/spreadsheets/d/1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE/edit

2. Create 4 tabs with these **exact names**:
   - `Let's Talk`
   - `Brand & Web`
   - `Social Media`
   - `Moodboard`

3. Add headers to each tab (see below)

4. Click **Share** button
   - Paste service account email from JSON file
   - Set to **Editor**
   - Uncheck "Notify people"
   - Click **Share**

### Step 3️⃣: Add Credentials to Supabase (1 minute)

1. A modal should have appeared for `GOOGLE_SHEETS_CREDENTIALS`
2. Open the JSON file you downloaded
3. Copy the **entire contents** (all the text)
4. Paste into the modal
5. Save

---

## 📋 Sheet Headers Copy-Paste

### Let's Talk Tab (Row 1)
```
Timestamp	Name	Email	Company	Services	Form Name
```

### Brand & Web Tab (Row 1)
```
Timestamp	Email			Form Name
```

### Social Media Tab (Row 1)
```
Timestamp	Email			Form Name
```

### Moodboard Tab (Row 1)
```
Timestamp	Email	Company	Moodboard Focus	Goal	Form Name
```
*Note: Timestamp includes both date and time (e.g., "12/14/2025, 4:15:23 PM")*

---

## ✅ Test It

1. Go to your website
2. Submit the "Let's Talk" form
3. Check the "Let's Talk" tab in your Google Sheet
4. You should see a new row with the submission data!

---

## 🎯 What You Get

Every form submission automatically:
- ✅ Saves to Supabase (backup)
- ✅ Emails admin@cielo.marketing
- ✅ Appends to Google Sheets

---

## 📊 All Forms That Sync

| Form | Page | Sheet Tab |
|------|------|-----------|
| Let's Talk | `/lets-talk` | Let's Talk |
| Brand & Web Download | `/brand-web` | Brand & Web |
| Social Media Download | `/social-media` | Social Media |
| Moodboard Signup | `/rapid-delivery` | Moodboard |

---

## 🔧 Enable Google Sheets API

**Important:** You need to enable the API!

1. Go to: https://console.cloud.google.com/
2. Click **APIs & Services** → **Library**
3. Search for "Google Sheets API"
4. Click **Enable**

---

## 💡 Quick Tips

✨ **Tab names must match exactly** - including spaces, capitalization, and apostrophes

✨ **Copy headers from above** - easiest way to get them right

✨ **Service account email** - looks like: `cielo-forms@project-id.iam.gserviceaccount.com`

✨ **JSON credentials** - must be the entire file contents, not just a portion

---

## 🆘 Common Issues

| Problem | Fix |
|---------|-----|
| "Sheet not found" | Check tab name spelling exactly |
| "Permission denied" | Share sheet with service account |
| "API not enabled" | Enable Google Sheets API in Cloud Console |
| No rows appearing | Check Supabase function logs |

---

## 📚 More Info

- Full Setup Guide: `/GOOGLE_SHEETS_SETUP.md`
- Data Reference: `/FORMS_DATA_REFERENCE.md`
- Detailed Checklist: `/SHEETS_SETUP_CHECKLIST.md`

---

That's it! Your forms will now automatically sync to Google Sheets. 🎉
