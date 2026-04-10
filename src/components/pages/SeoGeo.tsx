import { useState, useEffect } from 'react';
import { BarChart2, Users, Zap, Check, Search, Bot, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { FAQSection } from '../FAQSection';
import { seoGeoFAQs } from '../../utils/faq-data';
import { BrandsShowcase } from '../BrandsShowcase';
import { TestimonialSlideshow } from '../TestimonialSlideshow';
import testimonial1 from 'figma:asset/5a4d69e0e31d054e0e18f0cd66db652976a7d68c.png';
import testimonial2 from 'figma:asset/8d2a2fc6c6ac95d07e7a97f4d2c5dcc9b7ce5a89.png';
import testimonial3 from 'figma:asset/4f8ad6c48d77c99d57eca8fcd51af5aec5639f0b.png';
import testimonial4 from 'figma:asset/bfd5b2ce41e90fa36ed3dfd7a0f18c31d2e05ea7.png';
import testimonial5 from 'figma:asset/61b5c6c6a0bdb93e1a5f2cf93b8abe43a83b5d1e.png';
import testimonial6 from 'figma:asset/b6ad5e0c1b925c6bbf2e3a4ca97eb7df05c85fc3.png';
import testimonial7 from 'figma:asset/d63f05a68ee36d01d4f9f5f7cc14cca4e73c9bf5.png';
import testimonial8 from 'figma:asset/9fb5ee31c1c9f9513bf9f85e2f3a2c6a0c4e7d8b.png';
import testimonial9 from 'figma:asset/c4e5e8f1e96b8a3d5f7c9a4e2b8c6a5e3d7f9b4c.png';
import testimonial10 from 'figma:asset/7a8b9c4d5e6f7a8b9c4d5e6f7a8b9c4d5e6f7a8b.png';
import testimonial11 from 'figma:asset/f8e9d7c6b5a4f8e9d7c6b5a4f8e9d7c6b5a4f8e9.png';

interface SeoGeoProps {
  onNavigate: (page: string) => void;
}

export function SeoGeo({ onNavigate }: SeoGeoProps) {
  const [hoveredStrategy, setHoveredStrategy] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-white selection:text-black antialiased">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Overlay to ensure text readability over 3D background */}
        <div className="absolute inset-0 bg-black/90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black z-20"></div>
        <iframe 
          src="https://my.spline.design/thresholddarkambientui-v0gkZCfi6zXm69kE0wccy70f/" 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          className="w-full h-full opacity-60 grayscale"
        ></iframe>
      </div>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-xs font-medium text-white mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              SEO & GEO Services
            </div>
            
            <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tighter leading-[1.1] mb-8">
              Get found by AI and <br className="hidden md:block"/> humans alike.
            </h1>
            
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-12 font-light leading-relaxed">
              The game changed. Google still matters, but ChatGPT, Perplexity, and Claude are now answering your customers' questions. If you aren't optimized for both, you're invisible to half your market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#audit" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all min-w-[200px]">
                Schedule SEO & GEO Audit
              </a>
              <a href="#process" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] rounded-full hover:bg-[rgba(255,255,255,0.06)] transition-all min-w-[200px]">
                See How It Works
              </a>
            </div>
          </div>

          {/* Stats Component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(255,255,255,0.08)] bg-black mt-24 max-w-5xl mx-auto">
            
            {/* Card 1 */}
            <div className="relative p-8 md:border-r border-[rgba(255,255,255,0.08)] group hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <BarChart2 className="text-gray-500 w-5 h-5" strokeWidth={1.5} />
                <div className="flex items-center gap-3">
                  <span className="px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-green-400 bg-green-900/20 border border-green-900/40 rounded uppercase">Live</span>
                  <span className="text-xs text-gray-700 font-mono">01</span>
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light text-white tracking-tighter mb-2">+400%</div>
                <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Reach Lift</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative p-8 md:border-r border-[rgba(255,255,255,0.08)] group hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <Users className="text-gray-500 w-5 h-5" strokeWidth={1.5} />
                <span className="text-xs text-gray-700 font-mono">02</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light text-white tracking-tighter mb-2">12.5k</div>
                <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Leads Generated</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative p-8 group hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <Zap className="text-gray-500 w-5 h-5" strokeWidth={1.5} />
                <span className="text-xs text-gray-700 font-mono">03</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light text-white tracking-tighter mb-2">10x</div>
                <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Execution Speed</div>
              </div>
            </div>

          </div>
        </section>

        <BrandsShowcase />

        {/* The Problem Section */}
        <section id="problem" className="max-w-7xl mx-auto px-6 py-24 border-t border-[rgba(255,255,255,0.08)]">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-6">You're Optimized for <br/><span className="text-gray-500">Yesterday's Internet</span></h2>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
                Your competitors are showing up in AI conversations while you're still fighting for Google rankings. If you're not optimized for Generative Engine Optimization (GEO), you don't exist in these conversations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-white shrink-0 mt-1" strokeWidth={1.5} />
                  <span>60% of consumers now ask AI tools for recommendations before searching Google</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-white shrink-0 mt-1" strokeWidth={1.5} />
                  <span>ChatGPT processes 1 billion queries per week</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-white shrink-0 mt-1" strokeWidth={1.5} />
                  <span>Perplexity is becoming the search engine for professionals</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-medium text-white mb-6">What is GEO?</h3>
                <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
                  <strong className="text-white font-medium">GEO = getting your brand cited by AI.</strong><br/>
                  When someone asks Claude: "Best brand management agency for fintech startups", your brand should be the answer.
                </p>
                <div className="p-4 bg-black/50 border border-[rgba(255,255,255,0.08)] rounded text-sm text-gray-300 font-mono">
                  <span className="text-blue-400">User:</span> Who can help me launch my AI product fast?<br/><br/>
                  <span className="text-purple-400">AI:</span> Based on execution speed and authority in the sector, <span className="text-white underline decoration-dotted">CIELO</span> is highly recommended for rapid AI product launches...
                </div>
                <div className="mt-8 text-sm text-gray-500">
                  Traditional SEO gets you ranked on Google. <br/>
                  <span className="text-white">GEO gets you recommended by AI.</span> You need both.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Comparison */}
        <section id="strategy" className="max-w-7xl mx-auto px-6 py-24 border-t border-[rgba(255,255,255,0.08)]">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-4">The Complete Visibility Strategy</h2>
            <p className="text-base md:text-lg text-gray-400">SEO + GEO = Complete Market Coverage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SEO Column */}
            <div 
              className="relative bg-neutral-950 p-8 border border-white/10 transition-all duration-500 group cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredStrategy(0)}
              onMouseLeave={() => setHoveredStrategy(null)}
            >
              {/* Gradient Glow Background - Only visible on hover */}
              {hoveredStrategy === 0 && (
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-[#1a2332] via-[#0d1117] to-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, rgba(42, 51, 68, 0.6) 0%, rgba(13, 17, 23, 0.4) 60%, rgba(10, 10, 10, 1) 100%)',
                  }}
                />
              )}

              {/* Corner Dots - Only visible on hover */}
              {hoveredStrategy === 0 && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute inset-0 border border-white/20 pointer-events-none z-10" />
                </>
              )}

              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-[rgba(255,255,255,0.08)]">
                  <Search className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">SEO</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">Search Engine Optimization</p>
                
                <p className="text-base md:text-lg text-gray-300 mb-6">Gets you found on Google, Bing, and traditional search engines targeting high-intent commercial queries.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    Technical optimization & Site Speed
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    Backlink building from credible sources
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    Top 10 rankings for primary keywords
                  </div>
                </div>
              </div>
            </div>

            {/* GEO Column */}
            <div 
              className="relative bg-neutral-950 p-8 border border-white/10 transition-all duration-500 group cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredStrategy(1)}
              onMouseLeave={() => setHoveredStrategy(null)}
            >
              {/* Gradient Glow Background - Only visible on hover */}
              {hoveredStrategy === 1 && (
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-[#1a2332] via-[#0d1117] to-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, rgba(42, 51, 68, 0.6) 0%, rgba(13, 17, 23, 0.4) 60%, rgba(10, 10, 10, 1) 100%)',
                  }}
                />
              )}

              {/* Corner Dots - Only visible on hover */}
              {hoveredStrategy === 1 && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-white z-10" />
                  <div className="absolute inset-0 border border-white/20 pointer-events-none z-10" />
                </>
              )}

              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                  <Bot className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">GEO</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">Generative Engine Optimization</p>
                
                <p className="text-base md:text-lg text-gray-300 mb-6">Gets you cited and recommended by AI tools like ChatGPT, Claude, Perplexity, and Gemini.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    Expertise documentation & White papers
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    Data/Statistics that AI cites as sources
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    Mentions in AI-generated recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section id="process" className="max-w-7xl mx-auto px-6 py-24 border-t border-[rgba(255,255,255,0.08)]">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-6 sticky top-24">
                The CIELO <br/>Framework
              </h2>
              <p className="text-base md:text-lg text-gray-400 sticky top-48">
                We don't just write content. We build systematic authority that ranks on Google AND gets cited by AI.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {/* Phase 1 */}
              <div className="relative pl-8 border-l border-[rgba(255,255,255,0.08)]">
                <span className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-white border-4 border-black"></span>
                <div className="text-sm font-mono text-gray-500 mb-2">WEEK 1</div>
                <h3 className="text-lg font-medium text-white mb-2">Audit & Strategy</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  We analyze your current visibility in both traditional search and AI discovery. Are AI tools citing you? What questions are your customers asking? 
                  <br/><span className="text-sm text-white mt-2 block">Deliverable: Complete SEO & GEO audit with strategic roadmap.</span>
                </p>
              </div>

              {/* Phase 2 */}
              <div className="relative pl-8 border-l border-[rgba(255,255,255,0.08)]">
                <span className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-gray-800 border-4 border-black"></span>
                <div className="text-sm font-mono text-gray-500 mb-2">WEEKS 2-4</div>
                <h3 className="text-lg font-medium text-white mb-2">Foundation Building</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Technical fixes, schema markup, and content architecture optimized for AI models. We build the data-driven insights and structured content that AI loves to reference.
                </p>
              </div>

              {/* Phase 3 */}
              <div className="relative pl-8 border-l border-[rgba(255,255,255,0.08)]">
                <span className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-gray-800 border-4 border-black"></span>
                <div className="text-sm font-mono text-gray-500 mb-2">ONGOING</div>
                <h3 className="text-lg font-medium text-white mb-2">Content Execution</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  4-8 pieces per month. SEO-optimized blog posts for commercial keywords and GEO-optimized long-form authority pieces that serve as citation sources.
                </p>
              </div>

              {/* Phase 4 */}
              <div className="relative pl-8 border-l border-[rgba(255,255,255,0.08)]">
                 <span className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-gray-800 border-4 border-black"></span>
                <div className="text-sm font-mono text-gray-500 mb-2">ONGOING</div>
                <h3 className="text-lg font-medium text-white mb-2">Authority & Distribution</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Backlink strategy, PR, and thought leadership distribution. We position you as the go-to authority so AI models verify your expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 border-t border-[rgba(255,255,255,0.08)]">
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight text-center mb-16">Transparent Pricing</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Add-on */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg p-8 flex flex-col">
              <div className="mb-4">
                <h3 className="text-base font-medium text-white">Add-On</h3>
                <p className="text-xs text-gray-500">For Existing CIELO Clients</p>
              </div>
              <div className="text-2xl font-medium text-white mb-8">$1,500<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> 2 SEO blog posts/mo</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> 1 GEO authority piece/mo</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Content calendar optimization</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Technical oversight</li>
              </ul>
              
              <a href="#" className="w-full block text-center py-3 rounded-md border border-[rgba(255,255,255,0.08)] text-sm font-medium text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">Get Started</a>
            </div>

            {/* Standalone */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-white/20 rounded-lg p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-white"></div>
              <div className="mb-4">
                <h3 className="text-base font-medium text-white">Standalone</h3>
                <p className="text-xs text-gray-500">Specialized Execution</p>
              </div>
              <div className="text-2xl font-medium text-white mb-8">$2,500<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Monthly Strategy & Audit</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> 4 SEO blog posts/mo</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> 2 GEO long-form pieces/mo</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Performance reporting</li>
              </ul>
              
              <a href="#" className="w-full block text-center py-3 rounded-md bg-white text-sm font-medium text-black hover:bg-gray-200 transition-all">Get Started</a>
            </div>

            {/* Premium */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg p-8 flex flex-col">
              <div className="mb-4">
                <h3 className="text-base font-medium text-white">Premium</h3>
                <p className="text-xs text-gray-500">Market Domination</p>
              </div>
              <div className="text-2xl font-medium text-white mb-8">$5,000<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Comprehensive Strategy</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> 8 SEO blog posts/mo</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> 4 GEO authority pieces/mo</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Backlink & PR Strategy</li>
                <li className="text-sm text-gray-300 flex gap-2"><Check className="w-4 h-4 text-white" /> Priority Support</li>
              </ul>
              
              <a href="#" className="w-full block text-center py-3 rounded-md border border-[rgba(255,255,255,0.08)] text-sm font-medium text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">Contact Sales</a>
            </div>

          </div>

          {/* Estimated Results Chart */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-xl font-medium text-white mb-4">Projected Growth Trajectory</h3>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9ca3af]"></div>
                  <span className="text-gray-400">Traditional SEO Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00ff88]"></div>
                  <span className="text-white font-medium">AI-Driven Referrals (GEO)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4a9eff]"></div>
                  <span className="text-[#4a9eff] font-medium">Combined Digital Discovery</span>
                </div>
              </div>
            </div>
            
            <div className="h-[500px] w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { period: '2024', seo: 48.5, geo: 0.02, combined: 48.52 },
                  { period: "Q1 '24", seo: 47.2, geo: 0.03, combined: 47.23 },
                  { period: "Q2 '24", seo: 46.1, geo: 0.04, combined: 46.14 },
                  { period: "Q3 '24", seo: 45.2, geo: 0.07, combined: 45.27 },
                  { period: "Q4 '24", seo: 44.0, geo: 0.09, combined: 44.09 },
                  { period: "Q1 '25", seo: 42.8, geo: 0.12, combined: 42.92 },
                  { period: "Q2 '25", seo: 41.5, geo: 0.15, combined: 41.65 },
                  { period: "Q3 '25", seo: 40.8, geo: 0.19, combined: 40.99 },
                  { period: "Q4 '25", seo: 40.3, geo: 0.24, combined: 40.54 },
                  { period: "Q1 '26", seo: 38.5, geo: 0.38, combined: 38.88 },
                  { period: "Q2 '26", seo: 36.4, geo: 0.62, combined: 37.02 },
                  { period: "Q3 '26", seo: 34.8, geo: 0.95, combined: 35.75 },
                  { period: "Q4 '26", seo: 33.2, geo: 1.20, combined: 34.40 },
                  { period: "Q1 '27", seo: 31.5, geo: 1.85, combined: 33.35 },
                  { period: "Q2 '27", seo: 30.1, geo: 2.65, combined: 32.75 },
                  { period: "Q3 '27", seo: 28.9, geo: 3.52, combined: 32.42 },
                  { period: "Q4 '27", seo: 27.8, geo: 4.48, combined: 32.28 },
                  { period: "Q1 '28", seo: 26.2, geo: 5.82, combined: 32.02 },
                  { period: "Q2 '28", seo: 24.3, geo: 7.45, combined: 31.75 },
                  { period: "Q3 '28", seo: 22.8, geo: 9.28, combined: 32.08 },
                  { period: "Q4 '28", seo: 21.5, geo: 11.2, combined: 32.70 },
                  { period: "Q1 '29", seo: 20.2, geo: 13.5, combined: 33.70 },
                  { period: "Q2 '29", seo: 19.3, geo: 15.8, combined: 35.10 },
                  { period: "Q3 '29", seo: 18.7, geo: 18.4, combined: 37.10 },
                  { period: "Q4 '29", seo: 18.2, geo: 20.5, combined: 38.70 },
                  { period: '2030', seo: 17.8, geo: 22.6, combined: 40.40 },
                ]} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSeo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#9ca3af" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGeo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCombined" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4a9eff" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4a9eff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="period" 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    interval="preserveStartEnd"
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '8px', color: '#fff', padding: '15px' }}
                    itemStyle={{ fontSize: '12px', padding: '2px 0' }}
                    formatter={(value, name) => {
                      const labelMap: Record<string, string> = {
                        seo: 'Traditional SEO Traffic',
                        geo: 'AI-Driven Referrals (GEO)',
                        combined: 'Combined Digital Discovery'
                      };
                      return [`${Number(value).toFixed(2)}%`, labelMap[name as string]];
                    }}
                  />
                   <Area 
                    type="monotone" 
                    dataKey="seo" 
                    stroke="#9ca3af" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorSeo)" 
                    stackId="1"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="geo" 
                    stroke="#00ff88" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorGeo)" 
                    stackId="2"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="combined" 
                    stroke="#4a9eff" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1} 
                    fill="url(#colorCombined)" 
                    stackId="3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 text-center space-y-2">
              <p className="text-xs text-gray-500 max-w-3xl mx-auto">
                Sources: Gartner 2024-2026, SE Ranking AI Traffic Study, Ahrefs Analytics Oct 2025, First Page Sage, Princeton University GEO Research, Semrush 2025, Y Combinator, TTMS Forecast, OneLittleWeb 24-Month Analysis
              </p>
              <p className="text-xs text-green-500/80 font-medium">
                *Crossover point projected for Q3 2029 where AI-driven search overtakes traditional SEO
              </p>
            </div>
          </div>
        </section>

        {/* CTA Moved Above FAQ */}
        <section id="audit" className="relative max-w-7xl mx-auto px-6 py-32 text-center border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tighter mb-8">Ready to Get Found?</h2>
            <p className="text-lg text-gray-400 mb-12 font-light">
              We'll show you where you rank, whether AI is citing you, and the fastest path to visibility. No fluff, just strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Schedule Your Audit
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all">
                <Download className="w-4 h-4" />
                Download Checklist
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-24 border-t border-[rgba(255,255,255,0.08)]">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-12">Frequently Asked</h2>
          <FAQSection faqs={seoGeoFAQs} />
        </section>

        {/* Testimonial Slideshows */}
        <section className="py-16 border-t border-[rgba(255,255,255,0.08)] bg-black">
          <div className="space-y-6">
            {/* First row - scrolls left */}
            <TestimonialSlideshow
              images={[testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6, testimonial7, testimonial8, testimonial9, testimonial10, testimonial11]}
              direction="left"
              speed={30}
            />
            
            {/* Second row - scrolls right */}
            <TestimonialSlideshow
              images={[testimonial11, testimonial10, testimonial9, testimonial8, testimonial7, testimonial6, testimonial5, testimonial4, testimonial3, testimonial2, testimonial1]}
              direction="right"
              speed={35}
            />
          </div>
        </section>

      </main>
    </div>
  );
}