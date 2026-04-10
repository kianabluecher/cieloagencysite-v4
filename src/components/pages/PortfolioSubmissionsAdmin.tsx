import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { auth } from '../../utils/supabase/client';
import { Loader2, CheckCircle2, XCircle, Trash2, ExternalLink, Mail, Phone, Building2, Globe, Calendar, User, Filter, Search, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PortfolioSubmissionsAdminProps {
  onNavigate: (page: string) => void;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  portfolio_url: string;
  website?: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  notes?: string;
}

export function PortfolioSubmissionsAdmin({ onNavigate }: PortfolioSubmissionsAdminProps) {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (accessToken) {
      loadSubmissions();
    }
  }, [accessToken]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, statusFilter, searchQuery]);

  const checkAuth = async () => {
    try {
      const { data } = await auth.getSession();
      if (!data?.session?.access_token) {
        toast.error('Please login first');
        onNavigate('team-login');
        return;
      }
      setAccessToken(data.session.access_token);
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication failed');
      onNavigate('team-login');
    }
  };

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/portfolio-submissions/list`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load submissions');
      }

      setSubmissions(data.submissions || []);
    } catch (error: any) {
      console.error('Error loading submissions:', error);
      toast.error(error.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.company?.toLowerCase().includes(query)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const updateStatus = async (submissionId: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/portfolio-submissions/${submissionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      toast.success(`Submission ${status}`);
      await loadSubmissions();
      
      if (selectedSubmission?.id === submissionId) {
        setSelectedSubmission(data.submission);
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/portfolio-submissions/${submissionId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete submission');
      }

      toast.success('Submission deleted');
      await loadSubmissions();
      setSelectedSubmission(null);
    } catch (error: any) {
      console.error('Error deleting submission:', error);
      toast.error(error.message || 'Failed to delete submission');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Filter className="w-4 h-4" />;
    }
  };

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-white/60" />
          <p className="text-white/60">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('team-dashboard')}
                className="text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl">Portfolio Submissions</h1>
            </div>
            <button
              onClick={loadSubmissions}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/50 text-sm">Total</p>
              <p className="text-2xl font-medium">{stats.total}</p>
            </div>
            <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-4">
              <p className="text-yellow-400/70 text-sm">Pending</p>
              <p className="text-2xl font-medium text-yellow-400">{stats.pending}</p>
            </div>
            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4">
              <p className="text-green-400/70 text-sm">Approved</p>
              <p className="text-2xl font-medium text-green-400">{stats.approved}</p>
            </div>
            <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-4">
              <p className="text-red-400/70 text-sm">Rejected</p>
              <p className="text-2xl font-medium text-red-400">{stats.rejected}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or company..."
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-10 pr-4 py-2 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-white text-neutral-950'
                      : 'bg-white/5 hover:bg-white/10 text-white/70'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40">No submissions found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submissions List */}
            <div className="space-y-4">
              {filteredSubmissions.map(submission => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`bg-white/5 border border-white/10 hover:border-white/20 rounded-lg p-5 cursor-pointer transition-all ${
                    selectedSubmission?.id === submission.id ? 'ring-2 ring-white/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1">{submission.name}</h3>
                      <p className="text-sm text-white/50">{submission.email}</p>
                      {submission.company && (
                        <p className="text-sm text-white/40 mt-1">{submission.company}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(submission.status)}`}>
                      {getStatusIcon(submission.status)}
                      {submission.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submission Detail */}
            <div className="lg:sticky lg:top-32 h-fit">
              {selectedSubmission ? (
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-medium mb-1">{selectedSubmission.name}</h2>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedSubmission.status)}`}>
                        {getStatusIcon(selectedSubmission.status)}
                        {selectedSubmission.status}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-white/40" />
                      <a href={`mailto:${selectedSubmission.email}`} className="text-white/70 hover:text-white transition-colors">
                        {selectedSubmission.email}
                      </a>
                    </div>

                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-white/40" />
                        <a href={`tel:${selectedSubmission.phone}`} className="text-white/70 hover:text-white transition-colors">
                          {selectedSubmission.phone}
                        </a>
                      </div>
                    )}

                    {selectedSubmission.company && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">{selectedSubmission.company}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-sm">
                      <ExternalLink className="w-4 h-4 text-white/40" />
                      <a
                        href={selectedSubmission.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        View Portfolio <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {selectedSubmission.website && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-4 h-4 text-white/40" />
                        <a
                          href={selectedSubmission.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                          Website <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-white/40" />
                      <span className="text-white/70">
                        Submitted {new Date(selectedSubmission.submitted_at).toLocaleString()}
                      </span>
                    </div>

                    {selectedSubmission.reviewed_at && (
                      <div className="flex items-center gap-3 text-sm">
                        <User className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">
                          Reviewed by {selectedSubmission.reviewed_by} on {new Date(selectedSubmission.reviewed_at).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedSubmission.message && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-xs text-white/40 mb-2">MESSAGE</p>
                      <p className="text-sm text-white/70 whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => updateStatus(selectedSubmission.id, 'approved')}
                      disabled={selectedSubmission.status === 'approved'}
                      className="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(selectedSubmission.id, 'rejected')}
                      disabled={selectedSubmission.status === 'rejected'}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
                  <p className="text-white/40">Select a submission to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
