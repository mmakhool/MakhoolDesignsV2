import Anthropic from '@anthropic-ai/sdk';
import { BaseAgent } from './base-agent.js';
import { AgentConfig, AgentResponse, Task } from './types.js';

/**
 * Claude AI Agent Implementation using Anthropic's API
 */
export class ClaudeAgent extends BaseAgent {
  private anthropic: Anthropic;

  constructor(config: AgentConfig, apiKey?: string) {
    super(config);
    
    this.anthropic = new Anthropic({
      apiKey: apiKey || config.apiKey || process.env.ANTHROPIC_API_KEY,
    });
  }

  async processTask(task: Task): Promise<AgentResponse> {
    const startTime = Date.now();
    
    try {
      this.logger.info(`Processing task: ${task.title}`, { taskId: task.id });

      const messages = await this.buildMessages(task);
      
      const response = await this.anthropic.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        system: this.config.systemPrompt,
        messages: messages
      });

      const duration = Date.now() - startTime;
      const result = this.processResponse(response, task);
      
      const agentResponse: AgentResponse = {
        agentId: this.config.id,
        taskId: task.id,
        success: true,
        result: result,
        duration: duration,
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        confidence: this.calculateConfidence(response, task)
      };

      this.updateMetrics(agentResponse);
      this.logTaskExecution(task, agentResponse);
      
      return agentResponse;

    } catch (error) {
      const duration = Date.now() - startTime;
      const agentResponse: AgentResponse = {
        agentId: this.config.id,
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        duration: duration
      };

      this.updateMetrics(agentResponse);
      this.logTaskExecution(task, agentResponse);
      
      return agentResponse;
    }
  }

  private async buildMessages(task: Task): Promise<Anthropic.Messages.MessageParam[]> {
    const contentBlocks: Anthropic.Messages.TextBlockParam[] = [
      {
        type: 'text',
        text: this.buildTaskPrompt(task)
      }
    ];

    // Add file contents if specified
    if (task.files && task.files.length > 0) {
      for (const filePath of task.files) {
        try {
          const fileContent = await this.readFileContent(filePath);
          contentBlocks.push({
            type: 'text',
            text: `\n\nFile: ${filePath}\n\`\`\`\n${fileContent}\n\`\`\``
          });
        } catch (error) {
          this.logger.warn(`Could not read file ${filePath}:`, error);
        }
      }
    }

    const messages: Anthropic.Messages.MessageParam[] = [
      {
        role: 'user',
        content: contentBlocks
      }
    ];

    return messages;
  }

  private buildTaskPrompt(task: Task): string {
    let prompt = `Task: ${task.title}\n\nDescription:\n${task.description}\n\n`;
    
    prompt += `Task Type: ${task.type}\n`;
    prompt += `Priority: ${task.priority}\n`;
    
    if (task.requiredCapabilities.length > 0) {
      prompt += `Required Capabilities: ${task.requiredCapabilities.join(', ')}\n`;
    }

    if (task.context) {
      prompt += `\nContext:\n${JSON.stringify(task.context, null, 2)}\n`;
    }

    if (task.dependencies.length > 0) {
      prompt += `\nDependencies: ${task.dependencies.join(', ')}\n`;
    }

    prompt += `\nPlease process this task according to your role as ${this.config.role} and provide a comprehensive response.`;
    
    return prompt;
  }

  private processResponse(response: Anthropic.Messages.Message, task: Task): any {
    const content = response.content[0];
    
    if (content.type === 'text') {
      return {
        content: content.text,
        taskType: task.type,
        model: response.model,
        stopReason: response.stop_reason,
        usage: response.usage
      };
    }

    return {
      content: 'No text content received',
      taskType: task.type,
      model: response.model,
      stopReason: response.stop_reason,
      usage: response.usage
    };
  }

  private calculateConfidence(response: Anthropic.Messages.Message, task: Task): number {
    // Basic confidence calculation based on response characteristics
    let confidence = 0.5;

    // Increase confidence for longer, more detailed responses
    const content = response.content[0];
    if (content.type === 'text' && content.text.length > 500) {
      confidence += 0.2;
    }

    // Increase confidence if stop reason indicates natural completion
    if (response.stop_reason === 'end_turn') {
      confidence += 0.2;
    }

    // Adjust based on token usage efficiency
    const efficiency = response.usage.output_tokens / this.config.maxTokens;
    if (efficiency > 0.1 && efficiency < 0.8) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  private async readFileContent(filePath: string): Promise<string> {
    // This would be implemented to read file content from the workspace
    // For now, return a placeholder
    return `// Content of ${filePath} would be loaded here`;
  }

  protected isOnline(): boolean {
    return !!this.anthropic && !!process.env.ANTHROPIC_API_KEY;
  }
}
