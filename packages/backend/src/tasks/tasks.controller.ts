import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('cleanup/sessions')
  @ApiOperation({ summary: 'Manually trigger session cleanup' })
  @ApiResponse({
    status: 200,
    description: 'Session cleanup completed',
    schema: {
      type: 'object',
      properties: {
        deletedCount: { type: 'number' },
        timestamp: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async triggerSessionCleanup() {
    return this.tasksService.triggerCleanup();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get task service status' })
  @ApiResponse({
    status: 200,
    description: 'Task service status',
    schema: {
      type: 'object',
      properties: {
        isRunning: { type: 'boolean' },
        hourlyCleanup: { type: 'string' },
        frequentCleanup: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getStatus() {
    return this.tasksService.getStatus();
  }
}
