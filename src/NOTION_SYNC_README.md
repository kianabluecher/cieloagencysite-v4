# Notion → Supabase Portfolio Sync

## ✅ Implementation Complete

Your CIELO website now has **full Notion integration** for portfolio management!

---

## 🎯 What Was Built

### 1. **Server-Side Endpoints** (`/supabase/functions/server/index.tsx`)
   - ✅ `/portfolio/sync-notion` - Manual sync endpoint
   - ✅ `/portfolio/notion-webhook` - Automatic webhook receiver
   - ✅ Automatic cache invalidation on sync
   - ✅ Flexible Notion format parsing

### 2. **Updated Data Schema** (`/utils/portfolio-api.ts`)
   - ✅ New `Project` interface with Notion fields
   - ✅ `MediaItem` type for gallery images
   - ✅ Backward compatibility with legacy fields
   - ✅ `syncFromNotion()` API function

### 3. **Enhanced Portfolio Detail Page** (`/components/pages/PortfolioDetail.tsx`)
   - ✅ Displays all Notion fields:
     - Cover image (hero)
     - Client, category, date
     - Status badge
     - Tags as chips
     - External link button
     - Media gallery with alt text
   - ✅ Backward compatible with existing projects

### 4. **Test Interface** (`/components/pages/NotionSync.tsx`)
   - ✅ Manual JSON sync tester
   - ✅ Example data loader
   - ✅ Real-time sync validation
   - ✅ Full response viewer
   - Access at: `/notion-sync` in app

### 5. **Documentation**
   - ✅ `/guidelines/NOTION_INTEGRATION.md` - Complete setup guide
   - ✅ `/guidelines/QUICK_START_NOTION.md` - 5-minute quickstart

---

## 📊 Notion Schema → Website Mapping

| Notion Field | Type | Website Display | Component |
|-------------|------|-----------------|-----------|
| **id** | Text | URL slug | All |
| **title** | Title | H1 heading | All |
| **client** | Text | Metadata section | PortfolioDetail |
| **date** | Date/Text | Metadata section | All |
| **category** | Select | Badge/Label | All |
| **description** | Text | Main body | PortfolioDetail |
| **cover** | File | Hero image | PortfolioDetail |
| **media[]** | Files | Image gallery | PortfolioDetail |
| **media[].alt** | - | `<img alt="">` | PortfolioDetail |
| **link** | URL | External button | PortfolioDetail |
| **tags[]** | Multi-select | Tag chips | PortfolioDetail |
| **status** | Select | Status badge | PortfolioDetail |
| **featured** | Checkbox | Homepage filter | FeaturedWork |

---

## 🔄 How It Works

### Automatic Sync Flow:

```
1. User updates Notion database
   ↓
2. Make.com/Zapier detects change
   ↓
3. Webhook fires to Supabase endpoint
   ↓
4. Server validates & transforms data
   ↓
5. Stored in kv_store as portfolio:project:{id}
   ↓
6. Cache invalidated
   ↓
7. Next page load shows new data
   ↓
8. Website displays updated portfolio
```

### Manual Sync Flow:

```
1. User prepares JSON data
   ↓
2. Posts to /portfolio/sync-notion
   ↓
3. Same storage & cache invalidation
   ↓
4. Immediate website update
```

---

## 🚀 Quick Start

### Option A: Test Interface (Fastest)

1. Navigate to `/notion-sync` in your app
2. Click "Load Example"
3. Click "Sync to Supabase"
4. Go to Portfolio page - see test project!

### Option B: Make.com Setup (Production)

1. Create Make.com scenario
2. Trigger: **Notion > Watch Database Items**
3. Action: **HTTP > POST** to webhook
4. Map Notion fields to JSON
5. Activate scenario

**Full instructions**: `/guidelines/QUICK_START_NOTION.md`

---

## 📝 Example Notion Entry

```
id: welda-club
title: Welda Club
client: Welda
date: 2025
category: Branding & Design
description: Premium golf club and leisure destination branding.
status: Completed
featured: ✓
link: https://cielo.agency/projects/welda-club
tags: Golf, Luxury, Leisure
cover: [Upload image]
media: [Upload 3-5 images with descriptions]
```

### Becomes this JSON:

```json
{
  "id": "welda-club",
  "title": "Welda Club",
  "client": "Welda",
  "date": "2025",
  "category": "Branding & Design",
  "description": "Premium golf club and leisure destination branding.",
  "media": [
    { "url": "https://notion.so/file1.jpg", "alt": "Logo grid" },
    { "url": "https://notion.so/file2.jpg", "alt": "Brand deck" }
  ],
  "cover": "https://notion.so/cover.jpg",
  "link": "https://cielo.agency/projects/welda-club",
  "tags": ["Golf", "Luxury", "Leisure"],
  "status": "Completed",
  "featured": true
}
```

### Displays as:

- **Homepage**: Featured project card (if `featured: true`)
- **Portfolio Page**: Grid item with cover image
- **Detail Page**: 
  - Hero cover image
  - Status badge
  - Client, category, date metadata
  - Full description
  - Tag chips
  - External link button
  - Media gallery

