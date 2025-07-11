import { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import path from 'path';

/**
 * MikroORM configuration for the database package
 */
export const createDatabaseConfig = (options: Partial<Options> = {}): Options => {
  return {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    dbName: process.env.DATABASE_NAME || 'makhool_designs',
    
    // Entity discovery
    entities: [path.join(__dirname, './entities.ts')],
    entitiesTs: [path.join(__dirname, './entities.ts')],
    
    // Extensions
    extensions: [Migrator],
    
    // Development settings
    debug: process.env.NODE_ENV !== 'production',
    allowGlobalContext: true,
    
    // Connection pool
    pool: {
      min: 2,
      max: 10,
    },
    
    // Timezone settings
    timezone: 'UTC',
    
    // Merge with provided options
    ...options,
  };
};

/**
 * Default database configuration
 */
export const databaseConfig = createDatabaseConfig();
