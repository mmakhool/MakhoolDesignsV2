import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRoles, usePermissions, useCreateRole, useUpdateRole, useDeleteRole } from '../../hooks/useUsersApi';
import { CreateRoleForm } from '../../components/forms/CreateRoleForm';
import type { CreateRoleData, Role, Permission } from '@makhool-designs/shared';

export const AdminRoles: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const { data: roles = [], isLoading: rolesLoading, error: rolesError } = useRoles() as { 
    data: Role[], 
    isLoading: boolean, 
    error: Error | null 
  };
  const { data: permissions = [], isLoading: permissionsLoading } = usePermissions() as { 
    data: Permission[], 
    isLoading: boolean 
  };
  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  const handleCreateRole = (roleData: CreateRoleData) => {
    if (editingRole) {
      // Update existing role
      updateRoleMutation.mutate(
        { id: editingRole.id, data: roleData },
        {
          onSuccess: () => {
            setIsCreateModalOpen(false);
            setEditingRole(null);
          },
        }
      );
    } else {
      // Create new role
      createRoleMutation.mutate(roleData, {
        onSuccess: () => {
          setIsCreateModalOpen(false);
        },
      });
    }
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsCreateModalOpen(true);
  };

  const handleCancelEdit = () => {
    setIsCreateModalOpen(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string, roleName: string) => {
    if (window.confirm(`Are you sure you want to delete the role "${roleName}"? This action cannot be undone.`)) {
      deleteRoleMutation.mutate(roleId);
    }
  };

  const getPermissionColor = (index: number) => {
    const colors = ['purple', 'blue', 'green', 'yellow', 'indigo'];
    return colors[index % colors.length];
  };

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
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Role
          </button>
        </div>
      </div>

      {/* Loading State */}
      {rolesLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Error State */}
      {rolesError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">
            Error loading roles: {rolesError instanceof Error ? rolesError.message : 'Unknown error'}
          </p>
        </div>
      )}

      {/* Roles Grid */}
      {!rolesLoading && !rolesError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No roles found.</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
              >
                Create Your First Role
              </button>
            </div>
          ) : (
            roles.map((role: Role, index: number) => (
              <div
                key={role.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {role.name}
                  </h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    getPermissionColor(index) === 'purple' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : getPermissionColor(index) === 'blue'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : getPermissionColor(index) === 'green'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : getPermissionColor(index) === 'yellow'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  }`}>
                    Active
                  </span>
                </div>
                
                {role.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {role.description}
                  </p>
                )}
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Permissions ({role.permissions?.length || 0}):
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions?.slice(0, 3).map((permission: Permission) => (
                      <span
                        key={permission.name}
                        className="inline-flex px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {permission.name}
                      </span>
                    ))}
                    {(role.permissions?.length || 0) > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        +{(role.permissions?.length || 0) - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditRole(role)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteRole(role.id, role.name)}
                    disabled={deleteRoleMutation.isPending}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteRoleMutation.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

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

      {/* Create Role Modal */}
      {isCreateModalOpen && (
        <CreateRoleForm
          onSubmit={handleCreateRole}
          onCancel={handleCancelEdit}
          permissions={permissions}
          isLoading={(editingRole ? updateRoleMutation.isPending : createRoleMutation.isPending) || permissionsLoading}
          editingRole={editingRole || undefined}
          mode={editingRole ? 'edit' : 'create'}
        />
      )}
    </main>
  );
};

export default AdminRoles;
