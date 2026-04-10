import { useState, useEffect, useRef } from 'react';
import { X, Loader2, Eye, EyeOff, Mail, AlertCircle, UserPlus, LogIn } from 'lucide-react';
import { auth } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner@2.0.3';
import { validateEmail, validatePassword, validateTextField } from '../../utils/formValidation';

interface TeamLoginProps {
  onNavigate: (page: string) => void;
}

export function TeamLogin({ onNavigate }: TeamLoginProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'invitation'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [invitationToken, setInvitationToken] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  
  const sessionChecked = useRef(false);
  const isLoggingIn = useRef(false);
  const isMounted = useRef(true);
  const hasNavigated = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    hasNavigated.current = false;
    
    // Check for invitation in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('invitation');
    const emailParam = params.get('email');
    
    if (token && emailParam) {
      setInvitationToken(token);
      setInvitationEmail(emailParam);
      setEmail(emailParam);
      setMode('invitation');
      toast.info('Please complete your account setup');
    } else if (!sessionChecked.current) {
      sessionChecked.current = true;
      checkSession();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await auth.getSession();
      if (session && isMounted.current && !hasNavigated.current) {
        hasNavigated.current = true;
        onNavigate('team-dashboard');
      }
    } catch (err) {
      console.error('Session check error:', err);
    }
  };

  const validateLoginForm = (): boolean => {
    const errors: Record<string, string> = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || '';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateInvitationForm = (): boolean => {
    const errors: Record<string, string> = {};

    const nameValidation = validateTextField(fullName, 'Full name', 2, 100);
    if (!nameValidation.isValid) {
      errors.fullName = nameValidation.error || '';
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error || '';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggingIn.current || loading || hasNavigated.current || !isMounted.current) {
      return;
    }

    if (!validateLoginForm()) {
      return;
    }

    isLoggingIn.current = true;
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await auth.signIn(email, password);

      if (!isMounted.current || hasNavigated.current) {
        return;
      }

      if (signInError) {
        setError(signInError.message || 'Invalid credentials');
        toast.error(signInError.message || 'Failed to sign in');
        isLoggingIn.current = false;
        setLoading(false);
        return;
      }

      if (data?.user) {
        hasNavigated.current = true;
        setEmail('');
        setPassword('');
        toast.success('Signed in successfully!');
        onNavigate('team-dashboard');
      } else {
        setError('Login failed - no user data');
        toast.error('Login failed');
        isLoggingIn.current = false;
        setLoading(false);
      }
    } catch (err: any) {
      if (isMounted.current && !hasNavigated.current) {
        setError(err.message || 'Invalid credentials');
        toast.error(err.message || 'Failed to sign in');
        isLoggingIn.current = false;
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/team-dashboard`,
        },
      });

      if (error) {
        throw error;
      }

      // The redirect will happen automatically
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google');
      toast.error(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!validateInvitationForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/accept-invitation`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: invitationToken,
          email: invitationEmail,
          password,
          full_name: fullName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create account');
      }

      toast.success('Account created successfully! Please sign in.');
      
      // Clear invitation params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Switch to login mode
      setMode('login');
      setPassword('');
      setFullName('');
      setInvitationToken('');
    } catch (err: any) {
      console.error('Invitation acceptance error:', err);
      setError(err.message || 'Failed to create account');
      toast.error(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white mb-2">CIELO Agency</h1>
          <p className="text-zinc-400">
            {mode === 'invitation' ? 'Complete your account setup' : 'Team Dashboard'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl text-white mb-1">
              {mode === 'invitation' ? 'Accept Invitation' : 'Sign In'}
            </h2>
            <p className="text-sm text-zinc-400">
              {mode === 'invitation' 
                ? 'Create your account to join the team' 
                : 'Sign in with your email or Google account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {mode === 'invitation' ? (
            <form onSubmit={handleAcceptInvitation} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  value={invitationEmail}
                  disabled
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white opacity-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setFieldErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="Your full name"
                  className={`w-full bg-zinc-800 border rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    fieldErrors.fullName ? 'border-red-500' : 'border-zinc-700'
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="Create a password"
                    className={`w-full bg-zinc-800 border rounded-lg px-4 py-2 pr-10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                      fieldErrors.password ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black rounded-lg px-4 py-2 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="your@email.com"
                  className={`w-full bg-zinc-800 border rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    fieldErrors.email ? 'border-red-500' : 'border-zinc-700'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="Your password"
                    className={`w-full bg-zinc-800 border rounded-lg px-4 py-2 pr-10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                      fieldErrors.password ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black rounded-lg px-4 py-2 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-zinc-500">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          <p>© 2024 CIELO Agency. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
