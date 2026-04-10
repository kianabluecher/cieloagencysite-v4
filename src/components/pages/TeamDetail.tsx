import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Linkedin, Twitter, Globe } from 'lucide-react';
import { getTeamMember, type TeamMember } from '../../utils/team-api';
import { Header } from '../Header';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TeamDetailProps {
  onNavigate: (page: string) => void;
}

export function TeamDetail({ onNavigate }: TeamDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadMember(slug);
    }
  }, [slug]);

  const loadMember = async (idOrSlug: string) => {
    setLoading(true);
    const data = await getTeamMember(idOrSlug);
    setMember(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
        <Header onNavigate={onNavigate} currentPage="about" />
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
        <Header onNavigate={onNavigate} currentPage="about" />
        <div className="px-4 pt-32 pb-12">
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase">Back to Team</span>
          </button>
        </div>
        <div className="px-4 text-center">
          <h1 className="text-4xl text-white mb-4">Team Member not found</h1>
          <p className="text-white/60">The team member you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
      <Header onNavigate={onNavigate} currentPage="about" />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => onNavigate('about')}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-['Geist_Mono'] text-xs tracking-[2px] uppercase">Back to Team</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Image Column */}
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 sticky top-32">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
                  {member.name}
                </h1>
                <p className="font-['Geist_Mono'] text-zinc-400 text-sm tracking-[2px] uppercase">
                  {member.role}
                </p>
              </div>

              {/* Social Links */}
              {member.social_links && (
                <div className="flex gap-4">
                  {member.social_links.linkedin && (
                    <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social_links.twitter && (
                    <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social_links.website && (
                    <a href={member.social_links.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}

              {/* Bio */}
              <div className="prose prose-invert prose-lg max-w-none">
                 <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed text-lg">
                    {member.bio || member.short_bio}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
