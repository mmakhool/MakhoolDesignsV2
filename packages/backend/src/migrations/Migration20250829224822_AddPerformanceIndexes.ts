import { Migration } from '@mikro-orm/migrations';

export class Migration20250829224822_AddPerformanceIndexes extends Migration {

  override async up(): Promise<void> {
    // Add indexes for frequently queried columns
    this.addSql(`CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "users_username_idx" ON "users" ("username");`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "users_role_id_idx" ON "users" ("role_id");`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "users_is_active_idx" ON "users" ("is_active");`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "user_sessions_user_id_idx" ON "user_sessions" ("user_id");`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "user_sessions_access_token_idx" ON "user_sessions" ("access_token");`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "user_sessions_is_active_expires_idx" ON "user_sessions" ("is_active", "expires_at");`);
  }

  override async down(): Promise<void> {
    // Remove indexes
    this.addSql(`DROP INDEX IF EXISTS "users_email_idx";`);
    this.addSql(`DROP INDEX IF EXISTS "users_username_idx";`);
    this.addSql(`DROP INDEX IF EXISTS "users_role_id_idx";`);
    this.addSql(`DROP INDEX IF EXISTS "users_is_active_idx";`);
    this.addSql(`DROP INDEX IF EXISTS "user_sessions_user_id_idx";`);
    this.addSql(`DROP INDEX IF EXISTS "user_sessions_access_token_idx";`);
    this.addSql(`DROP INDEX IF EXISTS "user_sessions_is_active_expires_idx";`);
  }

}
