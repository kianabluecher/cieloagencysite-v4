import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight, Calendar } from 'lucide-react';
import { trackJobView } from '../../utils/careers-api';
import { SEOHead } from '../SEOHead';
import { ApplicationForm } from '../ApplicationForm';

interface JobDetailProps {
  jobId?: string;
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
  responsibilities?: string[];
  qualifications?: string[];
  niceToHave?: string[];
  whatWeOffer?: string[];
  aboutRole?: string;
  aboutCielo?: string;
  featured?: boolean;
  status: string;
  url?: string;
  posted_date: string;
}

// Detailed job content
const jobDetails: Record<string, Job> = {
  'marketing-specialist-business-rep': {
    id: 'marketing-specialist-business-rep',
    title: 'Marketing Specialist / Business Representative',
    location: 'Remote',
    department: 'Consulting',
    type: 'Contract',
    description: 'Join CIELO as a boutique consulting specialist, delivering high-impact strategic work (5-20 hrs/week) while driving business development through expertise and relationships.',
    requirements: [],
    responsibilities: [
      'Deliver high-impact consulting projects in your specialist domain (5-20 hours/week)',
      'Conduct strategy sessions, audits, and implementation support for clients',
      'Create frameworks, roadmaps, and playbooks that drive measurable results',
      'Choose between self-managed LinkedIn outreach (30-45 min/day) or EA-managed approach',
      'Build and nurture professional network through conversational peer-to-peer engagement',
      'Surface warm leads and qualified opportunities for consulting projects',
      'Represent CIELO and your expertise to decision-makers in target markets',
      'Take discovery calls and close consulting projects with autonomy'
    ],
    qualifications: [
      '5+ years of experience in specialist domain (marketing, sales ops, product, operations, or finance)',
      'Consulting, advisory, or fractional experience with proven client deliverables',
      'Strong LinkedIn presence with professional industry positioning (1,000+ connections preferred)',
      'Excellent written and verbal communication for client-facing work',
      'Self-directed with ability to manage projects and client relationships independently',
      'Available 5-20 hours/week for consulting work',
      'Track record of delivering measurable client impact'
    ],
    niceToHave: [
      'Case studies or portfolio of past client work',
      'Existing LinkedIn network in target industries',
      'Experience with business development or sales',
      'Knowledge of LinkedIn outreach best practices',
      'Previous fractional or consulting experience',
      'Familiarity with CRM tools and lead tracking'
    ],
    whatWeOffer: [
      'Flexible consulting income at competitive hourly rates',
      'Steady flow of clients without running your own agency',
      'Shared resources, cross-referrals, and infrastructure support',
      'Choice between self-managed or EA-managed LinkedIn outreach',
      'Autonomy in project delivery and client relationships',
      'Proven message templates and qualified lead lists',
      'Weekly optimization support based on reply rates',
      '5-20 billable hours per week with growth potential'
    ],
    aboutRole: `CIELO is building a network of 5 senior specialists who combine high-impact consulting work with strategic business development. This is not a traditional SDR role—you're a consultant and business representative who drives revenue through expertise and relationships.

You'll deliver strategic work in your domain—whether that's growth & marketing (demand gen, content, positioning), revenue & sales ops (pipeline, CRM, forecasting), product & strategy (PMF, roadmaps, pricing), operations & finance (modeling, fundraising), or tech & automation (workflows, AI, martech).

Choose your approach: Either run a simple LinkedIn outreach routine yourself (30-45 min/day) to build your network, or have our EA team handle outreach using your profile while you focus purely on consulting and closing warm leads. Either way, you own delivery and CIELO handles contracts, invoicing, and project coordination.

Success metrics focus on consulting quality (5-20 billable hours/week, high client satisfaction, measurable impact) and supporting business development (2-4 warm conversations/week, 2-3 qualified opportunities/month, steady network growth).`,
    aboutCielo: `CIELO is a boutique consulting collective connecting senior specialists with high-growth companies. We deliver strategic expertise across marketing, sales, operations, product, and finance—without the overhead of full-time hires.

We provide the infrastructure, clients, and support so you can focus on what you do best: delivering high-impact strategic work. Whether you're a marketing strategist, revenue ops expert, growth advisor, product consultant, or operations specialist, CIELO gives you flexible consulting income, a steady client flow, and the leverage of a collective.`,
    featured: true,
    status: 'open',
    posted_date: '2025-01-15'
  },
  'sdr': {
    id: 'sdr',
    title: 'Sales Specialist & SDR',
    location: 'Remote',
    department: 'Sales',
    type: 'Full-time',
    description: 'Own top-of-funnel and early sales execution. Generate qualified opportunities, book sales calls, and support closing high-value Brand & Web and Content Retainer deals.',
    requirements: [],
    responsibilities: [
      'Outbound prospecting via LinkedIn, email, and warm networks',
      'Qualify inbound and outbound leads against CIELO ICPs',
      'Book strategy calls for Brand & Web launches and monthly retainers',
      'Run discovery and pre-qual calls when required',
      'Maintain clean CRM, pipeline updates, and follow-ups',
      'Collaborate with Strategy and Delivery teams for handoff',
      'Hit weekly activity and booking targets'
    ],
    qualifications: [
      '2–4 years SDR or sales experience in agency, SaaS, or B2B services',
      'Comfortable with founders, operators, investors',
      'Sharp communicator. Confident. No fluff.',
      'Understands consultative selling, not scripts',
      'Obsessed with follow-ups and numbers',
      'Track record of hitting booking and activity targets'
    ],
    niceToHave: [
      'Experience selling creative or brand services',
      'Existing network of founders or startup operators',
      'Familiarity with HubSpot or similar CRM platforms',
      'Understanding of brand strategy and web design',
      'Previous experience in fast-moving startup or agency environment'
    ],
    whatWeOffer: [
      'Base salary + commission per qualified call and closed deal',
      'Upside tied directly to performance',
      'Premium offers with serious clients',
      'Clear ICPs and positioning',
      'Fast-moving team with real authority',
      'Direct impact on revenue and growth',
      'Work with high-value Brand & Web launches ($5K–$9K)',
      'Content & Brand Management Retainers ($2K–$7K/mo)'
    ],
    aboutRole: `You own top-of-funnel and early sales execution. Your job is to generate qualified opportunities, book sales calls, and support closing high-value Brand & Web and Content Retainer deals. 

This is not generic outreach. You sell clarity, credibility, and execution. You're working with premium offers, serious clients, and a team that moves fast.

You'll be measured on qualified calls booked per week, show-up rate, conversion to proposal, and closed-won revenue influence. Your compensation is directly tied to performance – base + commission per qualified call and closed deal.`,
    aboutCielo: `CIELO Agency works with ambitious founders and operators who need premium Brand & Web launches and ongoing Content & Brand Management. We sell clarity, positioning, and execution – not templated solutions.

We have clear ICPs, strong positioning, and a fast-moving team with real authority. You'll be selling Brand & Web Launches ($5K–$9K) and Content & Brand Management Retainers ($2K–$7K/mo), with opportunities for advisory and long-term partnerships. This is consultative selling to founders, operators, and investors who value premium work.`,
    featured: true,
    status: 'open',
    posted_date: '2025-01-14'
  },
  'brand-strategist': {
    id: 'brand-strategist',
    title: 'Senior Brand Strategist',
    location: 'Remote',
    department: 'Brand & Strategy',
    type: 'Full-time',
    description: 'Lead brand strategy development from research through positioning and messaging',
    requirements: [],
    responsibilities: [
      'Lead brand strategy development from research through positioning and messaging',
      'Conduct stakeholder interviews, customer research, and competitive analysis',
      'Develop brand positioning frameworks, messaging architectures, and brand voice guidelines',
      'Create comprehensive brand strategy documentation and presentations',
      'Collaborate with creative teams to ensure strategic alignment',
      'Present strategies to C-level executives and key stakeholders'
    ],
    qualifications: [
      '5+ years of experience in brand strategy',
      'Portfolio demonstrating successful brand launches',
      'Deep understanding of startup ecosystems',
      'Exceptional presentation and communication skills',
      'Strong analytical and strategic thinking abilities',
      'Experience working with diverse industries and markets'
    ],
    niceToHave: [
      'Experience in agency environment',
      'Background in marketing or advertising',
      'Familiarity with design thinking methodologies',
      'MBA or relevant advanced degree',
      'Public speaking experience'
    ],
    whatWeOffer: [
      'Competitive salary and benefits package',
      'Opportunity to work on high-impact brand projects',
      'Collaborative and creative work environment',
      'Professional development opportunities',
      'Flexible remote work arrangement',
      'Work with ambitious founders and operators'
    ],
    aboutRole: `As a Senior Brand Strategist at CIELO, you'll lead the strategic vision for our clients' brands. You'll work directly with founders and executives to define positioning, craft messaging, and build brand foundations that drive business growth.

This role requires both strategic thinking and creative problem-solving. You'll need to understand complex business challenges, translate insights into actionable strategies, and communicate your vision compellingly to diverse stakeholders.`,
    aboutCielo: `CIELO Agency works with ambitious founders and operators who need premium Brand & Web launches and ongoing Content & Brand Management. We're a fast-moving team that values clarity, execution, and strategic thinking.`,
    featured: true,
    status: 'open',
    posted_date: '2025-01-15'
  },
  'creative-director': {
    id: 'creative-director',
    title: 'Creative Director',
    location: 'Remote',
    department: 'Design',
    type: 'Full-time',
    description: 'Lead creative vision and direction for all client projects',
    requirements: [],
    responsibilities: [
      'Lead creative vision and direction for all client projects',
      'Oversee brand identity design, web design, and digital campaigns',
      'Manage and mentor design team members',
      'Present creative concepts to clients and stakeholders',
      'Ensure design quality and brand consistency across all deliverables',
      'Collaborate with strategy and development teams'
    ],
    qualifications: [
      '7+ years of design experience with 3+ years in leadership',
      'World-class portfolio demonstrating range',
      'Expert proficiency in Figma and Adobe Creative Suite',
      'Experience managing creative teams',
      'Strong presentation and client communication skills',
      'Deep understanding of brand design and digital experiences'
    ],
    niceToHave: [
      'Experience in agency environment',
      'Motion design capabilities',
      'Web development knowledge (HTML/CSS)',
      'Typography expertise',
      'Awards or industry recognition'
    ],
    whatWeOffer: [
      'Competitive salary and leadership role',
      'Opportunity to shape creative direction',
      'Work on diverse, high-impact projects',
      'Collaborative and supportive team',
      'Professional growth opportunities',
      'Flexible remote work'
    ],
    aboutRole: `As Creative Director, you'll set the creative standard for CIELO Agency. You'll lead our design team, shape visual identities for ambitious brands, and ensure every project meets our high bar for excellence.

This role requires both creative vision and leadership skills. You'll need to inspire your team, guide clients through the creative process, and deliver work that makes an impact.`,
    aboutCielo: `CIELO Agency creates premium brand experiences for founders and operators who value exceptional design. We're a creative-first agency with a focus on clarity and execution.`,
    featured: true,
    status: 'open',
    posted_date: '2025-01-10'
  },
  'full-stack-developer': {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    location: 'Remote',
    department: 'Development',
    type: 'Full-time',
    description: 'Build full-stack web applications using React, Next.js, and TypeScript',
    requirements: [],
    responsibilities: [
      'Build responsive web applications using React, Next.js, and TypeScript',
      'Implement pixel-perfect designs from Figma',
      'Develop RESTful APIs and integrate third-party services',
      'Write clean, maintainable, and well-documented code',
      'Collaborate with designers and project managers',
      'Optimize applications for performance and SEO'
    ],
    qualifications: [
      '3+ years of professional full-stack development experience',
      'Strong proficiency in React, TypeScript, and modern JavaScript',
      'Experience with Next.js or similar React frameworks',
      'Solid understanding of HTML, CSS, and responsive design',
      'Experience with Node.js and RESTful API development',
      'Familiarity with Git and version control workflows'
    ],
    niceToHave: [
      'Experience with Tailwind CSS',
      'Knowledge of serverless architectures',
      'Familiarity with Supabase or Firebase',
      'Experience with animation libraries (Framer Motion)',
      'Understanding of web accessibility standards'
    ],
    whatWeOffer: [
      'Competitive salary and benefits',
      'Work on diverse client projects',
      'Modern tech stack and tools',
      'Collaborative remote team',
      'Professional development support',
      'Flexible work schedule'
    ],
    aboutRole: `As a Full-Stack Developer at CIELO, you'll build the digital experiences that bring our clients' brands to life. You'll work closely with our design team to create fast, beautiful, and functional web applications.

We value clean code, attention to detail, and the ability to translate design vision into production-ready applications.`,
    aboutCielo: `CIELO Agency builds premium web experiences for ambitious brands. We use modern technologies and best practices to deliver high-quality digital products.`,
    featured: true,
    status: 'open',
    posted_date: '2025-01-08'
  },
  'social-media-manager': {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    location: 'Remote',
    department: 'Marketing',
    type: 'Full-time',
    description: 'Develop and execute social media strategies for multiple client accounts',
    requirements: [],
    responsibilities: [
      'Develop and execute social media strategies for multiple client accounts',
      'Create engaging content calendars and post schedules',
      'Write compelling copy for social media posts',
      'Monitor social media trends and platform updates',
      'Analyze performance metrics and optimize campaigns',
      'Engage with audiences and manage community interactions'
    ],
    qualifications: [
      '3+ years managing social media for brands',
      'Proven track record of growing social audiences',
      'Excellent copywriting skills',
      'Experience with social media management tools',
      'Strong understanding of social media analytics',
      'Ability to manage multiple client accounts'
    ],
    niceToHave: [
      'Experience in agency environment',
      'Graphic design skills',
      'Video editing capabilities',
      'Paid social advertising experience',
      'Influencer marketing knowledge'
    ],
    whatWeOffer: [
      'Competitive salary',
      'Work with diverse brands',
      'Creative freedom',
      'Supportive team environment',
      'Professional growth opportunities',
      'Flexible remote work'
    ],
    aboutRole: `As a Social Media Manager at CIELO, you'll craft social strategies that build audiences and drive engagement for our clients. You'll work across multiple platforms and industries, bringing brands to life through compelling content.

We're looking for someone who understands social media as both an art and a science – creative in execution, analytical in optimization.`,
    aboutCielo: `CIELO Agency manages social media for ambitious brands. We create content that resonates, strategies that work, and communities that engage.`,
    featured: false,
    status: 'open',
    posted_date: '2025-01-05'
  },
  'motion-designer': {
    id: 'motion-designer',
    title: 'Motion Designer',
    location: 'Remote',
    department: 'Design',
    type: 'Contract',
    description: 'Create motion graphics and animations for brand campaigns',
    requirements: [],
    responsibilities: [
      'Create motion graphics and animations for brand campaigns',
      'Design animated social media content',
      'Develop brand motion systems and guidelines',
      'Edit video content for marketing campaigns',
      'Collaborate with creative team on multimedia projects',
      'Deliver high-quality motion work on tight deadlines'
    ],
    qualifications: [
      '3+ years of motion design experience',
      'Expert proficiency in After Effects',
      'Strong skills in Premiere Pro or Final Cut',
      'Portfolio showcasing range of motion work',
      'Understanding of animation principles',
      'Ability to work independently on projects'
    ],
    niceToHave: [
      'Cinema 4D or Blender experience',
      'Sound design skills',
      'Illustration capabilities',
      'Experience with brand campaigns',
      'Agency background'
    ],
    whatWeOffer: [
      'Competitive contract rates',
      'Diverse project opportunities',
      'Creative freedom',
      'Flexible schedule',
      'Potential for ongoing work',
      'Remote collaboration'
    ],
    aboutRole: `As a Motion Designer working with CIELO, you'll bring brands to life through motion. You'll create animations that capture attention, communicate messages, and elevate brand experiences across digital channels.

This is a contract position with opportunities for ongoing collaboration on multiple projects.`,
    aboutCielo: `CIELO Agency creates motion content for ambitious brands. We value creativity, technical skill, and the ability to deliver high-quality work efficiently.`,
    featured: false,
    status: 'open',
    posted_date: '2025-01-03'
  },
  'ui-ux-designer': {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    location: 'Remote',
    department: 'Design',
    type: 'Full-time',
    description: 'Design user interfaces and experiences for web and mobile applications',
    requirements: [],
    responsibilities: [
      'Design user interfaces and experiences for web and mobile applications',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Develop design systems and component libraries',
      'Collaborate with developers to ensure design implementation',
      'Present design rationale to clients and stakeholders'
    ],
    qualifications: [
      '3+ years of UI/UX design experience',
      'Expert proficiency in Figma',
      'Strong portfolio showcasing web/mobile work',
      'Understanding of user-centered design principles',
      'Experience with design systems',
      'Ability to balance aesthetics with usability'
    ],
    niceToHave: [
      'Front-end development knowledge',
      'Experience with user research methodologies',
      'Motion design skills',
      'Accessibility expertise',
      'Agency experience'
    ],
    whatWeOffer: [
      'Competitive salary and benefits',
      'Work on diverse digital products',
      'Collaborative design team',
      'Professional development support',
      'Flexible remote work',
      'Growth opportunities'
    ],
    aboutRole: `As a UI/UX Designer at CIELO, you'll design digital experiences that are both beautiful and functional. You'll work on web applications, mobile apps, and digital platforms for our clients.

We value designers who think about the complete user experience – from information architecture to interaction design to visual polish.`,
    aboutCielo: `CIELO Agency designs digital products for ambitious brands. We create interfaces that users love and experiences that drive business results.`,
    featured: false,
    status: 'open',
    posted_date: '2025-01-01'
  }
};

