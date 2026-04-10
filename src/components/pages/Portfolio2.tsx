import { useState, useEffect } from 'react';
import { getAllProjects, type Project } from '../../utils/portfolio-api';
import { Loader2 } from 'lucide-react';

interface Portfolio2Props {
  onNavigate: (page: string, projectId?: string) => void;
}

export function Portfolio2({ onNavigate }: Portfolio2Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects();
        // Sort by date if available, or just use as is. 
        // Filter for published projects
        const published = data?.filter(p => p.published) || [];
        setProjects(published);
      } catch (e) {
        console.error('Failed to load projects', e);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Define specific industries for filter tabs
  const industries = [
    'All',
    'Financial Services',
    'B2B Saas',
    'Innovation / Tech',
    'Wellness / Lifestyle',
    'Hospitality',
    'Professional Services'
  ];

  // Filter projects based on selected industry
  const filteredProjects = selectedIndustry === 'All' 
    ? projects 
    : projects.filter(p => p.industry === selectedIndustry);

  const handleProjectClick = (project: Project) => {
    // Use slug if available, otherwise id
    onNavigate('portfolio-detail', project.slug || project.id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen pt-20">
          <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        </div>
      ) : (
        <>
          {/* Filter Buttons */}
          <div className="w-full px-[5%] pt-40 pb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-6 py-2.5 rounded-full text-sm font-light tracking-wide transition-all duration-300 whitespace-nowrap ${
                    selectedIndustry === industry
                      ? 'bg-white text-black'
                      : 'border border-white/30 text-white hover:bg-white hover:text-black'
                  }`}
                  style={{ fontFamily: "'Archivo', 'Helvetica Neue', 'Helvetica', -apple-system, sans-serif" }}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="w-full px-[5%] pb-20">
            <div className="columns-1 md:columns-2 gap-x-12 space-y-16">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => handleProjectClick(project)}
                  className="group cursor-pointer block break-inside-avoid"
                >
                  {/* Image Container - Natural aspect ratio */}
                  <div className="w-full bg-zinc-900 overflow-hidden mb-6 relative">
                    {project.featured_image ? (
                      <img 
                        src={project.featured_image} 
                        alt={project.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full aspect-[16/10] flex items-center justify-center text-zinc-700">
                        No Image
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 
                          className="text-2xl md:text-3xl font-light tracking-tight text-white group-hover:text-gray-300 transition-colors"
                          style={{ fontFamily: "'Archivo', 'Helvetica Neue', 'Helvetica', -apple-system, sans-serif" }}
                        >
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Service Tags - Two Buttons */}
                      <div className="flex items-center gap-2">
                        {/* Industry Button - White Background */}
                        {project.industry && (
                          <button className="px-3 py-1 bg-white rounded-full text-black text-[6.5px] tracking-wide font-['Geist_Mono'] hover:bg-gray-200 transition-all duration-300 whitespace-nowrap border-[1.5px] border-white">
                            {project.industry}
                          </button>
                        )}
                        
                        {/* Service Tag - Border Only */}
                        {(project.category || project.project_type) && (
                          <button className="px-3 py-1 border-[1.5px] border-white/30 rounded-full text-white text-[6.5px] tracking-wide font-['Geist_Mono'] hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap">
                            {project.category || project.project_type}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-500">No projects found.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}