import { useState, useEffect } from 'react';
import { Copy, ExternalLink, AlertCircle, CheckCircle, Image as ImageIcon, Eye, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { motion } from 'motion/react';

interface PinterestRSSGalleryProps {
  onNavigate: (page: string) => void;
}

interface GalleryImage {
  id: string;
  name: string;
  alt: string;
  category: string;
  published: boolean;
  created_at: string;
  src: string;
}

export function PinterestRSSGallery({ onNavigate }: PinterestRSSGalleryProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to view gallery');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/gallery`,
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
        const images = data.images || [];
        setGalleryImages(images);
        
        // Calculate stats
        const published = images.filter((img: GalleryImage) => img.published).length;
        setStats({
          total: images.length,
          published,
          draft: images.length - published
        });
      } else {
        console.error('Failed to fetch gallery images');
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyRSSUrl = () => {
    const url = 'https://cielo.agency/pins.xml';
    navigator.clipboard.writeText(url);
    toast.success('RSS URL copied to clipboard!');
  };

  const testRSSFeed = () => {
    window.open(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pins.xml`, '_blank');
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2 tracking-tight font-[Helvetica_Neue]">Pinterest RSS Feed</h1>
        <p className="text-zinc-500">
          Automatically publishes images from your Gallery to Pinterest via RSS feed
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Total Images</p>
              <p className="text-3xl text-white tracking-tight">{stats.total}</p>
            </div>
            <ImageIcon className="w-8 h-8 text-zinc-700" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Published to RSS</p>
              <p className="text-3xl text-cyan-400 tracking-tight">{stats.published}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-cyan-900" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Draft</p>
              <p className="text-3xl text-zinc-500 tracking-tight">{stats.draft}</p>
            </div>
            <Eye className="w-8 h-8 text-zinc-700" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* RSS Feed Details */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 mb-6">
        <h2 className="text-xl text-white mb-4 tracking-tight">Feed Details</h2>
        
        {/* Public RSS URL */}
        <div className="mb-6">
          <label className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2 block">Public RSS URL</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              readOnly
              value="https://cielo.agency/pins.xml"
              className="flex-1 bg-[#0A0A0B] border border-zinc-800 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors"
            />
            <button
              onClick={copyRSSUrl}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-white transition-colors border border-zinc-800"
              title="Copy URL"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={testRSSFeed}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-white transition-colors border border-zinc-800"
              title="Test Feed"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <p className="text-zinc-600 text-xs">
            Add this URL to your Pinterest Business account to enable auto-publishing
          </p>
        </div>

        {/* Feed Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0A0A0B] border border-zinc-800 p-4">
            <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-1">Data Source</p>
            <p className="text-white text-sm">Gallery Images Table</p>
          </div>
          <div className="bg-[#0A0A0B] border border-zinc-800 p-4">
            <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-1">Update Frequency</p>
            <p className="text-white text-sm">Real-time (5 min cache)</p>
          </div>
          <div className="bg-[#0A0A0B] border border-zinc-800 p-4">
            <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-1">Feed Format</p>
            <p className="text-white text-sm">RSS 2.0</p>
          </div>
          <div className="bg-[#0A0A0B] border border-zinc-800 p-4">
            <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-1">Item Limit</p>
            <p className="text-white text-sm">50 most recent</p>
          </div>
        </div>
      </div>

      {/* Gallery Link Banner */}
      <div className="mb-6 bg-cyan-500/5 border border-cyan-500/20 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="flex-1">
            <h3 className="text-cyan-400 text-sm font-medium mb-1">Using Gallery Data Source</h3>
            <p className="text-zinc-400 text-sm mb-3">
              The Pinterest RSS feed automatically pulls published images from your <strong>Gallery</strong>. 
              To manage content for Pinterest, go to the Gallery page and mark images as "Published".
            </p>
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-medium transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Go to Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Field Mapping Table */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-xl text-white tracking-tight">Gallery → RSS Field Mapping</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                Gallery Field
              </th>
              <th className="text-center px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                →
              </th>
              <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                RSS Field
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <td className="px-6 py-4 text-sm text-zinc-400">Gallery Image</td>
              <td className="px-6 py-4 text-center text-zinc-600">→</td>
              <td className="px-6 py-4 text-sm text-white">RSS Item Image (enclosure)</td>
            </tr>
            <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <td className="px-6 py-4 text-sm text-zinc-400">Gallery Name</td>
              <td className="px-6 py-4 text-center text-zinc-600">→</td>
              <td className="px-6 py-4 text-sm text-white">RSS Item Title</td>
            </tr>
            <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <td className="px-6 py-4 text-sm text-zinc-400">Gallery Alt Text</td>
              <td className="px-6 py-4 text-center text-zinc-600">→</td>
              <td className="px-6 py-4 text-sm text-white">RSS Item Description</td>
            </tr>
            <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
              <td className="px-6 py-4 text-sm text-zinc-400">Gallery ID</td>
              <td className="px-6 py-4 text-center text-zinc-600">→</td>
              <td className="px-6 py-4 text-sm text-white">https://cielo.agency/gallery#[id]</td>
            </tr>
            <tr className="hover:bg-zinc-900/30 transition-colors">
              <td className="px-6 py-4 text-sm text-zinc-400">Created Date</td>
              <td className="px-6 py-4 text-center text-zinc-600">→</td>
              <td className="px-6 py-4 text-sm text-white">RSS Published Date</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Published Images Preview */}
      <div className="bg-zinc-950 border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-white tracking-tight">Published Images in Feed</h2>
          <span className="text-sm text-zinc-500">{stats.published} items</span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4"></div>
            <p className="text-zinc-500">Loading gallery images...</p>
          </div>
        ) : galleryImages.filter(img => img.published).length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-zinc-500 mb-4">No published images in the feed yet</p>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-medium transition-colors"
            >
              Add Images to Gallery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages
              .filter(img => img.published)
              .slice(0, 12)
              .map((image) => (
                <div key={image.id} className="bg-[#0A0A0B] border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors">
                  <div className="aspect-square bg-zinc-900 relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate mb-1">{image.name}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-zinc-600" />
                      <p className="text-zinc-600 text-xs">
                        {new Date(image.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        
        {galleryImages.filter(img => img.published).length > 12 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('gallery')}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
            >
              View all {stats.published} published images →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}