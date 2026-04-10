# 📸 Adding Featured Images to Portfolio Projects

## Current Issue
Your `portfolio_data.ts` file has **NO `featured_image` URLs** defined, which means:
- ❌ Projects show "No Image" placeholder
- ❌ Portfolio grid looks incomplete
- ❌ Visual impact is lost

---

## Solution Options

### **Option 1: Upload to Supabase Storage** (RECOMMENDED)
✅ **Pros:** Full control, no external dependencies, free hosting
⚠️ **Setup:** Requires image uploads

#### Step 1: Prepare Images
- **Format:** JPEG or WebP
- **Size:** 1600×1000px (16:10 aspect ratio)
- **File size:** < 200KB (optimized)
- **Naming:** `project-slug.jpg` (e.g., `palatial-petals.jpg`)

#### Step 2: Upload to Supabase
```typescript
// In Supabase Dashboard → Storage → make-27c238f7-portfolio bucket
// OR use this script:

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function uploadProjectImages() {
  const images = [
    { slug: 'palatial-petals', file: './images/palatial-petals.jpg' },
    { slug: 'iba-mezcal', file: './images/iba-mezcal.jpg' },
    // ... add all 40 projects
  ];

  for (const img of images) {
    const fileBuffer = await fs.readFile(img.file);
    
    const { data, error } = await supabase.storage
      .from('make-27c238f7-portfolio')
      .upload(`projects/${img.slug}.jpg`, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (error) {
      console.error(`Failed to upload ${img.slug}:`, error);
    } else {
      console.log(`✅ Uploaded ${img.slug}`);
    }
  }
}
```

#### Step 3: Update portfolio_data.ts
```typescript
const supabaseUrl = "https://YOUR_PROJECT.supabase.co";
const bucketName = "make-27c238f7-portfolio";

export const verifiedPortfolioProjects = [
  {
    title: "Palatial Petals",
    excerpt: "Luxury Floral Studio Brand & E-Commerce",
    category: "Brand Strategy",
    // Add this line:
    featured_image: `${supabaseUrl}/storage/v1/object/public/${bucketName}/projects/palatial-petals.jpg`,
    // ... rest of project data
  },
  // ... repeat for all projects
];
```

---

### **Option 2: Use Unsplash (QUICK START)**
✅ **Pros:** Free, high-quality images, no upload needed
⚠️ **Cons:** Generic stock photos, not your actual work

```typescript
export const verifiedPortfolioProjects = [
  {
    title: "Palatial Petals",
    featured_image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=1000&fit=crop",
    // Find images at: unsplash.com/s/photos/luxury-flowers
  },
  {
    title: "IBÁ Mezcal",
    featured_image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&h=1000&fit=crop",
    // Find: unsplash.com/s/photos/mezcal
  },
  // ... etc
];
```

---

### **Option 3: External CDN** (Cloudinary, ImgIx, etc.)
✅ **Pros:** Professional image optimization, automatic resizing, CDN
⚠️ **Cons:** Requires external account, may have costs

```typescript
// Example with Cloudinary
featured_image: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/projects/palatial-petals.jpg"
```

---

## Quick Start: Add Placeholder Images

If you need to launch quickly, use **industry-appropriate Unsplash images**:

