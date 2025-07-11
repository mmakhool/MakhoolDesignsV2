import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { BlogPost, ContactSubmission, Project, Review } from './entities/index';

export default defineConfig({
  // Database connection
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  user: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  dbName: process.env.DATABASE_NAME || 'makhool_designs',

  // Entity registration
  entities: [BlogPost, ContactSubmission, Project, Review],

  // Migration settings
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    tableName: 'mikro_orm_migrations',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts'
  },

  // Extensions
  extensions: [Migrator],

  // Development settings
  debug: process.env.NODE_ENV !== 'production',
  allowGlobalContext: true,

  // Schema settings
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: true,
    ignoreSchema: []
  },

  // Naming strategy
  namingStrategy: UnderscoreNamingStrategy,

  // Connection pool
  pool: {
    min: 2,
    max: 10
  },

  // Timezone settings
  timezone: 'UTC',

  // Serialization
  serialization: {
    includePrimaryKeys: true
  }
});
