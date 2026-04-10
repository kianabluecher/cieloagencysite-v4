# 📊 Google Sheets Integration for Blog Posts

## Option 1: Manual Export to Google Sheets

### Step 1: Export Data from Supabase

Run this query in Supabase SQL Editor:

```sql
SELECT 
  slug,
  title,
  excerpt,
  category,
  author_name,
  author_role,
  tags,
  published,
  featured,
  published_at,
  view_count,
  like_count,
  read_time_minutes,
  created_at
FROM blog_posts
ORDER BY published_at DESC;
```

### Step 2: Copy to Google Sheets

1. Click "Export to CSV" button in Supabase
2. Open Google Sheets
3. File → Import → Upload → Select your CSV
4. Done! ✅

---

## Option 2: Auto-Sync with Make.com/Zapier

### Using Make.com (Integromat)

**Trigger:** Supabase - New Row
**Action:** Google Sheets - Add Row

**Setup:**
1. Go to make.com
2. Create new scenario
3. Add Supabase module (trigger on new blog_posts row)
4. Add Google Sheets module (add row to sheet)
5. Map fields from Supabase to Sheets
6. Activate scenario ✅

### Using Zapier

**Trigger:** Supabase - New Row
**Action:** Google Sheets - Create Spreadsheet Row

**Setup:**
1. Go to zapier.com
2. Create new Zap
3. Trigger: Supabase (requires custom webhook)
4. Action: Google Sheets - Create Row
5. Map fields
6. Turn on Zap ✅

---

## Option 3: Direct API Integration

### Create Sync Endpoint

Add this to `/supabase/functions/server/index.tsx`:

```typescript
// Sync blog posts to Google Sheets
app.post("/make-server-27c238f7/blog/sync-to-sheets", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    // Get all published posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    if (error) {
      return c.json({ error: 'Failed to fetch posts' }, 500);
    }
    
    // TODO: Send to Google Sheets API
    // You'll need to set up Google Sheets API credentials
    
    return c.json({ 
      message: 'Sync initiated',
      posts_count: posts.length 
    });
  } catch (error) {
    return c.json({ error: 'Server error' }, 500);
  }
});
```

---

## Option 4: Google Sheets Template

### Create This Template in Google Sheets:

**Sheet Name:** Blog Posts

**Headers (Row 1):**
```
A: Slug
B: Title
C: Excerpt
D: Category
E: Author Name
F: Author Role
G: Tags
H: Published
I: Featured
J: Published At
K: View Count
L: Like Count
M: Read Time (min)
N: Created At
O: Link
```

### Sample Row Format:
```
A2: from-pixels-to-products
B2: From Pixels to Products: How Designers Can Learn to Ship Faster
C2: Learn how designers can transition...
D2: Articles
E2: Olivia Johnson
F2: Senior Product Designer
G2: design, productivity, workflow
H2: TRUE
I2: TRUE
J2: 2025-03-13
K2: 1250
L2: 45
M2: 8
N2: 2025-03-13
O2: =HYPERLINK("https://cieloagency.com/blog/"&A2, "View Post")
```

### Formulas to Add:

**Total Views (Bottom of K column):**
```
=SUM(K2:K100)
```

**Total Posts:**
```
=COUNTA(A2:A100)
```

**Published Count:**
```
=COUNTIF(H2:H100, TRUE)
```

**Average Read Time:**
```
=AVERAGE(M2:M100)
```

---

## Option 5: Live Dashboard with Google Sheets

### Setup Supabase Webhook → Google Sheets

**Using Supabase Database Webhooks:**

1. Go to Database → Webhooks
2. Create new webhook
3. Table: `blog_posts`
4. Events: Insert, Update, Delete
5. Type: HTTP Request
6. URL: Your Make.com or Zapier webhook URL
7. Method: POST
8. Done! ✅

**Payload Example:**
```json
{
  "type": "INSERT",
  "table": "blog_posts",
  "record": {
    "slug": "new-blog-post",
    "title": "New Blog Post",
    "published": true,
    "view_count": 0
  }
}
```

---

## Sample Google Apps Script

