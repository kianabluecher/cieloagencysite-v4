import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service' | 'product';
  author?: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: any; // Custom JSON-LD structured data
  breadcrumbs?: Array<{ name: string; url: string }>;
  aggregateRating?: { ratingValue: number; reviewCount: number };
}

const DEFAULT_SEO = {
  title: 'CIELO Agency | Strategic Branding & Growth Systems',
  description: 'CIELO Agency builds credible brands with strategy, design, and growth systems. We deliver social content, web, and operations for founders.',
  image: 'https://www.cielo.agency/og-image.jpg',
  url: 'https://www.cielo.agency/',
  type: 'website' as const,
  keywords: 'strategic branding, growth systems, brand strategy, digital presence, social content, web development, brand management',
  author: 'CIELO Agency',
};

export function SEOHead({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  url = DEFAULT_SEO.url,
  type = DEFAULT_SEO.type,
  author = DEFAULT_SEO.author,
  keywords = DEFAULT_SEO.keywords,
  publishedTime,
  modifiedTime,
  jsonLd,
  breadcrumbs,
  aggregateRating,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (property: string, content: string, nameType: 'name' | 'property' = 'name') => {
      const selector = `meta[${nameType}="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameType, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic SEO Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph Meta Tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'CIELO Agency', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');

    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@cieloagency');
    updateMetaTag('twitter:site', '@cieloagency');

    // Article specific tags (if type is article)
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, 'property');
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, 'property');
      }
      updateMetaTag('article:author', author, 'property');
    }

    // Additional SEO tags
    updateMetaTag('theme-color', '#0a0a0a');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', url);

    // JSON-LD Structured Data for Organization
    const jsonLdId = 'cielo-jsonld-schema';
    let scriptElement = document.getElementById(jsonLdId);
    
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = jsonLdId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    
    // Base organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'CIELO Agency',
      'url': 'https://www.cielo.agency/',
      'logo': 'https://www.cielo.agency/favicon.ico',
      'description': 'Strategic branding and growth systems for founders.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'New York',
        'addressRegion': 'NY',
        'addressCountry': 'US'
      },
      'sameAs': [
        'https://www.linkedin.com/company/cieloagency',
        'https://www.instagram.com/cielo.agency',
        'https://twitter.com/cielo_agency'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'email': 'hello@cielo.agency'
      }
    };

    // Add aggregate rating if provided
    if (aggregateRating) {
      organizationSchema['aggregateRating'] = {
        '@type': 'AggregateRating',
        'ratingValue': aggregateRating.ratingValue,
        'reviewCount': aggregateRating.reviewCount
      };
    }
    
    // Build structured data array
    const structuredDataArray: any[] = [organizationSchema];

    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      structuredDataArray.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': item.url
        }))
      });
    }

    // Add service schema for service pages
    if (type === 'service') {
      structuredDataArray.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': title.replace(' - CIELO Agency', ''),
        'provider': {
          '@type': 'Organization',
          'name': 'CIELO Agency',
          'url': 'https://www.cielo.agency/'
        },
        'description': description,
        'url': url
      });
    }

    // Add article schema for blog posts
    if (type === 'article') {
      structuredDataArray.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title,
        'description': description,
        'image': image,
        'author': {
          '@type': 'Person',
          'name': author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'CIELO Agency',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.cielo.agency/favicon.ico'
          }
        },
        'datePublished': publishedTime,
        'dateModified': modifiedTime || publishedTime,
        'url': url
      });
    }

    // Add custom JSON-LD if provided
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        structuredDataArray.push(...jsonLd);
      } else {
        structuredDataArray.push(jsonLd);
      }
    }
    
    // Set the structured data
    scriptElement.textContent = JSON.stringify(structuredDataArray);

  }, [title, description, image, url, type, author, keywords, publishedTime, modifiedTime, jsonLd, breadcrumbs, aggregateRating]);

  return null; // This component doesn't render anything
}

// Page-specific SEO configurations
export const SEO_CONFIG = {
  home: {
    title: 'CIELO Agency | Strategic Branding & Growth Systems',
    description: 'CIELO Agency builds credible brands with strategy, design, and growth systems. We deliver social content, web, and operations for founders.',
    keywords: 'strategic branding, growth systems, brand strategy, digital presence, social content, web development, brand management, founders',
  },
  about: {
    title: 'About CIELO Agency - Our Story & Mission',
    description: 'Learn about CIELO Agency\'s journey, mission, and the expert team behind innovative digital marketing and creative solutions.',
    keywords: 'about cielo agency, company mission, creative team, agency background',
  },
  portfolio: {
    title: 'Portfolio - CIELO Agency Work & Case Studies',
    description: 'Explore CIELO Agency\'s portfolio of successful projects, creative campaigns, and client success stories across various industries.',
    keywords: 'portfolio, case studies, client work, creative projects, marketing campaigns',
  },
  brandManagement: {
    title: 'Brand Management Services - CIELO Agency',
    description: 'Comprehensive brand management services including strategy, identity development, and brand guidelines from CIELO Agency.',
    keywords: 'brand management, brand strategy, brand identity, brand guidelines, brand development',
  },
  socialMedia: {
    title: 'Social Media Marketing - CIELO Agency',
    description: 'Expert social media marketing services to grow your audience, increase engagement, and drive conversions across all platforms.',
    keywords: 'social media marketing, social media management, content creation, community management, social media strategy',
  },
  development: {
    title: 'Web Development Services - CIELO Agency',
    description: 'Custom web development solutions including responsive websites, web applications, and e-commerce platforms built with modern technologies.',
    keywords: 'web development, website design, web applications, e-commerce development, responsive design',
  },
  marketing: {
    title: 'Digital Marketing Services - CIELO Agency',
    description: 'Full-service digital marketing including SEO, PPC, content marketing, and email campaigns to grow your business online.',
    keywords: 'digital marketing, SEO services, PPC advertising, content marketing, email marketing, growth marketing',
  },
  seoGeo: {
    title: 'SEO & GEO Services - CIELO Agency',
    description: 'Advanced SEO and GEO strategies to improve search rankings, drive organic traffic, and dominate local search results.',
    keywords: 'SEO services, local SEO, GEO optimization, search engine optimization, organic traffic, search rankings',
  },
  voidStrategy: {
    title: 'Void Strategy - Brand Strategy & Identity - CIELO Agency',
    description: 'Transform your business into a recognized brand. Strategic brand development, positioning, and identity design that commands premium pricing.',
    keywords: 'brand strategy, brand identity, brand positioning, brand development, strategic branding, brand design',
  },
  consulting: {
    title: 'Strategic Consulting - CIELO Agency',
    description: 'Strategic business consulting to help brands navigate digital transformation, optimize operations, and achieve sustainable growth.',
    keywords: 'business consulting, strategic consulting, digital transformation, business strategy, growth consulting',
  },
  ventures: {
    title: 'Venture Partnerships - CIELO Agency',
    description: 'Partner with CIELO Agency for venture collaborations, startup support, and innovative business opportunities.',
    keywords: 'venture partnerships, startup support, business partnerships, innovation, venture collaboration',
  },
  blog: {
    title: 'News - CIELO Agency Insights & Resources',
    description: 'Read the latest insights, trends, and best practices in digital marketing, branding, and creative industries from CIELO Agency experts.',
    keywords: 'marketing news, industry insights, digital marketing tips, branding articles, creative resources',
  },
  jobs: {
    title: 'Careers at CIELO Agency - Join Our Team',
    description: 'Explore career opportunities at CIELO Agency. Join a team of creative professionals and marketing experts shaping the future of brands.',
    keywords: 'careers, job opportunities, hiring, creative jobs, marketing jobs, agency careers',
  },
  inquiry: {
    title: 'Contact CIELO Agency - Let\'s Talk',
    description: 'Get in touch with CIELO Agency to discuss your project, request a consultation, or learn more about our services.',
    keywords: 'contact us, get in touch, consultation, project inquiry, contact cielo agency',
  },
};