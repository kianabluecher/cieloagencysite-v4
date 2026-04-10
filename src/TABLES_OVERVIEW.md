# 📊 Database Tables Overview

After running `/RUN_THIS_IN_SUPABASE.sql`, you'll have these tables:

---

## ✅ Tables You'll Have (7 Total)

### 1. `blog_posts` ⭐ NEW!
**Purpose**: Store all blog posts with full content management

**Key Fields:**
- URL: slug (unique, URL-friendly)
- Content: title, excerpt, content
- Media: featured_image, thumbnail
- Author: author_name, author_avatar, author_bio, author_role
- Organization: category, tags[]
- SEO: meta_title, meta_description, meta_keywords[]
- Publishing: published, featured, published_at, scheduled_for
- Analytics: view_count, like_count, share_count, read_time_minutes
- Settings: allow_comments, show_in_feed
- Auto: created_at, updated_at, last_edited_by

**Features:**
- ✅ Public can view published posts
- ✅ Authenticated users manage all posts
- ✅ Auto view/like counters
- ✅ SEO optimization
- ✅ Draft & scheduled publishing
- ✅ Tag & category filtering
- ✅ Slug-based URLs

**Used By:**
- Blog page
- Blog admin
- RSS feeds
- SEO optimization

---

### 2. `portfolio_projects` ⭐ NEW!
**Purpose**: Store all portfolio/case study projects

**Key Fields:**
- Basic: title, client, description, excerpt
- Details: industry, services[], project_date, project_url
- Media: featured_image, gallery_images[], thumbnail
- Content: challenge, solution, results
- Social proof: testimonial, testimonial_author, testimonial_role
- Data: metrics (JSON)
- Organization: tags[], category
- Status: published (boolean), featured (boolean)
- Analytics: view_count
- Auto: created_at, updated_at

**Features:**
- ✅ Public can view published projects
- ✅ Authenticated users manage all projects
- ✅ Auto view counter
- ✅ Image galleries
- ✅ Featured/published flags

**Used By:**
- Portfolio page
- Case studies
- Featured work sections
- Project admin

---

### 3. `diy_to_credible_brand_submissions`
**Purpose**: DIY Brand → Credible Brand form submissions

**Key Fields:**
- Contact: email (unique), company_name, website, industry
- Analysis: target_audience, brand_challenges[], competitors[]
- Goals: unique_value_proposition, primary_goals[]
- Results: analysis_result (JSON), recommendations (JSON)
- Status: status, priority, assigned_to, notes
- Times: submitted_at, completed_at

**One submission per email** - enforced by unique constraint

---

### 4. `gtm_strategy_submissions`
**Purpose**: GTM Strategy & Funnel form submissions

**Key Fields:**
- Contact: email (unique), company_name, website, industry
- Business: business_stage, product_description, target_market
- Performance: monthly_revenue, customer_acquisition_cost
- GTM: current_channels[], gtm_challenges[]
- Analysis: strategy_analysis (JSON), funnel_recommendations (JSON)
- Status: status, priority, assigned_to

**One submission per email** - enforced by unique constraint

---

### 5. `social_media_submissions`
**Purpose**: Social Media Copy & Calendar form submissions

**Key Fields:**
- Contact: email (unique), company_name, website, industry
- Presence: active_platforms[], platform_handles (JSON)
- Performance: follower_counts (JSON), engagement_rate
- Strategy: social_media_goals[], content_pillars[]
- Analysis: content_strategy (JSON), copy_calendar (JSON)
- Status: status, priority, assigned_to

**One submission per email** - enforced by unique constraint

---

### 6. `sales_offer_submissions`
**Purpose**: How to Sell & Offer form submissions

**Key Fields:**
- Contact: email (unique), company_name, website, industry
- Product: product_service_description, current_price_point
- Sales: current_sales_volume, conversion_rate, average_deal_size
- Process: current_sales_process, lead_sources[]
- Analysis: offer_analysis (JSON), pricing_recommendations (JSON)
- Status: status, priority, assigned_to

**One submission per email** - enforced by unique constraint

---

### 7. `kv_store_27c238f7` (Existing)
**Purpose**: General key-value storage for legacy/misc data

**Fields:**
- key (text, primary key)
- value (jsonb)
- created_at, updated_at

**Used for**: Legacy data, general storage, temporary data

---

## 🔒 Security (Row Level Security)

All tables have RLS enabled with these policies:

### Portfolio Projects:
- ✅ **Public/Anon**: Can view published projects
- ✅ **Authenticated**: Can view/create/update/delete all projects
- ✅ **Service Role**: Full access

### Form Submissions (all 4 tables):
- ✅ **Authenticated**: Can view and update submissions
- ✅ **Service Role**: Full access (for creating submissions via API)
- ❌ **Public**: Cannot directly access (must use API endpoints)

---

## ⚡ Performance Features

