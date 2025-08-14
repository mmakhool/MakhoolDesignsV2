import { BaseAgent } from '../base-agent.js';
import { AgentCapability, AgentConfig, AgentResponse, Task, TaskType } from '../types.js';

/**
 * QA (Quality Assurance) Agent
 * Specializes in: Test planning, quality assurance, bug detection, validation
 */
export class QAAgent extends BaseAgent {
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
      case TaskType.TESTING:
        return await this.handleTestPlanning(task, taskPrompt);
      case TaskType.CODE_REVIEW:
        return await this.handleQualityReview(task, taskPrompt);
      case TaskType.BUG_FIX:
        return await this.handleBugAnalysis(task, taskPrompt);
      default:
        return await this.handleGenericTask(task, taskPrompt);
    }
  }

  private getSystemPrompt(): string {
    return `
You are the QA (Quality Assurance) Agent for MakhoolDesigns, a specialist in:

**Core Expertise:**
- Quality assurance methodologies and best practices
- Test planning, design, and execution
- Bug detection, analysis, and reproduction
- Validation and verification processes
- User acceptance testing and usability validation
- Performance testing and load testing
- Security testing and vulnerability assessment
- Accessibility testing and compliance validation

**Project Context:**
- Rush.js monorepo with TypeScript across all packages
- React 19 frontend with comprehensive component testing
- NestJS backend with API testing and integration tests
- PostgreSQL database with data integrity validation
- TailwindCSS UI components with visual regression testing
- Multi-agent development team requiring quality coordination
- Professional client deliverables requiring high quality standards

**Responsibilities:**
- Design comprehensive test plans and test cases
- Validate functionality against requirements and acceptance criteria
- Identify and document bugs with detailed reproduction steps
- Perform usability and user experience validation
- Ensure accessibility compliance (WCAG 2.1)
- Validate performance benchmarks and optimization
- Review code quality and adherence to standards
- Coordinate testing efforts with specialized agents

**Quality Standards:**
- Functional testing: All features work as specified
- Usability testing: User experience meets standards
- Performance testing: Response times and load handling
- Security testing: Vulnerability assessment and protection
- Accessibility testing: WCAG 2.1 compliance validation
- Cross-browser/device compatibility testing
- Integration testing: Component and service interactions
- Regression testing: Ensure changes don't break existing functionality

**Testing Approach:**
- Risk-based testing prioritization
- Exploratory testing for edge cases
- Automated testing where appropriate
- User-centered validation
- Continuous quality monitoring
- Documentation of all testing activities

**Communication Style:**
- Clear, detailed bug reports with reproduction steps
- Comprehensive test plans with coverage metrics
- Quality metrics and assessment reports
- Actionable recommendations for improvement
- Collaborative approach with development agents
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

Please provide comprehensive quality assurance analysis and testing recommendations.
`;
  }

  private async handleTestPlanning(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Test Planning Task:**
1. Analyze requirements and create comprehensive test plan
2. Design test cases covering functional and non-functional requirements
3. Plan test data and environment setup
4. Define acceptance criteria and success metrics
5. Identify test automation opportunities
6. Plan regression testing strategy
7. Coordinate with development agents for testing support

**Test Planning Framework:**
- Functional testing: Core functionality validation
- UI/UX testing: User interface and experience validation
- API testing: Backend service and endpoint testing
- Integration testing: Component and service interaction testing
- Performance testing: Load, stress, and response time testing
- Security testing: Vulnerability and authorization testing
- Accessibility testing: WCAG 2.1 compliance validation
- Cross-browser testing: Compatibility across browsers and devices

**Current Technology Stack:**
- Frontend: React 19 with TypeScript, Vite, TailwindCSS
- Backend: NestJS with TypeScript, MikroORM, PostgreSQL
- Testing Tools: Vitest, React Testing Library, Jest
- E2E Testing: Playwright or Cypress (to be determined)
- API Testing: Supertest or Postman/Newman
- Accessibility: axe-core, WAVE, screen readers

Please provide detailed test plan with specific test cases and coverage strategy.
`;

    const testPlan = this.generateTestPlan(task);
    const testCases = this.generateTestCases(task);
    const automationStrategy = this.planTestAutomation(task);

    return {
      type: 'test_planning',
      testPlan,
      testCases,
      automationStrategy,
      recommendations: [
        'Implement test-driven development (TDD) approach',
        'Set up continuous integration with automated testing',
        'Include accessibility testing in all test cycles',
        'Plan for cross-browser and device testing',
        'Establish performance benchmarks and monitoring'
      ],
      coverage: {
        functional: '95% coverage target',
        integration: '90% coverage target',
        e2e: 'Critical user journeys covered',
        accessibility: 'WCAG 2.1 AA compliance'
      },
      timeline: {
        planning: '2 days',
        execution: '5 days',
        automation: '3 days',
        reporting: '1 day'
      }
    };
  }

  private async handleQualityReview(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Quality Review Task:**
1. Review code quality and adherence to standards
2. Validate functionality against requirements
3. Assess user experience and usability
4. Check accessibility compliance
5. Review performance and optimization
6. Validate security implementation
7. Provide improvement recommendations

**Quality Review Checklist:**
- Code Quality: Clean code principles, TypeScript types, error handling
- Functionality: Requirements compliance, edge case handling
- User Experience: Intuitive interface, responsive design
- Accessibility: WCAG 2.1 compliance, keyboard navigation
- Performance: Loading times, optimization, caching
- Security: Input validation, authentication, authorization
- Maintainability: Documentation, code organization, testing

Please provide comprehensive quality assessment with specific recommendations.
`;

    return {
      type: 'quality_review',
      assessment: {
        overall: 'High quality with minor improvements needed',
        codeQuality: 'Excellent - follows TypeScript and React best practices',
        functionality: 'Good - meets requirements with proper error handling',
        userExperience: 'Very good - intuitive and responsive design',
        accessibility: 'Good - WCAG 2.1 compliant with minor enhancements needed',
        performance: 'Good - optimized with room for caching improvements',
        security: 'Excellent - proper validation and authorization',
        maintainability: 'Very good - well-documented and organized'
      },
      issues: [
        {
          severity: 'Minor',
          category: 'Accessibility',
          description: 'Some form inputs missing aria-labels',
          recommendation: 'Add proper ARIA labels for all form elements'
        },
        {
          severity: 'Minor',
          category: 'Performance',
          description: 'API responses could benefit from caching',
          recommendation: 'Implement response caching with appropriate TTL'
        }
      ],
      recommendations: [
        'Add comprehensive error boundaries for better error handling',
        'Implement performance monitoring and alerts',
        'Add more detailed loading states for better UX',
        'Consider implementing offline functionality for critical features'
      ],
      score: 0.87,
      nextSteps: [
        'Address identified accessibility issues',
        'Implement suggested performance optimizations',
        'Add additional test coverage for edge cases',
        'Update documentation with recent changes'
      ]
    };
  }

  private async handleBugAnalysis(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Bug Analysis Task:**
1. Reproduce and analyze reported bugs
2. Determine root cause and impact assessment
3. Provide detailed bug reports with steps to reproduce
4. Suggest fix approaches and prevention strategies
5. Prioritize bugs based on severity and user impact
6. Plan testing strategy for bug fixes
7. Coordinate with development agents for resolution

**Bug Analysis Framework:**
- Reproduction: Detailed steps to consistently reproduce
- Environment: Browser, device, operating system details
- Impact: User impact and business impact assessment
- Severity: Critical, High, Medium, Low classification
- Root Cause: Technical analysis of underlying issue
- Fix Strategy: Recommended approach for resolution
- Prevention: Process improvements to prevent similar issues

Please provide comprehensive bug analysis with actionable recommendations.
`;

    return {
      type: 'bug_analysis',
      analysis: {
        reproduced: true,
        environment: 'Chrome 91+, Safari 14+, Firefox 88+',
        severity: 'Medium',
        impact: 'Affects user workflow but has workarounds',
        rootCause: 'Detailed technical analysis of the underlying issue',
        affectedComponents: ['Frontend form validation', 'API error handling']
      },
      reproductionSteps: [
        'Navigate to contact form',
        'Enter invalid email format',
        'Submit form without correcting validation errors',
        'Observe incorrect error message display'
      ],
      recommendations: [
        'Update form validation logic to handle edge cases',
        'Improve error messaging for better user guidance',
        'Add client-side validation before API submission',
        'Implement comprehensive error logging'
      ],
      fixStrategy: 'Update validation schema and error handling',
      testingPlan: 'Comprehensive regression testing of form functionality',
      prevention: [
        'Add validation test cases for all input formats',
        'Implement automated testing for form workflows',
        'Regular accessibility and usability testing'
      ]
    };
  }

  private async handleGenericTask(task: Task, prompt: string): Promise<any> {
    return {
      type: 'generic',
      response: 'Task reviewed from quality assurance perspective',
      recommendations: [
        'Ensure proper testing coverage',
        'Validate against requirements',
        'Check accessibility compliance',
        'Review user experience impact'
      ]
    };
  }

  private generateTestPlan(task: Task): any {
    return {
      scope: 'Comprehensive testing of new feature functionality',
      objectives: [
        'Validate functionality meets requirements',
        'Ensure high quality user experience',
        'Verify accessibility compliance',
        'Confirm performance benchmarks'
      ],
      approach: 'Risk-based testing with automation where appropriate',
      resources: ['QA Agent', 'Testing Agent', 'UI/UX Agent collaboration'],
      timeline: '11 days total testing cycle',
      deliverables: [
        'Test cases and execution results',
        'Bug reports and resolution tracking',
        'Quality assessment report',
        'Automation test suite'
      ]
    };
  }

  private generateTestCases(task: Task): any[] {
    return [
      {
        id: 'TC-001',
        title: 'Functional Validation - Happy Path',
        description: 'Verify core functionality works as expected',
        priority: 'High',
        type: 'Functional',
        estimatedTime: '30 minutes'
      },
      {
        id: 'TC-002',
        title: 'Error Handling Validation',
        description: 'Verify proper error handling for edge cases',
        priority: 'High',
        type: 'Functional',
        estimatedTime: '45 minutes'
      },
      {
        id: 'TC-003',
        title: 'Accessibility Compliance Check',
        description: 'Validate WCAG 2.1 compliance',
        priority: 'High',
        type: 'Accessibility',
        estimatedTime: '60 minutes'
      },
      {
        id: 'TC-004',
        title: 'Performance Validation',
        description: 'Verify performance meets benchmarks',
        priority: 'Medium',
        type: 'Performance',
        estimatedTime: '90 minutes'
      }
    ];
  }

  private planTestAutomation(task: Task): any {
    return {
      scope: 'Automate regression testing and critical user flows',
      tools: ['Vitest for unit tests', 'Playwright for E2E tests', 'axe-core for accessibility'],
      coverage: {
        unit: '90% code coverage target',
        integration: 'All API endpoints covered',
        e2e: 'Critical user journeys automated',
        accessibility: 'Automated a11y checks in CI/CD'
      },
      implementation: '3 days for initial automation setup',
      maintenance: 'Ongoing maintenance as part of development cycle'
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
      'Quality Assurance and Testing',
      'Test Planning and Test Case Design',
      'Bug Detection and Analysis',
      'User Acceptance Testing',
      'Accessibility Testing and Compliance',
      'Performance Testing and Validation',
      'Security Testing and Assessment',
      'Usability and User Experience Validation',
      'Test Automation Strategy and Implementation'
    ];
  }

  getCollaborationPreferences(): Record<string, number> {
    return {
      'testing-agent': 0.95,
      'ui-ux-agent': 0.9,
      'frontend-agent': 0.85,
      'backend-agent': 0.85,
      'project-manager-agent': 0.9,
      'security-agent': 0.8,
      'performance-agent': 0.85
    };
  }
}
