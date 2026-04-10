import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface GalleryImage {
  id: string;
  src: string;
  name: string;
  alt: string;
  category: 'Brand' | 'Portfolio' | 'Logo' | 'Case Study' | 'About' | 'Workflow' | 'Other';
  uploadedAt?: string;
}

interface GalleryProps {
  onNavigate: (page: string) => void;
}

export function Gallery({ onNavigate }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
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
      } else {
        console.error('Failed to fetch gallery images');
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Gallery Grid - 3 Columns with full images */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-24">
            <p className="text-xl text-white/60">Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-white/60">No images in gallery yet.</p>
            <p className="text-sm text-white/40 mt-2">Visit the admin dashboard to upload images.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((image, index) => (
              <motion.div
                key={image.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
                className="relative bg-white/5 border border-white/10 rounded-md group break-inside-avoid"
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}