```typescript
export const verifiedPortfolioProjects = [
  {
    title: "Palatial Petals",
    excerpt: "Luxury Floral Studio Brand & E-Commerce",
    category: "Brand Strategy",
    featured_image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=1000&fit=crop&q=80",
    // Luxury flowers
  },
  {
    title: "IBÁ Mezcal",
    excerpt: "Premium Artisanal Spirits Social Strategy",
    category: "Social Media Management",
    featured_image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&h=1000&fit=crop&q=80",
    // Mezcal/spirits
  },
  {
    title: "Signature Cocktail Co.",
    excerpt: "RTD Beverage Social Media Management",
    category: "Social Media Management",
    featured_image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=1600&h=1000&fit=crop&q=80",
    // Cocktails
  },
  {
    title: "EJAI",
    excerpt: "Wellness & Biohacking Social Strategy",
    category: "Social Media Strategy",
    featured_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=1000&fit=crop&q=80",
    // Wellness/fitness
  },
  {
    title: "AveLux",
    excerpt: "Luxury Wellness Sanctuary Brand",
    category: "Content Creation",
    featured_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=1000&fit=crop&q=80",
    // Luxury spa
  },
  {
    title: "Vanbike",
    excerpt: "German Market Mobility Brand",
    category: "Social Media Management",
    featured_image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1600&h=1000&fit=crop&q=80",
    // Bike/mobility
  },
  {
    title: "SCP",
    excerpt: "Sustainable CRE Lending Platform",
    category: "Web Development",
    featured_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1000&fit=crop&q=80",
    // Commercial real estate
  },
  {
    title: "MAST Legal",
    excerpt: "Future-Focused Law Firm Platform",
    category: "Web Development",
    featured_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=1000&fit=crop&q=80",
    // Legal/office
  },
  {
    title: "AI Insiders",
    excerpt: "AI Business Coaching Platform",
    category: "Brand Identity",
    featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=1000&fit=crop&q=80",
    // AI/tech
  },
  {
    title: "Alexander Hotel",
    excerpt: "Luxury Oceanfront Event Marketing",
    category: "Event Design",
    featured_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=1000&fit=crop&q=80",
    // Luxury hotel
  },
  {
    title: "WELDA Club",
    excerpt: "Global Wellness Movement Launch",
    category: "Complete Brand Launch",
    featured_image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&h=1000&fit=crop&q=80",
    // Yoga/wellness
  },
  {
    title: "Optodex",
    excerpt: "MedTech Innovation Marketing",
    category: "Content Strategy",
    featured_image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1600&h=1000&fit=crop&q=80",
    // Medical/healthcare
  },
  {
    title: "Rockhill Capital",
    excerpt: "Houston Private Equity Firm",
    category: "Web Development",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1000&fit=crop&q=80",
    // Finance/business
  },
  {
    title: "Parceros Capital",
    excerpt: "Legacy-Focused Acquisition Firm",
    category: "Web Development",
    featured_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&h=1000&fit=crop&q=80",
    // Investment/finance
  },
  // ... continue for remaining 26 projects
];
```

---

## Image Specifications

### **Recommended Sizes:**
- **Grid View (featured_image):** 1600×1000px (16:10 ratio)
- **Thumbnail (optional):** 800×500px (16:10 ratio)
- **Hero (detail page):** 2400×1350px (16:9 ratio)

### **Optimization:**
- **Format:** WebP (best) or JPEG
- **Quality:** 80-85% (balance quality/size)
- **File Size:** < 200KB for grid, < 500KB for hero
- **Tools:** 
  - [TinyPNG](https://tinypng.com) - Free compression
  - [Squoosh](https://squoosh.app) - Google's optimizer
  - [ImageOptim](https://imageoptim.com) - Mac app

---

## After Adding Images

### **1. Re-initialize Portfolio**
```bash
# This will update the database with new featured_image URLs
POST /make-server-27c238f7/portfolio/init
```

### **2. Clear Cache**
```typescript
// Server cache will auto-clear on init
// Or manually clear by restarting server
```

### **3. Test**
- Visit `/portfolio2`
- Verify all images load
- Check lazy loading in Network tab
- Test "Load More" pagination

---

## Checklist

- [ ] Choose image source (Supabase, Unsplash, or CDN)
- [ ] Prepare/find images for all 40 projects
- [ ] Add `featured_image` URLs to `portfolio_data.ts`
- [ ] Run `/portfolio/init` to update database
- [ ] Clear browser cache and test
- [ ] Verify lazy loading works
- [ ] Check mobile responsiveness

---

## Need Help?

### Finding Stock Photos:
- [Unsplash](https://unsplash.com) - Free, high-quality
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images

### Image Optimization:
- [TinyPNG](https://tinypng.com) - Compress PNG/JPEG
- [Squoosh](https://squoosh.app) - Google's tool
- [ImageOptim](https://imageoptim.com) - Mac app

### URL Format:
```
Unsplash: https://images.unsplash.com/photo-{id}?w=1600&h=1000&fit=crop&q=80
Supabase: {supabaseUrl}/storage/v1/object/public/{bucket}/{path}
Cloudinary: https://res.cloudinary.com/{cloud}/image/upload/{transform}/{path}
```

---

**Last Updated:** February 12, 2026
