import { useState } from 'react';
import svgPaths from "../imports/svg-w34z6ixv2w";

interface ActivityLogProps {
  activities: Array<{
    id: string;
    type: string;
    description: string;
    created_at: string;
    user_email?: string;
  }>;
  stats?: {
    signIns: number;
    activeUsers: number;
    tasksViewed: number;
  };
}

function Icon({ path, stroke }: { path: string; stroke: string }) {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
      <g>
        <path d={path} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      </g>
    </svg>
  );
}

function KPICard({ icon, count, label, color }: { icon: React.ReactNode; count: number; label: string; color: string }) {
  return (
    <div className="place-self-stretch relative rounded-[12.75px] shrink-0">
      <div aria-hidden="true" className={`absolute border border-[${color}] border-solid inset-0 pointer-events-none rounded-[12.75px] opacity-20`} />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-px pl-[22px] pr-px pt-[22px] relative size-full gap-4">
          <div className="flex items-center gap-3">
            <div className={`bg-[${color}]/10 rounded-[12.75px] size-[42px] flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <div className="text-[21px] text-white leading-[28px]">{count}</div>
              <div className="text-[#888888] text-[12.25px]">{label}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActivityLog({ activities, stats }: ActivityLogProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-[21px] w-full bg-neutral-950 rounded-xl border border-white/10 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[21px] text-white">Activity Log</h2>
        <p className="text-[#888888] text-[14px]">Track user sign-ins, task views, and system activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
        {/* Sign-ins Today */}
        <div className="bg-neutral-900/50 border border-green-500/20 rounded-[12.75px] p-5">
          <div className="flex items-center gap-4">
            <div className="size-[42px] rounded-[12.75px] bg-green-500/10 flex items-center justify-center text-green-500">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d={svgPaths.p32041498} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.125 10.5H2.625" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p1f7cf400} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[21px] text-white">{stats?.signIns || 0}</div>
              <div className="text-[#888888] text-[12.25px]">Sign-ins Today</div>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-neutral-900/50 border border-blue-300/20 rounded-[12.75px] p-5">
          <div className="flex items-center gap-4">
            <div className="size-[42px] rounded-[12.75px] bg-blue-300/10 flex items-center justify-center text-blue-300">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d={svgPaths.p2265e500} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p105ccf80} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p1414c800} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p18641020} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[21px] text-white">{stats?.activeUsers || 0}</div>
              <div className="text-[#888888] text-[12.25px]">Active Users</div>
            </div>
          </div>
        </div>

        {/* Tasks Viewed */}
        <div className="bg-neutral-900/50 border border-blue-500/20 rounded-[12.75px] p-5">
          <div className="flex items-center gap-4">
            <div className="size-[42px] rounded-[12.75px] bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d={svgPaths.p1163000} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p8a51700} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[21px] text-white">{stats?.tasksViewed || 0}</div>
              <div className="text-[#888888] text-[12.25px]">Tasks Viewed Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-[#111111]/80 p-[15px] rounded-[12.75px] border border-blue-200/10 flex-wrap">
        <div className="relative w-[295px] h-[31.5px]">
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full h-full bg-[#1a1a1a] border border-[#333333] rounded-[6.75px] pl-[35px] text-[12.25px] text-white placeholder-[#888888] focus:outline-none focus:border-white/20 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-[10.5px] top-[8.75px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12.25 12.25L9.71834 9.71834" stroke="#888888" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={svgPaths.p8cdb700} stroke="#888888" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Dropdowns */}
        {['All Users', 'All Actions', 'Last 7 Days'].map((label) => (
          <button key={label} className="flex items-center justify-between px-[11.5px] h-[31.5px] bg-[#1a1a1a] border border-[#333333] rounded-[6.75px] text-[12.25px] text-white min-w-[150px]">
            <span>{label}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-50">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#888888" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}

        <button className="ml-auto flex items-center gap-2 px-4 h-[31.5px] bg-white/5 border border-white/10 rounded-[6.75px] text-[12.25px] text-white hover:bg-white/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 8.75V1.75" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d={svgPaths.p34aacb00} stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d={svgPaths.p27169580} stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="bg-[#111111]/80 rounded-[12.75px] border border-blue-200/10 overflow-hidden">
        <div className="p-[21px] border-b border-[#333333] flex justify-between items-center">
          <div>
            <h3 className="text-[14px] text-white font-normal mb-1">Activity Timeline</h3>
            <p className="text-[#888888] text-[12.25px]">{activities.length} activities found</p>
          </div>
          <div className="bg-blue-200/10 border border-blue-200/20 rounded-[6.75px] h-[19.5px] flex items-center px-2 gap-1.5">
            <div className="size-[10.5px] text-blue-200">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d={svgPaths.p36d47780} stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={svgPaths.p3f861d10} stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[10.5px] text-blue-200 font-medium uppercase tracking-wider">Live Tracking</span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333333] h-[35px]">
                <th className="px-4 text-[#888888] text-[12.25px] font-medium w-[60px]"></th>
                <th className="px-4 text-[#888888] text-[12.25px] font-medium">User</th>
                <th className="px-4 text-[#888888] text-[12.25px] font-medium">Type</th>
                <th className="px-4 text-[#888888] text-[12.25px] font-medium">Action</th>
                <th className="px-4 text-[#888888] text-[12.25px] font-medium">Description</th>
                <th className="px-4 text-[#888888] text-[12.25px] font-medium text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? activities.map((activity, index) => {
                const initials = activity.user_email ? activity.user_email.substring(0, 2).toUpperCase() : '??';
                const isLast = index === activities.length - 1;
                
                return (
                  <tr key={activity.id} className={`h-[64px] ${!isLast ? 'border-b border-[#333333]' : ''} hover:bg-white/5 transition-colors`}>
                    <td className="px-4">
                      <div className="size-[28px] rounded-full border-2 border-blue-200/20 flex items-center justify-center text-[10.5px] text-blue-200">
                        {initials}
                      </div>
                    </td>
                    <td className="px-4">
                      <div className="text-white text-[12.25px]">{activity.user_email?.split('@')[0] || 'User'}</div>
                      <div className="text-[#888888] text-[10.5px]">{activity.user_email}</div>
                    </td>
                    <td className="px-4">
                      <span className="inline-block px-2 py-0.5 rounded-[6.75px] bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10.5px] font-medium">
                        {activity.type}
                      </span>
                    </td>
                    <td className="px-4">
                      <div className="flex items-center gap-2 bg-[#111111] border border-[#333333] rounded-[8.75px] w-fit pr-2">
                        <div className="size-[28px] flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d={svgPaths.p1b614b80} stroke="#05DF72" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.75 7H1.75" stroke="#05DF72" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d={svgPaths.p10101980} stroke="#05DF72" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="bg-green-500/10 border border-green-500/20 text-green-500 text-[10.5px] font-medium px-2 py-0.5 rounded-[6.75px]">
                          {activity.type === 'signup' ? 'sign up' : 'action'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 text-[#888888] text-[12.25px]">{activity.description}</td>
                    <td className="px-4 text-[#888888] text-[12.25px] text-right">
                      {new Date(activity.created_at).toLocaleString()}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="h-[100px] text-center text-[#888888] text-[12.25px]">
                    No recent activity found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
