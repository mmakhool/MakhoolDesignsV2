# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Rush Commands
```bash
# Install all dependencies across packages
rush install

# Build all packages (builds dependencies first)  
rush build

# Start all development servers concurrently
rush start

# Database management
rush db:up      # Start PostgreSQL container
rush db:down    # Stop PostgreSQL container

# Testing and quality
rush test       # Run tests across all packages
rush lint       # Lint all packages  
rush format     # Format code across all packages

# Port cleanup
rush kill-ports # Clean up development server ports
```

### Package-Level Commands
```bash
# Backend development (from packages/backend/)
npm run dev:backend    # Start API server only
npm run typecheck      # TypeScript type checking
npm run test:e2e       # End-to-end tests

# Frontend development (from packages/web/)  
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build

# Database operations (from packages/backend/)
npm run mikro-orm migration:create <name>
npm run mikro-orm migration:up
npm run mikro-orm migration:down
```

## Architecture Overview

### Monorepo Structure
This is a Rush.js monorepo with 6 packages following a domain-driven design:

- **@makhool-designs/web** - React 19 frontend (Vite + TypeScript)
- **@makhool-designs/backend** - NestJS API server  
- **@makhool-designs/shared** - Common types, Zod schemas, utilities
- **@makhool-designs/database** - MikroORM entities and migrations
- **@makhool-designs/ui** - Reusable UI components (TailwindCSS)
- **@makhool-designs/ai-agents** - AI-powered development agents

### Key Architectural Patterns

#### API Integration Pattern
- **Shared Schemas**: Zod schemas in `@makhool-designs/shared` used for both frontend validation and backend API validation
- **Type Safety**: Full TypeScript coverage with shared types between frontend and backend
- **React Query**: All API calls use React Query with custom hooks (`useSubmitContact`, `useUsersApi`, etc.)
- **Axios Client**: Centralized API client with interceptors for error handling

#### Authentication & Authorization  
- **JWT-based Authentication**: NestJS Passport with JWT tokens
- **Role-based Access Control**: Users have roles (admin, user) enforced by guards
- **Session Management**: User sessions tracked in database
- **Route Protection**: Frontend routes protected by `RequireAuth` component

#### Database Architecture
- **MikroORM**: PostgreSQL with TypeScript entities and migrations
- **Entity Relationships**: User → UserSession, User → Role (many-to-many), ContactSubmission, Project, Review entities
- **Migration-First**: All schema changes managed through migrations

### Development Patterns

#### Frontend Architecture (packages/web/)
- **React Query State Management**: Server state with React Query, global UI state with React Context
- **Component Organization**: Pages in `src/pages/`, reusable components in `src/components/`, hooks in `src/hooks/`
- **Routing**: React Router with nested admin routes and role-based access
- **API Integration**: Custom hooks wrap React Query for type-safe API calls
- **Theme System**: Dark/light mode with TailwindCSS and context provider

#### Backend Architecture (packages/backend/)  
- **NestJS Modules**: Feature modules (auth, users, contact, projects) with controllers, services, and DTOs
- **Dependency Injection**: Services injected into controllers, MikroORM repositories injected into services
- **Validation**: Zod schemas from shared package integrated with NestJS validation pipes
- **Swagger Documentation**: Auto-generated API docs at `/api/docs`
- **Security**: CORS, rate limiting, JWT guards, bcryptjs password hashing

#### Package Dependencies
- **Workspace References**: All internal dependencies use `workspace:*` syntax
- **Build Order**: Rush builds packages in dependency order (shared → database/ui → backend/web)
- **Type Sharing**: Common interfaces and types exported from `@makhool-designs/shared`

## Development Workflow

### Initial Setup
1. `rush install` - Install all dependencies
2. `rush db:up` - Start PostgreSQL container  
3. `rush build` - Build all packages
4. `rush start` - Start development servers (API on :3001, Web on :5173)

### Making Changes
1. **Shared Types**: Add new types/schemas to `packages/shared/src/`
2. **Backend APIs**: Create controllers/services in `packages/backend/src/`
3. **Frontend**: Consume APIs via React Query hooks in `packages/web/src/hooks/`
4. **Database**: Create migrations with `mikro-orm migration:create`

### Environment Configuration
- **Database**: PostgreSQL connection configured via Docker Compose
- **Environment Variables**: Copy `.env.example` to `.env` for local development
- **Ports**: API (3001), Web (5173), Database (5432)

### Testing Strategy
- **Unit Tests**: Jest for backend services and frontend utilities
- **E2E Tests**: Jest for API endpoints  
- **Type Checking**: `rush typecheck` or individual `npm run typecheck`
- **Linting**: ESLint configured for each package with shared rules

## AI Agent Integration

The `@makhool-designs/ai-agents` package provides specialized AI agents for development tasks:
- **Backend Agent**: NestJS and database operations
- **Frontend Agent**: React and TypeScript frontend development  
- **UI/UX Agent**: Component design and user experience
- **Testing Agent**: Test creation and quality assurance
- **Project Manager Agent**: Task coordination and planning

Run `rush start` to launch the MCP server alongside development servers.