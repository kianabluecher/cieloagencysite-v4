import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  ClipboardList,
  Palette,
  Mail,
  Users,
  LogOut,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Eye,
  MessageSquare,
  Filter,
  Search,
  MoreVertical,
  ExternalLink,
  UserPlus,
  Activity,
  Shield,
  Calendar
} from 'lucide-react';
import { auth, profiles } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ActivityLog } from './dashboard/ActivityLog';
import { TeamManagement } from './dashboard/TeamManagement';

interface TeamDashboardUnifiedProps {
  onNavigate: (page: string) => void;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface DashboardStats {
  users: { total: number; new: number; active: number };
  jobs: { total: number; open: number; closed: number };
  portfolio: { total: number; published: number };
  discovery: { total: number; new: number; contacted: number; qualified: number; converted: number };
  brandAudits: { total: number; pending: number; completed: number };
}

interface SignupUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  created_at: string;
  user_email?: string;
}

export function TeamDashboardUnified({ onNavigate }: TeamDashboardUnifiedProps) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data states
  const [latestSignups, setLatestSignups] = useState<SignupUser[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  
  // Legacy/Existing states
  const [discoverySubmissions, setDiscoverySubmissions] = useState<any[]>([]);
  const [brandAuditSubmissions, setBrandAuditSubmissions] = useState<any[]>([]);
  
  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    checkAuth();
    setupAuthListener();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const setupAuthListener = () => {
    const { data: authListener } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        onNavigate('team-login');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  };

  const checkAuth = async () => {
    try {
      const { data: { user: currentUser }, error } = await auth.getUser();
      
      if (error || !currentUser) {
        onNavigate('team-login');
        return;
      }
      
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      onNavigate('team-login');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await profiles.getProfile(user.id);
    if (data) setProfile(data);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${publicAnonKey}` };
      
      // 1. Overview Stats
      const statsRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dashboard/overview`, { headers });
      if (statsRes.ok) {
        const { stats: data } = await statsRes.json();
        setStats(data);
      }

      // 2. Admin Specific Data
      if (profile?.role === 'admin') {
        const signupsRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dashboard/latest-signups`, { headers });
        if (signupsRes.ok) {
          const { users } = await signupsRes.json();
          setLatestSignups(users || []);
        }

        const activityRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dashboard/activity`, { headers });
        if (activityRes.ok) {
          const { activities } = await activityRes.json();
          setActivities(activities || []);
        }
        
        const jobsRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dashboard/jobs`, { headers });
        if (jobsRes.ok) {
          const { jobs } = await jobsRes.json();
          setRecentJobs(jobs || []);
        }
      }

      // 3. Fetch existing data for tabs
      // ... (keeping existing fetches for discovery/audits if needed)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    onNavigate('team-login');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleInvite = () => {
    // Ideally this would open a modal or navigate to user management with intent
    onNavigate('user-management');
  };

  const handleManageRole = (userId: string, role: string) => {
    // Placeholder for role management
    console.log('Manage role', userId, role);
  };

  if (loading) {
    return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold tracking-tighter">CIELO</div>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/60">
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">Team Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User size={14} />
              </div>
              <div className="flex flex-col items-end leading-none">
                <span className="text-white font-medium">{profile?.full_name || user?.email}</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">{profile?.role || 'Team'}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white/60 hover:text-white hover:bg-white/10">
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            {/* KPI Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users size={20} /></div>
                    <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20">Total Users</Badge>
                  </div>
                  <div className="text-3xl font-semibold">{stats.users.total}</div>
                  <div className="text-sm text-white/40 mt-1">Registered accounts</div>
                </div>

                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><UserPlus size={20} /></div>
                    <Badge variant="outline" className="bg-green-500/5 text-green-400 border-green-500/20">Last 30 Days</Badge>
                  </div>
                  <div className="text-3xl font-semibold">{stats.users.new}</div>
                  <div className="text-sm text-white/40 mt-1">New signups</div>
                </div>

                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Activity size={20} /></div>
                    <Badge variant="outline" className="bg-purple-500/5 text-purple-400 border-purple-500/20">Active Today</Badge>
                  </div>
                  <div className="text-3xl font-semibold">{stats.users.active}</div>
                  <div className="text-sm text-white/40 mt-1">Users online</div>
                </div>

                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Briefcase size={20} /></div>
                    <Badge variant="outline" className="bg-orange-500/5 text-orange-400 border-orange-500/20">Open Jobs</Badge>
                  </div>
                  <div className="text-3xl font-semibold">{stats.jobs.open}</div>
                  <div className="text-sm text-white/40 mt-1">Active listings</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Latest Signups Table */}
              <div className="lg:col-span-2 bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserPlus size={18} className="text-green-400" />
                    Latest Signups
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('user-management')} className="text-xs">View All</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-white/40 uppercase bg-white/5">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Signed Up</th>
                        <th className="px-6 py-3">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {latestSignups.length > 0 ? latestSignups.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium">{user.full_name}</div>
                            <div className="text-xs text-white/40">{user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-white/10 text-white/60 border border-white/10'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white/60">{formatDate(user.created_at)}</td>
                          <td className="px-6 py-4 text-white/60">{user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-white/40">No recent signups</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity size={18} className="text-blue-400" />
                    Recent Activity
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[400px] p-6 space-y-6">
                  {activities.length > 0 ? activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {idx !== activities.length - 1 && (
                        <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-white/10"></div>
                      )}
                      <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center mt-1 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                      <div>
                        <p className="text-sm text-white/90">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                          <Clock size={10} />
                          <span>{formatDate(activity.created_at)}</span>
                          {activity.user_email && (
                            <>
                              <span>•</span>
                              <span>{activity.user_email}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center text-white/40 py-4">No recent activity</div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* JOBS TAB */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Jobs Management</h2>
                  <p className="text-white/60 text-sm">Manage job listings and applications</p>
                </div>
                {isAdmin && (
                  <Button onClick={() => onNavigate('jobs-admin')} className="bg-white text-black hover:bg-white/90">
                    <Briefcase size={16} className="mr-2" />
                    Go to Jobs Admin
                  </Button>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-white/40 uppercase bg-white/5">
                    <tr>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Created</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium">{job.title}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={job.status === 'open' ? 'text-green-400 border-green-400/20 bg-green-400/10' : 'text-white/40'}>
                            {job.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-white/60">{formatDate(job.created_at)}</td>
                        <td className="px-6 py-4">
                          {isAdmin && (
                            <Button variant="ghost" size="sm" onClick={() => onNavigate(`jobs-admin`)}>Edit</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6">
            <TeamManagement 
              users={latestSignups} 
              onInvite={handleInvite}
              onManageRole={handleManageRole}
            />
          </TabsContent>

          {/* ACTIVITY TAB */}
          <TabsContent value="activity">
            <ActivityLog 
              activities={activities}
              stats={{
                signIns: stats?.users.active || 0,
                activeUsers: stats?.users.active || 0,
                tasksViewed: 0
              }}
            />
          </TabsContent>

          {/* DISCOVERY TAB */}
          <TabsContent value="discovery">
             <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center py-12">
                <ClipboardList size={32} className="text-white/20 mb-4" />
                <h3 className="text-lg font-medium">Discovery Submissions</h3>
                <p className="text-white/40 mb-6">Manage discovery leads and forms.</p>
                <Button variant="outline" onClick={() => onNavigate('discovery')}>
                  Go to Discovery Dashboard
                </Button>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
