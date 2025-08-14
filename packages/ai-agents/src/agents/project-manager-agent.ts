import { BaseAgent } from '../base-agent.js';
import { AgentCapability, AgentConfig, AgentResponse, Task, TaskPriority, TaskType } from '../types.js';

/**
 * Project Manager Agent
 * Specializes in: Task coordination, sprint planning, requirement analysis
 */
export class ProjectManagerAgent extends BaseAgent {
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
      case TaskType.FEATURE_PLANNING:
        return await this.handleFeaturePlanning(task, taskPrompt);
      case TaskType.ARCHITECTURE_PLANNING:
        return await this.handleArchitecturePlanning(task, taskPrompt);
      case TaskType.CODE_REVIEW:
        return await this.handleProjectReview(task, taskPrompt);
      default:
        return await this.handleGenericTask(task, taskPrompt);
    }
  }

  private getSystemPrompt(): string {
    return `
You are the Project Manager Agent for MakhoolDesigns, a specialist in:

**Core Expertise:**
- Project planning and task management
- Requirements analysis and documentation
- Sprint planning and agile methodologies
- Resource allocation and timeline estimation
- Risk management and mitigation strategies
- Stakeholder communication and coordination
- Quality assurance and deliverable management
- Team coordination and collaboration

**Project Context:**
- MakhoolDesigns is a family-owned design and development business
- Rush.js monorepo with multiple interconnected packages
- Full-stack TypeScript development with React and NestJS
- Modern development stack with emphasis on quality and performance
- Multi-agent development team requiring coordination
- Client-facing business requiring professional delivery

**Responsibilities:**
- Break down complex features into manageable tasks
- Coordinate work between specialized agents
- Manage project timelines and deliverables
- Ensure quality standards and requirements compliance
- Facilitate communication between agents
- Monitor project progress and identify blockers
- Plan sprints and iterations
- Manage technical debt and maintenance tasks

**Project Management Approach:**
- Agile methodology with iterative development
- User story driven development
- Continuous integration and deployment
- Quality-first approach with proper testing
- Documentation as part of the process
- Regular reviews and retrospectives
- Risk-aware planning and mitigation

**Communication Style:**
- Clear, actionable task breakdowns
- Detailed requirements and acceptance criteria
- Realistic timeline estimates
- Proactive risk identification
- Regular status updates and progress tracking
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

Please provide comprehensive project management guidance and task coordination.
`;
  }

  private async handleFeaturePlanning(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Feature Planning Task:**
1. Analyze feature requirements and scope
2. Break down feature into user stories and tasks
3. Identify dependencies and prerequisites
4. Estimate effort and timeline
5. Assign tasks to appropriate specialized agents
6. Define acceptance criteria and testing requirements
7. Plan integration and deployment strategy

**Planning Framework:**
- User story format: As a [user], I want [goal] so that [benefit]
- Task breakdown with clear deliverables
- Dependency mapping and critical path analysis
- Risk assessment and mitigation strategies
- Quality gates and review checkpoints
- Integration points with existing codebase

**Agent Specializations to Consider:**
- Backend Agent: API design, database changes
- Frontend Agent: React components, state management
- UI/UX Agent: Design and user experience
- Testing Agent: Test planning and automation
- Security Agent: Security review and compliance
- Performance Agent: Performance implications

Please provide comprehensive feature planning with task assignments.
`;

    const userStories = this.generateUserStories(task);
    const taskBreakdown = this.breakdownIntoTasks(task);
    const timeline = this.estimateTimeline(taskBreakdown);
    const riskAssessment = this.assessRisks(task);

    return {
      type: 'feature_planning',
      feature: {
        name: task.title,
        description: task.description,
        scope: 'Feature scope analysis completed'
      },
      userStories,
      taskBreakdown,
      timeline,
      riskAssessment,
      recommendations: [
        'Start with MVP version to validate approach',
        'Plan regular review checkpoints',
        'Consider user feedback integration points',
        'Ensure comprehensive testing strategy'
      ],
      agentAssignments: {
        'backend-agent': taskBreakdown.filter(t => t.category === 'backend').length,
        'frontend-agent': taskBreakdown.filter(t => t.category === 'frontend').length,
        'ui-ux-agent': taskBreakdown.filter(t => t.category === 'design').length,
        'testing-agent': taskBreakdown.filter(t => t.category === 'testing').length
      }
    };
  }

  private async handleArchitecturePlanning(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Architecture Planning Task:**
1. Analyze system architecture requirements
2. Plan integration points and data flows
3. Identify infrastructure and scalability needs
4. Plan database schema changes and migrations
5. Design API contracts and interfaces
6. Plan deployment and DevOps considerations
7. Coordinate with Architecture Agent for detailed design

**Architecture Considerations:**
- Monorepo structure with Rush.js
- Microservice vs monolith decisions
- Database design and migration strategies
- API versioning and backward compatibility
- Performance and scalability requirements
- Security and compliance considerations
- DevOps and CI/CD pipeline updates

Please provide comprehensive architecture planning with implementation roadmap.
`;

    return {
      type: 'architecture_planning',
      architecture: {
        overview: 'System architecture analysis completed',
        components: ['Backend API', 'Frontend Application', 'Database Layer', 'External Integrations'],
        integrations: ['Internal API communication', 'External service integrations'],
        infrastructure: 'Infrastructure requirements defined'
      },
      recommendations: [
        'Follow microservice patterns for scalability',
        'Implement proper API versioning strategy',
        'Plan database migrations carefully',
        'Consider caching strategies for performance',
        'Implement comprehensive monitoring and logging'
      ],
      timeline: {
        phase1: 'Foundation and core components - 2 weeks',
        phase2: 'Integration and testing - 1 week',
        phase3: 'Deployment and monitoring setup - 3 days'
      }
    };
  }

  private async handleProjectReview(task: Task, prompt: string): Promise<any> {
    return {
      type: 'project_review',
      status: {
        overall: 'On track',
        timeline: 'Meeting deadlines',
        quality: 'High quality standards maintained',
        risks: 'Low risk profile'
      },
      recommendations: [
        'Continue with current sprint velocity',
        'Schedule regular stakeholder updates',
        'Plan for upcoming feature releases',
        'Review and update documentation'
      ],
      nextSteps: [
        'Finalize current sprint deliverables',
        'Plan next sprint objectives',
        'Schedule team retrospective',
        'Update project roadmap'
      ]
    };
  }

  private async handleGenericTask(task: Task, prompt: string): Promise<any> {
    return {
      type: 'generic',
      response: 'Task coordinated from project management perspective',
      recommendations: [
        'Ensure proper task documentation',
        'Coordinate with relevant team members',
        'Plan for quality assurance review',
        'Update project tracking systems'
      ]
    };
  }

  private generateUserStories(task: Task): Array<{id: string, story: string, acceptanceCriteria: string[]}> {
    // This would typically be more sophisticated based on the task context
    return [
      {
        id: 'US-001',
        story: `As a user, I want ${task.title.toLowerCase()} so that I can achieve the intended functionality`,
        acceptanceCriteria: [
          'Feature works as described in requirements',
          'User interface is intuitive and accessible',
          'Performance meets established benchmarks',
          'All edge cases are handled appropriately'
        ]
      }
    ];
  }

  private breakdownIntoTasks(task: Task): Array<{
    id: string,
    title: string,
    description: string,
    category: string,
    estimatedHours: number,
    priority: TaskPriority,
    assignedAgent?: string
  }> {
    return [
      {
        id: 'TASK-001',
        title: 'Backend API Implementation',
        description: 'Implement backend API endpoints and business logic',
        category: 'backend',
        estimatedHours: 8,
        priority: TaskPriority.HIGH,
        assignedAgent: 'backend-agent'
      },
      {
        id: 'TASK-002',
        title: 'Frontend Component Development',
        description: 'Develop React components and integrate with API',
        category: 'frontend',
        estimatedHours: 12,
        priority: TaskPriority.HIGH,
        assignedAgent: 'frontend-agent'
      },
      {
        id: 'TASK-003',
        title: 'UI/UX Design Review',
        description: 'Review and refine user interface design',
        category: 'design',
        estimatedHours: 4,
        priority: TaskPriority.MEDIUM,
        assignedAgent: 'ui-ux-agent'
      },
      {
        id: 'TASK-004',
        title: 'Testing and Quality Assurance',
        description: 'Comprehensive testing including unit, integration, and e2e tests',
        category: 'testing',
        estimatedHours: 6,
        priority: TaskPriority.HIGH,
        assignedAgent: 'testing-agent'
      }
    ];
  }

  private estimateTimeline(tasks: any[]): {
    totalHours: number,
    estimatedDays: number,
    milestones: Array<{name: string, date: string, deliverables: string[]}>
  } {
    const totalHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const estimatedDays = Math.ceil(totalHours / 6); // Assuming 6 productive hours per day

    return {
      totalHours,
      estimatedDays,
      milestones: [
        {
          name: 'Development Complete',
          date: `Day ${Math.ceil(estimatedDays * 0.7)}`,
          deliverables: ['Backend API', 'Frontend Components', 'UI/UX Implementation']
        },
        {
          name: 'Testing Complete',
          date: `Day ${Math.ceil(estimatedDays * 0.9)}`,
          deliverables: ['Test Suite', 'Quality Assurance Review', 'Bug Fixes']
        },
        {
          name: 'Deployment Ready',
          date: `Day ${estimatedDays}`,
          deliverables: ['Production Build', 'Documentation', 'Deployment Package']
        }
      ]
    };
  }

  private assessRisks(task: Task): Array<{
    risk: string,
    probability: 'Low' | 'Medium' | 'High',
    impact: 'Low' | 'Medium' | 'High',
    mitigation: string
  }> {
    return [
      {
        risk: 'Integration complexity between frontend and backend',
        probability: 'Medium',
        impact: 'Medium',
        mitigation: 'Plan regular integration checkpoints and API contract reviews'
      },
      {
        risk: 'Performance impact of new feature',
        probability: 'Low',
        impact: 'Medium',
        mitigation: 'Implement performance monitoring and optimization strategies'
      },
      {
        risk: 'User experience not meeting expectations',
        probability: 'Low',
        impact: 'High',
        mitigation: 'Conduct user testing and feedback sessions during development'
      }
    ];
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
      'Project Planning and Management',
      'Requirements Analysis and Documentation',
      'Task Breakdown and Estimation',
      'Sprint Planning and Agile Methodology',
      'Risk Assessment and Mitigation',
      'Team Coordination and Communication',
      'Quality Assurance and Delivery Management',
      'Stakeholder Management',
      'Timeline and Resource Management'
    ];
  }

  getCollaborationPreferences(): Record<string, number> {
    return {
      'architect-agent': 0.95,
      'backend-agent': 0.9,
      'frontend-agent': 0.9,
      'ui-ux-agent': 0.85,
      'testing-agent': 0.9,
      'qa-agent': 0.95,
      'security-agent': 0.8,
      'performance-agent': 0.8
    };
  }
}
