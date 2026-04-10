# Google Sheets Integration Setup Guide

## 📊 Overview

Your CIELO Agency forms now automatically sync submissions to Google Sheets:
- **Let's Talk Form** → "Let's Talk" sheet tab
- **Brand & Web Download** → "Brand & Web" sheet tab

---

## 🔧 Setup Instructions

### 1. Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Sheets API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google Sheets API"
   - Click **Enable**

4. Create Service Account:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **Service Account**
   - Name: `cielo-forms` (or any name)
   - Click **Create and Continue**
   - Skip role assignment → Click **Continue** → **Done**

5. Generate JSON Key:
   - Click on the service account you just created
   - Go to **Keys** tab
   - Click **Add Key** → **Create New Key**
   - Choose **JSON**
   - Download the file

6. **Copy the entire JSON content** from the downloaded file

### 2. Share Google Sheet with Service Account

1. Open your spreadsheet:
   https://docs.google.com/spreadsheets/d/1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE/edit

2. Click **Share** button (top right)

3. Paste the **service account email** from the JSON file
   - Format: `cielo-forms@project-id.iam.gserviceaccount.com`
   - Give it **Editor** permission
   - Uncheck "Notify people"
   - Click **Share**

### 3. Create Sheet Tabs

In your Google Spreadsheet, create four sheet tabs:

#### Sheet 1: "Let's Talk"
Add these headers in Row 1:
- **A1**: Timestamp (Date & Time)
- **B1**: Name
- **C1**: Email
- **D1**: Company
- **E1**: Services
- **F1**: Form Name

#### Sheet 2: "Brand & Web"
Add these headers in Row 1:
- **A1**: Timestamp (Date & Time)
- **B1**: Email
- **C1**: (leave empty)
- **D1**: (leave empty)
- **E1**: (leave empty)
- **F1**: Form Name

#### Sheet 3: "Social Media"
Add these headers in Row 1:
- **A1**: Timestamp (Date & Time)
- **B1**: Email
- **C1**: (leave empty)
- **D1**: (leave empty)
- **E1**: (leave empty)
- **F1**: Form Name

#### Sheet 4: "Moodboard"
Add these headers in Row 1:
- **A1**: Timestamp (Date & Time)
- **B1**: Email
- **C1**: Company
- **D1**: Moodboard Focus
- **E1**: Goal
- **F1**: Form Name

### 4. Add Credentials to Supabase

The `GOOGLE_SHEETS_CREDENTIALS` secret modal should have appeared. If not already done:

1. Copy the **entire JSON file contents** (from the downloaded .json file)
2. Paste into the secret field
3. Save

---

## 📝 Data Format

### Let's Talk Form
| Timestamp | Name | Email | Company | Services | Form Name |
|-----------|------|-------|---------|----------|-----------|
| 12/14/2025, 3:45:12 PM | John Doe | john@example.com | ACME Inc | Brand & Web, Social Media | Let's Talk |

### Brand & Web Download
| Timestamp | Email | (empty) | (empty) | (empty) | Form Name |
|-----------|-------|---------|---------|---------|-----------|
| 12/14/2025, 3:50:45 PM | jane@example.com | | | | Brand & Web Download |

### Social Media Download
| Timestamp | Email | (empty) | (empty) | (empty) | Form Name |
|-----------|-------|---------|---------|---------|-----------|
| 12/14/2025, 4:00:33 PM | bob@example.com | | | | Social Media Download |

### Moodboard Signup (Rapid Delivery)
| Timestamp | Email | Company | Moodboard Focus | Goal | Form Name |
|-----------|-------|---------|-----------------|------|-----------|
| 12/14/2025, 4:15:23 PM | alice@startup.com | Startup Co | Modern, Minimalist | Launch new product | Moodboard |

*Note: Timestamp includes both date and time in EST timezone*

---

## ✅ Verification

After setup, test by:
1. Submitting a Let's Talk form on your website
2. Check the "Let's Talk" tab in your Google Sheet
3. A new row should appear with the submission data

---

## 🔍 Troubleshooting

**If submissions don't appear:**
1. Check browser console for errors
2. Check Supabase function logs for Google Sheets errors
3. Verify service account email has Editor access to the sheet
4. Verify sheet tab names match exactly: "Let's Talk", "Brand & Web", "Social Media", and "Moodboard"
5. Ensure GOOGLE_SHEETS_CREDENTIALS is properly formatted JSON

**Common Issues:**
- ❌ Sheet tab name doesn't match → Create tabs with exact names
- ❌ Service account not shared → Share with Editor permission
- ❌ Invalid JSON credentials → Re-download and paste entire JSON
- ❌ API not enabled → Enable Google Sheets API in Google Cloud

---

## 📊 What Gets Synced

✅ **Let's Talk Form** (`/lets-talk` page)
✅ **Brand & Web Download** (`/brand-web` page)
✅ **Social Media Download** (`/social-media` page)
✅ **Moodboard Signup** (`/rapid-delivery` page - Rapid Delivery service)

---

## 🎯 All Forms Are Now Integrated!

All major forms on your CIELO Agency website now automatically sync to Google Sheets. Every submission is:
- Saved to Supabase KV store (backup)
- Sent via email to admin@cielo.marketing
- Automatically appended to the appropriate Google Sheet tab
