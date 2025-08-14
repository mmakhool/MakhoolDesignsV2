# Copilot Instructions for MakhoolDesigns

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Rush.js monorepo for MakhoolDesigns, a family-owned design and development business. The project consists of multiple packages that work together to create a modern web application with full-stack capabilities.

## Architecture

### Packages
- **@makhool-designs/web** - React 19 frontend with TypeScript, built with Vite 6.0.0
- **@makhool-designs/backend** - NestJS 11.0.1 API server with TypeScript
- **@makhool-designs/shared** - Shared types, utilities, constants, and Zod validation schemas
- **@makhool-designs/database** - Database schemas and migrations with MikroORM 6.1.12
- **@makhool-designs/ui** - Shared UI components library with Tailwind CSS, class-variance-authority, and utility functions

### Tech Stack
- **Frontend**: React 19, TypeScript 5.8.3, Vite 6.0.0, TailwindCSS, React Router 7, TanStack Query v5, Axios
- **Backend**: NestJS 11.0.1, TypeScript 5.8.3, MikroORM 6.1.12, PostgreSQL, Zod validation, Swagger/OpenAPI docs
- **Monorepo**: Rush.js 5.155.1 with PNPM 8.15.8 workspaces
- **Database**: PostgreSQL 15 with MikroORM, UUID primary keys, proper indexing
- **Infrastructure**: Docker Compose for development database
- **Email**: Nodemailer for contact form functionality
- **API Communication**: RESTful APIs with TanStack Query for state management
- **Development**: ESLint, Prettier, hot reload for both frontend and backend, all lint issues resolved
- **UI Components**: Shared component library with proper utility functions (`cn`) and Tailwind CSS integration

## Development Guidelines

### Code Style
- Use TypeScript strict mode for all code
- Follow functional programming patterns where appropriate
- Use Zod for schema validation (shared across frontend/backend)
- Implement proper error handling with HTTP problem details
- Use consistent naming conventions (camelCase for variables, PascalCase for types)
- Configure ESLint with type-checking and Prettier integration
- Line endings: LF (handled by Prettier configuration)

### Architecture Patterns
- **Frontend**: Use React hooks, TanStack Query for server state, React Context for global UI state, component composition, lazy loading
- **Backend**: Use dependency injection, decorators, modular architecture, proper HTTP status codes
- **Shared**: Export common types, utilities, constants, and Zod schemas for reuse across packages
- **Database**: Use entities with MikroORM, repositories, migrations, UUID primary keys, proper indexing
- **API Integration**: Use custom hooks with TanStack Query for API communication, Axios interceptors

### Package Dependencies
- Shared package should be referenced as `@makhool-designs/shared` using `workspace:*`
- Backend can depend on shared and database packages
- Frontend can depend on shared and ui packages
- Database can depend on shared package for types
- UI package exports reusable components with Tailwind CSS

### API Design
- Use RESTful endpoints with proper HTTP methods
- Implement proper error responses using structured error format
- Use Zod schemas from shared package for request/response validation
- Include proper TypeScript types for all API interfaces
- Document all endpoints with Swagger/OpenAPI decorators
- Enable CORS for cross-origin requests

### Component Structure
- Create reusable UI components in the ui package
- Use proper prop interfaces with TypeScript
- Implement responsive design with mobile-first approach
- Support dark/light theme switching with Tailwind CSS dark mode
- Use CSS custom properties for theming in ui package
- Implement proper loading states and error boundaries

### Database Schema
- **ContactSubmission**: Contact form submissions with email, subject, message
- **Project**: Portfolio projects with title, description, images, tags, categories
- **Review**: Client reviews with rating, content, client info
- **BlogPost**: Blog posts with title, content, tags, publishing status
- All entities use UUID primary keys and proper timestamps
- Indexed fields for performance (email, category, status, etc.)
- Foreign key constraints properly configured

### Workspace Setup
- Use the provided VS Code workspace file (`MakhoolDesignsV2.code-workspace`)
- Database connection configured for PostgreSQL on localhost:5432
- Rush commands should be run from the workspace root
- Each package has its own TypeScript configuration that extends workspace settings
- File nesting enabled in VS Code for cleaner project structure
- SQL Tools connection configured for database management

