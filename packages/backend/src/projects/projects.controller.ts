import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController {
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'List of projects' })
  getProjects() {
    // Mock data - replace with actual database queries
    return [
      {
        id: '1',
        title: 'Modern E-commerce Platform',
        description:
          'A full-stack e-commerce solution built with React and Node.js',
        imageUrl: '/images/project1.jpg',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'web-development',
        featured: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Restaurant Management System',
        description:
          'A comprehensive restaurant management system with POS integration',
        imageUrl: '/images/project2.jpg',
        tags: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
        category: 'web-development',
        featured: true,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20'),
      },
      {
        id: '3',
        title: 'Mobile Fitness App',
        description:
          'A cross-platform fitness tracking app with social features',
        imageUrl: '/images/project3.jpg',
        tags: ['React Native', 'Firebase', 'GraphQL'],
        category: 'mobile-development',
        featured: false,
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
    ];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project details' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getProject(@Param('id') id: string) {
    // Mock data - replace with actual database queries
    const projects = this.getProjects();
    const project = projects.find((p) => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }
}
