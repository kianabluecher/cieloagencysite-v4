import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../../utils/supabase/client";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowRight, Search } from "lucide-react";
import { DateRangePicker } from "../DateRangePicker";
import { motion } from "motion/react";
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
  updated_at?: string;
  author_name?: string;
  author_avatar?: string;
  category?: string;
  featured?: boolean;
  status?: string;
  is_published?: boolean;
  display_on_site?: boolean;
}

interface BlogProps {
  onNavigate: (page: string, slug?: string) => void;
}

/**
 * Date Range Filter Utilities
 * ==========================
 * Production-ready date range filtering with timezone handling
 */

/**
 * Convert a local date string (YYYY-MM-DD) to UTC timestamp for start of day
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns ISO 8601 UTC timestamp for 00:00:00 local time
 */
function getStartOfDayUTC(dateStr: string): string {
  // Parse as local date (YYYY-MM-DD)
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Create date in local timezone at midnight
  const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);
  
  // Convert to UTC ISO string
  return localDate.toISOString();
}

/**
 * Convert a local date string (YYYY-MM-DD) to UTC timestamp for end of day
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns ISO 8601 UTC timestamp for 23:59:59.999 local time
 */
function getEndOfDayUTC(dateStr: string): string {
  // Parse as local date (YYYY-MM-DD)
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Create date in local timezone at end of day
  const localDate = new Date(year, month - 1, day, 23, 59, 59, 999);
  
  // Convert to UTC ISO string
  return localDate.toISOString();
}

/**
 * Validate and normalize date range
 * @param start - Start date string (YYYY-MM-DD)
 * @param end - End date string (YYYY-MM-DD)
 * @returns Normalized date range or error message
 */
function validateDateRange(start: string, end: string): {
  valid: boolean;
  startDate?: string;
  endDate?: string;
  error?: string;
} {
  // Empty range is valid (no filtering)
  if (!start && !end) {
    return { valid: true };
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (start && !dateRegex.test(start)) {
    return { valid: false, error: "Invalid start date format. Expected YYYY-MM-DD" };
  }

  if (end && !dateRegex.test(end)) {
    return { valid: false, error: "Invalid end date format. Expected YYYY-MM-DD" };
  }

  // Check if dates are valid
  if (start && isNaN(new Date(start).getTime())) {
    return { valid: false, error: "Invalid start date" };
  }

  if (end && isNaN(new Date(end).getTime())) {
    return { valid: false, error: "Invalid end date" };
  }

  // Auto-swap if end is before start (normalize)
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate < startDate) {
      console.warn("⚠️ Date range auto-swapped: end date was before start date");
      return {
        valid: true,
        startDate: end,
        endDate: start
      };
    }
  }

  return {
    valid: true,
    startDate: start || undefined,
    endDate: end || undefined
  };
}

