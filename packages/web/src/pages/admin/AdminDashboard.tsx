import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import Enhanced Widgets
import { EnhancedServerStatusWidget } from '../../components/widgets/EnhancedServerStatusWidget';
import { EnhancedWoWWidget } from '../../components/widgets/EnhancedWoWWidget';
import { PokemonWidget } from '../../components/widgets/PokemonWidget';
import { StarWarsCharacterWidget } from '../../components/widgets/StarWarsCharacterWidget';

// Dashboard Categories
interface DashboardSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  widgets?: React.ComponentType[];
  links?: { title: string; href: string; icon: string; description: string }[];
}

const dashboardSections: DashboardSection[] = [
  {
    id: 'management',
    title: 'System Management',
    icon: '⚙️',
    description: 'Core admin functionality',
    links: [
      {
        title: 'User Management',
        href: '/admin/users',
        icon: '👥',
        description: 'Manage user accounts and permissions'
      },
      {
        title: 'Role Management',
        href: '/admin/roles',
        icon: '🔐',
        description: 'Configure roles and access levels'
      },
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: '⚙️',
        description: 'Application configuration'
      },
      {
        title: 'Audit Logs',
        href: '/admin/logs',
        icon: '📋',
        description: 'System activity and logs'
      }
    ]
  },
  {
    id: 'ai-management',
    title: 'AI Management',
    icon: '🤖',
    description: 'Manage AI agents, tasks, and MCP server infrastructure',
    links: [
      {
        title: 'AI Dashboard',
        href: '/admin/ai',
        icon: '📊',
        description: 'Overview of AI system status and metrics'
      },
      {
        title: 'Agent Management',
        href: '/admin/ai/agents',
        icon: '🤖',
        description: 'Configure and monitor AI agents'
      },
      {
        title: 'Task Queue',
        href: '/admin/ai/tasks',
        icon: '📋',
        description: 'Monitor and manage AI task execution'
      },
      {
        title: 'MCP Server',
        href: '/admin/ai/mcp',
        icon: '🔧',
        description: 'Model Context Protocol server management'
      }
    ]
  },
  {
    id: 'gaming',
    title: 'Gaming APIs',
    icon: '🎮',
    description: 'World of Warcraft integration with your Battle.net data',
    widgets: [EnhancedWoWWidget, EnhancedServerStatusWidget]
  },
  {
    id: 'entertainment',
    title: 'Entertainment APIs',
    icon: '🌟',
    description: 'Star Wars and Pokémon API showcases',
    widgets: [StarWarsCharacterWidget, PokemonWidget]
  }
];

type ViewMode = 'overview' | 'management' | 'ai-management' | 'gaming' | 'entertainment';

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-90">Total Users</div>
            </div>
            <div className="text-3xl opacity-80">👥</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-90">System Roles</div>
            </div>
            <div className="text-3xl opacity-80">🔐</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">System Uptime</div>
            </div>
            <div className="text-3xl opacity-80">🟢</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm opacity-90">API Widgets</div>
            </div>
            <div className="text-3xl opacity-80">🎮</div>
          </div>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {dashboardSections.map((section) => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => {
                if (section.id === 'management') setCurrentView('management');
                else if (section.id === 'ai-management') setCurrentView('ai-management');
                else if (section.id === 'gaming') setCurrentView('gaming');
                else if (section.id === 'entertainment') setCurrentView('entertainment');
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{section.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>
              
              {section.links && (
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {section.links.length} management tools →
                </div>
              )}
              
              {section.widgets && (
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  {section.widgets.length} interactive widgets →
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderManagementView = () => {
    const managementSection = dashboardSections.find(s => s.id === 'management');
    if (!managementSection?.links) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentView('overview')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Overview
          </button>
          <div className="text-3xl">{managementSection.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {managementSection.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {managementSection.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {managementSection.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                Access {link.title} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderAIManagementView = () => {
    const aiSection = dashboardSections.find(s => s.id === 'ai-management');
    if (!aiSection?.links) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentView('overview')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Overview
          </button>
          <div className="text-3xl">{aiSection.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {aiSection.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {aiSection.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiSection.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-2xl">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 group-hover:underline">
                Access {link.title} →
              </div>
            </Link>
          ))}
        </div>

        {/* AI System Status Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🤖</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI System Status</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The AI management system provides comprehensive control over your multi-agent development team. 
            Monitor agent performance, assign tasks, coordinate complex workflows, and maintain your MCP server infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-green-600">3</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Active Agents</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-blue-600">12</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Tasks Today</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-purple-600">94%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-green-600">✓</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">MCP Server</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWidgetView = (sectionId: 'gaming' | 'entertainment') => {
    const section = dashboardSections.find(s => s.id === sectionId);
    if (!section?.widgets) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentView('overview')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Overview
          </button>
          <div className="text-3xl">{section.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {section.description}
            </p>
          </div>
        </div>

        <div className={`grid gap-6 ${
          sectionId === 'gaming' 
            ? 'grid-cols-1 lg:grid-cols-2' 
            : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'
        }`}>
          {section.widgets.map((WidgetComponent, index) => (
            <div 
              key={index}
              className="transform hover:scale-[1.01] transition-transform duration-300"
            >
              <WidgetComponent />
            </div>
          ))}
        </div>

        {sectionId === 'gaming' && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">🎮</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Battle.net Integration</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              These widgets showcase advanced integration with the World of Warcraft API using your Battle.net tag <strong>Mick#11520</strong>. 
              Features include character management, guild information, server status monitoring, and real-time game data. 
              Perfect demonstration of personalized API integration with interactive UI components.
            </p>
          </div>
        )}

        {sectionId === 'entertainment' && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">🌟</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Entertainment APIs</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Showcasing integration with popular entertainment APIs including SWAPI (Star Wars API) and PokéAPI. 
              These widgets demonstrate different API patterns, data structures, and visual presentation styles. 
              Great examples of consuming public APIs with proper error handling and beautiful UI design.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      {currentView !== 'overview' && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <button 
            onClick={() => setCurrentView('overview')}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Dashboard
          </button>
          <span>→</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {currentView === 'management' && 'System Management'}
            {currentView === 'gaming' && 'Gaming APIs'}
            {currentView === 'entertainment' && 'Entertainment APIs'}
          </span>
        </div>
      )}

      {/* Content based on current view */}
      {currentView === 'overview' && renderOverview()}
      {currentView === 'management' && renderManagementView()}
      {currentView === 'ai-management' && renderAIManagementView()}
      {currentView === 'gaming' && renderWidgetView('gaming')}
      {currentView === 'entertainment' && renderWidgetView('entertainment')}
    </div>
  );
};

export default AdminDashboard;
