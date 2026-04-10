import { useState, useEffect } from 'react';
import { Users, Shield, User, Loader2, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { auth } from '../../utils/supabase/client';
import { toast } from 'sonner';

interface UserManagementProps {
  onNavigate: (page: string) => void;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_owner: boolean;
  created_at: string;
  email_confirmed: boolean;
}

export function UserManagement({ onNavigate }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await auth.getSession();
      if (data?.session?.user) {
        setCurrentUser(data.session.user);
        fetchUsers(data.session.accessToken);
      } else {
        toast.error('Please log in to access user management');
        onNavigate('team-login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      onNavigate('team-login');
    }
  };

  const fetchUsers = async (token?: string) => {
    setLoading(true);
    try {
      const { data } = await auth.getSession();
      const accessToken = token || data?.session?.accessToken;

      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/users`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch users');
      }

      setUsers(result.users || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data } = await auth.getSession();
      const accessToken = data?.session?.accessToken;

      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/promote-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to promote user');
      }

      toast.success('User promoted to admin successfully');
      fetchUsers(accessToken);
    } catch (error: any) {
      console.error('Error promoting user:', error);
      toast.error(error.message || 'Failed to promote user');
    } finally {
      setActionLoading(null);
    }
  };

  const demoteAdmin = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data } = await auth.getSession();
      const accessToken = data?.session?.accessToken;

      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/demote-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to demote user');
      }

      toast.success('User demoted from admin successfully');
      fetchUsers(accessToken);
    } catch (error: any) {
      console.error('Error demoting user:', error);
      toast.error(error.message || 'Failed to demote user');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleUserExpansion = (userId: string) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const getRoleBadge = (user: User) => {
    if (user.is_owner) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full text-xs">
          <Crown className="w-3 h-3" />
          Owner
        </span>
      );
    }
    if (user.role === 'admin') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs">
          <Shield className="w-3 h-3" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-white/60 rounded-full text-xs">
        <User className="w-3 h-3" />
        Team
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('team-dashboard')}
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl">User Management</h1>
            </div>
          </div>
          
          <button
            onClick={() => fetchUsers()}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-sm text-purple-200">
            <strong>Owner privileges required.</strong> Only the owner can promote or demote users. Admins can manage content but cannot modify user roles.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white/40" />
          </div>
        )}

        {/* Users List */}
        {!loading && users.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm text-white/50 mb-4">
              {users.length} {users.length === 1 ? 'user' : 'users'} total
            </div>

            {users.map((user) => {
              const isExpanded = expandedUsers.has(user.id);
              const isCurrentUser = currentUser?.id === user.id;

              return (
                <div
                  key={user.id}
                  className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all"
                >
                  {/* User Row */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium truncate">
                          {user.full_name || user.email}
                        </h3>
                        {getRoleBadge(user)}
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded text-xs">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/50 truncate">
                        {user.email}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => toggleUserExpansion(user.id)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {/* Action Buttons */}
                      {!user.is_owner && !isCurrentUser && (
                        <>
                          {user.role === 'admin' ? (
                            <button
                              onClick={() => demoteAdmin(user.id)}
                              disabled={actionLoading === user.id}
                              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : null}
                              Demote
                            </button>
                          ) : (
                            <button
                              onClick={() => promoteToAdmin(user.id)}
                              disabled={actionLoading === user.id}
                              className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : null}
                              Promote to Admin
                            </button>
                          )}
                        </>
                      )}

                      {isCurrentUser && (
                        <span className="px-4 py-2 text-white/40 text-sm">
                          Can't modify yourself
                        </span>
                      )}

                      {user.is_owner && !isCurrentUser && (
                        <span className="px-4 py-2 text-white/40 text-sm">
                          Owner account
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4 bg-white/[0.02]">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/50">User ID:</span>
                          <p className="text-white/80 font-mono text-xs mt-1 truncate">
                            {user.id}
                          </p>
                        </div>
                        <div>
                          <span className="text-white/50">Created:</span>
                          <p className="text-white/80 mt-1">
                            {formatDate(user.created_at)}
                          </p>
                        </div>
                        <div>
                          <span className="text-white/50">Email Status:</span>
                          <p className="mt-1">
                            {user.email_confirmed ? (
                              <span className="text-green-400">✓ Confirmed</span>
                            ) : (
                              <span className="text-yellow-400">⚠ Unconfirmed</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-white/50">Role:</span>
                          <p className="text-white/80 mt-1 capitalize">
                            {user.is_owner ? 'Owner' : user.role || 'Team'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl text-white/60 mb-2">No users found</h3>
            <p className="text-white/40 text-sm">
              Users will appear here once they sign up
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-lg">
          <h3 className="font-medium mb-3">How to add new admins</h3>
          <ol className="space-y-2 text-sm text-white/70">
            <li>1. Invite team members to create an account via the Team Login page</li>
            <li>2. Once they sign up, they'll appear in this list as "Team" role</li>
            <li>3. Use the "Promote to Admin" button to grant admin privileges</li>
            <li>4. Admins can manage content but cannot promote/demote other users</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
