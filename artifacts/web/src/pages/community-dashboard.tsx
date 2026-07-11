import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  MapPin,
  Droplet,
  Stethoscope,
  Activity,
  ArrowUpRight,
  Plus,
  HandHeart,
  Heart,
  TrendingUp,
  AlertCircle,
  Calendar,
  Map,
  Newspaper,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useAuth } from '@/hooks/use-auth';
import { roleLabels } from '@/lib/demo-users';
import { cn } from '@/lib/utils';

/* ---------- Placeholder data ---------- */

const issueTrendData = [
  { day: 'Mon', reported: 12, resolved: 8 },
  { day: 'Tue', reported: 15, resolved: 10 },
  { day: 'Wed', reported: 9, resolved: 12 },
  { day: 'Thu', reported: 18, resolved: 11 },
  { day: 'Fri', reported: 14, resolved: 16 },
  { day: 'Sat', reported: 7, resolved: 9 },
  { day: 'Sun', reported: 11, resolved: 7 },
];

const volunteerActivityData = [
  { week: 'W1', hours: 120 },
  { week: 'W2', hours: 185 },
  { week: 'W3', hours: 142 },
  { week: 'W4', hours: 210 },
  { week: 'W5', hours: 178 },
  { week: 'W6', hours: 245 },
];

const healthScoreData = [
  { name: 'Score', value: 78, fill: 'hsl(var(--primary))' },
];

const categoryData = [
  { name: 'Infrastructure', value: 42, fill: 'hsl(var(--chart-1))' },
  { name: 'Sanitation', value: 28, fill: 'hsl(var(--chart-2))' },
  { name: 'Safety', value: 19, fill: 'hsl(var(--chart-3))' },
  { name: 'Other', value: 15, fill: 'hsl(var(--chart-4))' },
];

const issueTrendConfig: ChartConfig = {
  reported: { label: 'Reported', color: 'hsl(var(--chart-1))' },
  resolved: { label: 'Resolved', color: 'hsl(var(--chart-2))' },
};

const volunteerConfig: ChartConfig = {
  hours: { label: 'Volunteer Hours', color: 'hsl(var(--primary))' },
};

const recentIssues = [
  { id: 1, title: 'Pothole on MG Road near signal', category: 'Infrastructure', status: 'in-progress', priority: 'high', time: '2h ago', reporter: 'Aarav S.', initials: 'AS', upvotes: 24 },
  { id: 2, title: 'Streetlight not working — Sector 7', category: 'Safety', status: 'open', priority: 'medium', time: '5h ago', reporter: 'Priya M.', initials: 'PM', upvotes: 18 },
  { id: 3, title: 'Water leakage near community park', category: 'Infrastructure', status: 'resolved', priority: 'low', time: '1d ago', reporter: 'Rahul K.', initials: 'RK', upvotes: 31 },
  { id: 4, title: 'Garbage collection delayed — Ward 12', category: 'Sanitation', status: 'in-progress', priority: 'medium', time: '1d ago', reporter: 'Anita S.', initials: 'AS', upvotes: 12 },
  { id: 5, title: 'Broken bench at bus stop — Main St', category: 'Infrastructure', status: 'open', priority: 'low', time: '2d ago', reporter: 'Vikram J.', initials: 'VJ', upvotes: 7 },
];

const communityFeed = [
  { id: 1, user: 'Seva Foundation', initials: 'SF', action: 'posted a new medical camp for this Sunday at Community Hall, Ward 7', time: '12m ago', type: 'ngo' },
  { id: 2, user: 'Priya Menon', initials: 'PM', action: 'volunteered for "Blood Donation Drive" — 4 hours pledged', time: '38m ago', type: 'volunteer' },
  { id: 3, user: 'Municipal Corp', initials: 'MC', action: 'resolved report "Pothole on MG Road" — marked as fixed', time: '1h ago', type: 'admin' },
  { id: 4, user: 'Rahul Kumar', initials: 'RK', action: 'submitted an urgent blood request: O+ needed at City Hospital', time: '2h ago', type: 'blood' },
  { id: 5, user: 'Anita Singh', initials: 'AS', action: 'upvoted "Streetlight not working" and added a comment', time: '3h ago', type: 'citizen' },
  { id: 6, user: 'Helping Hands NGO', initials: 'HH', action: 'completed a community cleanup drive with 34 volunteers', time: '5h ago', type: 'ngo' },
];

const bloodRequests = [
  { id: 1, patient: 'Rahul Kumar', bloodGroup: 'O+', hospital: 'City Hospital', urgency: 'critical', units: 2, time: '2h ago', city: 'Pune' },
  { id: 2, patient: 'Meera Patel', bloodGroup: 'B-', hospital: 'Apollo Care', urgency: 'urgent', units: 1, time: '4h ago', city: 'Pune' },
  { id: 3, patient: 'Karan Verma', bloodGroup: 'A+', hospital: 'Lifeline Medical', urgency: 'moderate', units: 3, time: '8h ago', city: 'Pune' },
];

