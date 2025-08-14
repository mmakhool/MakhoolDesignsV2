import { BaseAgent } from '../base-agent.js';
import { AgentCapability, AgentConfig, AgentResponse, Task, TaskType } from '../types.js';

/**
 * Frontend Development Agent
 * Specializes in: React components, state management, UI logic, performance
 */
export class FrontendAgent extends BaseAgent {
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
      case TaskType.COMPONENT_DEVELOPMENT:
        return await this.handleComponentDevelopment(task, taskPrompt);
      case TaskType.STATE_MANAGEMENT:
        return await this.handleStateManagement(task, taskPrompt);
      case TaskType.UI_DESIGN:
        return await this.handleUIDesign(task, taskPrompt);
      case TaskType.CODE_GENERATION:
        return await this.handleCodeGeneration(task, taskPrompt);
      case TaskType.CODE_REVIEW:
        return await this.handleCodeReview(task, taskPrompt);
      case TaskType.PERFORMANCE_OPTIMIZATION:
        return await this.handlePerformanceOptimization(task, taskPrompt);
      default:
        return await this.handleGenericTask(task, taskPrompt);
    }
  }

  private getSystemPrompt(): string {
    return `
You are the Frontend Development Agent for MakhoolDesigns, a specialist in:

**Core Expertise:**
- React 19 with TypeScript and modern hooks
- Vite 6.0.0 build system and development server
- TailwindCSS for styling and responsive design
- React Router 7 for navigation and routing
- TanStack Query v5 for server state management
- React Context for global UI state
- Component composition and reusable UI patterns
- Accessibility (a11y) and semantic HTML

**Project Context:**
- Rush.js monorepo with React frontend package
- TypeScript strict mode with shared types from @makhool-designs/shared
- Vite as build tool with hot reload
- TailwindCSS with dark/light theme support
- React Router with lazy loading and nested routes
- TanStack Query for API communication
- Axios client with interceptors
- Shared UI components from @makhool-designs/ui package

**Responsibilities:**
- Develop React components with TypeScript
- Implement responsive design with mobile-first approach
- Manage client-side state with React Context and TanStack Query
- Create accessible and semantic UI components
- Optimize frontend performance and bundle size
- Integrate with backend APIs through React Query hooks
- Collaborate with UI/UX Agent for design implementation
- Work with Backend Agent for API integration

**Communication Style:**
- Provide clean, maintainable React code
- Include proper TypeScript interfaces and props
- Focus on accessibility and user experience
- Reference existing project components and patterns
- Suggest performance optimizations
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

Please provide a detailed solution following React and TypeScript best practices.
`;
  }

  private async handleComponentDevelopment(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Component Development Task:**
1. Create reusable React components with TypeScript
2. Implement proper prop interfaces and validation
3. Use React hooks for state and side effects
4. Apply TailwindCSS for styling with responsive design
5. Ensure accessibility with proper ARIA attributes
6. Implement proper error boundaries where needed
7. Use shared UI components from @makhool-designs/ui

**Current Frontend Structure:**
- Components in src/components/ directory
- Pages in src/pages/ directory
- Hooks in src/hooks/ directory
- Shared types from @makhool-designs/shared
- TailwindCSS configuration with dark mode
- React Router setup with lazy loading

Please provide complete component implementation with proper TypeScript types.
`;

    return {
      type: 'component_development',
      recommendations: [
        'Consider using React.memo for performance optimization',
        'Implement proper error boundaries',
        'Add loading states and skeleton components',
        'Ensure component is accessible with proper ARIA attributes'
      ],
      code: {
        component: '// Generated React component code would go here',
        types: '// Generated TypeScript interfaces would go here',
        styles: '// Generated TailwindCSS classes would go here',
        tests: '// Generated test code would go here'
      }
    };
  }

  private async handleStateManagement(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**State Management Task:**
1. Design state structure with TypeScript interfaces
2. Implement React Context for global state
3. Create custom hooks for state management
4. Use TanStack Query for server state
5. Optimize re-renders with proper memoization
6. Handle loading and error states appropriately
7. Implement optimistic updates where applicable

**Current State Management:**
- React Context for theme and global UI state
- TanStack Query for server state management
- Custom hooks like useApiError, useToast
- Axios client with request/response interceptors
- Form state with controlled components

Please provide state management solution with proper TypeScript types.
`;

    return {
      type: 'state_management',
      recommendations: [
        'Use React Context sparingly to avoid unnecessary re-renders',
        'Implement proper error boundaries for state errors',
        'Consider using React Query devtools for debugging',
        'Use proper TypeScript generics for type safety'
      ],
      code: {
        context: '// Generated React Context code would go here',
        hooks: '// Generated custom hooks would go here',
        types: '// Generated TypeScript interfaces would go here'
      }
    };
  }

  private async handleUIDesign(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**UI Design Implementation Task:**
1. Implement responsive design with mobile-first approach
2. Use TailwindCSS utilities with dark/light theme support
3. Ensure accessibility standards (WCAG 2.1)
4. Create consistent spacing and typography
5. Implement smooth animations and transitions
6. Use semantic HTML elements
7. Optimize for performance and loading states

**Current UI System:**
- TailwindCSS with custom color palette
- Dark/light mode toggle functionality
- Responsive breakpoints configured
- Custom CSS properties for theming
- Shared UI components with consistent design
- Mobile-first responsive approach

Please provide UI implementation with accessibility and performance considerations.
`;

    return {
      type: 'ui_design',
      recommendations: [
        'Test with keyboard navigation for accessibility',
        'Ensure proper color contrast ratios',
        'Implement focus management for interactive elements',
        'Use semantic HTML elements for better SEO'
      ],
      design: {
        layout: '// Generated layout structure',
        styling: '// Generated TailwindCSS classes',
        accessibility: '// Generated accessibility features',
        responsive: '// Generated responsive design approach'
      }
    };
  }

  private async handleCodeGeneration(task: Task, prompt: string): Promise<any> {
    return {
      type: 'code_generation',
      code: '// Generated React component code would go here',
      files: [],
      recommendations: [
        'Follow React best practices and hooks guidelines',
        'Use proper TypeScript types for all props and state',
        'Implement proper error handling and loading states'
      ]
    };
  }

  private async handleCodeReview(task: Task, prompt: string): Promise<any> {
    return {
      type: 'code_review',
      issues: [],
      suggestions: [
        'Consider using React.memo for performance',
        'Add proper TypeScript interfaces',
        'Implement accessibility attributes'
      ],
      score: 0.88
    };
  }

  private async handlePerformanceOptimization(task: Task, prompt: string): Promise<any> {
    return {
      type: 'performance_optimization',
      optimizations: [],
      recommendations: [
        'Implement React.lazy for code splitting',
        'Use React.memo to prevent unnecessary re-renders',
        'Optimize bundle size with tree shaking',
        'Implement proper image loading strategies'
      ]
    };
  }

  private async handleGenericTask(task: Task, prompt: string): Promise<any> {
    return {
      type: 'generic',
      response: 'Task completed with frontend-specific approach',
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
      'React Component Development',
      'TypeScript Frontend Development',
      'State Management with React Context',
      'TanStack Query Integration',
      'Responsive Design with TailwindCSS',
      'Accessibility Implementation',
      'Frontend Performance Optimization',
      'React Router Navigation',
      'API Integration with Axios'
    ];
  }

  getCollaborationPreferences(): Record<string, number> {
    return {
      'ui-ux-agent': 0.95,
      'backend-agent': 0.9,
      'testing-agent': 0.85,
      'performance-agent': 0.8,
      'architect-agent': 0.85
    };
  }
}