Add this to Google Sheets (Tools → Script Editor):

```javascript
function importFromSupabase() {
  const SUPABASE_URL = 'YOUR_PROJECT_URL';
  const SUPABASE_KEY = 'YOUR_ANON_KEY';
  
  const url = `${SUPABASE_URL}/functions/v1/make-server-27c238f7/blog/posts?limit=100`;
  
  const options = {
    'method': 'get',
    'headers': {
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  const posts = data.posts;
  
  // Get the active sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Clear existing data (except headers)
  sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();
  
  // Add posts
  posts.forEach((post, index) => {
    const row = index + 2; // Start at row 2 (row 1 is headers)
    sheet.getRange(row, 1).setValue(post.slug);
    sheet.getRange(row, 2).setValue(post.title);
    sheet.getRange(row, 3).setValue(post.excerpt);
    sheet.getRange(row, 4).setValue(post.category);
    sheet.getRange(row, 5).setValue(post.author_name);
    sheet.getRange(row, 6).setValue(post.author_role);
    sheet.getRange(row, 7).setValue(post.tags ? post.tags.join(', ') : '');
    sheet.getRange(row, 8).setValue(post.published);
    sheet.getRange(row, 9).setValue(post.featured);
    sheet.getRange(row, 10).setValue(post.published_at);
    sheet.getRange(row, 11).setValue(post.view_count);
    sheet.getRange(row, 12).setValue(post.like_count);
    sheet.getRange(row, 13).setValue(post.read_time_minutes);
    sheet.getRange(row, 14).setValue(post.created_at);
  });
  
  SpreadsheetApp.getUi().alert(`Imported ${posts.length} blog posts!`);
}

// Add a menu item to run this function
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Blog Sync')
    .addItem('Import from Supabase', 'importFromSupabase')
    .addToUi();
}
```

**Usage:**
1. Copy script above
2. Paste in Google Sheets → Extensions → Apps Script
3. Save and close
4. Refresh your sheet
5. You'll see a new menu "Blog Sync"
6. Click "Import from Supabase" ✅

---

## Option 6: CSV Export Endpoint

Add this endpoint to your server:

```typescript
// Export blog posts as CSV
app.get("/make-server-27c238f7/blog/export/csv", async (c) => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    if (error) {
      return c.json({ error: 'Failed to fetch posts' }, 500);
    }
    
    // Convert to CSV
    const headers = ['slug', 'title', 'category', 'author_name', 'published_at', 'view_count', 'like_count'];
    const csvRows = [headers.join(',')];
    
    posts.forEach(post => {
      const row = headers.map(h => {
        const value = post[h] || '';
        // Escape commas and quotes
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(row.join(','));
    });
    
    const csv = csvRows.join('\n');
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="blog_posts.csv"'
      }
    });
  } catch (error) {
    return c.json({ error: 'Server error' }, 500);
  }
});
```

**Then download with:**
```
https://YOUR_PROJECT.supabase.co/functions/v1/make-server-27c238f7/blog/export/csv
```

---

## Which Option Should You Choose?

| Option | Difficulty | Auto-Update | Best For |
|--------|------------|-------------|----------|
| Manual Export | ⭐ Easy | ❌ No | One-time exports |
| Make.com/Zapier | ⭐⭐ Medium | ✅ Yes | Auto-sync |
| Apps Script | ⭐⭐⭐ Hard | ⏰ Scheduled | Custom control |
| CSV Export | ⭐ Easy | ❌ No | Downloads |
| Webhook | ⭐⭐⭐ Hard | ✅ Real-time | Advanced |

---

## 🎯 Recommended: Google Apps Script

**Why?**
- ✅ Free
- ✅ Runs in Google Sheets
- ✅ One-click sync
- ✅ Full control
- ✅ No external services needed

**Setup time:** 5 minutes  
**Cost:** $0

---

## Need Help?

1. **Manual Export**: See Option 1 above
2. **Auto-Sync**: See Option 2 (Make.com)
3. **Google Script**: See Option 5 (copy/paste script)
4. **CSV Download**: See Option 6 (add endpoint)

Let me know which option you'd like to implement! 🚀
