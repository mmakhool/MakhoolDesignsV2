import OpenAI from 'openai';
import { BaseAgent } from './base-agent.js';
import { AgentConfig, AgentResponse, Task } from './types.js';

/**
 * OpenAI GPT Agent Implementation
 */
export class GPTAgent extends BaseAgent {
  private openai: OpenAI;

  constructor(config: AgentConfig, apiKey?: string) {
    super(config);
    
    this.openai = new OpenAI({
      apiKey: apiKey || config.apiKey || process.env.OPENAI_API_KEY,
      baseURL: config.baseUrl
    });
  }

  async processTask(task: Task): Promise<AgentResponse> {
    const startTime = Date.now();
    
    try {
      this.logger.info(`Processing task: ${task.title}`, { taskId: task.id });

      const messages = await this.buildMessages(task);
      
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        stream: false
      });

      const duration = Date.now() - startTime;
      const result = this.processResponse(response, task);
      
      const agentResponse: AgentResponse = {
        agentId: this.config.id,
        taskId: task.id,
        success: true,
        result: result,
        duration: duration,
        tokensUsed: response.usage?.total_tokens || 0,
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

  private async buildMessages(task: Task): Promise<OpenAI.Chat.Completions.ChatCompletionMessageParam[]> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.config.systemPrompt
      },
      {
        role: 'user',
        content: this.buildTaskPrompt(task)
      }
    ];

    // Add file contents if specified
    if (task.files && task.files.length > 0) {
      let fileContent = '';
      for (const filePath of task.files) {
        try {
          const content = await this.readFileContent(filePath);
          fileContent += `\n\nFile: ${filePath}\n\`\`\`\n${content}\n\`\`\``;
        } catch (error) {
          this.logger.warn(`Could not read file ${filePath}:`, error);
        }
      }
      
      if (fileContent) {
        messages.push({
          role: 'user',
          content: fileContent
        });
      }
    }

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

  private processResponse(response: OpenAI.Chat.Completions.ChatCompletion, task: Task): any {
    const message = response.choices[0]?.message;
    
    if (!message) {
      return {
        content: 'No response received',
        taskType: task.type,
        model: response.model,
        finishReason: 'unknown'
      };
    }

    return {
      content: message.content || 'No content in response',
      taskType: task.type,
      model: response.model,
      finishReason: response.choices[0].finish_reason,
      usage: response.usage
    };
  }

  private calculateConfidence(response: OpenAI.Chat.Completions.ChatCompletion, task: Task): number {
    // Basic confidence calculation based on response characteristics
    let confidence = 0.5;

    const choice = response.choices[0];
    if (!choice) return 0.1;

    // Increase confidence for complete responses
    if (choice.finish_reason === 'stop') {
      confidence += 0.3;
    }

    // Increase confidence for longer, more detailed responses
    if (choice.message.content && choice.message.content.length > 500) {
      confidence += 0.2;
    }

    return Math.min(confidence, 1.0);
  }

  private async readFileContent(filePath: string): Promise<string> {
    // This would be implemented to read file content from the workspace
    // For now, return a placeholder
    return `// Content of ${filePath} would be loaded here`;
  }

  protected isOnline(): boolean {
    return !!this.openai && !!process.env.OPENAI_API_KEY;
  }
}
