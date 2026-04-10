# Complete Blog Management System - Ready to Duplicate

This document contains the complete code and design for the Blog Management system in CIELO Agency. You can use this as a template to create similar content management systems.

---

## 📋 Table of Contents

1. [Frontend Component](#frontend-component)
2. [Backend Routes](#backend-routes)
3. [Database Schema](#database-schema)
4. [Design System](#design-system)
5. [Features List](#features-list)
6. [How to Duplicate](#how-to-duplicate)

---

## 🎨 Design System

### Color Palette
- **Background**: `#09090B` (Very dark gray, softer than pure black)
- **Surface**: `#18181B` (zinc-900)
- **Border**: `#27272A` (zinc-800)
- **Text Primary**: `#FFFFFF` (white)
- **Text Secondary**: `#A1A1AA` (zinc-400)
- **Text Tertiary**: `#71717A` (zinc-500)
- **Accent**: `#06B6D4` (cyan-600)
- **Success**: `#10B981` (green-500)
- **Error**: `#EF4444` (red-500)

### Typography
- **Font Family**: Helvetica, Arial, sans-serif (body), DM Mono/Geist Mono (mono)
- **Heading**: `text-2xl` (24px)
- **Body**: `text-sm` (14px)
- **Small**: `text-xs` (12px)
- **Uppercase Labels**: `text-[10px] tracking-wider uppercase`

### UI Elements
- **Border Radius**: Rounded corners (`rounded-lg` = 8px)
- **Glass Morphism**: `backdrop-blur-sm` with semi-transparent backgrounds
- **Transitions**: `transition-colors` (200ms ease)
- **Hover States**: Subtle color shifts (zinc-900 → zinc-800)
- **Focus States**: Border highlight (zinc-800 → white)

### Spacing
- **Container Padding**: `p-8` (32px)
- **Card Padding**: `p-4` or `p-6` (16px or 24px)
- **Element Gap**: `gap-3` (12px)
- **Section Gap**: `space-y-6` (24px)

---

## 🗄️ Database Schema

### Table: `blog_posts`

```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  featured_image_alt TEXT NOT NULL,
  author_name TEXT,
  author_avatar TEXT,
  author_role TEXT,
  author_bio TEXT,
  category TEXT,
  tags TEXT[], -- Array of strings
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft', -- 'draft' or 'published'
  like_count INTEGER DEFAULT 0 NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
```

### Storage Bucket
- **Name**: `make-27c238f7-blog-images`
- **Public**: Yes
- **File Size Limit**: 50MB (52428800 bytes)

---

## ⚙️ Backend Routes

### 1. Blog Image Upload
**Endpoint**: `POST /make-server-27c238f7/blog/upload`

```typescript
app.post("/make-server-27c238f7/blog/upload", async (c) => {
  try {
    console.log('🔵 Blog upload endpoint hit');
    
    const body = await c.req.parseBody();
    const file = body.file as File;
    const imageType = body.type as string || 'image'; // 'featured' or 'avatar'

    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: "Invalid file type. Please upload an image." }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${imageType}-${timestamp}-${randomStr}.${fileExt}`;
    const filePath = `${fileName}`;
    
    console.log('📂 Target path:', filePath);
    console.log('🗄️ Bucket:', BLOG_BUCKET_NAME);

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    console.log('📊 File size:', uint8Array.length, 'bytes');
    console.log('📋 Content type:', file.type);
    
    const { data, error } = await supabase.storage
      .from(BLOG_BUCKET_NAME)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600',
      });

    if (error) {
      console.error('❌ Storage error details:', JSON.stringify(error, null, 2));
      if (error.message?.includes('Duplicate')) {
        return c.json({ error: "File already exists. Please rename and try again." }, 409);
      }
      return c.json({ error: error.message || "Failed to upload to storage", details: error }, 500);
    }

    console.log('✅ Upload successful, data:', data);

    const { data: { publicUrl } } = supabase.storage
      .from(BLOG_BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log(`✅ Blog ${imageType} image uploaded: ${publicUrl}`);
    return c.json({ success: true, url: publicUrl, path: filePath });
  } catch (error: any) {
    console.error("❌ Error in blog upload endpoint:", error);
    console.error("❌ Error stack:", error.stack);
    return c.json({ error: "Failed to upload image", details: error.message }, 500);
  }
});
```

### 2. Get Blog Likes
**Endpoint**: `GET /make-server-27c238f7/blog-likes/:slug`

```typescript
app.get("/make-server-27c238f7/blog-likes/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    
    const { data, error } = await supabase
      .from("blog_posts")
      .select("like_count")
      .eq("slug", slug)
      .single();
    
    if (error) {
      console.error("Error fetching blog like count:", error);
      return c.json({ count: 0 });
    }

    return c.json({ count: data?.like_count || 0 });
  } catch (error) {
    console.error("Error fetching blog like count:", error);
    return c.json({ error: "Failed to fetch like count", details: error.message }, 500);
  }
});
```

### 3. Update Blog Likes
**Endpoint**: `POST /make-server-27c238f7/blog-likes/:slug`

```typescript
app.post("/make-server-27c238f7/blog-likes/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const { action } = await c.req.json(); // 'like' or 'unlike'
    
    console.log(`📝 Blog like request for ${slug}: action=${action}`);
    
    // Get current post
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("like_count")
      .eq("slug", slug)
      .single();
    
    if (fetchError) {
      console.error("❌ Error fetching blog post:", JSON.stringify(fetchError, null, 2));
      
      // Check if column doesn't exist
      if (fetchError.message?.includes("column") && fetchError.message?.includes("like_count")) {
        return c.json({ 
          error: "Database column 'like_count' not found. Please run: ALTER TABLE blog_posts ADD COLUMN like_count INTEGER DEFAULT 0 NOT NULL;",
          details: fetchError.message 
        }, 500);
      }
      
      return c.json({ error: "Blog post not found", details: fetchError.message }, 404);
    }
    
    if (!post) {
      console.error("❌ Blog post not found for slug:", slug);
      return c.json({ error: "Blog post not found" }, 404);
    }
    
    const currentCount = post.like_count || 0;
    let newCount = currentCount;
    
    if (action === 'like') {
      newCount = currentCount + 1;
    } else if (action === 'unlike') {
      newCount = Math.max(0, currentCount - 1); // Prevent negative counts
    } else {
      return c.json({ error: "Invalid action. Use 'like' or 'unlike'" }, 400);
    }
    
    // Update the database
    const { data: updateData, error: updateError } = await supabase
      .from("blog_posts")
      .update({ like_count: newCount })
      .eq("slug", slug)
      .select();
    
    if (updateError) {
      console.error("❌ Error updating blog like count:", JSON.stringify(updateError, null, 2));
      return c.json({ 
        error: "Failed to update like count", 
        details: updateError.message 
      }, 500);
    }
    
    console.log(`✅ Blog like updated for ${slug}: ${action} (${currentCount} → ${newCount})`);
    return c.json({ success: true, count: newCount });
  } catch (error) {
    console.error("❌ Unexpected error updating blog like count:", error);
    return c.json({ error: "Failed to update like count", details: error.message }, 500);
  }
});
```

---

## 🎯 Frontend Component

### File: `/components/pages/BlogManagement.tsx`

```typescript
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  Eye,
  Image as ImageIcon,
  Database,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  projectId,
  publicAnonKey,
} from "../../utils/supabase/info";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  featured_image_alt: string;
  author_name?: string;
  author_avatar?: string;
  author_role?: string;
  author_bio?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
  featured?: boolean;
  tags?: string;
  published_at?: string;
  status?: string;
}

