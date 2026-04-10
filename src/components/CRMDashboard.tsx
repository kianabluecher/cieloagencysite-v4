import { useState } from 'react';
import { 
  Mail, Send, Target, TrendingUp, TrendingDown, AlertCircle, 
  Activity, Users, DollarSign, Zap, ExternalLink, Filter,
  ChevronDown, ChevronUp, Play, Pause, RefreshCw, Tag, UserPlus,
  Sparkles, Brain, LineChart as LineChartIcon, BarChart3, Calendar
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, ResponsiveContainer } from 'recharts';

// Mock data for channels
const channelData = {
  'cold-email': {
    name: 'Instantly Cold Email',
    color: '#3b82f6',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    leads: 847,
    qualifiedLeads: 203,
    replyRate: 34.2,
    openRate: 68.5,
    cpl: 12.50,
    convRate: 24.0,
    pipelineValue: 152400,
    trend7d: [45, 52, 48, 61, 55, 67, 72],
    trend30d: [120, 135, 142, 138, 155, 161, 158, 172, 168, 175, 182, 189, 195, 201, 198, 205, 212, 218, 225, 232, 238, 245, 251, 258, 265, 272, 278, 285, 292, 298],
  },
  'linkedin': {
    name: 'LinkedIn Outreach',
    color: '#0a66c2',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    leads: 542,
    qualifiedLeads: 187,
    replyRate: 41.8,
    openRate: 82.3,
    cpl: 18.75,
    convRate: 34.5,
    pipelineValue: 198600,
    trend7d: [32, 38, 42, 45, 41, 48, 52],
    trend30d: [85, 92, 98, 105, 112, 118, 125, 132, 138, 145, 151, 158, 165, 171, 178, 185, 192, 198, 205, 212, 218, 225, 232, 238, 245, 252, 258, 265, 272, 278],
  },
  'paid-ads': {
    name: 'Paid Ads',
    color: '#a855f7',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    leads: 1203,
    qualifiedLeads: 289,
    replyRate: 0, // Not applicable
    openRate: 0, // Not applicable
    cpl: 24.30,
    convRate: 24.0,
    pipelineValue: 267800,
    trend7d: [98, 105, 112, 108, 115, 122, 128],
    trend30d: [280, 295, 305, 315, 325, 335, 345, 355, 365, 375, 385, 395, 405, 415, 425, 435, 445, 455, 465, 475, 485, 495, 505, 515, 525, 535, 545, 555, 565, 575],
  },
};

// Funnel data
const funnelData = [
  { stage: 'Traffic', count: 12847, dropoff: 0, utmSources: { google: 4200, linkedin: 3800, facebook: 2900, email: 1947 } },
  { stage: 'Landing Page', count: 8923, dropoff: 30.5, utmSources: { google: 3100, linkedin: 2700, facebook: 2023, email: 1100 } },
  { stage: 'Lead Form', count: 5841, dropoff: 34.5, utmSources: { google: 2100, linkedin: 1800, facebook: 1341, email: 600 } },
  { stage: 'MQL', count: 2592, dropoff: 55.6, utmSources: { google: 950, linkedin: 820, facebook: 522, email: 300 } },
  { stage: 'SQL', count: 679, dropoff: 73.8, utmSources: { google: 250, linkedin: 215, facebook: 134, email: 80 } },
  { stage: 'Opportunity', count: 312, dropoff: 54.1, utmSources: { google: 115, linkedin: 99, facebook: 62, email: 36 } },
];

// Outreach health data
const outreachData = [
  { 
    name: 'Series A Founders', 
    status: 'active', 
    sent: 247, 
    opened: 189, 
    replied: 42, 
    bounced: 8,
    avgResponseTime: '3.2h',
    topResponder: 'Sarah Chen, Quantum Ventures',
    intent: 87
  },
  { 
    name: 'SaaS CMOs Q1', 
    status: 'active', 
    sent: 312, 
    opened: 241, 
    replied: 67, 
    bounced: 12,
    avgResponseTime: '5.7h',
    topResponder: 'Michael Torres, GrowthStack',
    intent: 72
  },
  { 
    name: 'E-commerce Directors', 
    status: 'paused', 
    sent: 189, 
    opened: 142, 
    replied: 28, 
    bounced: 5,
    avgResponseTime: '8.1h',
    topResponder: 'Emma Williams, ShopFlow',
    intent: 65
  },
];

