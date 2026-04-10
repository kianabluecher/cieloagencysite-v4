import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, MapPin, Briefcase, Clock, Search, Loader2, ArrowRight } from "lucide-react";
import { fetchJobs, searchJobs } from "../../utils/careers-api";
import ctaBackground from "figma:asset/f3b72bc87106d8e597bf5a6acca2bd5b4c9e779c.png";

interface JobsProps {
  onNavigate: (page: string) => void;
}

interface Job {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
  requirements: string[];
  featured: boolean;
  status: string;
  url?: string;
  posted_date: string;
}

// Sample jobs data - In production, this would come from the server
const sampleJobs = [
  {
    id: "brand-strategist",
    title: "Senior Brand Strategist",
    location: "Remote",
    department: "Brand & Strategy",
    type: "Full-time",
    description:
      "Lead brand strategy development from research through positioning and messaging",
    requirements: [
      "5+ years of experience in brand strategy",
      "Portfolio demonstrating successful brand launches",
      "Deep understanding of startup ecosystems",
      "Exceptional presentation and communication skills",
    ],
    featured: true,
    status: "open",
    posted_date: "2025-01-15",
  },
  {
    id: "marketing-specialist-business-rep",
    title: "Marketing Specialist / Business Representative",
    location: "Remote",
    department: "Consulting",
    type: "Contract",
    description:
      "Join CIELO as a boutique consulting specialist, delivering high-impact strategic work (5-20 hrs/week) while driving business development through expertise and relationships. Choose to handle LinkedIn outreach yourself or have our EA team manage it while you focus on consulting.",
    requirements: [
      "5+ years of experience in specialist domain (marketing, sales ops, product, operations, or finance)",
      "Consulting, advisory, or fractional experience with proven client deliverables",
      "Strong LinkedIn presence with professional industry positioning",
      "Excellent written and verbal communication for client-facing work",
      "Self-directed with ability to manage projects and client relationships",
      "Available 5-20 hours/week for consulting work",
    ],
    featured: true,
    status: "open",
    posted_date: "2025-01-15",
  },
  {
    id: "creative-director",
    title: "Creative Director",
    location: "Remote",
    department: "Design",
    type: "Full-time",
    description:
      "Lead creative vision and direction for all client projects",
    requirements: [
      "7+ years of design experience with 3+ years in leadership",
      "World-class portfolio demonstrating range",
      "Expert proficiency in Figma and Adobe Creative Suite",
      "Experience managing creative teams",
    ],
    featured: true,
    status: "open",
    posted_date: "2025-01-10",
  },
  {
    id: "full-stack-developer",
    title: "Full-Stack Developer",
    location: "Remote",
    department: "Development",
    type: "Full-time",
    description:
      "Build full-stack web applications using React, Next.js, and TypeScript",
    requirements: [
      "3+ years of professional full-stack development experience",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with Next.js or similar React frameworks",
      "Solid understanding of HTML, CSS, and responsive design",
    ],
    featured: true,
    status: "open",
    posted_date: "2025-01-08",
  },
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    location: "Remote",
    department: "Marketing",
    type: "Full-time",
    description:
      "Develop and execute social media strategies for multiple client accounts",
    requirements: [
      "3+ years managing social media for brands",
      "Proven track record of growing social audiences",
      "Excellent copywriting skills",
      "Experience with social media management tools",
    ],
    featured: false,
    status: "open",
    posted_date: "2025-01-05",
  },
  {
    id: "motion-designer",
    title: "Motion Designer",
    location: "Remote",
    department: "Design",
    type: "Contract",
    description:
      "Create motion graphics and animations for brand campaigns",
    requirements: [
      "3+ years of motion design experience",
      "Expert proficiency in After Effects",
      "Strong skills in Premiere Pro or Final Cut",
      "Portfolio showcasing range of motion work",
    ],
    featured: false,
    status: "open",
    posted_date: "2025-01-03",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Remote",
    department: "Design",
    type: "Full-time",
    description:
      "Design user interfaces and experiences for web and mobile applications",
    requirements: [
      "3+ years of UI/UX design experience",
      "Expert proficiency in Figma",
      "Strong portfolio showcasing web/mobile work",
      "Understanding of user-centered design principles",
    ],
    featured: false,
    status: "open",
    posted_date: "2025-01-01",
  },
  {
    id: "sdr",
    title: "Sales Specialist & SDR",
    location: "Remote",
    department: "Sales",
    type: "Full-time",
    description:
      "Own top-of-funnel and early sales execution. Generate qualified opportunities, book sales calls, and support closing high-value Brand & Web and Content Retainer deals.",
    requirements: [
      "2–4 years SDR or sales experience in agency, SaaS, or B2B services",
      "Comfortable with founders, operators, investors",
      "Sharp communicator. Confident. No fluff.",
      "Understands consultative selling, not scripts",
    ],
    featured: true,
    status: "open",
    posted_date: "2025-01-14",
  },
];