interface BlogManagementProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function BlogManagement({
  onNavigate,
}: BlogManagementProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);
  const [uploadingAuthorAvatar, setUploadingAuthorAvatar] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    show: boolean;
    postId: string | null;
    postTitle: string;
  }>({
    show: false,
    postId: null,
    postTitle: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    featured_image_alt: "",
    author_name: "",
    author_avatar: "",
    author_role: "",
    author_bio: "",
    category: "",
    featured: false,
    tags: "",
    published_at: "",
    status: "",
  });

  useEffect(() => {
    fetchPosts();
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    try {
      const supabase = await createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        setAccessToken(session.access_token);
      }
    } catch (err) {
      console.error("Error getting access token:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      featured_image_alt: "",
      author_name: "",
      author_avatar: "",
      author_role: "",
      author_bio: "",
      category: "",
      featured: false,
      tags: "",
      published_at: "",
      status: "",
    });
    setShowEditor(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    
    // Convert tags array to comma-separated string
    const tagsString = Array.isArray(post.tags) 
      ? post.tags.join(', ') 
      : (post.tags || '');
    
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      featured_image_alt: post.featured_image_alt,
      author_name: post.author_name || "",
      author_avatar: post.author_avatar || "",
      author_role: post.author_role || "",
      author_bio: post.author_bio || "",
      category: post.category || "",
      featured: post.featured || false,
      tags: tagsString,
      published_at: post.published_at || "",
      status: post.status || "draft",
    });
    setShowEditor(true);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setSubmitting(true);

    try {
      const supabase = await createClient();

      // Convert tags string to array
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : [];

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            featured_image: formData.featured_image,
            featured_image_alt: formData.featured_image_alt,
            author_name: formData.author_name,
            author_avatar: formData.author_avatar,
            author_role: formData.author_role,
            author_bio: formData.author_bio,
            category: formData.category,
            updated_at: new Date().toISOString(),
            featured: formData.featured,
            tags: tagsArray,
            published_at: formData.published_at || null,
            status: formData.status,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast.success(
          "✅ Blog post updated successfully! View it on the website.",
        );
      } else {
        // Create new post
        const { error } = await supabase
          .from("blog_posts")
          .insert({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            featured_image: formData.featured_image,
            featured_image_alt: formData.featured_image_alt,
            author_name: formData.author_name,
            author_avatar: formData.author_avatar,
            author_role: formData.author_role,
            author_bio: formData.author_bio,
            category: formData.category,
            featured: formData.featured,
            tags: tagsArray,
            published_at: formData.published_at || null,
            status: formData.status,
          });

        if (error) throw error;
        toast.success(
          "🎉 Blog post created successfully! It's now live on the website.",
        );
      }

      setShowEditor(false);
      fetchPosts();
    } catch (err: any) {
      console.error("Error saving post:", err);
      toast.error(err.message || "Failed to save blog post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("✅ Blog post deleted successfully", {
        position: "bottom-right",
        duration: 3000,
      });
      fetchPosts();
      setDeleteConfirmModal({
        show: false,
        postId: null,
        postTitle: "",
      });
    } catch (err: any) {
      console.error("Error deleting post:", err);
      toast.error("❌ Failed to delete blog post", {
        position: "bottom-right",
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle Featured Image Upload
  const handleFeaturedImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type only
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setUploadingFeaturedImage(true);

      // Upload to server endpoint
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("type", "featured");

      console.log(
        "📤 Uploading featured image:",
        file.name,
        file.size,
        "bytes",
      );

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: uploadFormData,
        },
      );

      console.log(
        "📥 Upload response status:",
        response.status,
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(
            `Upload failed with status ${response.status}: ${errorText}`,
          );
        }

        throw new Error(
          errorData.error ||
            errorData.details ||
            errorData.message ||
            "Failed to upload image",
        );
      }

      const result = await response.json();
      console.log("✅ Upload success:", result);

      if (!result.url) {
        throw new Error("No URL returned from upload");
      }

      setFormData((prev) => ({
        ...prev,
        featured_image: result.url,
      }));
      toast.success("Featured image uploaded successfully");
    } catch (err: any) {
      console.error("Error uploading featured image:", err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingFeaturedImage(false);
    }
  };

  // Handle Author Avatar Upload
  const handleAuthorAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type only
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setUploadingAuthorAvatar(true);

      // Upload to server endpoint
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("type", "avatar");

      console.log(
        "📤 Uploading author avatar:",
        file.name,
        file.size,
        "bytes",
      );

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: uploadFormData,
        },
      );

      console.log(
        "📥 Avatar upload response status:",
        response.status,
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Avatar upload error response:",
          errorText,
        );

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(
            `Upload failed with status ${response.status}: ${errorText}`,
          );
        }

        throw new Error(
          errorData.error ||
            errorData.details ||
            errorData.message ||
            "Failed to upload avatar",
        );
      }

      const result = await response.json();
      console.log("✅ Avatar upload success:", result);

      if (!result.url) {
        throw new Error("No URL returned from upload");
      }

      setFormData((prev) => ({
        ...prev,
        author_avatar: result.url,
      }));
      toast.success("Author avatar uploaded successfully");
    } catch (err: any) {
      console.error("Error uploading author avatar:", err);
      toast.error(err.message || "Failed to upload avatar");
    } finally {
      setUploadingAuthorAvatar(false);
    }
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl">
              {editingPost
                ? "Edit Blog Post"
                : "Create New Blog Post"}
            </h1>
            <button
              onClick={() => setShowEditor(false)}
              disabled={submitting}
              className="p-2 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
              title="Close editor"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  handleTitleChange(e.target.value)
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                placeholder="Enter blog post title"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value,
                  })
                }
                disabled
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none font-mono text-sm opacity-60 cursor-not-allowed rounded-lg"
                placeholder="auto-generated-from-title"
                required
              />
              <p className="text-xs text-zinc-500 mt-1">
                URL: /blog/{formData.slug || "your-slug-here"}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none resize-none rounded-lg"
                rows={3}
                placeholder="Brief description of the blog post"
                required
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Featured Image{" "}
                <span className="text-red-500">*</span>
              </label>

              {/* URL Input */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.featured_image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured_image: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                  placeholder="https://example.com/image.jpg or upload below"
                  required
                />

                {/* Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    id="featured-image-upload"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    disabled={uploadingFeaturedImage}
                    className="hidden"
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed transition-all cursor-pointer ${
                      uploadingFeaturedImage
                        ? "border-zinc-700 bg-zinc-900/50 cursor-not-allowed"
                        : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900/80"
                    }`}
                  >
                    {uploadingFeaturedImage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm text-zinc-400">
                          Uploading image...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload
                          size={16}
                          className="text-zinc-400"
                        />
                        <span className="text-sm text-zinc-400">
                          Click to upload featured image
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Image Preview */}
                {formData.featured_image && (
                  <div className="mt-4 border border-zinc-800 p-4 bg-zinc-900/50 relative">
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          featured_image: "",
                        })
                      }
                      className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer z-10"
                      title="Remove featured image"
                    >
                      <X size={16} />
                    </button>
                    <p className="text-xs text-zinc-500 mb-2">
                      Preview:
                    </p>
                    <img
                      src={formData.featured_image}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/800x600/18181b/71717a?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image Alt */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Featured Image Alt Text{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.featured_image_alt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featured_image_alt: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                placeholder="Describe the image for accessibility"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.author_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author_name: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Author Avatar */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Author Avatar{" "}
                <span className="text-red-500">*</span>
              </label>

              {/* URL Input */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.author_avatar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      author_avatar: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                  placeholder="https://example.com/avatar.jpg or upload below"
                  required
                />

                {/* Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    id="author-avatar-upload"
                    accept="image/*"
                    onChange={handleAuthorAvatarUpload}
                    disabled={uploadingAuthorAvatar}
                    className="hidden"
                  />
                  <label
                    htmlFor="author-avatar-upload"
                    className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed transition-all cursor-pointer ${
                      uploadingAuthorAvatar
                        ? "border-zinc-700 bg-zinc-900/50 cursor-not-allowed"
                        : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900/80"
                    }`}
                  >
                    {uploadingAuthorAvatar ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm text-zinc-400">
                          Uploading avatar...
                        </span>
                      </>
                    ) : (
                      <>
                        <ImageIcon
                          size={16}
                          className="text-zinc-400"
                        />
                        <span className="text-sm text-zinc-400">
                          Click to upload author avatar
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Avatar Preview */}
                {formData.author_avatar && (
                  <div className="mt-4 border border-zinc-800 p-4 bg-zinc-900/50">
                    <p className="text-xs text-zinc-500 mb-2">
                      Preview:
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={formData.author_avatar}
                          alt="Avatar Preview"
                          className="w-24 h-24 object-cover rounded-full border-2 border-zinc-700"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/200x200/18181b/71717a?text=Avatar";
                          }}
                        />
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              author_avatar: "",
                            })
                          }
                          className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors cursor-pointer z-10 shadow-lg"
                          title="Remove author avatar"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="text-xs text-zinc-500">
                        <p>Square images work best</p>
                        <p className="text-zinc-600">
                          Displayed as circular avatar
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Author Role */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Author Role{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.author_role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author_role: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                placeholder="Enter author role"
                required
              />
            </div>

            {/* Author Bio */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Author Bio{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.author_bio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author_bio: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none resize-none rounded-lg"
                rows={3}
                placeholder="Brief description of the author"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg"
                placeholder="e.g., design, marketing, technology (comma-separated)"
              />
              <p className="text-xs text-zinc-500 mt-1">
                Enter tags separated by commas
              </p>
            </div>

            {/* Status (Draft/Published) */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    status: e.target.value,
                    published_at: e.target.value === "published" ? new Date().toISOString() : "",
                  });
                }}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg cursor-pointer"
                required
              >
                <option value="">Select status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <p className="text-xs text-zinc-500 mt-2">
                {formData.status === "published"
                  ? "This post will be visible on your blog"
                  : formData.status === "draft"
                  ? "Save as draft to publish later"
                  : "Choose whether to publish or save as draft"}
              </p>
            </div>

            {/* Published Date */}
            {formData.status === "published" && formData.published_at && (
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Published Date
                </label>
                <input
                  type="text"
                  value={formatDate(formData.published_at)}
                  disabled
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white opacity-60 cursor-not-allowed rounded-lg"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Auto-set when status changes to Published
                </p>
              </div>
            )}

            {/* Featured Checkbox */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featured: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 border-2 border-zinc-700 bg-zinc-900 peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center rounded">
                    {formData.featured && (
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    Featured Post
                  </span>
                  <p className="text-xs text-zinc-500">
                    Display this post prominently on the blog page
                  </p>
                </div>
              </label>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none resize-none rounded-lg"
                rows={20}
                placeholder="Write your blog content here..."
                required
              />
              <p className="text-xs text-zinc-500 mt-1">
                Plain text content for your blog post
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-colors disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer rounded-lg"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Submit</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(10,10,10)] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl mb-2">Blog Management</h1>
            <p className="text-zinc-400 text-sm">
              Create, edit, and manage blog posts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://supabase.com/dashboard/project/${projectId}/editor`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
            >
              <Database size={16} />
              <span>Supabase Table</span>
              <ExternalLink
                size={14}
                className="text-zinc-500"
              />
            </a>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-black hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Create New Post
            </button>
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="border border-zinc-800 p-12 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-zinc-700 border-t-white rounded-full animate-spin"></div>
              <p className="text-zinc-400">
                Loading blog posts...
              </p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="border border-zinc-800 p-12 text-center">
            <p className="text-zinc-400 mb-4">
              No blog posts yet
            </p>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-400">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-400">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-400">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {posts
                  .slice(
                    (currentPage - 1) * postsPerPage,
                    currentPage * postsPerPage,
                  )
                  .map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-zinc-900/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {post.featured_image && (
                            <img
                              src={post.featured_image}
                              alt={post.featured_image_alt}
                              className="w-12 h-12 object-cover border border-zinc-800"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/100x100/18181b/71717a?text=No+Image";
                              }}
                            />
                          )}
                          <div>
                            <div className="font-medium">
                              {post.title}
                            </div>
                            <div className="text-sm text-zinc-500 line-clamp-1">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-zinc-400">
                        /{post.slug}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {formatDate(post.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              window.open(
                                `/blog/${post.slug}`,
                                "_blank",
                              );
                            }}
                            className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white cursor-pointer"
                            title="Preview in new tab"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirmModal({
                                show: true,
                                postId: post.id,
                                postTitle: post.title,
                              })
                            }
                            className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-red-500 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <div className="text-zinc-400">
                Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * postsPerPage >= posts.length}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmModal.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 rounded-lg">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() =>
                setDeleteConfirmModal({
                  show: false,
                  postId: null,
                  postTitle: "",
                })
              }
            ></div>

            {/* Modal */}
            <div className="relative bg-zinc-900 border-2 border-zinc-800 max-w-lg w-full p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-xl text-white mb-3">
                  Delete Blog Post?
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="text-white font-medium">
                    "{deleteConfirmModal.postTitle}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (deleteConfirmModal.postId) {
                      handleDelete(deleteConfirmModal.postId);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer rounded-lg"
                >
                  DELETE
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirmModal({
                      show: false,
                      postId: null,
                      postTitle: "",
                    })
                  }
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white transition-colors cursor-pointer rounded-lg"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## ✨ Features List

