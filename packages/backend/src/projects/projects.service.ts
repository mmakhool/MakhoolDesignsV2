import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Project, ProjectCategory } from '../entities/project.entity';

export interface CreateProjectData {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  images?: string[];
  category: ProjectCategory;
  featured?: boolean;
  isActive?: boolean;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string;
  completedAt?: Date;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  images?: string[];
  category?: ProjectCategory;
  featured?: boolean;
  isActive?: boolean;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string;
  completedAt?: Date;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll({
      orderBy: { createdAt: 'DESC' }
    });
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({ id });
  }

  async findActive(): Promise<Project[]> {
    return this.projectRepository.find(
      { isActive: true },
      {
        orderBy: { createdAt: 'DESC' }
      }
    );
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectRepository.find(
      { featured: true, isActive: true },
      {
        orderBy: { createdAt: 'DESC' }
      }
    );
  }

  async findByCategory(category: ProjectCategory): Promise<Project[]> {
    return this.projectRepository.find(
      { category, isActive: true },
      {
        orderBy: { createdAt: 'DESC' }
      }
    );
  }

  async create(projectData: CreateProjectData): Promise<Project> {
    const project = new Project(
      projectData.title,
      projectData.description,
      projectData.category
    );

    // Set optional properties
    if (projectData.imageUrl !== undefined) {
      project.imageUrl = projectData.imageUrl;
    }
    if (projectData.tags !== undefined) {
      project.tags = projectData.tags;
    }
    if (projectData.images !== undefined) {
      project.images = projectData.images;
    }
    if (projectData.featured !== undefined) {
      project.featured = projectData.featured;
    }
    if (projectData.isActive !== undefined) {
      project.isActive = projectData.isActive;
    }
    if (projectData.projectUrl !== undefined) {
      project.projectUrl = projectData.projectUrl;
    }
    if (projectData.githubUrl !== undefined) {
      project.githubUrl = projectData.githubUrl;
    }
    if (projectData.technologies !== undefined) {
      project.technologies = projectData.technologies;
    }
    if (projectData.completedAt !== undefined) {
      project.completedAt = projectData.completedAt;
    }

    await this.em.persistAndFlush(project);
    return project;
  }

  async update(id: string, projectData: UpdateProjectData): Promise<Project | null> {
    const project = await this.projectRepository.findOne({ id });
    if (!project) {
      return null;
    }

    // Update properties
    if (projectData.title !== undefined) {
      project.title = projectData.title;
    }
    if (projectData.description !== undefined) {
      project.description = projectData.description;
    }
    if (projectData.imageUrl !== undefined) {
      project.imageUrl = projectData.imageUrl;
    }
    if (projectData.tags !== undefined) {
      project.tags = projectData.tags;
    }
    if (projectData.images !== undefined) {
      project.images = projectData.images;
    }
    if (projectData.category !== undefined) {
      project.category = projectData.category;
    }
    if (projectData.featured !== undefined) {
      project.featured = projectData.featured;
    }
    if (projectData.isActive !== undefined) {
      project.isActive = projectData.isActive;
    }
    if (projectData.projectUrl !== undefined) {
      project.projectUrl = projectData.projectUrl;
    }
    if (projectData.githubUrl !== undefined) {
      project.githubUrl = projectData.githubUrl;
    }
    if (projectData.technologies !== undefined) {
      project.technologies = projectData.technologies;
    }
    if (projectData.completedAt !== undefined) {
      project.completedAt = projectData.completedAt;
    }

    await this.em.persistAndFlush(project);
    return project;
  }

  async delete(id: string): Promise<boolean> {
    const project = await this.projectRepository.findOne({ id });
    if (!project) {
      return false;
    }

    await this.em.removeAndFlush(project);
    return true;
  }

  async toggleFeatured(id: string): Promise<Project | null> {
    const project = await this.projectRepository.findOne({ id });
    if (!project) {
      return null;
    }

    project.featured = !project.featured;
    await this.em.persistAndFlush(project);
    return project;
  }

  async toggleActive(id: string): Promise<Project | null> {
    const project = await this.projectRepository.findOne({ id });
    if (!project) {
      return null;
    }

    project.isActive = !project.isActive;
    await this.em.persistAndFlush(project);
    return project;
  }
}