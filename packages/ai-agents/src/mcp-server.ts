#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from '@modelcontextprotocol/sdk/types.js';

import { BackendAgent } from './agents/backend-agent.js';
import { FrontendAgent } from './agents/frontend-agent.js';
import { ProjectManagerAgent } from './agents/project-manager-agent.js';
import { QAAgent } from './agents/qa-agent.js';
import { TestingAgent } from './agents/testing-agent.js';
import { UIUXAgent } from './agents/ui-ux-agent.js';
import { BaseAgent } from './base-agent.js';
import {
    AgentConfig,
    AgentRole,
    ProjectContext,
    Task,
    TaskPriority,
    TaskType
} from './types.js';

/**
 * MCP Server for MakhoolDesigns Multi-Agent Development Team
 * 
 * This server provides a Model Context Protocol interface for coordinating
 * multiple AI agents specialized in different aspects of software development.
 * 
 * Agents available:
 * - Backend Agent: API design, database schemas, server architecture
 * - Frontend Agent: React components, state management, UI logic
 * - UI/UX Agent: Design systems, accessibility, user experience
 * - Project Manager Agent: Task coordination, planning, requirements
 * - QA Agent: Quality assurance, bug detection, validation
 * - Testing Agent: Unit tests, integration tests, test automation
 */

class MakhoolDesignsMCPServer {
  private server: Server;
  private agents: Map<string, any>;
  private projectContext: ProjectContext;

