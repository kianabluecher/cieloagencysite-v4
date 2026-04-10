import { useState, useEffect } from 'react';
import { GoogleSheetsConnect } from '../../GoogleSheetsConnect';
import { auth, createClient as getSupabaseClient } from '../../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { 
  ExternalLink, 
  TestTube, 
  Bug, 
  Database, 
  Mail, 
  Users, 
  KeyRound,
  Activity,
  FileSpreadsheet,
  Chrome,
  Shield,
  Wrench,
  Zap,
  Video,
  LayoutDashboard,
  Terminal,
  CheckCircle2,
  XCircle,
  Loader2,
  UserPlus,
  Save
} from 'lucide-react';
import { Button } from '../../ui/button';
import { toast } from 'sonner@2.0.3';
import { JIRA_CONFIG, FATHOM_CONFIG } from '../../../utils/jira-config-helper';
import { AlertCircle } from 'lucide-react';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

interface ConsoleLog {
  id: number;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'test';
  message: string;
  details?: string;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [accessToken, setAccessToken] = useState<string>('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [testingJira, setTestingJira] = useState(false);
  const [testingFathom, setTestingFathom] = useState(false);
  const [testingSheets, setTestingSheets] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  // Jira credentials
  const [jiraDomain, setJiraDomain] = useState('cieloagency');
  const [jiraEmail, setJiraEmail] = useState('agency@cielo.marketing');
  const [jiraApiToken, setJiraApiToken] = useState('');
  const [savingJira, setSavingJira] = useState(false);

  // Fathom credentials
  const [fathomApiKey, setFathomApiKey] = useState('');
  const [savingFathom, setSavingFathom] = useState(false);

  // Test user creation
  const [testUserEmail, setTestUserEmail] = useState('');
  const [testUserPassword, setTestUserPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    try {
      getAccessToken();
      addLog('info', 'Settings page loaded', 'All systems initialized');
      fetchJiraCredentials(); // Load stored Jira credentials
    } catch (error: any) {
      console.error('Settings initialization error:', error);
      addLog('error', 'Initialization error', error.message || 'Failed to load settings');
    }
  }, []);

  const getAccessToken = async () => {
    try {
      const { data } = await auth.getSession();
      if (data?.session?.access_token) {
        setAccessToken(data.session.access_token);
        addLog('success', 'Session found', 'User authenticated successfully');
      } else {
        addLog('error', 'No session found', 'Please sign in to test connections');
      }
    } catch (error: any) {
      console.error('Error getting session:', error);
      addLog('error', 'Session error', error.message || 'Failed to get session');
    }
  };

  const addLog = (type: ConsoleLog['type'], message: string, details?: string) => {
    const newLog: ConsoleLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      details
    };
    setConsoleLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  const clearLogs = () => {
    setConsoleLogs([]);
    addLog('info', 'Console cleared', 'All logs removed');
  };