### Environment Configuration
- Development: Uses environment variables with fallback defaults
- Database: PostgreSQL credentials (postgres/dbadmin on localhost:5432)
- API Base URL: http://localhost:3001 for development
- Frontend dev server: http://localhost:5173
- Environment variables managed through .env files
- Docker Compose provides PostgreSQL database container

## Current Project Status

### ✅ Fully Implemented Features
- **Frontend-Backend API Integration**: Complete communication between React frontend and NestJS backend
- **Contact Form**: Working contact form with validation using shared Zod schemas and email sending
- **API Client**: Centralized Axios client with interceptors for error handling and request/response transformation
- **TanStack Query Integration**: Custom hooks for API calls with caching, error handling, loading states
- **Routing**: React Router setup with lazy loading and nested routing (public, auth, user, admin routes)
- **Theme System**: Dark/light mode toggle with Tailwind CSS dark mode and CSS custom properties
- **TypeScript Configuration**: Strict TypeScript setup across all packages with proper type sharing
- **Development Environment**: Both frontend (Vite) and backend (NestJS) servers running with hot reload
- **API Documentation**: Swagger/OpenAPI documentation available at `/api/docs`
- **Error Handling**: Comprehensive error handling with structured responses
- **Form Validation**: Client-side and server-side validation using shared Zod schemas
- **Database Setup**: MikroORM with PostgreSQL, entities defined, migrations working
- **Authentication System**: Complete JWT-based authentication with registration, login, logout, and profile management
- **Session Management**: Database-backed sessions with UserSession entity, token validation, and automatic cleanup
- **Task Scheduling**: NestJS Schedule module with automated session cleanup tasks (hourly and frequent intervals)
- **User Management**: Role-based access control with User and Role entities, admin/user permissions
- **Navigation Integration**: Proper logout navigation returning users to home page
- **Monorepo Management**: Rush.js properly configured with PNPM workspaces

### 🔧 Current Architecture Details
- **Frontend**: React 19 + TypeScript + Vite + TanStack Query + Axios + TailwindCSS + React Router
- **Backend**: NestJS + TypeScript + MikroORM + Swagger + CORS enabled + Global validation
- **API Communication**: RESTful endpoints with proper error responses and HTTP status codes
- **State Management**: TanStack Query for server state, React Context for global UI state
- **Type Safety**: Shared TypeScript types and Zod schemas across frontend and backend
- **Development Workflow**: Rush.js for monorepo management with unified build/dev commands
- **UI System**: Shared UI components with Tailwind CSS, dark mode support, responsive design

### 🚀 Ready for Further Development
- **Session Management**: Complete database-backed session management with UserSession entity, automatic cleanup, and security features
- **Task Scheduling**: NestJS Schedule module integrated with cron jobs for automated maintenance tasks
- **Additional API Endpoints**: Projects and Reviews controllers scaffolded (Projects implemented, Reviews needs implementation)
- **Authentication**: Full JWT-based authentication with session validation and logout navigation
- **Admin System**: Admin routes and components scaffolded, permission system ready
- **File Uploads**: Infrastructure in place for file handling
- **Email Service**: Nodemailer configured and working (needs production SMTP credentials)
- **Testing**: Test infrastructure ready for unit and e2e tests
- **Production Deployment**: Configuration ready for production environment

### 📊 Database Entities
1. **ContactSubmission**: id (UUID), name, email, subject, message, createdAt, updatedAt
2. **Project**: id (UUID), title, description, imageUrl, tags[], category (enum), featured, dates
3. **Review**: id (UUID), clientName, clientCompany, content, rating, avatarUrl, dates
4. **BlogPost**: id (UUID), title, content, excerpt, tags[], published, authorId, dates
5. **User**: id (UUID), email, username, password (hashed), firstName, lastName, role, isActive, dates
6. **Role**: id (UUID), name (sysadmin, sysmanager, user), description, permissions, dates
7. **UserSession**: id (UUID), userId, accessToken (hashed), refreshToken (hashed), expiresAt, isActive, userAgent, ipAddress, dates

## Authentication & Session Management

### Authentication Flow
1. **Registration**: New users register with email, username, password, and optional profile information
2. **Login**: Users authenticate with email/username and password, receive JWT tokens
3. **Session Creation**: Each login creates a UserSession record with hashed access/refresh tokens
4. **Token Validation**: JwtAuthGuard validates tokens against active sessions in database
5. **Logout**: Invalidates session in database and navigates user to home page
6. **Session Cleanup**: Automated cleanup of expired sessions via NestJS Schedule

