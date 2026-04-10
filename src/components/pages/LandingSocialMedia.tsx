import { useState } from 'react';
import { CheckCircle, Play, ChevronRight, Heart, MessageCircle, Bookmark, Send, TrendingUp } from 'lucide-react';
import exampleImage from 'figma:asset/9142790aa463db35d5d8af2a4b6b8be7e3192654.png';

interface LandingSocialMediaProps {
  onNavigate: (page: string) => void;
}

export function LandingSocialMedia({ onNavigate }: LandingSocialMediaProps) {
  const [activeTab, setActiveTab] = useState('posts');
  const [activeCategory, setActiveCategory] = useState('featured');

  // Social media post examples
  const posts = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=400&h=500&fit=crop',
      category: 'featured',
      likes: '2.4k',
      comments: 89,
      caption: 'Heavenly limit to our realization of tomorrow will be our doubts of today.'
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=400&h=500&fit=crop',
      category: 'beauty',
      likes: '3.1k',
      comments: 124,
      caption: 'Beauty begins the moment you decide to be yourself.'
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
      category: 'products',
      likes: '4.2k',
      comments: 156,
      caption: 'GOING GREEN - Sustainable fashion for a better tomorrow.'
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=500&fit=crop',
      category: 'tech',
      likes: '2.9k',
      comments: 98,
      caption: 'RUN - Innovation at every step.'
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      category: 'food',
      likes: '3.5k',
      comments: 142,
      caption: 'FOOD TOUR - Discover flavors from around the world.'
    },
    { 
      id: 6, 
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=500&fit=crop',
      category: 'health',
      likes: '2.1k',
      comments: 78,
      caption: 'Wellness begins within. Start your journey today.'
    },
  ];

  const categories = [
    { id: 'featured', label: 'Featured' },
    { id: 'beauty', label: 'Beauty Services' },
    { id: 'food', label: 'Food & Beverages' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'home', label: 'Home Services' },
    { id: 'products', label: 'Products' },
    { id: 'professional', label: 'Professional Services' },
    { id: 'tech', label: 'SaaS & Tech' },
  ];

  const logoPartners = [
    { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
    { name: 'Nestlé', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nestl%C3%A9.svg/200px-Nestl%C3%A9.svg.png' },
  ];

  // Hero mockup posts
  const heroStoryImage = 'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=300&h=550&fit=crop';
  const heroPost1 = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop';
  const heroPost2 = 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=300&h=300&fit=crop';

  const filteredPosts = activeCategory === 'featured' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text & CTA */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-6 bg-cyan-500/10 border border-cyan-500/20">
                <p className="font-['Geist_Mono'] text-cyan-400 text-xs tracking-[1.4px] uppercase">
                  🎯 Top 1% of Global Creative Talent
                </p>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight mb-6 leading-tight">
                Expert social media management from only{' '}
                <span className="text-cyan-400">$99/mo</span>
              </h1>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <p className="text-[#9ca3af]">
                    <span className="text-white font-medium">Premium</span> content with your branding
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <p className="text-[#9ca3af]">
                    <span className="text-white font-medium">80%</span> cheaper than alternatives
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <p className="text-[#9ca3af]">
                    Made by <span className="text-white font-medium">real people</span> - not AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/lets-talk')}
                className="px-8 py-4 rounded-full bg-cyan-500 text-white font-['Geist_Mono'] text-sm tracking-[0.1em] uppercase hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2 group mb-6"
              >
                Schedule a free demo call
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-[#7d8187] mb-4">
                Trusted by <span className="text-white font-medium">12,000+</span> businesses · Cancel anytime
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <p className="text-sm text-[#7d8187]">Supported networks:</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Social Media Mockups */}
            <div className="relative">
              {/* Main grid of mockups */}
              <div className="grid grid-cols-2 gap-4">
                {/* Instagram Story Mockup */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                      <span className="text-xs text-white/80 font-medium">Business</span>
                    </div>
                    <div className="text-white/60">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 aspect-[9/16] shadow-2xl border border-white/10">
                    <img 
                      src={heroStoryImage} 
                      alt="Story"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                    <div className="absolute top-4 left-4 right-4">
                      <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/30">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                      <p className="text-white text-sm font-medium">Instagram Stories</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Posts Column */}
                <div className="space-y-4">
                  {/* Post 1 */}
                  <div className="bg-[#1a1a1b] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="flex items-center justify-between p-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                        <span className="text-xs text-white font-medium">Business</span>
                      </div>
                      <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </div>
                    <div className="relative aspect-square bg-gradient-to-br from-blue-600 to-blue-800">
                      <img 
                        src={heroPost1} 
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-bold">RISE ABOVE THE REST</p>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-4">
                        <Heart className="w-5 h-5 text-white/80" />
                        <MessageCircle className="w-5 h-5 text-white/80" />
                        <Send className="w-5 h-5 text-white/80" />
                        <Bookmark className="w-5 h-5 text-white/80 ml-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Post 2 */}
                  <div className="bg-[#1a1a1b] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="flex items-center justify-between p-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                        <span className="text-xs text-white font-medium">Business</span>
                      </div>
                      <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </div>
                    <div className="relative aspect-square bg-gradient-to-br from-orange-400 to-red-500">
                      <img 
                        src={heroPost2} 
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 right-4">
                        <p className="text-white text-lg font-bold">YOUR GAME.<br/>YOUR STORY.</p>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-4">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                        <MessageCircle className="w-5 h-5 text-white/80" />
                        <Send className="w-5 h-5 text-white/80" />
                        <Bookmark className="w-5 h-5 text-white/80 ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    Instagram Growth
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-white">8.6K</span>
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +12% vs last week
                        </span>
                      </div>
                      <div className="relative h-24">
                        <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 80 Q 50 70, 75 60 T 150 40 T 225 30 T 300 20"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="2"
                          />
                          <path
                            d="M 0 80 Q 50 70, 75 60 T 150 40 T 225 30 T 300 20 L 300 100 L 0 100 Z"
                            fill="url(#gradient)"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-xs text-[#7d8187] mb-1">Total Users</p>
                        <p className="text-lg font-bold text-white">120K</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-xs text-[#7d8187] mb-1">Engagement</p>
                        <p className="text-lg font-bold text-white">8.4%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/10 py-8 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">12,000+</div>
              <div className="text-sm text-[#7d8187]">Businesses trust Feedbird</div>
            </div>
            <div className="flex items-center gap-8 opacity-60">
              <div className="text-white font-bold text-lg">Google</div>
              <div className="text-white font-bold text-lg">Nestlé</div>
              <div className="text-white font-bold text-lg">Nespresso</div>
              <div className="text-white font-bold text-lg">Outback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
              Examples of our work
            </h2>
            <p className="text-xl text-[#7d8187] max-w-3xl mx-auto">
              Get your design & marketing work done without the hassle of unreliable freelancers, costly agencies. Pay a fixed, monthly, and predictable rate, with no contracts or surprises.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 rounded-lg font-['Geist_Mono'] text-sm tracking-[0.05em] uppercase transition-all duration-300 ${
                activeTab === 'posts'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              📱 Posts
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 rounded-lg font-['Geist_Mono'] text-sm tracking-[0.05em] uppercase transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              🎥 Videos
            </button>
            <button
              onClick={() => setActiveTab('emails')}
              className={`px-6 py-3 rounded-lg font-['Geist_Mono'] text-sm tracking-[0.05em] uppercase transition-all duration-300 ${
                activeTab === 'emails'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              ✉️ Emails
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-3 rounded-lg font-['Geist_Mono'] text-sm tracking-[0.05em] uppercase transition-all duration-300 ${
                activeTab === 'blogs'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              ✏️ Blogs
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-[#1a1a1b] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </div>
                      <span className="text-sm text-white font-medium">Feedbird</span>
                    </div>
                    <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Actions */}
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <Heart className="w-6 h-6 text-white/80 hover:text-red-500 hover:scale-110 transition-all cursor-pointer" />
                      <MessageCircle className="w-6 h-6 text-white/80 hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer" />
                      <Send className="w-6 h-6 text-white/80 hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer" />
                      <Bookmark className="w-6 h-6 text-white/80 hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer ml-auto" />
                    </div>
                    <div className="text-sm text-white mb-1">
                      <span className="font-semibold">{post.likes}</span> likes
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2">
                      <span className="font-semibold text-white">Feedbird</span> {post.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="text-center py-20">
              <p className="text-xl text-[#7d8187]">Video examples coming soon...</p>
            </div>
          )}

          {activeTab === 'emails' && (
            <div className="text-center py-20">
              <p className="text-xl text-[#7d8187]">Email examples coming soon...</p>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="text-center py-20">
              <p className="text-xl text-[#7d8187]">Blog examples coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="px-6 py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
            Ready to elevate your social media?
          </h2>
          <p className="text-xl text-[#7d8187] mb-12 max-w-2xl mx-auto">
            Join 12,000+ businesses using CIELO to create stunning social content that converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('/lets-talk')}
              className="px-8 py-4 rounded-full bg-cyan-500 text-white font-['Geist_Mono'] text-sm tracking-[0.1em] uppercase hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              Schedule a free demo
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('/portfolio')}
              className="px-8 py-4 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
