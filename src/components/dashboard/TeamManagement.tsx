import { useState } from 'react';
import svgPaths from "../imports/svg-zpvjv7hdvm";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

interface TeamManagementProps {
  users: User[];
  onInvite?: () => void;
  onManageRole?: (userId: string, role: string) => void;
}

export function TeamManagement({ users, onInvite, onManageRole }: TeamManagementProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'permissions'>('members');

  return (
    <div className="flex flex-col gap-[28px] w-full bg-neutral-950 p-6 rounded-xl border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-[15.75px] font-medium text-white leading-[22px]">Team & Permissions</h2>
          <p className="text-[#888888] text-[14px]">Manage team members and access permissions</p>
        </div>
        <div className="bg-blue-200/10 border border-blue-200/20 rounded-[6.75px] px-2 py-0.5">
          <span className="text-[10.5px] text-blue-200 font-medium tracking-wider">Management View</span>
        </div>
      </div>

      {/* Tabs & Main Content */}
      <div className="flex flex-col gap-[28px]">
        <div className="bg-[#111111] border border-[#333333] rounded-[12.75px] w-fit p-px flex">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 h-[22.5px] rounded-[12.75px] text-[12.25px] transition-all ${
              activeTab === 'members'
                ? 'bg-[rgba(26,26,26,0.3)] border border-[#1a1a1a] text-white'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d={svgPaths.p317fdd80} stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={svgPaths.p31c78b80} stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={svgPaths.pe97dd00} stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Team Members
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-center gap-2 px-4 h-[22.5px] rounded-[12.75px] text-[12.25px] transition-all ${
              activeTab === 'permissions'
                ? 'bg-[rgba(26,26,26,0.3)] border border-[#1a1a1a] text-white'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d={svgPaths.p351e6200} stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Permissions
          </button>
        </div>

        <div className="flex flex-col gap-[21px]">
          {/* Section Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[14px] text-white font-normal mb-1">Team Members</h3>
              <p className="text-[#888888] text-[12.25px]">Invite and manage your agency team members</p>
            </div>
            <button
              onClick={onInvite}
              className="bg-[#a6e0ff] hover:bg-[#8ccdf0] h-[31.5px] rounded-[6.75px] px-4 flex items-center gap-2 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={svgPaths.p317fdd80} stroke="#0A0A0A" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p31c78b80} stroke="#0A0A0A" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0833 4.66667V8.16667" stroke="#0A0A0A" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.8333 6.41667H9.33333" stroke="#0A0A0A" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-neutral-950 text-[12.25px] font-medium">Invite Team Member</span>
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-[rgba(17,17,17,0.8)] border border-[#333333] rounded-[12.75px] overflow-hidden min-h-[200px]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#333333] h-[35px]">
                  <th className="px-4 text-[#888888] text-[12.25px] font-medium">Name</th>
                  <th className="px-4 text-[#888888] text-[12.25px] font-medium">Email</th>
                  <th className="px-4 text-[#888888] text-[12.25px] font-medium">Role</th>
                  <th className="px-4 text-[#888888] text-[12.25px] font-medium">Status</th>
                  <th className="px-4 text-[#888888] text-[12.25px] font-medium">Joined</th>
                  <th className="px-4 text-[#888888] text-[12.25px] font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-[#333333] last:border-0 hover:bg-white/5 transition-colors h-[60px]">
                      <td className="px-4 text-white text-[12.25px] font-medium">{user.full_name || 'N/A'}</td>
                      <td className="px-4 text-[#888888] text-[12.25px]">{user.email}</td>
                      <td className="px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-[6.75px] text-[10.5px] font-medium border ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-green-500"></span>
                          <span className="text-white text-[12.25px]">Active</span>
                        </span>
                      </td>
                      <td className="px-4 text-[#888888] text-[12.25px]">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 text-right">
                        <button className="text-[#888888] hover:text-white transition-colors text-[12.25px]">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-[#888888] text-[12.25px]">
                      No team members yet. Invite your first team member to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
