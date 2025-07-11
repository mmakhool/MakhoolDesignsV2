# Copilot Instructions for MakhoolDesigns

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Rush.js monorepo for MakhoolDesigns, a family-owned design and development business. The project consists of multiple packages that work together to create a modern web application.

## Architecture

### Packages
- **@makhool-designs/web** - React frontend with TypeScript, built with Vite
- **@makhool-designs/backend** - NestJS API server with TypeScript
- **@makhool-designs/shared** - Shared types, utilities, and constants
- **@makhool-designs/database** - Database schemas and migrations with MikroORM

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS
- **Backend**: NestJS, TypeScript, MikroORM, PostgreSQL
- **Monorepo**: Rush.js with PNPM workspaces
- **Database**: PostgreSQL with MikroORM
- **Infrastructure**: Docker, Docker Compose

## Development Guidelines

### Code Style
- Use TypeScript for all code
- Follow functional programming patterns where appropriate
- Use Zod for schema validation
- Implement proper error handling with HTTP problem details
- Use consistent naming conventions (camelCase for variables, PascalCase for types)

### Architecture Patterns
- **Frontend**: Use React hooks, context for global state, and component composition
- **Backend**: Use dependency injection, decorators, and modular architecture
- **Shared**: Export common types, utilities, and constants for reuse across packages
- **Database**: Use entities, repositories, and migrations for data management

### Package Dependencies
- Shared package should be referenced as `@makhool-designs/shared` using `workspace:*`
- Backend can depend on shared and database packages
- Frontend can depend on shared package
- Database can depend on shared package for types

### API Design
- Use RESTful endpoints with proper HTTP methods
- Implement proper error responses using HTTP problem details
- Use Zod schemas for request/response validation
- Include proper TypeScript types for all API interfaces

### Component Structure
- Create reusable UI components in the frontend
- Use proper prop types and interfaces
- Implement responsive design with mobile-first approach
- Support dark/light theme switching

## Migration Context

This project is a conversion from a static HTML website to a modern full-stack application. The original site included:
- Static pages: Home, About, Projects, Reviews, Contact
- Contact form functionality
- Dark/light theme toggle
- Responsive design
- Performance optimizations

When implementing new features, consider maintaining the existing user experience while adding modern functionality.

## Common Commands

```bash
# Install dependencies
rush install

# Build all packages
rush build

# Start development servers
rush start

# Run tests
rush test

# Update dependencies
rush update
```

## Best Practices

1. Always use TypeScript strict mode
2. Implement proper error boundaries in React
3. Use environment variables for configuration
4. Implement proper logging and monitoring
5. Follow security best practices for API endpoints
6. Use proper validation for all user inputs
7. Implement proper caching strategies
8. Use semantic versioning for package releases
