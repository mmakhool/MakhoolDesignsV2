import React, { useState, useEffect } from 'react';
import type { CreateRoleData, Permission, Role } from '@makhool-designs/shared';

interface CreateRoleFormProps {
  onSubmit: (roleData: CreateRoleData) => void;
  onCancel: () => void;
  permissions: Permission[];
  isLoading?: boolean;
  editingRole?: Role; // Optional role to edit
  mode?: 'create' | 'edit';
}

export const CreateRoleForm: React.FC<CreateRoleFormProps> = ({
  onSubmit,
  onCancel,
  permissions,
  isLoading = false,
  editingRole,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState({
    name: editingRole?.name || '',
    description: editingRole?.description || '',
    permissionNames: editingRole?.permissions?.map(p => p.name) || [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when editingRole changes
  useEffect(() => {
    if (editingRole) {
      setFormData({
        name: editingRole.name,
        description: editingRole.description || '',
        permissionNames: editingRole.permissions?.map(p => p.name) || [],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissionNames: [],
      });
    }
    setErrors({});
  }, [editingRole]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }

    if (formData.permissionNames.length === 0) {
      newErrors.permissionNames = 'At least one permission is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        description: formData.description || undefined,
      });
      // Reset form
      setFormData({
        name: '',
        description: '',
        permissionNames: [],
      });
      setErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePermissionToggle = (permissionName: string) => {
    setFormData(prev => ({
      ...prev,
      permissionNames: prev.permissionNames.includes(permissionName)
        ? prev.permissionNames.filter(p => p !== permissionName)
        : [...prev.permissionNames, permissionName]
    }));
    // Clear error when user selects permissions
    if (errors.permissionNames) {
      setErrors(prev => ({ ...prev, permissionNames: '' }));
    }
  };

  const selectAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissionNames: permissions.map(p => p.name),
    }));
    if (errors.permissionNames) {
      setErrors(prev => ({ ...prev, permissionNames: '' }));
    }
  };

  const clearAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissionNames: [],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {mode === 'edit' ? 'Edit Role' : 'Create New Role'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white ${
                errors.name
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., Content Manager"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe the role's purpose and responsibilities..."
              disabled={isLoading}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Permissions * ({formData.permissionNames.length} selected)
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={selectAllPermissions}
                  className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  disabled={isLoading}
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAllPermissions}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  disabled={isLoading}
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3 space-y-2">
              {permissions.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  Loading permissions...
                </p>
              ) : (
                permissions.map((permission) => (
                  <label key={permission.name} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.permissionNames.includes(permission.name)}
                      onChange={() => handlePermissionToggle(permission.name)}
                      className="mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                      disabled={isLoading}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </div>
                      {permission.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {permission.description}
                        </div>
                      )}
                    </div>
                  </label>
                ))
              )}
            </div>
            
            {errors.permissionNames && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.permissionNames}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || permissions.length === 0}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === 'edit' ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                mode === 'edit' ? 'Update Role' : 'Create Role'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};