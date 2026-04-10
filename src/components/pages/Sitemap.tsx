import React, { useEffect, useState } from 'react';

export function Sitemap() {
  const [xml, setXml] = useState<string>('');

  useEffect(() => {
    // Generate sitemap XML
    const baseUrl = 'https://www.cielo.agency';
    const currentDate = new Date().toISOString();

    // Define all URLs with their priorities and change frequencies
    const urls = [
      // Main pages - highest priority
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/About', priority: '0.9', changefreq: 'weekly' },
      { loc: '/Portfolio', priority: '0.9', changefreq: 'weekly' },
      { loc: '/Blog', priority: '0.9', changefreq: 'daily' },
      { loc: '/Jobs', priority: '0.8', changefreq: 'weekly' },
      { loc: '/Inquiry', priority: '0.8', changefreq: 'monthly' },
      
      // Main Services - high priority
      { loc: '/brand-web', priority: '0.9', changefreq: 'weekly' },
      { loc: '/social-media', priority: '0.9', changefreq: 'weekly' },
      { loc: '/brand-management', priority: '0.9', changefreq: 'weekly' },
      { loc: '/Consulting', priority: '0.9', changefreq: 'weekly' },
      { loc: '/Marketing', priority: '0.9', changefreq: 'weekly' },
      { loc: '/Development', priority: '0.9', changefreq: 'weekly' },
      { loc: '/Ventures', priority: '0.8', changefreq: 'monthly' },
      
      // Sub-Services
      { loc: '/pr-media', priority: '0.8', changefreq: 'monthly' },
      { loc: '/lead-gen', priority: '0.8', changefreq: 'monthly' },
      { loc: '/influencer-marketing', priority: '0.8', changefreq: 'monthly' },
      { loc: '/print-collateral', priority: '0.8', changefreq: 'monthly' },
      { loc: '/video-motion', priority: '0.8', changefreq: 'monthly' },
      { loc: '/photography', priority: '0.8', changefreq: 'monthly' },
      { loc: '/packaging-design', priority: '0.8', changefreq: 'monthly' },
      { loc: '/cgi-campaigns', priority: '0.8', changefreq: 'monthly' },
      { loc: '/ai-content', priority: '0.8', changefreq: 'monthly' },
      { loc: '/event-branding', priority: '0.8', changefreq: 'monthly' },
      { loc: '/email-marketing', priority: '0.8', changefreq: 'monthly' },
      { loc: '/creative-direction', priority: '0.8', changefreq: 'monthly' },
      { loc: '/seo-geo', priority: '0.8', changefreq: 'monthly' },
      { loc: '/rapid-delivery', priority: '0.8', changefreq: 'monthly' },
      { loc: '/design-subscription', priority: '0.8', changefreq: 'monthly' },
      { loc: '/void-strategy', priority: '0.8', changefreq: 'monthly' },
      
      // Industry-Specific Branding Pages
      { loc: '/investor-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/saas-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/fintech-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/healthcare-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/real-estate-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/crypto-web3-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/podcast-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/real-estate-agent-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/restaurant-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/online-coaching-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/legal-services-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/small-business-branding', priority: '0.7', changefreq: 'monthly' },
      { loc: '/startup-branding', priority: '0.7', changefreq: 'monthly' },
      
      // Specialized Design Services
      { loc: '/pitch-deck-design', priority: '0.7', changefreq: 'monthly' },
      { loc: '/professional-website-design', priority: '0.7', changefreq: 'monthly' },
      { loc: '/landing-page-conversion', priority: '0.7', changefreq: 'monthly' },
      { loc: '/ecommerce-website-design', priority: '0.7', changefreq: 'monthly' },
      { loc: '/wordpress-website-design', priority: '0.7', changefreq: 'monthly' },
      { loc: '/logo-design-services', priority: '0.7', changefreq: 'monthly' },
      { loc: '/graphic-design-services', priority: '0.7', changefreq: 'monthly' },
      { loc: '/rebranding-services', priority: '0.7', changefreq: 'monthly' },
      
      // Marketing & Growth Services
      { loc: '/digital-marketing-small-business', priority: '0.7', changefreq: 'monthly' },
      { loc: '/social-media-marketing-agency', priority: '0.7', changefreq: 'monthly' },
      { loc: '/seo-services', priority: '0.7', changefreq: 'monthly' },
      { loc: '/content-marketing-services', priority: '0.7', changefreq: 'monthly' },
      { loc: '/copywriting-services', priority: '0.7', changefreq: 'monthly' },
      { loc: '/video-production-services', priority: '0.7', changefreq: 'monthly' },
      { loc: '/email-marketing-automation', priority: '0.7', changefreq: 'monthly' },
      { loc: '/google-ads-management', priority: '0.7', changefreq: 'monthly' },
      { loc: '/brand-strategy-consultant', priority: '0.7', changefreq: 'monthly' },
      { loc: '/influencer-marketing-agency', priority: '0.7', changefreq: 'monthly' },
      { loc: '/business-consulting', priority: '0.7', changefreq: 'monthly' },
      { loc: '/reputation-management', priority: '0.7', changefreq: 'monthly' },
      
      // Financial Services Pages
      { loc: '/multi-strategy-hedge-fund', priority: '0.6', changefreq: 'monthly' },
      { loc: '/long-short-market-neutral', priority: '0.6', changefreq: 'monthly' },
      { loc: '/fund-of-funds-platform', priority: '0.6', changefreq: 'monthly' },
      { loc: '/family-office-branding-agency', priority: '0.6', changefreq: 'monthly' },
      { loc: '/hedge-fund-reputation-management', priority: '0.6', changefreq: 'monthly' },
      { loc: '/family-office-web-design', priority: '0.6', changefreq: 'monthly' },
      { loc: '/pitch-deck-ppm-design', priority: '0.6', changefreq: 'monthly' },
      
      // AI & Innovation Services
      { loc: '/ai-photography', priority: '0.7', changefreq: 'monthly' },
      { loc: '/ai-content-creation', priority: '0.7', changefreq: 'monthly' },
      { loc: '/ai-design-branding', priority: '0.7', changefreq: 'monthly' },
      
      // Location-Specific Pages
      { loc: '/miami-seo-services', priority: '0.6', changefreq: 'monthly' },
      { loc: '/fintech-brand-strategy-miami', priority: '0.6', changefreq: 'monthly' },
      { loc: '/brand-reputation-management-south-florida', priority: '0.6', changefreq: 'monthly' },
      
      // Special Pages
      { loc: '/gallery', priority: '0.6', changefreq: 'monthly' },
      { loc: '/lets-talk', priority: '0.7', changefreq: 'monthly' },
      { loc: '/brand-guidelines', priority: '0.5', changefreq: 'yearly' },
    ];

    // Build XML
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach((url) => {
      xmlContent += '  <url>\n';
      xmlContent += `    <loc>${baseUrl}${url.loc}</loc>\n`;
      xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
      xmlContent += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xmlContent += `    <priority>${url.priority}</priority>\n`;
      xmlContent += '  </url>\n';
    });

    xmlContent += '</urlset>';

    setXml(xmlContent);

    // Set correct content type for XML
    document.title = 'Sitemap - CIELO Agency';
  }, []);

  // Return XML as plain text
  useEffect(() => {
    if (xml) {
      // Create a blob and trigger download
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // For display purposes, show in a pre tag
      const pre = document.createElement('pre');
      pre.style.cssText = 'white-space: pre-wrap; font-family: monospace; padding: 20px; background: #000; color: #0f0;';
      pre.textContent = xml;
      
      const container = document.getElementById('sitemap-container');
      if (container) {
        container.innerHTML = '';
        container.appendChild(pre);
      }
    }
  }, [xml]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Sitemap</h1>
        <p className="text-zinc-400 mb-8">
          XML Sitemap for CIELO Agency - Submit this to Google Search Console and other search engines.
        </p>
        <div id="sitemap-container" className="border border-zinc-800 rounded-lg overflow-auto">
          <pre className="whitespace-pre-wrap font-mono p-6 text-xs bg-zinc-950 text-green-400">
            {xml}
          </pre>
        </div>
        <div className="mt-8">
          <a
            href={`data:application/xml;charset=utf-8,${encodeURIComponent(xml)}`}
            download="sitemap.xml"
            className="inline-block px-6 py-3 bg-cyan-500 text-black font-medium rounded hover:bg-cyan-400 transition-colors"
          >
            Download sitemap.xml
          </a>
        </div>
      </div>
    </div>
  );
}
