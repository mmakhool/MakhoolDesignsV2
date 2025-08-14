import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../hooks/useAuth';

const APP_NAME = 'MakhoolDesigns';

const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

const DefaultLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { logout } = useAuth();
  
  // Temporarily enable admin access for testing
  const isAuthenticated = true; // state.isAuthenticated;
  const isAdmin = true; // state.user?.role?.name === 'sysadmin' || state.user?.role?.name === 'sysmanager';

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  // User menu items with logout handler
  const USER_MENU_ITEMS = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '#', onClick: handleLogout },
  ];

  const ADMIN_MENU_ITEMS = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Roles', href: '/admin/roles' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Logout', href: '#', onClick: handleLogout },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navigation 
          appName={APP_NAME}
          items={NAVIGATION_ITEMS}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          showAdminMenu={isAuthenticated && isAdmin}
          showUserMenu={isAuthenticated && !isAdmin}
          showLoginRegister={!isAuthenticated}
          userMenuItems={USER_MENU_ITEMS}
          adminMenuItems={ADMIN_MENU_ITEMS}
        />
        
        {/* Main content area with proper padding for fixed navigation */}
        <div className="pt-16">
          
          <Outlet />
        </div>
        
        <Footer appName={APP_NAME} navigationItems={NAVIGATION_ITEMS} />
      </div>
    </div>
  );
};

export default DefaultLayout;
