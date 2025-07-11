import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogPost, ContactSubmission, Project, Review } from '../entities';

/**
 * Database module for MikroORM integration
 */
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // Database connection
        type: 'postgresql',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        user: configService.get('DATABASE_USERNAME', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'postgres'),
        dbName: configService.get('DATABASE_NAME', 'makhool_designs'),

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
          emit: 'ts',
        },

        // Development settings
        debug: process.env.NODE_ENV !== 'production',
        allowGlobalContext: true,

        // Schema settings
        schemaGenerator: {
          disableForeignKeys: false,
          createForeignKeyConstraints: true,
          ignoreSchema: [],
        },

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
      }),
      inject: [ConfigService],
    }),
    // Register entities for dependency injection
    MikroOrmModule.forFeature([BlogPost, ContactSubmission, Project, Review]),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