export function Jobs({ onNavigate }: JobsProps) {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data && data.length > 0 ? data : sampleJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      // On error, use sample data instead of showing error
      setJobs(sampleJobs);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await searchJobs({
        query: searchQuery || undefined,
        department: selectedDepartment || undefined,
        location: selectedLocation || undefined,
        type: selectedType || undefined,
      });
      setJobs(data && data.length > 0 ? data : []);
    } catch (err) {
      console.error("Error searching jobs:", err);
      setError("Failed to search jobs");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("");
    setSelectedLocation("");
    setSelectedType("");
    loadJobs();
  };

  const featuredJobs = jobs.filter((job) => job.featured);
  const allOpenRoles = jobs;

  const scrollToRoles = () => {
    const rolesSection =
      document.getElementById("roles-section");
    if (rolesSection) {
      rolesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Ambient Glow Effect - Top Right */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Radial Glow Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 46, 0.4) 0%, rgba(92, 64, 35, 0.2) 25%, rgba(31, 34, 40, 0) 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-8">
              [ CAREERS AT CIELO ]
            </p>

            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8">
              <span className="text-white">
                Be part. Let's build the next era of brands & businesses
              </span>
            </h1>

            <button
              onClick={scrollToRoles}
              className="px-8 py-3 bg-white text-neutral-950 rounded-full font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase hover:bg-white/90 transition-colors"
            >
              VIEW OPEN ROLES
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToRoles}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/60 transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>

        {/* Mission Statement - Bottom Right */}
        <div className="absolute bottom-12 right-12 max-w-md hidden lg:block">
          <p className="text-white/70 text-sm leading-relaxed">
            We're a creative growth system for ambitious
            founders. Our team moves at startup speed, thinks
            like strategists, and executes like a world-class
            agency.
          </p>
        </div>
      </section>

      {/* Featured Roles Section */}
      <section
        id="roles-section"
        className="px-6 py-24 bg-neutral-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-4">
                [ JOIN THE TEAM ]
              </p>
              <h2 className="text-5xl md:text-6xl text-white">
                Featured roles
              </h2>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch()
                }
                className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedDepartment}
                onChange={(e) =>
                  setSelectedDepartment(e.target.value)
                }
                className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [&>option]:bg-neutral-900 [&>option]:text-white cursor-pointer"
              >
                <option value="">All Departments</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Brand & Strategy">
                  Brand & Strategy
                </option>
                <option value="Sales">Sales</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) =>
                  setSelectedLocation(e.target.value)
                }
                className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [&>option]:bg-neutral-900 [&>option]:text-white cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value)
                }
                className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [&>option]:bg-neutral-900 [&>option]:text-white cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
              </select>

              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-white text-neutral-950 text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Search
              </button>

              {(searchQuery ||
                selectedDepartment ||
                selectedLocation ||
                selectedType) && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-white/40" />
            </div>
          ) : error ? (
            <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
              {error}
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              No featured roles at the moment. Check all open
              positions below or get in touch!
            </div>
          ) : (
            <div className="space-y-0">
              {featuredJobs.map((job, index) => (
                <div key={job.id}>
                  <button
                    onClick={() => onNavigate(`job-${job.id}`)}
                    className="w-full group flex items-center justify-between py-5 hover:bg-white/5 transition-colors px-6 -mx-6 rounded-lg text-left"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-white text-[15px]">
                        {job.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-[#7d8187] text-xs hidden md:block">
                        {job.location}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-[#7d8187] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </div>
                  </button>
                  {index < featuredJobs.length - 1 && (
                    <div className="border-b border-white/5" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative px-6 py-24 bg-black border-t border-[#1f2228] overflow-hidden"
      >
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${ctaBackground})` }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10, 10, 11, 0.85) 0%, rgba(0, 0, 0, 0.90) 50%, rgba(0, 0, 0, 0.95) 100%)",
          }}
        />

        {/* Grain/Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Don't see the right role?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            We're always looking for exceptional talent. Send us
            your portfolio and let's start a conversation.
          </p>
          <button
            onClick={() => onNavigate("inquiry")}
            className="px-8 py-4 bg-white text-neutral-950 rounded-full font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-colors inline-flex items-center gap-3"
          >
            Get In Touch
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}