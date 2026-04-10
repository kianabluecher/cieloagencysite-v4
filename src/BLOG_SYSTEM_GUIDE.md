# 📝 Blog System Guide - CIELO Agency

## ✅ What's Been Created

I've set up a complete blog post management system for your CIELO Agency website with:

1. **Supabase Table** - `blog_posts` with comprehensive fields
2. **API Endpoints** - 8 endpoints for full CRUD operations
3. **Security** - Row Level Security (RLS) policies
4. **Features** - SEO, analytics, scheduling, and more

---

## 📊 Database Table: `blog_posts`

### Core Fields:
- `id` (UUID) - Unique identifier
- `slug` (text, unique) - URL-friendly identifier (e.g., "from-pixels-to-products")
- `title` (text) - Blog post title
- `excerpt` (text) - Short summary/preview
- `content` (text) - Full blog post content (Markdown or HTML)

### Media:
- `featured_image` (text) - Main blog image URL
- `featured_image_alt` (text) - Alt text for accessibility
- `thumbnail` (text) - Smaller image for cards

### Author Info:
- `author_name` (text) - Author's name
- `author_avatar` (text) - Author profile picture URL
- `author_bio` (text) - Short bio
- `author_role` (text) - Role/title
- `author_id` (UUID) - Links to Supabase auth user

### Categorization:
- `category` (text) - e.g., "Articles", "Workflows", "News"
- `tags` (text[]) - Array of tags for filtering

### SEO:
- `meta_title` (text) - Custom SEO title
- `meta_description` (text) - Custom SEO description
- `meta_keywords` (text[]) - SEO keywords array

### Publishing:
- `published` (boolean) - Is it live?
- `featured` (boolean) - Show in featured section?
- `published_at` (timestamp) - When published
- `scheduled_for` (timestamp) - Schedule for future

### Analytics:
- `read_time_minutes` (integer) - Estimated read time
- `view_count` (integer) - Page views
- `like_count` (integer) - Likes/reactions
- `share_count` (integer) - Social shares

### Settings:
- `allow_comments` (boolean) - Enable comments?
- `show_in_feed` (boolean) - Show in RSS/feed?
- `related_post_ids` (UUID[]) - Related blog posts

### Timestamps:
- `created_at` (timestamp) - When created
- `updated_at` (timestamp) - Last updated (auto)
- `last_edited_by` (UUID) - Who edited last

---

## 🔌 API Endpoints

### Public Endpoints (No Auth Required)

#### 1. Get Published Posts
```
GET /make-server-27c238f7/blog/posts
```

**Query Parameters:**
- `category` - Filter by category
- `tag` - Filter by tag
- `featured` - Set to "true" for featured only
- `limit` - Number of posts (default: 10)
- `offset` - Pagination offset (default: 0)

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/posts?category=Articles&limit=20`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const { posts } = await response.json();
```

**Response:**
```json
{
  "posts": [
    {
      "id": "uuid",
      "slug": "from-pixels-to-products",
      "title": "From Pixels to Products: How Designers Can Learn to Ship Faster",
      "excerpt": "A guide to shipping faster...",
      "featured_image": "https://...",
      "author_name": "Olivia Johnson",
      "author_avatar": "https://...",
      "category": "Articles",
      "tags": ["design", "productivity"],
      "published": true,
      "featured": true,
      "published_at": "2025-03-13T00:00:00Z",
      "read_time_minutes": 8,
      "view_count": 1250,
      "like_count": 45
    }
  ]
}
```

---

#### 2. Get Single Post by Slug
```
GET /make-server-27c238f7/blog/posts/:slug
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/posts/from-pixels-to-products`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const { post } = await response.json();
```

**Note:** Automatically increments `view_count` when accessed.

---

#### 3. Like a Post
```
POST /make-server-27c238f7/blog/posts/:id/like
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/posts/${postId}/like`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const { like_count } = await response.json();
```

---

### Admin Endpoints (Require Authentication)

#### 4. Get All Posts (Including Drafts)
```
GET /make-server-27c238f7/blog/admin/posts
```

**Query Parameters:**
- `status` - Filter by status: "published", "draft", "scheduled"
- `limit` - Number of posts (default: 50)
- `offset` - Pagination offset

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/admin/posts?status=draft`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}` // User's access token
    }
  }
);
const { posts } = await response.json();
```

---

#### 5. Create New Post
```
POST /make-server-27c238f7/blog/admin/posts
```

**Required Fields:**
- `slug` - URL-friendly identifier
- `title` - Post title
- `author_name` - Author's name

**Example:**
```javascript
const newPost = {
  slug: "my-new-blog-post",
  title: "My New Blog Post",
  excerpt: "This is a short summary...",
  content: "# Full Content\n\nMarkdown or HTML content here...",
  featured_image: "https://images.unsplash.com/...",
  featured_image_alt: "Description of image",
  author_name: "John Doe",
  author_avatar: "https://...",
  author_role: "Content Writer",
  category: "Articles",
  tags: ["design", "tutorial"],
  published: true,
  featured: false,
  read_time_minutes: 5
};

const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/admin/posts`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(newPost)
  }
);
const { post } = await response.json();
```

---

#### 6. Update Post
```
PUT /make-server-27c238f7/blog/admin/posts/:id
```

**Example:**
```javascript
const updates = {
  title: "Updated Title",
  content: "Updated content...",
  published: true
};

const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/admin/posts/${postId}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(updates)
  }
);
const { post } = await response.json();
```

