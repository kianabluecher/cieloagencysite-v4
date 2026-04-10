# Quick Start: Notion Portfolio Sync

## 🚀 5-Minute Setup

### Step 1: Test the Integration (Optional)

Visit the Notion Sync Tester page:
```
Navigate to: /notion-sync (in your app navigation)
```

Or add to URL bar: `?page=notion-sync`

### Step 2: Paste Test Data

Click **"Load Example"** to see the JSON format, then click **"Sync to Supabase"**

### Step 3: Verify Sync Works

1. Check for green success message
2. Go to Portfolio page
3. Look for "Example Project"

---

## 📝 Notion Database Template

Copy this into your Notion to create the database:

### Required Properties:

| Property | Type | Required |
|----------|------|----------|
| **title** or **Name** | Title | ✓ |
| **id** | Text | ✓ |
| **date** | Date or Text | ✓ |
| **category** | Select | ✓ |
| **description** | Text | ✓ |

### Optional Properties:

| Property | Type |
|----------|------|
| **client** | Text |
| **status** | Select (Draft/Completed) |
| **featured** | Checkbox |
| **link** | URL |
| **tags** | Multi-select |
| **cover** | File |
| **media** | Files |

---

## 🔗 Make.com Webhook Setup (Easiest)

### Step 1: Create Scenario

1. Go to Make.com
2. Create new scenario
3. Add trigger: **Notion > Watch Database Items**

### Step 2: Connect to Supabase

4. Add module: **HTTP > Make a Request**
5. **URL**: 
   ```
   https://YOUR-PROJECT-ID.supabase.co/functions/v1/make-server-27c238f7/portfolio/notion-webhook
   ```
6. **Method**: POST
7. **Headers**:
   ```
   Content-Type: application/json
   Authorization: Bearer YOUR-ANON-KEY
   ```

### Step 3: Map Fields

8. **Body** (map Notion fields):
   ```json
   {
     "id": "{{notion.properties.id.text}}",
     "title": "{{notion.properties.title.title[0].plain_text}}",
     "client": "{{notion.properties.client.text}}",
     "date": "{{notion.properties.date.date.start}}",
     "category": "{{notion.properties.category.select.name}}",
     "description": "{{notion.properties.description.text}}",
     "status": "{{notion.properties.status.select.name}}",
     "featured": {{notion.properties.featured.checkbox}},
     "cover": "{{notion.cover.file.url}}",
     "link": "{{notion.properties.link.url}}",
     "tags": {{notion.properties.tags.multi_select}},
     "media": {{notion.properties.media.files}}
   }
   ```

9. **Activate** the scenario

---

## ✅ Test Your Setup

### Create Test Project in Notion:

| Field | Value |
|-------|-------|
| id | `my-first-project` |
| title | My First Project |
| category | Branding & Design |
| date | 2025 |
| description | This is my first project synced from Notion! |
| status | Completed |

### Verify:

1. Save in Notion
2. Wait 10-30 seconds
3. Refresh Portfolio page
4. See your project appear!

---

## 🐛 Troubleshooting

**Project not appearing?**

1. Check Make.com execution log
2. Look for HTTP 200 response
3. Check Supabase function logs
4. Verify all required fields filled

**Common Errors:**

- `401 Unauthorized`: Wrong anon key
- `400 Bad Request`: Missing `id` field
- `500 Server Error`: Check Supabase logs

---

## 📖 Full Documentation

See `/guidelines/NOTION_INTEGRATION.md` for:
- Complete field reference
- Advanced features
- Zapier setup
- Debugging guide

---

## 🎯 Next Steps

Once sync is working:

1. Create your real projects in Notion
2. Add images and media
3. Set status to "Completed" to publish
4. Use "featured" checkbox for homepage

**That's it! Your portfolio now syncs automatically from Notion.** 🎉
