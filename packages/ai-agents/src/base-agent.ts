import winston from 'winston';
import { AgentConfig, AgentMetrics, AgentResponse, Task } from './types.js';

/**
 * Base AI Agent Class
 * All AI agents extend this class to provide consistent interface and functionality
 */
export abstract class BaseAgent {
  protected logger: winston.Logger;
  protected metrics: AgentMetrics;

  constructor(
    public config: AgentConfig,
    logger?: winston.Logger
  ) {
    this.logger = logger || winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level.toUpperCase()}] [${this.config.name}] ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
          filename: `logs/agents/${this.config.id}.log`,
          level: 'debug'
        })
      ]
    });

    this.metrics = {
      agentId: config.id,
      tasksCompleted: 0,
      tasksSuccessful: 0,
      tasksFailed: 0,
      averageResponseTime: 0,
      totalTokensUsed: 0,
      averageConfidence: 0,
      uptime: 0
    };
  }

  /**
   * Abstract method for processing tasks - must be implemented by each agent
   */
  abstract processTask(task: Task): Promise<AgentResponse>;

  /**
   * Check if the agent can handle a specific task based on capabilities
   */
  canHandleTask(task: Task): boolean {
    if (!this.config.enabled) {
      return false;
    }

    // Check if agent has required capabilities
    const hasRequiredCapabilities = task.requiredCapabilities.every(capability =>
      this.config.capabilities.some(agentCap => 
        agentCap.name === capability && agentCap.enabled
      )
    );

    return hasRequiredCapabilities;
  }

  /**
   * Get agent priority for a specific task type
   */
  getTaskPriority(task: Task): number {
    const relevantCapabilities = this.config.capabilities.filter(capability =>
      task.requiredCapabilities.includes(capability.name)
    );

    if (relevantCapabilities.length === 0) {
      return 0;
    }

    // Return average priority of relevant capabilities
    return relevantCapabilities.reduce((sum, cap) => sum + cap.priority, 0) / relevantCapabilities.length;
  }

  /**
   * Update agent metrics after task completion
   */
  protected updateMetrics(response: AgentResponse): void {
    this.metrics.tasksCompleted++;
    
    if (response.success) {
      this.metrics.tasksSuccessful++;
    } else {
      this.metrics.tasksFailed++;
    }

    // Update average response time
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime * (this.metrics.tasksCompleted - 1) + response.duration) / 
      this.metrics.tasksCompleted;

    if (response.tokensUsed) {
      this.metrics.totalTokensUsed += response.tokensUsed;
    }

    if (response.confidence !== undefined) {
      this.metrics.averageConfidence = 
        (this.metrics.averageConfidence * (this.metrics.tasksCompleted - 1) + response.confidence) /
        this.metrics.tasksCompleted;
    }

    this.metrics.lastActive = new Date();
  }

  /**
   * Log task execution
   */
  protected logTaskExecution(task: Task, response: AgentResponse): void {
    const logLevel = response.success ? 'info' : 'error';
    const message = `Task ${task.id} (${task.type}) ${response.success ? 'completed' : 'failed'}`;
    
    this.logger.log(logLevel, message, {
      taskId: task.id,
      taskType: task.type,
      duration: response.duration,
      tokensUsed: response.tokensUsed,
      confidence: response.confidence,
      error: response.error
    });
  }

  /**
   * Get current metrics
   */
  getMetrics(): AgentMetrics {
    return { ...this.metrics };
  }

  /**
   * Check if agent is healthy and available
   */
  isHealthy(): boolean {
    return this.config.enabled && this.isOnline();
  }

  /**
   * Check if agent is online (can be overridden by specific agents)
   */
  protected isOnline(): boolean {
    return true;
  }

  /**
   * Get agent information summary
   */
  getInfo(): object {
    return {
      id: this.config.id,
      name: this.config.name,
      role: this.config.role,
      model: this.config.model,
      enabled: this.config.enabled,
      capabilities: this.config.capabilities.filter(cap => cap.enabled),
      metrics: this.getMetrics(),
      healthy: this.isHealthy()
    };
  }
}
