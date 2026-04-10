import React, { useState, useEffect } from 'react';
import { projectId } from '../../utils/supabase/info';
import { auth } from '../../utils/supabase/client';
import { 
  RefreshCw, 
  Search, 
  Filter, 
  BarChart2, 
  Users, 
  MessageSquare, 
  Linkedin, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  Download,
  Webhook,
  Play
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface HeyReachDashboardProps {
  onNavigate: (page: string) => void;
}

interface Campaign {
  id: number;
  name: string;
  status: string;
  creationTime: string;
  campaignAccountIds: number[];
}

interface Lead {
  firstName: string;
  lastName: string;
  location: string;
  messageStatus: string;
  headline?: string;
  profileUrl?: string;
}

interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  headline?: string;
  profilePicture?: string;
}

interface WebhookEvent {
  id: string;
  timestamp: string;
  payload: any;
}

export function HeyReachDashboard({ onNavigate }: HeyReachDashboardProps) {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'leads' | 'accounts' | 'webhooks'>('campaigns');
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [campaignLeads, setCampaignLeads] = useState<Record<number, Lead[]>>({});
  const [loadingLeads, setLoadingLeads] = useState<Record<number, boolean>>({});
  
  // Webhook state
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [loadingWebhooks, setLoadingWebhooks] = useState(false);
  const [simulatingWebhook, setSimulatingWebhook] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === 'webhooks') {
      fetchWebhookEvents();
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await auth.getSession();
      if (!session) {
        toast.error('Please log in to view dashboard');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${session.access_token}`
      };

      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/api/heyreach`;

      // Fetch Campaigns and Accounts in parallel
      const [campaignsRes, accountsRes] = await Promise.all([
        fetch(`${baseUrl}/campaigns?limit=100`, { headers }),
        fetch(`${baseUrl}/accounts?limit=100`, { headers })
      ]);

      if (!campaignsRes.ok) throw new Error('Failed to fetch campaigns');
      if (!accountsRes.ok) throw new Error('Failed to fetch accounts');

      const campaignsData = await campaignsRes.json();
      const accountsData = await accountsRes.json();

      if (campaignsData.success) setCampaigns(campaignsData.data.campaigns || []);
      if (accountsData.success) setAccounts(accountsData.data.accounts || []);

      setLastUpdated(new Date());
      toast.success('Dashboard updated');
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch HeyReach data. Check API key.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadsForCampaign = async (campaignId: number) => {
    if (campaignLeads[campaignId] || loadingLeads[campaignId]) return;

    setLoadingLeads(prev => ({ ...prev, [campaignId]: true }));
    try {
      const { data: { session } } = await auth.getSession();
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/api/heyreach/campaigns/${campaignId}/leads?limit=50`,
        {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCampaignLeads(prev => ({ ...prev, [campaignId]: data.data.leads || [] }));
        }
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error(`Failed to load leads for campaign ${campaignId}`);
    } finally {
      setLoadingLeads(prev => ({ ...prev, [campaignId]: false }));
    }
  };

  const fetchWebhookEvents = async () => {
    setLoadingWebhooks(true);
    try {
      const { data: { session } } = await auth.getSession();
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/api/heyreach/events`,
        {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWebhookEvents(data.events || []);
        }
      }
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      toast.error('Failed to load webhook events');
    } finally {
      setLoadingWebhooks(false);
    }
  };

  const simulateWebhook = async () => {
    setSimulatingWebhook(true);
    try {
      const webhookUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/api/heyreach/webhook`;
      
      const testPayload = {
        event: "test.event",
        timestamp: new Date().toISOString(),
        data: {
          message: "This is a test webhook event sent from the dashboard",
          source: "dashboard_simulation"
        }
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testPayload)
      });

      if (response.ok) {
        toast.success('Test webhook sent successfully!');
        // Refresh events after a short delay to allow processing
        setTimeout(fetchWebhookEvents, 1000);
      } else {
        toast.error('Failed to send test webhook');
      }
    } catch (error) {
      console.error('Simulation error:', error);
      toast.error('Error simulating webhook');
    } finally {
      setSimulatingWebhook(false);
    }
  };

  // Derived Metrics
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE' || c.status === 'RUNNING').length;
  
  // Flatten all loaded leads to calculate stats (approximate since we lazy load)
  const allLoadedLeads = Object.values(campaignLeads).flat();
  const totalLeadsLoaded = allLoadedLeads.length;
  const repliedLeads = allLoadedLeads.filter(l => l.messageStatus === 'MESSAGE_REPLY').length;
  const replyRate = totalLeadsLoaded > 0 ? ((repliedLeads / totalLeadsLoaded) * 100).toFixed(1) : '0.0';

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === 'ALL' || c.status === statusFilter)
  );

  return (
    <div className="flex-1 bg-[#0A0A0B] min-h-screen text-white p-4 md:p-8 md:pl-20 pt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
              Sales Dashboard <span className="text-zinc-500 text-lg font-normal">( HeyReach )</span>
            </h1>
            <p className="text-zinc-500">Campaign performance and lead tracking integration.</p>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-zinc-500">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button 
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Campaigns" 
            value={totalCampaigns.toString()} 
            subValue={`${activeCampaigns} Active`}
            icon={BarChart2} 
            color="text-blue-400" 
          />
          <StatCard 
            title="Total Leads (Loaded)" 
            value={totalLeadsLoaded.toString()} 
            subValue="Across viewed campaigns"
            icon={Users} 
            color="text-purple-400" 
          />
          <StatCard 
            title="Reply Rate" 
            value={`${replyRate}%`} 
            subValue={`${repliedLeads} Replies`}
            icon={MessageSquare} 
            color="text-emerald-400" 
          />
          <StatCard 
            title="Connected Accounts" 
            value={accounts.length.toString()} 
            subValue="LinkedIn Senders"
            icon={Linkedin} 
            color="text-blue-500" 
          />
        </div>

        {/* Main Content Tabs */}
        <div className="space-y-6">
          <div className="flex items-center border-b border-zinc-800 overflow-x-auto">
            <TabButton active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} label="Campaigns" />
            <TabButton active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} label="Leads" />
            <TabButton active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} label="Accounts" />
            <TabButton active={activeTab === 'webhooks'} onClick={() => setActiveTab('webhooks')} label="Webhooks" />
          </div>

          {activeTab === 'campaigns' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Filters */}
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-2.5 text-zinc-500 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search campaigns..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-700"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PAUSED">Paused</option>
                  <option value="DRAFT">Draft</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              {/* Campaigns Table */}
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Campaign Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Created</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredCampaigns.length > 0 ? (
                      filteredCampaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-zinc-200">{campaign.name}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-zinc-400 text-sm">
                            {new Date(campaign.creationTime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => {
                                setSelectedCampaign(campaign.id);
                                fetchLeadsForCampaign(campaign.id);
                                setActiveTab('leads');
                              }}
                              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              View Leads
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                          {loading ? 'Loading campaigns...' : 'No campaigns found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'leads' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-zinc-200">
                  {selectedCampaign 
                    ? `Leads for Campaign #${selectedCampaign}` 
                    : 'Select a campaign to view leads'}
                </h3>
                {selectedCampaign && (
                  <button 
                    onClick={() => setSelectedCampaign(null)}
                    className="text-sm text-zinc-500 hover:text-white"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {selectedCampaign && campaignLeads[selectedCampaign] ? (
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
                   <table className="w-full text-left">
                    <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">LinkedIn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {campaignLeads[selectedCampaign].length > 0 ? (
                        campaignLeads[selectedCampaign].map((lead, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="px-6 py-4 text-zinc-200">
                              <div className="font-medium">{lead.firstName} {lead.lastName}</div>
                              <div className="text-xs text-zinc-500">{lead.headline}</div>
                            </td>
                            <td className="px-6 py-4 text-zinc-400 text-sm">{lead.location || 'Unknown'}</td>
                            <td className="px-6 py-4">
                                <LeadStatusBadge status={lead.messageStatus} />
                            </td>
                            <td className="px-6 py-4">
                              {lead.profileUrl && (
                                <a 
                                  href={lead.profileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Linkedin size={16} />
                                </a>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                         <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                            No leads found for this campaign.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                  <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">Select a campaign from the Campaigns tab to view leads.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'accounts' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {accounts.length > 0 ? (
                accounts.map(account => (
                  <div key={account.id} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{account.firstName} {account.lastName}</h3>
                      <p className="text-sm text-zinc-500 mb-2">{account.headline || account.email}</p>
                      <span className={`px-2 py-0.5 rounded text-xs border ${account.status === 'CONNECTED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {account.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-zinc-500">
                  {loading ? 'Loading accounts...' : 'No connected LinkedIn accounts found.'}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'webhooks' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Webhook Configuration</h3>
                    <p className="text-sm text-zinc-400 max-w-2xl mb-4">
                      Configure HeyReach to send events to this URL. The dashboard will automatically log received events below.
                    </p>
                    <div className="flex items-center gap-2 bg-black/50 p-3 rounded border border-zinc-800 font-mono text-xs text-zinc-300 w-full max-w-3xl overflow-x-auto">
                      <Webhook size={14} className="shrink-0" />
                      <span className="select-all">
                        {`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/api/heyreach/webhook`}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={simulateWebhook}
                    disabled={simulatingWebhook}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 rounded-lg text-sm transition-colors"
                  >
                    <Play size={16} />
                    {simulatingWebhook ? 'Sending...' : 'Simulate Test Event'}
                  </button>
                </div>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800/50 flex justify-between items-center">
                   <h3 className="font-medium text-white">Recent Webhook Events</h3>
                   <button 
                     onClick={fetchWebhookEvents}
                     className="text-xs text-zinc-500 hover:text-white flex items-center gap-1"
                   >
                     <RefreshCw size={12} className={loadingWebhooks ? "animate-spin" : ""} />
                     Refresh
                   </button>
                </div>
                <div className="divide-y divide-zinc-800/50">
                  {webhookEvents.length > 0 ? (
                    webhookEvents.map((event) => (
                      <div key={event.id} className="p-6 hover:bg-zinc-800/20 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500" />
                             <span className="font-mono text-xs text-emerald-400">
                               {event.payload?.event || 'Unknown Event'}
                             </span>
                           </div>
                           <span className="text-xs text-zinc-500">
                             {new Date(event.timestamp).toLocaleString()}
                           </span>
                        </div>
                        <pre className="bg-black/50 p-4 rounded text-xs text-zinc-400 font-mono overflow-x-auto">
                          {JSON.stringify(event.payload, null, 2)}
                        </pre>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-12 text-center text-zinc-500">
                      {loadingWebhooks ? 'Loading events...' : 'No webhook events received yet.'}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subValue, icon: Icon, color }: any) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-light text-white mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-xs text-zinc-500">{subValue}</p>
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
        active 
          ? 'border-cyan-400 text-white' 
          : 'border-transparent text-zinc-500 hover:text-zinc-300'
      }`}
    >
      {label}
    </button>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE':
    case 'RUNNING':
      return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    case 'PAUSED':
      return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
    case 'DRAFT':
      return 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
    case 'COMPLETED':
      return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    default:
      return 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
  }
}

function LeadStatusBadge({ status }: { status: string }) {
  let color = 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
  
  if (status === 'MESSAGE_REPLY') {
    color = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
  } else if (status === 'PENDING') {
    color = 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
  } else if (status === 'CONNECTED') {
    color = 'bg-blue-500/10 border-blue-500/20 text-blue-400';
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium border ${color}`}>
      {status?.replace('_', ' ') || 'UNKNOWN'}
    </span>
  );
}
