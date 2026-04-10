import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface WordPressWebsiteDesignProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function WordPressWebsiteDesign({ onNavigate }: WordPressWebsiteDesignProps) {
  return (
    <IndustrySubpageTemplate
      category="WordPress Website Design"
      headline="WordPress Sites\nThat Perform"
      subheadline="WordPress powers 40% of the web. Most look like it."
      heroImage="https://images.unsplash.com/photo-1555421689-491a97ff2040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Template sites with bloated plugins and slow load times cost you customers every day. Your competitors with fast, custom WordPress sites are eating your lunch. CIELO builds WordPress websites that combine flexibility with performance—custom designs that load fast, rank well, and convert visitors."
      realityText="Your theme is outdated. Site loads in 8+ seconds. Plugin conflicts break functionality. No mobile optimization. Security vulnerabilities everywhere. Google penalizes your rankings."
      deliverables={[
        {
          title: "Custom WordPress Development",
          description: "Tailored themes, no bloat, optimized code, scalable architecture"
        },
        {
          title: "Performance Optimization",
          description: "Sub-2-second load times, image compression, caching, CDN integration"
        },
        {
          title: "SEO Foundation",
          description: "Clean code, schema markup, XML sitemaps, meta optimization, internal linking"
        },
        {
          title: "Security Hardening",
          description: "SSL certificates, firewall protection, malware scanning, regular updates"
        },
        {
          title: "Content Management",
          description: "Intuitive admin, custom post types, easy editing, media library organization"
        },
        {
          title: "Ongoing Maintenance",
          description: "Monthly updates, backups, security monitoring, performance reports"
        }
      ]}
      whoThisIsFor="Content publishers, bloggers, professional services, membership sites, online magazines"
      timeline="5–7 weeks"
      investment="Starting at $9K"
      ctaHeadline="Build WordPress the right way."
      ctaButtonText="Launch Your WordPress Site"
      faqs={[
        {
          question: "Why WordPress over other platforms?",
          answer: "WordPress offers unmatched flexibility, SEO capabilities, and content management power. When built properly (not with bloated themes), it's the best platform for content-heavy sites."
        },
        {
          question: "How do you improve WordPress performance?",
          answer: "Custom themes (not bloated page builders), optimized code, image compression, caching systems, CDN integration, and database optimization deliver sub-2-second load times."
        },
        {
          question: "Do you provide security and maintenance?",
          answer: "Yes. We include security hardening, SSL certificates, firewall protection, regular backups, plugin updates, and ongoing monitoring to keep your site secure and performing."
        },
        {
          question: "Can you migrate my existing WordPress site?",
          answer: "Absolutely. We handle complete site migrations, preserving your content, SEO rankings, and traffic while upgrading to a faster, more secure foundation."
        }
      ]}
      strategist={{
        name: "Marcus Thompson",
        title: "WordPress Performance Specialist",
        image: img210,
        calloutText: "WordPress done right outperforms everything",
        calloutDescription: "I've built 300+ custom WordPress sites that load fast, rank high, and convert visitors—proving WordPress isn't the problem, templates are."
      }}
      onNavigate={onNavigate}
    />
  );
}
