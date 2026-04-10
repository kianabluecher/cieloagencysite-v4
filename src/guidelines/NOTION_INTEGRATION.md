# Notion → Supabase Portfolio Integration

This guide explains how to connect your Notion "Portfolio" database to the CIELO website's Supabase backend for automatic portfolio synchronization.

---

## 📋 Overview

The integration allows you to:
- Manage all portfolio projects in Notion
- Automatically sync to Supabase when changes are made
- Display portfolio projects on the website with full Notion data
- Support rich media galleries, tags, status, and external links

---

## 🗂️ Notion Database Setup

### 1. Create a Notion Database

Create a new database in Notion called **"Portfolio"** with the following properties:

| Property Name | Type | Description | Example |
|--------------|------|-------------|---------|
| **title** (or Name) | Title | Project title | "Welda Club" |
| **id** | Text | Unique identifier (lowercase-kebab-case) | "welda-club" |
| **client** | Text | Client name | "Welda" |
| **date** | Date | Project date | "2025" |
| **category** | Select | Project category | "Branding & Design" |
| **description** | Text | Main project description | "Premium golf club..." |
| **status** | Select | Project status | "Completed" or "Draft" |
| **featured** | Checkbox | Featured on homepage | ✓ |
| **link** | URL | External project link | "https://..." |
| **tags** | Multi-select | Project tags | "Golf, Luxury, Leisure" |
| **cover** | File/URL | Hero cover image | Upload or URL |
| **media** | Files | Gallery images | Multiple uploads |

### 2. Select Options Setup

**Category Options:**
- Branding & Design
- Web Development
- Social Media
- Photography
- Marketing
- Consulting

**Status Options:**
- Draft
- In Progress
- Completed
- Archived

**Tags (Examples):**
- Golf, Luxury, Leisure, Technology, AI, Coaching, B2B, SaaS, etc.

---

## 🔗 Integration Methods

You have **3 options** to sync Notion → Supabase:

### Option 1: Make.com (Recommended)

**Step 1: Create a Make.com Scenario**

