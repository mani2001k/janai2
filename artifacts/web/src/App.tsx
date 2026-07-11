import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/dashboard-layout';
import LandingPage from '@/pages/landing';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import ForgotPasswordPage from '@/pages/forgot-password';
import CommunityDashboard from '@/pages/community-dashboard';
import CommunityMapPage from '@/pages/community-map';
import ReportIssuePage from '@/pages/report-issue';
import CommunityFeedPage from '@/pages/community-feed';
import VolunteersPage from '@/pages/volunteers';
import MedicalCampsPage from '@/pages/medical-camps';
import BloodRequestsPage from '@/pages/blood-requests';
import AnalyticsPage from '@/pages/analytics';
import ProfilePage from '@/pages/profile';
import SettingsPage from '@/pages/settings';
import { getRoleHome } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';

function RoleDashboard() {
  return <CommunityDashboard />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Legacy /app redirect → role home */}
      <Route path="/app" element={<RoleRedirect />} />

      {/* Protected app — role-scoped */}
      <Route
        path="/app/:role"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RoleDashboard />} />
        <Route path="map" element={<CommunityMapPage />} />
        <Route path="report" element={<ReportIssuePage />} />
        <Route path="feed" element={<CommunityFeedPage />} />
        <Route path="volunteers" element={<VolunteersPage />} />
        <Route path="medical" element={<MedicalCampsPage />} />
        <Route path="blood" element={<BloodRequestsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RoleRedirect() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getRoleHome(user.role)} replace />;
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter basename={basename}>
          <AppRoutes />
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
