import { useEffect, useState } from 'react';
import { RefreshCw, TrendingUp, Users, MousePointer, ArrowRight, Clock, ExternalLink, BarChart3 } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface FunnelAnalyticsProps {
  onNavigate: (page: string) => void;
}

interface FunnelStep {
  action_id: string;
  name: string;
  custom_name: string | null;
  order: number;
  people: any[];
  count: number;
  type: string;
  average_conversion_time: number | null;
  median_conversion_time: number | null;
}

export function FunnelAnalytics({ onNavigate }: FunnelAnalyticsProps) {
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<FunnelStep[] | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const funnelQuery = {
    kind: "FunnelsQuery",
    series: [
      {
        kind: "EventsNode",
        name: "$pageview",
        event: "$pageview",
        properties: [
          {
            key: "$current_url",
            type: "event",
            value: "https://www.cielo.agency/lp-brandaudit",
            operator: "icontains"
          }
        ]
      },
      {
        kind: "EventsNode",
        name: "$pageview",
        event: "$pageview",
        properties: [
          {
            key: "$current_url",
            type: "event",
            value: "https://www.cielo.agency/lp-brandaudit-offer",
            operator: "icontains"
          }
        ]
      },
      {
        kind: "EventsNode",
        name: "Pageview",
        event: "$pageview",
        properties: [
          {
            key: "$current_url",
            type: "event",
            value: "https://www.cielo.agency/lp-brandaudit-strategy",
            operator: "icontains"
          }
        ]
      }
    ],
    funnelsFilter: {
      funnelVizType: "steps"
    }
  };

  const cachedResults = {
    results: [
      {
        action_id: "$pageview",
        name: "$pageview",
        custom_name: null,
        order: 0,
        people: [],
        count: 1,
        type: "events",
        average_conversion_time: null,
        median_conversion_time: null
      },
      {
        action_id: "$pageview",
        name: "$pageview",
        custom_name: null,
        order: 1,
        people: [],
        count: 1,
        type: "events",
        average_conversion_time: 12.484999895095825,
        median_conversion_time: 12.484999895095825
      },
      {
        action_id: "$pageview",
        name: "$pageview",
        custom_name: null,
        order: 2,
        people: [],
        count: 1,
        type: "events",
        average_conversion_time: 24.211000204086304,
        median_conversion_time: 24.211000204086304
      }
    ]
  };

  const fetchLiveData = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session. Please log in.');
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/analytics/posthog/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: funnelQuery,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      console.log('Latest results', data);
      
      if (data.results) {
        setLiveData(data.results);
        setLastRefresh(new Date());
      }
    } catch (err) {
      console.error('Error fetching live data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch live data');
    } finally {
      setLoading(false);
    }
  };

  const calculateConversionRate = (current: number, total: number) => {
    if (total === 0) return 0;
    return ((current / total) * 100).toFixed(1);
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return 'N/A';
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    return `${(seconds / 60).toFixed(1)}m`;
  };

  const dataToDisplay = liveData || cachedResults.results;
  const totalVisitors = dataToDisplay[0]?.count || 0;
  const step2Count = dataToDisplay[1]?.count || 0;
  const step3Count = dataToDisplay[2]?.count || 0;
  const overallConversion = calculateConversionRate(step3Count, totalVisitors);

  const stepLabels = [
    { title: 'Landing Page', url: 'lp-brandaudit' },
    { title: 'Offer Page', url: 'lp-brandaudit-offer' },
    { title: 'Strategy Page', url: 'lp-brandaudit-strategy' }
  ];

  return (
    <div className="p-6" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2 tracking-wide">Funnel Analytics</h1>
          <p className="text-zinc-500">
            Brand Audit Funnel Performance • Track conversion rates across landing pages
          </p>
        </div>
        <button
          onClick={fetchLiveData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} strokeWidth={1.5} />
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-900/50 text-red-400 text-sm">
          <strong>Error:</strong> {error}
          <p className="mt-2 text-xs text-red-300">Make sure your POSTHOG_API_KEY environment variable is set correctly.</p>
        </div>
      )}

      {lastRefresh && (
        <div className="mb-6 px-4 py-2.5 bg-green-950/30 border border-green-900/30 text-green-400 text-xs font-['Geist_Mono']">
          Last refreshed: {lastRefresh.toLocaleTimeString()} • <button onClick={fetchLiveData} className="underline hover:text-green-300">Refresh now</button>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Total Visitors</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">{totalVisitors}</p>
          <p className="text-xs text-zinc-600">Landing Page Views</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <MousePointer size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Step 2 Reached</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">{step2Count}</p>
          <p className="text-xs text-green-500">{calculateConversionRate(step2Count, totalVisitors)}% conversion</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Completed Funnel</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">{step3Count}</p>
          <p className="text-xs text-green-500">{calculateConversionRate(step3Count, step2Count)}% from step 2</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Overall Rate</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">{overallConversion}%</p>
          <p className="text-xs text-zinc-600">End-to-end</p>
        </div>
      </div>

      {/* Visual Funnel */}
      <div className="mb-8 bg-zinc-950 border border-zinc-800 p-8">
        <h2 className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-8">Conversion Funnel</h2>
        
        <div className="space-y-6">
          {dataToDisplay.map((step, index) => {
            const percentage = totalVisitors > 0 ? (step.count / totalVisitors) * 100 : 100;
            const conversionFromPrevious = index === 0 
              ? 100 
              : calculateConversionRate(step.count, dataToDisplay[index - 1].count);
            const dropoff = index === 0 
              ? 0 
              : dataToDisplay[index - 1].count - step.count;

            return (
              <div key={step.order}>
                {/* Funnel Bar */}
                <div className="mb-3">
                  <div 
                    className="h-16 flex items-center justify-between px-6 transition-all duration-500 relative"
                    style={{ 
                      width: `${Math.max(percentage, 20)}%`,
                      backgroundColor: '#004CFF',
                      clipPath: index === 0 
                        ? 'none' 
                        : 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-['Geist_Mono'] text-white/60">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {stepLabels[index].title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-light text-white">
                        {step.count} {step.count === 1 ? 'person' : 'persons'}
                      </span>
                      <span className="text-sm font-['Geist_Mono'] text-white/80">
                        ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Details */}
                <div className="ml-6 mb-4 flex items-center gap-6 text-xs text-zinc-500">
                  {index > 0 && (
                    <>
                      <div className="flex items-center gap-2">
                        <ArrowRight size={12} className="text-green-500" strokeWidth={1.5} />
                        <span className="font-['Geist_Mono']">{conversionFromPrevious}% conversion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={12} className="text-red-500" strokeWidth={1.5} />
                        <span className="font-['Geist_Mono']">{dropoff} drop-off</span>
                      </div>
                    </>
                  )}
                  {step.average_conversion_time && (
                    <div className="flex items-center gap-2">
                      <Clock size={12} strokeWidth={1.5} />
                      <span className="font-['Geist_Mono']">Avg: {formatTime(step.average_conversion_time)}</span>
                    </div>
                  )}
                </div>

                {/* Connector Arrow */}
                {index < dataToDisplay.length - 1 && (
                  <div className="ml-6 mb-2">
                    <ArrowRight size={16} className="text-zinc-700" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tracked Events Table */}
      <div className="mb-6 bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/50">
          <h2 className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">PostHog Tracked Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800/50">
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Event Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Description
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <code className="text-xs font-['Geist_Mono'] text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                    $pageview
                  </code>
                </td>
                <td className="px-6 py-5">
                  <span className="text-white text-sm">Automatic page view tracking</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1.5 border text-xs bg-zinc-900/50 text-zinc-400 border-zinc-800/50">
                    <span className="font-['Geist_Mono'] tracking-wide">Automatic</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <code className="text-xs font-['Geist_Mono'] text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                    brand_audit_landing_form_submitted
                  </code>
                </td>
                <td className="px-6 py-5">
                  <span className="text-white text-sm">Landing page form submission</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1.5 border text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    <span className="font-['Geist_Mono'] tracking-wide">Custom</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <code className="text-xs font-['Geist_Mono'] text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                    brand_audit_offer_form_submitted
                  </code>
                </td>
                <td className="px-6 py-5">
                  <span className="text-white text-sm">Offer page form submission</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1.5 border text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    <span className="font-['Geist_Mono'] tracking-wide">Custom</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <code className="text-xs font-['Geist_Mono'] text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                    brand_audit_funnel_step_completed
                  </code>
                </td>
                <td className="px-6 py-5">
                  <span className="text-white text-sm">Funnel progression tracking</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1.5 border text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    <span className="font-['Geist_Mono'] tracking-wide">Custom</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links Table */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/50">
          <h2 className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">PostHog Quick Links</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800/50">
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Resource
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Description
                </th>
                <th className="text-right px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-white text-sm">PostHog Dashboard</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-zinc-400 text-sm">Main analytics dashboard with all insights</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <a
                    href="https://us.posthog.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-white hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    <span>Open</span>
                  </a>
                </td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-white text-sm">Insights</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-zinc-400 text-sm">Custom reports and data visualization</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <a
                    href="https://us.posthog.com/insights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-white hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    <span>Open</span>
                  </a>
                </td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-white text-sm">Event Explorer</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-zinc-400 text-sm">Browse and analyze all tracked events</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <a
                    href="https://us.posthog.com/events"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-white hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    <span>Open</span>
                  </a>
                </td>
              </tr>
              <tr className="hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-white text-sm">User Profiles</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-zinc-400 text-sm">Individual user behavior and analytics</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <a
                    href="https://us.posthog.com/persons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-white hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    <span>Open</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}