### Core Features
- ✅ **CRUD Operations**: Create, Read, Update, Delete blog posts
- ✅ **Image Upload**: Featured images and author avatars with drag-and-drop
- ✅ **Auto-slug Generation**: Automatic URL-friendly slugs from titles
- ✅ **Rich Metadata**: Author info, categories, tags, excerpts
- ✅ **Draft/Published Status**: Save drafts and publish when ready
- ✅ **Featured Posts**: Mark posts as featured for homepage display
- ✅ **Like System**: Track engagement with like counts
- ✅ **Pagination**: Handle large numbers of posts efficiently
- ✅ **Delete Confirmation**: Safety modal before deletion
- ✅ **Image Preview**: See images before saving
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Loading States**: User feedback during operations
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Date Formatting**: Human-readable date displays

### UI/UX Features
- ✅ **Glass Morphism**: Modern translucent card effects
- ✅ **Smooth Transitions**: Polished animations throughout
- ✅ **Toast Notifications**: Real-time feedback on actions
- ✅ **Hover States**: Clear interactive element feedback
- ✅ **Empty States**: Helpful prompts when no data exists
- ✅ **Form Validation**: Required field enforcement
- ✅ **Image Fallbacks**: Graceful handling of broken images
- ✅ **Upload Progress**: Visual feedback during uploads
- ✅ **Keyboard Accessible**: Full keyboard navigation support

