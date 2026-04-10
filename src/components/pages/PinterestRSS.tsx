import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Copy, Trash2, Eye, EyeOff, MoreVertical, Upload, X, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { motion, AnimatePresence } from 'motion/react';

interface PinterestRSSProps {
  onNavigate: (page: string) => void;
}

interface RSSItem {
  id: string;
  title: string;
  canonicalUrl: string;
  description: string;
  imageUrl: string;
  status: 'draft' | 'published';
  publishedAt: string;
  updatedAt: string;
  createdBy: string;
}

export function PinterestRSS({ onNavigate }: PinterestRSSProps) {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RSSItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    canonicalUrl: '',
    description: '',
    imageUrl: '',
    publishedAt: new Date().toISOString().slice(0, 16),
    status: 'draft' as 'draft' | 'published'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to view RSS items');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pinterest-rss/items`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        console.error('Failed to fetch RSS items');
      }
    } catch (error) {
      console.error('Error fetching RSS items:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.canonicalUrl.trim()) {
      errors.canonicalUrl = 'Canonical URL is required';
    } else {
      try {
        const url = new URL(formData.canonicalUrl);
        // Check if it's on primary domain (you can customize this)
        if (!url.hostname.includes('cieloagency.com') && !url.hostname.includes('localhost')) {
          errors.canonicalUrl = 'URL must be on the primary domain (cieloagency.com)';
        }
      } catch (e) {
        errors.canonicalUrl = 'Invalid URL format';
      }
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.imageUrl.trim() && !imageFile) {
      errors.imageUrl = 'Image is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl: previewUrl }));
      setFormErrors(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleSubmit = async (publishNow: boolean = false) => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setUploading(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to save RSS items');
        return;
      }

      // Upload image if there's a file
      let finalImageUrl = formData.imageUrl;
      if (imageFile) {
        // In production, upload to Supabase Storage or another service
        // For now, we'll use the preview URL
        // TODO: Implement actual upload to storage
        finalImageUrl = formData.imageUrl;
      }

      const itemData = {
        ...formData,
        imageUrl: finalImageUrl,
        status: publishNow ? 'published' : formData.status,
      };

      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pinterest-rss/items/${editingItem.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pinterest-rss/items`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        toast.success(editingItem ? 'RSS item updated!' : 'RSS item created!');
        setShowCreateModal(false);
        setEditingItem(null);
        resetForm();
        fetchItems();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save RSS item');
      }
    } catch (error) {
      console.error('Error saving RSS item:', error);
      toast.error('Failed to save RSS item');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to delete RSS items');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pinterest-rss/items/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      if (response.ok) {
        toast.success('RSS item deleted');
        setShowDeleteConfirm(null);
        fetchItems();
      } else {
        toast.error('Failed to delete RSS item');
      }
    } catch (error) {
      console.error('Error deleting RSS item:', error);
      toast.error('Failed to delete RSS item');
    }
  };

  const handleToggleStatus = async (item: RSSItem) => {
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const newStatus = item.status === 'published' ? 'draft' : 'published';

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pinterest-rss/items/${item.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...item, status: newStatus }),
        }
      );

      if (response.ok) {
        toast.success(`Item ${newStatus === 'published' ? 'published' : 'unpublished'}`);
        fetchItems();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleDuplicate = (item: RSSItem) => {
    setFormData({
      title: `${item.title} (Copy)`,
      canonicalUrl: item.canonicalUrl,
      description: item.description,
      imageUrl: item.imageUrl,
      publishedAt: new Date().toISOString().slice(0, 16),
      status: 'draft'
    });
    setShowCreateModal(true);
  };

  const handleEdit = (item: RSSItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      canonicalUrl: item.canonicalUrl,
      description: item.description,
      imageUrl: item.imageUrl,
      publishedAt: item.publishedAt.slice(0, 16),
      status: item.status
    });
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      canonicalUrl: '',
      description: '',
      imageUrl: '',
      publishedAt: new Date().toISOString().slice(0, 16),
      status: 'draft'
    });
    setFormErrors({});
    setImageFile(null);
  };

  const copyRSSUrl = () => {
    const url = `https://www.cieloagency.com/pins.xml`;
    navigator.clipboard.writeText(url);
    toast.success('RSS URL copied to clipboard!');
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.canonicalUrl.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedCount = items.filter(i => i.status === 'published').length;
  const allHaveImages = items.filter(i => i.status === 'published').every(i => i.imageUrl);
  const allHaveValidUrls = items.filter(i => i.status === 'published').every(i => {
    try {
      new URL(i.canonicalUrl);
      return true;
    } catch {
      return false;
    }
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="max-w-[1800px] mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl text-white font-bold mb-2">Pinterest RSS Publishing</h1>
              <p className="text-white/60 text-lg">
                Manage content that is exposed via the Pinterest RSS feed for auto-created Pins.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingItem(null);
                resetForm();
                setShowCreateModal(true);
              }}
              className="px-6 py-3 bg-[#C8B677] hover:bg-[#B8A667] text-black font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create RSS Item
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content - RSS Items List */}
          <div className="xl:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Filters */}
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search by title or URL..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0A0A0B] border border-white/20 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-[#0A0A0B] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              {loading ? (
                <div className="p-12 text-center">
                  <p className="text-white/60">Loading RSS items...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-white/60 text-lg mb-2">No RSS items yet</p>
                  <p className="text-white/40 text-sm">Create your first item to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="text-left p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Thumbnail</th>
                        <th className="text-left p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Title</th>
                        <th className="text-left p-4 text-xs font-medium text-white/60 uppercase tracking-wider">URL</th>
                        <th className="text-left p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                        <th className="text-left p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Published At</th>
                        <th className="text-left p-4 text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/40">
                                  <Upload className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-white font-medium line-clamp-2">{item.title}</p>
                          </td>
                          <td className="p-4">
                            <a 
                              href={item.canonicalUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#00D9FF] hover:text-[#00B8DD] text-sm flex items-center gap-1 group/link"
                            >
                              <span className="truncate max-w-[200px]">{item.canonicalUrl}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </a>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleStatus(item)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                item.status === 'published'
                                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                  : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                              }`}
                            >
                              {item.status === 'published' ? (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  Published
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <EyeOff className="w-3 h-3" />
                                  Draft
                                </span>
                              )}
                            </button>
                          </td>
                          <td className="p-4">
                            <p className="text-white/60 text-sm">
                              {new Date(item.publishedAt).toLocaleDateString()}
                            </p>
                            <p className="text-white/40 text-xs">
                              {new Date(item.publishedAt).toLocaleTimeString()}
                            </p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDuplicate(item)}
                                className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                                title="Duplicate"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(item.id)}
                                className="p-2 hover:bg-red-500/20 rounded-lg text-white/60 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel - Feed Details */}
          <div className="xl:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl text-white font-bold mb-6">RSS Feed Details</h2>
              
              {/* Public RSS URL */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">Public RSS URL</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    readOnly
                    value="https://www.cieloagency.com/pins.xml"
                    className="flex-1 bg-[#0A0A0B] border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none"
                  />
                  <button
                    onClick={copyRSSUrl}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-white/40 text-xs">
                  This is the URL to add to Pinterest. It serves from your claimed domain.
                </p>
              </div>

              {/* Feed Status */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-medium mb-4">Feed Status</h3>
                
                <div className="space-y-4">
                  {/* Published Count */}
                  <div className="bg-[#0A0A0B] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/60 text-sm">Published Items</span>
                      <span className="text-2xl text-white font-bold">{publishedCount}</span>
                    </div>
                    <p className="text-white/40 text-xs">Total items in RSS feed</p>
                  </div>

                  {/* Validation Checks */}
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      allHaveImages ? 'bg-green-500/10' : 'bg-yellow-500/10'
                    }`}>
                      {allHaveImages ? (
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${allHaveImages ? 'text-green-400' : 'text-yellow-400'}`}>
                        {allHaveImages ? 'All items have images' : 'Some items missing images'}
                      </span>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      allHaveValidUrls ? 'bg-green-500/10' : 'bg-yellow-500/10'
                    }`}>
                      {allHaveValidUrls ? (
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${allHaveValidUrls ? 'text-green-400' : 'text-yellow-400'}`}>
                        {allHaveValidUrls ? 'All URLs are valid' : 'Some URLs are invalid'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A1C] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#1A1A1C] z-10">
                <h2 className="text-2xl text-white font-bold">
                  {editingItem ? 'Edit RSS Item' : 'Create RSS Item'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, title: e.target.value }));
                      setFormErrors(prev => ({ ...prev, title: '' }));
                    }}
                    placeholder="Enter a descriptive title..."
                    className={`w-full bg-[#0A0A0B] border ${
                      formErrors.title ? 'border-red-500' : 'border-white/20'
                    } rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors`}
                  />
                  {formErrors.title && (
                    <p className="text-red-400 text-sm mt-1.5">{formErrors.title}</p>
                  )}
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Canonical URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    value={formData.canonicalUrl}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }));
                      setFormErrors(prev => ({ ...prev, canonicalUrl: '' }));
                    }}
                    placeholder="https://cieloagency.com/page"
                    className={`w-full bg-[#0A0A0B] border ${
                      formErrors.canonicalUrl ? 'border-red-500' : 'border-white/20'
                    } rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors`}
                  />
                  <p className="text-white/40 text-xs mt-1.5">Must be on the primary domain (cieloagency.com)</p>
                  {formErrors.canonicalUrl && (
                    <p className="text-red-400 text-sm mt-1.5">{formErrors.canonicalUrl}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, description: e.target.value }));
                      setFormErrors(prev => ({ ...prev, description: '' }));
                    }}
                    placeholder="Enter a detailed description for Pinterest..."
                    rows={4}
                    className={`w-full bg-[#0A0A0B] border ${
                      formErrors.description ? 'border-red-500' : 'border-white/20'
                    } rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors resize-none`}
                  />
                  {formErrors.description && (
                    <p className="text-red-400 text-sm mt-1.5">{formErrors.description}</p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Image <span className="text-red-400">*</span>
                  </label>
                  
                  {formData.imageUrl ? (
                    <div className="relative">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-xl border border-white/20"
                      />
                      <button
                        onClick={() => {
                          setFormData(prev => ({ ...prev, imageUrl: '' }));
                          setImageFile(null);
                        }}
                        className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className={`border-2 border-dashed ${
                      formErrors.imageUrl ? 'border-red-500' : 'border-white/20'
                    } rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Upload className="w-6 h-6 text-white/60" />
                        </div>
                        <p className="text-white font-medium mb-1">Upload Image</p>
                        <p className="text-white/40 text-sm">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                  )}
                  
                  {/* Or image URL input */}
                  <div className="mt-3">
                    <input
                      type="url"
                      value={formData.imageUrl.startsWith('blob:') ? '' : formData.imageUrl}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, imageUrl: e.target.value }));
                        setFormErrors(prev => ({ ...prev, imageUrl: '' }));
                        setImageFile(null);
                      }}
                      placeholder="Or paste image URL..."
                      className="w-full bg-[#0A0A0B] border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                  
                  {formErrors.imageUrl && (
                    <p className="text-red-400 text-sm mt-1.5">{formErrors.imageUrl}</p>
                  )}
                </div>

                {/* Published At & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Published At</label>
                    <input
                      type="datetime-local"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                      className="w-full bg-[#0A0A0B] border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full bg-[#0A0A0B] border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10 bg-[#1A1A1C]">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={uploading}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={uploading}
                  className="px-6 py-3 bg-[#C8B677] hover:bg-[#B8A667] text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A1C] border border-white/10 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl text-white font-bold mb-4">Delete RSS Item?</h3>
              <p className="text-white/60 mb-6">
                Are you sure you want to delete this item? This action cannot be undone and the item will be removed from the RSS feed.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}