1. Go to [Make.com](https://www.make.com) and create a new scenario
2. Add **Notion Trigger**: "Watch Database Items"
   - Connect your Notion account
   - Select your "Portfolio" database
   - Set trigger to "Any change"

**Step 2: Add HTTP Module**

3. Add **HTTP > Make a Request** module
4. Configure:
   - **URL**: `https://[YOUR-PROJECT-ID].supabase.co/functions/v1/make-server-27c238f7/portfolio/notion-webhook`
   - **Method**: POST
   - **Headers**:
     ```
     Content-Type: application/json
     Authorization: Bearer [YOUR-SUPABASE-ANON-KEY]
     ```

**Step 3: Map Notion Fields**

5. In the HTTP module Body, map Notion properties to JSON:

```json
{
  "id": "{{notion.properties.id.text}}",
  "title": "{{notion.properties.title.title[0].plain_text}}",
  "client": "{{notion.properties.client.text}}",
  "date": "{{notion.properties.date.date.start}}",
  "category": "{{notion.properties.category.select.name}}",
  "description": "{{notion.properties.description.text}}",
  "cover": "{{notion.cover.file.url}}",
  "link": "{{notion.properties.link.url}}",
  "tags": {{notion.properties.tags.multi_select}},
  "status": "{{notion.properties.status.select.name}}",
  "featured": {{notion.properties.featured.checkbox}},
  "media": {{notion.properties.media.files}}
}
```

6. **Activate** the scenario

---

### Option 2: Zapier

**Step 1: Create a Zap**

1. **Trigger**: Notion - Updated Database Item
   - Choose your Portfolio database
   - Select all triggers (Create, Update)

**Step 2: Action**

2. **Action**: Webhooks by Zapier - POST
   - **URL**: `https://[YOUR-PROJECT-ID].supabase.co/functions/v1/make-server-27c238f7/portfolio/notion-webhook`
   - **Payload Type**: JSON
   - **Headers**:
     ```
     Content-Type: application/json
     Authorization: Bearer [YOUR-SUPABASE-ANON-KEY]
     ```

**Step 3: Map Fields**

3. In Data section, map Notion fields to the JSON schema below

---

### Option 3: Manual API Call (Testing)

For testing or manual sync, you can call the API directly:

```bash
curl -X POST https://[YOUR-PROJECT-ID].supabase.co/functions/v1/make-server-27c238f7/portfolio/sync-notion \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [YOUR-SUPABASE-ANON-KEY]" \
  -d '{
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
  }'
```

---

## 📊 JSON Schema

### Expected JSON Format

```typescript
{
  "id": string,              // Required: unique identifier (e.g., "welda-club")
  "title": string,           // Required: project title
  "client": string,          // Optional: client name
  "date": string,            // Required: project date/year
  "category": string,        // Required: project category
  "description": string,     // Required: main description
  "media": [                 // Optional: array of gallery images
    {
      "url": string,         // Image URL
      "alt": string          // Alt text for SEO
    }
  ],
  "cover": string,           // Optional: hero cover image URL
  "link": string,            // Optional: external project link
  "tags": string[],          // Optional: array of tags
  "status": string,          // Optional: "Draft" | "Completed" | etc.
  "featured": boolean        // Optional: show on homepage
}
```

---

## 🎨 Frontend Data Binding

The portfolio data is automatically bound to these components:

### Components That Use Portfolio Data:

1. **FeaturedWork** (`/components/FeaturedWork.tsx`)
   - Shows featured projects (featured: true)
   - Displays: title, subtitle/category, cover image

2. **WorkGallery** (`/components/WorkGallery.tsx`)
   - Shows all projects in masonry layout
   - Displays: title, subtitle/category, cover image

3. **PortfolioDetail** (`/components/pages/PortfolioDetail.tsx`)
   - Full project page
   - Displays: ALL fields including:
     - Hero cover image
     - Title, client, category, date, status
     - Full description
     - Tags as badges
     - External link button
     - Media gallery with alt text

### Field Mapping:

| Notion Field | Website Element | Component |
|--------------|----------------|-----------|
| title | `<h1>` heading | PortfolioDetail |
| client | Metadata section | PortfolioDetail |
| date | Metadata section | PortfolioDetail |
| category | Badge/Label | All components |
| description | Body paragraph | PortfolioDetail |
| cover | Hero image | PortfolioDetail |
| media[] | Gallery component | PortfolioDetail |
| media[].alt | `<img alt="">` | PortfolioDetail |
| link | External link button | PortfolioDetail |
| tags[] | Tag badges | PortfolioDetail |
| status | Status badge | PortfolioDetail |

---

## 🔄 How Sync Works

### Automatic Workflow:

1. **User updates Notion** → Changes title, adds images, updates status
2. **Make.com/Zapier detects change** → Triggers within seconds
3. **Webhook fires** → Sends JSON to Supabase endpoint
4. **Server processes data** → Validates and transforms Notion format
5. **Supabase stores** → Saved as `portfolio:project:{id}` in kv_store
6. **Cache invalidated** → Next page load fetches fresh data
7. **Website updates** → New content appears immediately

### Data Flow:

```
Notion Database
    ↓ (webhook)
Make.com / Zapier
    ↓ (HTTP POST)
Supabase Edge Function
    ↓ (kv.set)
Supabase kv_store Table
    ↓ (API fetch)
React Frontend
    ↓ (render)
Portfolio Pages
```

---

## 🔐 Security & Environment Variables

### Required Secrets:

The following environment variables are already configured in Supabase:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public anon key (safe for client-side)
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side key (never expose)

### Finding Your Keys:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy:
   - **URL**: `https://[project-id].supabase.co`
   - **anon/public key**: For Authorization header
   - **service_role key**: Already configured server-side

---

## 🧪 Testing the Integration

### Test Checklist:

1. **Create a test project in Notion**
   ```
   ID: test-project-1
   Title: Test Project
   Category: Branding & Design
   Status: Draft
   ```

2. **Verify webhook fires**
   - Check Make.com/Zapier execution logs
   - Should see successful HTTP POST

3. **Check Supabase logs**
   - Go to Supabase Dashboard → Functions → Logs
   - Look for: "Portfolio project synced from Notion: test-project-1"

4. **Verify data in database**
   - Go to Supabase Dashboard → Table Editor
   - Open `kv_store_27c238f7` table
   - Find key: `portfolio:project:test-project-1`
   - Value should contain your JSON

5. **Check website**
   - Navigate to Portfolio page
   - Verify test project appears
   - Click to view detail page
   - Confirm all fields display correctly

### Debugging:

**If sync fails:**

1. Check Make.com/Zapier logs for errors
2. Verify Authorization header has correct key
3. Check Supabase Function logs for detailed errors
4. Ensure Notion field names match exactly (case-sensitive)
5. Validate JSON format in webhook payload

**Common Issues:**

- **401 Unauthorized**: Wrong Authorization key
- **400 Bad Request**: Missing `id` field or invalid JSON
- **500 Server Error**: Check Supabase function logs

---

## 📝 Example Notion Entry

Here's a complete example entry in your Notion database:

| Field | Value |
|-------|-------|
| **id** | welda-club |
| **title** | Welda Club |
| **client** | Welda |
| **date** | 2025 |
| **category** | Branding & Design |
| **description** | Premium golf club and leisure destination branding. Created a sophisticated brand identity to attract affluent members. |
| **status** | Completed |
| **featured** | ✓ |
| **link** | https://cielo.agency/projects/welda-club |
| **tags** | Golf, Luxury, Leisure |
| **cover** | [Upload image or paste URL] |
| **media** | [Upload 3-5 gallery images] |

---

## 🎯 Best Practices

### Notion Management:

1. **Use consistent ID format**
   - Lowercase, kebab-case: `project-name`
   - No spaces or special characters
   - Keep it short and descriptive

2. **Fill all required fields**
   - id, title, date, category, description
   - These ensure proper display on website

3. **Optimize images**
   - Use WebP or JPG format
   - Keep under 500KB each
   - Recommended size: 1920x1080px

4. **Write clear alt text**
   - Describe what's in the image
   - Good for SEO and accessibility
   - Example: "Welda Club logo grid showing variations"

5. **Use Status field strategically**
   - "Draft" = Hidden from public
   - "Completed" = Live on website
   - Filter views in Notion by status

6. **Tag consistently**
   - Create tag standards (e.g., always capitalize)
   - Don't create too many similar tags
   - Use for filtering and categorization

---

## 🚀 Advanced Features

### Conditional Display:

Projects are automatically filtered based on:
- **Featured projects**: Show in FeaturedWork component
- **Status = "Completed"**: Display on public portfolio
- **Status = "Draft"**: Hidden from website (still in database)

### Custom Ordering:

Projects display in this order by default:
1. welda-club
2. ai-insiders
3. acenos-x
4. parceros-capital
5. All others (by creation date)

To change order, modify `/supabase/functions/server/index.tsx` line 66:

```typescript
const projectOrder = ['your-project-1', 'your-project-2', ...];
```

### Performance:

- **Caching**: Portfolio data cached for 1 hour
- **Cache invalidation**: Auto-clears when Notion updates
- **Lazy loading**: Images load progressively
- **Sequential loading**: Smooth staggered animations

---

## 📞 Support

If you need help setting up the integration:

1. Check this documentation thoroughly
2. Review Make.com/Zapier execution logs
3. Check Supabase function logs in Dashboard
4. Verify all field names match exactly
5. Test with a simple project first

---

## ✅ Completion Checklist

- [ ] Created Notion "Portfolio" database
- [ ] Added all required properties
- [ ] Set up Make.com or Zapier scenario
- [ ] Configured webhook URL with correct project ID
- [ ] Added Authorization header with anon key
- [ ] Mapped all Notion fields to JSON
- [ ] Activated automation
- [ ] Created test project in Notion
- [ ] Verified sync in Supabase logs
- [ ] Confirmed data in kv_store table
- [ ] Checked portfolio appears on website
- [ ] Tested detail page displays correctly

---

**Your Notion → Supabase portfolio sync is now complete! 🎉**

Every change you make in Notion will automatically update your website within seconds.