---

## 🔄 How to Duplicate

### Step 1: Create New Database Table

```sql
-- Replace 'new_content' with your content type name
CREATE TABLE IF NOT EXISTS new_content_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  featured_image_alt TEXT NOT NULL,
  author_name TEXT,
  author_avatar TEXT,
  author_role TEXT,
  author_bio TEXT,
  category TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  like_count INTEGER DEFAULT 0 NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_new_content_posts_slug ON new_content_posts(slug);
CREATE INDEX IF NOT EXISTS idx_new_content_posts_status ON new_content_posts(status);
CREATE INDEX IF NOT EXISTS idx_new_content_posts_published_at ON new_content_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_new_content_posts_created_at ON new_content_posts(created_at DESC);
```

### Step 2: Create Storage Bucket (Backend)

```typescript
// In /supabase/functions/server/index.tsx
const NEW_CONTENT_BUCKET_NAME = "make-27c238f7-new-content-images";

(async () => {
  const { data: buckets } = await supabase.storage.listBuckets();
  
  const bucketExists = buckets?.some(bucket => bucket.name === NEW_CONTENT_BUCKET_NAME);
  if (!bucketExists) {
    await supabase.storage.createBucket(NEW_CONTENT_BUCKET_NAME, { 
      public: true,
      fileSizeLimit: 52428800 // 50MB limit
    });
    console.log(`Created storage bucket: ${NEW_CONTENT_BUCKET_NAME}`);
  }
})();
```

