import { useState } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  Calendar,
  Tag,
  Phone,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Submission {
  id: string;
  type?: string;
  name?: string;
  email?: string;
  company_name?: string;
  services?: string[];
  goal?: string;
  submitted_at?: string;
  submittedAt?: string;
  businessName?: string;
  industry?: string;
  primaryGoal?: string;
  brandName?: string;
  websiteUrl?: string;
}

interface CRMClientsViewProps {
  submissions: Submission[];
  onClientClick: (submission: Submission) => void;
}

export function CRMClientsView({ submissions, onClientClick }: CRMClientsViewProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSubmissionName = (submission: Submission) => {
    return submission.name || submission.businessName || submission.brandName || 'Unknown';
  };

  const getSubmissionEmail = (submission: Submission) => {
    return submission.email || 'No email';
  };

  const getSubmissionDate = (submission: Submission) => {
    return submission.submitted_at || submission.submittedAt || '';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatSubmissionType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'lets-talk': "Let's Talk",
      'rapid-delivery-signup': 'Rapid Delivery',
      'brand-web-download': 'Brand Web',
      'social-media-pricing-download': 'Social Media',
      'discovery': 'Discovery',
      'brand-audit': 'Brand Audit',
    };
    return typeMap[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'lets-talk': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      'rapid-delivery-signup': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      'brand-web-download': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      'social-media-pricing-download': 'bg-pink-500/20 text-pink-400 border-pink-500/40',
      'discovery': 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      'brand-audit': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    };
    return colorMap[type] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40';
  };

  const avatarColors = [
    'from-cyan-600 to-blue-600',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-blue-600 to-indigo-600',
    'from-pink-600 to-rose-600',
  ];

  const getAvatarColor = (id: string) => {
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {submissions.map((submission) => {
        const name = getSubmissionName(submission);
        const email = getSubmissionEmail(submission);
        const company = submission.company_name || submission.businessName || '';
        const date = getSubmissionDate(submission);
        const type = submission.type || '';

        return (
          <div
            key={submission.id}
            onMouseEnter={() => setHoveredCard(submission.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onClientClick(submission)}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer group"
          >
            {/* Header with Avatar and Actions */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getAvatarColor(submission.id)} flex items-center justify-center text-white shadow-lg`}>
                  {getInitials(name)}
                </div>
                <div>
                  <h3 className="text-white truncate max-w-[150px] mb-1">{name}</h3>
                  {company && (
                    <p className="text-xs text-zinc-500 truncate max-w-[150px]">{company}</p>
                  )}
                </div>
              </div>
              
              {hoveredCard === submission.id && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical size={16} className="text-zinc-500" />
                </button>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-zinc-600" />
                <span className="text-zinc-400 truncate">{email}</span>
              </div>
              
              {company && (
                <div className="flex items-center gap-2 text-sm">
                  <Building size={14} className="text-zinc-600" />
                  <span className="text-zinc-400 truncate">{company}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-zinc-600" />
                <span className="text-zinc-400">{formatDate(date)}</span>
              </div>
            </div>

            {/* Type Badge */}
            {type && (
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border ${getTypeColor(type)}`}>
                  <Tag size={12} />
                  {formatSubmissionType(type)}
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClientClick(submission);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm opacity-0 group-hover:opacity-100 transition-all"
                >
                  View →
                </button>
              </div>
            )}

            {/* Services/Goals */}
            {submission.services && submission.services.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {submission.services.slice(0, 2).map((service, idx) => (
                    <span key={idx} className="text-xs bg-black/20 border border-white/5 px-2.5 py-1 rounded-lg text-zinc-400">
                      {service}
                    </span>
                  ))}
                  {submission.services.length > 2 && (
                    <span className="text-xs text-zinc-600">+{submission.services.length - 2}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}