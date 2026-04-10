import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { FileText, Search, Download, Mail, Calendar, User, Building, Briefcase, Tag, RefreshCw, ExternalLink, LayoutGrid, List } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { ClientDetailView } from './ClientDetailView';
import { CRMClientsView } from './CRMClientsView';

interface Submission {
  id: string;
  type?: string;
  name?: string;
  email?: string;
  company_name?: string;
  services?: string[];
  goal?: string;
  submitted_at?: string;
  submittedAt?: string;
  // Discovery form fields
  businessName?: string;
  industry?: string;
  primaryGoal?: string;
  // Brand audit fields
  brandName?: string;
  websiteUrl?: string;
}

interface SubmissionsManagementProps {
  onNavigate: (page: string) => void;
}

export function SubmissionsManagement({ onNavigate }: SubmissionsManagementProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedClient, setSelectedClient] = useState<Submission | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'crm'>('table');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();

      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError || !session) {
        toast.error('Please sign in to view submissions');
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/submissions`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const getSubmissionDate = (submission: Submission) => {
    return submission.submitted_at || submission.submittedAt || '';
  };

  const getSubmissionName = (submission: Submission) => {
    return submission.name || submission.businessName || submission.brandName || 'N/A';
  };

  const getSubmissionEmail = (submission: Submission) => {
    return submission.email || 'N/A';
  };

  const formatSubmissionType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'lets-talk': "Let's Talk",
      'rapid-delivery-signup': 'Rapid Delivery',
      'brand-web-download': 'Brand Web Pricing',
      'social-media-pricing-download': 'Social Media Pricing',
      'discovery': 'Discovery',
      'brand-audit': 'Brand Audit',
    };
    return typeMap[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'lets-talk': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'rapid-delivery-signup': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'brand-web-download': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'social-media-pricing-download': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'discovery': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'brand-audit': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    return colorMap[type] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
  };

  const filteredSubmissions = submissions
    .filter(sub => {
      const matchesSearch = 
        getSubmissionName(sub).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getSubmissionEmail(sub).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.company_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        false;
      
      const matchesType = filterType === 'all' || sub.type === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        const dateA = new Date(getSubmissionDate(a)).getTime();
        const dateB = new Date(getSubmissionDate(b)).getTime();
        comparison = dateB - dateA; // Most recent first by default
      } else if (sortBy === 'type') {
        comparison = (a.type || '').localeCompare(b.type || '');
      } else if (sortBy === 'name') {
        comparison = getSubmissionName(a).localeCompare(getSubmissionName(b));
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const uniqueTypes = Array.from(new Set(submissions.map(s => s.type).filter(Boolean)));

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Name', 'Email', 'Company', 'Details'];
    const rows = filteredSubmissions.map(sub => [
      new Date(getSubmissionDate(sub)).toLocaleString(),
      formatSubmissionType(sub.type || ''),
      getSubmissionName(sub),
      getSubmissionEmail(sub),
      sub.company_name || sub.businessName || 'N/A',
      sub.services?.join(', ') || sub.goal || sub.primaryGoal || 'N/A',
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `\"${cell}\"`).join(',')).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cielo-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  const handleClientClick = (submission: Submission) => {
    // Transform submission data for client view
    const clientData = {
      ...submission,
      name: getSubmissionName(submission),
      email: getSubmissionEmail(submission),
      company: submission.company_name || submission.businessName || submission.brandName || '',
      createdAt: getSubmissionDate(submission),
      status: 'pending',
      estimatedValue: 0,
      projectDetails: submission.goal || submission.primaryGoal || '',
      service: submission.services?.join(', ') || submission.type || '',
      budget: 'Not specified',
      phone: '',
      attachments: [],
    };
    setSelectedClient(clientData);
  };

  // If a client is selected, show the detail view
  if (selectedClient) {
    return (
      <ClientDetailView
        submission={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#0A0A0B] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1">Form Submissions</h1>
          <p className="text-zinc-500 text-sm">
            View and manage all form submissions from your website
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://docs.google.com/spreadsheets/d/1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 transition-all rounded-md text-sm backdrop-blur-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Review Live Sheet
          </a>
          <Button
            onClick={fetchSubmissions}
            variant="outline"
            className="bg-[#1A1A1A] border-[#333333] hover:bg-[#222222] rounded-md text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={exportToCSV}
            className="bg-white text-black hover:bg-zinc-200 rounded-md"
            disabled={filteredSubmissions.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl text-white">{submissions.length}</p>
              <p className="text-xs text-zinc-500">Total Submissions</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-purple-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl text-white">
                {submissions.filter(s => s.type === 'lets-talk').length}
              </p>
              <p className="text-xs text-zinc-500">Let's Talk Forms</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-emerald-500/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl text-white">
                {submissions.filter(s => s.type?.includes('download')).length}
              </p>
              <p className="text-xs text-zinc-500">Pricing Downloads</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-orange-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl text-white">
                {submissions.filter(s => {
                  const date = new Date(getSubmissionDate(s));
                  const today = new Date();
                  return date.toDateString() === today.toDateString();
                }).length}
              </p>
              <p className="text-xs text-zinc-500">Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F0F0F] border border-[#222222] rounded-md pl-10 pr-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#0F0F0F] border border-[#222222] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          <option value="all">All Types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>
              {formatSubmissionType(type)}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-[#0F0F0F] border border-[#222222] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          <option value="date">Sort by Date</option>
          <option value="type">Sort by Type</option>
          <option value="name">Sort by Name</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="bg-[#0F0F0F] border border-[#222222] rounded-md px-4 py-2 text-white hover:bg-[#1A1A1A] transition-colors"
        >
          {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
        
        {/* View Mode Toggle */}
        <div className="flex bg-[#0F0F0F] border border-[#222222] rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 flex items-center gap-2 transition-colors ${
              viewMode === 'table'
                ? 'bg-cyan-500/20 text-cyan-400 border-r border-cyan-500/30'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <List size={16} />
            Table
          </button>
          <button
            onClick={() => setViewMode('crm')}
            className={`px-4 py-2 flex items-center gap-2 transition-colors ${
              viewMode === 'crm'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutGrid size={16} />
            CRM
          </button>
        </div>
      </div>

      {/* Submissions Table */}
      {loading ? (
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/10 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-500">Loading submissions...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md p-12 text-center">
          <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">
            {submissions.length === 0 ? 'No submissions yet' : 'No submissions match your filters'}
          </p>
        </div>
      ) : viewMode === 'crm' ? (
        <CRMClientsView 
          submissions={filteredSubmissions}
          onClientClick={handleClientClick}
        />
      ) : (
        <div className="bg-[#0F0F0F] border border-[#222222] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0A0A0A] border-b border-[#222222]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-zinc-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-zinc-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-zinc-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-zinc-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {filteredSubmissions.map((submission) => (
                  <tr 
                    key={submission.id} 
                    className="hover:bg-[#1A1A1A] transition-colors cursor-pointer" 
                    onClick={() => handleClientClick(submission)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Calendar className="w-4 h-4 text-zinc-600" />
                        {new Date(getSubmissionDate(submission)).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border ${getTypeColor(submission.type || '')}`}>
                        <Tag className="w-3 h-3" />
                        {formatSubmissionType(submission.type || '')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <User className="w-4 h-4 text-zinc-600" />
                          {getSubmissionName(submission)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Mail className="w-3 h-3 text-zinc-600" />
                          {getSubmissionEmail(submission)}
                        </div>
                        {(submission.company_name || submission.businessName) && (
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Building className="w-3 h-3 text-zinc-600" />
                            {submission.company_name || submission.businessName}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-300 space-y-1">
                        {submission.services && submission.services.length > 0 && (
                          <div className="flex items-start gap-2">
                            <Briefcase className="w-4 h-4 text-zinc-600 mt-0.5" />
                            <div className="flex flex-wrap gap-1">
                              {submission.services.map((service, idx) => (
                                <span key={idx} className="text-xs bg-[#1A1A1A] border border-[#333333] px-2 py-0.5 rounded-sm">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {submission.goal && (
                          <div className="text-xs text-zinc-500">
                            Goal: {submission.goal}
                          </div>
                        )}
                        {submission.primaryGoal && (
                          <div className="text-xs text-zinc-500">
                            Goal: {submission.primaryGoal}
                          </div>
                        )}
                        {submission.industry && (
                          <div className="text-xs text-zinc-500">
                            Industry: {submission.industry}
                          </div>
                        )}
                        {submission.websiteUrl && (
                          <div className="text-xs text-zinc-500">
                            Website: {submission.websiteUrl}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {filteredSubmissions.length > 0 && (
        <div className="text-center text-sm text-zinc-500">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </div>
      )}
    </div>
  );
}