# All Forms Overview

Complete reference for all 4 Google Sheets-integrated forms.

---

## 📊 Quick Comparison

| Form | Sheet Tab | Fields Captured | Form Name (Col F) |
|------|-----------|-----------------|-------------------|
| Let's Talk | `Let's Talk` | 6 fields | "Let's Talk" |
| Brand & Web | `Brand & Web` | 2 fields | "Brand & Web Download" |
| Social Media | `Social Media` | 2 fields | "Social Media Download" |
| Moodboard | `Moodboard` | 5 fields | "Moodboard" |

---

## 📋 Detailed Breakdown

### 1. Let's Talk Form 💬

**Purpose:** Main contact/inquiry form  
**Page:** `/lets-talk`  
**Sheet Tab:** `Let's Talk`

| Column | Header | Sample Data |
|--------|--------|-------------|
| A | Timestamp (Date & Time) | 12/14/2025, 3:45:23 PM |
| B | Name | John Doe |
| C | Email | john@example.com |
| D | Company | ACME Inc |
| E | Services | Brand & Web, Social Media |
| F | Form Name | Let's Talk |

**Use Case:** Qualified leads interested in multiple services

---

### 2. Brand & Web Download 🎨

**Purpose:** Download brand/web details  
**Page:** `/brand-web`  
**Sheet Tab:** `Brand & Web`

| Column | Header | Sample Data |
|--------|--------|-------------|
| A | Timestamp (Date & Time) | 12/14/2025, 3:50:45 PM |
| B | Email | jane@example.com |
| C | (empty) | |
| D | (empty) | |
| E | (empty) | |
| F | Form Name | Brand & Web Download |

**Use Case:** Quick lead capture for branding interest

---

### 3. Social Media Download 📱

**Purpose:** Download social media pricing  
**Page:** `/social-media`  
**Sheet Tab:** `Social Media`

| Column | Header | Sample Data |
|--------|--------|-------------|
| A | Timestamp (Date & Time) | 12/14/2025, 4:00:33 PM |
| B | Email | bob@example.com |
| C | (empty) | |
| D | (empty) | |
| E | (empty) | |
| F | Form Name | Social Media Download |

**Use Case:** Social media service interest

---

### 4. Moodboard Signup 🎯

**Purpose:** Rapid Delivery moodboard service signup  
**Page:** `/rapid-delivery`  
**Sheet Tab:** `Moodboard`

| Column | Header | Sample Data |
|--------|--------|-------------|
| A | Timestamp (Date & Time) | 12/14/2025, 4:15:23 PM |
| B | Email | alice@startup.com |
| C | Company | Startup Co |
| D | Moodboard Focus | Modern, Minimalist |
| E | Goal | Launch new product |
| F | Form Name | Moodboard |

**Use Case:** High-intent leads ready for 48-hour delivery

---

## 🎯 Lead Quality Indicators

### High Intent → Low Intent

1. **Moodboard** (Highest) - Ready to purchase, multi-step form completed
2. **Let's Talk** (High) - Detailed inquiry, multiple fields filled
3. **Brand & Web** (Medium) - Specific interest shown
4. **Social Media** (Medium) - Specific interest shown

---

## 📈 Recommended Follow-Up Times

| Form | Priority | Response Time | Action |
|------|----------|---------------|--------|
| Moodboard | 🔴 Urgent | < 2 hours | Call + Start project |
| Let's Talk | 🟡 High | < 24 hours | Call + Send proposal |
| Brand & Web | 🟢 Medium | < 48 hours | Email + Schedule call |
| Social Media | 🟢 Medium | < 48 hours | Email + Schedule call |

---

## 🔄 Data Flow for Each Form

```
User Submits Form
        ↓
Backend Endpoint (/supabase/functions/server/index.tsx)
        ↓
   ┌────┴────┬────────────┐
   ↓         ↓            ↓
Supabase   Email      Google Sheets
KV Store   (Resend)   (Spreadsheet)
```

**All 3 happen simultaneously for every form!**

---

## 📧 Email Notifications

Every form triggers an email to: **admin@cielo.marketing**

### Subject Lines:
- Let's Talk: "New Contact Form Submission - [Name]"
- Brand & Web: "New Brand & Web Details Download"
- Social Media: "New Social Media Pricing Download"
- Moodboard: "New Rapid Delivery Signup - [Company]"

---

## 🗂️ Organizing Your Data

### Option 1: Separate Tabs (Current Setup)
✅ Clean organization  
✅ Easy to manage  
✅ Form-specific headers  
❌ Need to check multiple tabs

### Option 2: Combined View
Create a 5th tab "All Submissions" with formula:
```
={'Let''s Talk'!A2:F; 'Brand & Web'!A2:F; 'Social Media'!A2:F; 'Moodboard'!A2:F}
```
✅ See everything in one place  
✅ Sort across all forms  
✅ Column F identifies form type  
❌ Different field structures

---

## 💡 Pro Tips

### 1. Color Code by Form Type
Use conditional formatting based on Column F:
- "Let's Talk" → Blue
- "Brand & Web Download" → Green
- "Social Media Download" → Orange
- "Moodboard" → Purple

### 2. Create a Dashboard Tab
Add charts showing:
- Submissions per form (pie chart)
- Submissions over time (line chart)
- Peak submission hours (bar chart)

### 3. Set Up Alerts
Use Google Sheets notifications:
- Email when new row added
- Slack integration via Zapier
- Mobile notifications

### 4. Track Conversion
Add a "Status" column (H):
- Contacted
- Proposal Sent
- Won
- Lost

### 5. Calculate Response Time
Add formula in Column G:
```
=IF(H2="Contacted", J2-A2, NOW()-A2)
```
Where J2 is when you contacted them

---

## 🎨 Visualization Ideas

### Submissions by Time of Day
```
Hour  | Count
------|------
9 AM  | ███ 3
12 PM | █████████ 9
3 PM  | ██████ 6
6 PM  | ████ 4
```

### Submissions by Form
```
Form          | Count | %
--------------|-------|----
Let's Talk    | 45    | 35%
Moodboard     | 32    | 25%
Brand & Web   | 28    | 22%
Social Media  | 23    | 18%
```

---

## 🔧 Maintenance Tips

### Weekly
- [ ] Review new submissions
- [ ] Update lead status
- [ ] Archive old/closed leads

### Monthly
- [ ] Analyze conversion rates
- [ ] Check response times
- [ ] Review form performance

### Quarterly
- [ ] Export backup to CSV
- [ ] Clean up test submissions
- [ ] Update headers if needed

---

## 🆘 Troubleshooting by Form

### Let's Talk Issues
- Check all 5 fields populate (Name, Email, Company, Services, Form Name)
- Services should be comma-separated if multiple

### Download Forms Issues (Brand & Web, Social Media)
- Only Email and Form Name should populate
- Columns C, D, E will be empty (expected)

### Moodboard Issues
- Check all 5 fields populate (Email, Company, Focus, Goal, Form Name)
- Multi-step modal must complete all 3 steps

---

## 📚 Related Documentation

- **Setup Guide:** `/GOOGLE_SHEETS_SETUP.md`
- **Quick Start:** `/QUICK_START_SHEETS.md`
- **Field Reference:** `/FORMS_DATA_REFERENCE.md`
- **Checklist:** `/SHEETS_SETUP_CHECKLIST.md`
- **Timestamp Info:** `/TIMESTAMP_FORMAT.md`

---

**All 4 forms are now fully integrated and syncing! 🎉**
