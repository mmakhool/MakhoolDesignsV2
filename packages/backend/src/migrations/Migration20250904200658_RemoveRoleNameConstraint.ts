import { Migration } from '@mikro-orm/migrations';

export class Migration20250904200658_RemoveRoleNameConstraint extends Migration {

  override async up(): Promise<void> {
    // Drop the constraint that's preventing role creation
    this.addSql(`ALTER TABLE roles DROP CONSTRAINT IF EXISTS roles_name_check;`);
  }

  override async down(): Promise<void> {
    this.addSql(`select 1`);
  }

}