  constructor() {
    this.server = new Server(
      {
        name: 'makhool-designs-agents',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.agents = new Map();
    this.projectContext = {
      name: 'MakhoolDesigns',
      description: 'Family-owned design and development business - Rush.js monorepo',
      techStack: [
        'TypeScript',
        'React 19',
        'NestJS 11',
        'PostgreSQL 15',
        'TailwindCSS',
        'Vite 6.0',
        'MikroORM 6.1',
        'Rush.js 5.155'
      ],
      packages: [
        '@makhool-designs/web',
        '@makhool-designs/backend',
        '@makhool-designs/shared',
        '@makhool-designs/database',
        '@makhool-designs/ui',
        '@makhool-designs/ai-agents'
      ],
      currentBranch: 'main',
      recentChanges: [],
      openTasks: []
    };

    this.initializeAgents();
    this.setupToolHandlers();
  }

  private initializeAgents(): void {
    // Backend Development Agent
    const backendConfig: AgentConfig = {
      id: 'backend-agent',
      name: 'Backend Development Agent',
      role: AgentRole.DEVELOPER,
      model: 'claude-3-5-sonnet-20241022',
      systemPrompt: 'Backend development specialist for MakhoolDesigns',
      capabilities: [
        { name: 'api_design', description: 'Design and implement APIs', enabled: true, priority: 10 },
        { name: 'database_schema', description: 'Design database schemas', enabled: true, priority: 9 },
        { name: 'security_review', description: 'Security assessment', enabled: true, priority: 8 },
        { name: 'performance_optimization', description: 'Backend performance optimization', enabled: true, priority: 7 }
      ],
      maxTokens: 8000,
      temperature: 0.3,
      enabled: true
    };
    this.agents.set('backend-agent', new BackendAgent(backendConfig));

    // Frontend Development Agent
    const frontendConfig: AgentConfig = {
      id: 'frontend-agent',
      name: 'Frontend Development Agent',
      role: AgentRole.DEVELOPER,
      model: 'claude-3-5-sonnet-20241022',
      systemPrompt: 'Frontend development specialist for MakhoolDesigns',
      capabilities: [
        { name: 'component_development', description: 'React component development', enabled: true, priority: 10 },
        { name: 'state_management', description: 'State management with React', enabled: true, priority: 9 },
        { name: 'ui_implementation', description: 'UI implementation', enabled: true, priority: 8 },
        { name: 'performance_optimization', description: 'Frontend performance optimization', enabled: true, priority: 7 }
      ],
      maxTokens: 8000,
      temperature: 0.3,
      enabled: true
    };
    this.agents.set('frontend-agent', new FrontendAgent(frontendConfig));

    // UI/UX Design Agent
    const uiuxConfig: AgentConfig = {
      id: 'ui-ux-agent',
      name: 'UI/UX Design Agent',
      role: AgentRole.DEVELOPER,
      model: 'claude-3-5-sonnet-20241022',
      systemPrompt: 'UI/UX design specialist for MakhoolDesigns',
      capabilities: [
        { name: 'ui_design', description: 'User interface design', enabled: true, priority: 10 },
        { name: 'ux_analysis', description: 'User experience analysis', enabled: true, priority: 9 },
        { name: 'accessibility', description: 'Accessibility compliance', enabled: true, priority: 8 },
        { name: 'design_systems', description: 'Design system development', enabled: true, priority: 7 }
      ],
      maxTokens: 8000,
      temperature: 0.4,
      enabled: true
    };
    this.agents.set('ui-ux-agent', new UIUXAgent(uiuxConfig));

    // Project Manager Agent
    const pmConfig: AgentConfig = {
      id: 'project-manager-agent',
      name: 'Project Manager Agent',
      role: AgentRole.DEVELOPER,
      model: 'claude-3-5-sonnet-20241022',
      systemPrompt: 'Project management specialist for MakhoolDesigns',
      capabilities: [
        { name: 'feature_planning', description: 'Feature planning and coordination', enabled: true, priority: 10 },
        { name: 'task_management', description: 'Task breakdown and management', enabled: true, priority: 9 },
        { name: 'requirement_analysis', description: 'Requirements analysis', enabled: true, priority: 8 },
        { name: 'team_coordination', description: 'Team coordination', enabled: true, priority: 7 }
      ],
      maxTokens: 8000,
      temperature: 0.5,
      enabled: true
    };
    this.agents.set('project-manager-agent', new ProjectManagerAgent(pmConfig));

    // QA Agent
    const qaConfig: AgentConfig = {
      id: 'qa-agent',
      name: 'Quality Assurance Agent',
      role: AgentRole.TESTER,
      model: 'claude-3-5-sonnet-20241022',
      systemPrompt: 'Quality assurance specialist for MakhoolDesigns',
      capabilities: [
        { name: 'quality_review', description: 'Quality assurance review', enabled: true, priority: 10 },
        { name: 'bug_analysis', description: 'Bug detection and analysis', enabled: true, priority: 9 },
        { name: 'test_planning', description: 'Test planning and strategy', enabled: true, priority: 8 },
        { name: 'accessibility_testing', description: 'Accessibility testing', enabled: true, priority: 7 }
      ],
      maxTokens: 8000,
      temperature: 0.2,
      enabled: true
    };
    this.agents.set('qa-agent', new QAAgent(qaConfig));

    // Testing Agent
    const testingConfig: AgentConfig = {
      id: 'testing-agent',
      name: 'Testing Agent',
      role: AgentRole.TESTER,
      model: 'claude-3-5-sonnet-20241022',
      systemPrompt: 'Testing specialist for MakhoolDesigns',
      capabilities: [
        { name: 'test_development', description: 'Test development and automation', enabled: true, priority: 10 },
        { name: 'unit_testing', description: 'Unit testing', enabled: true, priority: 9 },
        { name: 'integration_testing', description: 'Integration testing', enabled: true, priority: 8 },
        { name: 'e2e_testing', description: 'End-to-end testing', enabled: true, priority: 7 }
      ],
      maxTokens: 8000,
      temperature: 0.2,
      enabled: true
    };
    this.agents.set('testing-agent', new TestingAgent(testingConfig));
  }

  private setupToolHandlers(): void {
    // List all available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: 'assign_task',
          description: 'Assign a task to the most appropriate agent based on capabilities',
          inputSchema: {
            type: 'object',
            properties: {
              title: { type: 'string', description: 'Task title' },
              description: { type: 'string', description: 'Detailed task description' },
              type: { 
                type: 'string', 
                enum: Object.values(TaskType),
                description: 'Type of task to be performed'
              },
              priority: { 
                type: 'string', 
                enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
                description: 'Task priority level'
              },
              files: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'List of files involved in the task'
              },
              context: { 
                type: 'object',
                description: 'Additional context for the task'
              },
              requiredCapabilities: {
                type: 'array',
                items: { type: 'string' },
                description: 'Required agent capabilities'
              }
            },
            required: ['title', 'description', 'type']
          }
        },
        {
          name: 'coordinate_agents',
          description: 'Coordinate multiple agents for complex tasks requiring collaboration',
          inputSchema: {
            type: 'object',
            properties: {
              task: { type: 'object', description: 'Primary task to coordinate' },
              agentIds: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'List of agent IDs to coordinate'
              },
              collaborationType: {
                type: 'string',
                enum: ['sequential', 'parallel', 'review'],
                description: 'Type of collaboration required'
              }
            },
            required: ['task', 'agentIds', 'collaborationType']
          }
        },
        {
          name: 'get_agent_info',
          description: 'Get information about available agents and their capabilities',
          inputSchema: {
            type: 'object',
            properties: {
              agentId: { 
                type: 'string', 
                description: 'Specific agent ID (optional - if not provided, returns all agents)'
              }
            }
          }
        },
        {
          name: 'get_project_context',
          description: 'Get current project context including tech stack, packages, and status',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'plan_feature',
          description: 'Plan a new feature with comprehensive task breakdown using Project Manager Agent',
          inputSchema: {
            type: 'object',
            properties: {
              featureName: { type: 'string', description: 'Name of the feature to plan' },
              requirements: { type: 'string', description: 'Feature requirements and specifications' },
              scope: { type: 'string', description: 'Scope and boundaries of the feature' },
              constraints: { type: 'string', description: 'Any constraints or limitations' }
            },
            required: ['featureName', 'requirements']
          }
        },
        {
          name: 'review_code',
          description: 'Perform code review using appropriate agents based on code type',
          inputSchema: {
            type: 'object',
            properties: {
              files: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'List of files to review'
              },
              reviewType: {
                type: 'string',
                enum: ['quality', 'security', 'performance', 'accessibility', 'general'],
                description: 'Type of review to perform'
              },
              context: { type: 'string', description: 'Additional context for the review' }
            },
            required: ['files']
          }
        }
      ];

      return { tools };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'assign_task':
            return await this.handleAssignTask(args);
          case 'coordinate_agents':
            return await this.handleCoordinateAgents(args);
          case 'get_agent_info':
            return await this.handleGetAgentInfo(args);
          case 'get_project_context':
            return await this.handleGetProjectContext();
          case 'plan_feature':
            return await this.handlePlanFeature(args);
          case 'review_code':
            return await this.handleReviewCode(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private async handleAssignTask(args: any) {
    const task: Task = {
      id: `task-${Date.now()}`,
      title: args.title,
      description: args.description,
      type: args.type as TaskType,
      priority: this.mapPriority(args.priority || 'MEDIUM'),
      status: 'pending' as any,
      requiredCapabilities: args.requiredCapabilities || [],
      context: args.context || {},
      files: args.files || [],
      dependencies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Find the best agent for this task
    const bestAgent = this.findBestAgent(task);
    
    if (!bestAgent) {
      return {
        content: [
          {
            type: 'text',
            text: `No suitable agent found for task type: ${task.type}`,
          },
        ],
      };
    }

    // Execute the task
    const result = await bestAgent.processTask(task);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            taskId: task.id,
            assignedAgent: result.agentId,
            success: result.success,
            result: result.result,
            duration: result.duration,
            confidence: result.confidence,
            error: result.error
          }, null, 2),
        },
      ],
    };
  }

  private async handleCoordinateAgents(args: any) {
    const { task, agentIds, collaborationType } = args;
    
    const coordinationResults = [];
    const targetAgents = agentIds.map((id: string) => this.agents.get(id)).filter(Boolean);

    if (targetAgents.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No valid agents found for coordination',
          },
        ],
      };
    }

    switch (collaborationType) {
      case 'sequential':
        // Execute tasks in sequence
        for (const agent of targetAgents) {
          const result = await agent.processTask(task);
          coordinationResults.push({
            agentId: result.agentId,
            result: result.result,
            success: result.success
          });
        }
        break;
      
      case 'parallel':
        // Execute tasks in parallel
        const promises = targetAgents.map((agent: BaseAgent) => agent.processTask(task));
        const results = await Promise.all(promises);
        coordinationResults.push(...results.map(r => ({
          agentId: r.agentId,
          result: r.result,
          success: r.success
        })));
        break;
      
      case 'review':
        // Primary agent executes, others review
        const primaryAgent = targetAgents[0];
        const reviewAgents = targetAgents.slice(1);
        
        const primaryResult = await primaryAgent.processTask(task);
        coordinationResults.push({
          agentId: primaryResult.agentId,
          result: primaryResult.result,
          success: primaryResult.success,
          role: 'primary'
        });
        
        // Review tasks
        const reviewTask = {
          ...task,
          type: TaskType.CODE_REVIEW,
          context: { ...task.context, primaryResult: primaryResult.result }
        };
        
        for (const reviewer of reviewAgents) {
          const reviewResult = await reviewer.processTask(reviewTask);
          coordinationResults.push({
            agentId: reviewResult.agentId,
            result: reviewResult.result,
            success: reviewResult.success,
            role: 'reviewer'
          });
        }
        break;
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            collaborationType,
            results: coordinationResults,
            summary: `Coordinated ${targetAgents.length} agents for ${collaborationType} execution`
          }, null, 2),
        },
      ],
    };
  }

  private async handleGetAgentInfo(args: any) {
    if (args.agentId) {
      const agent = this.agents.get(args.agentId);
      if (!agent) {
        return {
          content: [
            {
              type: 'text',
              text: `Agent not found: ${args.agentId}`,
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(agent.getInfo(), null, 2),
          },
        ],
      };
    }

    // Return info for all agents
    const allAgents = Array.from(this.agents.entries()).map(([id, agent]) => ({
      id,
      info: agent.getInfo()
    }));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(allAgents, null, 2),
        },
      ],
    };
  }

  private async handleGetProjectContext() {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(this.projectContext, null, 2),
        },
      ],
    };
  }

  private async handlePlanFeature(args: any) {
    const { featureName, requirements, scope, constraints } = args;
    
    const planningTask: Task = {
      id: `feature-planning-${Date.now()}`,
      title: `Plan Feature: ${featureName}`,
      description: `Feature Planning: ${requirements}`,
      type: TaskType.FEATURE_PLANNING,
      priority: TaskPriority.HIGH,
      status: 'pending' as any,
      requiredCapabilities: ['feature_planning', 'task_management'],
      context: {
        featureName,
        requirements,
        scope,
        constraints,
        projectContext: this.projectContext
      },
      files: [],
      dependencies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const pmAgent = this.agents.get('project-manager-agent');
    if (!pmAgent) {
      return {
        content: [
          {
            type: 'text',
            text: 'Project Manager Agent not available for feature planning',
          },
        ],
      };
    }

    const result = await pmAgent.processTask(planningTask);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            feature: featureName,
            planningResult: result.result,
            success: result.success,
            recommendations: result.result?.recommendations || []
          }, null, 2),
        },
      ],
    };
  }

  private async handleReviewCode(args: any) {
    const { files, reviewType = 'general', context } = args;
    
    // Determine which agents should perform the review
    const reviewAgents = this.selectReviewAgents(reviewType, files);
    
    const reviewTask: Task = {
      id: `code-review-${Date.now()}`,
      title: `Code Review: ${reviewType}`,
      description: `Perform ${reviewType} code review for specified files`,
      type: TaskType.CODE_REVIEW,
      priority: TaskPriority.MEDIUM,
      status: 'pending' as any,
      requiredCapabilities: ['code_review'],
      context: { reviewType, additionalContext: context },
      files,
      dependencies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const reviews = [];
    
    for (const agent of reviewAgents) {
      const result = await agent.processTask(reviewTask);
      reviews.push({
        agentType: agent.config.name,
        result: result.result,
        success: result.success,
        confidence: result.confidence
      });
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            reviewType,
            files,
            reviews,
            summary: `Code review completed by ${reviews.length} agents`
          }, null, 2),
        },
      ],
    };
  }

  private findBestAgent(task: Task): any | null {
    let bestAgent = null;
    let bestScore = 0;

    for (const [id, agent] of this.agents) {
      if (!agent.isHealthy()) continue;
      
      let score = agent.calculateCapabilityMatch(task.requiredCapabilities);
      
      // Boost score for task type specialization
      const specializedCapabilities = agent.getSpecializedCapabilities();
      if (specializedCapabilities.some((cap: string) => task.type.toLowerCase().includes(cap.toLowerCase()))) {
        score *= 1.5;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestAgent = agent;
      }
    }

    return bestAgent;
  }

  private selectReviewAgents(reviewType: string, files: string[]): any[] {
    const agents = [];
    
    switch (reviewType) {
      case 'quality':
        agents.push(this.agents.get('qa-agent'));
        break;
      case 'security':
        agents.push(this.agents.get('backend-agent'));
        break;
      case 'performance':
        agents.push(this.agents.get('backend-agent'), this.agents.get('frontend-agent'));
        break;
      case 'accessibility':
        agents.push(this.agents.get('ui-ux-agent'), this.agents.get('qa-agent'));
        break;
      default:
        // General review - use multiple agents
        agents.push(
          this.agents.get('backend-agent'),
          this.agents.get('frontend-agent'),
          this.agents.get('qa-agent')
        );
    }

    return agents.filter(Boolean);
  }

  private mapPriority(priority: string): TaskPriority {
    switch (priority.toLowerCase()) {
      case 'low': return TaskPriority.LOW;
      case 'medium': return TaskPriority.MEDIUM;
      case 'high': return TaskPriority.HIGH;
      case 'urgent': return TaskPriority.URGENT;
      default: return TaskPriority.MEDIUM;
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MakhoolDesigns Multi-Agent MCP Server running on stdio');
  }
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new MakhoolDesignsMCPServer();
  server.run().catch(console.error);
}

export { MakhoolDesignsMCPServer };
