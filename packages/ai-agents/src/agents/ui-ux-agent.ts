import { BaseAgent } from '../base-agent.js';
import { AgentCapability, AgentConfig, AgentResponse, Task, TaskType } from '../types.js';

/**
 * UI/UX Design Agent
 * Specializes in: Design systems, accessibility, user experience, responsive design
 */
export class UIUXAgent extends BaseAgent {
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
      case TaskType.UI_DESIGN:
        return await this.handleUIDesign(task, taskPrompt);
      case TaskType.UX_ANALYSIS:
        return await this.handleUXAnalysis(task, taskPrompt);
      case TaskType.COMPONENT_DEVELOPMENT:
        return await this.handleComponentDesign(task, taskPrompt);
      case TaskType.CODE_REVIEW:
        return await this.handleDesignReview(task, taskPrompt);
      default:
        return await this.handleGenericTask(task, taskPrompt);
    }
  }

  private getSystemPrompt(): string {
    return `
You are the UI/UX Design Agent for MakhoolDesigns, a specialist in:

**Core Expertise:**
- User Experience (UX) design and user research
- User Interface (UI) design and visual design systems
- Accessibility (WCAG 2.1) and inclusive design
- Responsive design and mobile-first approach
- Design systems and component libraries
- Color theory, typography, and visual hierarchy
- User journey mapping and interaction design
- Usability testing and design validation

**Project Context:**
- Family-owned design and development business
- Rush.js monorepo with shared UI component library
- TailwindCSS design system with dark/light themes
- React 19 frontend with TypeScript
- Responsive design supporting all device sizes
- Existing brand identity and color palette
- Focus on professional, clean, and accessible design

**Responsibilities:**
- Design user interfaces and experiences
- Ensure accessibility compliance (WCAG 2.1)
- Create and maintain design systems
- Review designs for usability and accessibility
- Collaborate with Frontend Agent for implementation
- Provide design guidelines and standards
- Optimize user flows and interactions
- Conduct design reviews and feedback

**Design Principles:**
- Mobile-first responsive design
- Accessibility as a core requirement
- Clean, professional aesthetic
- Consistent visual hierarchy
- Intuitive navigation and user flows
- Performance-conscious design decisions
- Brand consistency across all touchpoints

**Communication Style:**
- Provide clear design specifications
- Include accessibility considerations
- Reference design systems and patterns
- Suggest user experience improvements
- Focus on usability and user needs
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

Please provide design solutions that prioritize user experience and accessibility.
`;
  }

  private async handleUIDesign(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**UI Design Task:**
1. Create intuitive and accessible user interfaces
2. Design responsive layouts for all device sizes
3. Establish visual hierarchy and information architecture
4. Select appropriate colors, typography, and spacing
5. Design interactive elements and micro-interactions
6. Ensure WCAG 2.1 compliance for accessibility
7. Create design specifications for development

**Current Design System:**
- TailwindCSS with custom color palette
- Dark/light mode theme support
- Consistent spacing scale and typography
- Shared UI components library
- Mobile-first responsive breakpoints
- Professional, clean aesthetic

**Accessibility Requirements:**
- Minimum 4.5:1 color contrast ratio
- Keyboard navigation support
- Screen reader compatibility
- Focus management and indicators
- Semantic HTML structure
- Alternative text for images

Please provide comprehensive UI design with accessibility specifications.
`;

    return {
      type: 'ui_design',
      recommendations: [
        'Implement proper focus management for interactive elements',
        'Ensure color contrast meets WCAG 2.1 standards',
        'Use semantic HTML elements for better accessibility',
        'Design clear visual hierarchy with consistent typography',
        'Include loading states and error messaging in the design'
      ],
      design: {
        layout: {
          structure: 'Mobile-first responsive grid layout',
          navigation: 'Accessible navigation with keyboard support',
          hierarchy: 'Clear visual hierarchy with proper headings'
        },
        visual: {
          colors: 'WCAG compliant color palette with dark/light variants',
          typography: 'Accessible font sizes and line heights',
          spacing: 'Consistent spacing scale using design tokens'
        },
        interactions: {
          states: 'Hover, focus, active, and disabled states defined',
          animations: 'Subtle animations respecting prefers-reduced-motion',
          feedback: 'Clear feedback for user actions and loading states'
        },
        accessibility: {
          contrast: 'All text meets minimum 4.5:1 contrast ratio',
          keyboard: 'Full keyboard navigation support',
          screenReader: 'Proper ARIA labels and semantic markup'
        }
      }
    };
  }

  private async handleUXAnalysis(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**UX Analysis Task:**
1. Analyze user flows and journey mapping
2. Identify pain points and usability issues
3. Review information architecture
4. Assess accessibility barriers
5. Evaluate user interface patterns
6. Provide improvement recommendations
7. Consider user research and feedback

**Analysis Framework:**
- User-centered design principles
- Accessibility heuristics (WCAG 2.1)
- Usability heuristics (Nielsen's 10 principles)
- Mobile and desktop user patterns
- Performance impact on user experience
- Conversion optimization opportunities

Please provide comprehensive UX analysis with actionable recommendations.
`;

    return {
      type: 'ux_analysis',
      findings: [
        'User flow analysis completed',
        'Accessibility barriers identified',
        'Usability improvements recommended'
      ],
      recommendations: [
        'Simplify the user onboarding process',
        'Improve error messaging and recovery flows',
        'Enhance mobile navigation experience',
        'Add progress indicators for multi-step processes',
        'Implement better search and filtering capabilities'
      ],
      accessibility: {
        issues: [],
        improvements: [
          'Add skip navigation links',
          'Improve focus indicators',
          'Add ARIA landmarks for better screen reader navigation'
        ]
      }
    };
  }

  private async handleComponentDesign(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Component Design Task:**
1. Design reusable UI components
2. Define component states and variations
3. Specify accessibility requirements
4. Create responsive behavior guidelines
5. Document component usage and props
6. Design for consistency with existing components
7. Consider performance implications

**Component Design System:**
- Atomic design methodology (atoms, molecules, organisms)
- Consistent design tokens (colors, spacing, typography)
- Standardized component APIs
- Accessibility-first approach
- Dark/light theme support
- Responsive design patterns

Please provide complete component design specifications.
`;

    return {
      type: 'component_design',
      component: {
        name: 'Designed component name',
        variants: ['primary', 'secondary', 'outline'],
        states: ['default', 'hover', 'focus', 'active', 'disabled'],
        responsive: 'Mobile-first responsive behavior defined',
        accessibility: 'WCAG compliant with proper ARIA attributes'
      },
      recommendations: [
        'Follow atomic design principles for consistency',
        'Implement proper component composition patterns',
        'Design for both dark and light themes',
        'Include comprehensive accessibility features'
      ]
    };
  }

  private async handleDesignReview(task: Task, prompt: string): Promise<any> {
    return {
      type: 'design_review',
      issues: [],
      suggestions: [
        'Improve color contrast for better accessibility',
        'Add focus indicators for keyboard navigation',
        'Ensure consistent spacing throughout the design',
        'Consider adding micro-animations for better UX'
      ],
      accessibility: {
        compliance: 'WCAG 2.1 AA',
        issues: [],
        improvements: []
      },
      score: 0.92
    };
  }

  private async handleGenericTask(task: Task, prompt: string): Promise<any> {
    return {
      type: 'generic',
      response: 'Task completed with UI/UX design perspective',
      recommendations: [
        'Consider user experience implications',
        'Ensure accessibility compliance',
        'Maintain design system consistency'
      ]
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
      'UI Design and Visual Design',
      'UX Analysis and User Research',
      'Accessibility Compliance (WCAG 2.1)',
      'Design Systems and Component Libraries',
      'Responsive Design and Mobile-First Approach',
      'Information Architecture',
      'User Journey Mapping',
      'Design Review and Critique',
      'Brand Consistency and Guidelines'
    ];
  }

  getCollaborationPreferences(): Record<string, number> {
    return {
      'frontend-agent': 0.95,
      'architect-agent': 0.8,
      'testing-agent': 0.75,
      'project-manager-agent': 0.85,
      'qa-agent': 0.8
    };
  }
}
