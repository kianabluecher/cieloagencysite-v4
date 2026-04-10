# Timestamp Format Reference

All form submissions include a **complete timestamp** with both date and time.

---

## 📅 Format

**Column A** in all sheet tabs contains:

```
Month/Day/Year, Hour:Minute:Second AM/PM
```

### Examples:

```
12/14/2025, 3:45:23 PM
1/5/2025, 9:12:05 AM
11/30/2025, 11:59:47 PM
```

---

## 🌍 Timezone

All timestamps use: **America/New_York (EST/EDT)**

- **EST** (Eastern Standard Time) - November to March
- **EDT** (Eastern Daylight Time) - March to November

---

## 📊 What Gets Captured

Every form submission automatically records:

✅ **Date** - Month, Day, Year  
✅ **Time** - Hour, Minute, Second  
✅ **AM/PM** - 12-hour format  
✅ **Timezone** - Eastern Time (EST/EDT)

---

## 💡 Why This Matters

### Accurate Tracking
- Know **exactly when** each form was submitted
- Track submissions by hour, not just day
- Identify peak submission times

### Time-Based Analysis
- See which hours get most submissions
- Compare morning vs afternoon vs evening traffic
- Track response times to leads

### Sorting & Filtering
- Sort by most recent submissions
- Filter by date range
- Group by time of day

---

## 🔧 Using Timestamps in Google Sheets

### Sort by Most Recent
1. Click column A header
2. Data → Sort sheet → Sort by Column A → Z → A

### Filter by Date
1. Click column A header
2. Data → Create a filter
3. Click filter icon → Filter by condition → Date is...

### Extract Just Time
Use formula in a new column:
```
=TEXT(A2, "h:mm:ss AM/PM")
```
Result: `3:45:23 PM`

### Extract Just Date
Use formula in a new column:
```
=TEXT(A2, "M/D/YYYY")
```
Result: `12/14/2025`

### Convert to Your Timezone
Use formula for Pacific Time:
```
=A2-3/24
```
Or use: `Format → Number → More formats → More date and time formats`

---

## 📋 Sheet-by-Sheet Breakdown

### Let's Talk
- **A1 Header:** Timestamp (Date & Time)
- **Format:** 12/14/2025, 3:45:23 PM
- **Captures:** When user submitted contact form

### Brand & Web
- **A1 Header:** Timestamp (Date & Time)
- **Format:** 12/14/2025, 3:50:45 PM
- **Captures:** When user requested download

### Social Media
- **A1 Header:** Timestamp (Date & Time)
- **Format:** 12/14/2025, 4:00:33 PM
- **Captures:** When user downloaded pricing

### Moodboard
- **A1 Header:** Timestamp (Date & Time)
- **Format:** 12/14/2025, 4:15:23 PM
- **Captures:** When user completed signup

---

## 🎯 Best Practices

### Response Time Tracking
Create a "Response Time" column to track how long it takes to follow up:
```
=NOW()-A2
```
Format as duration to see hours/days since submission

### Daily Summary
Use a pivot table to count submissions by date

### Hourly Heatmap
Create a chart showing submissions by hour of day

### Week vs Weekend
Use WEEKDAY function to compare weekday vs weekend submissions

---

## ⏰ Timestamp Precision

The timestamp captures down to the **second**:

```
12/14/2025, 3:45:23 PM
            ↑  ↑  ↑
         Hour Min Sec
```

This level of precision helps with:
- Detecting duplicate submissions (same user, same second)
- Debugging form issues
- Precise analytics
- Chronological ordering of rapid submissions

---

## 🔍 Technical Details

### JavaScript Date Object
Server uses: `new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })`

### Automatic Conversion
- Server time: UTC
- Displayed time: EST/EDT (automatically adjusted)
- No manual calculation needed

### Consistent Format
All forms use identical formatting for consistency

---

This ensures you always know **exactly when** each lead came in! ⏱️
