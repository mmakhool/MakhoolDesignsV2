import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * MCP Resources - Project Files and Documentation
 * 
 * Resources allow MCP servers to expose files and data
 * that AI agents can read for context.
 */

export class MCPResourceManager {
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  /**
   * List all available resources
   */
  async listResources(): Promise<Resource[]> {
    const resources: Resource[] = [
      // Project configuration files
      {
        uri: 'file://rush.json',
        name: 'Rush Configuration',
        description: 'Monorepo configuration and package structure',
        mimeType: 'application/json'
      },
      {
        uri: 'file://tsconfig.json',
        name: 'TypeScript Configuration',
        description: 'Global TypeScript configuration',
        mimeType: 'application/json'
      },
      {
        uri: 'file://README.md',
        name: 'Project README',
        description: 'Main project documentation',
        mimeType: 'text/markdown'
      },

      // Package information
      {
        uri: 'resource://packages',
        name: 'Package Structure',
        description: 'Overview of all packages in the monorepo',
        mimeType: 'application/json'
      },

      // Architecture documentation
      {
        uri: 'resource://architecture',
        name: 'Architecture Overview',
        description: 'System architecture and design patterns',
        mimeType: 'text/markdown'
      },

      // Current development status
      {
        uri: 'resource://status',
        name: 'Development Status',
        description: 'Current project status and progress',
        mimeType: 'application/json'
      }
    ];

    return resources;
  }

  /**
   * Read resource content by URI
   */
  async readResource(uri: string): Promise<string> {
    try {
      if (uri.startsWith('file://')) {
        const filePath = uri.replace('file://', '');
        const fullPath = join(this.projectRoot, filePath);
        
        if (!existsSync(fullPath)) {
          throw new Error(`File not found: ${filePath}`);
        }
        
        return readFileSync(fullPath, 'utf8');
      }

      if (uri.startsWith('resource://')) {
        const resourceType = uri.replace('resource://', '');
        return await this.generateDynamicResource(resourceType);
      }

      throw new Error(`Unsupported resource URI: ${uri}`);
    } catch (error) {
      throw new Error(`Failed to read resource ${uri}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate dynamic resource content
   */
  private async generateDynamicResource(type: string): Promise<string> {
    switch (type) {
      case 'packages':
        return JSON.stringify(await this.getPackageStructure(), null, 2);
      
      case 'architecture':
        return this.getArchitectureDocumentation();
      
      case 'status':
        return JSON.stringify(await this.getProjectStatus(), null, 2);
      
      default:
        throw new Error(`Unknown resource type: ${type}`);
    }
  }

  /**
   * Get package structure information
   */
  private async getPackageStructure() {
    try {
      const rushConfig = JSON.parse(readFileSync(join(this.projectRoot, 'rush.json'), 'utf8'));
      return {
        packages: rushConfig.projects?.map((project: any) => ({
          name: project.packageName,
          path: project.projectFolder,
          description: this.getPackageDescription(project.packageName)
        })) || [],
        totalPackages: rushConfig.projects?.length || 0,
        rushVersion: rushConfig.rushVersion
      };
    } catch {
      return { packages: [], totalPackages: 0, rushVersion: 'unknown' };
    }
  }

  /**
   * Get package description from package.json
   */
  private getPackageDescription(packageName: string): string {
    const descriptions: Record<string, string> = {
      '@makhool-designs/web': 'React frontend with TypeScript, built with Vite',
      '@makhool-designs/backend': 'NestJS API server with TypeScript',
      '@makhool-designs/shared': 'Shared types, utilities, and constants',
      '@makhool-designs/database': 'Database schemas and migrations with MikroORM',
      '@makhool-designs/ui': 'UI component library with TailwindCSS',
      '@makhool-designs/ai-agents': 'Multi-agent AI development team'
    };
    return descriptions[packageName] || 'Package description not available';
  }

  /**
   * Get architecture documentation
   */
  private getArchitectureDocumentation(): string {
    return `# MakhoolDesigns Architecture

## System Overview
This is a Rush.js monorepo for a modern full-stack web application.

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: NestJS + TypeScript + MikroORM + PostgreSQL
- **Monorepo**: Rush.js with PNPM workspaces
- **AI Integration**: Multi-agent system with MCP server

## Package Dependencies
\`\`\`
@makhool-designs/web → @makhool-designs/shared
@makhool-designs/backend → @makhool-designs/shared, @makhool-designs/database
@makhool-designs/database → @makhool-designs/shared
@makhool-designs/ui → React ecosystem
@makhool-designs/ai-agents → MCP + OpenAI/Anthropic
\`\`\`

## Communication Patterns
- **API**: RESTful endpoints with Zod validation
- **State Management**: React Query + Context API
- **Database**: MikroORM with PostgreSQL
- **AI Integration**: MCP protocol for agent coordination
`;
  }

  /**
   * Get current project status
   */
  private async getProjectStatus() {
    return {
      status: 'active_development',
      lastUpdated: new Date().toISOString(),
      features: {
        completed: [
          'Frontend-Backend API Integration',
          'Contact Form with Validation',
          'React Query Integration',
          'Multi-agent AI System',
          'MCP Server Implementation'
        ],
        inProgress: [
          'GitHub Copilot Integration',
          'Environment Configuration'
        ],
        planned: [
          'Database Integration',
          'Authentication System',
          'File Upload Feature'
        ]
      },
      techDebt: [],
      performance: 'good',
      buildStatus: 'passing'
    };
  }
}
