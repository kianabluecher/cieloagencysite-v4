import { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface EditDynamicPageFormProps {
  onClose: () => void;
  onSuccess: () => void;
  pageSlug: string;
  initialData: any;
}

export function EditDynamicPageForm({ onClose, onSuccess, pageSlug, initialData }: EditDynamicPageFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || pageSlug,
    description: initialData?.description || '',
    keywords: initialData?.keywords || '',
    heroTitle: initialData?.heroTitle || '',
    heroDescription: initialData?.heroDescription || '',
    downloadLink: initialData?.downloadLink || '',
    category: initialData?.category || 'Template-Based'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update in Supabase KV store
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dynamic-pages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            action: 'update',
            slug: pageSlug,
            pageData: {
              ...formData,
              templateBased: true,
              updatedAt: new Date().toISOString()
            }
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update page');
      }

      toast.success('Page updated successfully! Changes are now live.');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 pt-8 overflow-y-auto">
      <div className="bg-[#111111] border border-[#333333] max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#333333] px-6 py-4 bg-[#111111]">
          <div>
            <h2 className="text-xl text-white">Edit Template-Based Page</h2>
            <p className="text-[#888888] text-sm mt-1">
              Modify content for: <code className="text-emerald-400 font-['Geist_Mono'] text-xs">/{pageSlug}</code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Page Title */}
          <div>
            <label className="block text-white mb-2 text-sm">
              Page Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Fitness Brand Design"
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="text-[#666666] text-xs mt-1">
              The main title displayed in the admin dashboard and SEO
            </p>
          </div>

          {/* Slug (read-only) */}
          <div>
            <label className="block text-white mb-2 text-sm">
              URL Slug (cannot be changed)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[#666666] text-sm">/</span>
              <input
                type="text"
                disabled
                value={formData.slug}
                className="flex-1 bg-[#0A0A0A] border border-[#333333] text-[#666666] px-4 py-3 font-['Geist_Mono'] text-sm cursor-not-allowed"
              />
            </div>
            <p className="text-[#666666] text-xs mt-1">
              The URL slug cannot be changed after creation
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white mb-2 text-sm">
              Page Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Fitness branding services for gyms and trainers"
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="text-[#666666] text-xs mt-1">
              Short description for admin dashboard and meta tags
            </p>
          </div>

          {/* Hero Title */}
          <div>
            <label className="block text-white mb-2 text-sm">
              Hero Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              placeholder="e.g., Fitness Branding That Gets Members Moving"
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="text-[#666666] text-xs mt-1">
              Large heading displayed at the top of the page
            </p>
          </div>

          {/* Hero Description */}
          <div>
            <label className="block text-white mb-2 text-sm">
              Hero Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              placeholder="e.g., Whether you're launching a gym, fitness app, or personal training business..."
              rows={4}
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
            <p className="text-[#666666] text-xs mt-1">
              Introductory paragraph below the hero title
            </p>
          </div>

          {/* CTA Download Link */}
          <div>
            <label className="block text-white mb-2 text-sm">
              CTA Download Link
            </label>
            <input
              type="text"
              value={formData.downloadLink}
              onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
              placeholder="e.g., https://app.apollo.io/..."
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="text-[#666666] text-xs mt-1">
              Optional link for the "Download Information" button in the CTA section
            </p>
          </div>

          {/* SEO Keywords */}
          <div>
            <label className="block text-white mb-2 text-sm">
              SEO Keywords <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="e.g., fitness branding agency, gym brand design, trainer marketing"
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="text-[#666666] text-xs mt-1">
              Comma-separated keywords for SEO optimization
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4">
            <h4 className="text-yellow-400 text-sm mb-2">⚠️ Live Changes</h4>
            <p className="text-[#AAAAAA] text-sm leading-relaxed">
              Changes made here will be reflected immediately on the live page. The template design and structure remain the same, but all text content will be updated.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#333333]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] text-white transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
