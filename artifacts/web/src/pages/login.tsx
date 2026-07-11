import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { demoUsers } from '@/lib/demo-users';
import { getRoleHome } from '@/hooks/use-auth';
import type { DemoUser } from '@/lib/demo-users';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<'email' | 'google' | null>(null);

  const from = (location.state as { from?: string } | null)?.from;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading('email');
    try {
      const user = await login(email, password);
      navigate(from ?? getRoleHome(user.role), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(null);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading('google');
    try {
      const user = await loginWithGoogle();
      navigate(from ?? getRoleHome(user.role), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setLoading(null);
    }
  };

  const quickLogin = async (u: DemoUser) => {
    setError(null);
    setLoading('email');
    try {
      const authUser = await login(u.email, u.password);
      navigate(getRoleHome(authUser.role), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left visual panel */}
      <div className="relative hidden overflow-hidden gradient-primary lg:flex lg:w-1/2">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-1/4 -left-10 h-60 w-60 rounded-full bg-chart-2/30 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="space-y-6">
            <Sparkles className="h-10 w-10" />
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Welcome back to the community that solves together.
            </h2>
            <p className="max-w-md text-white/80">
              Sign in to report issues, coordinate volunteers, and track the impact you're making in your neighborhood.
            </p>
            <ul className="space-y-3">
              {['AI-assisted issue routing', 'Real-time community feed', 'Volunteer & NGO coordination'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-white/60">Trusted by 58+ NGOs across 9 cities.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Logo size="sm" />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Sign in to JanConnect</h1>
              <p className="text-sm text-muted-foreground">Enter your credentials to access your dashboard.</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="px-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Remember me for 30 days
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading !== null}>
                {loading === 'email' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                Sign in
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogle}
              disabled={loading !== null}
            >
              {loading === 'google' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              Continue with Google
            </Button>

            {/* Demo accounts */}
            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Demo accounts — click to sign in
              </p>
              <div className="mt-3 space-y-1.5">
                {demoUsers.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => quickLogin(u)}
                    disabled={loading !== null}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent disabled:opacity-50"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[0.6rem] font-bold text-primary">
                      {u.avatarInitials}
                    </span>
                    <span className="font-medium text-foreground">{u.email}</span>
                    <span className="ml-auto capitalize text-muted-foreground">{u.role}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Create one
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
