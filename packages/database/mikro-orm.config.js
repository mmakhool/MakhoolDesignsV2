"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const migrations_1 = require("@mikro-orm/migrations");
const postgresql_1 = require("@mikro-orm/postgresql");
exports.default = (0, postgresql_1.defineConfig)({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    dbName: process.env.DATABASE_NAME || 'makhool_designs',
    entities: ['../backend/src/entities/*.entity.ts'],
    entitiesTs: ['../backend/src/entities/*.entity.ts'],
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
    extensions: [migrations_1.Migrator],
    debug: process.env.NODE_ENV !== 'production',
    allowGlobalContext: true,
    schemaGenerator: {
        disableForeignKeys: false,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
    namingStrategy: core_1.UnderscoreNamingStrategy,
    pool: {
        min: 2,
        max: 10,
    },
    timezone: 'UTC',
    serialization: {
        includePrimaryKeys: true,
    },
});
//# sourceMappingURL=mikro-orm.config.js.map