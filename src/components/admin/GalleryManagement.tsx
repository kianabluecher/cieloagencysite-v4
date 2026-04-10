import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, X, Image as ImageIcon, Loader2, Edit, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface UploadedImage {
  id: string;
  src: string;
  name: string;
  alt: string;
  category: string;
  published?: boolean;
  uploadedAt: string;
}

interface GalleryManagementProps {
  onNavigate?: (page: string) => void;
}

const categories = ['Brand', 'Portfolio', 'Logo', 'Case Study', 'About', 'Workflow', 'Other'];

export function GalleryManagement({ onNavigate }: GalleryManagementProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState<{ [key: string]: { name: string; alt: string; category: string; published?: boolean } }>({});
  const [editingImage, setEditingImage] = useState<UploadedImage | null>(null);
  const [editFormData, setEditFormData] = useState<{ name: string; alt: string; category: string; published: boolean } | null>(null);
  const [updatingMetadata, setUpdatingMetadata] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  // Lock body scroll when edit modal is open
  useEffect(() => {
    if (editingImage) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Scroll window to top to ensure modal is visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [editingImage]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/gallery`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
        
        // Debug: Log each image's src
        console.log('Loaded images:', data.images?.length);
        data.images?.forEach((img: UploadedImage, idx: number) => {
          console.log(`Image ${idx + 1}:`, {
            id: img.id,
            name: img.name,
            srcLength: img.src?.length || 0,
            srcPreview: img.src?.substring(0, 50) || 'EMPTY'
          });
        });
      } else {
        toast.error('Failed to load images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Error loading images');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const maxSize = 25 * 1024 * 1024; // 25MB
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 25MB limit`);
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);

    // Initialize metadata for new files
    const newMetadata: { [key: string]: { name: string; alt: string; category: string } } = {};
    validFiles.forEach(file => {
      newMetadata[file.name] = {
        name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        alt: '',
        category: 'Other'
      };
    });
    setMetadata(prev => ({ ...prev, ...newMetadata }));
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles(prev => prev.filter(f => f.name !== fileName));
    setMetadata(prev => {
      const newMeta = { ...prev };
      delete newMeta[fileName];
      return newMeta;
    });
  };

  const updateMetadata = (fileName: string, field: 'name' | 'alt' | 'category', value: string) => {
    setMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    // Validate that all files have metadata
    for (const file of selectedFiles) {
      const meta = metadata[file.name];
      if (!meta || !meta.name || !meta.alt) {
        toast.error(`Please fill in all metadata for ${file.name}`);
        console.error('Missing metadata for:', file.name, meta);
        return;
      }
    }

    setUploading(true);
    console.log('Starting upload process...');
    console.log('Files to upload:', selectedFiles.length);

    try {
      const formData = new FormData();
      
      selectedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
        formData.append(`metadata_${index}`, JSON.stringify(metadata[file.name]));
        console.log(`File ${index}:`, {
          name: file.name,
          size: file.size,
          type: file.type,
          metadata: metadata[file.name]
        });
      });
      
      formData.append('count', selectedFiles.length.toString());

      console.log('Sending request to server...');
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

      console.log('Server response status:', response.status);
      const responseData = await response.json();
      console.log('Server response data:', responseData);

      if (response.ok) {
        toast.success(`Successfully uploaded ${responseData.uploaded} image(s)`);
        setSelectedFiles([]);
        setMetadata({});
        await fetchImages();
      } else {
        console.error('Upload failed - server response:', responseData);
        toast.error(responseData.error || responseData.details || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error(`Error uploading images: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/gallery/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        toast.success('Image deleted');
        fetchImages();
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  const handleEdit = (image: UploadedImage) => {
    setEditingImage(image);
    setEditFormData({
      name: image.name,
      alt: image.alt,
      category: image.category,
      published: image.published || false
    });
  };

  const handleSaveEdit = async () => {
    if (!editFormData) return;

    setUpdatingMetadata(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/gallery/${editingImage?.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editFormData)
        }
      );

      if (response.ok) {
        toast.success('Image metadata updated');
        await fetchImages();
        setEditingImage(null);
        setEditFormData(null);
      } else {
        toast.error('Failed to update image metadata');
      }
    } catch (error) {
      console.error('Error updating image metadata:', error);
      toast.error('Error updating image metadata');
    } finally {
      setUpdatingMetadata(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
    setEditFormData(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl mb-2 bg-gradient-to-r from-white to-cyan-400/60 bg-clip-text text-transparent">
          Gallery Management
        </h1>
        <p className="text-zinc-500 text-sm font-['Geist_Mono'] uppercase tracking-wider">
          Upload and manage gallery images
        </p>
      </div>

      {/* Edit Modal */}
      {editingImage && editFormData && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          onClick={handleCancelEdit}
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <div 
              className="bg-[#0A0A0B] border border-zinc-800/50 p-6 backdrop-blur-xl rounded-lg max-w-2xl w-full shadow-2xl shadow-cyan-500/5 animate-in slide-in-from-bottom-4 duration-300"
              onClick={(e) => e.stopPropagation()}
              ref={modalRef}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg mb-2 bg-gradient-to-r from-white to-cyan-400/60 bg-clip-text text-transparent">
                    Edit Image Metadata
                  </h2>
                  <p className="text-sm text-zinc-500 font-['Geist_Mono']">
                    Update metadata for the selected image
                  </p>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 bg-black/50 hover:bg-zinc-900 border border-zinc-800/50 hover:border-zinc-700/50 transition-all rounded-md cursor-pointer group"
                >
                  <X className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </button>
              </div>

              {/* Preview Image */}
              <div className="mb-6 aspect-video bg-black border border-zinc-800/50 rounded-lg overflow-hidden">
                <img
                  src={editingImage.src}
                  alt={editingImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Metadata Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                    Image Name *
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-800/50 text-white focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/5 outline-none transition-all font-['Geist_Mono'] rounded-md"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                    Alt Text *
                  </label>
                  <input
                    type="text"
                    value={editFormData.alt}
                    onChange={(e) => setEditFormData({ ...editFormData, alt: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-800/50 text-white focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/5 outline-none transition-all font-['Geist_Mono'] rounded-md"
                    placeholder="Enter alt text"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-800/50 text-white focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/5 outline-none transition-all font-['Geist_Mono'] rounded-md cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Published Status - For Pinterest RSS */}
                <div>
                  <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                    Pinterest RSS
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editFormData.published}
                        onChange={(e) => setEditFormData({ ...editFormData, published: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-400/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      <span className="ml-3 text-sm text-white font-['Geist_Mono']">
                        {editFormData.published ? 'Published to Pinterest RSS' : 'Not published'}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-zinc-600 mt-2 font-['Geist_Mono']">
                    When enabled, this image will be included in the Pinterest RSS feed
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  disabled={updatingMetadata}
                  className="px-6 py-2 bg-black border border-zinc-800/50 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700/50 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-['Geist_Mono'] uppercase tracking-wider text-sm rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={updatingMetadata}
                  className="px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/10 font-['Geist_Mono'] uppercase tracking-wider text-sm rounded-md cursor-pointer"
                >
                  {updatingMetadata ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-zinc-950/50 border border-zinc-800/50 p-6 backdrop-blur-xl rounded-lg">
        <h2 className="text-lg mb-2">Upload Images</h2>
        <p className="text-sm text-zinc-500 mb-6 font-['Geist_Mono']">
          Drag and drop images or click to browse • Max 25MB per file
        </p>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed transition-all p-12 text-center backdrop-blur-sm rounded-md ${
            dragActive
              ? 'border-cyan-400/50 bg-cyan-400/5 shadow-lg shadow-cyan-500/10'
              : 'border-zinc-700/50 hover:border-zinc-600/50 bg-zinc-900/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-zinc-600" strokeWidth={1.5} />
          <p className="mb-2 text-zinc-400">Drag & drop images here</p>
          <p className="text-sm text-zinc-600 mb-4 font-['Geist_Mono'] uppercase tracking-wider">
            or click to browse files
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10 font-['Geist_Mono'] uppercase tracking-wider text-sm rounded-md cursor-pointer"
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg">Selected Files</h3>
              <span className="text-sm text-zinc-500 font-['Geist_Mono']">{selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'}</span>
            </div>
            
            <div className="space-y-3">
              {selectedFiles.map((file) => {
                const meta = metadata[file.name] || { name: '', alt: '', category: 'Other' };
                return (
                  <div
                    key={file.name}
                    className="border border-zinc-800/50 bg-zinc-900/50 p-4 backdrop-blur-sm hover:border-zinc-700/50 transition-colors rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-400/10 border border-green-400/20 rounded-md">
                          <ImageIcon className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm text-white">{file.name}</p>
                          <p className="text-xs text-zinc-600 font-['Geist_Mono']">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.name)}
                        className="p-2 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Metadata Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                          Image Name *
                        </label>
                        <input
                          type="text"
                          value={meta.name}
                          onChange={(e) => updateMetadata(file.name, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-black border border-zinc-800/50 text-white focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/5 outline-none transition-all font-['Geist_Mono'] rounded-md"
                          placeholder="Enter name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                          Alt Text *
                        </label>
                        <input
                          type="text"
                          value={meta.alt}
                          onChange={(e) => updateMetadata(file.name, 'alt', e.target.value)}
                          className="w-full px-3 py-2 bg-black border border-zinc-800/50 text-white focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/5 outline-none transition-all font-['Geist_Mono'] rounded-md"
                          placeholder="Enter alt text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-500 mb-2 font-['Geist_Mono'] uppercase tracking-wider">
                          Category *
                        </label>
                        <select
                          value={meta.category}
                          onChange={(e) => updateMetadata(file.name, 'category', e.target.value)}
                          className="w-full px-3 py-2 bg-black border border-zinc-800/50 text-white focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/5 outline-none transition-all font-['Geist_Mono'] rounded-md"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/10 font-['Geist_Mono'] uppercase tracking-wider text-sm rounded-md cursor-pointer"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                    Uploading...
                  </>
                ) : (
                  'Upload All'
                )}
              </button>
              <button
                onClick={() => {
                  setSelectedFiles([]);
                  setMetadata({});
                }}
                disabled={uploading}
                className="px-6 py-2 border border-zinc-700/50 text-zinc-400 hover:bg-zinc-800/50 hover:border-zinc-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-['Geist_Mono'] uppercase tracking-wider text-sm rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Images Grid */}
      <div className="bg-zinc-950/50 border border-zinc-800/50 p-6 backdrop-blur-xl rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg">Uploaded Images</h2>
          <span className="text-sm text-zinc-500 font-['Geist_Mono']">{images.length} {images.length === 1 ? 'image' : 'images'}</span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-zinc-600" strokeWidth={1.5} />
            <p className="mt-4 text-zinc-500 font-['Geist_Mono'] uppercase tracking-wider text-sm">Loading...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800/50 rounded-lg">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-zinc-800" strokeWidth={1.5} />
            <p className="text-zinc-500 font-['Geist_Mono'] uppercase tracking-wider text-sm">No images uploaded</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm overflow-hidden group hover:border-zinc-700/50 transition-all rounded-lg"
              >
                <div className="relative aspect-video bg-black">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // If image fails to load, show a placeholder
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.error-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'error-placeholder absolute inset-0 flex items-center justify-center';
                        placeholder.innerHTML = `
                          <div class="text-center">
                            <svg class="w-12 h-12 mx-auto mb-2 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p class="text-xs text-zinc-600">Image failed to load</p>
                            <p class="text-xs text-zinc-700 mt-1">Invalid src: ${image.src ? 'Present but broken' : 'Empty'}</p>
                          </div>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                  {/* Delete Button Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Live Preview Link */}
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 left-3 p-2 bg-black/80 backdrop-blur-sm border border-zinc-700/50 hover:bg-zinc-800/50 hover:border-zinc-600/50 transition-all opacity-0 group-hover:opacity-100 hover:shadow-lg hover:shadow-zinc-500/10 rounded-md cursor-pointer text-zinc-400 hover:text-white"
                    title="Open image in new tab"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </a>

                  <button
                    onClick={() => handleDelete(image.id)}
                    className="absolute top-3 right-3 p-2 bg-black/80 backdrop-blur-sm border border-red-400/20 hover:bg-red-400/10 hover:border-red-400/40 transition-all opacity-0 group-hover:opacity-100 hover:shadow-lg hover:shadow-red-500/10 rounded-md cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" strokeWidth={1.5} />
                  </button>
                </div>
                
                {/* Image Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-white mb-1">{image.name}</p>
                      <p className="text-xs text-zinc-500 font-['Geist_Mono']">{image.alt}</p>
                    </div>
                    <button
                      onClick={() => handleEdit(image)}
                      className="p-2 bg-black/80 backdrop-blur-sm border border-cyan-400/20 hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all opacity-0 group-hover:opacity-100 hover:shadow-lg hover:shadow-cyan-500/10 rounded-md cursor-pointer"
                    >
                      <Edit className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <div className="border-t border-zinc-800/50 pt-2" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center px-2 py-1 border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 font-['Geist_Mono'] uppercase tracking-wider rounded-sm">
                      {image.category}
                    </span>
                    <span className="text-zinc-600 font-['Geist_Mono']">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}