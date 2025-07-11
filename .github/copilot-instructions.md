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
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, React Router, React Query, Axios
- **Backend**: NestJS, TypeScript, MikroORM, PostgreSQL, Zod validation, Swagger docs
- **Monorepo**: Rush.js with PNPM workspaces
- **Database**: PostgreSQL with MikroORM
- **Infrastructure**: Docker, Docker Compose
- **Email**: Nodemailer for contact form functionality
- **API Communication**: RESTful APIs with React Query for state management

## Development Guidelines

### Code Style
- Use TypeScript for all code
- Follow functional programming patterns where appropriate
- Use Zod for schema validation
- Implement proper error handling with HTTP problem details
- Use consistent naming conventions (camelCase for variables, PascalCase for types)

### Architecture Patterns
- **Frontend**: Use React hooks, React Query for server state, context for global state, and component composition
- **Backend**: Use dependency injection, decorators, and modular architecture
- **Shared**: Export common types, utilities, and constants for reuse across packages
- **Database**: Use entities, repositories, and migrations for data management
- **API Integration**: Use custom hooks with React Query for API communication

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

### Workspace Setup
- Use the provided VS Code workspace file (`MakhoolDesignsV2.code-workspace`)
- Database connection configured for PostgreSQL on localhost:5432
- Rush commands should be run from the workspace root
- Each package has its own TypeScript configuration that extends workspace settings

### Development Environment
- Docker Compose provides PostgreSQL database (container: makhool-designs-db)
- Environment variables defined in `.env.example` - copy to `.env` for local development
- Workspace includes SQL Tools connection for database management
- File nesting enabled in VS Code for cleaner project structure

## Migration Context

This project is a conversion from a static HTML website to a modern full-stack application. The original site included:
- Static pages: Home, About, Projects, Reviews, Contact
- Contact form functionality
- Dark/light theme toggle
- Responsive design
- Performance optimizations

When implementing new features, consider maintaining the existing user experience while adding modern functionality.

## Current Project Status

### ✅ Completed Features
- **Frontend-Backend API Integration**: Full communication between React frontend and NestJS backend
- **Contact Form**: Working contact form with validation using shared Zod schemas
- **API Client**: Centralized Axios client with interceptors for error handling and request/response transformation
- **React Query Integration**: Custom hooks for API calls with caching, error handling, and loading states
- **Routing**: React Router setup with navigation between pages (Home, About, Projects, Reviews, Contact)
- **Theme System**: Dark/light mode toggle with proper styling
- **TypeScript Configuration**: Strict TypeScript setup across all packages with proper type sharing
- **Development Environment**: Both frontend (Vite) and backend (NestJS) servers running with hot reload
- **API Documentation**: Swagger/OpenAPI documentation available at `/api/docs`
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Form Validation**: Client-side and server-side validation using shared Zod schemas

### 🔧 Current Architecture
- **Frontend**: React 19 + TypeScript + Vite + React Query + Axios + TailwindCSS
- **Backend**: NestJS + TypeScript + Swagger + CORS enabled + Global validation
- **API Communication**: RESTful endpoints with proper error responses
- **State Management**: React Query for server state, React Context for global UI state
- **Type Safety**: Shared TypeScript types across frontend and backend
- **Development Workflow**: Rush.js for monorepo management with unified build/dev commands

### 🚀 Ready for Development
- **Database Integration**: MikroORM setup ready for PostgreSQL connection
- **Additional API Endpoints**: Projects and Reviews controllers scaffolded
- **Authentication**: Ready to implement JWT-based auth
- **File Uploads**: Infrastructure in place for file handling
- **Email Service**: Nodemailer configured (needs SMTP credentials)
- **Testing**: Test infrastructure ready for unit and e2e tests

## Common Commands

```bash
# Install dependencies
rush install

# Update dependencies
rush update

# Build all packages
rush build

# Start development environment (all servers)
rush start

# Start database only
rush db:up

# Stop database
rush db:down

# Run tests
rush test

# Lint code
rush lint

# Format code
rush format

# Database commands (from backend package)
cd packages/backend
npm run migration:create
npm run migration:up
npm run migration:down
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

## Package-Specific Guidelines

### Web Package (@makhool-designs/web)
- Use React functional components with hooks
- Implement dark/light theme context
- Create reusable UI components in `src/components`
- Use React Router for navigation
- Follow mobile-first responsive design
- Import shared types and utilities from `@makhool-designs/shared`
- Use React Query hooks for API communication (`useSubmitContact`, `useProjects`, etc.)
- Implement proper error handling with custom hooks (`useApiError`, `useToast`)
- Use Axios for HTTP client with centralized API configuration

### Backend Package (@makhool-designs/backend)
- Use NestJS decorators and dependency injection
- Create DTOs with class-validator decorators
- Implement Swagger documentation for all endpoints
- Use Zod schemas from shared package for validation
- Handle errors with proper HTTP status codes
- Implement rate limiting and security middleware

### Shared Package (@makhool-designs/shared)
- Export types, interfaces, and enums
- Provide utility functions used across packages
- Define application constants
- Create Zod validation schemas
- Maintain backward compatibility when making changes

### Database Package (@makhool-designs/database)
- Use MikroORM entities with decorators
- Create migrations for schema changes
- Define relationships between entities
- Use repositories for data access patterns
- Keep database logic separate from business logic

## Development Patterns

### API Integration Pattern
When creating new API endpoints, follow this pattern:

1. **Backend (NestJS)**:
   ```typescript
   // 1. Define shared types in @makhool-designs/shared
   export const ExampleSchema = z.object({
     field: z.string(),
   });
   export type ExampleData = z.infer<typeof ExampleSchema>;

   // 2. Create controller
   @Controller('api/examples')
   export class ExampleController {
     @Post()
     @ApiOperation({ summary: 'Create example' })
     async create(@Body() data: ExampleData) {
       return this.exampleService.create(data);
     }
   }

   // 3. Create service
   @Injectable()
   export class ExampleService {
     async create(data: ExampleData) {
       // Business logic here
     }
   }
   ```

2. **Frontend (React + React Query)**:
   ```typescript
   // 1. Add API client method
   export const exampleApi = {
     create: async (data: ExampleData) => {
       const response = await apiClient.post('/api/examples', data);
       return response.data;
     },
   };

   // 2. Create custom hook
   export const useCreateExample = () => {
     return useMutation({
       mutationFn: (data: ExampleData) => exampleApi.create(data),
       onSuccess: () => {
         // Handle success
       },
     });
   };

   // 3. Use in component
   const CreateExampleForm = () => {
     const createExample = useCreateExample();
     // Component logic
   };
   ```

### Error Handling Pattern
- Backend: Use HTTP status codes and structured error responses
- Frontend: Use `useApiError` hook for consistent error handling
- Shared: Define error types in shared package for type safety

### Form Validation Pattern
- Define Zod schemas in shared package
- Use schemas for both frontend validation and backend validation
- Implement proper error display with field-specific messages
