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

const USER_MENU_ITEMS = [
  { label: 'Profile', href: '/user/profile' },
  { label: 'Settings', href: '/user/settings' },
];

const ADMIN_MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Roles', href: '/admin/roles' },
  { label: 'Settings', href: '/admin/settings' },
];

const DefaultLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // For demo purposes, let's simulate authentication state
  // In a real app, this would come from an auth context or state management
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start as not authenticated to show login/register
  const [isAdmin, setIsAdmin] = useState(false);

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
          {/* Demo Authentication Controls - Hidden by default, can be shown for testing */}
          <div className="fixed top-20 right-4 z-40 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-30 hover:opacity-100 transition-opacity"
            style={{ display: 'none' }}
          >
            <div className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">
              Demo Auth
            </div>
            <div className="text-xs mb-1 text-gray-500 dark:text-gray-400">
              {isAuthenticated ? (isAdmin ? 'Admin' : 'User') : 'Logged out'}
            </div>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setIsAdmin(false);
                }}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(true);
                  setIsAdmin(false);
                }}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                User
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(true);
                  setIsAdmin(true);
                }}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
          
          <Outlet />
        </div>
        
        <Footer appName={APP_NAME} navigationItems={NAVIGATION_ITEMS} />
      </div>
    </div>
  );
};

export default DefaultLayout;
