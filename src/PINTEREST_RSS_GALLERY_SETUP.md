# Pinterest RSS Feed - Gallery Integration

## ✅ Overview

The Pinterest RSS feed at `https://cielo.agency/pins.xml` automatically pulls published images from your **Gallery** for Pinterest auto-publishing.

## 🎯 How It Works

### Data Source: Gallery Images Table
The RSS feed queries the `gallery_images` table in Supabase and only includes images where `published = true`.

### Field Mapping

| Gallery Field | RSS Field | Example |
|--------------|-----------|---------|
| `name` | `<title>` | Image title for Pinterest pin |
| `alt` | `<description>` | Description text for Pinterest |
| `path` (via signed URL) | `<enclosure>` | Image URL |
| `id` | `<link>` | https://cielo.agency/gallery#[id] |
| `created_at` | `<pubDate>` | Publication timestamp |
| `published` | Filter | Only `published = true` items appear |

## 📝 Managing Pinterest Content

### 1. Upload Images to Gallery
- Go to **Dashboard → Resources → Gallery Management**
- Upload images with drag & drop or file browser
- Add image metadata (name, alt text, category)

### 2. Mark Images as Published
- Click **Edit** on any gallery image
- Toggle **"Published to Pinterest RSS"** to ON
- Save changes

### 3. View Pinterest RSS Feed
- Go to **Dashboard → Content → Pinterest RSS**
- See statistics and published images preview
- Copy RSS URL for Pinterest setup

## 🔗 RSS Feed URL

```
https://cielo.agency/pins.xml
```

This URL must be added to your Pinterest Business account under Auto-publish settings.

## 🎨 Pinterest RSS Admin Page

**Location**: `/dashboard/pinterest-rss`

**Features**:
- ✅ View published images count
- ✅ Preview images in the RSS feed
- ✅ Copy RSS URL to clipboard
- ✅ Test RSS feed in browser
- ✅ View Gallery → RSS field mapping
- ✅ Link to Gallery Management

**Note**: Content is managed through the Gallery page. The Pinterest RSS page is view-only.

## 📊 Gallery Management Page

**Location**: `/dashboard/gallery` or via Resources menu

**Features**:
- Upload multiple images
- Edit image metadata (name, alt, category)
- **Toggle "Published to Pinterest RSS"** for each image
- Delete images
- View all uploaded images

### Editing Images for Pinterest

1. Click **Edit** button on any image card
2. Update fields:
   - **Image Name**: Becomes Pinterest pin title
   - **Alt Text**: Becomes Pinterest pin description  
   - **Category**: For internal organization
   - **Pinterest RSS**: Toggle to publish/unpublish
3. Click **Save Changes**

## 🔧 Technical Implementation

### Backend Endpoint

**URL**: `/make-server-27c238f7/pins.xml`

**Query**:
```sql
SELECT * FROM gallery_images 
WHERE published = true 
ORDER BY created_at DESC 
LIMIT 50
```

**Response**: RSS 2.0 XML format

**Cache**: 5 minutes (300 seconds)

### Frontend Route

**URL**: `/pins.xml`

**Component**: `PinterestRSSFeed.tsx`

**Function**: Fetches RSS XML from backend and renders it as plain XML

### Database Schema

The `gallery_images` table includes:

```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  name TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT false,  -- NEW FIELD for Pinterest RSS
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 📋 Setup Checklist

### Initial Setup

1. ✅ Upload images to Gallery
2. ✅ Mark desired images as "Published to Pinterest RSS"
3. ✅ Verify feed at `https://cielo.agency/pins.xml`
4. ✅ Validate feed using [W3C Feed Validator](https://validator.w3.org/feed/)
5. ✅ Add RSS URL to Pinterest Business account

### Pinterest Business Account Setup

1. Log into Pinterest Business account
2. Go to Settings → Claimed Accounts
3. Add claimed domain: `cielo.agency`
4. Navigate to Auto-publish or RSS feed settings
5. Add RSS URL: `https://cielo.agency/pins.xml`
6. Configure publishing board and frequency
7. Save settings

## ✅ Best Practices

### Image Quality
- Use high-resolution images (minimum 600px wide)
- Vertical images perform better on Pinterest (2:3 aspect ratio)
- File size under 10MB for optimal loading

### Metadata
- **Name**: Clear, keyword-rich titles (e.g., "Modern Brand Identity Design")
- **Alt Text**: Descriptive, detailed text (e.g., "Sleek logo design with minimalist typography and cyan accents for tech startup")
- Keep descriptions between 100-500 characters

### Publishing Strategy
- Start with 5-10 published images
- Add new images regularly (1-2 per week)
- Unpublish older images if needed (toggle published = false)
- Monitor Pinterest analytics to see what performs

## 🔍 Validation & Testing

### Test RSS Feed
Visit in browser:
```
https://cielo.agency/pins.xml
```

Should display valid XML with `<item>` entries for each published image.

### Validate RSS
Use these validators:
- [W3C Feed Validator](https://validator.w3.org/feed/)
- [RSS Feed Validator](https://www.rssboard.org/rss-validator/)

### Test in RSS Reader
Subscribe to feed in:
- Feedly
- Inoreader  
- Any RSS reader app

## ⚠️ Important Notes

### Domain Requirements
- ✅ Feed MUST be served from `cielo.agency` (claimed domain)
- ✅ All canonical URLs point to `cielo.agency/gallery#[id]`
- ❌ Supabase subdomain URLs will be rejected by Pinterest

### Published Status
- Only images with `published = true` appear in feed
- Toggle can be changed anytime without deleting images
- Changes reflect in RSS feed immediately (5 min cache)

### Feed Limits
- Maximum 50 items in feed (most recent first)
- Automatic sorting by `created_at` descending
- Older images beyond 50 are excluded

## 🚀 Workflow Example

### Adding New Pinterest Content

1. **Upload to Gallery**
   ```
   Dashboard → Resources → Gallery Management
   → Upload images
   → Fill in metadata
   ```

2. **Enable Pinterest Publishing**
   ```
   Click Edit on image
   → Toggle "Published to Pinterest RSS" ON
   → Save Changes
   ```

3. **Verify in Pinterest RSS**
   ```
   Dashboard → Content → Pinterest RSS
   → View published images count
   → Confirm image appears in preview
   ```

4. **Pinterest Auto-Publishes**
   ```
   Pinterest checks RSS feed (hourly/daily based on settings)
   → Creates new pin automatically
   → Posts to configured board
   ```

## 📞 Support

### Common Issues

**Issue**: No images in RSS feed  
**Solution**: Ensure images are marked as `published = true` in Gallery Management

**Issue**: Pinterest not fetching feed  
**Solution**: Verify domain is claimed and RSS URL is exactly `https://cielo.agency/pins.xml`

**Issue**: Images not loading in Pinterest  
**Solution**: Check that image URLs are publicly accessible (signed URLs have 1-year expiration)

---

**RSS Feed URL**: `https://cielo.agency/pins.xml`  
**Admin Dashboard**: `/dashboard/pinterest-rss`  
**Gallery Management**: `/dashboard/gallery`
