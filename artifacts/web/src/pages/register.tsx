import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Building2,
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
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { getRoleHome } from '@/hooks/use-auth';
import type { UserRole } from '@/lib/demo-users';

const roles: { value: UserRole; label: string; icon: typeof User }[] = [
  { value: 'citizen', label: 'Citizen', icon: User },
  { value: 'volunteer', label: 'Volunteer', icon: Sparkles },
  { value: 'ngo', label: 'NGO', icon: Building2 },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agreed) {
      setError('Please accept the Terms and Privacy Policy to continue.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const user = await register(name, email, password, role);
      navigate(getRoleHome(user.role), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left visual panel */}
      <div className="relative hidden overflow-hidden gradient-primary lg:flex lg:w-1/2">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 h-60 w-60 rounded-full bg-chart-2/30 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="space-y-6">
            <Sparkles className="h-10 w-10" />
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Join a movement that turns complaints into action.
            </h2>
            <p className="max-w-md text-white/80">
              Create your free account and start reporting issues, volunteering, and coordinating with NGOs in your community.
            </p>
            <ul className="space-y-3">
              {['Free forever for citizens & volunteers', 'AI-assisted routing & insights', 'Connect with 58+ partner NGOs'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-white/60">Join 12,000+ citizens already making an impact.</p>
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
              <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
              <p className="text-sm text-muted-foreground">Start contributing to your community in minutes.</p>
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

            {/* Role selector */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all',
                      active
                        ? 'border-primary bg-primary/5 text-primary shadow-sm'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {r.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Aarav Sharma"
                    className="pl-9"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
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
                <p className="text-xs text-muted-foreground">Must be at least 8 characters.</p>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  className="mt-0.5"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(v === true)}
                />
                <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">Terms</a> and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                Create account
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">Sign in with an existing account</Link>
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
