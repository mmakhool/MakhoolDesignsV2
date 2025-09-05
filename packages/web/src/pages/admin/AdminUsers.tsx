import React, { useState, memo, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CreateUserForm } from '../../components/forms/CreateUserForm';
import { EditUserForm } from '../../components/forms/EditUserForm';
import { useActiveRoles, useCreateUser, useDeleteUser, useToggleUserActive, useUpdateUser, useUsers } from '../../hooks/useUsersApi';
import type { UpdateUserData } from '@makhool-designs/shared';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isActive: boolean;
  role?: {
    id: string;
    name: string;
  };
  lastLoginAt?: string;
  createdAt: string;
}

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  roleId: string;
  isActive: boolean;
}

export const AdminUsers: React.FC = memo(() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // API hooks
  const { data: users = [], isLoading: usersLoading, error: usersError } = useUsers();
  const { data: roles = [], isLoading: rolesLoading } = useActiveRoles();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const toggleUserActiveMutation = useToggleUserActive();

  const handleCreateUser = useCallback(async (userData: CreateUserData) => {
    try {
      await createUserMutation.mutateAsync(userData);
      setIsCreateModalOpen(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Failed to create user:', error);
    }
  }, [createUserMutation]);

  const handleUpdateUser = useCallback(async (userData: UpdateUserData) => {
    if (!editingUser) return;
    
    try {
      await updateUserMutation.mutateAsync({ id: editingUser.id, data: userData });
      setEditingUser(null);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Failed to update user:', error);
    }
  }, [updateUserMutation, editingUser]);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
  }, []);

  const handleDeleteUser = useCallback(async (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await deleteUserMutation.mutateAsync(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  }, [deleteUserMutation]);

  const handleToggleUserActive = useCallback(async (userId: string) => {
    try {
      await toggleUserActiveMutation.mutateAsync(userId);
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  }, [toggleUserActiveMutation]);

  const formatDate = useMemo(() => (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const formatDateTime = useMemo(() => (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const getRoleColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'sysadmin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'sysmanager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'user':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (usersError) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            Error loading users: {usersError.message}
          </div>
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                User Management
              </h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Manage user accounts, roles, and permissions.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                disabled={rolesLoading}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rolesLoading ? 'Loading...' : 'Add User'}
              </button>
            </div>
          </div>

          {usersLoading ? (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading users...</p>
            </div>
          ) : (
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Last Login
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                              <div className="text-gray-500 dark:text-gray-400">
                                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                <p className="text-sm font-medium">No users found</p>
                                <p className="text-sm text-gray-400">Get started by creating a new user account.</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          users.map((user: User) => (
                            <tr key={user.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role?.name || 'user')}`}>
                                  {user.role?.name || 'No Role'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleToggleUserActive(user.id)}
                                  disabled={toggleUserActiveMutation.isPending}
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                                    user.isActive
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                                  } ${toggleUserActiveMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                {formatDateTime(user.lastLoginAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                {formatDate(user.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  onClick={() => handleEditUser(user)}
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                  title="Edit user"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                                  disabled={deleteUserMutation.isPending}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <CreateUserForm
          roles={roles}
          onSubmit={handleCreateUser}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={createUserMutation.isPending}
        />
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          roles={roles}
          onSubmit={handleUpdateUser}
          onCancel={() => setEditingUser(null)}
          isLoading={updateUserMutation.isPending}
        />
      )}
    </main>
  );
});

AdminUsers.displayName = 'AdminUsers';

export default AdminUsers;
