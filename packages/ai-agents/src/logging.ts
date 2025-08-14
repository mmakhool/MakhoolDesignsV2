import winston from 'winston';

/**
 * MCP Server Logging Configuration
 * 
 * Proper logging is essential for debugging MCP server issues
 * and monitoring agent performance.
 */

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.AGENT_LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
          return `${timestamp} [${level}] ${message} ${metaStr}`;
        })
      )
    }),
    
    // File transport for production
    new winston.transports.File({
      filename: 'logs/mcp-server.log',
      format: winston.format.json()
    }),
    
    // Error-specific file
    new winston.transports.File({
      filename: 'logs/mcp-errors.log',
      level: 'error',
      format: winston.format.json()
    })
  ]
});

/**
 * Agent performance metrics logger
 */
export class AgentMetrics {
  private static instance: AgentMetrics;
  private metrics: Map<string, any> = new Map();

  static getInstance(): AgentMetrics {
    if (!AgentMetrics.instance) {
      AgentMetrics.instance = new AgentMetrics();
    }
    return AgentMetrics.instance;
  }

  /**
   * Log task execution metrics
   */
  logTaskExecution(agentId: string, taskId: string, duration: number, success: boolean, context?: any) {
    const metric = {
      agentId,
      taskId,
      duration,
      success,
      timestamp: new Date().toISOString(),
      context
    };

    logger.info('Task execution completed', metric);
    
    // Store for aggregation
    const key = `${agentId}-executions`;
    const executions = this.metrics.get(key) || [];
    executions.push(metric);
    this.metrics.set(key, executions);
  }

  /**
   * Log agent health status
   */
  logAgentHealth(agentId: string, status: 'healthy' | 'degraded' | 'error', details?: any) {
    logger.info('Agent health check', { agentId, status, details });
  }

  /**
   * Log MCP server events
   */
  logServerEvent(event: string, details?: any) {
    logger.info('MCP server event', { event, details, timestamp: new Date().toISOString() });
  }

  /**
   * Get performance summary for an agent
   */
  getAgentPerformance(agentId: string) {
    const executions = this.metrics.get(`${agentId}-executions`) || [];
    
    if (executions.length === 0) {
      return { agentId, totalExecutions: 0, averageDuration: 0, successRate: 0 };
    }

    const totalDuration = executions.reduce((sum: number, exec: any) => sum + exec.duration, 0);
    const successCount = executions.filter((exec: any) => exec.success).length;

    return {
      agentId,
      totalExecutions: executions.length,
      averageDuration: totalDuration / executions.length,
      successRate: successCount / executions.length,
      lastExecution: executions[executions.length - 1]?.timestamp
    };
  }

  /**
   * Get all metrics summary
   */
  getAllMetrics() {
    const summary = {
      timestamp: new Date().toISOString(),
      agents: [] as any[]
    };

    // Get unique agent IDs
    const agentIds = new Set();
    for (const key of this.metrics.keys()) {
      if (key.endsWith('-executions')) {
        agentIds.add(key.replace('-executions', ''));
      }
    }

    // Generate summary for each agent
    for (const agentId of agentIds) {
      summary.agents.push(this.getAgentPerformance(agentId as string));
    }

    return summary;
  }
}

/**
 * Error handling utilities
 */
export class MCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'MCPError';
  }
}

export function handleMCPError(error: unknown, context?: string): MCPError {
  if (error instanceof MCPError) {
    return error;
  }

  if (error instanceof Error) {
    logger.error('MCP operation failed', { 
      message: error.message, 
      stack: error.stack, 
      context 
    });
    return new MCPError(error.message, 'OPERATION_FAILED', { context, originalError: error.message });
  }

  logger.error('Unknown MCP error', { error, context });
  return new MCPError('Unknown error occurred', 'UNKNOWN_ERROR', { context, error });
}
