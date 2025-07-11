# MakhoolDesigns - Modern Web Application

A modern full-stack web application for MakhoolDesigns, built with a Rush.js monorepo architecture.

## Architecture

This project is organized as a monorepo with the following packages:

- **@makhool-designs/web** - React frontend with TypeScript and Vite
- **@makhool-designs/backend** - NestJS API server with TypeScript
- **@makhool-designs/shared** - Shared types, utilities, and constants
- **@makhool-designs/database** - Database schemas and migrations with MikroORM

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, React Router
- **Backend**: NestJS, TypeScript, Zod validation, Swagger documentation
- **Database**: PostgreSQL with MikroORM
- **Monorepo**: Rush.js with PNPM workspaces
- **Infrastructure**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18.20.3+ or 20.11.0+
- PNPM (installed automatically by Rush)
- Docker and Docker Compose (for database)

### Installation

1. Install dependencies:
```bash
rush install
```

2. Build all packages:
```bash
rush build
```

3. Start the development environment:
```bash
rush start
```

### Development Commands

```bash
# Install dependencies
rush install

# Update dependencies
rush update

# Build all packages
rush build

# Start development servers
rush start

# Run tests
rush test

# Lint code
rush lint

# Format code
rush format
```

## Project Structure

```
├── packages/
│   ├── web/          # React frontend
│   ├── backend/      # NestJS API
│   ├── shared/       # Shared utilities
│   └── database/     # Database schemas
├── common/
│   ├── config/       # Rush configuration
│   └── scripts/      # Build scripts
└── rush.json         # Rush configuration
```

## Migration from Static Site

This project represents a migration from a static HTML website to a modern full-stack application, maintaining the original design and functionality while adding:

- Dynamic content management
- Modern development workflow
- API-driven architecture
- TypeScript safety
- Component-based UI
- Dark mode support
- Responsive design

## Contributing

1. Follow the TypeScript strict mode guidelines
2. Use the shared package for common utilities
3. Write tests for new features
4. Follow the established code style
5. Update documentation as needed

## License

Private - All rights reserved to MakhoolDesigns
