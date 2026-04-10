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
  const [editingPost, setEditingPost] =
    useState<BlogPost | null>(null);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] =
    useState(false);
  const [uploadingAuthorAvatar, setUploadingAuthorAvatar] =
    useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    null,
  );
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

  // Additional Images state
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [uploadingAdditionalImage, setUploadingAdditionalImage] = useState(false);
  const [loadingAdditionalImages, setLoadingAdditionalImages] = useState(false);

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
    status: "draft",
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
      status: "draft",
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
      status: post.status || "draft",
    });
    setShowEditor(true);
    // Load additional images for this post
    fetchAdditionalImages(post.slug);
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
            status: formData.status,
          })
          .eq("id", editingPost.id);

        if (error) throw error;

        // Save additional images to the database
        await saveAdditionalImages(formData.slug);

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
            status: formData.status,
          });

        if (error) throw error;

        // Save additional images to the database
        await saveAdditionalImages(formData.slug);

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

  // Handle Additional Image Upload
  const handleAdditionalImageUpload = async (
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
      setUploadingAdditionalImage(true);

      // Upload to server endpoint
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("type", "additional");

      console.log(
        "📤 Uploading additional image:",
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

      setAdditionalImages((prev) => [...prev, result.url]);
      toast.success("Additional image uploaded successfully");
    } catch (err: any) {
      console.error("Error uploading additional image:", err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingAdditionalImage(false);
    }
  };

  // Handle Remove Additional Image
  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
    toast.success("Additional image removed successfully");
  };

  // Fetch additional images for a specific post
  const fetchAdditionalImages = async (slug: string) => {
    try {
      setLoadingAdditionalImages(true);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("blog_additional_images")
        .select("url")
        .eq("slug", slug);

      if (error) throw error;
      setAdditionalImages(data.map((item) => item.url) || []);
    } catch (err: any) {
      console.error("Error fetching additional images:", err);
      toast.error("Failed to fetch additional images");
    } finally {
      setLoadingAdditionalImages(false);
    }
  };

  // Save additional images to the database
  const saveAdditionalImages = async (slug: string) => {
    try {
      console.log("🖼️ Saving additional images for slug:", slug);
      console.log("🖼️ Additional images to save:", additionalImages);
      
      const supabase = await createClient();

      // Delete existing additional images for this slug
      const { error: deleteError } = await supabase
        .from("blog_additional_images")
        .delete()
        .eq("slug", slug);

      if (deleteError) {
        console.error("❌ Error deleting old images:", deleteError);
      } else {
        console.log("✅ Deleted old images for slug:", slug);
      }

      // Insert new additional images
      if (additionalImages.length > 0) {
        const insertData = additionalImages.map((url) => ({
          slug,
          url,
        }));
        console.log("📥 Inserting image data:", insertData);
        
        const { error: insertError } = await supabase
          .from("blog_additional_images")
          .insert(insertData);

        if (insertError) {
          console.error("❌ Error inserting images:", insertError);
          throw insertError;
        } else {
          console.log("✅ Successfully inserted additional images");
        }
      } else {
        console.log("⚠️ No additional images to save");
      }
    } catch (err: any) {
      console.error("❌ Error saving additional images:", err);
      toast.error("Failed to save additional images");
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

            {/* Additional Images Section */}
            <div className="border border-zinc-800 p-6 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm text-zinc-400 mb-2">
                  Additional Images
                </label>
                <p className="text-xs text-zinc-500">
                  Upload extra images for this blog post (max 10 images)
                </p>
              </div>

              {/* Upload Button */}
              <div className="mb-4">
                <input
                  type="file"
                  id="additional-image-upload"
                  accept="image/*"
                  onChange={handleAdditionalImageUpload}
                  disabled={uploadingAdditionalImage || additionalImages.length >= 10}
                  className="hidden"
                />
                <label
                  htmlFor="additional-image-upload"
                  className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed transition-all ${
                    uploadingAdditionalImage || additionalImages.length >= 10
                      ? "border-zinc-700 bg-zinc-900/50 cursor-not-allowed"
                      : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900/80 cursor-pointer"
                  }`}
                >
                  {uploadingAdditionalImage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm text-zinc-400">
                        Uploading image...
                      </span>
                    </>
                  ) : additionalImages.length >= 10 ? (
                    <span className="text-sm text-zinc-500">
                      Maximum 10 images reached
                    </span>
                  ) : (
                    <>
                      <ImageIcon size={16} className="text-zinc-400" />
                      <span className="text-sm text-zinc-400">
                        Click to upload additional image ({additionalImages.length}/10)
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Images Grid */}
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {additionalImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative border border-zinc-800 p-2 bg-zinc-900/50 group"
                    >
                      <img
                        src={imageUrl}
                        alt={`Additional image ${index + 1}`}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/400x300/18181b/71717a?text=Error";
                        }}
                      />
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveAdditionalImage(index)}
                        className="absolute top-1 right-1 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                        {/* Remove Button - positioned outside top-right corner */}
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

            {/* Publish Status - Combined dropdown */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Publish Status <span className="text-red-500">*</span>
              </label>
              <select
                value={
                  formData.featured 
                    ? "featured" 
                    : formData.status === "published" 
                      ? "published" 
                      : "draft"
                }
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setFormData({
                    ...formData,
                    status: selectedValue === "draft" ? "draft" : "published",
                    featured: selectedValue === "featured",
                  });
                }}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-white focus:outline-none rounded-lg cursor-pointer"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="featured">Featured</option>
              </select>
              <p className="text-xs text-zinc-500 mt-2">
                {(formData.status === "draft" || (!formData.status && !formData.featured)) && "Save as draft to publish later"}
                {formData.status === "published" && !formData.featured && "This post will be visible on your blog"}
                {formData.featured && "Display this post prominently on the blog page"}
              </p>
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
            <h1 className="text-2xl mb-2 font-medium" style={{ fontFamily: 'Archivo, sans-serif' }}>NEWS MANAGEMENT</h1>
            <p className="text-zinc-500 text-sm">
              Manage blog posts and articles
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://supabase.com/dashboard/project/${projectId}/editor`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "14px",
              }}
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
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg  text-black hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Create New Post
            </button>
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-12 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-zinc-700 border-t-white rounded-full animate-spin"></div>
              <p className="text-zinc-400">
                Loading blog posts...
              </p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-12 text-center">
            <p className="text-zinc-400 mb-4">
              No blog posts yet
            </p>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-950 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-500" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-500" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-500" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-500" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-zinc-500" style={{ fontFamily: 'Geist Mono, monospace' }}>
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
                            <div className="font-medium text-zinc-200">
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
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          {post.featured ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs w-fit">
                              <Eye size={12} />
                              Featured
                            </span>
                          ) : post.status === "published" ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs w-fit">
                              <Eye size={12} />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-500 text-xs w-fit">
                              <Eye size={12} className="opacity-50" />
                              Draft
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {formatDate(post.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              // Navigate to blog post detail page
                              window.open(
                                `/blog/${post.slug}`,
                                "_blank",
                              );
                            }}
                            className="p-2 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white cursor-pointer"
                            title="Preview in new tab"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white cursor-pointer"
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
                            className="p-2 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-red-500 cursor-pointer"
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
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-t border-zinc-800">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <div className="text-zinc-400 text-sm">
                Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * postsPerPage >= posts.length}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg"
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
                <h2
                  className="text-xl text-white mb-3"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  Delete Blog Post?
                </h2>
                <p
                  className="text-zinc-400 text-sm leading-relaxed"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
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
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointe rounded-lg"
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                  }}
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
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                  }}
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