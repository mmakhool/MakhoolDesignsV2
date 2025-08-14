import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';

export const DashboardControls: React.FC = () => {
  const {
    layout,
    updateWidgetVisibility,
    resetLayout,
    exportLayout,
    importLayout,
    isCustomizationMode,
    toggleCustomizationMode
  } = useDashboard();

  const [showImportExport, setShowImportExport] = useState(false);
  const [importText, setImportText] = useState('');
  const [exportText, setExportText] = useState('');
  const [importError, setImportError] = useState('');

  const visibleWidgets = layout.widgets.filter(w => w.isVisible);
  const hiddenWidgets = layout.widgets.filter(w => !w.isVisible);

  const handleExport = () => {
    const exported = exportLayout();
    setExportText(exported);
    navigator.clipboard.writeText(exported);
  };

  const handleImport = () => {
    try {
      importLayout(importText);
      setImportText('');
      setImportError('');
      setShowImportExport(false);
    } catch {
      setImportError('Invalid layout format. Please check your input.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dashboard Customization
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage your widget layout and visibility
            </p>
          </div>
        </div>

        {/* Main Control Button */}
        <button
          onClick={toggleCustomizationMode}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            isCustomizationMode
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isCustomizationMode ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Changes
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Customize Layout
            </>
          )}
        </button>
      </div>

      {/* Customization Mode Info */}
      {isCustomizationMode && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-blue-900 dark:text-blue-100">Customization Mode Active</span>
          </div>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Hover over widgets to see controls</li>
            <li>• Drag widgets to reorder them</li>
            <li>• Use size buttons (▪ ▬ █) to resize widgets</li>
            <li>• Click the eye icon to hide widgets</li>
            <li>• Widgets are automatically saved</li>
          </ul>
        </div>
      )}

      {/* Control Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowImportExport(!showImportExport)}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Import/Export Layout
        </button>
        
        <button
          onClick={resetLayout}
          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          Reset to Default
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-400 ml-auto flex items-center">
          {visibleWidgets.length} visible • {hiddenWidgets.length} hidden
        </div>
      </div>

      {/* Hidden Widgets Section */}
      {hiddenWidgets.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Hidden Widgets ({hiddenWidgets.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {hiddenWidgets.map(widget => (
              <button
                key={widget.id}
                onClick={() => updateWidgetVisibility(widget.id, true)}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {widget.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Import/Export Panel */}
      {showImportExport && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Export Current Layout
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
              >
                Copy to Clipboard
              </button>
              {exportText && (
                <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                  ✓ Copied!
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Import Layout
            </label>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste your layout JSON here..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm h-24 resize-none"
            />
            {importError && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{importError}</p>
            )}
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Import Layout
              </button>
              <button
                onClick={() => {
                  setImportText('');
                  setImportError('');
                  setShowImportExport(false);
                }}
                className="px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Last updated: {new Date(layout.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
};
