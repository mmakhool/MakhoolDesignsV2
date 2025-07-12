const UserSettings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Account Settings
            </h1>
            
            <div className="space-y-8">
              {/* Password Settings */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Change Password
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Email notifications for project updates
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      SMS notifications for urgent updates
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="marketing-emails"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Marketing emails and newsletters
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Privacy Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Privacy Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="profile-public"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="profile-public" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Make my profile public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="analytics-tracking"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="analytics-tracking" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Allow analytics tracking to improve our service
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Theme Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Theme
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Language
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Danger Zone */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
                  Danger Zone
                </h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-6">
            <div className="flex justify-end space-x-3">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