### UserSession Entity
- **Purpose**: Database-backed session tracking with enhanced security
- **Fields**: UUID primary key, user relationship, hashed tokens, expiry dates, metadata (IP, user agent)
- **Security**: Access tokens are hashed before storage, indexed for fast lookups
- **Lifecycle**: Created on login, validated on requests, invalidated on logout, auto-cleaned when expired

### Task Service & Automated Cleanup
- **Implementation**: NestJS Schedule module with cron decorators (`@Cron`)
- **Hourly Cleanup**: `@Cron(CronExpression.EVERY_HOUR)` - removes expired sessions every hour
- **Frequent Cleanup**: `@Cron('0,30 * * * *')` - checks every 30 minutes during high activity
- **Manual Triggers**: API endpoints for admin-triggered session cleanup via TasksController
- **Monitoring**: Comprehensive logging and status endpoints for task monitoring

### Authentication API Endpoints
- **POST /api/auth/register** - User registration with role assignment
- **POST /api/auth/login** - User authentication with session creation
- **POST /api/auth/logout** - Session invalidation and cleanup
- **GET /api/auth/profile** - Get current user profile (JWT protected)
- **POST /api/auth/refresh** - Refresh expired access tokens
- **POST /api/tasks/cleanup/sessions** - Manual session cleanup (admin only)
- **GET /api/tasks/status** - Task service status and schedule information

## Task Management System

### TasksService Features
- **Automated Cleanup**: Uses `@nestjs/schedule` with cron expressions for reliable scheduling
- **Error Handling**: Comprehensive error logging and graceful failure handling
- **Manual Triggers**: API endpoints for administrative control over cleanup tasks
- **Status Monitoring**: Real-time status reporting for scheduled tasks
- **Scalability**: Designed for production environments with proper resource management

### Cron Schedule Patterns
- **Hourly**: `CronExpression.EVERY_HOUR` (0 * * * *) - Main cleanup cycle
- **Frequent**: `0,30 * * * *` - Every 30 minutes for high-activity periods
- **Custom**: Easily extensible for additional maintenance tasks

### Security & Performance
- **Database Indexing**: Optimized queries for session lookups and cleanup
- **Token Hashing**: All tokens hashed before database storage
- **Rate Limiting**: Ready for implementation on authentication endpoints
- **Audit Trail**: Comprehensive logging of authentication events
- **Memory Management**: Efficient cleanup prevents database bloat

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

# Start individual servers
cd packages/web && rushx dev        # Frontend dev server
cd packages/backend && rushx dev    # Backend dev server

# Database management
rush db:up                          # Start PostgreSQL container
rush db:down                        # Stop PostgreSQL container

# Code quality
rush lint                           # Run ESLint on all packages
rush format                         # Run Prettier on all packages
rush test                           # Run tests (when implemented)

# Database operations (from backend package)
cd packages/backend
npm run migration:create            # Create new migration
npm run migration:up               # Run pending migrations
npm run migration:down             # Rollback last migration
```

## Best Practices

1. **TypeScript**: Always use strict mode, proper type definitions, avoid `any`
2. **React**: Use functional components with hooks, implement proper error boundaries
3. **API**: Use environment variables for configuration, implement proper logging
4. **Security**: Follow security best practices for API endpoints, validate all inputs
5. **Performance**: Implement proper caching strategies, lazy loading, code splitting
6. **Development**: Use semantic versioning, proper commit messages, code reviews
7. **Database**: Use migrations for schema changes, proper indexing, foreign key constraints
8. **Error Handling**: Structured error responses, user-friendly messages, proper logging

## Package-Specific Guidelines

### Web Package (@makhool-designs/web)
- Use React functional components with hooks
- Implement theme context with dark/light mode
- Create reusable UI components using ui package components
- Use React Router with lazy loading for pages
- Follow mobile-first responsive design with Tailwind CSS
- Import shared types and utilities from `@makhool-designs/shared`
- Use TanStack Query hooks for API communication (`useSubmitContact`, `useProjects`)
- Implement proper error handling and loading states
- Use Axios client with centralized API configuration

### Backend Package (@makhool-designs/backend)
- Use NestJS decorators and dependency injection
- Create DTOs with Zod schemas from shared package
- Implement Swagger documentation for all endpoints
- Use proper HTTP status codes and structured error responses
- Implement rate limiting and security middleware
- Use MikroORM entities and repositories for database operations
- Handle environment variables with proper fallbacks

### Shared Package (@makhool-designs/shared)
- Export TypeScript types, interfaces, and enums
- Provide utility functions used across packages
- Define application constants and configuration
- Create Zod validation schemas for API contracts
- Maintain backward compatibility when making changes
- Export API response types and error interfaces

### Database Package (@makhool-designs/database)
- Use MikroORM entities with proper decorators
- Create migrations for all schema changes
- Define relationships between entities with proper constraints
- Use UUID primary keys for all entities
- Implement proper indexing for performance
- Keep database configuration centralized

### UI Package (@makhool-designs/ui)
- Create reusable UI components with TypeScript
- Use Tailwind CSS with design system approach
- Support dark/light themes with CSS custom properties
- Export components with proper prop interfaces
- Implement responsive design patterns
- Provide consistent styling and animations

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
     @ApiResponse({ status: 201, description: 'Example created' })
     async create(@Body() data: ExampleData) {
       return this.exampleService.create(data);
     }
   }

   // 3. Create service
   @Injectable()
   export class ExampleService {
     async create(data: ExampleData) {
       // Business logic with MikroORM
     }
   }
   ```