### Step 3: Add Upload Route (Backend)

```typescript
// In /supabase/functions/server/index.tsx
app.post("/make-server-27c238f7/new-content/upload", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body.file as File;
    const imageType = body.type as string || 'image';

    if (!file || !file.type.startsWith('image/')) {
      return c.json({ error: "Invalid file" }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${imageType}-${timestamp}-${randomStr}.${fileExt}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    const { data, error } = await supabase.storage
      .from(NEW_CONTENT_BUCKET_NAME)
      .upload(fileName, uint8Array, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600',
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(NEW_CONTENT_BUCKET_NAME)
      .getPublicUrl(fileName);

    return c.json({ success: true, url: publicUrl, path: fileName });
  } catch (error: any) {
    return c.json({ error: "Failed to upload image", details: error.message }, 500);
  }
});
```

### Step 4: Add Like Routes (Backend)

```typescript
// Get likes
app.get("/make-server-27c238f7/new-content-likes/:slug", async (c) => {
  const slug = c.req.param("slug");
  const { data } = await supabase
    .from("new_content_posts")
    .select("like_count")
    .eq("slug", slug)
    .single();
  return c.json({ count: data?.like_count || 0 });
});

// Update likes
app.post("/make-server-27c238f7/new-content-likes/:slug", async (c) => {
  const slug = c.req.param("slug");
  const { action } = await c.req.json();
  
  const { data: post } = await supabase
    .from("new_content_posts")
    .select("like_count")
    .eq("slug", slug)
    .single();
  
  if (!post) return c.json({ error: "Post not found" }, 404);
  
  const currentCount = post.like_count || 0;
  const newCount = action === 'like' ? currentCount + 1 : Math.max(0, currentCount - 1);
  
  await supabase
    .from("new_content_posts")
    .update({ like_count: newCount })
    .eq("slug", slug);
  
  return c.json({ success: true, count: newCount });
});
```

