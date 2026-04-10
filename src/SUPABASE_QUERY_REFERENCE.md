# Supabase Date Range Query Reference

## 📊 Current Implementation (Client-Side)

### **What's Happening Now:**
```typescript
// 1. Fetch ALL blog posts from Supabase
const { data, error } = await supabase
  .from("blog_posts")
  .select("*")
  .order("created_at", { ascending: false });

// 2. Filter in JavaScript (client-side)
const filtered = blogs.filter((blog) => {
  const blogDate = new Date(blog.created_at.split("T")[0] + "T00:00:00");
  const start = startDate ? new Date(startDate + "T00:00:00") : null;
  const end = endDate ? new Date(endDate + "T23:59:59") : null;
  
  return (!start || blogDate >= start) && (!end || blogDate <= end);
});
```

**Pros:**
- ✅ Simple to implement
- ✅ No additional API calls
- ✅ Works with existing code

**Cons:**
- ❌ Loads all posts (slow with 1000+ posts)
- ❌ Wastes bandwidth
- ❌ Filtering happens on client

---

## 🚀 Recommended Implementation (Server-Side)

### **Option 1: Client-Side Supabase Query (Best for Your Current Setup)**

```typescript
/**
 * Fetch blogs with server-side date filtering using Supabase
 * This is the recommended approach for production
 */
const fetchBlogsWithDateFilter = async (
  startDate?: string,  // Format: "YYYY-MM-DD"
  endDate?: string     // Format: "YYYY-MM-DD"
) => {
  const supabase = await createClient();

  // Start with base query
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  // Add start date filter (greater than or equal)
  if (startDate) {
    const startOfDay = getStartOfDayUTC(startDate);
    query = query.gte("created_at", startOfDay);
  }

  // Add end date filter (less than or equal)
  if (endDate) {
    const endOfDay = getEndOfDayUTC(endDate);
    query = query.lte("created_at", endOfDay);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }

  return data || [];
};

// Helper functions (already in your Blog.tsx)
function getStartOfDayUTC(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);
  return localDate.toISOString();
}

function getEndOfDayUTC(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day, 23, 59, 59, 999);
  return localDate.toISOString();
}
```

**Usage in Blog.tsx:**
```typescript
useEffect(() => {
  const fetchFilteredBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogsWithDateFilter(startDate, endDate);
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchFilteredBlogs();
}, [startDate, endDate]);
```

---

### **Option 2: Backend API Endpoint (Most Secure)**

**Backend:** `/supabase/functions/server/index.tsx`
```typescript
// Add this route to your Hono server
app.get("/make-server-27c238f7/blog/posts", async (c) => {
  try {
    // Get query parameters
    const startDate = c.req.query("startDate"); // Format: YYYY-MM-DD
    const endDate = c.req.query("endDate");     // Format: YYYY-MM-DD
    const category = c.req.query("category");
    const search = c.req.query("search");

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (startDate && !dateRegex.test(startDate)) {
      return c.json({ error: "Invalid startDate format. Use YYYY-MM-DD" }, 400);
    }
    
    if (endDate && !dateRegex.test(endDate)) {
      return c.json({ error: "Invalid endDate format. Use YYYY-MM-DD" }, 400);
    }

    // Build Supabase query
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply date filters
    if (startDate) {
      const startOfDay = getStartOfDayUTC(startDate);
      query = query.gte("created_at", startOfDay);
    }

    if (endDate) {
      const endOfDay = getEndOfDayUTC(endDate);
      query = query.lte("created_at", endOfDay);
    }

    // Apply category filter
    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    // Apply search filter
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,` +
        `excerpt.ilike.%${search}%,` +
        `author_name.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Database error:", error);
      return c.json({ error: "Failed to fetch blog posts" }, 500);
    }

    return c.json({ posts: data, count: data.length });
  } catch (err: any) {
    console.error("Server error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

function getStartOfDayUTC(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);
  return localDate.toISOString();
}

function getEndOfDayUTC(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day, 23, 59, 59, 999);
  return localDate.toISOString();
}
```

