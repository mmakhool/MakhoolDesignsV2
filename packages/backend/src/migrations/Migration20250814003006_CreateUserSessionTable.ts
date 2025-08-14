import { Migration } from '@mikro-orm/migrations';

export class Migration20250814003006_CreateUserSessionTable extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user_sessions" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "access_token" varchar(500) not null, "refresh_token" varchar(500) null, "user_id" uuid not null, "expires_at" timestamptz not null, "ip_address" varchar(255) null, "user_agent" varchar(500) null, "is_active" boolean not null default true, "last_activity_at" timestamptz null, constraint "user_sessions_pkey" primary key ("id"));`
    );
    this.addSql(
      `create index "user_sessions_access_token_index" on "user_sessions" ("access_token");`
    );
    this.addSql(
      `alter table "user_sessions" add constraint "user_sessions_access_token_unique" unique ("access_token");`
    );
    this.addSql(
      `create index "user_sessions_is_active_index" on "user_sessions" ("is_active");`
    );

    this.addSql(
      `alter table "user_sessions" add constraint "user_sessions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_sessions" cascade;`);
  }
}
