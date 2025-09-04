import { Migration } from '@mikro-orm/migrations';

export class Migration20250904182648_CreateMissingPermissionTables extends Migration {

  override async up(): Promise<void> {
    // Create permissions table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        name VARCHAR(100) NOT NULL UNIQUE,
        description VARCHAR(500),
        is_active BOOLEAN NOT NULL DEFAULT true
      );
    `);

    // Create role_permissions junction table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS role_permissions (
        role_id UUID NOT NULL,
        permission_id UUID NOT NULL,
        PRIMARY KEY (role_id, permission_id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
      );
    `);

    // Create indexes for better performance
    this.addSql(`
      CREATE INDEX IF NOT EXISTS idx_permissions_name ON permissions(name);
      CREATE INDEX IF NOT EXISTS idx_permissions_active ON permissions(is_active);
      CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
      CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);
    `);
  }

  override async down(): Promise<void> {
    this.addSql(`select 1`);
  }

}
