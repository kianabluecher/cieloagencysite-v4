import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface DiscoveryTestProps {
  onNavigate: (page: string) => void;
}

export function DiscoveryTest({ onNavigate }: DiscoveryTestProps) {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testDiscoveryAPI = async () => {
    setLoading(true);
    setTestResult('Testing API connection...\n');

    try {
      // Test data
      const testData = {
        hasBusinessNeed: 'yes',
        companyName: 'Test Company',
        industry: 'Technology',
        budget: '$10K - $25K',
        timeline: '1-3 months',
        services: ['Brand Strategy', 'Development'],
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        message: 'This is a test submission'
      };

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/discovery/submit`;
      
      setTestResult(prev => prev + `\n📡 Sending request to:\n${url}\n\n`);
      setTestResult(prev => prev + `📦 Test Data:\n${JSON.stringify(testData, null, 2)}\n\n`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(testData),
      });

      setTestResult(prev => prev + `\n📥 Response Status: ${response.status} ${response.statusText}\n\n`);

      if (!response.ok) {
        const error = await response.json();
        setTestResult(prev => prev + `❌ Error Response:\n${JSON.stringify(error, null, 2)}\n`);
      } else {
        const result = await response.json();
        setTestResult(prev => prev + `✅ Success Response:\n${JSON.stringify(result, null, 2)}\n\n`);
        setTestResult(prev => prev + `✅ API Connection Working! Form submission successful.\n`);
      }
    } catch (error) {
      setTestResult(prev => prev + `\n💥 Network Error:\n${error}\n`);
    } finally {
      setLoading(false);
    }
  };

  const testGetSubmissions = async () => {
    setLoading(true);
    setTestResult('Testing GET submissions endpoint...\n');

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/discovery/submissions`;
      
      setTestResult(prev => prev + `\n📡 Sending GET request to:\n${url}\n\n`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      setTestResult(prev => prev + `\n📥 Response Status: ${response.status} ${response.statusText}\n\n`);

      if (!response.ok) {
        const error = await response.json();
        setTestResult(prev => prev + `❌ Error Response:\n${JSON.stringify(error, null, 2)}\n`);
      } else {
        const result = await response.json();
        setTestResult(prev => prev + `✅ Success Response:\n`);
        setTestResult(prev => prev + `Found ${result.submissions?.length || 0} submissions\n\n`);
        if (result.submissions && result.submissions.length > 0) {
          setTestResult(prev => prev + `Latest submissions:\n${JSON.stringify(result.submissions.slice(0, 3), null, 2)}\n`);
        }
      }
    } catch (error) {
      setTestResult(prev => prev + `\n💥 Network Error:\n${error}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl">Discovery Form API Test</h1>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 border border-[#333] text-white hover:bg-white/5 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg">
            <h2 className="text-xl mb-4">API Configuration</h2>
            <div className="space-y-2 font-['Geist_Mono'] text-sm">
              <p><span className="text-zinc-400">Project ID:</span> {projectId}</p>
              <p><span className="text-zinc-400">Anon Key:</span> {publicAnonKey.substring(0, 20)}...</p>
              <p><span className="text-zinc-400">Endpoint:</span> /make-server-27c238f7/discovery/submit</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={testDiscoveryAPI}
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-['Geist_Mono'] text-sm tracking-[1.5px] uppercase transition-colors disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Submit Form'}
            </button>
            
            <button
              onClick={testGetSubmissions}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-['Geist_Mono'] text-sm tracking-[1.5px] uppercase transition-colors disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Get Submissions'}
            </button>
          </div>
        </div>

        {testResult && (
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg">
            <h2 className="text-xl mb-4">Test Results</h2>
            <pre className="whitespace-pre-wrap font-['Geist_Mono'] text-sm text-zinc-300 overflow-x-auto">
              {testResult}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
          <h3 className="text-yellow-400 mb-2">⚠️ Important Notes</h3>
          <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
            <li>The form stores data in KV store with prefix: <code className="bg-black/50 px-2 py-1 rounded">discovery:submission:</code></li>
            <li>Emails are sent via Resend API to admin@cielo.marketing</li>
            <li>Confirmation emails are sent to the submitter</li>
            <li>Check browser console for detailed logs</li>
            <li>Check Supabase Edge Function logs for server-side logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