### Indexes:
All tables are indexed on commonly queried fields:
- Portfolio: published, featured, category, created_at
- Forms: email, status, priority, submitted_at, assigned_to

### Auto-Timestamps:
All tables have:
- `created_at` - Set once when row is created
- `updated_at` - Auto-updates on every change

### Triggers:
Each table has an auto-update trigger that sets `updated_at = now()` on every UPDATE.

---

## 📈 Table Sizes (Initially)

After running the migration:

```
blog_posts:                        0 rows (will auto-initialize with defaults)
portfolio_projects:                0 rows (will auto-initialize with defaults)
diy_to_credible_brand_submissions: 0 rows
gtm_strategy_submissions:          0 rows
social_media_submissions:          0 rows
sales_offer_submissions:           0 rows
kv_store_27c238f7:                 ? rows (existing data)
```

---

## 🔗 API Endpoints

### Portfolio:
- `GET /make-server-27c238f7/portfolio/projects` - List published
- `GET /make-server-27c238f7/portfolio/projects/:id` - Get one
- `POST /make-server-27c238f7/portfolio/admin/projects` - Create (auth)
- `PUT /make-server-27c238f7/portfolio/admin/projects/:id` - Update (auth)
- `DELETE /make-server-27c238f7/portfolio/admin/projects/:id` - Delete (auth)
- `POST /make-server-27c238f7/portfolio/admin/initialize` - Init defaults (auth)

### DIY Brand Form:
- `POST /make-server-27c238f7/forms/diy-brand/submit` - Submit
- `GET /make-server-27c238f7/forms/diy-brand/submissions` - List (auth)
- `PUT /make-server-27c238f7/forms/diy-brand/submissions/:id` - Update (auth)

### GTM Strategy Form:
- `POST /make-server-27c238f7/forms/gtm-strategy/submit` - Submit
- `GET /make-server-27c238f7/forms/gtm-strategy/submissions` - List (auth)
- `PUT /make-server-27c238f7/forms/gtm-strategy/submissions/:id` - Update (auth)

### Social Media Form:
- `POST /make-server-27c238f7/forms/social-media/submit` - Submit
- `GET /make-server-27c238f7/forms/social-media/submissions` - List (auth)
- `PUT /make-server-27c238f7/forms/social-media/submissions/:id` - Update (auth)

### Sales Offer Form:
- `POST /make-server-27c238f7/forms/sales-offer/submit` - Submit
- `GET /make-server-27c238f7/forms/sales-offer/submissions` - List (auth)
- `PUT /make-server-27c238f7/forms/sales-offer/submissions/:id` - Update (auth)

---

## 📝 Common Queries

### View all tables:
```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
```

### Count rows in each table:
```sql
SELECT 'blog_posts' as table_name, COUNT(*) FROM blog_posts
UNION ALL
SELECT 'portfolio_projects', COUNT(*) FROM portfolio_projects
UNION ALL
SELECT 'diy_brand_submissions', COUNT(*) FROM diy_to_credible_brand_submissions
UNION ALL
SELECT 'gtm_submissions', COUNT(*) FROM gtm_strategy_submissions
UNION ALL
SELECT 'social_submissions', COUNT(*) FROM social_media_submissions
UNION ALL
SELECT 'sales_submissions', COUNT(*) FROM sales_offer_submissions;
```

### View recent portfolio projects:
```sql
SELECT id, title, client, published, featured, created_at
FROM portfolio_projects
ORDER BY created_at DESC
LIMIT 10;
```

### View recent form submissions across all types:
```sql
SELECT 'DIY Brand' as type, email, company_name, submitted_at
FROM diy_to_credible_brand_submissions
UNION ALL
SELECT 'GTM Strategy', email, company_name, submitted_at
FROM gtm_strategy_submissions
UNION ALL
SELECT 'Social Media', email, company_name, submitted_at
FROM social_media_submissions
UNION ALL
SELECT 'Sales Offer', email, company_name, submitted_at
FROM sales_offer_submissions
ORDER BY submitted_at DESC
LIMIT 20;
```

---

## 🎯 Summary

| Table | Purpose | Records | Access |
|-------|---------|---------|--------|
| `blog_posts` | Blog content | Many | Public (read), Auth (full) |
| `portfolio_projects` | Case studies | Many | Public (read), Auth (full) |
| `diy_to_credible_brand_submissions` | Brand forms | 1 per email | Auth only |
| `gtm_strategy_submissions` | GTM forms | 1 per email | Auth only |
| `social_media_submissions` | Social forms | 1 per email | Auth only |
| `sales_offer_submissions` | Sales forms | 1 per email | Auth only |
| `kv_store_27c238f7` | General KV | Varies | Auth only |

**Total Tables**: 7  
**New Tables**: 6  
**Existing Tables**: 1

---

## ✅ All Set!

After running the SQL migration, all these tables will be created and ready to use. Your app will have full portfolio management and form submission capabilities!