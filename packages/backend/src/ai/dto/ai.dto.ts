import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty({ description: 'Name of the AI agent' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type of the AI agent' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ description: 'Description of the AI agent' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Configuration for the AI agent' })
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether the agent is enabled', default: true })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}

export class UpdateAgentDto {
  @ApiPropertyOptional({ description: 'Name of the AI agent' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Type of the AI agent' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: 'Description of the AI agent' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Configuration for the AI agent' })
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether the agent is enabled' })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the task' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Type of the task' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ description: 'Priority level of the task' })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ description: 'Agent ID to assign the task to' })
  @IsString()
  @IsOptional()
  agentId?: string;

  @ApiPropertyOptional({ description: 'Additional task data' })
  @IsOptional()
  data?: Record<string, any>;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Title of the task' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Status of the task' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Priority level of the task' })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ description: 'Agent ID assigned to the task' })
  @IsString()
  @IsOptional()
  agentId?: string;

  @ApiPropertyOptional({ description: 'Additional task data' })
  @IsOptional()
  data?: Record<string, any>;
}

export class CoordinateAgentsDto {
  @ApiProperty({ description: 'Array of agent IDs to coordinate' })
  @IsArray()
  @IsString({ each: true })
  agentIds: string[];

  @ApiProperty({ description: 'Type of coordination' })
  @IsString()
  coordinationType: string;

  @ApiPropertyOptional({ description: 'Task or objective for the coordination' })
  @IsString()
  @IsOptional()
  objective?: string;

  @ApiPropertyOptional({ description: 'Configuration for the coordination' })
  @IsOptional()
  config?: Record<string, any>;
}