**Frontend:** `Blog.tsx`
```typescript
const fetchBlogs = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams();
    
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (searchQuery) params.append("search", searchQuery);

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/posts?${params}`,
      {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const { posts } = await response.json();
    setBlogs(posts);
    setFilteredBlogs(posts);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## 📊 Supabase Operators Reference

### **Date Range Operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `.gte(field, value)` | Greater than or equal | `query.gte("created_at", "2025-12-01T00:00:00Z")` |
| `.gt(field, value)` | Greater than | `query.gt("created_at", "2025-12-01T23:59:59Z")` |
| `.lte(field, value)` | Less than or equal | `query.lte("created_at", "2025-12-31T23:59:59Z")` |
| `.lt(field, value)` | Less than | `query.lt("created_at", "2026-01-01T00:00:00Z")` |

### **Why We Use GTE and LTE:**

```typescript
// ✅ CORRECT: Inclusive boundaries (includes full days)
query
  .gte("created_at", "2025-12-10T00:00:00.000Z")  // Start of Dec 10
  .lte("created_at", "2025-12-17T23:59:59.999Z"); // End of Dec 17

// ❌ WRONG: Would exclude boundary posts
query
  .gt("created_at", "2025-12-10T00:00:00.000Z")   // Excludes Dec 10 midnight
  .lt("created_at", "2025-12-17T23:59:59.999Z");  // Excludes Dec 17 end
```

---

## 🎯 Query Examples

### **Example 1: Both Start and End Date**
```typescript
// Filter: Dec 10-17, 2025
const { data } = await supabase
  .from("blog_posts")
  .select("*")
  .gte("created_at", "2025-12-10T00:00:00.000Z")
  .lte("created_at", "2025-12-17T23:59:59.999Z")
  .order("created_at", { ascending: false });

// Result: Posts created between Dec 10 00:00 and Dec 17 23:59 (inclusive)
```

### **Example 2: Start Date Only**
```typescript
// Filter: From Dec 15 onwards
const { data } = await supabase
  .from("blog_posts")
  .select("*")
  .gte("created_at", "2025-12-15T00:00:00.000Z")
  .order("created_at", { ascending: false });

// Result: All posts from Dec 15 onwards
```

### **Example 3: End Date Only**
```typescript
// Filter: Until Dec 10
const { data } = await supabase
  .from("blog_posts")
  .select("*")
  .lte("created_at", "2025-12-10T23:59:59.999Z")
  .order("created_at", { ascending: false });

// Result: All posts up to Dec 10
```

### **Example 4: Same-Day Range**
```typescript
// Filter: Only Dec 10
const { data } = await supabase
  .from("blog_posts")
  .select("*")
  .gte("created_at", "2025-12-10T00:00:00.000Z")
  .lte("created_at", "2025-12-10T23:59:59.999Z")
  .order("created_at", { ascending: false });

// Result: Only posts from Dec 10
```

### **Example 5: Combined Filters**
```typescript
// Filter: Dec 1-31, 2025 + Category "Technology" + Search "React"
const { data } = await supabase
  .from("blog_posts")
  .select("*")
  .gte("created_at", "2025-12-01T00:00:00.000Z")
  .lte("created_at", "2025-12-31T23:59:59.999Z")
  .eq("category", "Technology")
  .or("title.ilike.%React%,excerpt.ilike.%React%,author_name.ilike.%React%")
  .order("created_at", { ascending: false });

// Result: Technology posts about React in December 2025
```

---

## 🔐 Security Best Practices

### **✅ DO:**
```typescript
// Use parameterized queries (Supabase handles this)
query.gte("created_at", userProvidedDate);

// Validate input format
if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
  throw new Error("Invalid date format");
}

// Use service role key on server only
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
```

### **❌ DON'T:**
```typescript
// Don't build SQL strings manually
const sql = `SELECT * FROM posts WHERE created_at >= '${userInput}'`; // SQL INJECTION RISK!

// Don't use service role key on client
const supabase = createClient(url, SERVICE_ROLE_KEY); // SECURITY RISK!

// Don't skip validation
query.gte("created_at", req.query.date); // Missing validation!
```

---

## 📈 Performance Comparison

| Approach | Posts Count | Load Time | Network | Scalability |
|----------|-------------|-----------|---------|-------------|
| **Client-Side** | 100 | ~200ms | All posts | Poor |
| **Client-Side** | 1,000 | ~2s | All posts | Bad |
| **Client-Side** | 10,000 | ~20s | All posts | Unusable |
| **Server-Side** | 100 | ~150ms | Filtered | Good |
| **Server-Side** | 1,000 | ~200ms | Filtered | Good |
| **Server-Side** | 10,000 | ~300ms | Filtered | Excellent |

**Recommendation:** Switch to server-side filtering when you have more than 100 blog posts.

---

## 🔄 Migration Path

### **Phase 1: Current (Client-Side)**
✅ Already implemented  
✅ Works for small datasets  
✅ No backend changes needed

### **Phase 2: Hybrid (Recommended Next Step)**
```typescript
// Keep client-side for now, but prepare server-side logic
const USE_SERVER_SIDE_FILTERING = false; // Feature flag

if (USE_SERVER_SIDE_FILTERING) {
  await fetchBlogsWithDateFilter(startDate, endDate);
} else {
  await fetchAllBlogsAndFilterClient(startDate, endDate);
}
```

### **Phase 3: Full Server-Side (Production)**
- Move all filtering to backend API
- Add pagination support
- Implement caching strategy
- Add database indexes on `created_at` field

---

## 📝 Database Indexes (Future Optimization)

When you have 1000+ posts, add these indexes:

```sql
-- Create index on created_at for faster date range queries
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Create composite index for date + category filtering
CREATE INDEX idx_blog_posts_created_category ON blog_posts(created_at DESC, category);

-- Create full-text search index (if using PostgreSQL full-text search)
CREATE INDEX idx_blog_posts_search ON blog_posts 
  USING GIN(to_tsvector('english', title || ' ' || excerpt || ' ' || author_name));
```

---

**Last Updated:** December 11, 2025  
**Status:** ✅ Reference Ready  
**Recommended:** Option 1 (Client-Side Supabase Query) for your current setup
