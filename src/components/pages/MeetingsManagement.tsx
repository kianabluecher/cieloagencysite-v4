import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { 
  Video,
  Users,
  Clock,
  Calendar,
  Search,
  RefreshCw,
  PlayCircle,
  FileText,
  ListChecks,
  ExternalLink,
  Download,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  participantCount: number;
  participants: any[];
  recordingUrl?: string;
  transcriptUrl?: string;
  summaryUrl?: string;
  platform?: string;
  status?: string;
  createdAt?: string;
}

interface MeetingDetail extends Meeting {
  summary?: string;
  transcript?: any;
  actionItems?: any[];
  highlights?: any[];
}

interface MeetingsManagementProps {
  onNavigate: (page: string) => void;
}

export function MeetingsManagement({ onNavigate }: MeetingsManagementProps) {
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in');
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/fathom/meetings`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setMeetings(data.meetings || []);
        
        // Show warning if Fathom API is unreachable
        if (data.warning) {
          toast.warning('Fathom API unavailable - showing cached data');
          console.warn('Fathom API warning:', data.warning);
        } else {
          toast.success(`Loaded ${data.meetings?.length || 0} meetings`);
        }
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to fetch meetings');
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  const fetchMeetingDetails = async (meetingId: string) => {
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/fathom/meetings/${meetingId}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedMeeting(data.meeting);
      } else {
        toast.error('Failed to fetch meeting details');
      }
    } catch (error) {
      console.error('Error fetching meeting details:', error);
      toast.error('Failed to fetch meeting details');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchMeetings();
      return;
    }

    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/fathom/search?q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setMeetings(data.meetings || []);
        toast.success(`Found ${data.meetings?.length || 0} meetings`);
      }
    } catch (error) {
      console.error('Error searching meetings:', error);
      toast.error('Failed to search meetings');
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const toggleExpand = (meetingId: string) => {
    if (expandedMeeting === meetingId) {
      setExpandedMeeting(null);
      setSelectedMeeting(null);
    } else {
      setExpandedMeeting(meetingId);
      fetchMeetingDetails(meetingId);
    }
  };

  const testFathomConnection = async () => {
    setTestingConnection(true);
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('❌ Not signed in. Please sign in as admin first.');
        return;
      }

      console.log('Testing Fathom connection with session:', session.user?.email);

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/fathom/test`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      console.log('Fathom test response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Fathom test response data:', data);
        if (data.success) {
          toast.success(`✅ Connected! ${data.callsAvailable} calls available`);
        } else {
          toast.error(`❌ ${data.error || 'Connection failed'}`);
        }
      } else {
        const errorText = await response.text();
        console.error('Fathom test error response:', errorText);
        try {
          const error = JSON.parse(errorText);
          toast.error(`❌ ${error.error || 'Connection failed'}`);
        } catch {
          toast.error(`❌ Connection failed (${response.status}): ${errorText}`);
        }
      }
    } catch (error: any) {
      console.error('Error testing Fathom connection:', error);
      toast.error(`❌ Network error: ${error.message || 'Failed to connect to server'}`);
    } finally {
      setTestingConnection(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading meetings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1 flex items-center gap-2">
            <Video className="w-6 h-6" />
            Meetings from Fathom
          </h1>
          <p className="text-zinc-400 text-sm">
            View recordings, transcripts, and AI summaries
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={testFathomConnection}
            disabled={testingConnection}
            variant="outline"
            size="sm"
            className="bg-green-600 border-green-700 hover:bg-green-700 text-white"
          >
            {testingConnection ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                Testing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Test API
              </>
            )}
          </Button>
          <Button
            onClick={fetchMeetings}
            variant="outline"
            size="sm"
            className="bg-zinc-800 border-zinc-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search meetings by title, participants, or content..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Search
          </Button>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="bg-zinc-800 border-zinc-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Video className="w-5 h-5 text-purple-400" />
            <span className="text-2xl text-white">{meetings.length}</span>
          </div>
          <p className="text-sm text-purple-200">Total Meetings</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-2xl text-white">
              {meetings.reduce((acc, m) => acc + (m.participantCount || 0), 0)}
            </span>
          </div>
          <p className="text-sm text-blue-200">Participants</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-2xl text-white">
              {formatDuration(meetings.reduce((acc, m) => acc + (m.duration || 0), 0))}
            </span>
          </div>
          <p className="text-sm text-green-200">Total Duration</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-2xl text-white">
              {meetings.filter(m => m.summaryUrl).length}
            </span>
          </div>
          <p className="text-sm text-orange-200">With AI Summary</p>
        </div>
      </div>

      {/* Meetings List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <h3 className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Meetings ({meetings.length})
          </h3>
        </div>

        {meetings.length === 0 ? (
          <div className="p-12 text-center">
            <Video className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 mb-2">No meetings found</p>
            <p className="text-sm text-zinc-500">
              Your Fathom meetings will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="hover:bg-zinc-800/50 transition-colors">
                {/* Meeting Row */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleExpand(meeting.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white">{meeting.title}</h4>
                        {meeting.platform && (
                          <span className="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
                            {meeting.platform}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(meeting.startTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDuration(meeting.duration)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {meeting.participantCount} participants
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {meeting.recordingUrl && (
                        <a
                          href={meeting.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                          title="View Recording"
                        >
                          <PlayCircle className="w-4 h-4 text-blue-400" />
                        </a>
                      )}
                      {expandedMeeting === meeting.id ? (
                        <ChevronUp className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedMeeting === meeting.id && selectedMeeting && (
                  <div className="p-4 bg-zinc-800/30 border-t border-zinc-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Participants */}
                      <div className="bg-zinc-900 rounded-lg p-4">
                        <h5 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Participants
                        </h5>
                        <div className="space-y-2">
                          {selectedMeeting.participants?.map((participant: any, idx: number) => (
                            <div key={idx} className="text-sm text-zinc-400">
                              {participant.name || participant.email || 'Unknown'}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="bg-zinc-900 rounded-lg p-4">
                        <h5 className="text-white text-sm font-medium mb-3">Quick Actions</h5>
                        <div className="space-y-2">
                          {selectedMeeting.transcriptUrl && (
                            <a
                              href={selectedMeeting.transcriptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              View Transcript
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {selectedMeeting.summaryUrl && (
                            <a
                              href={selectedMeeting.summaryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                            >
                              <Sparkles className="w-4 h-4" />
                              View AI Summary
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {selectedMeeting.recordingUrl && (
                            <a
                              href={selectedMeeting.recordingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Watch Recording
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Items */}
                    {selectedMeeting.actionItems && selectedMeeting.actionItems.length > 0 && (
                      <div className="mt-4 bg-zinc-900 rounded-lg p-4">
                        <h5 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                          <ListChecks className="w-4 h-4" />
                          Action Items
                        </h5>
                        <ul className="space-y-2">
                          {selectedMeeting.actionItems.map((item: any, idx: number) => (
                            <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{item.text || item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Summary */}
                    {selectedMeeting.summary && (
                      <div className="mt-4 bg-zinc-900 rounded-lg p-4">
                        <h5 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          AI Summary
                        </h5>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {selectedMeeting.summary}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}