# 📊 Blog Posts Table Structure

## Complete Field Reference

| Field Name | Type | Required | Default | Description | Example |
|------------|------|----------|---------|-------------|---------|
| **id** | UUID | Auto | gen_random_uuid() | Unique identifier | `a1b2c3d4-...` |
| **slug** | text | ✅ Yes | - | URL-friendly ID (unique) | `from-pixels-to-products` |
| **title** | text | ✅ Yes | - | Blog post title | `"How to Ship Faster"` |
| **excerpt** | text | No | null | Short summary | `"Learn to ship..."` |
| **content** | text | No | null | Full post content (MD/HTML) | `"# Article\n\nContent..."` |
| **featured_image** | text | No | null | Main image URL | `https://images.unsplash.com/...` |
| **featured_image_alt** | text | No | null | Image alt text | `"Designer at computer"` |
| **thumbnail** | text | No | null | Thumbnail URL | `https://images.unsplash.com/...` |
| **author_name** | text | ✅ Yes | - | Author's name | `"Olivia Johnson"` |
| **author_avatar** | text | No | null | Author photo URL | `https://images.unsplash.com/...` |
| **author_bio** | text | No | null | Short bio | `"Senior Designer at..."` |
| **author_role** | text | No | null | Job title | `"Senior Product Designer"` |
| **author_id** | UUID | No | null | Links to auth.users | `e5f6g7h8-...` |
| **category** | text | No | null | Post category | `"Articles"` |
| **tags** | text[] | No | [] | Array of tags | `["design", "productivity"]` |
| **meta_title** | text | No | null | SEO title | `"Ship Faster - Designer Guide"` |
| **meta_description** | text | No | null | SEO description | `"Complete guide to..."` |
| **meta_keywords** | text[] | No | [] | SEO keywords | `["design", "shipping"]` |
| **published** | boolean | No | false | Is it live? | `true` / `false` |
| **featured** | boolean | No | false | Show in featured? | `true` / `false` |
| **published_at** | timestamptz | No | null | When published | `2025-03-13T00:00:00Z` |
| **scheduled_for** | timestamptz | No | null | Schedule for future | `2025-03-20T09:00:00Z` |
| **read_time_minutes** | integer | No | null | Estimated read time | `8` |
| **view_count** | integer | No | 0 | Page views | `1250` |
| **like_count** | integer | No | 0 | Likes/reactions | `45` |
| **share_count** | integer | No | 0 | Social shares | `12` |
| **related_post_ids** | UUID[] | No | [] | Related posts | `[uuid1, uuid2]` |
| **allow_comments** | boolean | No | true | Enable comments? | `true` / `false` |
| **show_in_feed** | boolean | No | true | Show in RSS? | `true` / `false` |
| **created_at** | timestamptz | Auto | now() | When created | `2025-03-13T10:30:00Z` |
| **updated_at** | timestamptz | Auto | now() | Last updated (auto) | `2025-03-14T15:20:00Z` |
| **last_edited_by** | UUID | No | null | Who edited last | `i9j0k1l2-...` |

---

## Field Categories

### 🆔 Identification (2 fields)
- id, slug

### 📝 Content (3 fields)
- title, excerpt, content

### 🖼️ Media (3 fields)
- featured_image, featured_image_alt, thumbnail

### 👤 Author (5 fields)
- author_name, author_avatar, author_bio, author_role, author_id

### 🏷️ Categorization (2 fields)
- category, tags[]

### 🔍 SEO (3 fields)
- meta_title, meta_description, meta_keywords[]

### 📅 Publishing (4 fields)
- published, featured, published_at, scheduled_for

### 📊 Analytics (4 fields)
- read_time_minutes, view_count, like_count, share_count

### ⚙️ Settings (3 fields)
- related_post_ids[], allow_comments, show_in_feed

### 🕐 Timestamps (3 fields)
- created_at, updated_at, last_edited_by

---

## Total: 32 Fields

### Required Fields (3):
1. slug
2. title
3. author_name

### Auto-Generated (3):
1. id
2. created_at
3. updated_at

### Optional (26):
All other fields are optional with sensible defaults.

---

## Example Row

| Field | Value |
|-------|-------|
| slug | `from-pixels-to-products` |
| title | `From Pixels to Products: How Designers Can Learn to Ship Faster` |
| excerpt | `Learn how designers can transition from creating beautiful mockups to shipping functional products faster.` |
| category | `Articles` |
| author_name | `Olivia Johnson` |
| author_role | `Senior Product Designer` |
| tags | `["design", "productivity", "workflow"]` |
| published | `true` |
| featured | `true` |
| view_count | `1250` |
| like_count | `45` |
| read_time_minutes | `8` |

---

## Indexes for Performance

These indexes are automatically created:

1. `idx_blog_posts_slug` - Fast lookup by slug
2. `idx_blog_posts_published` - Filter published posts
3. `idx_blog_posts_featured` - Find featured posts
4. `idx_blog_posts_category` - Filter by category
5. `idx_blog_posts_published_at` - Sort by publish date
6. `idx_blog_posts_author_name` - Filter by author
7. `idx_blog_posts_tags` - Search tags (GIN index)
8. `idx_blog_posts_created_at` - Sort by creation date

---

## Security (RLS Policies)

| User Type | SELECT | INSERT | UPDATE | DELETE |
|-----------|--------|--------|--------|--------|
| **Public (anon)** | ✅ Published only | ❌ No | ❌ No | ❌ No |
| **Authenticated** | ✅ All posts | ✅ Yes | ✅ Yes | ✅ Yes |
| **Service Role** | ✅ All | ✅ Yes | ✅ Yes | ✅ Yes |

---

## Data Types Explained

- **UUID**: Universal Unique Identifier (e.g., `a1b2c3d4-e5f6-7890-...`)
- **text**: String/text of any length
- **text[]**: Array of text values (e.g., `["tag1", "tag2"]`)
- **boolean**: True or false
- **integer**: Whole number (e.g., `5`, `100`)
- **timestamptz**: Timestamp with timezone (e.g., `2025-03-13T10:30:00Z`)
- **UUID[]**: Array of UUIDs (e.g., `[uuid1, uuid2]`)

---

## Import/Export

### Export as CSV:
```sql
COPY (
  SELECT * FROM blog_posts 
  WHERE published = true 
  ORDER BY published_at DESC
) TO '/tmp/blog_posts.csv' WITH CSV HEADER;
```

### Export as JSON:
```sql
SELECT json_agg(row_to_json(t)) 
FROM (
  SELECT * FROM blog_posts 
  WHERE published = true 
  ORDER BY published_at DESC
) t;
```

---

## Quick Stats Query

```sql
SELECT 
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published,
  COUNT(*) FILTER (WHERE published = false) as drafts,
  COUNT(*) FILTER (WHERE featured = true) as featured,
  COUNT(DISTINCT category) as categories,
  COUNT(DISTINCT author_name) as authors,
  SUM(view_count) as total_views,
  SUM(like_count) as total_likes,
  AVG(read_time_minutes) as avg_read_time
FROM blog_posts;
```
