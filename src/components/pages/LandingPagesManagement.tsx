import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { Eye, Edit, ExternalLink, Users } from 'lucide-react';

interface LandingPage {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface FunnelSubmission {
  id: string;
  funnel_name: string;
  step: string;
  name: string;
  email: string;
  phone?: string;
  metadata?: any;
  created_at: string;
}

interface LandingPagesManagementProps {
  onNavigate: (page: string) => void;
}

export function LandingPagesManagement({ onNavigate }: LandingPagesManagementProps) {
  const [activeTab, setActiveTab] = useState<'pages' | 'submissions'>('pages');
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [submissions, setSubmissions] = useState<FunnelSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');

  // Static funnel pages data
  const funnelPages = [
    {
      step: 'Step 1',
      title: 'Brand Audit Landing',
      slug: '/lp-brandaudit',
      category: 'Lead Capture',
      keywords: 'brand audit, free consultation, case study',
    },
    {
      step: 'Step 2',
      title: 'Brand Audit Offer',
      slug: '/lp-brandaudit-offer',
      category: 'Value Proposition',
      keywords: 'brand transformation, consultation, pricing',
    },
    {
      step: 'Step 3',
      title: 'Brand Audit Strategy',
      slug: '/lp-brandaudit-strategy',
      category: 'Conversion',
      keywords: 'strategy session, payment, guarantee',
    },
  ];

  useEffect(() => {
    if (activeTab === 'pages') {
      fetchLandingPages();
    } else {
      fetchSubmissions();
    }
  }, [activeTab]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('funnel_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('Failed to load submissions');
      } else {
        setSubmissions(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const fetchLandingPages = async () => {
    try {
      setLoading(true);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching landing pages:', error);
        toast.error('Failed to load landing pages');
      } else {
        setLandingPages(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Failed to load landing pages');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPage(null);
    resetForm();
  };

  const handleEdit = (page: LandingPage) => {
    setEditingPage(page);
    setIsCreating(true);
    setTitle(page.title);
    setSlug(page.slug);
    setDescription(page.description);
    setStatus(page.status);
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setDescription('');
    setStatus('draft');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingPage(null);
    resetForm();
  };

  const handleSave = async () => {
    if (!title || !slug) {
      toast.error('Title and slug are required');
      return;
    }

    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.access_token) {
        toast.error('Not authenticated');
        return;
      }

      if (editingPage) {
        // Update existing page
        const { error } = await supabase
          .from('landing_pages')
          .update({
            title,
            slug,
            description,
            status,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPage.id);

        if (error) throw error;
        toast.success('Landing page updated successfully');
      } else {
        // Create new page
        const { error } = await supabase
          .from('landing_pages')
          .insert({
            title,
            slug,
            description,
            status,
          });

        if (error) throw error;
        toast.success('Landing page created successfully');
      }

      await fetchLandingPages();
      handleCancel();
    } catch (err: any) {
      console.error('Error saving landing page:', err);
      toast.error(`Failed to save landing page: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this landing page?')) {
      return;
    }

    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from('landing_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Landing page deleted successfully');
      await fetchLandingPages();
    } catch (err: any) {
      console.error('Error deleting landing page:', err);
      toast.error(`Failed to delete landing page: ${err.message}`);
    }
  };

  const handleView = (slug: string) => {
    window.open(`/${slug}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Funnel Brand Audit</h1>
          <p className="text-neutral-400 text-sm">View funnel pages and track submissions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800">
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'pages'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Funnel Pages
          </div>
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'submissions'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Submissions
          </div>
        </button>
      </div>

      {activeTab === 'pages' ? (
        // Funnel Pages View - Static display of 3 steps
        <div className="bg-[#0A0A0B] border border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A0A0B] border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Step
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Page Title
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Keywords
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {funnelPages.map((page, index) => (
                <tr key={index} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400">
                      {page.step}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {page.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400 font-mono">
                    {page.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {page.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs">
                    {page.keywords}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(page.slug, '_blank')}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                        title="View Page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate(page.slug.replace('/', ''))}
                        className="p-2 text-neutral-400 hover:text-orange-500 transition-colors"
                        title="Edit Page"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Funnel Stats */}
          <div className="border-t border-neutral-800 bg-neutral-900/30 px-6 py-4">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Total Steps</div>
                <div className="text-2xl font-bold text-white">{funnelPages.length}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Funnel Type</div>
                <div className="text-sm font-medium text-neutral-300">Brand Audit</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Status</div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Submissions View
        <div className="bg-[#0A0A0B] border border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A0A0B] border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Funnel Step
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                      {submission.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                      {submission.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                      {submission.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400">
                        {submission.step}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                      {new Date(submission.created_at).toLocaleDateString()} {new Date(submission.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}