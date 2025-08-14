import { BaseAgent } from '../base-agent.js';
import { AgentCapability, AgentConfig, AgentResponse, Task, TaskType } from '../types.js';

/**
 * Backend Development Agent
 * Specializes in: API design, database schemas, server architecture, security
 */
export class BackendAgent extends BaseAgent {
  constructor(config: AgentConfig) {
    super(config);
  }

  async processTask(task: Task): Promise<AgentResponse> {
    const startTime = Date.now();
    
    try {
      const result = await this.handleTask(task);
      const duration = Date.now() - startTime;
      
      const response: AgentResponse = {
        agentId: this.config.id,
        taskId: task.id,
        success: true,
        result,
        duration,
        confidence: this.calculateConfidence(task)
      };
      
      this.updateMetrics(response);
      this.logTaskExecution(task, response);
      
      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      const response: AgentResponse = {
        agentId: this.config.id,
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration,
        confidence: 0
      };
      
      this.updateMetrics(response);
      this.logTaskExecution(task, response);
      
      return response;
    }
  }

  private async handleTask(task: Task): Promise<any> {
    const systemPrompt = this.getSystemPrompt();
    const taskPrompt = this.buildTaskPrompt(task);
    
    switch (task.type) {
      case TaskType.API_DESIGN:
        return await this.handleApiDesign(task, taskPrompt);
      case TaskType.DATABASE_SCHEMA:
        return await this.handleDatabaseSchema(task, taskPrompt);
      case TaskType.SECURITY_REVIEW:
        return await this.handleSecurityReview(task, taskPrompt);
      case TaskType.PERFORMANCE_OPTIMIZATION:
        return await this.handlePerformanceOptimization(task, taskPrompt);
      case TaskType.CODE_GENERATION:
        return await this.handleCodeGeneration(task, taskPrompt);
      case TaskType.CODE_REVIEW:
        return await this.handleCodeReview(task, taskPrompt);
      default:
        return await this.handleGenericTask(task, taskPrompt);
    }
  }

  private getSystemPrompt(): string {
    return `
You are the Backend Development Agent for MakhoolDesigns, a specialist in:

**Core Expertise:**
- NestJS API development and architecture
- Database design with MikroORM and PostgreSQL
- Authentication and authorization (JWT, OAuth)
- RESTful API design and GraphQL
- Security best practices and vulnerability assessment
- Performance optimization and caching strategies
- Microservices architecture
- Server-side validation with Zod schemas

**Project Context:**
- Rush.js monorepo with NestJS backend package
- TypeScript strict mode with shared types
- MikroORM with PostgreSQL database
- Swagger/OpenAPI documentation
- CORS enabled for cross-origin requests
- Contact form API already implemented

**Responsibilities:**
- Design and implement API endpoints
- Create database entities and migrations
- Implement authentication and security measures
- Optimize database queries and performance
- Review backend code for best practices
- Collaborate with Frontend Agent for API contracts
- Work with Database Agent for schema design

**Communication Style:**
- Provide clear, implementable solutions
- Include code examples with TypeScript types
- Suggest performance and security improvements
- Reference existing project patterns and standards
`;
  }

  private buildTaskPrompt(task: Task): string {
    return `
**Task Details:**
- Title: ${task.title}
- Description: ${task.description}
- Type: ${task.type}
- Priority: ${task.priority}

**Context:**
${task.context ? JSON.stringify(task.context, null, 2) : 'No additional context provided'}

**Files Involved:**
${task.files.length > 0 ? task.files.join('\n') : 'No specific files mentioned'}

**Required Capabilities:**
${task.requiredCapabilities.join(', ')}

Please provide a detailed solution following the project's architecture and best practices.
`;
  }

