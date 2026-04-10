import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  Trash2, 
  Edit2, 
  Check, 
  X,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface TeamMember {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'team';
  status: 'active' | 'pending';
  created_at: string;
  permissions?: PagePermissions;
}

interface PagePermissions {
  portfolio: { view: boolean; edit: boolean };
  jobs: { view: boolean; edit: boolean };
  blog: { view: boolean; edit: boolean };
  submissions: { view: boolean; edit: boolean };
  brand_guidelines: { view: boolean; edit: boolean };
  team_management: { view: boolean; edit: boolean };
  additional_pages: { view: boolean; edit: boolean };
  meetings: { view: boolean; edit: boolean };
  links_management: { view: boolean; edit: boolean };
  offers_management: { view: boolean; edit: boolean };
}

interface PendingInvitation {
  email: string;
  role: 'admin' | 'team';
  invited_by: string;
  invited_at: string;
  expires_at: string;
}

const DEFAULT_PERMISSIONS: PagePermissions = {
  portfolio: { view: true, edit: false },
  jobs: { view: true, edit: false },
  blog: { view: true, edit: false },
  submissions: { view: false, edit: false },
  brand_guidelines: { view: true, edit: false },
  team_management: { view: false, edit: false },
  additional_pages: { view: false, edit: false },
  meetings: { view: false, edit: false },
  links_management: { view: false, edit: false },
  offers_management: { view: false, edit: false },
};