export function JobDetail({ jobId: propJobId, onNavigate }: JobDetailProps) {
  const { jobId: urlJobId } = useParams<{ jobId: string }>();
  const jobId = urlJobId || propJobId;
  const [isLoading, setIsLoading] = useState(true);
  const job = jobId ? jobDetails[jobId] : null;

  useEffect(() => {
    // Track job view
    if (jobId && job) {
      trackJobView(jobId);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [jobId, job]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-4">Job not found</h1>
          <button
            onClick={() => onNavigate('jobs')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Generate SEO content
  const seoTitle = `${job.title} - Careers at CIELO Agency`;
  const seoDescription = job.description;
  const seoKeywords = `${job.title}, ${job.department}, ${job.location}, CIELO Agency careers, job opening`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogType="website"
      />

      <div className="min-h-screen bg-[#0A0A0B] text-white">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
          <button
            onClick={() => onNavigate('jobs')}
            className="text-zinc-400 hover:text-white transition-colors mb-12 text-sm font-light"
          >
            ← Back to all positions
          </button>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-light">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-light">{job.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-light">{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-light">Posted: {job.posted_date}</span>
              </div>
            </div>

            <p className="text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-5xl mx-auto px-6 pb-32 space-y-16">
          {/* About the Role */}
          {job.aboutRole && (
            <section>
              <h2 className="text-2xl font-light mb-6">About the role</h2>
              <p className="text-zinc-400 font-light leading-relaxed whitespace-pre-line">
                {job.aboutRole}
              </p>
            </section>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6">Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-cyan-400 mt-1">→</span>
                    <span className="text-zinc-400 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Qualifications */}
          {job.qualifications && job.qualifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6">Qualifications</h2>
              <ul className="space-y-4">
                {job.qualifications.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-cyan-400 mt-1">→</span>
                    <span className="text-zinc-400 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Nice to Have */}
          {job.niceToHave && job.niceToHave.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6">Nice to have</h2>
              <ul className="space-y-4">
                {job.niceToHave.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-cyan-400 mt-1">→</span>
                    <span className="text-zinc-400 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* What We Offer */}
          {job.whatWeOffer && job.whatWeOffer.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6">What we offer</h2>
              <ul className="space-y-4">
                {job.whatWeOffer.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-cyan-400 mt-1">→</span>
                    <span className="text-zinc-400 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* About CIELO */}
          {job.aboutCielo && (
            <section>
              <h2 className="text-2xl font-light mb-6">About CIELO</h2>
              <p className="text-zinc-400 font-light leading-relaxed whitespace-pre-line">
                {job.aboutCielo}
              </p>
            </section>
          )}

          {/* Application Section */}
          <section className="pt-12">
            <h2 className="text-4xl font-light mb-8">Apply to be part</h2>
            <ApplicationForm jobTitle={job.title} />
          </section>
        </div>
      </div>
    </>
  );
}