---

## 🔐 Security

### Environment Variables (Already Configured):

- `SUPABASE_URL` - Project URL
- `SUPABASE_ANON_KEY` - Public key (safe for webhooks)
- `SUPABASE_SERVICE_ROLE_KEY` - Server-only (protected)

### Webhook Security:

- Bearer token authentication required
- CORS properly configured
- Input validation on all fields
- JSON parsing error handling

---

## 🎨 Frontend Components Updated

### Modified:
- ✅ `PortfolioDetail.tsx` - Displays all Notion fields
- ✅ `portfolio-api.ts` - New schema + sync function
- ✅ `App.tsx` - Added NotionSync route

### Backward Compatible:
- ✅ `FeaturedWork.tsx` - Works with new + old schema
- ✅ `WorkGallery.tsx` - Works with new + old schema
- ✅ All existing projects still display correctly

---

## 📦 Database Storage

### Storage Format:

**Key**: `portfolio:project:{id}`

**Value**:
```json
{
  "id": "project-id",
  "title": "Project Title",
  "client": "Client Name",
  "date": "2025",
  "category": "Category",
  "description": "Description",
  "media": [...],
  "cover": "url",
  "link": "url",
  "tags": [...],
  "status": "Completed",
  "featured": true,
  "updatedAt": "2025-10-31T12:00:00Z"
}
```

### Cache Behavior:

- **Duration**: 1 hour (3600 seconds)
- **Invalidation**: Automatic on any sync
- **Headers**: `Cache-Control: public, max-age=3600`

---

## 🧪 Testing Checklist

- [ ] Test interface loads at `/notion-sync`
- [ ] Example JSON loads successfully
- [ ] Manual sync completes without errors
- [ ] Test project appears in portfolio
- [ ] Detail page shows all fields correctly
- [ ] Make.com/Zapier scenario activated
- [ ] Create test project in Notion
- [ ] Verify automatic sync within 30 seconds
- [ ] Confirm cache invalidation works
- [ ] Check Supabase function logs

---

## 🐛 Troubleshooting

### Sync not working?

1. **Check webhook logs** (Make.com/Zapier)
   - Look for HTTP 200 response
   - Verify JSON payload structure

2. **Check Supabase logs**
   - Go to Dashboard → Functions → Logs
   - Look for sync confirmation message

3. **Verify required fields**
   - `id` must be present and unique
   - `title`, `date`, `category` required

4. **Test manually first**
   - Use `/notion-sync` test interface
   - Validate JSON format
   - Confirm authentication works

### Common Errors:

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Wrong anon key | Check Authorization header |
| 400 Bad Request | Missing `id` field | Add id to Notion entry |
| 500 Server Error | Invalid JSON | Check Supabase logs for details |
| Project not appearing | Status = Draft | Change to "Completed" |

---

## 📚 Documentation Files

1. **`/guidelines/NOTION_INTEGRATION.md`**
   - Complete integration guide
   - All setup methods
   - Field reference
   - Advanced features

2. **`/guidelines/QUICK_START_NOTION.md`**
   - 5-minute quickstart
   - Notion template
   - Make.com setup
   - Troubleshooting

3. **`/NOTION_SYNC_README.md`** (this file)
   - Implementation overview
   - Technical details
   - Testing guide

---

## 🎯 What You Can Do Now

### As a Content Manager:

1. **Create projects in Notion** instead of code
2. **Upload images directly** in Notion
3. **Update anytime** - changes sync automatically
4. **Organize with tags** for easy filtering
5. **Draft projects** before publishing (status field)
6. **Feature projects** on homepage (checkbox)

### As a Developer:

1. **Extend the schema** - add more Notion properties
2. **Custom filters** - use tags, status, featured
3. **API integrations** - webhook works with any service
4. **Analytics** - track project views via Supabase
5. **Automation** - trigger emails, notifications, etc.

---

## 🚀 Next Steps

### Recommended:

1. ✅ Test the sync with example data
2. ✅ Create Notion database with template
3. ✅ Set up Make.com or Zapier scenario
4. ✅ Add your first real project
5. ✅ Verify it appears on website
6. ✅ Customize Notion properties as needed

### Optional Enhancements:

- Add SEO fields (meta description, OG image)
- Create Notion views (Published, Draft, Featured)
- Add project ordering field
- Implement search/filtering by tags
- Add analytics tracking
- Email notifications on new projects

---

## 🎉 Summary

Your portfolio is now **fully powered by Notion**! 

- ✅ No more editing code to add projects
- ✅ Content team can manage everything
- ✅ Changes appear within seconds
- ✅ Rich media support with galleries
- ✅ SEO-friendly with alt text
- ✅ Professional project pages
- ✅ Backward compatible with existing projects

**Manage your portfolio the modern way: Update Notion, see it live!**

---

## 📞 Support

Questions? Check:
1. `/guidelines/QUICK_START_NOTION.md` for quick help
2. `/guidelines/NOTION_INTEGRATION.md` for detailed docs
3. Supabase function logs for debugging
4. Make.com execution logs for webhook issues

---

**Happy syncing! 🚀**
