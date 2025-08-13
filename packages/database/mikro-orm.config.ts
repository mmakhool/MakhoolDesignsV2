import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  // Database connection
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'dbadmin',
  dbName: process.env.DATABASE_NAME || 'makhool_designs',
  
  // Entity discovery - entities are in the backend package
  entities: ['../backend/src/entities/*.entity.ts'],
  entitiesTs: ['../backend/src/entities/*.entity.ts'],
  
  // Migration settings - migrations are in the backend package
  migrations: {
    path: '../backend/src/migrations',
    pathTs: '../backend/src/migrations',
    glob: '!(*.d).{js,ts}',
    tableName: 'mikro_orm_migrations',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts',
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
    ignoreSchema: [],
  },
  
  // Naming strategy
  namingStrategy: UnderscoreNamingStrategy,
  
  // Connection pool
  pool: {
    min: 2,
    max: 10,
  },
  
  // Timezone settings
  timezone: 'UTC',
  
  // Serialization
  serialization: {
    includePrimaryKeys: true,
  },
});
