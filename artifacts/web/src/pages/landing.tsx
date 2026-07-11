import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Map,
  FileText,
  HandHeart,
  Stethoscope,
  Droplet,
  BarChart3,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Map,
    title: 'Community Map',
    description: 'Visualize issues, resources, and volunteers on a live interactive map powered by OpenStreetMap.',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: FileText,
    title: 'Report Issues',
    description: 'Citizens report problems with photos and location. AI auto-categorizes and routes them instantly.',
    color: 'from-chart-2/20 to-chart-2/5',
  },
  {
    icon: HandHeart,
    title: 'Volunteer Network',
    description: 'Match volunteer skills to community needs. Coordinate events and track contributions.',
    color: 'from-warning/20 to-warning/5',
  },
  {
    icon: Stethoscope,
    title: 'Medical Camps',
    description: 'Schedule and discover health camps. NGOs can organize drives and reach citizens efficiently.',
    color: 'from-chart-4/20 to-chart-4/5',
  },
  {
    icon: Droplet,
    title: 'Blood Requests',
    description: 'Urgent blood requests broadcast to nearby donors by blood group. Save lives in real time.',
    color: 'from-destructive/20 to-destructive/5',
  },
  {
    icon: BarChart3,
    title: 'AI Analytics',
    description: 'Predictive insights on community trends, resolution times, and resource allocation.',
    color: 'from-chart-5/20 to-chart-5/5',
  },
];

const stats = [
  { value: '12K+', label: 'Issues Resolved' },
  { value: '340+', label: 'Active Volunteers' },
  { value: '58', label: 'Partner NGOs' },
  { value: '9', label: 'Cities Live' },
];

const roles = [
  { name: 'Citizens', icon: Users, points: ['Report issues in seconds', 'Track resolution progress', 'Upvote community needs'] },
  { name: 'Volunteers', icon: HandHeart, points: ['Find tasks by skill', 'Join medical & blood drives', 'Build a contribution profile'] },
  { name: 'NGOs', icon: ShieldCheck, points: ['Organize camps & drives', 'Coordinate with volunteers', 'Publish community updates'] },
  { name: 'Administrators', icon: Globe, points: ['AI-assisted triage', 'Analytics & oversight', 'Route resources efficiently'] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-chart-2/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-chart-4/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo size="md" />
          <nav className="hidden items-center gap-1 md:flex">
            {['Features', 'How it works', 'Roles', 'Impact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/register">Get started <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen((v) => !v)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-border/40 bg-background/95 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {['Features', 'How it works', 'Roles', 'Impact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {item}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link to="/register">Get started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="outline" className="mb-6 gap-1.5 border-primary/30 bg-primary/5 px-3 py-1 text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered community collaboration
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Together, we solve what matters
            <span className="block gradient-text">in your community.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            JanConnect AI unites citizens, volunteers, NGOs, and administrators on one platform —
            to report, coordinate, and resolve local problems with the power of AI.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="h-12 px-7 text-base">
              <Link to="/register">Start contributing <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-7 text-base">
              <Link to="/app">View dashboard</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Free for citizens and volunteers. No credit card required.</p>
        </motion.div>

        {/* Hero visual / mock dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border/50 glass-card p-2 shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-xl bg-background/50 p-4 sm:grid-cols-3">
              {[
                { icon: FileText, label: 'Open Reports', value: '128', color: 'text-primary' },
                { icon: HandHeart, label: 'Volunteers', value: '342', color: 'text-success' },
                { icon: Droplet, label: 'Blood Requests', value: '7', color: 'text-destructive' },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="rounded-xl border border-border/40 bg-card/60 p-4">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-accent/40', card.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-2xl font-bold">{card.value}</p>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 rounded-xl border border-border/40 bg-card/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Community Activity</p>
                <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3" /> Live</Badge>
              </div>
              <div className="mt-3 space-y-2">
                {['Pothole reported on MG Road', 'Volunteer joined medical camp', 'Blood request fulfilled in 18 min'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats band */}
      <section id="impact" className="border-y border-border/40 bg-card/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-extrabold tracking-tight gradient-text sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything your community needs</h2>
          <p className="mt-4 text-muted-foreground">
            One platform for reporting, volunteering, health coordination, and AI-driven insights.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 glass-card p-6 transition-shadow hover:shadow-xl hover:shadow-primary/10"
              >
                <div className={cn('mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br', f.color)}>
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Built for everyone</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One platform, four roles</h2>
            <p className="mt-4 text-muted-foreground">Designed for the entire community ecosystem.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border/50 bg-background/60 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-white shadow-lg shadow-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{r.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">How it works</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From report to resolution in 3 steps</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { step: '01', title: 'Report or volunteer', desc: 'Citizens report issues with photos and location. Volunteers pick tasks that match their skills.' },
            { step: '02', title: 'AI routes & matches', desc: 'AI categorizes reports, predicts priority, and matches the right volunteers and NGOs automatically.' },
            { step: '03', title: 'Coordinate & resolve', desc: 'Track progress on the map and feed. Celebrate resolutions and measure community impact.' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border/50 glass-card p-6"
            >
              <span className="text-5xl font-extrabold text-primary/15">{s.step}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-center text-white shadow-2xl shadow-primary/30 sm:p-16"
        >
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to make a difference?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join thousands of citizens, volunteers, and NGOs building stronger communities with JanConnect AI.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="h-12 bg-white px-7 text-base text-primary hover:bg-white/90">
                <Link to="/register">Create free account <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 border-white/40 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">Built for communities, powered by AI.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