**Auto-features:**
- Sets `published_at` when publishing
- Updates `last_edited_by` to current user
- Auto-updates `updated_at` timestamp

---

#### 7. Delete Post
```
DELETE /make-server-27c238f7/blog/admin/posts/:id
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/admin/posts/${postId}`,
  {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
);
const { message } = await response.json();
```

---

## 🔒 Security (Row Level Security)

### Public Access:
- ✅ **Can view** published posts only
- ❌ **Cannot view** drafts or scheduled posts
- ❌ **Cannot create/edit/delete** posts

### Authenticated Users:
- ✅ **Can view** all posts (including drafts)
- ✅ **Can create** new posts
- ✅ **Can update** any post
- ✅ **Can delete** any post

### Service Role:
- ✅ **Full access** to everything

---

## 🚀 How to Deploy

### Step 1: Run SQL Migration

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Copy contents of `/RUN_THIS_IN_SUPABASE.sql`
4. Paste and click **"Run"**
5. Verify `blog_posts` table appears in Table Editor

### Step 2: Insert Sample Data (Optional)

Run this SQL to add the posts currently in your code:

```sql
INSERT INTO blog_posts (
  slug, title, category, author_name, author_avatar,
  featured_image, published, featured, published_at
) VALUES
(
  'from-pixels-to-products',
  'From Pixels to Products: How Designers Can Learn to Ship Faster',
  'Articles',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'figma:asset/1e6d6ad6891a58cf2e6eee7aa570deaaeaa70bd7.png',
  true,
  true,
  '2025-03-13T00:00:00Z'
),
(
  'designing-clean-product-ui',
  'Designing a Clean Product UI with Figma and shadcn/ui',
  'Articles',
  'Sophia Martinez',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  'figma:asset/1e6d6ad6891a58cf2e6eee7aa570deaaeaa70bd7.png',
  true,
  false,
  '2025-03-13T00:00:00Z'
),
(
  'semantic-color-naming-system',
  'A Semantic Color Naming System to Align the Team',
  'Articles',
  'James Franklin',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
  'figma:asset/1e6d6ad6891a58cf2e6eee7aa570deaaeaa70bd7.png',
  true,
  false,
  '2025-03-13T00:00:00Z'
),
(
  'touching-grass-solo-designer',
  'Why Touching Grass as a Solo Designer Is Important for Your Mental Health',
  'Workflows',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'figma:asset/17532d1b04c83e56cb933227d60eca4e12b83f55.png',
  true,
  false,
  '2025-03-13T00:00:00Z'
),
(
  'mobile-experience-design',
  'Think About the Mobile Experience: Designing for a Mobile-First World',
  'News',
  'Ethan Brooks',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  'figma:asset/17532d1b04c83e56cb933227d60eca4e12b83f55.png',
  true,
  false,
  '2025-03-13T00:00:00Z'
),
(
  'building-design-systems-scale',
  'Building Design Systems That Scale: Lessons from the Trenches',
  'Articles',
  'Sarah Chen',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop',
  'figma:asset/1e6d6ad6891a58cf2e6eee7aa570deaaeaa70bd7.png',
  true,
  false,
  '2025-03-12T00:00:00Z'
);
```


### Step 3: Update Your Blog Component (Optional)

Update `/components/pages/Blog.tsx` to fetch from Supabase:

```typescript
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function Blog({ onNavigate }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/posts?limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const { posts } = await response.json();
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  // Rest of your component...
}
```

---

## 📈 Features

### ✅ Current Features:
- Full CRUD operations
- Published/draft status
- Featured posts
- Category & tag filtering
- View counter
- Like counter
- SEO fields
- Author management
- Scheduled publishing
- Related posts
- Auto-updating timestamps
- Slug-based URLs

### 🚀 Future Enhancements:
- [ ] Comments system
- [ ] Search functionality
- [ ] Rich text editor integration
- [ ] Image upload to Supabase Storage
- [ ] RSS feed generation
- [ ] Social sharing integration
- [ ] Reading progress tracker
- [ ] Newsletter integration

---

## 🧪 Testing

### Test Public Access:
```bash
# Get all published posts
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-27c238f7/blog/posts \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Get post by slug
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-27c238f7/blog/posts/from-pixels-to-products \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Test Admin Access:
```bash
# Create post
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-27c238f7/blog/admin/posts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-post",
    "title": "Test Post",
    "author_name": "Test Author",
    "published": true
  }'
```

---

## 📁 Files Created

- `/sql_migrations/create_blog_posts_table.sql` - SQL for blog table only
- `/RUN_THIS_IN_SUPABASE.sql` - Complete migration (includes blog)
- `/supabase/functions/server/index.tsx` - API endpoints added
- `/BLOG_SYSTEM_GUIDE.md` - This guide

---

## ✅ Summary

**What you have:**
```
✅ blog_posts table in Supabase
✅ 8 API endpoints (3 public, 5 admin)
✅ Row Level Security
✅ SEO optimization fields
✅ Analytics tracking
✅ Draft & scheduling support
✅ Complete documentation
```

**What you need to do:**
```
1. Run /RUN_THIS_IN_SUPABASE.sql
2. (Optional) Insert sample data
3. (Optional) Update Blog.tsx to fetch from API
4. Start creating blog posts!
```

---

## 🎉 You're Ready!

Your blog system is fully set up and ready to use. Just run the SQL migration and you can start managing blog posts through the API or directly in Supabase!
