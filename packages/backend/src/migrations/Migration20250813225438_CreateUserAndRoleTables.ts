import { Migration } from '@mikro-orm/migrations';

export class Migration20250813225438_CreateUserAndRoleTables extends Migration {
  override async up(): Promise<void> {
    // Create roles table
    this.addSql(
      `create table "roles" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in ('sysadmin', 'sysmanager', 'user')) not null, "description" varchar(500) null, "is_active" boolean not null default true, constraint "roles_pkey" primary key ("id"));`
    );
    this.addSql(`create index "roles_name_index" on "roles" ("name");`);
    this.addSql(
      `create index "roles_is_active_index" on "roles" ("is_active");`
    );

    // Create users table
    this.addSql(
      `create table "users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(100) not null, "password" varchar(255) null, "is_active" boolean not null default true, "last_login_at" timestamptz null, "profile_picture_url" varchar(255) null, "role_id" uuid not null, "email_verified" boolean not null default false, "email_verified_at" timestamptz null, constraint "users_pkey" primary key ("id"));`
    );
    this.addSql(
      `create index "users_first_name_index" on "users" ("first_name");`
    );
    this.addSql(
      `create index "users_last_name_index" on "users" ("last_name");`
    );
    this.addSql(`create index "users_email_index" on "users" ("email");`);
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`
    );
    this.addSql(`create index "users_username_index" on "users" ("username");`);
    this.addSql(
      `alter table "users" add constraint "users_username_unique" unique ("username");`
    );
    this.addSql(
      `create index "users_is_active_index" on "users" ("is_active");`
    );
    this.addSql(
      `create index "users_email_verified_index" on "users" ("email_verified");`
    );

    // Add foreign key constraint
    this.addSql(
      `alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;`
    );

    // Add index for existing blog_posts table
    this.addSql(
      `create index "blog_posts_created_at_index" on "blog_posts" ("created_at");`
    );

    // Seed data: Insert default roles
    const now = new Date().toISOString();
    const sysadminId = '550e8400-e29b-41d4-a716-446655440001';
    const sysmanagerId = '550e8400-e29b-41d4-a716-446655440002';
    const userId = '550e8400-e29b-41d4-a716-446655440003';

    this.addSql(`
      INSERT INTO "roles" ("id", "created_at", "updated_at", "name", "description", "is_active") VALUES
      ('${sysadminId}', '${now}', '${now}', 'sysadmin', 'System Administrator with full access to all features and settings', true),
      ('${sysmanagerId}', '${now}', '${now}', 'sysmanager', 'System Manager with administrative access to manage users and content', true),
      ('${userId}', '${now}', '${now}', 'user', 'Regular user with basic access to the system', true);
    `);

    // Seed data: Insert initial user (Mick Makhool)
    const initialUserId = '550e8400-e29b-41d4-a716-446655440004';
    this.addSql(`
      INSERT INTO "users" ("id", "created_at", "updated_at", "first_name", "last_name", "email", "username", "role_id", "is_active", "email_verified") VALUES
      ('${initialUserId}', '${now}', '${now}', 'Mick', 'Makhool', 'mmakhool6@gmail.com', 'mmakhool', '${sysadminId}', true, true);
    `);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_role_id_foreign";`);

    this.addSql(`drop table if exists "roles" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop index "blog_posts_created_at_index";`);
  }
}