// A/B test heatmap data
const abTestData = {
  subjectLines: [
    { variant: 'A', text: 'Quick question about [Company]', opens: 245, replies: 52, convRate: 21.2 },
    { variant: 'B', text: '[Name], saw your post on [Topic]', opens: 312, replies: 78, convRate: 25.0 },
    { variant: 'C', text: 'Mutual connection suggested I reach out', opens: 189, replies: 41, convRate: 21.7 },
  ],
  adCopy: [
    { variant: 'A', text: 'Build your brand in 30 days', clicks: 1247, conversions: 89, convRate: 7.1 },
    { variant: 'B', text: 'Growth system for fast-moving founders', clicks: 1584, conversions: 142, convRate: 9.0 },
    { variant: 'C', text: 'Your brand deserves better', clicks: 892, conversions: 52, convRate: 5.8 },
  ],
  landingPages: [
    { variant: 'A', name: 'Hero + Benefits', visits: 3247, signups: 412, convRate: 12.7 },
    { variant: 'B', name: 'Case Study Focus', visits: 2891, signups: 521, convRate: 18.0 },
    { variant: 'C', name: 'Video First', visits: 2156, signups: 298, convRate: 13.8 },
  ],
};

// Lead scoring model
const scoringInputs = [
  { factor: 'Company Size', weight: 25, value: 'Mid-market (50-200)', score: 85 },
  { factor: 'Industry Match', weight: 20, value: 'SaaS/Tech', score: 92 },
  { factor: 'Engagement Level', weight: 20, value: 'High (3+ touches)', score: 78 },
  { factor: 'Budget Authority', weight: 15, value: 'Decision Maker', score: 88 },
  { factor: 'Timeline', weight: 10, value: 'Q1 2025', score: 75 },
  { factor: 'Intent Signals', weight: 10, value: 'Website + LinkedIn', score: 82 },
];

