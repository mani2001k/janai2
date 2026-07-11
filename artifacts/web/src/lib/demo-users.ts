export type UserRole = 'citizen' | 'volunteer' | 'ngo' | 'admin';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatarInitials: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: 'u-citizen-01',
    name: 'Aarav Sharma',
    email: 'citizen@test.com',
    password: 'password123',
    role: 'citizen',
    avatarInitials: 'AS',
  },
  {
    id: 'u-volunteer-01',
    name: 'Priya Menon',
    email: 'volunteer@test.com',
    password: 'password123',
    role: 'volunteer',
    avatarInitials: 'PM',
  },
  {
    id: 'u-ngo-01',
    name: 'Seva Foundation',
    email: 'ngo@test.com',
    password: 'password123',
    role: 'ngo',
    avatarInitials: 'SF',
  },
  {
    id: 'u-admin-01',
    name: 'Rahul Kumar',
    email: 'admin@janconnect.ai',
    password: 'password123',
    role: 'admin',
    avatarInitials: 'RK',
  },
];

export const roleHomePaths: Record<UserRole, string> = {
  citizen: '/app/citizen',
  volunteer: '/app/volunteer',
  ngo: '/app/ngo',
  admin: '/app/admin',
};

export const roleLabels: Record<UserRole, string> = {
  citizen: 'Citizen',
  volunteer: 'Volunteer',
  ngo: 'NGO',
  admin: 'Administrator',
};
