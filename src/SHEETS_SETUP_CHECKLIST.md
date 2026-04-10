# Google Sheets Setup Checklist

Quick checklist to ensure everything is configured correctly.

---

## ✅ Pre-Setup Checklist

- [ ] You have access to Google Cloud Console
- [ ] You have Editor access to the Google Sheet
- [ ] You have the Spreadsheet ID: `1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE`

---

## 📝 Step 1: Google Cloud Setup

- [ ] Created/selected a Google Cloud Project
- [ ] Enabled Google Sheets API
- [ ] Created Service Account (e.g., "cielo-forms")
- [ ] Downloaded JSON key file
- [ ] Copied service account email (format: `xxx@xxx.iam.gserviceaccount.com`)

---

## 📊 Step 2: Google Sheets Setup

### Create Sheet Tabs

- [ ] Created tab: **"Let's Talk"** (exact name, with apostrophe)
- [ ] Created tab: **"Brand & Web"** (exact name, with ampersand and space)
- [ ] Created tab: **"Social Media"** (exact name, with space)
- [ ] Created tab: **"Moodboard"** (exact name)

### Add Headers (Row 1)

**Let's Talk tab:**
- [ ] A1: `Timestamp`
- [ ] B1: `Name`
- [ ] C1: `Email`
- [ ] D1: `Company`
- [ ] E1: `Services`
- [ ] F1: `Form Name`

**Brand & Web tab:**
- [ ] A1: `Timestamp`
- [ ] B1: `Email`
- [ ] C1: (can leave empty or add placeholder)
- [ ] D1: (can leave empty or add placeholder)
- [ ] E1: (can leave empty or add placeholder)
- [ ] F1: `Form Name`

**Social Media tab:**
- [ ] A1: `Timestamp`
- [ ] B1: `Email`
- [ ] C1: (can leave empty or add placeholder)
- [ ] D1: (can leave empty or add placeholder)
- [ ] E1: (can leave empty or add placeholder)
- [ ] F1: `Form Name`

**Moodboard tab:**
- [ ] A1: `Timestamp` (includes date & time)
- [ ] B1: `Email`
- [ ] C1: `Company`
- [ ] D1: `Moodboard Focus`
- [ ] E1: `Goal`
- [ ] F1: `Form Name`

### Share Sheet with Service Account

- [ ] Clicked Share button in Google Sheets
- [ ] Pasted service account email
- [ ] Set permission to **Editor**
- [ ] Unchecked "Notify people"
- [ ] Clicked Share

---

## 🔐 Step 3: Supabase Secrets

- [ ] Modal appeared for `GOOGLE_SHEETS_CREDENTIALS`
- [ ] Pasted entire JSON file contents (from downloaded .json file)
- [ ] Saved the secret

---

## 🧪 Step 4: Testing

### Test Each Form

**Let's Talk:**
- [ ] Go to `/lets-talk` page
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Check "Let's Talk" sheet tab for new row
- [ ] Verify all columns populated correctly
- [ ] Verify Column F shows "Let's Talk"

**Brand & Web:**
- [ ] Go to `/brand-web` page
- [ ] Enter email and download
- [ ] Check "Brand & Web" sheet tab for new row
- [ ] Verify timestamp, email, and "Brand & Web Download" in Column F

**Social Media:**
- [ ] Go to `/social-media` page
- [ ] Enter email and download pricing
- [ ] Check "Social Media" sheet tab for new row
- [ ] Verify timestamp, email, and "Social Media Download" in Column F

**Moodboard (Rapid Delivery):**
- [ ] Go to `/rapid-delivery` page
- [ ] Click "Get Started" and fill out 3-step form
- [ ] Complete purchase (Step 3)
- [ ] Check "Moodboard" sheet tab for new row
- [ ] Verify all fields populated correctly
- [ ] Verify Column F shows "Moodboard"
- [ ] Verify Column A shows date AND time

---

## 🔍 Troubleshooting Checklist

### If form doesn't submit:
- [ ] Check browser console for JavaScript errors
- [ ] Verify internet connection
- [ ] Try refreshing page and resubmitting

### If submission doesn't appear in Google Sheets:
- [ ] Check Supabase Function Logs for errors
- [ ] Verify `GOOGLE_SHEETS_CREDENTIALS` is set correctly
- [ ] Confirm service account has Editor access
- [ ] Verify sheet tab names match exactly (case-sensitive)
- [ ] Check if Google Sheets API is enabled in Google Cloud

### If you see "GOOGLE_SHEETS_CREDENTIALS not configured" error:
- [ ] Confirm you pasted the JSON in Supabase secrets
- [ ] Verify the JSON is valid (use jsonlint.com)
- [ ] Restart Supabase functions if needed

### If you see authentication errors:
- [ ] Verify service account email in JSON matches what you shared
- [ ] Re-download JSON key from Google Cloud
- [ ] Check if service account was deleted accidentally

---

## 📧 Email Notifications

All forms also send email to: `admin@cielo.marketing`

- [ ] Verified emails are being received
- [ ] Check spam folder if not receiving
- [ ] Confirm `RESEND_API_KEY` is configured

---

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Forms submit without errors
- ✅ New rows appear in Google Sheets immediately
- ✅ Column F shows correct form name
- ✅ Timestamps are in EST timezone
- ✅ Email notifications arrive at admin@cielo.marketing
- ✅ Browser console shows "✅ Successfully sent to Google Sheets"

---

## 📚 Additional Resources

- **Setup Guide:** `/GOOGLE_SHEETS_SETUP.md`
- **Data Reference:** `/FORMS_DATA_REFERENCE.md`
- **Google Sheets API Docs:** https://developers.google.com/sheets/api
- **Supabase Logs:** Your Supabase Dashboard → Edge Functions → Logs

---

## 🆘 Need Help?

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| "Sheet not found" error | Check tab name spelling (case-sensitive) |
| "Permission denied" error | Share sheet with service account email |
| "Invalid credentials" error | Re-paste JSON credentials |
| No rows appearing | Check function logs, verify API enabled |
| Wrong timezone | Timestamps use EST (America/New_York) |

---

## ✨ Optional Enhancements

Once basic setup works, consider:

- [ ] Set up conditional formatting to highlight new submissions
- [ ] Create a dashboard tab with charts/metrics
- [ ] Add data validation to prevent manual errors
- [ ] Set up Google Apps Script for auto-responses
- [ ] Create filtered views for each form type
- [ ] Export to your CRM automatically
