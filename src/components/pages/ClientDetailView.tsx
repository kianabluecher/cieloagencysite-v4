import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail,
  Phone,
  Building,
  Tag,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Save,
  Briefcase,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Activity as ActivityIcon,
  CreditCard,
  Pencil,
  Video,
  Paperclip,
  Upload
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ClientDetailViewProps {
  submission: any;
  onBack: () => void;
}

type TabType = 'overview' | 'billing' | 'comments' | 'activity';

export function ClientDetailView({ submission, onBack }: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [notes, setNotes] = useState('');
  const [contactDetails, setContactDetails] = useState({
    jobTitle: '',
    department: '',
    location: '',
    website: '',
    linkedin: '',
    twitter: '',
    secondaryEmail: '',
    secondaryPhone: '',
  });

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'closed':
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const saveNotes = () => {
    // TODO: Save to backend
    toast.success('Notes saved successfully');
  };

  const saveContactDetails = () => {
    // TODO: Save to backend
    toast.success('Contact details saved successfully');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group mb-6"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Clients
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-2xl shadow-cyan-500/20">
                {getInitials(submission.name)}
              </div>
              <div>
                <h1 className="text-3xl text-white mb-2">{submission.name}</h1>
                <p className="text-sm text-zinc-400">{submission.email}</p>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-xl border text-sm ${getStatusColor(submission.status || 'pending')}`}>
              {submission.status || 'pending'}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === 'overview'
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <User size={16} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === 'billing'
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <CreditCard size={16} />
              Billing
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === 'comments'
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <MessageSquare size={16} />
              Comments (0)
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === 'activity'
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <ActivityIcon size={16} />
              Activity
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Client Information */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-zinc-400" />
                    <h2 className="text-lg text-white">Client Information</h2>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Pencil size={16} className="text-zinc-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Name</label>
                    <p className="text-white">{submission.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Email</label>
                    <p className="text-white">{submission.email}</p>
                  </div>
                  
                  {submission.company && (
                    <div>
                      <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Company</label>
                      <p className="text-white">{submission.company}</p>
                    </div>
                  )}
                  
                  {submission.createdAt && (
                    <div>
                      <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Joined</label>
                      <div className="flex items-center gap-2 text-white">
                        {formatDate(submission.createdAt)}
                      </div>
                    </div>
                  )}
                </div>

                {submission.projectDetails && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Project Details</label>
                    <p className="text-zinc-300 leading-relaxed text-sm">{submission.projectDetails}</p>
                  </div>
                )}
              </div>

              {/* Contact Profile */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className="text-zinc-400" />
                    <h2 className="text-lg text-white">Contact Profile</h2>
                  </div>
                  <button
                    onClick={saveContactDetails}
                    className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 text-xs rounded-lg transition-all"
                  >
                    Save
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Job Title</label>
                    <input
                      type="text"
                      value={contactDetails.jobTitle}
                      onChange={(e) => setContactDetails({ ...contactDetails, jobTitle: e.target.value })}
                      placeholder="e.g. Marketing Director"
                      className="w-full px-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Department</label>
                    <input
                      type="text"
                      value={contactDetails.department}
                      onChange={(e) => setContactDetails({ ...contactDetails, department: e.target.value })}
                      placeholder="e.g. Marketing"
                      className="w-full px-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                      <input
                        type="text"
                        value={contactDetails.location}
                        onChange={(e) => setContactDetails({ ...contactDetails, location: e.target.value })}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full pl-11 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Website</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                      <input
                        type="url"
                        value={contactDetails.website}
                        onChange={(e) => setContactDetails({ ...contactDetails, website: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full pl-11 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">LinkedIn</label>
                      <div className="relative">
                        <Linkedin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input
                          type="url"
                          value={contactDetails.linkedin}
                          onChange={(e) => setContactDetails({ ...contactDetails, linkedin: e.target.value })}
                          placeholder="linkedin.com/in/"
                          className="w-full pl-11 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Twitter</label>
                      <div className="relative">
                        <Twitter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input
                          type="text"
                          value={contactDetails.twitter}
                          onChange={(e) => setContactDetails({ ...contactDetails, twitter: e.target.value })}
                          placeholder="@username"
                          className="w-full pl-11 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <Tag size={18} className="text-zinc-400" />
                  <h2 className="text-lg text-white">Services</h2>
                </div>

                {submission.service ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl text-sm">
                    <Tag size={14} />
                    {submission.service}
                  </div>
                ) : (
                  <p className="text-center text-zinc-500 py-8">No active services</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recordings */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Video size={18} className="text-zinc-400" />
                    <h2 className="text-lg text-white">Recordings</h2>
                  </div>
                  <button className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 text-xs rounded-lg transition-all">
                    Log Call
                  </button>
                </div>

                <div className="text-center py-12">
                  <p className="text-zinc-500">No recordings available</p>
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <Paperclip size={18} className="text-zinc-400" />
                  <h2 className="text-lg text-white">Attachments</h2>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-all cursor-pointer group">
                  <Upload size={32} className="mx-auto mb-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  <p className="text-sm text-zinc-400">Drop files here or click to upload</p>
                </div>

                {/* Example attachment */}
                <div className="mt-4 flex items-center justify-between p-3 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                      <FileText size={18} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">Screenshot 2025-11-04 at 3.27.40 PM.png</p>
                      <p className="text-xs text-zinc-500">0.14 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <FileText size={16} className="text-zinc-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={18} className="text-zinc-400" />
                    <h2 className="text-lg text-white">Notes</h2>
                  </div>
                  <button
                    onClick={saveNotes}
                    className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 text-xs rounded-lg transition-all"
                  >
                    Save
                  </button>
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this client..."
                  rows={6}
                  className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 resize-none transition-all"
                />
                <p className="text-xs text-zinc-500 mt-3">
                  Notes are private and only visible to your team
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-12 text-center">
            <CreditCard size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-zinc-500">No billing information available</p>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-zinc-500">No comments yet</p>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <ActivityIcon size={18} className="text-zinc-400" />
              <h2 className="text-lg text-white">Activity Timeline</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-white mb-1">Client added to system</p>
                  <p className="text-xs text-zinc-500">{formatDate(submission.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
