import { z } from 'zod';

/**
 * AI Agent Types and Configurations
 */

// Agent Roles
export enum AgentRole {
  COPILOT = 'copilot',
  ARCHITECT = 'architect',
  DEVELOPER = 'developer', 
  REVIEWER = 'reviewer',
  TESTER = 'tester',
  DOCUMENTOR = 'documentor'
}

// Agent Capabilities
export const AgentCapabilitySchema = z.object({
  name: z.string(),
  description: z.string(),
  enabled: z.boolean().default(true),
  priority: z.number().min(1).max(10).default(5)
});

export type AgentCapability = z.infer<typeof AgentCapabilitySchema>;

// Agent Configuration
export const AgentConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.nativeEnum(AgentRole),
  model: z.string(),
  systemPrompt: z.string(),
  capabilities: z.array(AgentCapabilitySchema),
  maxTokens: z.number().default(4000),
  temperature: z.number().min(0).max(2).default(0.7),
  enabled: z.boolean().default(true),
  apiKey: z.string().optional(),
  baseUrl: z.string().optional()
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

// Task Types
export enum TaskType {
  CODE_GENERATION = 'code_generation',
  CODE_REVIEW = 'code_review',
  BUG_FIX = 'bug_fix',
  REFACTORING = 'refactoring',
  TESTING = 'testing',
  DOCUMENTATION = 'documentation',
  ARCHITECTURE_PLANNING = 'architecture_planning',
  FEATURE_PLANNING = 'feature_planning',
  API_DESIGN = 'api_design',
  DATABASE_SCHEMA = 'database_schema',
  SECURITY_REVIEW = 'security_review',
  PERFORMANCE_OPTIMIZATION = 'performance_optimization',
  UI_DESIGN = 'ui_design',
  UX_ANALYSIS = 'ux_analysis',
  COMPONENT_DEVELOPMENT = 'component_development',
  STATE_MANAGEMENT = 'state_management',
  DEPLOYMENT = 'deployment',
  MONITORING = 'monitoring'
}

// Task Priority
export enum TaskPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4
}

// Task Status
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Task Schema
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.nativeEnum(TaskType),
  priority: z.nativeEnum(TaskPriority).default(TaskPriority.MEDIUM),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
  assignedAgentId: z.string().optional(),
  requiredCapabilities: z.array(z.string()).default([]),
  context: z.record(z.any()).optional(),
  files: z.array(z.string()).default([]),
  dependencies: z.array(z.string()).default([]),
  estimatedDuration: z.number().optional(), // in minutes
  actualDuration: z.number().optional(), // in minutes
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  completedAt: z.date().optional(),
  result: z.record(z.any()).optional(),
  error: z.string().optional()
});

export type Task = z.infer<typeof TaskSchema>;

// Agent Response Schema
export const AgentResponseSchema = z.object({
  agentId: z.string(),
  taskId: z.string(),
  success: z.boolean(),
  result: z.record(z.any()).optional(),
  error: z.string().optional(),
  duration: z.number(), // in milliseconds
  tokensUsed: z.number().optional(),
  confidence: z.number().min(0).max(1).optional()
});

export type AgentResponse = z.infer<typeof AgentResponseSchema>;

// MCP Tool Schema
export const MCPToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  inputSchema: z.record(z.any()),
  handler: z.string() // function name or module path
});

export type MCPTool = z.infer<typeof MCPToolSchema>;

// Collaboration Message Schema
export const CollaborationMessageSchema = z.object({
  id: z.string(),
  from: z.string(), // agent ID
  to: z.string().optional(), // agent ID, optional for broadcast
  type: z.enum(['request', 'response', 'notification', 'broadcast']),
  subject: z.string(),
  content: z.string(),
  data: z.record(z.any()).optional(),
  timestamp: z.date().default(() => new Date()),
  priority: z.nativeEnum(TaskPriority).default(TaskPriority.MEDIUM)
});

export type CollaborationMessage = z.infer<typeof CollaborationMessageSchema>;

// Project Context Schema
export const ProjectContextSchema = z.object({
  name: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  packages: z.array(z.string()),
  currentBranch: z.string().default('main'),
  recentChanges: z.array(z.string()).default([]),
  openTasks: z.array(z.string()).default([]),
  codebaseStats: z.object({
    totalFiles: z.number(),
    totalLines: z.number(),
    languages: z.record(z.number())
  }).optional()
});

export type ProjectContext = z.infer<typeof ProjectContextSchema>;

// Agent Metrics Schema
export const AgentMetricsSchema = z.object({
  agentId: z.string(),
  tasksCompleted: z.number().default(0),
  tasksSuccessful: z.number().default(0),
  tasksFailed: z.number().default(0),
  averageResponseTime: z.number().default(0), // in milliseconds
  totalTokensUsed: z.number().default(0),
  averageConfidence: z.number().min(0).max(1).default(0),
  lastActive: z.date().optional(),
  uptime: z.number().default(0) // in seconds
});

export type AgentMetrics = z.infer<typeof AgentMetricsSchema>;

