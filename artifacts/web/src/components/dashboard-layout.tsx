import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  LogOut,
  Sparkles,
  User as UserIcon,
  Settings,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { navItems, bottomNavItems, filterNavByRole } from '@/lib/navigation';
import type { NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { roleLabels } from '@/lib/demo-users';

function SidebarLink({
  item,
  basePath,
  onNavigate,
}: {
  item: NavItem;
  basePath: string;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const to = item.to ? `${basePath}/${item.to}` : basePath;
  return (
    <NavLink
      to={to}
      end={item.to === ''}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full gradient-primary"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <Icon className="h-[1.15rem] w-[1.15rem] shrink-0" strokeWidth={2} />
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <Badge
              variant={item.badge === 'Urgent' ? 'destructive' : 'secondary'}
              className="h-5 px-1.5 text-[0.65rem]"
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();
  if (!user) return null;

  const basePath = `/app/${user.role}`;
  const visibleNav = filterNavByRole(navItems, user.role);
  const visibleBottom = filterNavByRole(bottomNavItems, user.role);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Logo size="md" />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <p className="px-3 pb-2 pt-4 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Workspace
        </p>
        <nav className="space-y-1">
          {visibleNav.map((item) => (
            <SidebarLink key={item.to} item={item} basePath={basePath} onNavigate={onNavigate} />
          ))}
        </nav>
        <p className="px-3 pb-2 pt-6 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Account
        </p>
        <nav className="space-y-1">
          {visibleBottom.map((item) => (
            <SidebarLink key={item.to} item={item} basePath={basePath} onNavigate={onNavigate} />
          ))}
        </nav>
      </div>
      <div className="border-t border-sidebar-border p-3">
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-chart-2/10 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">AI Assistant</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Smart insights and predictions for your community.
          </p>
          <Button size="sm" className="mt-3 w-full">
            Explore AI
          </Button>
        </div>
      </div>
    </div>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  // segments: ['app', role, ...rest]
  if (segments.length === 0) return null;

  const crumbs = segments.map((seg) =>
    seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="hidden sm:inline">JanConnect</span>
      <ChevronRight className="hidden h-3.5 w-3.5 sm:inline" />
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className={cn('capitalize', i === crumbs.length - 1 && 'font-medium text-foreground')}>
            {c}
          </span>
          {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
        </span>
      ))}
    </nav>
  );
}

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="hidden sm:block">
            <Breadcrumbs />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-56 rounded-full border border-input bg-muted/40 pl-9 pr-3 text-sm outline-none transition-all focus:w-72 focus:border-primary focus:bg-background focus:ring-1 focus:ring-ring"
              />
            </div>

            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-[1.15rem] w-[1.15rem]" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border p-0.5 pr-2 transition-colors hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="gradient-primary text-xs font-semibold text-white">
                      {user?.avatarInitials ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">{user?.name.split(' ')[0] ?? 'User'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                    {user && (
                      <span className="mt-1 inline-flex w-fit items-center rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-semibold text-accent-foreground">
                        {roleLabels[user.role]}
                      </span>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/app/${user?.role}/profile`)}>
                  <UserIcon className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/app/${user?.role}/settings`)}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content with route transition */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex min-h-full flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
