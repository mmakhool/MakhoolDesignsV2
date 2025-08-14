import { BaseAgent } from '../base-agent.js';
import { AgentCapability, AgentConfig, AgentResponse, Task, TaskType } from '../types.js';

/**
 * Testing Agent
 * Specializes in: Unit tests, integration tests, e2e tests, test automation
 */
export class TestingAgent extends BaseAgent {
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
        return await this.handleTestDevelopment(task, taskPrompt);
      case TaskType.CODE_GENERATION:
        return await this.handleTestCodeGeneration(task, taskPrompt);
      case TaskType.CODE_REVIEW:
        return await this.handleTestReview(task, taskPrompt);
      default:
        return await this.handleGenericTask(task, taskPrompt);
    }
  }

  private getSystemPrompt(): string {
    return `
You are the Testing Agent for MakhoolDesigns, a specialist in:

**Core Expertise:**
- Unit testing with Vitest and Jest
- React component testing with React Testing Library
- Integration testing for API endpoints and services
- End-to-end (E2E) testing with Playwright
- Test automation and continuous integration
- Test-driven development (TDD) practices
- Behavior-driven development (BDD) approaches
- Performance testing and load testing
- Mock and stub implementation for isolated testing

**Project Context:**
- Rush.js monorepo with TypeScript across all packages
- Frontend: React 19 with Vitest and React Testing Library
- Backend: NestJS with Jest and Supertest for API testing
- Database: PostgreSQL with test database setup
- CI/CD: Automated testing pipeline integration
- Testing philosophy: High coverage with meaningful tests
- Quality gates: Tests must pass before deployment

**Responsibilities:**
- Develop comprehensive unit tests for all components and services
- Create integration tests for API endpoints and database interactions
- Implement E2E tests for critical user journeys
- Set up test automation and CI/CD pipeline integration
- Maintain test suites and ensure high code coverage
- Collaborate with QA Agent for test planning and validation
- Provide testing best practices and guidelines
- Debug and fix flaky tests and test infrastructure

**Testing Stack:**
- Unit Testing: Vitest (frontend), Jest (backend)
- Component Testing: React Testing Library, @testing-library/jest-dom
- API Testing: Supertest for HTTP testing
- E2E Testing: Playwright for browser automation
- Mocking: MSW (Mock Service Worker) for API mocking
- Coverage: Built-in coverage reporting with c8
- CI/CD: GitHub Actions or similar for automated testing

**Testing Principles:**
- Write tests that provide confidence, not just coverage
- Test behavior, not implementation details
- Use the testing pyramid: more unit tests, fewer E2E tests
- Keep tests simple, readable, and maintainable
- Test edge cases and error scenarios
- Ensure tests are fast and reliable
- Mock external dependencies appropriately

**Communication Style:**
- Provide clear, executable test code
- Include comprehensive test descriptions and comments
- Focus on test maintainability and readability
- Suggest testing best practices and improvements
- Reference existing test patterns in the codebase
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

Please provide comprehensive testing implementation with high-quality test code.
`;
  }

  private async handleTestDevelopment(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Test Development Task:**
1. Analyze code to be tested and identify test scenarios
2. Create comprehensive unit tests with high coverage
3. Implement integration tests for API endpoints and services
4. Develop E2E tests for critical user workflows
5. Set up test data and mocking strategies
6. Ensure tests are maintainable and follow best practices
7. Configure test automation and CI/CD integration

**Testing Approach:**
- Unit Tests: Test individual functions, components, and services in isolation
- Integration Tests: Test API endpoints, database interactions, and service integration
- Component Tests: Test React components with user interaction scenarios
- E2E Tests: Test complete user workflows from browser perspective
- Performance Tests: Test response times and load handling
- Accessibility Tests: Automated a11y testing with axe-core

**Current Testing Setup:**
- Frontend: Vitest with React Testing Library
- Backend: Jest with Supertest for API testing
- E2E: Playwright for browser automation
- Mocking: MSW for API mocking, Jest mocks for services
- Coverage: Configured with thresholds and reporting
- CI/CD: Automated testing on pull requests and deployments

Please provide complete test implementation with proper setup and configuration.
`;

    const testSuite = this.generateTestSuite(task);
    const testCode = this.generateTestCode(task);
    const setupInstructions = this.generateTestSetup(task);

    return {
      type: 'test_development',
      testSuite,
      testCode,
      setupInstructions,
      recommendations: [
        'Follow the testing pyramid: more unit tests, fewer integration and E2E tests',
        'Use descriptive test names that explain the expected behavior',
        'Mock external dependencies to ensure test isolation',
        'Include positive, negative, and edge case testing scenarios',
        'Set up proper test data factories for consistent test data',
        'Configure code coverage thresholds to maintain quality'
      ],
      coverage: {
        target: '90% overall coverage',
        unit: '95% for individual functions and components',
        integration: '85% for API endpoints and services',
        e2e: 'Critical user journeys covered'
      },
      automation: {
        ci: 'Tests run automatically on pull requests',
        deployment: 'Tests must pass before deployment',
        reporting: 'Coverage reports generated and tracked'
      }
    };
  }

  private async handleTestCodeGeneration(task: Task, prompt: string): Promise<any> {
    const enhancedPrompt = `${this.getSystemPrompt()}

${prompt}

**Test Code Generation Task:**
1. Generate high-quality test code for specified functionality
2. Include comprehensive test cases covering all scenarios
3. Implement proper mocking and test data setup
4. Follow testing best practices and patterns
5. Ensure tests are readable, maintainable, and reliable
6. Include both positive and negative test cases
7. Add performance and accessibility testing where appropriate

**Code Generation Guidelines:**
- Use TypeScript for all test code with proper typing
- Follow existing test patterns and conventions in the codebase
- Include setup and teardown procedures where needed
- Use appropriate assertion libraries and matchers
- Implement proper error handling and edge case testing
- Add comprehensive test documentation and comments

Please generate complete, production-ready test code.
`;

    return {
      type: 'test_code_generation',
      code: {
        unit: `
// Example Unit Test for React Component
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should render contact form with all required fields', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should validate email format and show error message', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // Additional test cases would be generated here
});
        `,
        integration: `