2. **Frontend (React + TanStack Query)**:
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
         // Handle success, invalidate queries
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
- **Backend**: Use structured error responses with proper HTTP status codes
- **Frontend**: Use TanStack Query error handling with user-friendly messages
- **Shared**: Define error types and interfaces in shared package for type safety
- **Logging**: Implement proper error logging for debugging and monitoring

### Theme Implementation Pattern
- Use Tailwind CSS `dark:` prefix for dark mode styles
- Implement theme toggle in navigation components
- Store theme preference in localStorage
- Use CSS custom properties for complex color schemes in ui package
- Support system theme preference detection

### Form Validation Pattern
- Define Zod schemas in shared package for API contracts
- Use schemas for both frontend and backend validation
- Implement proper error display with field-specific messages
- Handle loading and success states consistently
- Use controlled components with proper state management

### Database Migration Pattern
- Create migrations for all schema changes
- Use descriptive migration names with timestamps
- Test migrations in development before production
- Implement proper rollback procedures
- Document breaking changes in migration comments

## Business Context

### MakhoolDesigns Services
- **Web Development**: Full-stack web applications, e-commerce platforms
- **Mobile Development**: Cross-platform mobile applications
- **Design Services**: UI/UX design, branding, visual design
- **Consulting**: Technical consulting, architecture planning
- **3D Printing**: Custom 3D printing services and solutions

### Project Categories
- Web Development (featured: e-commerce platforms, management systems)
- Mobile Development (fitness apps, business applications)
- Design (branding, UI/UX projects)
- Consulting (technical architecture, planning)
- 3D Printing (custom prints, prototypes)

### Contact Information
- Business Email: info@makhooldesigns.com
- Phone: +1 (555) 123-4567
- Website: https://makhooldesigns.com
- Social Media: Twitter, LinkedIn, GitHub, Instagram

## Migration Context

This project represents a conversion from a static HTML website to a modern full-stack application. The original site included:
- Static pages: Home, About, Projects, Reviews, Contact
- Contact form functionality
- Dark/light theme toggle
- Responsive design
- Performance optimizations

When implementing new features, maintain the existing user experience while adding modern functionality such as:
- Dynamic content management
- User authentication and profiles
- Admin dashboard for content management
- API-driven data presentation
- Enhanced interactivity and real-time updates

## Deployment and Production

### Environment Variables
- **Development**: Defaults provided for local development
- **Production**: Secure credentials and production URLs required
- **Database**: PostgreSQL connection settings
- **Email**: SMTP configuration for contact form
- **API**: Base URLs and service endpoints

### Performance Considerations
- Lazy loading for route components
- TanStack Query caching for API responses
- Image optimization for project galleries
- Database indexing for query performance
- CDN setup for static assets

### Security Measures
- Input validation with Zod schemas
- SQL injection prevention with MikroORM
- CORS configuration for API access
- Rate limiting for API endpoints
- Environment variable protection
- Authentication and authorization (ready for implementation)

This comprehensive guide should help you understand the MakhoolDesigns codebase architecture, development patterns, and business context for effective AI-assisted development.
