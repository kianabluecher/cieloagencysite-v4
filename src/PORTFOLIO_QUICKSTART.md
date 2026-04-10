# 📸 Portfolio System - Quick Start

## ⚡ 3-Minute Setup

### Step 1: Run Migration (1 minute)
```sql
-- In Supabase SQL Editor, run:
/sql_migrations/create_portfolio_table.sql
```

### Step 2: Verify (30 seconds)
```sql
SELECT COUNT(*) FROM portfolio_projects;
-- Should return 4 (sample projects)
```

### Step 3: Test (1 minute)
- Visit `/portfolio` → See projects
- Click a project → View details
- Go to `/portfolio-admin` → Manage projects

✅ Done!

---

## 🎯 Common Tasks

### View All Projects
```sql
SELECT id, title, category, view_count, featured 
FROM portfolio_projects 
WHERE published = true 
ORDER BY featured DESC, created_at DESC;
```

### Add New Project (Admin Panel)
1. Go to `/portfolio-admin`
2. Fill in project details
3. Upload images
4. Toggle "Featured" if needed
5. Click "Save"

### Mark as Featured
```sql
UPDATE portfolio_projects 
SET featured = true 
WHERE id = 'project-id';
```

### Hide Project (Don't Delete)
```sql
UPDATE portfolio_projects 
SET published = false 
WHERE id = 'project-id';
```

### View Analytics
```sql
-- Most viewed projects
SELECT id, title, view_count 
FROM portfolio_projects 
ORDER BY view_count DESC 
LIMIT 10;

-- Views by category
SELECT category, SUM(view_count) as total_views 
FROM portfolio_projects 
GROUP BY category;
```

---

## 📊 Database Structure

```
portfolio_projects
├── id (text) - Unique identifier
├── title (text) - Project title
├── subtitle (text) - Short description
├── category (text) - Branding, Web Design, etc.
├── project_type (text) - Type of project
├── client_type (text) - Industry/client type
├── description (text) - Full description
├── what_we_did (text[]) - Array of deliverables
├── result (text) - Project outcome
├── images (text[]) - Array of image URLs
├── date_label (text) - Display date (e.g., "2025")
├── featured (boolean) - Show prominently
├── published (boolean) - Visible to public
├── view_count (integer) - Auto-increments
├── created_at (timestamp) - Auto-set
└── updated_at (timestamp) - Auto-updated
```

---

## 🔌 API Endpoints

All use: `https://{projectId}.supabase.co/functions/v1/make-server-27c238f7`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/portfolio/projects` | All published projects |
| GET | `/portfolio/projects/:id` | Single project (increments views) |
| POST | `/portfolio/projects` | Create project (admin) |
| PUT | `/portfolio/projects/:id` | Update project (admin) |
| DELETE | `/portfolio/projects/:id` | Delete project (admin) |
| POST | `/portfolio/upload` | Upload image |
| POST | `/portfolio/init` | Initialize sample data |

---

## 🎨 Frontend Pages

- `/portfolio` - Public portfolio showcase
- `/portfolio/:id` - Project detail page
- `/portfolio-admin` - Admin management panel
- `/notion-sync` - Notion integration (optional)

---

## ✨ Key Features

✅ View tracking (auto-increments on detail page view)
✅ Featured projects (show first in list)
✅ Published status (hide without deleting)
✅ Fast indexed queries
✅ RLS security policies
✅ Automatic timestamps
✅ Image upload to Supabase Storage
✅ Caching for performance

---

## 🚨 Troubleshooting

**No projects showing?**
```sql
-- Check if data exists
SELECT COUNT(*) FROM portfolio_projects;

-- If zero, initialize
-- Call POST /portfolio/init endpoint
```

**Projects exist but not visible?**
```sql
-- Make sure they're published
UPDATE portfolio_projects SET published = true;
```

**Images not loading?**
- Images stored as URLs in `images` array
- Use Supabase Storage or Figma assets
- Check image URLs are valid

---

## 📝 Next Steps

1. **Add real projects** via `/portfolio-admin`
2. **Upload images** to Supabase Storage
3. **Mark best projects** as featured
4. **Monitor analytics** in Supabase dashboard
5. **Customize categories** as needed

---

## 📚 Full Documentation

- **Migration Guide**: `/PORTFOLIO_MIGRATION_GUIDE.md`
- **SQL Migration**: `/sql_migrations/create_portfolio_table.sql`
- **System Status**: `/SYSTEM_STATUS.md`

---

*Quick start guide for CIELO Agency Portfolio System*
*Updated: November 7, 2025*
