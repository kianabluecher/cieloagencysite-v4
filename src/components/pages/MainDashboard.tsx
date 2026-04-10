import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { 
  FileText,
  Upload,
  Image as ImageIcon,
  PenTool,
  TrendingUp,
  Inbox,
  ChevronRight,
  X,
  Check,
  CheckSquare,
  Calendar,
  Plus,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface MainDashboardProps {
  profile: UserProfile | null;
  onNavigate?: (view: string) => void;
}

interface QuickStat {
  label: string;
  value: number;
  change: number;
}

export function MainDashboard({ profile, onNavigate }: MainDashboardProps) {
  const [stats, setStats] = useState({
    submissions: 0,
    galleryImages: 0,
    blogPosts: 0,
    jiraTasks: 0,
    jiraInProgress: 0,
    jiraTodo: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [jiraTasks, setJiraTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadMetadata, setUploadMetadata] = useState<{ [key: string]: { name: string; alt: string; category: string } }>({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch submissions count
      const submissionsUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/submissions`;
      const submissionsRes = await fetch(submissionsUrl, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (submissionsRes.ok) {
        const submissionsData = await submissionsRes.json();
        setStats(prev => ({
          ...prev,
          submissions: submissionsData.submissions?.length || 0,
        }));
        setRecentSubmissions(submissionsData.submissions?.slice(0, 5) || []);
      }

      // Fetch gallery count
      const galleryUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/gallery`;
      const galleryRes = await fetch(galleryUrl, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });

      if (galleryRes.ok) {
        const galleryData = await galleryRes.json();
        setStats(prev => ({
          ...prev,
          galleryImages: galleryData.images?.length || 0,
        }));
      }

      // Fetch blog posts count
      const blogUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/blog-posts`;
      const blogRes = await fetch(blogUrl, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setStats(prev => ({
          ...prev,
          blogPosts: blogData.posts?.length || 0,
        }));
      }

      // Fetch Jira tasks
      const jiraUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/jira-tasks`;
      console.log('📊 Fetching Jira tasks from:', jiraUrl);
      
      const jiraRes = await fetch(jiraUrl, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (jiraRes.ok) {
        const jiraData = await jiraRes.json();
        console.log('✅ Jira data received:', jiraData);
        
        setStats(prev => ({
          ...prev,
          jiraTasks: jiraData.total || 0,
          jiraInProgress: jiraData.tasks?.filter((task: any) => task.statusCategory === 'indeterminate').length || 0,
          jiraTodo: jiraData.tasks?.filter((task: any) => task.statusCategory === 'new').length || 0,
        }));
        setJiraTasks(jiraData.tasks?.slice(0, 5) || []);
      } else {
        const errorData = await jiraRes.json();
        console.error('❌ Failed to fetch Jira tasks:', errorData);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      toast.error('Please drop image files only');
      return;
    }

    // Validate file sizes
    const validFiles = imageFiles.filter(file => {
      const maxSize = 25 * 1024 * 1024; // 25MB
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 25MB limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Initialize metadata
    const metadata: { [key: string]: { name: string; alt: string; category: string } } = {};
    validFiles.forEach(file => {
      metadata[file.name] = {
        name: file.name.replace(/\.[^/.]+$/, ''),
        alt: '',
        category: 'Other'
      };
    });

    setSelectedFiles(validFiles);
    setUploadMetadata(metadata);
    setShowUploadModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length === 0) {
        toast.error('Please select image files only');
        return;
      }

      // Validate and initialize metadata
      const validFiles = imageFiles.filter(file => {
        const maxSize = 25 * 1024 * 1024;
        if (file.size > maxSize) {
          toast.error(`${file.name} exceeds 25MB limit`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const metadata: { [key: string]: { name: string; alt: string; category: string } } = {};
      validFiles.forEach(file => {
        metadata[file.name] = {
          name: file.name.replace(/\.[^/.]+$/, ''),
          alt: '',
          category: 'Other'
        };
      });

      setSelectedFiles(validFiles);
      setUploadMetadata(metadata);
      setShowUploadModal(true);
    }
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) return;

    // Validate metadata
    for (const file of selectedFiles) {
      const meta = uploadMetadata[file.name];
      if (!meta || !meta.name || !meta.alt) {
        toast.error(`Please fill in all metadata for ${file.name}`);
        return;
      }
    }

    setUploadingImages(true);

    try {
      const formData = new FormData();
      
      selectedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
        formData.append(`metadata_${index}`, JSON.stringify(uploadMetadata[file.name]));
      });
      
      formData.append('count', selectedFiles.length.toString());

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/gallery/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success('Images uploaded successfully!');
        setSelectedFiles([]);
        setUploadMetadata({});
        setShowUploadModal(false);
        fetchStats(); // Refresh stats
      } else {
        const error = await response.json();
        toast.error(error.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    } finally {
      setUploadingImages(false);
    }
  };

  const updateMetadata = (fileName: string, field: 'name' | 'alt' | 'category', value: string) => {
    setUploadMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles(prev => prev.filter(f => f.name !== fileName));
    setUploadMetadata(prev => {
      const newMeta = { ...prev };
      delete newMeta[fileName];
      return newMeta;
    });
  };

  const getFirstName = () => {
    if (!profile?.full_name) return 'User';
    const firstName = profile.full_name.split(' ')[0];
    return firstName || 'User';
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 md:p-5 border-b border-zinc-800/50 flex items-center justify-between">
              <h3 className="text-zinc-100">Upload Images</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFiles([]);
                  setUploadMetadata({});
                }}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="bg-zinc-800/50 border border-zinc-800 rounded-lg p-3 md:p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <ImageIcon className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-300 truncate">{file.name}</div>
                      <div className="text-[10px] text-zinc-600">{(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <button
                      onClick={() => removeFile(file.name)}
                      className="text-zinc-600 hover:text-zinc-400"
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={uploadMetadata[file.name]?.name || ''}
                        onChange={(e) => updateMetadata(file.name, 'name', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700"
                        placeholder="Image name"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-1">Alt Text</label>
                      <input
                        type="text"
                        value={uploadMetadata[file.name]?.alt || ''}
                        onChange={(e) => updateMetadata(file.name, 'alt', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700"
                        placeholder="Description for accessibility"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-1">Category</label>
                      <select
                        value={uploadMetadata[file.name]?.category || 'Other'}
                        onChange={(e) => updateMetadata(file.name, 'category', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700"
                      >
                        <option value="Brand">Brand</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Logo">Logo</option>
                        <option value="Case Study">Case Study</option>
                        <option value="About">About</option>
                        <option value="Workflow">Workflow</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 md:p-5 border-t border-zinc-800/50 flex gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFiles([]);
                  setUploadMetadata({});
                }}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-xs text-zinc-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadImages}
                disabled={uploadingImages}
                className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 border border-cyan-500 rounded text-xs text-white transition-colors disabled:opacity-50"
              >
                {uploadingImages ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" strokeWidth={1.5} />
                    Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'Image' : 'Images'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl text-zinc-100">
          {getTimeOfDay()}, {getFirstName()} 👋
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-zinc-500 text-xs mb-2">Total Submissions</div>
              <div className="text-2xl text-zinc-100">{stats.submissions}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-zinc-500 text-xs mb-2">Gallery Images</div>
              <div className="text-2xl text-zinc-100">{stats.galleryImages}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-zinc-500 text-xs mb-2">Blog Posts</div>
              <div className="text-2xl text-zinc-100">{stats.blogPosts}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <PenTool className="w-5 h-5 text-green-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-zinc-500 text-xs mb-2">Jira Tasks</div>
              <div className="text-2xl text-zinc-100">{stats.jiraTasks}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-red-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-zinc-500 text-xs mb-2">Jira In Progress</div>
              <div className="text-2xl text-zinc-100">{stats.jiraInProgress}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-yellow-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-zinc-500 text-xs mb-2">Jira To Do</div>
              <div className="text-2xl text-zinc-100">{stats.jiraTodo}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Team Resources Section */}
      <div className="bg-[#0A0A0A] border border-zinc-900/50 rounded-lg p-6">
        <div className="mb-4">
          <p className="text-zinc-600 text-xs">
            Quick Links
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weekly Team Tasks */}
          <a
            href="https://docs.google.com/document/d/1454ftLwdiuDotqMl38467rYjEn4kpbQODUuIZNEvBCU/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-400/50 rounded px-4 py-2 text-sm text-cyan-300 hover:text-cyan-200 transition-all text-center"
          >
            Weekly Team Tasks
          </a>

          {/* CIELO HUB Drive */}
          <a
            href="https://drive.google.com/drive/u/0/folders/0AL-j0T0bk-kZUk9PVA"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500/5 hover:bg-green-500/10 border border-green-400/50 rounded px-4 py-2 text-sm text-green-300 hover:text-green-200 transition-all text-center"
          >
            CIELO HUB Drive
          </a>

          {/* Client Hub */}
          <a
            href="https://drive.google.com/drive/u/0/folders/18PMgZnsdmEHzNN38Z3RGXVnTdde2HGi2"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-500/5 hover:bg-blue-500/10 border border-blue-400/50 rounded px-4 py-2 text-sm text-blue-300 hover:text-blue-200 transition-all text-center"
          >
            Client Hub
          </a>

          {/* Passwords Team */}
          <a
            href="https://docs.google.com/spreadsheets/d/1Tb0jUyCogBy0Eev4e2WSovvqzbKedNO-zrmlVaRAzxc/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-purple-500/5 hover:bg-purple-500/10 border border-purple-400/50 rounded px-4 py-2 text-sm text-purple-300 hover:text-purple-200 transition-all text-center"
          >
            Passwords Team
          </a>

          {/* Quote Page */}
          <button
            onClick={() => onNavigate && onNavigate('quote')}
            className="block bg-orange-500/5 hover:bg-orange-500/10 border border-orange-400/50 rounded px-4 py-2 text-sm text-orange-300 hover:text-orange-200 transition-all text-center"
          >
            Quote Page
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-hidden">
          <div className="p-5 border-b border-zinc-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-100">Recent Submissions</h3>
              <ChevronRight className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
            </div>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="text-center py-8 text-zinc-600 text-xs">Loading...</div>
            ) : recentSubmissions.length > 0 ? (
              <div className="space-y-3">
                {recentSubmissions.map((submission, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 pb-3 border-b border-zinc-800/30 last:border-0"
                  >
                    <div className="w-8 h-8 rounded bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-300 truncate">{submission.name || 'Unnamed'}</div>
                      <div className="text-[10px] text-zinc-600 mt-0.5">
                        {submission.createdAt ? formatDate(submission.createdAt) : 'Recently'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Inbox className="w-8 h-8 text-zinc-700 mx-auto mb-2" strokeWidth={1.5} />
                <div className="text-xs text-zinc-600">No submissions yet</div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Quick Upload */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-hidden">
          <div className="p-5 border-b border-zinc-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-100">Gallery Upload</h3>
              <ChevronRight className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
            </div>
          </div>
          <div className="p-5">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="gallery-upload-input"
            />
            <label htmlFor="gallery-upload-input">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-3" strokeWidth={1.5} />
                <div className="text-xs text-zinc-500 mb-1">Drag & drop images</div>
                <div className="text-[10px] text-zinc-700">or click to browse</div>
              </div>
            </label>
            <div className="mt-4 pt-4 border-t border-zinc-800/30">
              <div className="text-[10px] text-zinc-600">
                <span className="text-zinc-500">{stats.galleryImages}</span> images in gallery
              </div>
            </div>
          </div>
        </div>

        {/* Blog Quick Access */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-hidden">
          <div className="p-5 border-b border-zinc-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-100">Blog Management</h3>
              <ChevronRight className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <button
                onClick={() => onNavigate && onNavigate('blog-management')}
                className="w-full bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 rounded-lg p-4 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <PenTool className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors">
                      Create New Post
                    </div>
                    <div className="text-[10px] text-zinc-600">Write & publish</div>
                  </div>
                </div>
              </button>

              <div className="pt-3 border-t border-zinc-800/30">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-600">Published posts</span>
                  <span className="text-zinc-500">{stats.blogPosts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}