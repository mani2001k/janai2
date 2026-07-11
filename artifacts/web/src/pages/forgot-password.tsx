import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
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
import { useAuth } from '@/hooks/use-auth';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
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
              Reset your password and get back to helping your community.
            </h2>
            <p className="max-w-md text-white/80">
              Enter your email and we'll send you a secure link to reset your password.
            </p>
            <ul className="space-y-3">
              {['Secure reset link', 'Works for all account types', 'Link expires in 30 minutes'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-white/60">Your security is our priority.</p>
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
            {sent ? (
              <div className="space-y-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10"
                >
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </motion.div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
                  <p className="text-sm text-muted-foreground">
                    If an account exists for <span className="font-medium text-foreground">{email}</span>,
                    you'll receive a password reset link shortly.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/login">Back to sign in</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
                  <p className="text-sm text-muted-foreground">
                    No worries — enter your email and we'll send a reset link.
                  </p>
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

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="mr-2 h-4 w-4" />
                    )}
                    Send reset link
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Remembered your password?{' '}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
