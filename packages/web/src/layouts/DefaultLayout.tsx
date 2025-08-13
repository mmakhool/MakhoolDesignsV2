import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

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
  
  // Temporarily disable authentication to fix white screen
  const isAuthenticated = false;
  const isAdmin = false;

  // Simple user and admin menu items
  const USER_MENU_ITEMS = [
    { label: 'Profile', href: '/user/profile' },
    { label: 'Settings', href: '/user/settings' },
    { label: 'Logout', href: '#', external: false },
  ];

  const ADMIN_MENU_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Roles', href: '/admin/roles' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Logout', href: '#', external: false },
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
