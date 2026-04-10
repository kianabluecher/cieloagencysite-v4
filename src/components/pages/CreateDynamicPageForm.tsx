import { useState } from 'react';
import { X, Save, Loader } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Sparkles } from 'lucide-react';

interface CreateDynamicPageFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateDynamicPageForm({ onClose, onSuccess }: CreateDynamicPageFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    keywords: '',
    heroTitle: '',
    heroDescription: '',
    category: 'Template-Based'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate slug format (lowercase, hyphens only)
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(formData.slug)) {
        toast.error('Slug must be lowercase with hyphens only (e.g., my-new-page)');
        setLoading(false);
        return;
      }

      // Save to Supabase KV store
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dynamic-pages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            action: 'create',
            pageData: {
              ...formData,
              templateBased: true,
              createdAt: new Date().toISOString()
            }
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to create page');
      }

      toast.success('Page created successfully! Refresh to see changes.');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating page:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 pt-8 overflow-y-auto">
      <div className="bg-[#0A0A0B] border border-zinc-800 rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-3.5 bg-[#0A0A0B] rounded-t-lg">
          <div>
            <h2 className="text-lg text-white">Create New Page</h2>
            <p className="text-zinc-400 text-xs mt-0.5">
              Create a new industry page using the shared template
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1 hover:bg-zinc-800/50 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
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
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <p className="text-zinc-500 text-xs mt-1.5">
              The main title displayed in the admin dashboard and SEO
            </p>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-white mb-2 text-sm">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">/</span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                placeholder="fitness-brand-design"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors font-['Geist_Mono'] text-sm"
              />
            </div>
            <p className="text-zinc-500 text-xs mt-1.5">
              Lowercase letters, numbers, and hyphens only. This will be the page URL.
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
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <p className="text-zinc-500 text-xs mt-1.5">
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
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <p className="text-zinc-500 text-xs mt-1.5">
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
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            />
            <p className="text-zinc-500 text-xs mt-1.5">
              Introductory paragraph below the hero title
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
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <p className="text-zinc-500 text-xs mt-1.5">
              Comma-separated keywords for SEO optimization
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3.5">
            <h4 className="text-cyan-400 text-sm mb-1.5 flex items-center gap-2">
              <Sparkles size={14} />
              About Template-Based Pages
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              This page will use the shared <code className="text-cyan-400 font-['Geist_Mono'] text-xs bg-cyan-500/10 px-1.5 py-0.5 rounded">IndustrySubpageTemplate.tsx</code> component.
              The template includes pre-designed sections for brands, timeline, portfolio, FAQs, and testimonials.
              After creation, you'll need to manually add this page to your App.tsx routing to make it accessible.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-white transition-colors text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Page
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}