// Default Agent Configurations
export const DEFAULT_AGENT_CONFIGS: AgentConfig[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot Agent',
    role: AgentRole.COPILOT,
    model: 'copilot',
    systemPrompt: 'You are GitHub Copilot, an AI programming assistant. You help with code completion, generation, and debugging while working collaboratively with other AI agents.',
    capabilities: [
      { name: 'code_completion', description: 'Complete code snippets and functions', enabled: true, priority: 9 },
      { name: 'code_generation', description: 'Generate new code from descriptions', enabled: true, priority: 8 },
      { name: 'debugging', description: 'Help identify and fix bugs', enabled: true, priority: 7 },
      { name: 'refactoring', description: 'Improve code structure and quality', enabled: true, priority: 6 }
    ],
    maxTokens: 4000,
    temperature: 0.3,
    enabled: true
  },
  {
    id: 'claude-architect',
    name: 'Claude Architecture Agent',
    role: AgentRole.ARCHITECT,
    model: 'claude-3-5-sonnet-20241022',
    systemPrompt: 'You are an expert software architect specializing in modern web development. You design system architecture, plan features, and ensure code quality standards. You work with the MakhoolDesigns monorepo using React, NestJS, and TypeScript.',
    capabilities: [
      { name: 'architecture_design', description: 'Design system architecture and patterns', enabled: true, priority: 10 },
      { name: 'feature_planning', description: 'Plan and design new features', enabled: true, priority: 9 },
      { name: 'code_review', description: 'Review code for architecture compliance', enabled: true, priority: 8 },
      { name: 'performance_optimization', description: 'Optimize system performance', enabled: true, priority: 7 }
    ],
    maxTokens: 8000,
    temperature: 0.5,
    enabled: true
  },
  {
    id: 'gpt-developer',
    name: 'GPT Development Agent',
    role: AgentRole.DEVELOPER,
    model: 'gpt-4o',
    systemPrompt: 'You are a senior full-stack developer specialized in the MakhoolDesigns tech stack (React 19, NestJS, TypeScript, MikroORM, PostgreSQL). You implement features, fix bugs, and write comprehensive code.',
    capabilities: [
      { name: 'feature_implementation', description: 'Implement new features and functionality', enabled: true, priority: 10 },
      { name: 'bug_fixing', description: 'Identify and fix bugs in the codebase', enabled: true, priority: 9 },
      { name: 'database_operations', description: 'Work with database schemas and queries', enabled: true, priority: 8 },
      { name: 'api_development', description: 'Develop REST APIs with NestJS', enabled: true, priority: 9 }
    ],
    maxTokens: 6000,
    temperature: 0.4,
    enabled: true
  },
  {
    id: 'claude-reviewer',
    name: 'Claude Review Agent',
    role: AgentRole.REVIEWER,
    model: 'claude-3-5-haiku-20241022',
    systemPrompt: 'You are a meticulous code reviewer focused on quality, security, and best practices. You review code changes, suggest improvements, and ensure compliance with coding standards.',
    capabilities: [
      { name: 'code_review', description: 'Comprehensive code review and analysis', enabled: true, priority: 10 },
      { name: 'security_audit', description: 'Security vulnerability assessment', enabled: true, priority: 9 },
      { name: 'performance_review', description: 'Performance impact analysis', enabled: true, priority: 8 },
      { name: 'standards_compliance', description: 'Ensure coding standards compliance', enabled: true, priority: 8 }
    ],
    maxTokens: 4000,
    temperature: 0.2,
    enabled: true
  },
  {
    id: 'gpt-tester',
    name: 'GPT Testing Agent',
    role: AgentRole.TESTER,
    model: 'gpt-4o-mini',
    systemPrompt: 'You are a QA engineer and testing specialist. You create comprehensive test suites, identify edge cases, and ensure code quality through testing.',
    capabilities: [
      { name: 'unit_testing', description: 'Create unit tests for components and functions', enabled: true, priority: 10 },
      { name: 'integration_testing', description: 'Design integration test scenarios', enabled: true, priority: 9 },
      { name: 'e2e_testing', description: 'End-to-end testing with Playwright/Cypress', enabled: true, priority: 8 },
      { name: 'test_automation', description: 'Automate testing workflows', enabled: true, priority: 7 }
    ],
    maxTokens: 3000,
    temperature: 0.3,
    enabled: true
  },
  {
    id: 'claude-documentor',
    name: 'Claude Documentation Agent',
    role: AgentRole.DOCUMENTOR,
    model: 'claude-3-5-haiku-20241022',
    systemPrompt: 'You are a technical writer specializing in software documentation. You create clear, comprehensive documentation for code, APIs, and system architecture.',
    capabilities: [
      { name: 'api_documentation', description: 'Generate API documentation and OpenAPI specs', enabled: true, priority: 10 },
      { name: 'code_documentation', description: 'Write inline code comments and docstrings', enabled: true, priority: 9 },
      { name: 'readme_generation', description: 'Create and update README files', enabled: true, priority: 8 },
      { name: 'user_guides', description: 'Write user guides and tutorials', enabled: true, priority: 7 }
    ],
    maxTokens: 4000,
    temperature: 0.4,
    enabled: true
  }
];

// Export all schemas for validation
export const schemas = {
  AgentCapabilitySchema,
  AgentConfigSchema,
  TaskSchema,
  AgentResponseSchema,
  MCPToolSchema,
  CollaborationMessageSchema,
  ProjectContextSchema,
  AgentMetricsSchema
};