  private async handleApiDesign(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**API Design Task:**
1. Design RESTful endpoints with proper HTTP methods
2. Define request/response DTOs with Zod validation
3. Implement proper error handling with HTTP status codes
4. Add Swagger/OpenAPI documentation
5. Consider pagination, filtering, and sorting
6. Ensure API follows existing project patterns

**Current Backend Structure:**
- Controllers in src/ directory
- DTOs with class-validator decorators
- Swagger decorators for documentation
- Global validation pipe configured
- CORS enabled for cross-origin requests

Please provide a complete implementation following the project's existing patterns.
`;

    // This would typically make an API call to an LLM
    // For now, return a structured response
    return {
      type: 'api_design',
      recommendations: [
        'Consider adding rate limiting for public endpoints',
        'Implement request validation middleware',
        'Add comprehensive error logging'
      ],
      code: {
        controller: '// Generated controller code would go here',
        dto: '// Generated DTO code would go here',
        service: '// Generated service code would go here'
      }
    };
  }

  private async handleDatabaseSchema(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Database Schema Task:**
1. Design MikroORM entities with proper relationships
2. Create migrations for schema changes
3. Add proper indexing for performance
4. Implement soft deletes where appropriate
5. Use UUID primary keys as per project standard
6. Consider data integrity and constraints

**Current Database Setup:**
- PostgreSQL 15 with MikroORM 6.1.12
- UUID primary keys on all entities
- Timestamps (createdAt, updatedAt) on all entities
- Existing entities: ContactSubmission, Project, Review, BlogPost

Please provide entity definitions and migrations following the project's patterns.
`;

    return {
      type: 'database_schema',
      recommendations: [
        'Run database migrations in development first',
        'Consider adding database indexes for frequently queried fields',
        'Implement proper foreign key constraints'
      ],
      schema: {
        entities: '// Generated entity code would go here',
        migrations: '// Generated migration code would go here'
      }
    };
  }

  private async handleSecurityReview(task: Task, prompt: string): Promise<any> {
    return {
      type: 'security_review',
      vulnerabilities: [],
      recommendations: [
        'Implement security headers middleware',
        'Add rate limiting to authentication endpoints',
        'Consider implementing API versioning'
      ]
    };
  }

  private async handlePerformanceOptimization(task: Task, prompt: string): Promise<any> {
    return {
      type: 'performance_optimization',
      optimizations: [],
      recommendations: [
        'Implement Redis for caching frequently accessed data',
        'Add database query monitoring and logging',
        'Consider implementing background job queue'
      ]
    };
  }

  private async handleCodeGeneration(task: Task, prompt: string): Promise<any> {
    return {
      type: 'code_generation',
      code: '// Generated code would go here',
      files: [],
      recommendations: []
    };
  }

  private async handleCodeReview(task: Task, prompt: string): Promise<any> {
    return {
      type: 'code_review',
      issues: [],
      suggestions: [],
      score: 0.85
    };
  }

  private async handleGenericTask(task: Task, prompt: string): Promise<any> {
    return {
      type: 'generic',
      response: 'Task completed with generic handler',
      recommendations: []
    };
  }

  private calculateConfidence(task: Task): number {
    // Calculate confidence based on task type and agent capabilities
    const relevantCapabilities = this.config.capabilities.filter((cap: AgentCapability) =>
      task.requiredCapabilities.includes(cap.name) || 
      this.getSpecializedCapabilities().includes(cap.name)
    );

    if (relevantCapabilities.length === 0) {
      return 0.5; // Default confidence for unmatched tasks
    }

    return relevantCapabilities.reduce((sum: number, cap: AgentCapability) => sum + (cap.priority / 10), 0) / relevantCapabilities.length;
  }

  getSpecializedCapabilities(): string[] {
    return [
      'API Design and Implementation',
      'Database Schema Design',
      'Security Assessment',
      'Performance Optimization',
      'Authentication Systems',
      'MikroORM Entity Management',
      'NestJS Architecture',
      'PostgreSQL Optimization'
    ];
  }

  getCollaborationPreferences(): Record<string, number> {
    return {
      'database-agent': 0.95,
      'frontend-agent': 0.9,
      'security-agent': 0.85,
      'testing-agent': 0.8,
      'architect-agent': 0.9
    };
  }
}
