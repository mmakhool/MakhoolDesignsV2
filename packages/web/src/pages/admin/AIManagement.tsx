import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface AIAgent {
  id: string;
  agentId: string;
  name: string;
  role: string;
  model: string;
  enabled: boolean;
  lastActiveAt?: string;
  capabilities: Array<{
    name: string;
    description: string;
    enabled: boolean;
    priority: number;
  }>;
}

interface AITask {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  assignedAgentId?: string;
  createdAt: string;
  duration?: number;
}

interface MCPServerStatus {
  serverName: string;
  version: string;
  isRunning: boolean;
  activeConnections: number;
  totalRequestsProcessed: number;
  errorCount: number;
  lastHealthCheck?: string;
}

interface AIAnalytics {
  overview: {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    averageTaskDuration: number;
  };
  charts: {
    tasksByType: Record<string, number>;
    agentPerformance: Array<{
      agentId: string;
      name: string;
      taskCount: number;
      successRate: number;
    }>;
  };
}

export const AIManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'tasks' | 'mcp' | 'analytics'>('overview');
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [tasks, setTasks] = useState<AITask[]>([]);
  const [mcpStatus, setMcpStatus] = useState<MCPServerStatus | null>(null);
  const [analytics, setAnalytics] = useState<AIAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const loadMockData = () => {
      // Mock AI Agents
      setAgents([
        {
          id: '1',
          agentId: 'backend-agent',
          name: 'Backend Development Agent',
          role: 'developer',
          model: 'claude-3-5-sonnet-20241022',
          enabled: true,
          lastActiveAt: '2025-01-14T19:30:00Z',
          capabilities: [
            { name: 'api_design', description: 'Design and implement APIs', enabled: true, priority: 10 },
            { name: 'database_schema', description: 'Design database schemas', enabled: true, priority: 9 },
            { name: 'security_review', description: 'Security assessment', enabled: true, priority: 8 }
          ]
        },
        {
          id: '2',
          agentId: 'frontend-agent',
          name: 'Frontend Development Agent',
          role: 'developer',
          model: 'claude-3-5-sonnet-20241022',
          enabled: true,
          lastActiveAt: '2025-01-14T19:25:00Z',
          capabilities: [
            { name: 'component_development', description: 'React component development', enabled: true, priority: 10 },
            { name: 'state_management', description: 'State management with React', enabled: true, priority: 9 },
            { name: 'ui_implementation', description: 'UI implementation', enabled: true, priority: 8 }
          ]
        },
        {
          id: '3',
          agentId: 'qa-agent',
          name: 'Quality Assurance Agent',
          role: 'tester',
          model: 'claude-3-5-sonnet-20241022',
          enabled: true,
          lastActiveAt: '2025-01-14T19:20:00Z',
          capabilities: [
            { name: 'quality_review', description: 'Quality assurance review', enabled: true, priority: 10 },
            { name: 'bug_analysis', description: 'Bug detection and analysis', enabled: true, priority: 9 },
            { name: 'test_planning', description: 'Test planning and strategy', enabled: true, priority: 8 }
          ]
        },
        {
          id: '4',
          agentId: 'project-manager-agent',
          name: 'Project Manager Agent',
          role: 'manager',
          model: 'claude-3-5-sonnet-20241022',
          enabled: false,
          lastActiveAt: '2025-01-14T18:45:00Z',
          capabilities: [
            { name: 'feature_planning', description: 'Feature planning and coordination', enabled: true, priority: 10 },
            { name: 'task_management', description: 'Task breakdown and management', enabled: true, priority: 9 }
          ]
        }
      ]);

      // Mock AI Tasks
      setTasks([
        {
          id: '1',
          title: 'Implement User Authentication API',
          description: 'Create secure authentication endpoints with JWT tokens',
          type: 'feature_development',
          status: 'completed',
          priority: 'high',
          assignedAgentId: 'backend-agent',
          createdAt: '2025-01-14T10:00:00Z',
          duration: 3600000 // 1 hour in ms
        },
        {
          id: '2',
          title: 'Code Review: Payment Processing',
          description: 'Review payment processing code for security vulnerabilities',
          type: 'code_review',
          status: 'in_progress',
          priority: 'urgent',
          assignedAgentId: 'qa-agent',
          createdAt: '2025-01-14T14:30:00Z'
        },
        {
          id: '3',
          title: 'Design User Profile Component',
          description: 'Create reusable user profile component with avatar upload',
          type: 'ui_design',
          status: 'pending',
          priority: 'medium',
          assignedAgentId: 'frontend-agent',
          createdAt: '2025-01-14T16:15:00Z'
        },
        {
          id: '4',
          title: 'Plan Feature: Real-time Notifications',
          description: 'Plan architecture and implementation for real-time notification system',
          type: 'feature_planning',
          status: 'failed',
          priority: 'high',
          assignedAgentId: 'project-manager-agent',
          createdAt: '2025-01-14T08:00:00Z'
        }
      ]);

      // Mock MCP Server Status
      setMcpStatus({
        serverName: 'makhool-designs-agents',
        version: '1.0.0',
        isRunning: true,
        activeConnections: 3,
        totalRequestsProcessed: 1247,
        errorCount: 12,
        lastHealthCheck: '2025-01-14T19:32:00Z'
      });

      // Mock Analytics
      setAnalytics({
        overview: {
          totalTasks: 28,
          completedTasks: 22,
          failedTasks: 3,
          averageTaskDuration: 2850000 // ~47 minutes
        },
        charts: {
          tasksByType: {
            'feature_development': 12,
            'code_review': 8,
            'bug_fix': 4,
            'documentation': 2,
            'ui_design': 2
          },
          agentPerformance: [
            { agentId: 'backend-agent', name: 'Backend Agent', taskCount: 15, successRate: 0.93 },
            { agentId: 'frontend-agent', name: 'Frontend Agent', taskCount: 8, successRate: 0.88 },
            { agentId: 'qa-agent', name: 'QA Agent', taskCount: 5, successRate: 1.0 }
          ]
        }
      });

      setLoading(false);
    };

    loadMockData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'cancelled': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'low': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A';
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{agents.filter(a => a.enabled).length}</div>
              <div className="text-sm opacity-90">Active Agents</div>
            </div>
            <div className="text-3xl opacity-80">🤖</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'completed').length}</div>
              <div className="text-sm opacity-90">Completed Tasks</div>
            </div>
            <div className="text-3xl opacity-80">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'in_progress').length}</div>
              <div className="text-sm opacity-90">In Progress</div>
            </div>
            <div className="text-3xl opacity-80">⚡</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{mcpStatus?.isRunning ? '✓' : '✗'}</div>
              <div className="text-sm opacity-90">MCP Server</div>
            </div>
            <div className="text-3xl opacity-80">🔧</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-xl">
              ⚡
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Quick Task</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Assign new task to best agent</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-xl">
              🔍
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Code Review</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Start automated code review</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-xl">
              📋
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Feature Planning</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Plan new feature with AI</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent AI Tasks</h3>
          <button 
            onClick={() => setActiveTab('tasks')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {tasks.slice(0, 5).map(task => (
            <div key={task.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {task.assignedAgentId} • {formatTimeAgo(task.createdAt)}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Agents</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          Add New Agent
        </button>
      </div>
      
      <div className="grid gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                  agent.enabled 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-gray-100 dark:bg-gray-900'
                }`}>
                  🤖
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{agent.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      agent.enabled 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {agent.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <span>•</span>
                    <span>Role: {agent.role}</span>
                    <span>•</span>
                    <span>Model: {agent.model}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Configure
                </button>
                <button className={`text-sm font-medium ${
                  agent.enabled 
                    ? 'text-orange-600 hover:text-orange-700' 
                    : 'text-green-600 hover:text-green-700'
                }`}>
                  {agent.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Capabilities</div>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.slice(0, 6).map((capability, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs"
                  >
                    {capability.name.replace('_', ' ')}
                  </span>
                ))}
                {agent.capabilities.length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400 rounded-full text-xs">
                    +{agent.capabilities.length - 6} more
                  </span>
                )}
              </div>
            </div>
            
            {agent.lastActiveAt && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last active: {formatTimeAgo(agent.lastActiveAt)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tasks</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          Create Task
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {task.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {task.assignedAgentId ? agents.find(a => a.agentId === task.assignedAgentId)?.name || task.assignedAgentId : 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {formatDuration(task.duration)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {formatTimeAgo(task.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700">View</button>
                      {task.status === 'failed' && (
                        <button className="text-green-600 hover:text-green-700">Retry</button>
                      )}
                      {(task.status === 'pending' || task.status === 'in_progress') && (
                        <button className="text-red-600 hover:text-red-700">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMCP = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">MCP Server Management</h3>
        <div className="flex items-center gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
            Health Check
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Restart Server
          </button>
        </div>
      </div>

      {mcpStatus && (
        <>
          {/* Server Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                mcpStatus.isRunning 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                🔧
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{mcpStatus.serverName}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    mcpStatus.isRunning 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {mcpStatus.isRunning ? 'Running' : 'Stopped'}
                  </span>
                  <span>•</span>
                  <span>Version: {mcpStatus.version}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mcpStatus.activeConnections}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Connections</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{mcpStatus.totalRequestsProcessed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Requests Processed</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{mcpStatus.errorCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Errors</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {mcpStatus.lastHealthCheck ? formatTimeAgo(mcpStatus.lastHealthCheck) : 'Never'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Last Health Check</div>
              </div>
            </div>
          </div>

          {/* Server Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Server Configuration</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Connections
                  </label>
                  <input 
                    type="number" 
                    defaultValue="10" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Request Timeout (ms)
                  </label>
                  <input 
                    type="number" 
                    defaultValue="30000" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  Reset
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Update Configuration
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analytics & Insights</h3>

      {analytics && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.overview.totalTasks}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600">{analytics.overview.completedTasks}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-red-600">{analytics.overview.failedTasks}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600">
                {formatDuration(analytics.overview.averageTaskDuration)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Duration</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tasks by Type */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks by Type</h4>
              <div className="space-y-3">
                {Object.entries(analytics.charts.tasksByType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {type.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Agent Performance</h4>
              <div className="space-y-4">
                {analytics.charts.agentPerformance.map(agent => (
                  <div key={agent.agentId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{agent.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round(agent.successRate * 100)}% success
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${agent.successRate * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{agent.taskCount} tasks</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Management</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage AI agents, tasks, and MCP server infrastructure
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            to="/admin" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'agents', name: 'Agents', icon: '🤖' },
            { id: 'tasks', name: 'Tasks', icon: '📋' },
            { id: 'mcp', name: 'MCP Server', icon: '🔧' },
            { id: 'analytics', name: 'Analytics', icon: '📈' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'agents' | 'tasks' | 'mcp' | 'analytics')}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'agents' && renderAgents()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'mcp' && renderMCP()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default AIManagement;
