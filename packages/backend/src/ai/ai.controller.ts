import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AIService } from './ai.service';
import {
    CoordinateAgentsDto,
    CreateAgentDto,
    CreateTaskDto,
    UpdateAgentDto,
    UpdateTaskDto
} from './dto/ai.dto';

@ApiTags('AI Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  // AI Agents Management
  @Get('agents')
  @ApiOperation({ summary: 'Get all AI agents' })
  @ApiResponse({ status: 200, description: 'List of AI agents' })
  async getAgents(@Query('enabled') enabled?: boolean) {
    return this.aiService.getAgents(enabled);
  }

  @Get('agents/:id')
  @ApiOperation({ summary: 'Get AI agent by ID' })
  @ApiResponse({ status: 200, description: 'AI agent details' })
  async getAgent(@Param('id') id: string) {
    return this.aiService.getAgent(id);
  }

  @Post('agents')
  @ApiOperation({ summary: 'Create new AI agent' })
  @ApiResponse({ status: 201, description: 'Agent created successfully' })
  async createAgent(@Body() createAgentDto: CreateAgentDto) {
    return this.aiService.createAgent(createAgentDto);
  }

  @Put('agents/:id')
  @ApiOperation({ summary: 'Update AI agent' })
  @ApiResponse({ status: 200, description: 'Agent updated successfully' })
  async updateAgent(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto
  ) {
    return this.aiService.updateAgent(id, updateAgentDto);
  }

  @Delete('agents/:id')
  @ApiOperation({ summary: 'Delete AI agent' })
  @ApiResponse({ status: 200, description: 'Agent deleted successfully' })
  async deleteAgent(@Param('id') id: string) {
    return this.aiService.deleteAgent(id);
  }

  @Post('agents/:id/toggle')
  @ApiOperation({ summary: 'Toggle AI agent enabled status' })
  @ApiResponse({ status: 200, description: 'Agent status toggled' })
  async toggleAgent(@Param('id') id: string) {
    return this.aiService.toggleAgent(id);
  }

  // AI Tasks Management
  @Get('tasks')
  @ApiOperation({ summary: 'Get AI tasks' })
  @ApiResponse({ status: 200, description: 'List of AI tasks' })
  async getTasks(
    @Query('status') status?: string,
    @Query('agentId') agentId?: string,
    @Query('limit') limit?: number
  ) {
    return this.aiService.getTasks({ status, agentId, limit });
  }

  @Get('tasks/:id')
  @ApiOperation({ summary: 'Get AI task by ID' })
  @ApiResponse({ status: 200, description: 'AI task details' })
  async getTask(@Param('id') id: string) {
    return this.aiService.getTask(id);
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Create new AI task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.aiService.createTask(createTaskDto);
  }

  @Put('tasks/:id')
  @ApiOperation({ summary: 'Update AI task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.aiService.updateTask(id, updateTaskDto);
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Cancel AI task' })
  @ApiResponse({ status: 200, description: 'Task cancelled successfully' })
  async cancelTask(@Param('id') id: string) {
    return this.aiService.cancelTask(id);
  }

  @Post('tasks/:id/retry')
  @ApiOperation({ summary: 'Retry failed AI task' })
  @ApiResponse({ status: 200, description: 'Task retry initiated' })
  async retryTask(@Param('id') id: string) {
    return this.aiService.retryTask(id);
  }

  // Agent Coordination
  @Get('coordinations')
  @ApiOperation({ summary: 'Get agent coordinations' })
  @ApiResponse({ status: 200, description: 'List of coordinations' })
  async getCoordinations(@Query('status') status?: string) {
    return this.aiService.getCoordinations(status);
  }

  @Post('coordinations')
  @ApiOperation({ summary: 'Create agent coordination' })
  @ApiResponse({
    status: 201,
    description: 'Coordination created successfully'
  })
  async createCoordination(@Body() coordinateDto: CoordinateAgentsDto) {
    return this.aiService.createCoordination(coordinateDto);
  }

  @Get('coordinations/:id')
  @ApiOperation({ summary: 'Get coordination by ID' })
  @ApiResponse({ status: 200, description: 'Coordination details' })
  async getCoordination(@Param('id') id: string) {
    return this.aiService.getCoordination(id);
  }

  // MCP Server Management
  @Get('mcp/status')
  @ApiOperation({ summary: 'Get MCP server status' })
  @ApiResponse({ status: 200, description: 'MCP server status information' })
  async getMCPStatus() {
    return this.aiService.getMCPStatus();
  }

  @Post('mcp/restart')
  @ApiOperation({ summary: 'Restart MCP server' })
  @ApiResponse({ status: 200, description: 'MCP server restart initiated' })
  async restartMCPServer() {
    return this.aiService.restartMCPServer();
  }

  @Get('mcp/metrics')
  @ApiOperation({ summary: 'Get MCP server metrics' })
  @ApiResponse({ status: 200, description: 'MCP server metrics' })
  async getMCPMetrics() {
    return this.aiService.getMCPMetrics();
  }

  @Post('mcp/health-check')
  @ApiOperation({ summary: 'Perform MCP server health check' })
  @ApiResponse({ status: 200, description: 'Health check results' })
  async performHealthCheck() {
    return this.aiService.performHealthCheck();
  }

  // Analytics & Insights
  @Get('analytics/dashboard')
  @ApiOperation({ summary: 'Get AI analytics dashboard data' })
  @ApiResponse({ status: 200, description: 'Analytics dashboard data' })
  async getAnalytics(@Query('days') days?: number) {
    return this.aiService.getAnalytics(days || 30);
  }

  @Get('analytics/agents/performance')
  @ApiOperation({ summary: 'Get agent performance metrics' })
  @ApiResponse({ status: 200, description: 'Agent performance metrics' })
  async getAgentPerformance() {
    return this.aiService.getAgentPerformance();
  }

  @Get('analytics/tasks/summary')
  @ApiOperation({ summary: 'Get task execution summary' })
  @ApiResponse({ status: 200, description: 'Task execution summary' })
  async getTaskSummary(@Query('period') period?: string) {
    return this.aiService.getTaskSummary(period || 'week');
  }

  // Quick Actions
  @Post('quick/assign-task')
  @ApiOperation({ summary: 'Quick assign task to best agent' })
  @ApiResponse({ status: 201, description: 'Task assigned successfully' })
  async quickAssignTask(
    @Body() task: { title: string; description: string; type: string }
  ) {
    return this.aiService.quickAssignTask(task);
  }

  @Post('quick/code-review')
  @ApiOperation({ summary: 'Quick code review' })
  @ApiResponse({ status: 200, description: 'Code review completed' })
  async quickCodeReview(
    @Body() data: { files: string[]; reviewType?: string }
  ) {
    return this.aiService.quickCodeReview(data);
  }

  @Post('quick/feature-planning')
  @ApiOperation({ summary: 'Quick feature planning' })
  @ApiResponse({ status: 200, description: 'Feature planning completed' })
  async quickFeaturePlanning(
    @Body() data: { featureName: string; requirements: string }
  ) {
    return this.aiService.quickFeaturePlanning(data);
  }
}
