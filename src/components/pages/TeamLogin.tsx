import { useState, useEffect, useRef, memo } from 'react';
import { X, Loader2, Eye, EyeOff, Mail, AlertCircle } from 'lucide-react';
import { auth } from '../../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { validateEmail, validatePassword, validateTextField } from '../../utils/formValidation';

interface TeamLoginProps {
  onNavigate: (page: string) => void;
}

function TeamLoginComponent({ onNavigate }: TeamLoginProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // Critical refs to prevent duplicate operations
  const sessionChecked = useRef(false);
  const isLoggingIn = useRef(false);
  const isMounted = useRef(true);
  const hasNavigated = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    hasNavigated.current = false;
    
    // Only check session once on mount
    if (!sessionChecked.current) {
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

  const validateSignUpForm = (): boolean => {
    const errors: Record<string, string> = {};

    const nameValidation = validateTextField(fullName, 'Full name', 2, 100);
    if (!nameValidation.isValid) {
      errors.fullName = nameValidation.error || '';
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || '';
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error || '';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateResetForm = (): boolean => {
    const errors: Record<string, string> = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || '';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // CRITICAL: Prevent any duplicate login attempts
    if (isLoggingIn.current || loading || hasNavigated.current || !isMounted.current) {
      console.log('🚫 Login blocked - already processing or navigated');
      return;
    }

    if (!validateLoginForm()) {
      return;
    }

    // Set all guards immediately
    isLoggingIn.current = true;
    setLoading(true);
    setError('');

    console.log('🔐 Starting login process for:', email);

    try {
      const { data, error: signInError } = await auth.signIn(email, password);

      // Check guards before processing response
      if (!isMounted.current || hasNavigated.current) {
        console.log('🚫 Component unmounted or already navigated, aborting');
        return;
      }

      if (signInError) {
        console.error('❌ Sign in error:', signInError);
        
        if (signInError.message?.includes('Email not confirmed')) {
          setError('Your email is not confirmed. Please use "Create Test User" to create a new account with confirmed email, or contact support.');
          toast.error('Email not confirmed');
        } else {
          setError(signInError.message || 'Invalid credentials');
          toast.error(signInError.message || 'Failed to sign in');
        }
        
        // Reset guards on error
        isLoggingIn.current = false;
        setLoading(false);
        return;
      }

      if (data?.user) {
        console.log('✅ Login successful, user:', data.user.email);
        
        // Set navigation guard immediately
        hasNavigated.current = true;
        
        // Clear form data immediately to prevent re-submission
        setEmail('');
        setPassword('');
        
        toast.success('Signed in successfully!');
        
        // Navigate immediately without delay
        onNavigate('team-dashboard');
        
        // DO NOT reset loading or isLoggingIn here - keep them locked
      } else {
        console.error('❌ No user data returned');
        setError('Login failed - no user data');
        toast.error('Login failed');
        isLoggingIn.current = false;
        setLoading(false);
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      
      if (isMounted.current && !hasNavigated.current) {
        setError(err.message || 'Invalid credentials');
        toast.error(err.message || 'Failed to sign in');
        isLoggingIn.current = false;
        setLoading(false);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!validateSignUpForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await auth.signUp(email, password, fullName);

      if (!isMounted.current) return;

      if (signUpError) throw signUpError;

      if (data?.user) {
        setMessage('Account created! Please check your email to confirm your account.');
        toast.success('Account created! Check your email to confirm.');
        setTimeout(() => {
          if (isMounted.current) {
            setMode('login');
            setMessage('');
          }
        }, 3000);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      if (isMounted.current) {
        setError(err.message || 'Failed to create account');
        toast.error(err.message || 'Failed to sign up');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!validateEmail(email).isValid) {
      setFieldErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: magicLinkError } = await auth.signInWithMagicLink(email);

      if (!isMounted.current) return;

      if (magicLinkError) throw magicLinkError;

      setMessage('Magic link sent! Check your email.');
      toast.success('Magic link sent to your email!');
    } catch (err: any) {
      console.error('Magic link error:', err);
      if (isMounted.current) {
        setError(err.message || 'Failed to send magic link');
        toast.error(err.message || 'Failed to send magic link');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!validateResetForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: resetError } = await auth.resetPassword(email);

      if (!isMounted.current) return;

      if (resetError) throw resetError;

      setMessage('Password reset email sent! Check your inbox.');
      toast.success('Password reset email sent!');
      setTimeout(() => {
        if (isMounted.current) {
          setMode('login');
          setMessage('');
        }
      }, 3000);
    } catch (err: any) {
      console.error('Reset password error:', err);
      if (isMounted.current) {
        setError(err.message || 'Failed to send reset email');
        toast.error(err.message || 'Failed to send reset email');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading || isLoggingIn.current || hasNavigated.current) {
      console.log('🚫 Google sign-in blocked - already processing or navigated');
      return;
    }

    isLoggingIn.current = true;
    setLoading(true);
    setError('');

    console.log('🔐 Starting Google OAuth sign-in');

    try {
      const { error: signInError } = await auth.signInWithGoogle();

      if (!isMounted.current || hasNavigated.current) {
        console.log('🚫 Component unmounted or already navigated, aborting');
        return;
      }

      if (signInError) {
        console.error('❌ Google sign-in error:', signInError);
        setError(signInError.message || 'Failed to sign in with Google');
        toast.error(signInError.message || 'Failed to sign in with Google');
        isLoggingIn.current = false;
        setLoading(false);
        return;
      }

      // Google OAuth will redirect, so we don't need to navigate here
      console.log('✅ Google sign-in initiated, redirecting...');
      toast.success('Redirecting to Google...');
      
    } catch (err: any) {
      console.error('❌ Google sign-in error:', err);
      
      if (isMounted.current && !hasNavigated.current) {
        setError(err.message || 'Failed to sign in with Google');
        toast.error(err.message || 'Failed to sign in with Google');
        isLoggingIn.current = false;
        setLoading(false);
      }
    }
  };

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // If already navigated, don't render anything to prevent re-renders
  if (hasNavigated.current) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-6">
      {/* Close Button */}
      <button
        onClick={() => onNavigate('home')}
        className="absolute top-6 right-6 text-white/40 hover:text-white/60 transition-colors"
        type="button"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="text-3xl mb-4 hover:opacity-70 transition-opacity"
            type="button"
          >
            CIELO
          </button>
          <h1 className="text-2xl mb-2">
            {mode === 'login' && 'Team Login'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'reset' && 'Reset Password'}
          </h1>
          <p className="text-white/50 text-sm">
            {mode === 'login' && 'Access the team dashboard'}
            {mode === 'signup' && 'Join the CIELO team'}
            {mode === 'reset' && 'Reset your password'}
          </p>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div>
              <label htmlFor="login-email" className="block text-sm text-white/60 mb-2">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                }}
                autoComplete="email"
                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                placeholder="team@cielo.agency"
                required
                disabled={loading}
              />
              {fieldErrors.email && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{fieldErrors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm text-white/60 mb-2">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError('password');
                  }}
                  autoComplete="current-password"
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors pr-12"
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{fieldErrors.password}</span>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-white/90 text-neutral-950 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1a1a1a] px-2 text-white/40">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMode('reset');
                  setError('');
                }}
                className="text-sm text-white/60 hover:text-white transition-colors block w-full"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-6" noValidate>
            <div>
              <label htmlFor="signup-name" className="block text-sm text-white/60 mb-2">Full Name</label>
              <input
                id="signup-name"
                name="name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearFieldError('fullName');
                }}
                autoComplete="name"
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="Your name"
                required
                disabled={loading}
              />
              {fieldErrors.fullName && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{fieldErrors.fullName}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm text-white/60 mb-2">Email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                }}
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="your.email@company.com"
                required
                disabled={loading}
              />
              {fieldErrors.email && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{fieldErrors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm text-white/60 mb-2">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError('password');
                  }}
                  autoComplete="new-password"
                  className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors pr-12 rounded-lg"
                  placeholder="Choose a password (min. 6 characters)"
                  required
                  minLength={6}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{fieldErrors.password}</span>
                </div>
              )}
              <p className="text-xs text-white/40 mt-1">Must be at least 6 characters</p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-white/90 text-neutral-950 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>

            <div className="text-center text-sm text-white/40">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setMessage('');
                }}
                className="text-white hover:text-white/80 transition-colors"
                disabled={loading}
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* Reset Password Form */}
        {mode === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-6" noValidate>
            <div>
              <label htmlFor="reset-email" className="block text-sm text-white/60 mb-2">Email</label>
              <input
                id="reset-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                }}
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="agency@cielo.marketing"
                required
                disabled={loading}
              />
              {fieldErrors.email && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{fieldErrors.email}</span>
                </div>
              )}
              <p className="text-xs text-white/40 mt-1">
                We'll send you a link to reset your password
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-white/90 text-neutral-950 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center text-sm text-white/40">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setMessage('');
                }}
                className="text-white hover:text-white/80 transition-colors"
                disabled={loading}
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export const TeamLogin = memo(TeamLoginComponent);