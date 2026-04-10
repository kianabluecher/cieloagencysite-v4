import { useState, useEffect, useRef } from 'react';
import { Play, Terminal, RefreshCw, Trash2, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface ConsoleLog {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'error' | 'request' | 'response';
  message: string;
  data?: any;
}

interface FunctionDefinition {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  category: 'automation' | 'integration' | 'data' | 'email';
  parameters?: { name: string; type: string; required: boolean; default?: any; description?: string }[];
  examplePayload?: any;
}

interface FunctionsAutomationProps {
  onNavigate: (page: string) => void;
}

export function FunctionsAutomation({ onNavigate }: FunctionsAutomationProps) {
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<FunctionDefinition | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['automation', 'integration', 'data', 'email']);
  const [requestBody, setRequestBody] = useState<string>('{}');
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Define all available functions
  const functions: FunctionDefinition[] = [
    {
      id: 'elle-workflow',
      name: 'ELLE Workflow',
      description: 'Trigger ELLE automation workflow',
      endpoint: '/elle/workflow',
      method: 'POST',
      category: 'automation',
      parameters: [
        { name: 'action', type: 'string', required: true, description: 'Workflow action to trigger' },
        { name: 'data', type: 'object', required: false, description: 'Additional workflow data' }
      ],
      examplePayload: { action: 'test', data: {} }
    },
    {
      id: 'heyreach-campaigns',
      name: 'HeyReach Campaigns',
      description: 'Get HeyReach campaign data',
      endpoint: '/heyreach/campaigns',
      method: 'GET',
      category: 'integration',
      parameters: [],
      examplePayload: {}
    },
    {
      id: 'heyreach-lists',
      name: 'HeyReach Lists',
      description: 'Get HeyReach list data',
      endpoint: '/heyreach/lists',
      method: 'GET',
      category: 'integration',
      parameters: [],
      examplePayload: {}
    },
    {
      id: 'portfolio-sync',
      name: 'Portfolio Sync',
      description: 'Sync portfolio data with external sources',
      endpoint: '/portfolio/sync',
      method: 'POST',
      category: 'data',
      parameters: [
        { name: 'source', type: 'string', required: true, description: 'Data source to sync from' }
      ],
      examplePayload: { source: 'notion' }
    },
    {
      id: 'email-send',
      name: 'Send Email',
      description: 'Send email via email service',
      endpoint: '/email/send',
      method: 'POST',
      category: 'email',
      parameters: [
        { name: 'to', type: 'string', required: true, description: 'Recipient email address' },
        { name: 'subject', type: 'string', required: true, description: 'Email subject' },
        { name: 'template', type: 'string', required: false, description: 'Email template ID' },
        { name: 'data', type: 'object', required: false, description: 'Template data' }
      ],
      examplePayload: { to: 'test@example.com', subject: 'Test Email', template: 'welcome', data: {} }
    },
    {
      id: 'google-sheets-read',
      name: 'Google Sheets Read',
      description: 'Read data from Google Sheets',
      endpoint: '/google-sheets/read',
      method: 'POST',
      category: 'integration',
      parameters: [
        { name: 'spreadsheetId', type: 'string', required: true, description: 'Google Sheets ID' },
        { name: 'range', type: 'string', required: true, description: 'Sheet range to read' }
      ],
      examplePayload: { spreadsheetId: 'your-sheet-id', range: 'Sheet1!A1:Z100' }
    },
    {
      id: 'google-sheets-write',
      name: 'Google Sheets Write',
      description: 'Write data to Google Sheets',
      endpoint: '/google-sheets/write',
      method: 'POST',
      category: 'integration',
      parameters: [
        { name: 'spreadsheetId', type: 'string', required: true, description: 'Google Sheets ID' },
        { name: 'range', type: 'string', required: true, description: 'Sheet range to write' },
        { name: 'values', type: 'array', required: true, description: 'Data to write' }
      ],
      examplePayload: { spreadsheetId: 'your-sheet-id', range: 'Sheet1!A1', values: [['Name', 'Email'], ['Test', 'test@example.com']] }
    },
    {
      id: 'jira-create-issue',
      name: 'Jira Create Issue',
      description: 'Create a new Jira issue',
      endpoint: '/jira/create-issue',
      method: 'POST',
      category: 'integration',
      parameters: [
        { name: 'project', type: 'string', required: true, description: 'Jira project key' },
        { name: 'summary', type: 'string', required: true, description: 'Issue summary' },
        { name: 'description', type: 'string', required: false, description: 'Issue description' },
        { name: 'issueType', type: 'string', required: false, default: 'Task', description: 'Issue type' }
      ],
      examplePayload: { project: 'CIELO', summary: 'Test Issue', description: 'This is a test', issueType: 'Task' }
    },
    {
      id: 'fathom-stats',
      name: 'Fathom Analytics',
      description: 'Get Fathom analytics data',
      endpoint: '/fathom/stats',
      method: 'GET',
      category: 'integration',
      parameters: [
        { name: 'siteId', type: 'string', required: true, description: 'Fathom site ID' },
        { name: 'dateFrom', type: 'string', required: false, description: 'Start date (YYYY-MM-DD)' },
        { name: 'dateTo', type: 'string', required: false, description: 'End date (YYYY-MM-DD)' }
      ],
      examplePayload: { siteId: 'your-site-id', dateFrom: '2025-01-01', dateTo: '2025-02-01' }
    },
  ];

  // Group functions by category
  const functionsByCategory = functions.reduce((acc, func) => {
    if (!acc[func.category]) {
      acc[func.category] = [];
    }
    acc[func.category].push(func);
    return acc;
  }, {} as Record<string, FunctionDefinition[]>);

  const categoryLabels = {
    automation: 'Automation',
    integration: 'Integrations',
    data: 'Data Management',
    email: 'Email'
  };

  useEffect(() => {
    // Auto scroll to bottom when new logs are added
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: ConsoleLog['type'], message: string, data?: any) => {
    const newLog: ConsoleLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type,
      message,
      data
    };
    setLogs(prev => [...prev, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('info', 'Console cleared');
  };

  const copyLog = (log: ConsoleLog) => {
    const logText = `[${log.timestamp.toISOString()}] [${log.type.toUpperCase()}] ${log.message}${
      log.data ? '\n' + JSON.stringify(log.data, null, 2) : ''
    }`;
    navigator.clipboard.writeText(logText);
    setCopiedLogId(log.id);
    setTimeout(() => setCopiedLogId(null), 2000);
    toast.success('Log copied to clipboard');
  };

  const runFunction = async (func: FunctionDefinition) => {
    setIsRunning(true);
    addLog('info', `Starting execution: ${func.name}`);
    
    try {
      const body = func.method !== 'GET' ? JSON.parse(requestBody) : undefined;
      
      addLog('request', `${func.method} ${func.endpoint}`, body);

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7${func.endpoint}`;
      
      const options: RequestInit = {
        method: func.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const startTime = Date.now();
      const response = await fetch(url, options);
      const duration = Date.now() - startTime;

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        const text = await response.text();
        responseData = { text };
      }

      if (response.ok) {
        addLog('success', `✓ Request completed in ${duration}ms`, responseData);
        addLog('response', `Status: ${response.status} ${response.statusText}`, responseData);
        toast.success(`${func.name} executed successfully`);
      } else {
        addLog('error', `✗ Request failed: ${response.status} ${response.statusText}`, responseData);
        toast.error(`${func.name} failed: ${response.statusText}`);
      }
    } catch (error: any) {
      addLog('error', `✗ Exception: ${error.message}`, { error: error.toString() });
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getLogColor = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'request':
        return 'text-blue-400';
      case 'response':
        return 'text-purple-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getLogIcon = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'request':
        return '→';
      case 'response':
        return '←';
      default:
        return '•';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0A0B]">
      {/* Header */}
      <div className="px-8 py-6 border-b border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-white mb-2">Functions & Automations</h1>
            <p className="text-sm text-zinc-400">Test and monitor server functions in real-time</p>
          </div>
          <button
            onClick={clearLogs}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors border border-zinc-800"
          >
            <Trash2 size={16} />
            Clear Console
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Functions List */}
        <div className="w-80 border-r border-zinc-800/50 overflow-y-auto bg-zinc-950/50">
          <div className="p-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">Available Functions</h2>
            
            {Object.entries(functionsByCategory).map(([category, funcs]) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-lg transition-colors mb-2"
                >
                  {expandedCategories.includes(category) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  <span className="font-medium">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                  <span className="ml-auto text-xs text-zinc-500">{funcs.length}</span>
                </button>
                
                {expandedCategories.includes(category) && (
                  <div className="space-y-1 ml-4">
                    {funcs.map(func => (
                      <button
                        key={func.id}
                        onClick={() => {
                          setSelectedFunction(func);
                          setRequestBody(JSON.stringify(func.examplePayload || {}, null, 2));
                          addLog('info', `Selected function: ${func.name}`);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedFunction?.id === func.id
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                            func.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                            func.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                            func.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {func.method}
                          </span>
                        </div>
                        <div className="text-sm font-medium">{func.name}</div>
                        <div className="text-xs text-zinc-500 mt-1">{func.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Function Details & Console */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFunction ? (
            <>
              {/* Function Details */}
              <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-medium text-white mb-2">{selectedFunction.name}</h2>
                    <p className="text-sm text-zinc-400 mb-3">{selectedFunction.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`font-mono px-2 py-1 rounded ${
                        selectedFunction.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                        selectedFunction.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                        selectedFunction.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedFunction.method}
                      </span>
                      <span className="font-mono text-zinc-500">{selectedFunction.endpoint}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => runFunction(selectedFunction)}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        Run Function
                      </>
                    )}
                  </button>
                </div>

                {/* Parameters */}
                {selectedFunction.parameters && selectedFunction.parameters.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">Parameters</h3>
                    <div className="space-y-2">
                      {selectedFunction.parameters.map(param => (
                        <div key={param.name} className="flex items-start gap-3 text-sm">
                          <span className={`font-mono px-2 py-0.5 rounded text-xs ${
                            param.required ? 'bg-red-500/20 text-red-400' : 'bg-zinc-700 text-zinc-400'
                          }`}>
                            {param.required ? 'Required' : 'Optional'}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-white">{param.name}</span>
                              <span className="text-zinc-500">({param.type})</span>
                            </div>
                            {param.description && (
                              <p className="text-xs text-zinc-500 mt-1">{param.description}</p>
                            )}
                            {param.default !== undefined && (
                              <p className="text-xs text-zinc-600 mt-1">Default: {JSON.stringify(param.default)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Request Body Editor */}
                {selectedFunction.method !== 'GET' && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">Request Body</h3>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="w-full h-32 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Enter request body JSON..."
                    />
                  </div>
                )}
              </div>

              {/* Live Console */}
              <div className="flex-1 flex flex-col overflow-hidden bg-black">
                <div className="px-6 py-3 border-b border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-zinc-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Live Console</span>
                    <span className="text-xs text-zinc-600">({logs.length} logs)</span>
                  </div>
                  <button
                    onClick={clearLogs}
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div
                  ref={consoleRef}
                  className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs"
                >
                  {logs.length === 0 ? (
                    <div className="text-zinc-600 text-center py-8">
                      No logs yet. Select and run a function to see output.
                    </div>
                  ) : (
                    logs.map(log => (
                      <div
                        key={log.id}
                        className="group flex items-start gap-3 hover:bg-zinc-900/30 px-2 py-1 rounded"
                      >
                        <span className="text-zinc-600 shrink-0">
                          {log.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}
                        </span>
                        <span className={`${getLogColor(log.type)} shrink-0`}>
                          {getLogIcon(log.type)}
                        </span>
                        <span className={`flex-1 ${getLogColor(log.type)}`}>
                          {log.message}
                          {log.data && (
                            <pre className="mt-1 text-zinc-500 text-xs overflow-x-auto">
                              {JSON.stringify(log.data, null, 2)}
                            </pre>
                          )}
                        </span>
                        <button
                          onClick={() => copyLog(log)}
                          className="opacity-0 group-hover:opacity-100 shrink-0 p-1 hover:bg-zinc-800 rounded transition-all"
                        >
                          {copiedLogId === log.id ? (
                            <Check size={14} className="text-green-400" />
                          ) : (
                            <Copy size={14} className="text-zinc-500" />
                          )}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-600">
              <div className="text-center">
                <Terminal size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Select a function from the list to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}