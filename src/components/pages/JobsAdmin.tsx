import { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Loader2, Check, AlertCircle } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface JobsAdminProps {
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
  featured: boolean;
  status: string;
  url?: string;
  posted_date: string;
}

export function JobsAdmin({ onNavigate }: JobsAdminProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    department: '',
    type: 'Full-time',
    description: '',
    requirements: [] as string[],
    featured: false,
    url: '',
  });
  const [requirementInput, setRequirementInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      onNavigate('team-login');
      return;
    }
    fetchJobs();
  };

  const fetchJobs = async () => {
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      // Fetch jobs from server endpoint
      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dashboard/jobs`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const result = await response.json();
      setJobs(result.jobs || []);
    } catch (err) {
      console.warn('Error fetching jobs (non-critical):', err);
      // Don't set error state, just show empty list
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      onNavigate('team-login');
      return;
    }

    try {
      const accessToken = session.access_token;
      
      if (editingJob) {
        // Update existing job via API
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs/${editingJob.id}`;
        
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            location: formData.location,
            department: formData.department,
            type: formData.type,
            description: formData.description,
            requirements: formData.requirements,
            featured: formData.featured,
            url: formData.url || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update job');
        }
      } else {
        // Create new job via API
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            location: formData.location,
            department: formData.department,
            type: formData.type,
            description: formData.description,
            requirements: formData.requirements,
            featured: formData.featured,
            url: formData.url || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create job');
        }
      }

      await fetchJobs();
      setShowForm(false);
      setEditingJob(null);
      setFormData({
        title: '',
        location: '',
        department: '',
        type: 'Full-time',
        description: '',
        requirements: [],
        featured: false,
        url: '',
      });
      setRequirementInput('');
    } catch (err) {
      console.error('Error saving job:', err);
      setError(err instanceof Error ? err.message : 'Failed to save job');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      department: job.department,
      type: job.type,
      description: job.description,
      requirements: job.requirements || [],
      featured: job.featured,
      url: job.url || '',
    });
    setShowForm(true);
  };

  const handleClose = async (id: string) => {
    if (!confirm('Are you sure you want to close this job posting?')) return;

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      onNavigate('team-login');
      return;
    }

    try {
      // Close job via DELETE API endpoint
      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs/${id}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to close job');
      }

      await fetchJobs();
    } catch (err) {
      console.error('Error closing job:', err);
      setError(err instanceof Error ? err.message : 'Failed to close job');
    }
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementInput.trim()],
      });
      setRequirementInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const openJobs = jobs.filter(job => job.status === 'active' || job.status === 'open');
  const closedJobs = jobs.filter(job => job.status === 'closed');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl mb-2">Jobs Management</h1>
            <p className="text-white/50 text-sm">Manage job postings from the Supabase job_roles table</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowForm(true);
                setEditingJob(null);
                setFormData({
                  title: '',
                  location: '',
                  department: '',
                  type: 'Full-time',
                  description: '',
                  requirements: [],
                  featured: false,
                  url: '',
                });
                setRequirementInput('');
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm flex items-center gap-2"
            >
              <Plus size={16} />
              Add Job
            </button>
            <button
              onClick={() => onNavigate('jobs')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
            >
              View Public Page
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Setup Notice */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Database Table Required</p>
            <p className="text-blue-300/80 text-xs">
              Make sure the <code className="bg-blue-500/20 px-1 rounded">job_roles</code> table exists in Supabase. 
              See JOBS_SETUP_GUIDE.md for SQL migration script.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Job Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-neutral-950 border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white/40 hover:text-white/60"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                      placeholder="e.g., Remote, San Francisco"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Department *</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                      placeholder="e.g., Design, Engineering"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Job Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white outline-none transition-colors"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    rows={4}
                    placeholder="Job description..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Requirements</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      className="flex-1 bg-white/5 border border-white/10 focus:border-white/30 px-4 py-2 text-white placeholder:text-white/30 outline-none transition-colors text-sm"
                      placeholder="Add requirement and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
                    >
                      Add
                    </button>
                  </div>
                  {formData.requirements.length > 0 && (
                    <div className="space-y-1">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded">
                          <span className="flex-1 text-sm">{req}</span>
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Application URL (optional)</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 bg-transparent border border-white/10 checked:bg-white checked:border-white focus:outline-none focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-sm text-white/60 cursor-pointer">
                    Featured job (appears on homepage)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-white hover:bg-white/90 text-black py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        {editingJob ? 'Update Job' : 'Create Job'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white/40" />
          </div>
        ) : (
          <>
            {/* Open Jobs */}
            <div className="mb-12">
              <h2 className="text-2xl mb-4">Open Positions ({openJobs.length})</h2>
              <div className="bg-white/[0.02] border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Title</th>
                        <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Location</th>
                        <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Department</th>
                        <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Type</th>
                        <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Featured</th>
                        <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {openJobs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-white/40">
                            No open jobs. Add a new job to get started.
                          </td>
                        </tr>
                      ) : (
                        openJobs.map((job) => (
                          <tr key={job.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 text-sm text-white/90">{job.title}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{job.location}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{job.department}</td>
                            <td className="py-4 px-6 text-sm text-white/70">{job.type}</td>
                            <td className="py-4 px-6">
                              {job.featured && (
                                <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs rounded">
                                  Featured
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(job)}
                                  className="p-2 hover:bg-white/10 rounded transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 size={16} className="text-white/70 hover:text-white" />
                                </button>
                                <button
                                  onClick={() => handleClose(job.id)}
                                  className="p-2 hover:bg-red-500/10 rounded transition-colors"
                                  title="Close"
                                >
                                  <Trash2 size={16} className="text-red-400/70 hover:text-red-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Closed Jobs */}
            {closedJobs.length > 0 && (
              <div>
                <h2 className="text-2xl mb-4">Closed Positions ({closedJobs.length})</h2>
                <div className="bg-white/[0.02] border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Title</th>
                          <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Location</th>
                          <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Department</th>
                          <th className="text-left py-4 px-6 text-sm text-white/60 uppercase tracking-wider">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {closedJobs.map((job) => (
                          <tr key={job.id} className="border-b border-white/5 opacity-50">
                            <td className="py-4 px-6 text-sm text-white/70">{job.title}</td>
                            <td className="py-4 px-6 text-sm text-white/60">{job.location}</td>
                            <td className="py-4 px-6 text-sm text-white/60">{job.department}</td>
                            <td className="py-4 px-6 text-sm text-white/60">{job.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}