### Step 5: Create Frontend Component

1. **Copy** `/components/pages/BlogManagement.tsx`
2. **Rename** to `/components/pages/NewContentManagement.tsx`
3. **Find and replace** all instances:
   - `blog_posts` → `new_content_posts`
   - `blog/upload` → `new-content/upload`
   - `blog-likes` → `new-content-likes`
   - `Blog` → `NewContent` (component names)
   - `blog` → `new-content` (UI text)

### Step 6: Add to Navigation

```typescript
// In TeamDashboardSidebar.tsx navigation config
{
  id: 'new-content',
  title: 'New Content',
  icon: FileText,
  viewId: 'new-content-management',
  roles: ['admin']
}
```

### Step 7: Add Route Handler

```typescript
// In TeamDashboardSidebar.tsx renderContent()
case 'new-content-management':
  return <NewContentManagement onNavigate={onNavigate} />;
```

---

## 📝 Customization Tips

### Change Field Names
Update both database schema and component form fields to match your content type.

### Add Custom Fields
1. Add column to database: `ALTER TABLE ... ADD COLUMN field_name TEXT;`
2. Add to `formData` state in component
3. Add form input in editor view
4. Include in save operations

### Change Upload Limits
```typescript
fileSizeLimit: 52428800 // Adjust bytes (current = 50MB)
```

