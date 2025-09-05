import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleType } from '../entities/role.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { Project, ProjectCategory } from '../entities/project.entity';

@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'List of projects', type: [Project] })
  @ApiQuery({ name: 'category', enum: ProjectCategory, required: false })
  @ApiQuery({ name: 'featured', type: Boolean, required: false })
  @ApiQuery({ name: 'active', type: Boolean, required: false })
  async getProjects(
    @Query('category') category?: ProjectCategory,
    @Query('featured') featured?: boolean,
    @Query('active') active?: boolean,
  ): Promise<Project[]> {
    if (category) {
      return this.projectsService.findByCategory(category);
    }
    
    if (featured) {
      return this.projectsService.findFeatured();
    }
    
    if (active !== undefined) {
      return active ? this.projectsService.findActive() : this.projectsService.findAll();
    }
    
    return this.projectsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active projects' })
  @ApiResponse({ status: 200, description: 'List of active projects', type: [Project] })
  async getActiveProjects(): Promise<Project[]> {
    return this.projectsService.findActive();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get all featured projects' })
  @ApiResponse({ status: 200, description: 'List of featured projects', type: [Project] })
  async getFeaturedProjects(): Promise<Project[]> {
    return this.projectsService.findFeatured();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project details', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async getProject(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SYSADMIN, RoleType.SYSMANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully', type: Project })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const projectData = {
        ...createProjectDto,
        completedAt: createProjectDto.completedAt ? new Date(createProjectDto.completedAt) : undefined,
      };
      return await this.projectsService.create(projectData);
    } catch {
      throw new BadRequestException('Failed to create project');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SYSADMIN, RoleType.SYSMANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully', type: Project })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    try {
      const projectData = {
        ...updateProjectDto,
        completedAt: updateProjectDto.completedAt ? new Date(updateProjectDto.completedAt) : undefined,
      };
      
      const project = await this.projectsService.update(id, projectData);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update project');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SYSADMIN, RoleType.SYSMANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async deleteProject(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.projectsService.delete(id);
    if (!success) {
      throw new NotFoundException('Project not found');
    }
    return { success };
  }

  @Put(':id/toggle-featured')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SYSADMIN, RoleType.SYSMANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle project featured status' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project featured status toggled', type: Project })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async toggleFeatured(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.toggleFeatured(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Put(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SYSADMIN, RoleType.SYSMANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle project active status' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project active status toggled', type: Project })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async toggleActive(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.toggleActive(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }
}
