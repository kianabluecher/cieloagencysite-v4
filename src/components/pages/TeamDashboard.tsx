import { useState, useEffect } from 'react';
import { 
  LogOut, 
  User, 
  Briefcase,
  FileText,
  Image,
  Settings,
  BarChart3,
  Users,
  Folder
} from 'lucide-react';
import { auth, profiles } from '../../utils/supabase/client';
import { toast } from 'sonner';

interface TeamDashboardProps {
  onNavigate: (page: string) => void;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export function TeamDashboard({ onNavigate }: TeamDashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    setupAuthListener();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
      setLoading(false);
    }
  }, [user]);

  const setupAuthListener = () => {
    const { data: authListener } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        onNavigate('team-login');
      }
    });
  };

  const checkAuth = async () => {
    try {
      const { data } = await auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      } else {
        toast.error('Please log in to access the dashboard');
        onNavigate('team-login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      onNavigate('team-login');
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await profiles.getProfile(user.id);
    if (data) {
      setProfile(data);
    } else {
      // Fallback to user metadata if profile record doesn't exist
      setProfile({
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || user.email || 'Team Member',
        role: user.user_metadata?.role || 'team'
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success('Signed out successfully');
      onNavigate('team-login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const adminPages = [
    {
      title: 'User Management',
      description: 'Manage team members and admin privileges (Owner only)',
      icon: Users,
      page: 'user-management',
      color: 'from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      title: 'Portfolio Submissions',
      description: 'Review and manage portfolio submissions from potential collaborators',
      icon: Folder,
      page: 'portfolio-submissions',
      color: 'from-blue-500/10 to-purple-500/10',
      borderColor: 'border-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts and content',
      icon: FileText,
      page: 'blog-initializer',
      color: 'from-green-500/10 to-teal-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-400',
    },
    {
      title: 'Portfolio Admin',
      description: 'Manage portfolio projects and case studies',
      icon: Image,
      page: 'portfolio-admin',
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Jobs Management',
      description: 'Manage job postings and applications',
      icon: Briefcase,
      page: 'jobs-admin',
      color: 'from-orange-500/10 to-red-500/10',
      borderColor: 'border-orange-500/20',
      iconColor: 'text-orange-400',
    },
    {
      title: 'Portfolio Images',
      description: 'Update and manage portfolio images',
      icon: Settings,
      page: 'portfolio-image-update',
      color: 'from-cyan-500/10 to-blue-500/10',
      borderColor: 'border-cyan-500/20',
      iconColor: 'text-cyan-400',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with glass effect */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-cyan-500/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="text-2xl tracking-tight hover:text-cyan-400 transition-colors"
              >
                CIELO
              </button>
              <span className="text-zinc-700">|</span>
              <div className="flex items-center gap-2">
                <BarChart3 size={20} className="text-zinc-500" />
                <span className="text-sm text-zinc-500">Team Dashboard</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {profile && (
                <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50 backdrop-blur-sm">
                  <User size={16} />
                  <span>{profile.full_name || profile.email}</span>
                  {profile.role === 'admin' && (
                    <span className="px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs">Admin</span>
                  )}
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-all bg-zinc-900/50 hover:bg-zinc-800/50 px-4 py-2 border border-zinc-800/50 hover:border-zinc-700 backdrop-blur-sm"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl mb-3 bg-gradient-to-r from-white via-white to-cyan-400/80 bg-clip-text text-transparent">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Team Member'}
          </h1>
          <p className="text-zinc-500 text-lg">
            Manage your content, submissions, and team settings from one place.
          </p>
        </div>

        {/* Admin Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPages.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`bg-gradient-to-br ${item.color} border ${item.borderColor} p-6 text-left transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-${item.iconColor.replace('text-', '')}/10 group backdrop-blur-sm relative overflow-hidden`}
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 ${item.iconColor} group-hover:border-${item.iconColor.replace('text-', '')}/30 transition-colors`}>
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Stats with glass effect */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950/50 border border-zinc-800/50 p-6 backdrop-blur-xl hover:border-zinc-700/50 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 font-['Geist_Mono'] uppercase tracking-wider">Team Members</p>
                <p className="text-3xl mt-1 bg-gradient-to-r from-white to-cyan-400/60 bg-clip-text text-transparent">1</p>
              </div>
              <Users size={32} className="text-zinc-700" strokeWidth={1.5} />
            </div>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-800/50 p-6 backdrop-blur-xl hover:border-zinc-700/50 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 font-['Geist_Mono'] uppercase tracking-wider">Active Projects</p>
                <p className="text-3xl mt-1 bg-gradient-to-r from-white to-cyan-400/60 bg-clip-text text-transparent">-</p>
              </div>
              <Briefcase size={32} className="text-zinc-700" strokeWidth={1.5} />
            </div>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-800/50 p-6 backdrop-blur-xl hover:border-zinc-700/50 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 font-['Geist_Mono'] uppercase tracking-wider">Pending Reviews</p>
                <p className="text-3xl mt-1 bg-gradient-to-r from-white to-cyan-400/60 bg-clip-text text-transparent">-</p>
              </div>
              <BarChart3 size={32} className="text-zinc-700" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-zinc-600 text-sm">
          <p>CIELO Agency Team Dashboard • Manage your content and team</p>
        </div>
      </div>
    </div>
  );
}