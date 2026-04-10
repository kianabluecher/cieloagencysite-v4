import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { 
  Loader2, 
  Trash2, 
  ExternalLink, 
  Upload,
  Plus,
  Edit,
  Image as ImageIcon,
  AlertCircle,
  Database,
  X,
  Calendar,
  Users,
  FileText,
  Code,
  Briefcase
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getAllProjects, createProject, updateProject, deleteProject, type Project } from '../../utils/portfolio-api';

export function PortfolioManagementPublic() {
  const [loading, setLoading] = useState(true);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const fetchedProjects = await getAllProjects();
      setProjects(fetchedProjects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fieldErrors.images) {
      const newErrors = { ...fieldErrors };
      delete newErrors.images;
      setFieldErrors(newErrors);
    }

    try {
      const uploadedUrls: string[] = [];
      
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/portfolio/upload`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      setUploadingImages([...uploadingImages, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    }
  };

  const handleSaveProject = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      // Check featured count validation
      if (editingProject.featured) {
        const currentFeaturedCount = projects.filter(p => 
          p.featured && p.id !== editingProject.id
        ).length;
        
        if (currentFeaturedCount >= 4) {
          setFieldErrors({ featured: 'Maximum of 4 projects can be featured on the home page. Please unfeature another project first.' });
          setIsSubmitting(false);
          toast.error('Maximum 4 featured projects allowed');
          return;
        }
      }

      const projectData = {
        ...editingProject,
        featured_image: (editingProject.featured_image && uploadingImages.includes(editingProject.featured_image)) 
          ? editingProject.featured_image 
          : (uploadingImages[0] || editingProject.featured_image || ''),
        gallery_images: uploadingImages.length > 0 ? uploadingImages : (editingProject.gallery_images || []),
        published: editingProject.published !== undefined ? editingProject.published : true,
        featured: editingProject.featured !== undefined ? editingProject.featured : false,
      } as Project;

      if (editingProject.id && projects.find(p => p.id === editingProject.id)) {
        await updateProject(editingProject.id, projectData);
        toast.success('Portfolio updated successfully');
      } else {
        await createProject(projectData);
        toast.success('Portfolio submitted successfully');
      }

      await loadProjects();
      setEditingProject(null);
      setUploadingImages([]);
      setFieldErrors({});
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error('Failed to save portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
      await deleteProject(id);
      toast.success('Project deleted');
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      await loadProjects();
    }
  };

  const startEditProject = (project: Project) => {
    setEditingProject(project);
    setUploadingImages(project.gallery_images || project.images || []);
  };

  const startNewProject = () => {
    setEditingProject({
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      category: '',
      project_type: '',
      completion_date: '',
      client_name: '',
      description: '',
      featured_image: '',
      custom_link_label: '',
      custom_link_url: '',
      live_url: '',
      case_study_url: '',
      gallery_images: [],
      published: true,
      featured: false,
    });
    setUploadingImages([]);
    setFieldErrors({});
  };

  useEffect(() => {
    if (editingProject?.title && !editingProject.slug) {
      const slug = editingProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setEditingProject(prev => prev ? ({ ...prev, slug }) : null);
    }
  }, [editingProject?.title]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setEditingProject({ ...editingProject, [fieldName]: value });
    if (fieldErrors[fieldName]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[fieldName];
      setFieldErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl text-white tracking-tight font-[Helvetica_Neue]">Portfolio Management</h1>
              <p className="text-zinc-500 text-sm mt-1">Direct access - Manage your portfolio projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-12">
        <div className="space-y-6">
          {/* Project List */}
          {!editingProject && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl text-white tracking-tight font-[Helvetica_Neue]">Portfolio Projects</h2>
                  <p className="text-zinc-500 text-sm mt-1 font-['Geist_Mono']">{projects.length} projects total</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://supabase.com/dashboard/project/${projectId}/editor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors text-sm"
                  >
                    <Database className="w-4 h-4" strokeWidth={1.5} />
                    Supabase Table
                    <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                  </a>
                  <button
                    onClick={startNewProject}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-gray-200 transition-colors text-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    New Project
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-zinc-950 border border-zinc-800 rounded-md">
                  <Loader2 className="w-8 h-8 text-white animate-spin mb-4" strokeWidth={1.5} />
                  <p className="text-zinc-500 font-['Geist_Mono'] text-sm">Loading portfolio projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-zinc-950 border border-zinc-800 rounded-md">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-zinc-700" strokeWidth={1.5} />
                  <p className="text-zinc-400 mb-4">No projects found</p>
                  <button
                    onClick={startNewProject}
                    className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer text-sm rounded-md"
                  >
                    Create Your First Project
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => startEditProject(project)}
                      className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer rounded-md"
                    >
                      <div className="p-6 space-y-6">
                        {/* Header with Project Title and View Details */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white text-2xl">{project.title}</h3>
                              {project.featured && (
                                <span className="inline-flex items-center px-2 py-1 text-xs border border-purple-500/30 bg-purple-500/10 text-purple-400 rounded">
                                  ★ Featured
                                </span>
                              )}
                            </div>
                            <span className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">
                              View details
                            </span>
                          </div>
                          {(project.featured_image || project.thumbnail || project.images?.[0] || project.gallery_images?.[0]) ? (
                            <div className="w-16 h-16 border-2 border-cyan-400/20 overflow-hidden rounded-md">
                              <img
                                src={project.featured_image || project.thumbnail || project.images?.[0] || project.gallery_images?.[0]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 border-2 border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center rounded-md">
                              <ImageIcon className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>

                        <div className="border-t border-zinc-800/50" />

                        {/* Project Details Grid */}
                        <div className="grid grid-cols-2 gap-6">
                          {/* Completion Date */}
                          <div>
                            <div className="flex items-center gap-2 text-zinc-400 mb-2">
                              <Calendar className="h-4 w-4" strokeWidth={1.5} />
                              <span className="text-sm">Completed</span>
                            </div>
                            <p className="text-white">
                              {project.completion_date ? new Date(project.completion_date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric'
                              }) : 'Not set'}
                            </p>
                          </div>

                          {/* Client Name */}
                          <div>
                            <div className="flex items-center gap-2 text-zinc-400 mb-2">
                              <Users className="h-4 w-4" strokeWidth={1.5} />
                              <span className="text-sm">Client</span>
                            </div>
                            <p className="text-white">{project.client_name}</p>
                          </div>

                          {/* Category */}
                          <div>
                            <div className="flex items-center gap-2 text-zinc-400 mb-2">
                              <Briefcase className="h-4 w-4" strokeWidth={1.5} />
                              <span className="text-sm">Category</span>
                            </div>
                            <p className="text-white text-lg">{project.category}</p>
                          </div>

                          {/* Status */}
                          <div>
                            <div className="flex items-center gap-2 text-zinc-400 mb-2">
                              <span className="text-sm">Status</span>
                            </div>
                            {project.published ? (
                              <span className="inline-flex items-center px-3 py-1 text-xs border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                                06 Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 text-xs border border-yellow-500/20 bg-yellow-500/10 text-yellow-400">
                                02 Draft
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-zinc-800/50" />

                        {/* Project Information */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-zinc-400">
                              <FileText className="h-4 w-4" strokeWidth={1.5} />
                              <span className="text-sm">Services</span>
                            </div>
                            <span className="text-white">{project.project_type}</span>
                          </div>

                          {(project.excerpt || project.subtitle) && (
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 text-zinc-400">
                                <span className="text-sm">Description</span>
                              </div>
                              <span className="text-white text-right max-w-md text-sm">{project.excerpt || project.subtitle}</span>
                            </div>
                          )}

                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 text-zinc-400">
                                <Code className="h-4 w-4" strokeWidth={1.5} />
                                <span className="text-sm">Technologies</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 justify-end max-w-md">
                                {project.technologies.slice(0, 5).map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-0.5 text-xs border border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 5 && (
                                  <span className="inline-flex items-center px-2 py-0.5 text-xs border border-zinc-700 bg-zinc-800 text-zinc-400">
                                    +{project.technologies.length - 5}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Edit Form */}
          {editingProject && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">{projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'New Project'}</h2>
                <button
                  onClick={() => setEditingProject(null)}
                  type="button"
                  className="p-2 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                  title="Close form"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProject}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Title *</label>
                    <input
                      type="text"
                      value={editingProject.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                        fieldErrors.title ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="Project Title"
                      name="title"
                      required
                    />
                    {fieldErrors.title && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.title}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Slug</label>
                    <input
                      type="text"
                      value={editingProject.slug || ''}
                      onChange={(e) => handleFieldChange('slug', e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-white focus:border-white/30 outline-none"
                      placeholder="project-slug"
                      name="slug"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Excerpt *</label>
                    <input
                      type="text"
                      value={editingProject.excerpt || ''}
                      onChange={(e) => handleFieldChange('excerpt', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                        fieldErrors.excerpt ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="Short description"
                      name="excerpt"
                      required
                    />
                    {fieldErrors.excerpt && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.excerpt}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Category *</label>
                    <input
                      type="text"
                      value={editingProject.category || ''}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                        fieldErrors.category ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="e.g., Branding, Web Design"
                      name="category"
                      required
                    />
                    {fieldErrors.category && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.category}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Industry *</label>
                    <select
                      value={editingProject.industry || ''}
                      onChange={(e) => handleFieldChange('industry', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                        fieldErrors.industry ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      name="industry"
                      required
                    >
                      <option value="" className="bg-zinc-900">Select Industry</option>
                      <option value="Financial Services" className="bg-zinc-900">Financial Services</option>
                      <option value="B2B Saas" className="bg-zinc-900">B2B Saas</option>
                      <option value="Innovation / Tech" className="bg-zinc-900">Innovation / Tech</option>
                      <option value="Wellness / Lifestyle" className="bg-zinc-900">Wellness / Lifestyle</option>
                      <option value="Hospitality" className="bg-zinc-900">Hospitality</option>
                      <option value="Professional Services" className="bg-zinc-900">Professional Services</option>
                    </select>
                    {fieldErrors.industry && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.industry}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Services *</label>
                    <input
                      type="text"
                      value={editingProject.project_type || ''}
                      onChange={(e) => handleFieldChange('project_type', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                        fieldErrors.project_type ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="e.g., Campaign, Website"
                      name="project_type"
                      required
                    />
                    {fieldErrors.project_type && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.project_type}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Completion Date *</label>
                    <input
                      type="date"
                      value={editingProject.completion_date || ''}
                      onChange={(e) => handleFieldChange('completion_date', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none [color-scheme:dark] ${
                        fieldErrors.completion_date ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      name="completion_date"
                      required
                    />
                    {fieldErrors.completion_date && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.completion_date}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 text-sm">Client Name *</label>
                    <input
                      type="text"
                      value={editingProject.client_name || ''}
                      onChange={(e) => handleFieldChange('client_name', e.target.value)}
                      className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                        fieldErrors.client_name ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="e.g., Fortune 500 Company"
                      name="client_name"
                      required
                    />
                    {fieldErrors.client_name && (
                      <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.client_name}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-white/60 mb-2 text-sm">Description *</label>
                  <textarea
                    value={editingProject.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className={`w-full px-4 py-2 bg-white/5 border rounded text-white h-32 focus:border-white/30 outline-none ${
                      fieldErrors.description ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="Full project description"
                    name="description"
                    required
                  />
                  {fieldErrors.description && (
                    <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p>{fieldErrors.description}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <label className="block text-white/60 mb-2 text-sm">Technologies Used (comma-separated) *</label>
                  <input
                    type="text"
                    value={editingProject.technologies?.join(', ') || ''}
                    onChange={(e) => handleFieldChange('technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                    className={`w-full px-4 py-2 bg-white/5 border rounded text-white focus:border-white/30 outline-none ${
                      fieldErrors.technologies ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="React, TypeScript, Tailwind CSS"
                    name="technologies"
                    required
                  />
                  {fieldErrors.technologies && (
                    <div className="flex items-start gap-2 text-red-400 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p>{fieldErrors.technologies}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <h3 className="text-lg text-white mb-4">Links & Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-white/60">
                        <input
                          type="checkbox"
                          checked={editingProject.published || false}
                          onChange={(e) => handleFieldChange('published', e.target.checked)}
                          className="w-4 h-4 bg-white/5 border border-white/10 rounded"
                        />
                        Publish to Website
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-white/60">
                        <input
                          type="checkbox"
                          checked={editingProject.featured || false}
                          onChange={(e) => handleFieldChange('featured', e.target.checked)}
                          className="w-4 h-4 bg-white/5 border border-white/10 rounded"
                        />
                        Feature on Home Page (Max 4)
                      </label>
                    </div>
                  </div>
                </div>
                {fieldErrors.featured && (
                  <div className="flex items-start gap-2 text-red-400 text-sm mt-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{fieldErrors.featured}</p>
                  </div>
                )}

                {/* Image Upload */}
                <div className="mt-6">
                  <label className="block text-white/60 mb-2 text-sm">Images (Click star to set as cover)</label>
                  <div className="space-y-4">
                    {uploadingImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {uploadingImages.map((url, index) => {
                          const isCover = url === editingProject.featured_image;
                          return (
                            <div key={index} className={`relative group border-2 rounded transition-all ${isCover ? 'border-yellow-500' : 'border-transparent'}`}>
                              <img src={url} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-sm" />
                              
                              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => handleFieldChange('featured_image', url)}
                                  className={`p-1.5 rounded transition-colors ${isCover ? 'bg-yellow-500 text-black' : 'bg-black/60 text-white hover:bg-yellow-500 hover:text-black'}`}
                                  title="Set as cover image"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill={isCover ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setUploadingImages(uploadingImages.filter((_, i) => i !== index))}
                                  className="p-1.5 bg-red-500/80 rounded text-white hover:bg-red-600 transition-colors cursor-pointer"
                                  title="Remove image"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {isCover && (
                                <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/90 text-black text-[10px] font-bold px-2 py-0.5 text-center uppercase tracking-wider">
                                  Cover Image
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <label className="flex items-center justify-center gap-2 px-6 py-8 border-2 border-dashed border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-white/40" />
                      <span className="text-white/60">Upload Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {fieldErrors.images && (
                      <div className="flex items-start gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{fieldErrors.images}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-8">
                  <button
                    type="submit"
                    className={`flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg transition-colors cursor-pointer ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-200'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? 'Saving...' : 'Save Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      setUploadingImages([]);
                      setFieldErrors({});
                    }}
                    className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:border-white/20 transition-colors cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}