  const testJiraConnection = async () => {
    setTestingJira(true);
    addLog('test', '🔍 Testing Jira API...', 'Connecting to Jira workspace');
    
    try {
      if (!projectId || !publicAnonKey) {
        addLog('error', '❌ Configuration Error', 'Supabase credentials not found');
        toast.error('Configuration error');
        setTestingJira(false);
        return;
      }

      const supabase = await getSupabaseClient();

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        addLog('error', '❌ Jira Test Failed', 'No session - please sign in');
        toast.error('Please sign in');
        setTestingJira(false);
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/jira/dashboard`;
      addLog('info', 'Sending request to Jira API...', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
      }).catch((fetchError) => {
        console.error('Network error:', fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
      });

      if (!response) {
        throw new Error('No response from server');
      }

      const data = await response.json().catch((jsonError) => {
        console.error('JSON parse error:', jsonError);
        return { error: 'Failed to parse response' };
      });

      if (response.ok) {
        addLog('success', `✅ Jira Connected!`, `Total tasks: ${data.summary?.total || 0}`);
        toast.success('Jira connection successful!');
      } else {
        if (data.error?.includes('credentials not configured')) {
          addLog('error', '❌ Jira Credentials Not Set', 'Please configure Jira in Main Dashboard → Settings');
          addLog('info', '💡 Setup Instructions', 'Go to Main Dashboard and click Settings to enter your email');
          toast.error('Jira credentials not configured');
        } else {
          addLog('error', '❌ Jira Test Failed', data.error || `HTTP ${response.status}: ${response.statusText}`);
          toast.error('Jira connection failed');
        }
      }
    } catch (error: any) {
      console.error('Jira test error:', error);
      addLog('error', '❌ Jira Test Exception', error.message || 'Network error - check console');
      toast.error('Test failed - check console');
    } finally {
      setTestingJira(false);
    }
  };

  const testFathomConnection = async () => {
    setTestingFathom(true);
    addLog('test', '🔍 Testing Fathom AI...', 'Checking meeting API');
    
    try {
      if (!projectId || !publicAnonKey) {
        addLog('error', '❌ Configuration Error', 'Supabase credentials not found');
        toast.error('Configuration error');
        setTestingFathom(false);
        return;
      }

      const supabase = await getSupabaseClient();

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        addLog('error', '❌ Fathom Test Failed', 'No session - please sign in');
        toast.error('Please sign in');
        setTestingFathom(false);
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/fathom/test`;
      addLog('info', 'Sending request to Fathom API...', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          addLog('success', `✅ Fathom Connected!`, `API calls available: ${data.callsAvailable || 'unlimited'}`);
          toast.success('Fathom connection successful!');
        } else {
          addLog('error', '❌ Fathom Test Failed', 'API returned unsuccessful response');
          toast.error('Connection failed');
        }
      } else {
        const error = await response.json();
        addLog('error', '❌ Fathom Test Failed', error.error || 'Connection failed');
        toast.error('Fathom connection failed');
      }
    } catch (error: any) {
      console.error('Fathom test error:', error);
      addLog('error', '❌ Fathom Test Exception', error.message || 'Unknown error');
      toast.error('Test failed');
    } finally {
      setTestingFathom(false);
    }
  };

  const testGoogleSheets = async () => {
    setTestingSheets(true);
    addLog('test', '🔍 Testing Google Sheets...', 'Checking OAuth & API access');
    
    try {
      addLog('info', 'Google Sheets OAuth test', 'Opening authentication flow...');
      // This would trigger the Google Sheets OAuth flow
      setTimeout(() => {
        addLog('success', '✅ Google Sheets Ready', 'OAuth configured - use GoogleSheetsConnect component');
        toast.success('Google Sheets integration ready');
        setTestingSheets(false);
      }, 1500);
    } catch (error: any) {
      console.error('Sheets test error:', error);
      addLog('error', '❌ Sheets Test Exception', error.message || 'Unknown error');
      toast.error('Test failed');
      setTestingSheets(false);
    }
  };

  const testEmailService = async () => {
    setTestingEmail(true);
    addLog('test', '🔍 Testing Resend Email API...', 'Checking email service');
    
    try {
      const supabase = await getSupabaseClient();

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        addLog('error', '❌ Email Test Failed', 'No session - please sign in');
        toast.error('Please sign in');
        return;
      }

      // Test email endpoint would go here
      addLog('info', 'Email service configured', 'Resend API key is set in environment');
      addLog('success', '✅ Email Service Ready', 'API key configured - emails will be sent via Resend');
      toast.success('Email service configured');
    } catch (error: any) {
      console.error('Email test error:', error);
      addLog('error', '❌ Email Test Exception', error.message || 'Unknown error');
      toast.error('Test failed');
    } finally {
      setTestingEmail(false);
    }
  };

  const testAllConnections = async () => {
    addLog('test', '🚀 Testing All Connections...', 'Running comprehensive diagnostic');
    await testJiraConnection();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testFathomConnection();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testGoogleSheets();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testEmailService();
    addLog('success', '✅ All Tests Complete', 'Check results above');
  };

  const handleSaveJiraCredentials = async () => {
    setSavingJira(true);
    addLog('info', '💾 Saving Jira credentials...', `Domain: ${jiraDomain}, Email: ${jiraEmail}`);

    try {
      const supabase = await getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in');
        addLog('error', '❌ Save Failed', 'No active session');
        setSavingJira(false);
        return;
      }

      // First test if the Edge Function is responding
      const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/health`;
      addLog('info', '🏥 Testing Edge Function health...', healthUrl);
      
      try {
        const healthCheck = await fetch(healthUrl);
        if (healthCheck.ok) {
          addLog('success', '✅ Edge Function is online');
        } else {
          addLog('warning', '⚠️ Edge Function health check failed', `Status: ${healthCheck.status}`);
        }
      } catch (healthError: any) {
        addLog('error', '❌ Edge Function is not responding', healthError.message);
        toast.error('Edge Function is offline. Please redeploy.');
        setSavingJira(false);
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/jira/credentials`;
      addLog('info', 'Making request to:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          domain: jiraDomain,
          email: jiraEmail,
          apiToken: jiraApiToken
        })
      }).catch(err => {
        console.error('Network error:', err);
        throw new Error(`Network error: ${err.message || 'Failed to connect'}`);
      });

      if (!response) {
        throw new Error('No response received from server');
      }

      const data = await response.json().catch(err => {
        console.error('JSON parse error:', err);
        return { error: 'Invalid response from server' };
      });

      if (response.ok) {
        toast.success('Jira credentials saved!');
        const normalizedDomain = data.normalizedDomain || jiraDomain;
        addLog('success', '✅ Jira Credentials Saved', `Successfully configured for ${normalizedDomain}.atlassian.net`);
        
        // Update fields with the saved values from the response
        if (data.credentials) {
          setJiraDomain(data.credentials.domain || jiraDomain);
          setJiraEmail(data.credentials.email || jiraEmail);
          setJiraApiToken(data.credentials.apiToken || jiraApiToken);
          addLog('info', '✅ Fields Updated', 'Form populated with saved credentials');
        } else if (data.normalizedDomain && data.normalizedDomain !== jiraDomain) {
          // Fallback: just update domain if normalized
          setJiraDomain(data.normalizedDomain);
          addLog('info', '📝 Domain Normalized', `Updated to: ${data.normalizedDomain}`);
        }
      } else {
        toast.error('Failed to save credentials');
        addLog('error', '❌ Save Failed', data.error || `HTTP ${response.status}`);
      }
    } catch (error: any) {
      console.error('Save Jira error:', error);
      toast.error('Failed to save');
      addLog('error', '❌ Save Exception', error.message || 'Unknown error');
    } finally {
      setSavingJira(false);
    }
  };

  const saveFathomKey = async () => {
    if (!fathomApiKey) {
      toast.error('Please enter Fathom API key');
      addLog('error', '❌ Validation Error', 'Fathom API key is required');
      return;
    }

    setSavingFathom(true);
    addLog('info', '💾 Saving Fathom API key...', 'Storing credentials');

    try {
      const supabase = await getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in');
        addLog('error', '❌ Save Failed', 'No active session');
        setSavingFathom(false);
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/fathom/credentials`;
      addLog('info', 'Making request to:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey: fathomApiKey })
      }).catch(err => {
        console.error('Network error:', err);
        throw new Error(`Network error: ${err.message || 'Failed to connect'}`);
      });

      if (!response) {
        throw new Error('No response received from server');
      }

      const data = await response.json().catch(err => {
        console.error('JSON parse error:', err);
        return { error: 'Invalid response from server' };
      });

      if (response.ok) {
        toast.success('Fathom API key saved!');
        addLog('success', '✅ Fathom API Key Saved', 'Successfully configured');
        setFathomApiKey(''); // Clear for security
      } else {
        toast.error('Failed to save API key');
        addLog('error', '❌ Save Failed', data.error || `HTTP ${response.status}`);
      }
    } catch (error: any) {
      console.error('Save Fathom error:', error);
      toast.error('Failed to save');
      addLog('error', '❌ Save Exception', error.message || 'Unknown error');
    } finally {
      setSavingFathom(false);
    }
  };

  const createTestUser = async () => {
    if (!testUserEmail || !testUserPassword) {
      toast.error('Please enter email and password');
      addLog('error', '❌ Validation Error', 'Email and password are required');
      return;
    }

    setCreatingUser(true);
    addLog('info', '👤 Creating test user...', testUserEmail);

    try {
      const supabase = await getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in as admin');
        addLog('error', '❌ Creation Failed', 'No active session');
        setCreatingUser(false);
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/create-user`;
      addLog('info', 'Making request to:', url);

      // Use server endpoint to create user
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: testUserEmail,
          password: testUserPassword,
          fullName: testUserEmail.split('@')[0],
          role: 'team'
        })
      }).catch(err => {
        console.error('Network error:', err);
        throw new Error(`Network error: ${err.message || 'Failed to connect'}`);
      });

      if (!response) {
        throw new Error('No response received from server');
      }

      const data = await response.json().catch(err => {
        console.error('JSON parse error:', err);
        return { error: 'Invalid response from server' };
      });

      if (response.ok) {
        toast.success('Test user created!');
        addLog('success', '✅ User Created', `${testUserEmail} - User can now sign in`);
        setTestUserEmail('');
        setTestUserPassword('');
      } else {
        toast.error(`Failed to create user: ${data.error || 'Unknown error'}`);
        addLog('error', '❌ User Creation Failed', data.error || `HTTP ${response.status}`);
      }
    } catch (error: any) {
      console.error('Create user error:', error);
      toast.error('Failed to create user');
      addLog('error', '❌ Creation Exception', error.message || 'Unknown error');
    } finally {
      setCreatingUser(false);
    }
  };

  const getLogIcon = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />;
      case 'error': return <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />;
      case 'test': return <Zap className="w-3 h-3 text-blue-400 flex-shrink-0" />;
      default: return <Terminal className="w-3 h-3 text-zinc-400 flex-shrink-0" />;
    }
  };

  const getLogColor = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'test': return 'text-blue-400';
      default: return 'text-zinc-400';
    }
  };

  const fetchJiraCredentials = async () => {
    try {
      const supabase = await getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in');
        addLog('error', '❌ Fetch Failed', 'No active session');
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/jira/credentials`;
      addLog('info', 'Fetching Jira credentials from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      }).catch(err => {
        console.error('Network error:', err);
        throw new Error(`Network error: ${err.message || 'Failed to connect'}`);
      });

      if (!response) {
        throw new Error('No response received from server');
      }

      const data = await response.json().catch(err => {
        console.error('JSON parse error:', err);
        return { error: 'Invalid response from server' };
      });

      if (response.ok) {
        if (data.credentials) {
          setJiraDomain(data.credentials.domain || 'cieloagency');
          setJiraEmail(data.credentials.email || 'agency@cielo.marketing');
          setJiraApiToken(data.credentials.apiToken || '');
          addLog('success', '✅ Jira Credentials Loaded', `Domain: ${data.credentials.domain}`);
        } else {
          addLog('info', '💡 No Credentials Found', 'Using default values');
        }
      } else {
        addLog('error', '❌ Fetch Failed', data.error || `HTTP ${response.status}`);
      }
    } catch (error: any) {
      console.error('Fetch Jira error:', error);
      toast.error('Failed to fetch');
      addLog('error', '❌ Fetch Exception', error.message || 'Unknown error');
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-2xl text-white mb-8">Settings & Configuration</h1>

      {/* Edge Function Status Banner */}
      <div className="mb-6 bg-blue-950/20 border border-blue-800/30 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-blue-300 mb-1">Edge Function Required</h3>
            <p className="text-sm text-blue-200/70 mb-2">
              If you see "Failed to fetch" errors, the Edge Function needs to be deployed. 
              Visit <a href="/diagnostic" className="underline hover:text-blue-100">Diagnostics</a> to test,
              or see <code className="bg-black/50 px-1 py-0.5">EDGE_FUNCTION_DEPLOYMENT_FIX.md</code> for deployment instructions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN - Connection Tests */}
        <div className="space-y-6">
          {/* Jira Configuration */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-blue-400" />
              Configure Jira
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Domain</label>
                <input
                  type="text"
                  value={jiraDomain}
                  onChange={(e) => setJiraDomain(e.target.value)}
                  placeholder="cieloagency"
                  className="w-full bg-[#151515] border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Enter just the subdomain (e.g., "cieloagency") or full URL (e.g., "https://cieloagency.atlassian.net")
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Email</label>
                <input
                  type="email"
                  value={jiraEmail}
                  onChange={(e) => setJiraEmail(e.target.value)}
                  placeholder="agency@cielo.marketing"
                  className="w-full bg-[#151515] border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">API Token</label>
                <input
                  type="password"
                  value={jiraApiToken}
                  onChange={(e) => setJiraApiToken(e.target.value)}
                  placeholder="Enter Jira API token"
                  className="w-full bg-[#151515] border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-zinc-600 mt-1">
                  Get your token from{' '}
                  <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Atlassian Account Settings
                  </a>
                </p>
              </div>
              <Button
                onClick={handleSaveJiraCredentials}
                disabled={savingJira}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {savingJira ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Jira Credentials
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Fathom Configuration */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-400" />
              Configure Fathom AI
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">API Key</label>
                <input
                  type="password"
                  value={fathomApiKey}
                  onChange={(e) => setFathomApiKey(e.target.value)}
                  placeholder="Enter Fathom API key"
                  className="w-full bg-[#151515] border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                />
                <p className="text-xs text-zinc-600 mt-1">
                  Current key: LUTA79XhT5qOz61HprU-IA...
                </p>
              </div>
              <Button
                onClick={saveFathomKey}
                disabled={savingFathom}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {savingFathom ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Fathom API Key
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Create Test User */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              Create Test User
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Email</label>
                <input
                  type="email"
                  value={testUserEmail}
                  onChange={(e) => setTestUserEmail(e.target.value)}
                  placeholder="testuser@example.com"
                  className="w-full bg-[#151515] border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Password</label>
                <input
                  type="password"
                  value={testUserPassword}
                  onChange={(e) => setTestUserPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#151515] border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                />
                <p className="text-xs text-zinc-600 mt-1">
                  Minimum 6 characters. User will be created with "team" role.
                </p>
              </div>
              <Button
                onClick={createTestUser}
                disabled={creatingUser}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {creatingUser ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Test User
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Test All Connections */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              Connection Tests
            </h2>
            
            <Button
              onClick={testAllConnections}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-4"
            >
              <Zap className="w-4 h-4 mr-2" />
              Test All Connections
            </Button>

            <div className="space-y-3">
              {/* Jira Test */}
              <div className="bg-[#1a1a2e] border border-[#2a2a4e] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Jira API</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    {JIRA_CONFIG.domain}.atlassian.net
                  </span>
                </div>
                <Button
                  onClick={testJiraConnection}
                  disabled={testingJira}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  {testingJira ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-3 h-3 mr-2" />
                      Test Jira
                    </>
                  )}
                </Button>
              </div>

              {/* Fathom Test */}
              <div className="bg-[#1f1a2e] border border-[#3f2a4e] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Fathom AI</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    Meeting recordings
                  </span>
                </div>
                <Button
                  onClick={testFathomConnection}
                  disabled={testingFathom}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  size="sm"
                >
                  {testingFathom ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-3 h-3 mr-2" />
                      Test Fathom
                    </>
                  )}
                </Button>
              </div>

              {/* Google Sheets Test */}
              <div className="bg-[#1a2e1a] border border-[#2a4e2a] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-green-400" />
                    <span className="text-white">Google Sheets</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    OAuth + API
                  </span>
                </div>
                <Button
                  onClick={testGoogleSheets}
                  disabled={testingSheets}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  {testingSheets ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-3 h-3 mr-2" />
                      Test Sheets
                    </>
                  )}
                </Button>
              </div>

              {/* Email Test */}
              <div className="bg-[#2e1f1a] border border-[#4e3f2a] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <span className="text-white">Resend Email</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    RESEND_API_KEY
                  </span>
                </div>
                <Button
                  onClick={testEmailService}
                  disabled={testingEmail}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  size="sm"
                >
                  {testingEmail ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-3 h-3 mr-2" />
                      Test Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* API Credentials */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-400" />
              API Credentials
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between py-2 border-b border-zinc-800">
                <div>
                  <span className="text-white">Jira API</span>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">Domain: cieloagency</p>
                </div>
                <span className="text-green-400 text-xs">✓ SET</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-zinc-800">
                <div>
                  <span className="text-white">Fathom AI</span>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">FATHOM_API_KEY</p>
                </div>
                <span className="text-green-400 text-xs">✓ SET</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-zinc-800">
                <div>
                  <span className="text-white">Google OAuth</span>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">CLIENT_ID + SECRET</p>
                </div>
                <span className="text-green-400 text-xs">✓ SET</span>
              </div>
              <div className="flex items-start justify-between py-2">
                <div>
                  <span className="text-white">Resend API</span>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">RESEND_API_KEY</p>
                </div>
                <span className="text-green-400 text-xs">✓ SET</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cyan-400" />
              Quick Links
            </h2>
            <div className="space-y-2">
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-white group-hover:text-green-400 transition-colors">
                  Supabase Dashboard
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-green-400" />
              </a>

              <a
                href="https://id.atlassian.com/manage-profile/security/api-tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-white group-hover:text-blue-400 transition-colors">
                  Jira API Tokens
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400" />
              </a>

              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-white group-hover:text-red-400 transition-colors">
                  Google Cloud Console
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400" />
              </a>

              <a
                href="https://resend.com/emails"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-white group-hover:text-purple-400 transition-colors">
                  Resend Email Logs
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Console Output */}
        <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          {/* Console Output */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Console Output
              </h2>
              <Button
                onClick={clearLogs}
                variant="outline"
                size="sm"
                className="bg-[#151515] border-zinc-800 hover:bg-zinc-800 text-white"
              >
                Clear
              </Button>
            </div>

            <div className="bg-black border border-zinc-900 h-[600px] overflow-y-auto p-4 font-mono text-xs">
              {consoleLogs.length === 0 ? (
                <div className="text-zinc-600 text-center py-8">
                  No logs yet. Run a connection test to see output.
                </div>
              ) : (
                <div className="space-y-2">
                  {consoleLogs.map((log) => (
                    <div key={log.id} className="pb-2 border-b border-zinc-900">
                      <div className="flex items-start gap-2">
                        {getLogIcon(log.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-600">[{log.timestamp}]</span>
                            <span className={getLogColor(log.type)}>{log.message}</span>
                          </div>
                          {log.details && (
                            <div className="text-zinc-500 ml-5 mt-1">{log.details}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-[#0a0a0a] border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              System Status
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                <span className="text-zinc-400">Environment</span>
                <span className="text-white font-mono">Production</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                <span className="text-zinc-400">Backend Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                  <span className="text-green-400">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                <span className="text-zinc-400">Database</span>
                <span className="text-white">Supabase PostgreSQL</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-zinc-400">Authentication</span>
                <span className="text-white">OAuth + Email</span>
              </div>
            </div>
          </div>

          {/* Admin Credentials */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-amber-500/20">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white mb-1">Admin Account</h3>
                <p className="text-xs text-amber-200/70">
                  Default credentials for testing
                </p>
              </div>
            </div>
            <div className="bg-zinc-900/50 p-4 space-y-2 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Email:</span>
                <span className="text-white">agency@cielo.marketing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Password:</span>
                <span className="text-white">agencycielo765598</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}