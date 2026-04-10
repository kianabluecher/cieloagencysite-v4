import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useInViewSequential } from '../utils/useSequentialLoad';
import weldaClub from 'figma:asset/5a911800eee960a91df0b17d09f43be7823a06c0.png';
import parcerosCapital from 'figma:asset/02567d9e0a559718b885412c01249e78f0e62f06.png';
import sustainableSocialKit from 'figma:asset/49cde423a22e89ba02dde38e166c473a2ee5806b.png';
import whitestoneRealEstate from 'figma:asset/77a0988df5600cc92b40041211ecab7b51bf50e0.png';
import realEstateApp from 'figma:asset/d8b208595b75b2984eb7cd016b5aab882a5fd90c.png';
import adnocDrilling from 'figma:asset/036877fde49f2d00b97a275f62c3dd9f01eaa506.png';
import mobyRobotics from 'figma:asset/1482de535fdd2145ed04e327087d2a29898993fe.png';

interface FeaturedWorkProps {
  onProjectClick?: (projectId: string) => void;
  onNavigate?: (page: string) => void;
}

// Manual Recent Success items - UPDATE THESE with your own images and links
const recentSuccessItems = [
  {
    id: '1',
    imageUrl: sustainableSocialKit,
    title: 'Sustainable Credit Partners',
    subtitle: 'LinkedIn headers & full social media kit',
    redirectUrl: 'https://example.com/project1'
  },
  {
    id: '2',
    imageUrl: parcerosCapital,
    title: 'Parceros Capital',
    subtitle: 'Brand identity and web design for impact investors',
    redirectUrl: 'https://example.com/project2'
  },
  {
    id: '3',
    imageUrl: weldaClub,
    title: 'Welda Club',
    subtitle: 'Brand identity for exclusive golf and lifestyle club',
    redirectUrl: 'https://example.com/project3'
  },
  {
    id: '4',
    imageUrl: whitestoneRealEstate,
    title: 'Whitestone Real Estate Fund',
    subtitle: 'Brand identity and investor deck design',
    redirectUrl: 'https://example.com/project4'
  },
  {
    id: '5',
    imageUrl: adnocDrilling,
    title: 'ADNOC Drilling',
    subtitle: 'Investor presentation design for tech-driven acquisitions',
    redirectUrl: 'https://example.com/project5'
  },
  {
    id: '6',
    imageUrl: mobyRobotics,
    title: 'MOBY Robotics',
    subtitle: 'AI-powered robotics brand for ocean floor mining technology',
    redirectUrl: 'https://example.com/project6'
  },
  {
    id: '7',
    imageUrl: realEstateApp,
    title: 'Luxury Real Estate Platform',
    subtitle: 'Mobile app design for exclusive Miami properties',
    redirectUrl: 'https://example.com/project7'
  },
];

export function FeaturedWork({ onProjectClick, onNavigate }: FeaturedWorkProps) {
  const [loading, setLoading] = useState(true);
  const { containerRef, visibleCount } = useInViewSequential(7, 200);

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const preloadPromises = recentSuccessItems.map(item => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error
          img.src = item.imageUrl;
        });
      });

      await Promise.all(preloadPromises);
      setLoading(false);
    };

    preloadImages();
  }, []);

  const handleItemClick = (redirectUrl: string) => {
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="px-6 py-32 border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="inline-block px-4 py-2 rounded-full">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Featured Work ]
            </p>
          </div>
          <h2 className="text-white tracking-tight leading-[1.1] text-[48px] md:text-[56px]">
            Recent Brands we have <br />
            launched and grown
          </h2>
        </div>

        {/* Gallery Grid - Masonry Layout */}
        <div ref={containerRef} className="md:grid md:grid-cols-2 md:gap-x-8">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse mb-8">
                  <div className="bg-[#1a1a1a] w-full aspect-[4/3] rounded mb-6" />
                  <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#1a1a1a] rounded w-1/2" />
                </div>
              ))}
            </>
          ) : recentSuccessItems.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-[#7d8187]">
              No projects found
            </div>
          ) : (
            <>
              {/* Left Column */}
              <div className="space-y-8">
                {recentSuccessItems.filter((_, index) => index % 2 === 0).map((project, index) => {
                  const actualIndex = index * 2;
                  const isVisible = actualIndex < visibleCount;
                  
                  return (
                    <div
                      key={index}
                      className={`group cursor-pointer transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      onClick={() => handleItemClick(project.redirectUrl)}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden mb-6">
                        {isVisible && (
                          <ImageWithFallback 
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>

                      {/* Info Below */}
                      <div className="space-y-2">
                        <h3 className="text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-[#7d8187] text-sm">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column - Offset upward */}
              <div className="space-y-8 md:-mt-32">
                {recentSuccessItems.filter((_, index) => index % 2 === 1).map((project, index) => {
                  const actualIndex = index * 2 + 1;
                  const isVisible = actualIndex < visibleCount;
                  
                  return (
                    <div
                      key={index}
                      className={`group cursor-pointer transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      onClick={() => handleItemClick(project.redirectUrl)}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden mb-6">
                        {isVisible && (
                          <ImageWithFallback 
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>

                      {/* Info Below */}
                      <div className="space-y-2">
                        <h3 className="text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-[#7d8187] text-sm">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* View Full Portfolio Link - Aligned Right */}
        <div className="flex justify-end mt-8">
          <button 
            onClick={() => onNavigate?.('portfolio')}
            className="flex items-center gap-2 text-[#7d8187] hover:text-white transition-colors group"
          >
            <span>view full portfolio</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}