# RSS Feed Endpoints - CIELO Agency Content Calendar

## Public RSS Feeds (No Authentication Required)

Your content calendar now has two public RSS feed endpoints that anyone can access without authentication:

### Endpoints

1. **Main RSS Feed**
   - URL: `https://{projectId}.supabase.co/functions/v1/make-server-27c238f7/rss`
   - Content-Type: `application/rss+xml`
   - Returns: Latest 20 published/scheduled posts

2. **Pins Feed (Alias)**
   - URL: `https://{projectId}.supabase.co/functions/v1/make-server-27c238f7/pins.xml`
   - Content-Type: `application/rss+xml`
   - Returns: Same as main RSS feed, formatted for "pins"

### RSS Feed Features

✅ **Valid RSS 2.0 XML Format**
- Proper XML structure with all required elements
- Namespace support for Atom, Content, and Dublin Core

✅ **Each Item Includes:**
- **Title**: First 100 characters of post content
- **Link**: Permanent URL to the post
- **GUID**: Unique identifier for each post
- **Description**: Full post content (XML-escaped)
- **pubDate**: Scheduled date and time in RFC 822 format
- **Categories**: Social Media + Platform names (LinkedIn, Twitter, etc.)
- **Image Enclosure**: First media image if available

✅ **Channel Metadata:**
- Title: "CIELO Agency - Content Calendar"
- Description: "Latest scheduled and published content from CIELO Agency"
- Language: English (en-us)
- Last Build Date: Current timestamp
- Generator: "CIELO Content Calendar"
- Channel Image: CIELO logo

✅ **Performance:**
- Cached for 5 minutes (300 seconds)
- Only shows published and scheduled posts
- Sorted by most recent first
- Limited to 20 items for performance

### How to Use

#### Subscribe in RSS Readers
Users can paste the RSS URL into any RSS reader:
- Feedly
- Inoreader
- NewsBlur
- Apple News
- RSS readers in browsers

#### Embed in Websites
```html
<link rel="alternate" type="application/rss+xml" 
      title="CIELO Agency Content" 
      href="https://{projectId}.supabase.co/functions/v1/make-server-27c238f7/rss" />
```

#### Test the Feed
Visit the URL directly in a browser to see the XML output:
```
https://{projectId}.supabase.co/functions/v1/make-server-27c238f7/rss
```

### Customization

To customize the site URL in the feed, set the `SITE_URL` environment variable:
```bash
SITE_URL=https://cieloagency.com
```

### Filter Logic

The RSS feed automatically:
1. Fetches all posts from the content calendar
2. Filters to only show posts with status: `published` or `scheduled`
3. Sorts by scheduled date (most recent first)
4. Limits to 20 items
5. Escapes all XML special characters for security

### XML Escaping

All content is properly escaped to prevent XML parsing errors:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&apos;`

### Example RSS Item

```xml
<item>
  <title>Exciting new product launch coming soon! Stay tuned for more details...</title>
  <link>https://cieloagency.com/posts/post-1234567890-abc123</link>
  <guid isPermaLink="true">https://cieloagency.com/posts/post-1234567890-abc123</guid>
  <description>Exciting new product launch coming soon! Stay tuned for more details on our innovative solution.</description>
  <pubDate>Mon, 10 Jan 2026 14:30:00 GMT</pubDate>
  <category>Social Media</category>
  <category>LinkedIn, Twitter, Facebook</category>
  <enclosure url="https://example.com/image.jpg" type="image/jpeg" />
</item>
```

## Security Notes

- ✅ No authentication required (public feed)
- ✅ All user input is XML-escaped
- ✅ Only published/scheduled posts are shown
- ✅ No sensitive user data exposed
- ✅ Cached for performance
- ✅ CORS enabled for cross-origin access

## Integration with Content Calendar

When you create posts in the Content Calendar:
1. Posts are stored in Supabase KV store
2. Once status is set to `published` or `scheduled`
3. They automatically appear in the RSS feed
4. RSS readers will pick up changes within 5 minutes (cache duration)

## Next Steps

To make your RSS feed discoverable:
1. Add RSS link to your website header
2. Promote the RSS URL on social media
3. Submit to RSS directories
4. Add RSS icon/link to your footer

---

**RSS Feed URL:** `https://{projectId}.supabase.co/functions/v1/make-server-27c238f7/rss`

**Pins Feed URL:** `https://{projectId}.supabase.co/functions/v1/make-server-27c238f7/pins.xml`