export function Blog({ onNavigate }: BlogProps) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<
    BlogPost[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [visiblePosts, setVisiblePosts] = useState<number>(6); // Show 6 posts initially

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    console.log("🔄 FILTER TRIGGERED - Dependencies changed:", {
      blogsCount: blogs.length,
      selectedCategory,
      searchQuery,
      startDate,
      endDate
    });
    filterBlogs();
  }, [
    blogs,
    selectedCategory,
    searchQuery,
    startDate,
    endDate,
  ]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("📊 FETCHED BLOGS FROM SUPABASE:", data?.length, "posts");
      console.log("📅 Sample blog dates:", data?.slice(0, 3).map(b => ({
        title: b.title,
        created_at: b.created_at
      })));

      setBlogs(data || []);
      setFilteredBlogs(data || []);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(
          data
            ?.map((post) => post.category)
            .filter(Boolean) as string[],
        ),
      );
      setCategories(uniqueCategories);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = [...blogs];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.category === selectedCategory,
      );
    }

    // Filter by search query (title, category, author)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.category?.toLowerCase().includes(query) ||
          blog.author_name?.toLowerCase().includes(query),
      );
    }

    // Filter by date range
    if (startDate || endDate) {
      console.log("🔍 APPLYING DATE FILTER:", { startDate, endDate, totalBlogs: filtered.length });
      
      filtered = filtered.filter((blog) => {
        // Use created_at for date filtering
        const dateToUse = blog.created_at;
        
        if (!dateToUse) {
          console.log("❌ No created_at for blog:", blog.title);
          return false;
        }

        // Extract date part (YYYY-MM-DD) from timestamp
        // Handle both "2025-12-10T14:30:00.000Z" and "2025-12-10" formats
        const blogDateStr = dateToUse.includes("T") ? dateToUse.split("T")[0] : dateToUse;

        console.log("📅 Checking blog:", blog.title);
        console.log("   - created_at:", dateToUse);
        console.log("   - extracted date:", blogDateStr);
        console.log("   - filter range:", startDate, "to", endDate);

        // Simple string comparison (YYYY-MM-DD format)
        // This works because YYYY-MM-DD is lexicographically sortable
        const passesStartDate = !startDate || blogDateStr >= startDate;
        const passesEndDate = !endDate || blogDateStr <= endDate;
        const passes = passesStartDate && passesEndDate;

        console.log(`   - ${passes ? "✅ INCLUDED" : "❌ EXCLUDED"} (start: ${passesStartDate}, end: ${passesEndDate})`);

        return passes;
      });
      
      console.log("✅ FILTER RESULT:", filtered.length, "posts matched out of", blogs.length, "total");
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "RECENTLY";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  // Separate featured and non-featured posts
  const featuredPosts = filteredBlogs.filter((blog) => blog.featured === true);
  const nonFeaturedPosts = filteredBlogs.filter((blog) => blog.featured !== true);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Noise overlay */}
      <div className="noise"></div>

      {/* Header with light theme */}
      <Header currentPage="blog" onNavigate={onNavigate} isGreyTheme={true} />

      {/* Main Container */}
      <div className="max-w-[1600px]  mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-40 pb-32 relative z-10">
        {/* Header Section - STATIC (Always visible) */}
        <div className="mb-10 flex flex-col border-b pb-10 border-neutral-200 bg-neutral-50/10 lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="flex-1">
            <div
              className="text-neutral-500 mb-10 uppercase"
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "14px",
                letterSpacing: "0.3em",
              }}
            >
              [ WHAT'S NEW ]
            </div>
            <h1
              className="text-neutral-900 mb-0"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "64px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
              }}
            >
              Daily News & Tips about AI , Brand and Why That Matters For Your Business
            </h1>
          </div>
          <div className="max-w-md">
            <p
              className="text-neutral-600 leading-relaxed"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Read about our latest product and research
              announcements.
            </p>
          </div>
        </div>

        {/* Filter Section - STATIC (Always visible) */}
        <div className="mb-10 bg-neutral-50/10 ">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* All Button */}
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setStartDate("");
                setEndDate("");
              }}
              className="px-6 py-3 bg-neutral-800 border border-neutral-800 text-white hover:bg-neutral-900 transition-all flex-shrink-0 cursor-pointer"
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
              }}
            >
              ALL
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="SEARCH BY TITLE, TAG, OR AUTHOR NAME..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 text-neutral-700 placeholder:text-neutral-400 focus:border-neutral-700 focus:outline-none transition-all relative"
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                }}
              />
            </div>

            {/* Date Range Filter */}
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              lightTheme={true}
            />
          </div>

          {/* Results Count */}
          {(searchQuery.trim() !== "" ||
            startDate ||
            endDate) && (
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <span
                className="text-neutral-500"
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                }}
              >
                SHOWING {filteredBlogs.length} RESULT
                {filteredBlogs.length !== 1 ? "S" : ""}
              </span>
            </div>
          )}
        </div>

        {/* BLOG POSTS SECTION - DYNAMIC (Shows loading/error states) */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div
              className="flex items-center gap-3 text-neutral-500 text-xs"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              <div className="w-1 h-1 bg-neutral-500 rounded-full animate-pulse"></div>
              <span>Loading blogs...</span>
            </div>
          </div>
        ) : error ? (
          <div className="border border-neutral-200 bg-neutral-50/10 p-12 text-center">
            <h2
              className="text-neutral-900 mb-6"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "24px",
              }}
            >
              Error Loading Blogs
            </h2>
            <p
              className="text-neutral-600 mb-8"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "13px",
              }}
            >
              {error}
            </p>
            <button
              onClick={fetchBlogs}
              className="px-8 py-3 bg-neutral-900 text-white tracking-wider uppercase hover:bg-neutral-800 transition-all cursor-pointer"
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
              }}
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="border border-neutral-200 bg-neutral-50/10 p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 mb-6">
              <span
                className="text-neutral-500 tracking-wider uppercase"
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                }}
              >
                Coming Soon
              </span>
            </div>
            <p
              className="text-neutral-600 leading-relaxed max-w-xl mx-auto"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "11px",
              }}
            >
              No blog posts available yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Articles Section */}
            {featuredPosts.length > 0 && (
              <div className="mb-10 space-y-6">
                {featuredPosts.map((featuredPost) => (
                  <article
                    key={featuredPost.id}
                    onClick={() => handleBlogClick(featuredPost.slug)}
                    className="group cursor-pointer border border-neutral-200 hover:border-neutral-300 transition-all duration-300 bg-white rounded-md overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Left Content */}
                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          {featuredPost.category && (
                            <div className="mb-6">
                              <span
                                className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-black/10 text-black group-hover:border-black/20 transition-colors"
                                style={{
                                  fontFamily: "DM Mono, monospace",
                                  fontSize: "7px",
                                  letterSpacing: "0.3em",
                                }}
                              >
                                {featuredPost.category}
                              </span>
                            </div>
                          )}

                          <h2
                            className="text-black mb-8 leading-tight group-hover:text-neutral-800 transition-colors"
                            style={{
                              fontFamily:
                                "Helvetica, Arial, sans-serif",
                              fontSize: "36px",
                              fontWeight: 400,
                              letterSpacing: "-0.02em",
                              lineHeight: "1.1",
                            }}
                          >
                            {featuredPost.title}
                          </h2>

                          <p
                            className="text-zinc-500 leading-relaxed mb-6"
                            style={{
                              fontFamily:
                                "Helvetica, Arial, sans-serif",
                              fontSize: "16px",
                              lineHeight: "1.7",
                            }}
                          >
                            {featuredPost.excerpt}
                          </p>

                          <span
                            className="text-zinc-600 uppercase block mb-8"
                            style={{
                              fontFamily: "DM Mono, monospace",
                              fontSize: "12px",
                              letterSpacing: "0.3em",
                            }}
                          >
                            {formatDate(featuredPost.created_at)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3">
                            {/* Author section removed */}
                          </div>
                          <button
                            className="text-black uppercase group-hover:text-neutral-800 transition-colors flex items-center gap-1.5"
                            style={{
                              fontFamily: "DM Mono, monospace",
                              fontSize: "7px",
                              letterSpacing: "0.3em",
                            }}
                          >
                            READ MORE
                            <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>

                      {/* Right Image */}
                      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="bg-neutral-800 border border-neutral-700 px-4 py-1 shadow-lg">
                            <span
                              className="text-white uppercase"
                              style={{
                                fontFamily: "DM Mono, monospace",
                                fontSize: "8px",
                                letterSpacing: "0.3em",
                              }}
                            >
                              FEATURED
                            </span>
                          </div>
                        </div>
                        
                        {featuredPost.featured_image && (
                          <ImageWithFallback
                            src={featuredPost.featured_image}
                            alt={
                              featuredPost.featured_image_alt ||
                              featuredPost.title
                            }
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {filteredBlogs.length === 0 && (
              <div className="border border-zinc-800 bg-zinc-900/10 p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 mb-6">
                  <span
                    className="text-zinc-500 tracking-wider uppercase"
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                    }}
                  >
                    NO RESULTS FOUND
                  </span>
                </div>
                <p
                  className="text-zinc-500 leading-relaxed max-w-xl mx-auto"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "11px",
                  }}
                >
                  Try adjusting your search or filters to find
                  what you're looking for.
                </p>
              </div>
            )}

            {/* Grid Articles */}
            {nonFeaturedPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {nonFeaturedPosts.slice(0, visiblePosts).map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    onClick={() => handleBlogClick(blog.slug)}
                    className="group cursor-pointer border border-neutral-200 hover:border-neutral-300 transition-all duration-300 bg-white rounded-md overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {blog.featured_image ? (
                        <ImageWithFallback
                          src={blog.featured_image}
                          alt={
                            blog.featured_image_alt || blog.title
                          }
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col ">
                      <div>
                        {blog.category && (
                          <div className="mb-4">
                            <span
                              className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-black/10 text-black group-hover:border-black/20 transition-colors"
                              style={{
                                fontFamily: "DM Mono, monospace",
                                fontSize: "7px",
                                letterSpacing: "0.3em",
                              }}
                            >
                              {blog.category}
                            </span>
                          </div>
                        )}

                        <h3
                          className="text-black mb-5 leading-tight group-hover:text-neutral-800 transition-colors"
                          style={{
                            fontFamily:
                              "Helvetica, Arial, sans-serif",
                            fontSize: "16px",
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            lineHeight: "1.3",
                          }}
                        >
                          {blog.title}
                        </h3>

                        <p
                          className="text-zinc-500 leading-relaxed line-clamp-3 mb-4"
                          style={{
                            fontFamily:
                              "Helvetica, Arial, sans-serif",
                            fontSize: "11px",
                            lineHeight: "1.6",
                          }}
                        >
                          {blog.excerpt}
                        </p>

                        <span
                          className="text-zinc-600 uppercase block mb-3"
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: "7px",
                            letterSpacing: "0.3em",
                          }}
                        >
                          {formatDate(blog.created_at)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          {/* Author section removed */}
                        </div>
                        <button
                          className="text-black uppercase group-hover:text-neutral-800 transition-colors flex items-center gap-1.5"
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: "7px",
                            letterSpacing: "0.3em",
                          }}
                        >
                          READ MORE
                          <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {nonFeaturedPosts.length > visiblePosts && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisiblePosts(visiblePosts + 3)}
                  className="px-8 py-3 bg-white text-black border border-neutral-200 tracking-wider uppercase hover:bg-zinc-200 hover:border-neutral-300 transition-all cursor-pointer"
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                  }}
                >
                  LOAD MORE
                </button>
              </div>
            )}

            {/* Show Less Button */}
            {visiblePosts > 6 && visiblePosts >= nonFeaturedPosts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setVisiblePosts(6);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white tracking-wider uppercase hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                  }}
                >
                  SHOW LESS
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} lightTheme={true} />
    </div>
  );
}