const medicalCamps = [
  { id: 1, title: 'Free Health Check-up Camp', organizer: 'Seva Foundation', date: 'Sun, Jul 14', location: 'Community Hall, Ward 7', volunteers: 8, slots: 12, status: 'open' },
  { id: 2, title: 'Eye Screening Drive', organizer: 'Vision Care NGO', date: 'Sat, Jul 20', location: 'Govt School, Sector 4', volunteers: 5, slots: 10, status: 'open' },
  { id: 3, title: 'Diabetes & BP Camp', organizer: 'Helping Hands', date: 'Sun, Jul 28', location: 'Park Plaza, Ward 3', volunteers: 12, slots: 15, status: 'open' },
];

const quickActions = [
  { label: 'Report Issue', description: 'Submit a new community issue', icon: Plus, color: 'from-primary to-chart-1', textColor: 'text-white' },
  { label: 'Find Volunteer', description: 'Discover tasks matching your skills', icon: HandHeart, color: 'from-chart-2 to-success', textColor: 'text-white' },
  { label: 'Donate Blood', description: 'Respond to urgent blood needs', icon: Heart, color: 'from-destructive to-chart-5', textColor: 'text-white' },
  { label: 'View Map', description: 'Explore issues on the community map', icon: Map, color: 'from-chart-4 to-chart-1', textColor: 'text-white' },
];

const stats = [
  { label: 'Open Issues', value: '128', change: '+12%', trend: 'up', icon: FileText, color: 'bg-primary/10 text-primary' },
  { label: 'Resolved', value: '89', change: '+24%', trend: 'up', icon: CheckCircle2, color: 'bg-success/10 text-success' },
  { label: 'Active Volunteers', value: '342', change: '+8%', trend: 'up', icon: Users, color: 'bg-chart-4/10 text-chart-4' },
  { label: 'Avg Response', value: '3.2d', change: '-0.4d', trend: 'up', icon: Clock, color: 'bg-warning/10 text-warning' },
];

const statusStyles: Record<string, string> = {
  open: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-warning/15 text-warning',
  resolved: 'bg-success/15 text-success',
};

const urgencyStyles: Record<string, string> = {
  critical: 'bg-destructive/15 text-destructive',
  urgent: 'bg-warning/15 text-warning',
  moderate: 'bg-primary/15 text-primary',
};

const priorityStyles: Record<string, string> = {
  high: 'bg-destructive/15 text-destructive',
  medium: 'bg-warning/15 text-warning',
  low: 'bg-muted text-muted-foreground',
};

const feedTypeIcon: Record<string, typeof Newspaper> = {
  ngo: Stethoscope,
  volunteer: HandHeart,
  admin: CheckCircle2,
  blood: Droplet,
  citizen: Users,
};

/* ---------- Animation helpers ---------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ---------- Component ---------- */

