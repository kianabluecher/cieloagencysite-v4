import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Save, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Job {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  qualifications?: string[];
  niceToHave?: string[];
  whatWeOffer?: string[];
  aboutRole?: string;
  aboutCielo?: string;
  featured: boolean;
  status: string;
  posted_date: string;
}

interface JobManagementProps {
  onNavigate?: (page: string) => void;
}

export function JobManagement({ onNavigate }: JobManagementProps = {}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    location: 'Remote',
    department: '',
    type: 'Full-time',
    description: '',
    requirements: [],
    responsibilities: [],
    qualifications: [],
    niceToHave: [],
    whatWeOffer: [],
    aboutRole: '',
    aboutCielo: '',
    featured: false,
    status: 'open',
    posted_date: new Date().toISOString().split('T')[0]
  });

  // Text inputs for lists
  const [requirementInput, setRequirementInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [qualificationInput, setQualificationInput] = useState('');
  const [niceToHaveInput, setNiceToHaveInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      location: 'Remote',
      department: '',
      type: 'Full-time',
      description: '',
      requirements: [],
      responsibilities: [],
      qualifications: [],
      niceToHave: [],
      whatWeOffer: [],
      aboutRole: '',
      aboutCielo: '',
      featured: false,
      status: 'open',
      posted_date: new Date().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setFormData(job);
    setShowForm(true);
  };

  const handleSaveJob = async () => {
    try {
      setSaving(true);
      
      // Generate ID if creating new job
      const jobId = editingJob?.id || `job-${Date.now()}`;
      const jobData = {
        ...formData,
        id: jobId,
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs`,
        {
          method: editingJob ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(jobData),
        }
      );

      if (response.ok) {
        await fetchJobs();
        setShowForm(false);
        setEditingJob(null);
      } else {
        const error = await response.text();
        console.error('Error saving job:', error);
        alert('Failed to save job. Please try again.');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs/${jobId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        await fetchJobs();
      } else {
        alert('Failed to delete job. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  const addToList = (field: keyof Job, value: string, clearInput: () => void) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), value.trim()]
    }));
    clearInput();
  };

  const removeFromList = (field: keyof Job, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[])?.filter((_, i) => i !== index) || []
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-white">
            {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6 bg-zinc-950 border border-zinc-800 rounded-lg p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Job Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                placeholder="e.g. Senior Brand Strategist"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Department *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">Select Department</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Brand & Strategy">Brand & Strategy</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Location *</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Short Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              placeholder="Brief description that appears in job listings..."
            />
          </div>

          {/* About the Role */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">About the Role</label>
            <textarea
              value={formData.aboutRole}
              onChange={(e) => setFormData({ ...formData, aboutRole: e.target.value })}
              rows={5}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              placeholder="Detailed description of the role and responsibilities..."
            />
          </div>

          {/* About CIELO */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">About CIELO</label>
            <textarea
              value={formData.aboutCielo}
              onChange={(e) => setFormData({ ...formData, aboutCielo: e.target.value })}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              placeholder="Information about CIELO relevant to this role..."
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Responsibilities</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={responsibilityInput}
                onChange={(e) => setResponsibilityInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addToList('responsibilities', responsibilityInput, () => setResponsibilityInput(''))}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Add a responsibility..."
              />
              <Button
                onClick={() => addToList('responsibilities', responsibilityInput, () => setResponsibilityInput(''))}
                className="bg-cyan-400 text-black hover:bg-cyan-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded">
                  <span className="flex-1 text-sm text-zinc-300">{item}</span>
                  <button
                    onClick={() => removeFromList('responsibilities', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Qualifications</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={qualificationInput}
                onChange={(e) => setQualificationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addToList('qualifications', qualificationInput, () => setQualificationInput(''))}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Add a qualification..."
              />
              <Button
                onClick={() => addToList('qualifications', qualificationInput, () => setQualificationInput(''))}
                className="bg-cyan-400 text-black hover:bg-cyan-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.qualifications?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded">
                  <span className="flex-1 text-sm text-zinc-300">{item}</span>
                  <button
                    onClick={() => removeFromList('qualifications', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Nice to Have */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Nice to Have</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={niceToHaveInput}
                onChange={(e) => setNiceToHaveInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addToList('niceToHave', niceToHaveInput, () => setNiceToHaveInput(''))}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Add a nice-to-have skill..."
              />
              <Button
                onClick={() => addToList('niceToHave', niceToHaveInput, () => setNiceToHaveInput(''))}
                className="bg-cyan-400 text-black hover:bg-cyan-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.niceToHave?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded">
                  <span className="flex-1 text-sm text-zinc-300">{item}</span>
                  <button
                    onClick={() => removeFromList('niceToHave', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* What We Offer */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">What We Offer</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addToList('whatWeOffer', benefitInput, () => setBenefitInput(''))}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Add a benefit..."
              />
              <Button
                onClick={() => addToList('whatWeOffer', benefitInput, () => setBenefitInput(''))}
                className="bg-cyan-400 text-black hover:bg-cyan-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.whatWeOffer?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded">
                  <span className="flex-1 text-sm text-zinc-300">{item}</span>
                  <button
                    onClick={() => removeFromList('whatWeOffer', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status and Featured */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-zinc-300">Feature this job</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.status === 'open'}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'open' : 'closed' })}
                className="w-4 h-4"
              />
              <span className="text-sm text-zinc-300">Open for applications</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <Button
              onClick={handleSaveJob}
              disabled={saving || !formData.title || !formData.department}
              className="bg-cyan-400 text-black hover:bg-cyan-300 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Job
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-900"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white mb-2">Job Management</h2>
          <p className="text-zinc-400 text-sm">
            Create and manage job postings that appear on the careers page
          </p>
        </div>
        <Button
          onClick={handleCreateJob}
          className="bg-cyan-400 text-black hover:bg-cyan-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Job
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {jobs.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-12 text-center">
            <p className="text-zinc-400 mb-4">No job postings yet</p>
            <Button
              onClick={handleCreateJob}
              className="bg-cyan-400 text-black hover:bg-cyan-300"
            >
              Create Your First Job
            </Button>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-white">{job.title}</h3>
                    {job.featured && (
                      <span className="px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs text-cyan-400">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      job.status === 'open'
                        ? 'bg-green-400/10 border border-green-400/30 text-green-400'
                        : 'bg-zinc-700 border border-zinc-600 text-zinc-400'
                    }`}>
                      {job.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400">
                      {job.department}
                    </span>
                    <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400">
                      {job.location}
                    </span>
                    <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400">
                      {job.type}
                    </span>
                    <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400">
                      Posted: {new Date(job.posted_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`/job-${job.id}`, '_blank')}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditJob(job)}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-400 hover:text-cyan-400 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-2 bg-zinc-900 hover:bg-red-900 border border-zinc-800 hover:border-red-800 rounded text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}