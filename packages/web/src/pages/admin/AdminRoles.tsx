import React from 'react';
import { Link } from 'react-router-dom';

export const AdminRoles: React.FC = () => {
  const roles = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full system access with all permissions',
      users: 1,
      permissions: ['admin:all', 'users:manage', 'roles:manage', 'settings:manage'],
      color: 'purple'
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Can manage content and moderate users',
      users: 0,
      permissions: ['content:edit', 'users:view', 'projects:manage'],
      color: 'blue'
    },
    {
      id: 3,
      name: 'User',
      description: 'Basic user with limited access',
      users: 0,
      permissions: ['profile:edit', 'content:view'],
      color: 'green'
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Role Management
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Configure roles and access levels
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors">
            Create Role
          </button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {role.name}
              </h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                role.color === 'purple' 
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : role.color === 'blue'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {role.users} {role.users === 1 ? 'user' : 'users'}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {role.description}
            </p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Permissions:
              </h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {permission}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors">
                Edit
              </button>
              <button className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Role Details */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Permission System
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The role-based permission system allows you to control access to different parts of the application. 
            Each role can have multiple permissions, and users inherit the permissions of their assigned role.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Permissions:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• <code>admin:all</code> - Full administrative access</li>
                <li>• <code>users:manage</code> - Create, edit, delete users</li>
                <li>• <code>roles:manage</code> - Manage roles and permissions</li>
                <li>• <code>content:edit</code> - Edit website content</li>
                <li>• <code>projects:manage</code> - Manage project listings</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Permission Hierarchy:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• <strong>Administrator:</strong> All permissions</li>
                <li>• <strong>Editor:</strong> Content management</li>
                <li>• <strong>User:</strong> Basic access only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/admin"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
};

export default AdminRoles;