export default function CommunityDashboard() {
  const { user } = useAuth();
  const firstName = user?.name.split(' ')[0] ?? 'there';

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Community Dashboard
            </h1>
            {user && (
              <Badge variant="secondary" className="capitalize">
                {roleLabels[user.role]}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, {firstName}. Here's your community at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" /> Live Feed
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Report Issue
          </Button>
        </div>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={item}>
              <Card className="group relative overflow-hidden border-border/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', stat.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="gap-1 text-success">
                      <ArrowUpRight className="h-3 w-3" /> {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg', action.color)}>
                  <Icon className={cn('h-6 w-6', action.textColor)} />
                </div>
                <h3 className="mt-4 text-sm font-semibold">{action.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
                <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Charts row: Issue trend + Community Health Score */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Issue trend chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Issue Trends</CardTitle>
                <CardDescription>Reported vs resolved this week</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-chart-1" /> Reported
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-chart-2" /> Resolved
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={issueTrendConfig} className="h-[240px] w-full">
                <AreaChart data={issueTrendData} margin={{ left: 4, right: 12, top: 8 }}>
                  <defs>
                    <linearGradient id="fillReported" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="fillResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="reported"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fill="url(#fillReported)"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    fill="url(#fillResolved)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Community Health Score</CardTitle>
              <CardDescription>Overall community wellbeing index</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative h-[180px] w-full">
                <ChartContainer
                  config={{ score: { color: 'hsl(var(--primary))' } }}
                  className="h-full w-full"
                >
                  <RadialBarChart
                    data={healthScoreData}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={70}
                    outerRadius={100}
                  >
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <RadialBar dataKey="value" background cornerRadius={12} />
                  </RadialBarChart>
                </ChartContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold tracking-tight">78</span>
                  <span className="text-xs text-muted-foreground">out of 100</span>
                </div>
              </div>
              <div className="mt-2 flex w-full items-center justify-between rounded-lg bg-accent/40 px-3 py-2">
                <span className="flex items-center gap-1.5 text-xs font-medium">
                  <TrendingUp className="h-3.5 w-3.5 text-success" /> Improving
                </span>
                <span className="text-xs text-muted-foreground">+6 pts this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Issues + Volunteer Activity chart */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Issues */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Recent Issues</CardTitle>
                <CardDescription>Latest reports from your community</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center gap-3 rounded-xl border border-border/40 p-3 transition-colors hover:bg-accent/30"
                >
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                      {issue.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{issue.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{issue.category}</span>
                      <span>·</span>
                      <span>{issue.reporter}</span>
                      <span>·</span>
                      <span>{issue.time}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="outline" className={cn('gap-1', priorityStyles[issue.priority])}>
                      {issue.priority}
                    </Badge>
                    <Badge variant="secondary" className={cn('capitalize', statusStyles[issue.status])}>
                      {issue.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Volunteer Activity chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Volunteer Activity</CardTitle>
              <CardDescription>Hours contributed per week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={volunteerConfig} className="h-[200px] w-full">
                <BarChart data={volunteerActivityData} margin={{ left: 4, right: 8, top: 8 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-primary/10 p-3">
                  <p className="text-lg font-bold text-primary">1,080</p>
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-lg font-bold">342</p>
                  <p className="text-xs text-muted-foreground">Volunteers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Community Feed + Category breakdown */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Community Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Community Feed</CardTitle>
                <CardDescription>Real-time updates from your community</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Live
              </Badge>
            </CardHeader>
            <CardContent className="space-y-1">
              {communityFeed.map((feed) => {
                const FeedIcon = feedTypeIcon[feed.type] ?? Newspaper;
                return (
                  <div
                    key={feed.id}
                    className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-accent/40"
                  >
                    <div className="relative">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                          {feed.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background">
                        <FeedIcon className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm">
                        <span className="font-medium">{feed.user}</span>{' '}
                        <span className="text-muted-foreground">{feed.action}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{feed.time}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Issue Categories breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Issue Categories</CardTitle>
              <CardDescription>Distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  Infrastructure: { color: 'hsl(var(--chart-1))' },
                  Sanitation: { color: 'hsl(var(--chart-2))' },
                  Safety: { color: 'hsl(var(--chart-3))' },
                  Other: { color: 'hsl(var(--chart-4))' },
                }}
                className="mx-auto h-[180px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: cat.fill }}
                    />
                    <span className="flex-1 text-muted-foreground">{cat.name}</span>
                    <span className="font-medium">{cat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Blood Requests + Medical Camps */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Blood Requests */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-destructive" /> Recent Blood Requests
                </CardTitle>
                <CardDescription>Urgent donation needs near you</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {bloodRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center gap-3 rounded-xl border border-border/40 p-3 transition-colors hover:bg-accent/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                    <Droplet className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{req.patient}</p>
                      <Badge variant="outline" className="font-mono font-bold text-destructive">
                        {req.bloodGroup}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {req.hospital} · {req.city} · {req.units} unit{req.units > 1 ? 's' : ''} needed · {req.time}
                    </p>
                  </div>
                  <Badge variant="secondary" className={cn('capitalize', urgencyStyles[req.urgency])}>
                    {req.urgency}
                  </Badge>
                  <Button size="sm" variant="outline" className="shrink-0">
                    <Heart className="mr-1.5 h-3.5 w-3.5 text-destructive" /> Donate
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Medical Camps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" /> Upcoming Medical Camps
                </CardTitle>
                <CardDescription>Scheduled health initiatives</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicalCamps.map((camp) => (
                <div
                  key={camp.id}
                  className="rounded-xl border border-border/40 p-3 transition-colors hover:bg-accent/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{camp.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{camp.organizer}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                      {camp.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {camp.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {camp.location}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Volunteers</span>
                        <span className="font-medium">{camp.volunteers}/{camp.slots}</span>
                      </div>
                      <Progress value={(camp.volunteers / camp.slots) * 100} className="h-1.5" />
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-4/5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-primary text-white shadow-lg shadow-primary/30">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Insight</p>
                <p className="mt-0.5 max-w-xl text-sm text-muted-foreground">
                  Infrastructure issues in Ward 7 are trending up 32% this week. Consider allocating 2 additional volunteers to prevent a backlog.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm">
                <AlertCircle className="mr-2 h-4 w-4" /> Dismiss
              </Button>
              <Button size="sm">
                <HandHeart className="mr-2 h-4 w-4" /> Allocate
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
