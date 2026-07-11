import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import type { UserRole } from '@/lib/demo-users';
import { getRoleHome } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If route specifies allowed roles and the user's role isn't among them,
  // redirect to their own role dashboard.
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  return <>{children}</>;
}
