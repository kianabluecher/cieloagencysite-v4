import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Upload, X, Plus, ChevronLeft, ChevronRight, Grid3x3, List } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface ContentCalendarProps {
  onNavigate: (page: string) => void;
}

interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'failed';
  mediaUrls?: string[];
  createdAt: string;
}

const PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', color: '#0077B5' },
  { id: 'twitter', name: 'Twitter', color: '#1DA1F2' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
];

const LATER_API_KEY = 'sk_0dbff317b73610eac83990351c0f663255d0459a5186cb16e16b1bce65703799';

export function ContentCalendar({ onNavigate }: ContentCalendarProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStartsOn, setWeekStartsOn] = useState<'sun' | 'mon'>('sun');

  // Form state
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to view posts');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/content-calendar/posts`,
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
        setPosts(data.posts || []);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleCreatePost = async () => {
    if (!content.trim()) {
      toast.error('Please fill out this field.');
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      toast.error('Please select date and time');
      return;
    }

    setUploading(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to create posts');
        return;
      }

      // Upload media files if any
      let mediaUrls: string[] = [];
      if (uploadedFiles.length > 0) {
        // Here you would upload files to Supabase Storage or another service
        // For now, we'll skip actual upload and just store local URLs
        mediaUrls = uploadedFiles.map(f => URL.createObjectURL(f));
      }

      const postData = {
        content,
        platforms: selectedPlatforms,
        scheduledDate,
        scheduledTime,
        mediaUrls,
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/content-calendar/posts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        toast.success('Post scheduled successfully!');
        setShowCreateModal(false);
        resetForm();
        fetchPosts();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setContent('');
    setSelectedPlatforms([]);
    setScheduledDate('');
    setScheduledTime('');
    setUploadedFiles([]);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
    const todayDate = today.getDate();

    const days = [];
    const adjustedStartDay = weekStartsOn === 'mon' 
      ? (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1)
      : startingDayOfWeek;

    // Previous month's days
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = adjustedStartDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: isCurrentMonth && i === todayDate,
      });
    }

    // Next month's days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    const weekDays = weekStartsOn === 'sun' 
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-white font-medium">{monthName}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
            >
              Today
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 hover:bg-zinc-900 text-zinc-300 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 hover:bg-zinc-900 text-zinc-300 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>week starts on</span>
              <button
                onClick={() => setWeekStartsOn('sun')}
                className={`px-3 py-1 rounded ${weekStartsOn === 'sun' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-900/50 hover:bg-zinc-900'}`}
              >
                Sun
              </button>
              <button
                onClick={() => setWeekStartsOn('mon')}
                className={`px-3 py-1 rounded ${weekStartsOn === 'mon' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-900/50 hover:bg-zinc-900'}`}
              >
                Mon
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-zinc-800">
          {/* Week day headers */}
          {weekDays.map(day => (
            <div key={day} className="bg-zinc-950 p-4 text-center">
              <span className="text-sm text-zinc-500 font-medium">{day}</span>
            </div>
          ))}

          {/* Calendar days */}
          {days.map((dayInfo, index) => (
            <div
              key={index}
              className={`bg-zinc-950 min-h-[120px] p-3 ${
                dayInfo.isToday ? 'ring-2 ring-[#004CFF]' : ''
              } ${!dayInfo.isCurrentMonth ? 'opacity-40' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${dayInfo.isToday ? 'text-[#004CFF] font-bold' : 'text-zinc-300'}`}>
                  {dayInfo.day}
                </span>
              </div>
              {/* Posts for this day would go here */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(a.scheduledDate + ' ' + a.scheduledTime).getTime() - 
      new Date(b.scheduledDate + ' ' + b.scheduledTime).getTime()
    );

    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
        <div className="space-y-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-lg">No scheduled posts yet</p>
              <p className="text-zinc-500 text-sm mt-2">Create your first post to get started</p>
            </div>
          ) : (
            sortedPosts.map(post => (
              <div key={post.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-zinc-200 mb-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span>{new Date(post.scheduledDate).toLocaleDateString()}</span>
                      <span>{post.scheduledTime}</span>
                      <div className="flex items-center gap-2">
                        {post.platforms.map(platformId => {
                          const platform = PLATFORMS.find(p => p.id === platformId);
                          return platform ? (
                            <span
                              key={platformId}
                              className="px-2 py-1 rounded text-xs"
                              style={{ backgroundColor: platform.color + '20', color: platform.color }}
                            >
                              {platform.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                    post.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl text-white mb-2 tracking-tight">Content Calendar</h1>
            <p className="text-zinc-500">Manage your scheduled and published content</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 transition-colors border ${
                viewMode === 'calendar' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors border ${
                viewMode === 'list' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#C8B677] hover:bg-[#B8A667] text-black font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <select className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors">
            <option>All posts</option>
            <option>Scheduled</option>
            <option>Published</option>
            <option>Failed</option>
          </select>
          <select className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors">
            <option>All platforms</option>
            {PLATFORMS.map(platform => (
              <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
          </select>
          <select className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors">
            <option>All dates</option>
          </select>
          <button className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm flex items-center gap-2 hover:border-zinc-700 transition-colors">
            <CalendarIcon className="w-4 h-4" />
            Scheduled
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-zinc-500">Loading posts...</p>
        </div>
      ) : viewMode === 'calendar' ? (
        renderCalendar()
      ) : (
        renderListView()
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1C] border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl text-white">Create Post</h2>
                {!content.trim() && (
                  <p className="text-red-400 text-sm mt-1">⚠ Please fill out this field.</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                  Reuse
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Content */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="what's on your mind..."
                  className="w-full bg-[#0A0A0B] border border-white/20 rounded-xl p-4 text-white placeholder-white/40 min-h-[120px] focus:outline-none focus:border-[#00D9FF] transition-colors resize-none"
                />
                <div className="text-right text-white/40 text-sm mt-1">
                  {content.length} chars
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">media (optional)</label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-white/60" />
                    </div>
                    <p className="text-white font-medium mb-1">upload media</p>
                    <p className="text-white/40 text-sm">
                      images/videos/PDFs up to 5GB each (LinkedIn PDFs ≤ 100MB)
                    </p>
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <span className="text-white text-sm truncate flex-1">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-white/60 hover:text-white ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profiles */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">profiles</label>
                <p className="text-white/40 text-sm mb-3">
                  Select one or more profiles to post to their connected accounts
                </p>
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#C8B677] rounded-full flex items-center justify-center text-black font-bold">
                        C
                      </div>
                      <span className="text-white">X CIELO Agency</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-white/40 rotate-[-90deg]" />
                  </div>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">platforms (from 1 profile)</label>
                <div className="space-y-2">
                  <div className="text-white/60 text-sm mb-2">groups</div>
                  <div className="text-white/40 text-sm">no groups yet</div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {PLATFORMS.map(platform => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedPlatforms.includes(platform.id)
                            ? 'border-[#00D9FF] bg-[#00D9FF]/10'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: platform.color }}
                          >
                            {platform.name[0]}
                          </div>
                          <span className="text-white">{platform.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={uploading}
                className="px-6 py-3 bg-[#C8B677] hover:bg-[#B8A667] text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Scheduling...' : 'schedule post ⌘↵'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}