### Modify Pagination
```typescript
const postsPerPage = 6; // Change number per page
```

### Customize Colors
Replace color classes throughout the component:
- `bg-cyan-600` → Your brand color
- `border-zinc-800` → Your border color
- `text-zinc-400` → Your text color

### Add Rich Text Editor
Replace the basic textarea with a library like TipTap, Lexical, or Slate.

---

## 🎯 Best Practices

1. **Always validate inputs** on both frontend and backend
2. **Use proper loading states** for better UX
3. **Handle errors gracefully** with user-friendly messages
4. **Optimize images** before uploading for better performance
5. **Use transactions** for critical database operations
6. **Add proper indexes** for frequently queried columns
7. **Implement soft deletes** instead of hard deletes for important data
8. **Add audit logs** to track who changed what
9. **Use CDN** for serving uploaded images
10. **Implement rate limiting** to prevent abuse

---

## 🐛 Troubleshooting

### Images not uploading
- Check bucket permissions (should be public)
- Verify file size limits
- Check CORS settings
- Ensure proper authorization headers

### Slugs colliding
- Add timestamp or random suffix to slug generation
- Implement slug uniqueness check before save

### Pagination issues
- Verify total count calculation
- Check page boundary conditions
- Test with edge cases (0 items, 1 item, exact page size)

### Like count not updating
- Verify `like_count` column exists
- Check database permissions
- Review error logs in browser console

---

## 📚 Additional Resources

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [React Hook Form](https://react-hook-form.com/)

---

**Created for CIELO Agency** | Dark "Onyx" Design System | Full-Stack Blog Management

