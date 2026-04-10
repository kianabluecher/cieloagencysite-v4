import { createClient } from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

/**
 * Utility to add a blog post programmatically
 * Usage: Call this function with blog post data
 */
export async function addBlogPost() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('Not authenticated. Please log in first.');
    }

    const blogPostData = {
      title: "Digital Marketing Agency vs AI Marketing Agency – What Clients Really Care About",
      slug: "digital-marketing-agency-vs-ai-marketing-agency",
      excerpt: "Clients aren't buying \"AI\"—they're buying outcomes. Discover what really matters when choosing between a traditional digital marketing agency and an AI marketing agency in 2026.",
      content: `<h2>Intro: Clients Aren't Buying "AI"—They're Buying Outcomes</h2>
<p>Everywhere you look, agencies have quietly rebranded themselves as some flavor of "AI‑powered digital marketing agency." But on Reddit and in RFPs, buyers keep asking the same question in different words: "Will this agency actually grow my revenue, or just send me reports?"</p>

<h2>What a "Traditional" Digital Marketing Agency Still Does Best</h2>
<p>A strong digital marketing agency is built around channel mastery and execution. Even in 2026, clients rely on agencies to:</p>

<ul>
<li>Design and build conversion‑focused website design services and landing pages that actually convert traffic.</li>
<li>Run SEO services and content marketing services that drive qualified organic demand, not just impressions.</li>
<li>Manage paid media, email marketing services, and social media management with a clear ROI model.</li>
</ul>

<p>This work is still mission‑critical—especially for small businesses and B2B service brands that don't have in‑house teams.</p>

<h2>What an AI Marketing Agency Brings to the Table</h2>
<p>An AI marketing agency layers automation, prediction, and acceleration on top of those same fundamentals. Instead of replacing core services, AI reshapes how they're delivered:</p>

<p><strong>AI content marketing:</strong> Using models to generate first drafts of blogs, FAQs, and landing pages built around your Tier 1 and Tier 2 keyword clusters, then human‑editing for brand voice and accuracy.</p>

<p><strong>AI‑assisted CRO:</strong> Running faster A/B tests on creative, copy, and offers using AI to generate new variants and interpret performance patterns.</p>

<p><strong>AI‑driven segmentation:</strong> Building smarter audiences and email flows based on behavior, not just demographics, then automating nurture and upsell sequences.</p>

<p>Done well, this doesn't look like "robots doing marketing." It feels like a team that moves 10x faster without dropping quality.</p>

<h2>The Questions Smart Clients Ask in 2026</h2>
<p>On Reddit and in founder communities, you'll notice that savvy buyers rarely ask, "Do you use AI?" Instead, they ask:</p>

<ul>
<li>"How do you prove that your AI workflows actually improve performance—not just output volume?"</li>
<li>"Where are humans still in the loop, especially on messaging, brand reputation management, and creative direction?"</li>
<li>"How will you integrate with our stack—CRM, analytics, AI tools—without creating more complexity?"</li>
</ul>

<p>Your positioning as an AI marketing agency should answer these questions clearly on your digital marketing services, content marketing services, and SEO services pages.</p>

<h2>How to Reposition Your Agency Without Losing Your Core</h2>
<p>If you already offer digital marketing services and want to be seen as an AI‑forward partner, you don't need a complete rebrand. You need to:</p>

<p><strong>Map AI into existing offers:</strong> Show exactly how AI accelerates research, production, and optimization for each service—from SEO services to social media marketing agency retainers.</p>

<p><strong>Productize AI workflows:</strong> Turn things like "AI content sprints," "AI‑assisted CRO audits," or "AI‑powered brand voice systems" into named deliverables inside your packages.</p>

<p><strong>Show proof, not hype:</strong> Use before/after case studies and simple dashboards to show how AI reduced time‑to‑launch or improved ROI.</p>

<p>This lets you rank for both "digital marketing agency" and "AI marketing agency" while telling one coherent story about strategy, systems, and scale.</p>`,
      category: "AI Marketing",
      tags: "AI marketing, digital marketing, content marketing, SEO services, social media marketing, AI content creation",
      author_name: "CIELO Agency",
      author_role: "Digital Marketing Experts",
      author_bio: "CIELO Agency is an AI-powered digital marketing agency specializing in content marketing, SEO, and social media management.",
      status: "published",
      featured: true,
      meta_title: "Digital Marketing Agency vs AI Marketing Agency | CIELO Agency",
      meta_description: "Discover what clients really care about when choosing between a traditional digital marketing agency and an AI marketing agency. Learn how AI accelerates content marketing services, SEO services, and social media marketing in 2026.",
      meta_keywords: ["digital marketing agency", "digital marketing services", "AI marketing agency", "AI content marketing", "content marketing services", "social media marketing agency", "SEO services"],
      featured_image: "",
      featured_image_alt: "Digital marketing agency team working with AI technology"
    };

    const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/create`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogPostData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create blog post: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Blog post created successfully!', result);
    return result;
  } catch (error) {
    console.error('❌ Error adding blog post:', error);
    throw error;
  }
}
