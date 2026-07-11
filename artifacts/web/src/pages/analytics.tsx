import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, CheckCircle2, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

// --- Dummy Data ---
const categoryDistribution = [
  { name: 'Infrastructure', value: 450, fill: 'hsl(var(--chart-1))' },
  { name: 'Sanitation', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Safety', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Medical', value: 150, fill: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 100, fill: 'hsl(var(--chart-5))' },
];

const resolutionTrendData = [
  { month: 'Jan', reported: 120, resolved: 90 },
  { month: 'Feb', reported: 150, resolved: 110 },
  { month: 'Mar', reported: 140, resolved: 130 },
  { month: 'Apr', reported: 180, resolved: 150 },
  { month: 'May', reported: 220, resolved: 190 },
  { month: 'Jun', reported: 190, resolved: 185 },
  { month: 'Jul', reported: 250, resolved: 230 },
  { month: 'Aug', reported: 210, resolved: 200 },
];

const activeUsersData = [
  { day: 'Mon', citizens: 420, volunteers: 110 },
  { day: 'Tue', citizens: 480, volunteers: 125 },
  { day: 'Wed', citizens: 450, volunteers: 115 },
  { day: 'Thu', citizens: 510, volunteers: 140 },
  { day: 'Fri', citizens: 490, volunteers: 130 },
  { day: 'Sat', citizens: 600, volunteers: 200 },
  { day: 'Sun', citizens: 580, volunteers: 190 },
];

const kpis = [
  { title: 'Community Health Score', value: '84', unit: '/100', trend: '+4', status: 'good', icon: TrendingUp },
  { title: 'Avg. Resolution Time', value: '4.2', unit: ' days', trend: '-0.5', status: 'good', icon: Clock },
  { title: 'Resolution Rate', value: '88', unit: '%', trend: '+2.4%', status: 'good', icon: CheckCircle2 },
  { title: 'Critical Open Issues', value: '12', unit: '', trend: '+3', status: 'bad', icon: AlertTriangle },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('6m');

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Platform-wide metrics, issue trends, and community health indicators.
          </p>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[160px] bg-card">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last 30 Days</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isGood = kpi.status === 'good';
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="border-border/50 shadow-sm glass-card relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className={cn("absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20", isGood ? "text-success" : "text-destructive")}>
                  <Icon className="h-16 w-16" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</span>
                    <span className="text-sm font-medium text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge variant="outline" className={cn(
                      "px-1.5 py-0 border-transparent", 
                      isGood ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    )}>
                      {isGood ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {kpi.trend}
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Resolution Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Report & Resolution Trend</CardTitle>
                <CardDescription>Volume of issues reported vs resolved over time</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1"></span> Reported</div>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-2"></span> Resolved</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resolutionTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area type="monotone" dataKey="reported" stroke="hsl(var(--chart-1))" strokeWidth={2} fillOpacity={1} fill="url(#colorReported)" />
                    <Area type="monotone" dataKey="resolved" stroke="hsl(var(--chart-2))" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart: Issue Categories */}
        <motion.div
           initial={{ opacity: 0, y: 16 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Issue Distribution</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: '12px' }}
                    />
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryDistribution.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: cat.fill }}></span>
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="font-semibold">{cat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bar Chart: Active Users */}
      <motion.div
         initial={{ opacity: 0, y: 16 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Daily engagement across platform</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Users className="h-3 w-3" /> Peak: Weekends
            </Badge>
          </CardHeader>
          <CardContent>
             <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeUsersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    />
                    <Bar dataKey="citizens" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} barSize={30} />
                    <Bar dataKey="volunteers" stackId="a" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}