import { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Search,
  Globe,
  Link,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface ProjectLinksManagementProps {
  onNavigate: (page: string) => void;
}

interface ProjectLink {
  name: string;
  route: string;
  description?: string;
  externalUrl?: string; // Optional: if the link is purely external, though here we seem to be listing internal routes that might embed external content
}

const projectLinks: ProjectLink[] = [
  { 
    name: 'Client Onboarding', 
    route: '/onboarding', 
    description: 'Onboarding video embedding for new clients',
    externalUrl: 'https://drive.google.com/file/d/1IA8b52fcRsx4HYkYHoZ4mUf2glJFdM5b/preview'
  },
  {
    name: 'Offer Overview',
    route: '/offer',
    description: 'Overview of service offerings and packages (Embedded Video)',
    externalUrl: 'https://drive.google.com/file/d/1TGTKjy0Bd29bUXXTEn7iyJkq7th0lOY8/preview'
  },
  {
    name: 'Brand & Web Offer',
    route: '/bw-offer',
    description: 'Brand & Web service offering (Embedded Video)',
    externalUrl: 'https://drive.google.com/file/d/1jyLucDdW6yv_55UX9uMcObX2SQrWIFY2/preview'
  },
  {
    name: 'The Next Frontier of Enterprise AI',
    route: '/offer-2026',
    description: 'Partial Creative Direction & Strategic Consulting (Embedded Video)',
    externalUrl: 'https://drive.google.com/file/d/17U81aa0_QKNuQcaRr6vBAWjqSqVUGJsD/preview'
  },
  {
    name: 'SEO Offer',
    route: '/offer-seo',
    description: 'SEO service offering (Embedded Video)',
    externalUrl: 'https://drive.google.com/file/d/1gcVGko2IKSA6g29ZN4XutkIjMXQOxfwK/preview'
  },
  {
    name: 'Web Development Offer',
    route: '/offer-webdev',
    description: 'Web development service offering (Embedded Video)',
    externalUrl: 'https://drive.google.com/file/d/1JKiafyoJIn1tfH-k5xe5BHk_Tk6-X05I/preview'
  }
];

export function ProjectLinksManagement({ onNavigate }: ProjectLinksManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedRoute, setCopiedRoute] = useState<string | null>(null);

  const filteredLinks = projectLinks.filter(link => {
    return link.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           link.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
           link.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCopyRoute = (route: string) => {
    const fullUrl = `${window.location.origin}${route}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedRoute(route);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedRoute(null), 2000);
  };

  const handleViewPage = (route: string) => {
    window.open(route, '_blank');
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2 tracking-tight">Project Links</h1>
        <p className="text-zinc-500">
          Special project pages and embedded resources
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search project links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 pl-11 pr-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800/50">
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Project Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Route
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Description
                </th>
                <th className="text-right px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link, index) => (
                <tr 
                  key={index}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">{link.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <code className="text-xs font-['Geist_Mono'] text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                      {link.route}
                    </code>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-zinc-500">
                            {link.description || '—'}
                        </span>
                        {link.externalUrl && (
                            <a href={link.externalUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 w-fit">
                                <Link size={10} />
                                Source Link
                            </a>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handleCopyRoute(link.route)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700"
                        title="Copy URL"
                      >
                        {copiedRoute === link.route ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" strokeWidth={1.5} />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleViewPage(link.route)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-zinc-400 mb-1">No project links found</p>
            <p className="text-sm text-zinc-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}