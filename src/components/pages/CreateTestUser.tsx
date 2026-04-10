import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CreateTestUserProps {
  onNavigate: (page: string) => void;
}

export function CreateTestUser({ onNavigate }: CreateTestUserProps) {
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [confirmResult, setConfirmResult] = useState<any>(null);
  const [emailToConfirm, setEmailToConfirm] = useState('');

  const createUser = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/create-test-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: 'agency@cielo.marketing',
            password: 'agencycielo765598',
            fullName: 'CIELO Agency'
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setResult(data);
      toast.success('Test user created successfully!');
    } catch (error: any) {
      console.error('Error creating test user:', error);
      setResult({ error: error.message });
      toast.error(error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const confirmEmail = async () => {
    if (!emailToConfirm) {
      toast.error('Please enter an email address');
      return;
    }

    setConfirmLoading(true);
    setConfirmResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/confirm-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: emailToConfirm
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm email');
      }

      setConfirmResult(data);
      toast.success('Email confirmed successfully!');
    } catch (error: any) {
      console.error('Error confirming email:', error);
      setConfirmResult({ error: error.message });
      toast.error(error.message || 'Failed to confirm email');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-4">CIELO</h1>
          <h2 className="text-2xl mb-2">Create Test User</h2>
          <p className="text-white/50 text-sm">
            This will create a test user for the team dashboard
          </p>
        </div>

        <div className="space-y-6">
          {/* Create New User Section */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-3">
            <h3 className="font-medium">Create New User (Recommended)</h3>
            <div className="text-sm text-white/70 space-y-1">
              <p><strong>Email:</strong> agency@cielo.marketing</p>
              <p><strong>Password:</strong> agencycielo765598</p>
              <p><strong>Name:</strong> CIELO Agency</p>
            </div>
          </div>

          <button
            onClick={createUser}
            disabled={loading}
            className="w-full bg-white hover:bg-white/90 text-neutral-950 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating user...</span>
              </>
            ) : (
              <span>Create New User</span>
            )}
          </button>

          {result && (
            <div className={`p-4 border rounded-lg ${
              result.error 
                ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                : 'bg-green-500/10 border-green-500/20 text-green-400'
            }`}>
              <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-950 text-white/40">Or Fix Existing User</span>
            </div>
          </div>

          {/* Confirm Existing User Section */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-medium mb-2">Confirm Existing User Email</h3>
              <p className="text-xs text-white/50 mb-3">
                If you have an existing user with "Email not confirmed" error, enter their email below to confirm it.
              </p>
            </div>
            
            <input
              type="email"
              value={emailToConfirm}
              onChange={(e) => setEmailToConfirm(e.target.value)}
              placeholder="Enter email to confirm (e.g., team@cielo.agency)"
              className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg text-sm"
            />

            <button
              onClick={confirmEmail}
              disabled={confirmLoading || !emailToConfirm}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg font-medium"
            >
              {confirmLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming...</span>
                </>
              ) : (
                <span>Confirm Email</span>
              )}
            </button>

            {confirmResult && (
              <div className={`p-4 border rounded-lg ${
                confirmResult.error 
                  ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                  : 'bg-green-500/10 border-green-500/20 text-green-400'
              }`}>
                <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(confirmResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <button
              onClick={() => onNavigate('team-login')}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Go to Team Login
            </button>
            <div className="text-xs text-white/40">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-white/60 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
