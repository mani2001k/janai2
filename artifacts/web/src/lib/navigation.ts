import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Map,
  FileText,
  Newspaper,
  HandHeart,
  Stethoscope,
  Droplet,
  BarChart3,
  User,
  Settings,
} from 'lucide-react';
import type { UserRole } from '@/lib/demo-users';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  roles?: UserRole[];
}

const allRoles: UserRole[] = ['citizen', 'volunteer', 'ngo', 'admin'];

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '', icon: LayoutDashboard, roles: allRoles },
  { label: 'Community Map', to: 'map', icon: Map, roles: allRoles },
  { label: 'Report Issue', to: 'report', icon: FileText, badge: 'New', roles: ['citizen', 'volunteer', 'admin'] },
  { label: 'Community Feed', to: 'feed', icon: Newspaper, roles: allRoles },
  { label: 'Volunteers', to: 'volunteers', icon: HandHeart, roles: ['volunteer', 'ngo', 'admin'] },
  { label: 'Medical Camps', to: 'medical', icon: Stethoscope, roles: ['ngo', 'admin'] },
  { label: 'Blood Requests', to: 'blood', icon: Droplet, badge: 'Urgent', roles: allRoles },
  { label: 'Analytics', to: 'analytics', icon: BarChart3, roles: ['admin'] },
];

export const bottomNavItems: NavItem[] = [
  { label: 'Profile', to: 'profile', icon: User, roles: allRoles },
  { label: 'Settings', to: 'settings', icon: Settings, roles: allRoles },
];

export function filterNavByRole(items: NavItem[], role: UserRole): NavItem[] {
  return items.filter((item) => !item.roles || item.roles.includes(role));
}
