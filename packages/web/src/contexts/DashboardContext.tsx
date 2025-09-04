import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Types
interface Widget {
  id: string;
  name: string;
  component: string;
  size: 'small' | 'medium' | 'large';
  isVisible: boolean;
  position: number;
  props?: Record<string, any>;
}

interface DashboardLayout {
  widgets: Widget[];
  lastUpdated: number;
}

interface DashboardState {
  layout: DashboardLayout;
  isCustomizationMode: boolean;
}

// Actions
type DashboardAction =
  | { type: 'UPDATE_WIDGET_VISIBILITY'; id: string; isVisible: boolean }
  | { type: 'UPDATE_WIDGET_SIZE'; id: string; size: Widget['size'] }
  | { type: 'UPDATE_WIDGET_POSITION'; id: string; position: number }
  | { type: 'REORDER_WIDGETS'; widgets: Widget[] }
  | { type: 'RESET_LAYOUT' }
  | { type: 'IMPORT_LAYOUT'; layout: DashboardLayout }
  | { type: 'TOGGLE_CUSTOMIZATION_MODE' };

// Default widgets
const defaultWidgets: Widget[] = [
  {
    id: 'starwars-character',
    name: 'Star Wars Character',
    component: 'StarWarsCharacterWidget',
    size: 'medium',
    isVisible: true,
    position: 0
  },
  {
    id: 'wow-character',
    name: 'WoW Character',
    component: 'WoWCharacterWidget', 
    size: 'medium',
    isVisible: true,
    position: 1
  },
  {
    id: 'wow-server-status',
    name: 'WoW Server Status',
    component: 'WoWServerStatusWidget',
    size: 'large',
    isVisible: true,
    position: 2
  },
  {
    id: 'pokemon',
    name: 'Pokemon',
    component: 'PokemonWidget',
    size: 'medium',
    isVisible: false,
    position: 3
  }
];

const initialState: DashboardState = {
  layout: {
    widgets: defaultWidgets,
    lastUpdated: Date.now()
  },
  isCustomizationMode: false
};

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'UPDATE_WIDGET_VISIBILITY':
      return {
        ...state,
        layout: {
          ...state.layout,
          widgets: state.layout.widgets.map(widget =>
            widget.id === action.id ? { ...widget, isVisible: action.isVisible } : widget
          ),
          lastUpdated: Date.now()
        }
      };

    case 'UPDATE_WIDGET_SIZE':
      return {
        ...state,
        layout: {
          ...state.layout,
          widgets: state.layout.widgets.map(widget =>
            widget.id === action.id ? { ...widget, size: action.size } : widget
          ),
          lastUpdated: Date.now()
        }
      };

    case 'UPDATE_WIDGET_POSITION':
      return {
        ...state,
        layout: {
          ...state.layout,
          widgets: state.layout.widgets.map(widget =>
            widget.id === action.id ? { ...widget, position: action.position } : widget
          ),
          lastUpdated: Date.now()
        }
      };

    case 'REORDER_WIDGETS':
      return {
        ...state,
        layout: {
          ...state.layout,
          widgets: action.widgets,
          lastUpdated: Date.now()
        }
      };

    case 'RESET_LAYOUT':
      return {
        ...state,
        layout: {
          widgets: defaultWidgets,
          lastUpdated: Date.now()
        }
      };

    case 'IMPORT_LAYOUT':
      return {
        ...state,
        layout: action.layout
      };

    case 'TOGGLE_CUSTOMIZATION_MODE':
      return {
        ...state,
        isCustomizationMode: !state.isCustomizationMode
      };

    default:
      return state;
  }
}

// Context
interface DashboardContextValue {
  layout: DashboardLayout;
  isCustomizationMode: boolean;
  updateWidgetVisibility: (id: string, isVisible: boolean) => void;
  updateWidgetSize: (id: string, size: Widget['size']) => void;
  updateWidgetPosition: (id: string, position: number) => void;
  reorderWidgets: (widgets: Widget[]) => void;
  resetLayout: () => void;
  exportLayout: () => string;
  importLayout: (layoutJson: string) => void;
  toggleCustomizationMode: () => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

// Provider
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const updateWidgetVisibility = useCallback((id: string, isVisible: boolean) => {
    dispatch({ type: 'UPDATE_WIDGET_VISIBILITY', id, isVisible });
  }, []);

  const updateWidgetSize = useCallback((id: string, size: Widget['size']) => {
    dispatch({ type: 'UPDATE_WIDGET_SIZE', id, size });
  }, []);

  const updateWidgetPosition = useCallback((id: string, position: number) => {
    dispatch({ type: 'UPDATE_WIDGET_POSITION', id, position });
  }, []);

  const reorderWidgets = useCallback((widgets: Widget[]) => {
    dispatch({ type: 'REORDER_WIDGETS', widgets });
  }, []);

  const resetLayout = useCallback(() => {
    dispatch({ type: 'RESET_LAYOUT' });
  }, []);

  const exportLayout = useCallback(() => {
    return JSON.stringify(state.layout, null, 2);
  }, [state.layout]);

  const importLayout = useCallback((layoutJson: string) => {
    try {
      const layout = JSON.parse(layoutJson) as DashboardLayout;
      // Basic validation
      if (!layout.widgets || !Array.isArray(layout.widgets)) {
        throw new Error('Invalid layout format');
      }
      dispatch({ type: 'IMPORT_LAYOUT', layout });
    } catch (error) {
      throw new Error('Invalid layout format');
    }
  }, []);

  const toggleCustomizationMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_CUSTOMIZATION_MODE' });
  }, []);

  const value: DashboardContextValue = {
    layout: state.layout,
    isCustomizationMode: state.isCustomizationMode,
    updateWidgetVisibility,
    updateWidgetSize,
    updateWidgetPosition,
    reorderWidgets,
    resetLayout,
    exportLayout,
    importLayout,
    toggleCustomizationMode
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Hook
export const useDashboard = (): DashboardContextValue => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Export types for external use
export type { Widget, DashboardLayout };