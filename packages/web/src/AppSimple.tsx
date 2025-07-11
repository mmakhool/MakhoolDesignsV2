import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ContactPageSimple } from './pages/ContactPageSimple';
import './App.css';

// Simple constants since we're having import issues
const APP_NAME = 'MakhoolDesigns';
const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

const HomePage: React.FC = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Welcome to{' '}
        <span className="text-blue-600 dark:text-blue-400">{APP_NAME}</span>
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Professional web development and design services for modern businesses. 
        We create beautiful, functional websites that drive results.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/projects"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          View Our Work
        </Link>
        <Link
          to="/contact"
          className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Get in Touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>

    {/* Features Section */}
    <div className="mt-32">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 text-2xl">
            💻
          </div>
          <h3 className="mt-4 text-lg font-semibold">Web Development</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Modern, responsive websites built with the latest technologies
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 text-2xl">
            🎨
          </div>
          <h3 className="mt-4 text-lg font-semibold">Design</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Beautiful, user-friendly designs that convert visitors to customers
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 text-2xl">
            🚀
          </div>
          <h3 className="mt-4 text-lg font-semibold">Performance</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Fast, optimized websites that rank well in search engines
          </p>
        </div>
      </div>
    </div>
  </main>
);

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        This page is coming soon! We're working hard to bring you amazing content.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </main>
);

const Navigation: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void }> = ({ 
  isDarkMode, 
  toggleDarkMode 
}) => {
  const location = useLocation();
  
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {APP_NAME}
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="border-t border-gray-200 dark:border-gray-700 mt-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 {APP_NAME}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const AppContent: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/projects" element={<PlaceholderPage title="Our Projects" />} />
        <Route path="/reviews" element={<PlaceholderPage title="Client Reviews" />} />
        <Route path="/contact" element={<ContactPageSimple />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