// Example Integration Test for API Endpoint
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ContactController } from '../contact.controller';
import { ContactService } from '../contact.service';

describe('ContactController (e2e)', () => {
  let app: INestApplication;
  let contactService: ContactService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            create: vi.fn(),
            findAll: vi.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    contactService = moduleFixture.get<ContactService>(ContactService);
    await app.init();
  });

  it('/contact (POST) should create new contact submission', () => {
    const createContactDto = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    };

    vi.spyOn(contactService, 'create').mockResolvedValue({
      id: '123',
      ...createContactDto,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return request(app.getHttpServer())
      .post('/contact')
      .send(createContactDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(createContactDto.name);
        expect(res.body.email).toBe(createContactDto.email);
      });
  });

  // Additional integration tests would be generated here
});
        `,
        e2e: `
// Example E2E Test with Playwright
import { test, expect } from '@playwright/test';

test.describe('Contact Form E2E', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out the contact form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="subject-input"]', 'Test Subject');
    await page.fill('[data-testid="message-textarea"]', 'This is a test message');
    
    // Submit the form
    await page.click('[data-testid="submit-button"]');
    
    // Wait for success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Thank you for your message');
    
    // Verify form is reset
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue('');
  });

  test('should handle form validation errors', async ({ page }) => {
    await page.goto('/contact');
    
    // Submit empty form
    await page.click('[data-testid="submit-button"]');
    
    // Check validation errors
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="message-error"]')).toBeVisible();
  });

  // Additional E2E tests would be generated here
});
        `
      },
      recommendations: [
        'Use data-testid attributes for reliable element selection',
        'Implement proper wait strategies for async operations',
        'Create reusable test utilities and helper functions',
        'Set up proper test data factories for consistent testing'
      ]
    };
  }

  private async handleTestReview(task: Task, prompt: string): Promise<any> {
    return {
      type: 'test_review',
      assessment: {
        coverage: '89% overall coverage - Good',
        quality: 'High-quality tests with good practices',
        maintainability: 'Well-organized and readable test code',
        reliability: 'Tests are stable and not flaky'
      },
      issues: [
        {
          type: 'Missing Coverage',
          description: 'Error handling scenarios not fully tested',
          recommendation: 'Add tests for error conditions and edge cases'
        },
        {
          type: 'Test Organization',
          description: 'Some test files could benefit from better grouping',
          recommendation: 'Group related tests using describe blocks'
        }
      ],
      recommendations: [
        'Add more integration tests for complex workflows',
        'Implement visual regression testing for UI components',
        'Set up performance benchmarks and monitoring',
        'Add accessibility testing with axe-core'
      ],
      score: 0.89
    };
  }

  private async handleGenericTask(task: Task, prompt: string): Promise<any> {
    return {
      type: 'generic',
      response: 'Task approached with comprehensive testing perspective',
      recommendations: [
        'Ensure all new code has corresponding tests',
        'Follow test-driven development practices',
        'Maintain high test coverage standards',
        'Include both unit and integration testing'
      ]
    };
  }

  private generateTestSuite(task: Task): any {
    return {
      scope: 'Comprehensive test suite for feature functionality',
      structure: {
        unit: 'Individual component and function testing',
        integration: 'API and service integration testing',
        e2e: 'End-to-end user workflow testing',
        performance: 'Response time and load testing'
      },
      coverage: {
        target: '90%',
        current: '0% (new feature)',
        threshold: '85% minimum for CI/CD'
      },
      automation: 'Fully automated with CI/CD integration'
    };
  }

  private generateTestCode(task: Task): any {
    return {
      unit: 'Generated unit test code with comprehensive scenarios',
      integration: 'Generated integration test code for API endpoints',
      e2e: 'Generated end-to-end test code for user workflows',
      mocks: 'Generated mock implementations for external dependencies',
      fixtures: 'Generated test data and fixtures for consistent testing'
    };
  }

  private generateTestSetup(task: Task): any {
    return {
      configuration: 'Test configuration files and setup scripts',
      dependencies: 'Required testing dependencies and tools',
      ci: 'CI/CD pipeline configuration for automated testing',
      documentation: 'Testing guidelines and best practices documentation'
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
      'Unit Testing with Vitest and Jest',
      'React Component Testing with Testing Library',
      'API Integration Testing',
      'End-to-End Testing with Playwright',
      'Test Automation and CI/CD Integration',
      'Test-Driven Development (TDD)',
      'Mock and Stub Implementation',
      'Performance Testing',
      'Test Code Generation and Maintenance'
    ];
  }

  getCollaborationPreferences(): Record<string, number> {
    return {
      'qa-agent': 0.95,
      'backend-agent': 0.9,
      'frontend-agent': 0.9,
      'performance-agent': 0.85,
      'security-agent': 0.8,
      'project-manager-agent': 0.85
    };
  }
}
