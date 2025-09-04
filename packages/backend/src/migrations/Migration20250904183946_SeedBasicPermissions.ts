import { Migration } from '@mikro-orm/migrations';

export class Migration20250904183946_SeedBasicPermissions extends Migration {

  override async up(): Promise<void> {
    // Insert basic permissions
    this.addSql(`
      INSERT INTO permissions (name, description, is_active, created_at, updated_at) VALUES
        ('admin:all', 'Full system access with all permissions', true, NOW(), NOW()),
        ('users:manage', 'Can manage users - create, update, delete', true, NOW(), NOW()),
        ('users:view', 'Can view user information', true, NOW(), NOW()),
        ('roles:manage', 'Can manage roles and permissions', true, NOW(), NOW()),
        ('content:edit', 'Can edit and manage content', true, NOW(), NOW()),
        ('content:view', 'Can view content', true, NOW(), NOW()),
        ('projects:manage', 'Can manage projects', true, NOW(), NOW()),
        ('profile:edit', 'Can edit own profile', true, NOW(), NOW())
      ON CONFLICT (name) DO NOTHING;
    `);
  }

  override async down(): Promise<void> {
    this.addSql(`select 1`);
  }

}
