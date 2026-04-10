import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getProject, type Project } from '../../utils/portfolio-api';
import { Header } from '../Header';

interface PortfolioDetailProps {
  projectId?: string;
  onNavigate?: (page: string) => void;
}

export function PortfolioDetail({ projectId: propProjectId = 'ai-insiders', onNavigate }: PortfolioDetailProps) {
  const { projectId: urlProjectId } = useParams<{ projectId: string }>();
  const projectId = urlProjectId || propProjectId;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const fetchedProject = await getProject(projectId);
        setProject(fetchedProject);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header onNavigate={onNavigate} />
        <div className="flex items-center justify-center pt-32">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header onNavigate={onNavigate} />
        <div className="px-4 pt-32 pb-12">
          <button
            onClick={() => onNavigate?.('portfolio')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase">Back to Portfolio</span>
          </button>
        </div>
        <div className="px-4 text-center">
          <h1 className="text-4xl text-white mb-4">Project not found</h1>
          <p className="text-white/60">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Get images
  const getProjectImages = () => {
    if (project.gallery_images && project.gallery_images.length > 0) {
      return project.gallery_images.map((url, idx) => ({ url, alt: `${project.title} - Image ${idx + 1}` }));
    }
    
    if (project.media && project.media.length > 0) {
      return project.media;
    }
    
    if (project.images && project.images.length > 0) {
      return project.images.map((url, idx) => ({ url, alt: `${project.title} - Image ${idx + 1}` }));
    }
    
    return [];
  };

  const displayImages = getProjectImages();
  const heroImage = displayImages.length > 0 ? displayImages[0] : null;
  const galleryImages = displayImages.slice(1); // Rest of the images

  // Parse deliverables/what we did
  const getDeliverables = () => {
    // First check if we have the new what_we_did field
    if (project.what_we_did) {
      return parseWhatWeDid(project.what_we_did);
    }
    // Fallback to solution field
    if (!project.solution) return [];
    const lines = project.solution.split('\n').filter(line => line.trim());
    return lines;
  };

  // Parse the what_we_did field into structured sections
  const parseWhatWeDid = (content: string) => {
    const sections: { title: string; items: string[] }[] = [];
    const lines = content.split('\n');
    let currentSection: { title: string; items: string[] } | null = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Check if line is a section header (doesn't start with - or •)
      if (!trimmed.startsWith('-') && !trimmed.startsWith('•')) {
        // Save previous section if exists
        if (currentSection && currentSection.items.length > 0) {
          sections.push(currentSection);
        }
        // Start new section
        currentSection = { title: trimmed, items: [] };
      } else if (currentSection) {
        // Add bullet point to current section
        const item = trimmed.replace(/^[•\-*]\s*/, '');
        if (item) {
          currentSection.items.push(item);
        }
      }
    }

    // Add the last section
    if (currentSection && currentSection.items.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  const deliverables = getDeliverables();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Header - Transparent to show image behind */}
      <Header onNavigate={onNavigate} currentPage="portfolio" isSubServicePage={true} />
      
      {/* Hero Section - Full Height with Image Background & Title Overlay */}
      <div className="relative w-full h-[70vh] min-h-[500px] flex flex-col justify-end pb-16 lg:pb-24">
        {/* Background Image - All way to top */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={typeof heroImage === 'string' ? heroImage : heroImage.url}
              alt={typeof heroImage === 'string' ? `${project.title}` : heroImage.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlays for readability */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 px-4 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => onNavigate?.('portfolio')}
              className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase">Back to Portfolio</span>
            </button>

            {/* Large Title - Above (on top of) image */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] tracking-tight mb-4">
              {project.title}
            </h1>
            
            {/* Optional: Short Project Type or Subtitle here if desired, keeping it minimal for now */}
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="px-4 pb-20 pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column - Project Details */}
            <div className="lg:col-span-4 space-y-8">
              {/* Client */}
              <div>
                <p className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase text-white mb-2">
                  CLIENT
                </p>
                <p className="text-white text-sm">
                  {project.client_name || project.client || project.category || 'Business'}
                </p>
              </div>

              {/* Date/Year */}
              <div>
                <p className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase text-white mb-2">
                  DATE
                </p>
                <p className="text-white text-sm">
                  {project.completion_date ? new Date(project.completion_date).getFullYear() : project.date || '2024'}
                </p>
              </div>

              {/* Type of Client */}
              <div>
                <p className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase text-white mb-2">
                  TYPE OF CLIENT
                </p>
                <p className="text-white text-sm">
                  {project.category || project.clientType || 'Business'}
                </p>
              </div>

              {/* Project Type */}
              <div>
                <p className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase text-white mb-2">
                  SERVICES
                </p>
                <p className="text-white text-sm">
                  {project.project_type || project.projectType || 'Brand Strategy & Visual Identity'}
                </p>
              </div>

              {/* Live Site Button */}
              {project.live_url && (
                <div className="pt-2">
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors group/btn"
                  >
                    <span className="font-['Geist_Mono'] text-xs tracking-[1.5px] uppercase">
                      View Live Site
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </div>
              )}

              {/* Custom Link Button */}
              {project.custom_link_url && project.custom_link_label && (
                <div className="pt-2">
                  <a
                    href={project.custom_link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors group/btn"
                  >
                    <span className="font-['Geist_Mono'] text-xs tracking-[1.5px] uppercase">
                      {project.custom_link_label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </div>
              )}
            </div>

            {/* Right Column - Description & What We Did */}
            <div className="lg:col-span-8 space-y-10">
              {/* Introduction */}
              <div>
                <p className="text-white text-base leading-relaxed">
                  {project.description || project.excerpt || `A complete brand strategy and visual identity project for ${project.title}. We created a sophisticated brand that communicates trust, expertise, and cultural understanding.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery - Remaining Images */}
      {galleryImages.length > 0 && (
        <div className="w-full px-2 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {galleryImages.map((media, index) => (
              <div 
                key={index} 
                className="w-full overflow-hidden"
              >
                <img
                  src={typeof media === 'string' ? media : media.url}
                  alt={typeof media === 'string' ? `${project.title} - Image ${index + 2}` : media.alt}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/10">
          <button
            onClick={() => onNavigate?.('portfolio')}
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase">
              View All Projects
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}