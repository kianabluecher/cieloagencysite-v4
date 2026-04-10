import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createClient } from "../../utils/supabase/client";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Code2,
  Heart,
  Share2,
} from "lucide-react";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  featured_image_alt: string;
  created_at?: string;
  author_name?: string;
  author_avatar?: string;
  author_bio?: string;
  category?: string;
}

interface BlogDetailProps {
  onNavigate: (page: string) => void;
}

export function BlogDetail({ onNavigate }: BlogDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string>("");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  useEffect(() => {
    if (slug) {
      fetchBlog(slug);
      fetchAllBlogs();
      fetchAdditionalImages(slug);
      // Check if user has already liked this post
      const liked = localStorage.getItem(`blog_liked_${slug}`);
      setIsLiked(liked === "true");
      // Scroll to top when blog changes
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const fetchBlog = async (slug: string) => {
    try {
      setLoading(true);
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        throw error;
      }

      setBlog(data);
      
      // Fetch like count from KV store
      await fetchLikeCount(slug);
    } catch (err: any) {
      console.error("Error fetching blog:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeCount = async (slug: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog-likes/${slug}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.count || 0);
      }
    } catch (err) {
      console.error("Error fetching like count:", err);
      setLikeCount(0);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      // Filter out current blog post
      const filtered =
        data?.filter((post) => post.slug !== slug) || [];
      setAllBlogs(filtered.slice(0, 3));
    } catch (err) {
      console.error("Error fetching all blogs:", err);
    }
  };

  const fetchAdditionalImages = async (slug: string) => {
    try {
      console.log("🔍 Fetching additional images for slug:", slug);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("blog_additional_images")
        .select("url")
        .eq("slug", slug)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("❌ Error fetching additional images:", error);
        return;
      }

      console.log("✅ Fetched additional images data:", data);
      const imageUrls = data?.map((item) => item.url) || [];
      console.log("📸 Image URLs:", imageUrls);
      setAdditionalImages(imageUrls);
    } catch (err: any) {
      console.error("❌ Error fetching additional images:", err);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "RECENTLY";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      .toUpperCase();
  };

  const formatDateFull = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      // Try the modern Clipboard API first
      await navigator.clipboard.writeText(url);
      setShareMessage("✓ Link copied to clipboard!");
      setTimeout(() => setShareMessage(""), 3000);
    } catch (err) {
      // Fallback for browsers that don't support Clipboard API
      try {
        // Create a temporary textarea element
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Try the older execCommand method
        const successful = document.execCommand("copy");
        textArea.remove();

        if (successful) {
          setShareMessage("✓ Link copied to clipboard!");
          setTimeout(() => setShareMessage(""), 3000);
        } else {
          // If all else fails, show the URL for manual copying
          setShareMessage(`Copy this link: ${url}`);
          setTimeout(() => setShareMessage(""), 5000);
        }
      } catch (fallbackErr) {
        console.error("Failed to copy:", fallbackErr);
        setShareMessage(`Copy this link: ${url}`);
        setTimeout(() => setShareMessage(""), 5000);
      }
    }
  };

  const handleLike = async () => {
    if (isLiking || !slug) return;
    setIsLiking(true);

    try {
      const newLikedState = !isLiked;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog-likes/${slug}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: newLikedState ? "like" : "unlike" }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Like update failed:", errorData);
        console.error("Response status:", response.status);
        console.error("Error details:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.error || "Failed to update like count");
      }

      const data = await response.json();
      console.log("✅ Like updated successfully:", data);
      setLikeCount(data.count || 0);
      setIsLiked(newLikedState);
      localStorage.setItem(`blog_liked_${slug}`, newLikedState ? "true" : "false");
    } catch (err: any) {
      console.error("❌ Error updating like count:", err);
      console.error("Error message:", err.message);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-600 text-xs font-mono animate-pulse">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>Loading article...</span>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl text-neutral-900 tracking-tighter font-medium">
            Article Not Found
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            {error ||
              "The article you are looking for does not exist."}
          </p>
          <button
            onClick={() => onNavigate("blog")}
            className="px-8 py-3 bg-neutral-200 text-neutral-900 font-mono text-xs tracking-wider uppercase hover:bg-neutral-300 transition-all"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-neutral-700 selection:bg-orange-500/20 selection:text-orange-800"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* Noise overlay */}
      <div className="noise"></div>

      {/* Main Header */}
      <Header currentPage="blog" onNavigate={onNavigate} isGreyTheme={true} />

      {/* CONTENT WRAPPER */}
      <div className="pt-14">
        {/* MAIN CONTENT */}
        <main className="w-full bg-white relative">
          {/* ARTICLE CONTAINER */}
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 relative z-10">
            {/* Article Header */}
            <div className="mb-16">
              <button
                onClick={() => onNavigate("blog")}
                className="flex items-center gap-2 mb-8 text-neutral-500 hover:text-neutral-900 transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-mono tracking-wider uppercase">
                  {formatDateFull(blog.created_at)}
                </span>
              </button>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 tracking-tighter mb-6 leading-[1.1]"
                dangerouslySetInnerHTML={{ __html: blog.title }}
              />

              {blog.excerpt && (
                <p className="text-lg md:text-xl text-neutral-600 font-light max-w-2xl leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {blog.featured_image && (
              <div className="mb-16 flex justify-center">
                <div className="relative w-full max-w-2xl overflow-hidden border border-neutral-200 rounded-md shadow-sm">
                  <ImageWithFallback
                    src={blog.featured_image}
                    alt={blog.featured_image_alt || blog.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            )}

            {/* HERO VISUAL: Agent Simulator */}
            <div className="w-full bg-white border border-neutral-200 p-6 md:p-8 mb-16 overflow-hidden relative rounded-md">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

              {/* Chat Interface */}
              <div className="relative z-10 flex flex-col gap-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-neutral-100 backdrop-blur-sm text-neutral-700 px-5 py-3 rounded-2xl rounded-tr-sm text-sm border border-neutral-200 max-w-sm">
                    How can CIELO help elevate my brand?
                  </div>
                </div>

                {/* System Status */}
                <div className="flex items-center gap-3 text-neutral-600 text-xs font-mono animate-pulse">
                  <Sparkles className="w-3 h-3 text-neutral-700" />
                  Analyzing brand requirements...
                </div>

                {/* Agent Thinking / Tools Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {/* Plan of Action Card */}
                  <div className="bg-neutral-50 border border-neutral-200 p-5 flex flex-col gap-4 rounded-md">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Plan of action
                    </span>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-neutral-700" />
                        </div>
                        <span className="text-xs text-neutral-700 font-medium">
                          Identify brand goals
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-neutral-700" />
                        </div>
                        <span className="text-xs text-neutral-700 font-medium">
                          Analyze market position
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-neutral-700 border-t-transparent animate-spin"></div>
                        <span className="text-xs text-neutral-900 font-medium">
                          Create strategy
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Client Tool Card */}
                  <div className="bg-neutral-50 border border-neutral-200 p-5 flex flex-col gap-4 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="bg-neutral-200 p-1 text-neutral-600 rounded">
                        <Code2 className="w-3 h-3" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                          STRATEGY-TOOL
                        </span>
                        <span className="text-xs text-neutral-900 font-medium">
                          Brand Analysis
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-neutral-200 my-1"></div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2 block">
                        OUTPUT
                      </span>
                      <div className="space-y-1 font-mono text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">
                            Category:
                          </span>
                          <span className="text-neutral-900">
                            Premium
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">
                            Market Fit:
                          </span>
                          <span className="text-neutral-900">
                            98.2%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="prose-grok mb-24">
              <div
                className="text-neutral-700 font-light leading-relaxed space-y-6 blog-content"
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              />
            </div>

            {/* Additional Images Section */}
            {additionalImages.length > 0 && (
              <div className="mb-24 space-y-8">
                {additionalImages.map((imageUrl, index) => (
                  <div key={index} className="relative w-full overflow-hidden border border-neutral-200 rounded-md shadow-sm">
                    <ImageWithFallback
                      src={imageUrl}
                      alt={`${blog.title} - Additional Image ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* AUTHOR & INTERACTION SECTION */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Author Info */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    {blog.author_avatar ? (
                      <div className="w-16 h-16 rounded-full border-2 border-neutral-200 overflow-hidden">
                        <ImageWithFallback
                          src={blog.author_avatar}
                          alt={blog.author_name || "Author"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full border-2 border-neutral-200 bg-neutral-100 flex items-center justify-center">
                        <span className="text-neutral-600 text-xl uppercase font-mono">
                          {blog.author_name?.charAt(0) || "A"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Author Details */}
                  <div className="flex-1 min-w-0">
                    {blog.author_name && (
                      <h3 className="text-neutral-900 text-lg mb-1">
                        {blog.author_name}
                      </h3>
                    )}
                    {blog.author_bio && (
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {blog.author_bio}
                      </p>
                    )}
                    {!blog.author_bio && blog.author_name && (
                      <p className="text-neutral-500 text-sm">
                        Content creator at CIELO Agency
                      </p>
                    )}
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Like Button */}
                  <button
                    className={`flex items-center gap-2 px-4 py-2 border ${
                      isLiked
                        ? "border-orange-500/50 bg-orange-500/10"
                        : "border-neutral-200 bg-white"
                    } hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group rounded-md ${
                      isLiking ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleLike}
                    disabled={isLiking}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "text-orange-500 fill-orange-500" : "text-neutral-600"
                      } group-hover:text-orange-500 transition-colors`}
                    />
                    <span
                      className={`text-xs font-mono ${
                        isLiked ? "text-orange-500" : "text-neutral-600"
                      } group-hover:text-orange-500 transition-colors uppercase tracking-wider`}
                    >
                      {isLiked ? "Liked" : "Like"}
                    </span>
                    {likeCount > 0 && (
                      <span
                        className={`text-xs font-mono ${
                          isLiked ? "text-orange-500" : "text-neutral-500"
                        } group-hover:text-orange-500 transition-colors`}
                      >
                        ({likeCount})
                      </span>
                    )}
                  </button>

                  {/* Share Button */}
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-neutral-200 bg-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group rounded-md"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 text-neutral-600 group-hover:text-orange-500 transition-colors" />
                    <span className="text-xs font-mono text-neutral-600 group-hover:text-orange-500 transition-colors uppercase tracking-wider">
                      Share
                    </span>
                  </button>
                </div>
              </div>
              {shareMessage && (
                <div className="mt-4 text-zinc-400 text-sm font-mono">
                  {shareMessage}
                </div>
              )}
            </div>

            {/* CTA SECTION */}
            <div className="my-20 bg-white border-y border-neutral-200 py-16">
              <div className="max-w-3xl mx-auto text-center px-6">
                <p 
                  className="text-neutral-900 mb-8 leading-relaxed"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '28px',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    lineHeight: '1.4',
                  }}
                >
                  Looking to enhance your reputation and traction?{' '}
                  <span className="text-neutral-600">Request a free audit and brand moodboard</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Primary CTA Button */}
                  <button
                    onClick={() => onNavigate('brand-audit')}
                    className="px-8 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 group"
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                    }}
                  >
                    REQUEST FREE AUDIT
                  </button>

                  {/* Secondary CTA Button */}
                  <button
                    onClick={() => onNavigate('offer-2026')}
                    className="px-8 py-4 bg-transparent border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300 flex items-center gap-2 group"
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                    }}
                  >
                    VIEW 2026 OFFER
                    <svg 
                      className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* RECOMMENDED POSTS */}
            {allBlogs.length > 0 && (
              <>
                <div className="w-full h-px bg-neutral-200 mb-16"></div>

                <div className="mb-24">
                  <h2
                    className="text-2xl text-neutral-900 mb-10"
                    style={{
                      fontFamily:
                        "Helvetica, Arial, sans-serif",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Recommended Posts
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {allBlogs.map((post) => (
                      <article
                        key={post.id}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="group cursor-pointer border border-neutral-200 hover:border-neutral-300 transition-all duration-300 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {post.featured_image ? (
                            <ImageWithFallback
                              src={post.featured_image}
                              alt={post.featured_image_alt || post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-100"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col bg-white">
                          <div>
                            {post.category && (
                              <div className="mb-4">
                                <span
                                  className="inline-block px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-600 group-hover:border-neutral-300 transition-colors"
                                  style={{
                                    fontFamily:
                                      "DM Mono, monospace",
                                    fontSize: "8px",
                                    letterSpacing: "0.3em",
                                  }}
                                >
                                  {post.category.toUpperCase()}
                                </span>
                              </div>
                            )}

                            <h3
                              className="text-neutral-900 mb-4 leading-tight group-hover:text-orange-500 transition-colors"
                              style={{
                                fontFamily:
                                  "Helvetica, Arial, sans-serif",
                                fontSize: "18px",
                                fontWeight: 400,
                                letterSpacing: "-0.02em",
                                lineHeight: "1.3",
                              }}
                            >
                              {post.title}
                            </h3>

                            <p
                              className="text-neutral-600 leading-relaxed line-clamp-3 mb-4"
                              style={{
                                fontFamily:
                                  "Helvetica, Arial, sans-serif",
                                fontSize: "13px",
                                lineHeight: "1.6",
                              }}
                            >
                              {post.excerpt}
                            </p>

                            <span
                              className="text-neutral-500 uppercase block mb-4"
                              style={{
                                fontFamily:
                                  "DM Mono, monospace",
                                fontSize: "8px",
                                letterSpacing: "0.3em",
                              }}
                            >
                              {formatDateFull(post.created_at)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                            <div className="flex items-center gap-3">
                              {/* Author section removed */}
                            </div>
                            <button
                              className="text-neutral-900 uppercase group-hover:text-orange-500 transition-colors flex items-center gap-1.5"
                              style={{
                                fontFamily:
                                  "Helvetica Neue, Helvetica, Arial, sans-serif",
                                fontSize: "11px",
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                              }}
                            >
                              READ MORE
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .blog-content p {
          margin-bottom: 1.5rem;
          color: #52525b;
          font-weight: 300;
          line-height: 1.75;
        }
        
        .blog-content ul {
          list-style: none;
          padding-left: 0;
          margin: 2rem 0;
          space-y: 1rem;
        }
        
        .blog-content ul li {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: #52525b;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .blog-content ul li::before {
          content: '';
          width: 0.375rem;
          height: 0.375rem;
          background-color: #71717a;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.375rem;
        }
        
        .blog-content strong {
          color: #18181b;
          font-weight: 500;
        }
        
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 500;
          color: #18181b;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 500;
          color: #18181b;
          margin-top: 2rem;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }
        
        .blog-content code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          background-color: #e5e5e5;
          padding: 0.125rem 0.375rem;
          color: #18181b;
        }
        
        .blog-content a {
          color: #52525b;
          text-decoration: underline;
          text-decoration-color: #a1a1aa;
          text-underline-offset: 2px;
          transition: all 0.2s;
        }
        
        .blog-content a:hover {
          color: #18181b;
          text-decoration-color: #52525b;
        }
      `}</style>

      {/* Main Footer */}
      <Footer onNavigate={onNavigate} lightTheme={true} />
    </div>
  );
}