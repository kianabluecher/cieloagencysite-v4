# Forms Data Reference

Quick reference for all forms that sync to Google Sheets.

---

## 📋 Form Field Mapping

### 1. Let's Talk Form
**Sheet Tab:** `Let's Talk`  
**Endpoint:** `/make-server-27c238f7/lets-talk`

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | Submission date/time (EST) |
| B | Name | User's full name |
| C | Email | User's email address |
| D | Company | Company name |
| E | Services | Comma-separated list of selected services |
| F | Form Name | Always "Let's Talk" |

**Sample Services:**
- Brand & Web
- Social Media
- Consulting
- AI Content
- Other

---

### 2. Brand & Web Download
**Sheet Tab:** `Brand & Web`  
**Endpoint:** `/make-server-27c238f7/brand-web/download`

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | Submission date/time (EST) |
| B | Email | User's email address |
| C | (empty) | - |
| D | (empty) | - |
| E | (empty) | - |
| F | Form Name | Always "Brand & Web Download" |

---

### 3. Social Media Download
**Sheet Tab:** `Social Media`  
**Endpoint:** `/make-server-27c238f7/social-media/download`

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | Submission date/time (EST) |
| B | Email | User's email address |
| C | (empty) | - |
| D | (empty) | - |
| E | (empty) | - |
| F | Form Name | Always "Social Media Download" |

---

### 4. Moodboard Signup (Rapid Delivery)
**Sheet Tab:** `Moodboard`  
**Endpoint:** `/make-server-27c238f7/rapid-delivery/signup`

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | Submission date & time (EST) - e.g., "12/14/2025, 4:15:23 PM" |
| B | Email | User's email address |
| C | Company | Company name |
| D | Moodboard Focus | Brand style preferences |
| E | Goal | Business/project goals |
| F | Form Name | Always "Moodboard" |

---

## 🔗 Data Flow

Every form submission follows this flow:

```
Frontend Form
    ↓
    ├─→ Supabase Edge Function (Server)
    │       ↓
    │       ├─→ Save to KV Store (Supabase)
    │       ├─→ Send Email (Resend API) → admin@cielo.marketing
    │       └─→ Append to Google Sheets
    │
    └─→ Success Response to User
```

---

## 📊 Google Sheets Structure

Your spreadsheet should have 4 tabs with headers in Row 1:

```
Spreadsheet ID: 1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE

├── Let's Talk
│   └── Headers: Timestamp | Name | Email | Company | Services | Form Name
│
├── Brand & Web
│   └── Headers: Timestamp | Email | (empty) | (empty) | (empty) | Form Name
│
├── Social Media
│   └── Headers: Timestamp | Email | (empty) | (empty) | (empty) | Form Name
│
└── Moodboard
    └── Headers: Timestamp | Email | Company | Moodboard Focus | Goal | Form Name
```

---

## 🎯 Column F (Form Name) Values

This column identifies which form the submission came from:

| Form | Value in Column F |
|------|------------------|
| Let's Talk | `Let's Talk` |
| Brand & Web Download | `Brand & Web Download` |
| Social Media Download | `Social Media Download` |
| Moodboard Signup | `Moodboard` |

This allows you to:
- Filter submissions by form type
- Create separate views/dashboards
- Track which forms are most popular
- Combine all forms in one sheet if desired

---

## 💡 Pro Tips

### Combining All Forms in One Sheet
If you want all submissions in one sheet, you can:
1. Create a new sheet tab called "All Submissions"
2. Use a formula to pull data from all 4 tabs
3. Example formula for Row 2:
   ```
   ={'Let''s Talk'!A2:F; 'Brand & Web'!A2:F; 'Social Media'!A2:F; 'Rapid Delivery'!A2:F}
   ```

### Creating a Dashboard
Use Google Sheets features like:
- **Pivot Tables** to analyze submission trends
- **Charts** to visualize form popularity
- **Conditional Formatting** to highlight new submissions
- **Filters** to view specific form types

### Automating Follow-ups
You can set up Google Apps Script to:
- Send auto-responses to new submissions
- Create calendar events for follow-ups
- Notify your team on Slack/Discord
- Export to your CRM

---

## 🔧 Technical Details

### Timezone
All timestamps use: `America/New_York` (EST/EDT)

### Date & Time Format
Example: `12/14/2025, 3:45:00 PM`  
Includes: Month/Day/Year, Hour:Minute:Second AM/PM

### Array Handling
Services field joins array with comma + space: `Brand & Web, Social Media`

### Error Handling
- Forms save to Supabase even if Google Sheets fails
- Email notifications are independent of Sheets sync
- Each step has try-catch to prevent cascade failures
