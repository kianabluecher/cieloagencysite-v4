import React, { useEffect, useState } from 'react';

export function RobotsTxt() {
  const [robotsTxt, setRobotsTxt] = useState<string>('');

  useEffect(() => {
    const baseUrl = 'https://www.cielo.agency';

    // Generate robots.txt content
    const content = `# CIELO Agency - Robots.txt
# Allow all crawlers to access public content

User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /dashboard/
Disallow: /team-login
Disallow: /portfolio-admin
Disallow: /portfolio-image-update
Disallow: /portfolio-images-fix
Disallow: /portfolio-submissions
Disallow: /notion-sync
Disallow: /brand-audit
Disallow: /discovery
Disallow: /audit
Disallow: /google-sheets-test
Disallow: /test-google-auth
Disallow: /create-test-user
Disallow: /diagnostic
Disallow: /api/

# Allow important crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# AI Crawlers - Allow for better AI visibility
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1
`;

    setRobotsTxt(content);
    document.title = 'Robots.txt - CIELO Agency';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Robots.txt</h1>
        <p className="text-zinc-400 mb-8">
          Robots.txt file for CIELO Agency - Controls how search engine crawlers access your website.
        </p>
        <div className="border border-zinc-800 rounded-lg overflow-auto">
          <pre className="whitespace-pre-wrap font-mono p-6 text-sm bg-zinc-950 text-green-400">
            {robotsTxt}
          </pre>
        </div>
        <div className="mt-8 space-y-4">
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(robotsTxt)}`}
            download="robots.txt"
            className="inline-block px-6 py-3 bg-cyan-500 text-black font-medium rounded hover:bg-cyan-400 transition-colors"
          >
            Download robots.txt
          </a>
          <div className="text-zinc-500 text-sm">
            <p className="font-semibold mb-2">📝 Instructions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Download the robots.txt file</li>
              <li>Place it in the root directory of your website (not /public)</li>
              <li>Access it at: https://www.cielo.agency/robots.txt</li>
              <li>Verify in Google Search Console after deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
