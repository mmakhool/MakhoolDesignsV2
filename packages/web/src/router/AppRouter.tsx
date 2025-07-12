import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingView } from '../components/LoadingView';
import { AdminLayout } from '../layouts/AdminLayout';
import DefaultLayout from '../layouts/DefaultLayout';

// Lazy load pages for better performance
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

//#region Auth Pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
//#endregion

//#region Admin Pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminRoles = lazy(() => import('../pages/admin/AdminRoles'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));
const AdminProjects = lazy(() => import('../pages/admin/AdminProjects'));
//#endregion

//#region User Pages
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const UserSettings = lazy(() => import('../pages/user/UserSettings'));
//#endregion

// Access Denied component
/*function AccessDeniedPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-red-700 dark:text-red-400">Access Denied</div>
    </div>
  );
}*/

// Admin wrapper for protected routes
function AdminWrap(props: { component: ReactElement; permission?: string | string[] }) {
  // TODO: Implement permission checking when auth is added
  // For now, just return the component
  return props.component;
  
  // Future implementation:
  // return (
  //   <RequirePermission permission={props.permission} fallback={<AccessDeniedPage />}>
  //     {props.component}
  //   </RequirePermission>
  // );
}

// Auth wrapper for protected routes
function AuthWrap(props: { component: ReactElement }) {
  // TODO: Implement auth checking when auth is added
  // For now, just return the component
  return props.component;
  
  // Future implementation:
  // return (
  //   <RequireAuth fallback={<Navigate to="/login" />}>
  //     {props.component}
  //   </RequireAuth>
  // );
}

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingView />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Public routes - directly under DefaultLayout */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Auth routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected user routes */}
          <Route path="profile" element={<AuthWrap component={<UserProfile />} />} />
          <Route path="settings" element={<AuthWrap component={<UserSettings />} />} />

          {/* Admin routes */}
          <Route
            path="admin"
            element={<AdminWrap permission="admin:access" component={<AdminLayout />} />}
          >
            <Route
              path=""
              element={<AdminWrap permission="admin:dashboard" component={<AdminDashboard />} />}
            />
            <Route
              path="users"
              element={<AdminWrap permission="admin:users:list" component={<AdminUsers />} />}
            />
            <Route
              path="roles"
              element={<AdminWrap permission="admin:roles:list" component={<AdminRoles />} />}
            />
            <Route
              path="projects"
              element={<AdminWrap permission="admin:projects:list" component={<AdminProjects />} />}
            />
            <Route
              path="settings"
              element={<AdminWrap permission="admin:settings" component={<AdminSettings />} />}
            />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