export function TeamMembersManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'team'>('team');
  const [invitePermissions, setInvitePermissions] = useState<PagePermissions>(DEFAULT_PERMISSIONS);
  const [inviting, setInviting] = useState(false);
  const [editingPermissions, setEditingPermissions] = useState<string | null>(null);
  const [editPermissionsData, setEditPermissionsData] = useState<PagePermissions>(DEFAULT_PERMISSIONS);
  
  // Create User states
  const [createUserEmail, setCreateUserEmail] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');
  const [createUserFullName, setCreateUserFullName] = useState('');
  const [createUserRole, setCreateUserRole] = useState<'admin' | 'team'>('team');
  const [createUserPermissions, setCreateUserPermissions] = useState<PagePermissions>(DEFAULT_PERMISSIONS);
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
    fetchPendingInvites();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();

      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError || !session) {
        toast.error('Please sign in to view team members');
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/members`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const data = await response.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingInvites = async () => {
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/invitations`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPendingInvites(data.invitations || []);
      }
    } catch (error) {
      console.error('Error fetching pending invites:', error);
    }
  };

  const handleInviteTeamMember = async () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setInviting(true);
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in');
        setInviting(false);
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/invite`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole,
          permissions: invitePermissions,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send invitation');
      }

      // Check if it's a warning (user created but email failed)
      if (result.warning) {
        toast.warning(result.warning);
        if (result.temporary_password) {
          toast.info(`Temporary password: ${result.temporary_password}`, { duration: 10000 });
        }
      } else {
        toast.success(`Invitation sent to ${inviteEmail}. User account created successfully.`);
      }
      
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('team');
      setInvitePermissions(DEFAULT_PERMISSIONS);
      
      // Refresh both lists
      fetchPendingInvites();
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error inviting team member:', error);
      toast.error(error.message || 'Failed to send invitation');
    } finally {
      setInviting(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createUserEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    if (!createUserPassword || createUserPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setCreating(true);
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in');
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/create-user`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: createUserEmail,
          password: createUserPassword,
          full_name: createUserFullName,
          role: createUserRole,
          permissions: createUserPermissions,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create user');
      }

      toast.success(`User ${createUserEmail} created successfully`);
      setShowCreateUserModal(false);
      setCreateUserEmail('');
      setCreateUserPassword('');
      setCreateUserFullName('');
      setCreateUserRole('team');
      setCreateUserPermissions(DEFAULT_PERMISSIONS);
      setShowPassword(false);
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const handleUpdatePermissions = async (memberId: string) => {
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in');
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/members/${memberId}/permissions`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permissions: editPermissionsData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update permissions');
      }

      toast.success('Permissions updated successfully');
      setEditingPermissions(null);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating permissions:', error);
      toast.error('Failed to update permissions');
    }
  };

  const handleRemoveMember = async (memberId: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the team?`)) {
      return;
    }

    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in');
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/members/${memberId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove team member');
      }

      toast.success(`${email} removed from team`);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error removing team member:', error);
      toast.error('Failed to remove team member');
    }
  };

  const handleRevokeInvitation = async (email: string) => {
    try {
      const supabase = await createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/invitations/${encodeURIComponent(email)}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Invitation revoked');
        fetchPendingInvites();
      }
    } catch (error) {
      console.error('Error revoking invitation:', error);
      toast.error('Failed to revoke invitation');
    }
  };

  const formatPageName = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1">Team Management</h1>
          <p className="text-zinc-400 text-sm">
            Invite team members and manage their permissions
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowCreateUserModal(true)}
            className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20"
          >
            <Users className="w-4 h-4 mr-2" />
            Create User
          </Button>
          <Button
            onClick={() => setShowInviteModal(true)}
            className="bg-white text-black hover:bg-zinc-200"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Team Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl text-white">{members.filter(m => m.status === 'active').length}</p>
              <p className="text-xs text-zinc-400">Active Members</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl text-white">{pendingInvites.length}</p>
              <p className="text-xs text-zinc-400">Pending Invitations</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl text-white">{members.filter(m => m.role === 'admin').length}</p>
              <p className="text-xs text-zinc-400">Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Invitations
          </h3>
          <div className="space-y-2">
            {pendingInvites.map((invite) => (
              <div key={invite.email} className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <div>
                    <p className="text-sm text-white">{invite.email}</p>
                    <p className="text-xs text-zinc-400">
                      Role: {invite.role} • Invited {new Date(invite.invited_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleRevokeInvitation(invite.email)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members Table */}
      {loading ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading team members...</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50 border-b border-zinc-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-zinc-400 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-zinc-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-zinc-400 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-xs text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white">{member.full_name || member.email}</p>
                        <p className="text-xs text-zinc-400">{member.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${
                        member.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}>
                        <Shield className="w-3 h-3" />
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editingPermissions === member.id ? (
                        <div className="space-y-2 max-w-md">
                          {Object.entries(editPermissionsData).map(([page, perms]) => (
                            <div key={page} className="flex items-center justify-between bg-zinc-800 rounded px-3 py-2">
                              <span className="text-xs text-zinc-300">{formatPageName(page)}</span>
                              <div className="flex gap-2">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={perms.view}
                                    onChange={(e) => setEditPermissionsData({
                                      ...editPermissionsData,
                                      [page]: { ...perms, view: e.target.checked }
                                    })}
                                    className="w-3 h-3"
                                  />
                                  <span className="text-xs text-zinc-400">View</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={perms.edit}
                                    onChange={(e) => setEditPermissionsData({
                                      ...editPermissionsData,
                                      [page]: { ...perms, edit: e.target.checked }
                                    })}
                                    className="w-3 h-3"
                                  />
                                  <span className="text-xs text-zinc-400">Edit</span>
                                </label>
                              </div>
                            </div>
                          ))}
                          <div className="flex gap-2 pt-2">
                            <Button
                              onClick={() => handleUpdatePermissions(member.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingPermissions(null)}
                              size="sm"
                              variant="ghost"
                              className="text-zinc-400"
                            >
                              <X className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {member.permissions && Object.entries(member.permissions).filter(([_, p]) => p.view || p.edit).length > 0 ? (
                            Object.entries(member.permissions)
                              .filter(([_, perms]) => perms.view || perms.edit)
                              .map(([page, perms]) => (
                                <span key={page} className="text-xs bg-zinc-800 px-2 py-0.5 rounded flex items-center gap-1">
                                  {formatPageName(page)}
                                  {perms.edit ? <Edit2 className="w-2 h-2" /> : <Eye className="w-2 h-2" />}
                                </span>
                              ))
                          ) : (
                            <span className="text-xs text-zinc-500">No specific permissions</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${
                        member.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }`}>
                        {member.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingPermissions !== member.id && (
                          <Button
                            onClick={() => {
                              setEditingPermissions(member.id);
                              setEditPermissionsData(member.permissions || DEFAULT_PERMISSIONS);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => handleRemoveMember(member.id, member.email)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Invite Team Member
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="team@example.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'team')}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="team">Team Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Permissions</label>
                <div className="space-y-2 bg-zinc-800 rounded-lg p-4">
                  {Object.entries(invitePermissions).map(([page, perms]) => (
                    <div key={page} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{formatPageName(page)}</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={perms.view}
                            onChange={(e) => setInvitePermissions({
                              ...invitePermissions,
                              [page]: { ...perms, view: e.target.checked }
                            })}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-zinc-400">View</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={perms.edit}
                            onChange={(e) => setInvitePermissions({
                              ...invitePermissions,
                              [page]: { ...perms, edit: e.target.checked }
                            })}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-zinc-400">Edit</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleInviteTeamMember}
                disabled={inviting}
                className="flex-1 bg-white text-black hover:bg-zinc-200"
              >
                {inviting ? 'Sending...' : 'Send Invitation'}
              </Button>
              <Button
                onClick={() => {
                  setShowInviteModal(false);
                  setInviteEmail('');
                  setInviteRole('team');
                  setInvitePermissions(DEFAULT_PERMISSIONS);
                }}
                variant="outline"
                className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Create User
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={createUserEmail}
                  onChange={(e) => setCreateUserEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={createUserPassword}
                    onChange={(e) => setCreateUserPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                <input
                  type="text"
                  value={createUserFullName}
                  onChange={(e) => setCreateUserFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Role</label>
                <select
                  value={createUserRole}
                  onChange={(e) => setCreateUserRole(e.target.value as 'admin' | 'team')}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="team">Team Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Permissions</label>
                <div className="space-y-2 bg-zinc-800 rounded-lg p-4">
                  {Object.entries(createUserPermissions).map(([page, perms]) => (
                    <div key={page} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{formatPageName(page)}</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={perms.view}
                            onChange={(e) => setCreateUserPermissions({
                              ...createUserPermissions,
                              [page]: { ...perms, view: e.target.checked }
                            })}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-zinc-400">View</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={perms.edit}
                            onChange={(e) => setCreateUserPermissions({
                              ...createUserPermissions,
                              [page]: { ...perms, edit: e.target.checked }
                            })}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-zinc-400">Edit</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCreateUser}
                disabled={creating}
                className="flex-1 bg-white text-black hover:bg-zinc-200"
              >
                {creating ? 'Creating...' : 'Create User'}
              </Button>
              <Button
                onClick={() => {
                  setShowCreateUserModal(false);
                  setCreateUserEmail('');
                  setCreateUserPassword('');
                  setCreateUserFullName('');
                  setCreateUserRole('team');
                  setCreateUserPermissions(DEFAULT_PERMISSIONS);
                  setShowPassword(false);
                }}
                variant="outline"
                className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-[rgb(255,255,255)]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}