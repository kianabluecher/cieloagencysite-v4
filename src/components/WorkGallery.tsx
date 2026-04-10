import { useState, useEffect } from 'react';
import { getAllProjects, initializePortfolio, type Project } from '../utils/portfolio-api';
import { useInViewSequential } from '../utils/useSequentialLoad';

interface WorkGalleryProps {
  onProjectClick?: (projectId: string) => void;
  staggered?: boolean;
}

export function WorkGallery({
  onProjectClick,
  staggered = false,
}: WorkGalleryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load 2 items at a time (one row), with 100ms stagger between rows
  const { containerRef, visibleCount } = useInViewSequential(projects.length, 100, 2);

  useEffect(() => {
    async function loadProjects() {
      try {
        // Only show loading on initial load, not on background refreshes
        if (projects.length === 0) {
          setLoading(true);
        }
        setError(null);
        console.log('🎨 WorkGallery: Starting to load projects...');
        
        await initializePortfolio();
        console.log('🎨 WorkGallery: Portfolio initialized successfully');
        
        const fetchedProjects = await getAllProjects();
        console.log('🎨 WorkGallery: Fetched projects:', fetchedProjects.length, fetchedProjects);
        
        if (fetchedProjects.length === 0) {
          console.warn('⚠️ WorkGallery: No projects returned from API');
        }
        
        setProjects(fetchedProjects);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('❌ WorkGallery: Error loading projects:', errorMessage, err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
    // Initial load
    loadProjects();
    
    // Refresh every 35 seconds to check for new portfolios
    const interval = setInterval(() => {
      console.log('🔄 WorkGallery: Auto-refreshing to check for new portfolios...');
      loadProjects();
    }, 35000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 pt-32 py-32 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Grid - Masonry Layout */}
        <div ref={containerRef} className="md:grid md:grid-cols-2 md:gap-x-8">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse mb-8">
                  <div className="bg-neutral-900 w-full aspect-[4/3] mb-4 rounded" />
                  <div className="h-6 bg-neutral-900 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-neutral-900 rounded w-1/2" />
                </div>
              ))}
            </>
          ) : error ? (
            <div className="col-span-2 text-center py-16">
              <p className="text-red-400 mb-4">Error loading projects</p>
              <p className="text-neutral-500 text-sm">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-6 py-2 border border-white/10 text-white rounded hover:bg-white/5 transition-colors"
              >
                Reload Page
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-neutral-500">
              <p className="mb-4">No projects found</p>
              <p className="text-sm">Check the browser console for details</p>
            </div>
          ) : (
            <>
              {/* Left Column - Even indices (0, 2, 4...) */}
              <div className="space-y-8">
                {projects.filter((_, index) => index % 2 === 0).map((project, index) => {
                  const actualIndex = index * 2;
                  const isVisible = actualIndex < visibleCount;
                  const imageUrl = project.featured_image || 
                                  project.thumbnail || 
                                  project.images?.[0] || 
                                  project.gallery_images?.[0] || 
                                  '';
                  
                  return (
                    <div
                      key={project.id}
                      className={`group cursor-pointer transition-all duration-700 ${ 
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                      }`}
                      onClick={() => onProjectClick?.(project.id)}
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden mb-6 bg-neutral-900 min-h-[300px]">
                        {isVisible && imageUrl ? (
                          <img 
                            src={imageUrl}
                            alt={project.featured_image_alt || project.title || 'Portfolio project'}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              console.error(`Failed to load image for ${project.title}:`, imageUrl);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : isVisible && !imageUrl ? (
                          <div className="w-full h-full flex items-center justify-center text-neutral-600">
                            No image available
                          </div>
                        ) : null}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>

                      {/* Project Info */}
                      <div className="space-y-2">
                        <h3 className="text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-[#7d8187] text-sm">
                          {project.excerpt || project.subtitle || project.description?.substring(0, 60) + '...'}
                        </p>
                        {/* Display results/outcomes if available */}
                        {project.results && (
                           <div className="mt-2 text-xs text-neutral-500 line-clamp-2">
                             {project.results.split('\n')[0].replace('• ', '')}
                           </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column - Odd indices (1, 3, 5...) */}
              <div className="space-y-8 ">
                {projects.filter((_, index) => index % 2 === 1).map((project, index) => {
                  const actualIndex = (index * 2) + 1;
                  const isVisible = actualIndex < visibleCount;
                  const imageUrl = project.featured_image || 
                                  project.thumbnail || 
                                  project.images?.[0] || 
                                  project.gallery_images?.[0] || 
                                  '';
                  
                  return (
                    <div
                      key={project.id}
                      className={`group cursor-pointer transition-all duration-700 ${ 
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                      }`}
                      onClick={() => onProjectClick?.(project.id)}
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden mb-6 bg-neutral-900 min-h-[300px]">
                        {isVisible && imageUrl ? (
                          <img 
                            src={imageUrl}
                            alt={project.featured_image_alt || project.title || 'Portfolio project'}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              console.error(`Failed to load image for ${project.title}:`, imageUrl);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : isVisible && !imageUrl ? (
                          <div className="w-full h-full flex items-center justify-center text-neutral-600">
                            No image available
                          </div>
                        ) : null}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>

                      {/* Project Info */}
                      <div className="space-y-2">
                        <h3 className="text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-[#7d8187] text-sm">
                          {project.excerpt || project.subtitle || project.description?.substring(0, 60) + '...'}
                        </p>
                        {/* Display results/outcomes if available */}
                        {project.results && (
                           <div className="mt-2 text-xs text-neutral-500 line-clamp-2">
                             {project.results.split('\n')[0].replace('• ', '')}
                           </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