export function CRMDashboard() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeSection, setActiveSection] = useState<'channels' | 'funnel' | 'outreach' | 'predictive'>('channels');

  // Alerts
  const alerts = [
    { type: 'spike', channel: 'LinkedIn', metric: 'Reply Rate', change: '+12.5%', severity: 'positive' },
    { type: 'drop', channel: 'Cold Email', metric: 'Open Rate', change: '-8.2%', severity: 'warning' },
  ];

  return (
    <div className="w-full bg-[#050508] border-2 border-[#1f2228] rounded-2xl p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b-2 border-[#1f2228]">
        <div>
          <h3 className="text-2xl text-white mb-2 flex items-center gap-3">
            <Activity className="text-blue-400" size={28} />
            Lead Ops Dashboard
          </h3>
          <p className="text-[#7d8187] text-sm">Channel-first attribution & real-time playbook execution</p>
        </div>
        
        {/* Real-time Alerts */}
        <div className="flex flex-wrap items-center gap-3">
          {alerts.map((alert, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                alert.severity === 'positive' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              <AlertCircle size={14} />
              <span className="text-xs font-['Geist_Mono']">
                {alert.channel}: {alert.metric} {alert.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'channels', label: 'Channel Performance', icon: Target },
          { id: 'funnel', label: 'Attribution Funnel', icon: BarChart3 },
          { id: 'outreach', label: 'Outreach Health', icon: Send },
          { id: 'predictive', label: 'Predictive Insights', icon: Brain },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-['Geist_Mono'] transition-all border-2 ${
              activeSection === section.id
                ? 'bg-white/10 text-white border-white/30'
                : 'text-[#7d8187] hover:text-white border-transparent hover:border-white/10'
            }`}
          >
            <section.icon size={16} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Collapsible Filters */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#7d8187] hover:text-white border-2 border-[#1f2228] hover:border-white/10 transition-all"
        >
          <Filter size={16} />
          Advanced Filters
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-[#7d8187] uppercase tracking-wider mb-2 block">Date Range</label>
              <select className="w-full bg-neutral-900 border border-[#1f2228] rounded-lg px-3 py-2 text-white text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#7d8187] uppercase tracking-wider mb-2 block">UTM Source</label>
              <select className="w-full bg-neutral-900 border border-[#1f2228] rounded-lg px-3 py-2 text-white text-sm">
                <option>All Sources</option>
                <option>Google</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#7d8187] uppercase tracking-wider mb-2 block">Lead Status</label>
              <select className="w-full bg-neutral-900 border border-[#1f2228] rounded-lg px-3 py-2 text-white text-sm">
                <option>All Statuses</option>
                <option>MQL</option>
                <option>SQL</option>
                <option>Opportunity</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* CHANNEL PERFORMANCE SECTION */}
      {activeSection === 'channels' && (
        <div className="space-y-6">
          {/* Channel Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(channelData).map(([key, channel]) => (
              <div
                key={key}
                className={`group cursor-pointer bg-neutral-950/50 border-2 rounded-xl p-6 transition-all hover:scale-[1.02] ${
                  selectedChannel === key 
                    ? `${channel.borderColor} shadow-lg` 
                    : 'border-[#1f2228] hover:border-white/20'
                }`}
                onClick={() => setSelectedChannel(selectedChannel === key ? null : key)}
              >
                {/* Channel Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className={`text-lg mb-1 ${channel.textColor}`}>{channel.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-2 h-2 rounded-full ${channel.bgColor} animate-pulse`} style={{ backgroundColor: channel.color }} />
                      <span className="text-xs text-[#7d8187] font-['Geist_Mono']">LIVE</span>
                    </div>
                  </div>
                  <button 
                    className={`p-2 rounded-lg ${channel.bgColor} ${channel.textColor} hover:scale-110 transition-transform`}
                    title="Quick Actions"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Leads</p>
                    <p className="text-2xl text-white font-['Geist_Mono']">{channel.leads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Qualified</p>
                    <p className="text-2xl text-white font-['Geist_Mono']">{channel.qualifiedLeads.toLocaleString()}</p>
                  </div>
                  {channel.replyRate > 0 && (
                    <>
                      <div>
                        <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Reply Rate</p>
                        <p className={`text-xl ${channel.textColor} font-['Geist_Mono']`}>{channel.replyRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Open Rate</p>
                        <p className={`text-xl ${channel.textColor} font-['Geist_Mono']`}>{channel.openRate}%</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">CPL</p>
                    <p className="text-xl text-white font-['Geist_Mono']">${channel.cpl}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Conv Rate</p>
                    <p className={`text-xl ${channel.textColor} font-['Geist_Mono']`}>{channel.convRate}%</p>
                  </div>
                </div>

                {/* Pipeline Value */}
                <div className={`p-4 rounded-lg ${channel.bgColor} border-2 ${channel.borderColor} mb-4`}>
                  <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Pipeline Value</p>
                  <p className="text-2xl text-white font-['Geist_Mono']">
                    ${(channel.pipelineValue / 1000).toFixed(0)}K
                  </p>
                </div>

                {/* Trend Sparklines */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-[#7d8187] uppercase tracking-wider">7-Day Trend</span>
                      <span className={`text-xs ${channel.textColor} font-['Geist_Mono']`}>
                        +{((channel.trend7d[6] - channel.trend7d[0]) / channel.trend7d[0] * 100).toFixed(1)}%
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={40}>
                      <LineChart data={channel.trend7d.map((value, i) => ({ value, day: i }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={channel.color} 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-[#7d8187] uppercase tracking-wider">30-Day Trend</span>
                      <span className={`text-xs ${channel.textColor} font-['Geist_Mono']`}>
                        +{((channel.trend30d[29] - channel.trend30d[0]) / channel.trend30d[0] * 100).toFixed(1)}%
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={40}>
                      <AreaChart data={channel.trend30d.map((value, i) => ({ value, day: i }))}>
                        <defs>
                          <linearGradient id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={channel.color} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={channel.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={channel.color} 
                          strokeWidth={2}
                          fill={`url(#gradient-${key})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Hover Actions */}
                {selectedChannel === key && (
                  <div className="mt-6 pt-6 border-t-2 border-[#1f2228] flex flex-wrap gap-2">
                    <button className={`flex-1 px-3 py-2 rounded-lg ${channel.bgColor} ${channel.textColor} text-xs font-['Geist_Mono'] uppercase hover:opacity-80 transition-opacity`}>
                      Export Data
                    </button>
                    <button className={`flex-1 px-3 py-2 rounded-lg ${channel.bgColor} ${channel.textColor} text-xs font-['Geist_Mono'] uppercase hover:opacity-80 transition-opacity`}>
                      Edit Campaign
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ATTRIBUTION FUNNEL SECTION */}
      {activeSection === 'funnel' && (
        <div className="space-y-6">
          {/* Multi-touch Attribution Funnel */}
          <div className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
            <h4 className="text-white mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-400" />
              Unified Funnel - Multi-Touch Attribution by UTM
            </h4>
            
            <div className="space-y-4">
              {funnelData.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-4">
                      <span className="text-white w-32">{stage.stage}</span>
                      <span className="text-2xl text-white font-['Geist_Mono']">{stage.count.toLocaleString()}</span>
                      {idx > 0 && (
                        <span className="text-xs text-red-400 font-['Geist_Mono'] bg-red-500/10 px-2 py-1 rounded">
                          -{stage.dropoff}% drop-off
                        </span>
                      )}
                    </div>
                    
                    {/* UTM Source Breakdown */}
                    <div className="flex items-center gap-2">
                      {Object.entries(stage.utmSources).map(([source, count]) => (
                        <div 
                          key={source}
                          className="text-xs text-[#7d8187] bg-neutral-900 px-2 py-1 rounded"
                          title={source}
                        >
                          {source.charAt(0).toUpperCase()}: {count}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Funnel Bar */}
                  <div className="relative h-12 bg-neutral-900 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${(stage.count / funnelData[0].count) * 100}%` }}
                    />
                    
                    {/* UTM Source Segments */}
                    <div className="absolute inset-0 flex">
                      {Object.entries(stage.utmSources).map(([source, count], i) => {
                        const colors = { google: '#EA4335', linkedin: '#0A66C2', facebook: '#1877F2', email: '#7C3AED' };
                        return (
                          <div
                            key={source}
                            className="h-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                            style={{ 
                              width: `${(count / stage.count) * 100}%`,
                              backgroundColor: colors[source as keyof typeof colors]
                            }}
                            title={`${source}: ${count}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A/B Test Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject Lines */}
            <div className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                Subject Line Tests
              </h4>
              <div className="space-y-3">
                {abTestData.subjectLines.map((test) => (
                  <div 
                    key={test.variant}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      test.convRate > 23 
                        ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50' 
                        : 'bg-neutral-900 border-[#1f2228] hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-[#7d8187] font-['Geist_Mono']">VARIANT {test.variant}</span>
                      <span className={`text-xs font-['Geist_Mono'] ${test.convRate > 23 ? 'text-green-400' : 'text-white'}`}>
                        {test.convRate}%
                      </span>
                    </div>
                    <p className="text-white text-sm mb-2">{test.text}</p>
                    <div className="flex gap-4 text-xs text-[#7d8187]">
                      <span>Opens: {test.opens}</span>
                      <span>Replies: {test.replies}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Copy */}
            <div className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-purple-400" />
                Ad Copy Tests
              </h4>
              <div className="space-y-3">
                {abTestData.adCopy.map((test) => (
                  <div 
                    key={test.variant}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      test.convRate > 7 
                        ? 'bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50' 
                        : 'bg-neutral-900 border-[#1f2228] hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-[#7d8187] font-['Geist_Mono']">VARIANT {test.variant}</span>
                      <span className={`text-xs font-['Geist_Mono'] ${test.convRate > 7 ? 'text-purple-400' : 'text-white'}`}>
                        {test.convRate}%
                      </span>
                    </div>
                    <p className="text-white text-sm mb-2">{test.text}</p>
                    <div className="flex gap-4 text-xs text-[#7d8187]">
                      <span>Clicks: {test.clicks}</span>
                      <span>Conv: {test.conversions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Landing Pages */}
            <div className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <LineChartIcon size={18} className="text-cyan-400" />
                Landing Page Tests
              </h4>
              <div className="space-y-3">
                {abTestData.landingPages.map((test) => (
                  <div 
                    key={test.variant}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      test.convRate > 15 
                        ? 'bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50' 
                        : 'bg-neutral-900 border-[#1f2228] hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-[#7d8187] font-['Geist_Mono']">VARIANT {test.variant}</span>
                      <span className={`text-xs font-['Geist_Mono'] ${test.convRate > 15 ? 'text-cyan-400' : 'text-white'}`}>
                        {test.convRate}%
                      </span>
                    </div>
                    <p className="text-white text-sm mb-2">{test.name}</p>
                    <div className="flex gap-4 text-xs text-[#7d8187]">
                      <span>Visits: {test.visits}</span>
                      <span>Signups: {test.signups}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OUTREACH HEALTH SECTION */}
      {activeSection === 'outreach' && (
        <div className="space-y-6">
          {/* Sequence Health Cards */}
          {outreachData.map((sequence, idx) => (
            <div 
              key={idx}
              className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Left: Sequence Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white text-lg mb-2">{sequence.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-['Geist_Mono'] uppercase border-2 ${
                          sequence.status === 'active' 
                            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}>
                          {sequence.status === 'active' ? <Play size={12} /> : <Pause size={12} />}
                          {sequence.status}
                        </span>
                        <span className="text-xs text-[#7d8187]">
                          Intent Score: <span className="text-cyan-400 font-['Geist_Mono']">{sequence.intent}/100</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Sent</p>
                      <p className="text-xl text-white font-['Geist_Mono']">{sequence.sent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Opened</p>
                      <p className="text-xl text-blue-400 font-['Geist_Mono']">{sequence.opened}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Replied</p>
                      <p className="text-xl text-green-400 font-['Geist_Mono']">{sequence.replied}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-1">Bounced</p>
                      <p className="text-xl text-red-400 font-['Geist_Mono']">{sequence.bounced}</p>
                    </div>
                  </div>

                  {/* Top Responder */}
                  <div className="bg-neutral-900 border-2 border-[#1f2228] rounded-lg p-4 mb-4">
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">Fastest Responder</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white">{sequence.topResponder}</span>
                      <span className="text-cyan-400 font-['Geist_Mono'] text-sm">{sequence.avgResponseTime}</span>
                    </div>
                  </div>

                  {/* One-Click Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border-2 border-blue-500/30 text-blue-400 rounded-lg text-xs font-['Geist_Mono'] uppercase hover:bg-blue-500/20 transition-all">
                      <RefreshCw size={14} />
                      Re-sequence
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border-2 border-purple-500/30 text-purple-400 rounded-lg text-xs font-['Geist_Mono'] uppercase hover:bg-purple-500/20 transition-all">
                      <Tag size={14} />
                      Add Tags
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border-2 border-green-500/30 text-green-400 rounded-lg text-xs font-['Geist_Mono'] uppercase hover:bg-green-500/20 transition-all">
                      <UserPlus size={14} />
                      Push to SDR
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border-2 border-cyan-500/30 text-cyan-400 rounded-lg text-xs font-['Geist_Mono'] uppercase hover:bg-cyan-500/20 transition-all">
                      <ExternalLink size={14} />
                      Export Leads
                    </button>
                  </div>
                </div>

                {/* Right: Enrichment Data */}
                <div className="lg:w-80 bg-neutral-900 border-2 border-[#1f2228] rounded-lg p-4">
                  <h5 className="text-white text-sm mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-cyan-400" />
                    Enrichment Data
                  </h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-[#7d8187] text-xs mb-1">Firmographics</p>
                      <p className="text-white">Mid-market SaaS, 50-200 employees</p>
                    </div>
                    <div>
                      <p className="text-[#7d8187] text-xs mb-1">Recent Activity</p>
                      <p className="text-white">Visited pricing page 3x this week</p>
                    </div>
                    <div>
                      <p className="text-[#7d8187] text-xs mb-1">Intent Signals</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded text-xs">Website</span>
                        <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded text-xs">LinkedIn</span>
                        <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded text-xs">G2 Review</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PREDICTIVE INSIGHTS SECTION */}
      {activeSection === 'predictive' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Scoring Model */}
          <div className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
            <h4 className="text-white mb-6 flex items-center gap-2">
              <Brain size={20} className="text-purple-400" />
              Lead Scoring Model Inputs
            </h4>
            <div className="space-y-4">
              {scoringInputs.map((input, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm">{input.factor}</span>
                    <span className="text-[#7d8187] text-sm">{input.weight}% weight</span>
                  </div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                        style={{ width: `${input.score}%` }}
                      />
                    </div>
                    <span className="text-purple-400 font-['Geist_Mono'] text-sm w-12 text-right">
                      {input.score}
                    </span>
                  </div>
                  <p className="text-xs text-[#7d8187]">{input.value}</p>
                </div>
              ))}
              <div className="pt-4 border-t-2 border-[#1f2228]">
                <div className="flex justify-between items-center">
                  <span className="text-white">Total Lead Score</span>
                  <span className="text-3xl font-['Geist_Mono'] text-purple-400">83</span>
                </div>
              </div>
            </div>
          </div>

          {/* CAC vs LTV Forecast */}
          <div className="bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
            <h4 className="text-white mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-green-400" />
              CAC vs LTV Forecast
            </h4>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4">
                  <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">Customer Acquisition Cost</p>
                  <p className="text-3xl text-red-400 font-['Geist_Mono']">$847</p>
                  <p className="text-xs text-[#7d8187] mt-2">Per customer, last 90 days</p>
                </div>
                <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                  <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">Lifetime Value</p>
                  <p className="text-3xl text-green-400 font-['Geist_Mono']">$4,250</p>
                  <p className="text-xs text-[#7d8187] mt-2">12-month projection</p>
                </div>
              </div>
              
              <div className="bg-neutral-900 border-2 border-[#1f2228] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">LTV:CAC Ratio</span>
                  <span className="text-2xl font-['Geist_Mono'] text-green-400">5.0x</span>
                </div>
                <div className="h-3 bg-neutral-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-[83%]" />
                </div>
                <p className="text-xs text-[#7d8187] mt-2">Target: 3.0x minimum • Status: Excellent</p>
              </div>

              <div>
                <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-3">Pipeline Velocity</p>
                <div className="bg-neutral-900 border-2 border-[#1f2228] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Avg. Days to Close</span>
                    <span className="text-xl font-['Geist_Mono'] text-cyan-400">23 days</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                    <TrendingDown size={14} />
                    <span>-12% vs last quarter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Builder */}
          <div className="lg:col-span-2 bg-neutral-950/50 border-2 border-[#1f2228] rounded-xl p-6">
            <h4 className="text-white mb-6 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              Revenue Scenario Builder
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Scenario Controls */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#7d8187] uppercase tracking-wider mb-2 block">Monthly Ad Spend</label>
                  <input 
                    type="range" 
                    min="5000" 
                    max="50000" 
                    step="5000"
                    defaultValue="15000"
                    className="w-full accent-blue-500"
                  />
                  <p className="text-white font-['Geist_Mono'] mt-2">$15,000</p>
                </div>
                
                <div>
                  <label className="text-xs text-[#7d8187] uppercase tracking-wider mb-2 block">Email Cadence (days)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="14" 
                    step="1"
                    defaultValue="3"
                    className="w-full accent-purple-500"
                  />
                  <p className="text-white font-['Geist_Mono'] mt-2">Every 3 days</p>
                </div>

                <div>
                  <label className="text-xs text-[#7d8187] uppercase tracking-wider mb-2 block">Creative Variation</label>
                  <select className="w-full bg-neutral-900 border-2 border-[#1f2228] rounded-lg px-3 py-2 text-white">
                    <option>Best Performer (Variant B)</option>
                    <option>Test New Creative</option>
                    <option>Mix All Variants</option>
                  </select>
                </div>
              </div>

              {/* Projected Results */}
              <div className="md:col-span-2 bg-neutral-900 border-2 border-[#1f2228] rounded-lg p-6">
                <h5 className="text-white mb-4">Projected 90-Day Results</h5>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">New Leads</p>
                    <p className="text-3xl text-blue-400 font-['Geist_Mono']">2,847</p>
                  </div>
                  <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">Conversions</p>
                    <p className="text-3xl text-green-400 font-['Geist_Mono']">683</p>
                  </div>
                  <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">Pipeline Added</p>
                    <p className="text-3xl text-purple-400 font-['Geist_Mono']">$892K</p>
                  </div>
                  <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg p-4">
                    <p className="text-xs text-[#7d8187] uppercase tracking-wider mb-2">Projected Revenue</p>
                    <p className="text-3xl text-cyan-400 font-['Geist_Mono']">$312K</p>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-['Geist_Mono'] uppercase text-sm hover:opacity-90 transition-opacity">
                  Apply This Scenario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}