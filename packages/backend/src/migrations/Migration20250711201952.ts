import { Migration } from '@mikro-orm/migrations';

export class Migration20250711201952 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "blog_posts" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "slug" varchar(255) not null, "excerpt" text null, "content" text not null, "featured_image" varchar(500) null, "tags" jsonb null, "is_published" boolean not null default false, "published_at" timestamptz null, "meta_title" varchar(255) null, "meta_description" text null, constraint "blog_posts_pkey" primary key ("id"));`);
    this.addSql(`create index "blog_posts_title_index" on "blog_posts" ("title");`);
    this.addSql(`create index "blog_posts_slug_index" on "blog_posts" ("slug");`);
    this.addSql(`alter table "blog_posts" add constraint "blog_posts_slug_unique" unique ("slug");`);
    this.addSql(`create index "blog_posts_is_published_index" on "blog_posts" ("is_published");`);

    this.addSql(`create table "contact_submissions" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "subject" varchar(500) not null, "message" text not null, "is_read" boolean not null default false, "is_replied" boolean not null default false, constraint "contact_submissions_pkey" primary key ("id"));`);
    this.addSql(`create index "contact_submissions_name_index" on "contact_submissions" ("name");`);
    this.addSql(`create index "contact_submissions_email_index" on "contact_submissions" ("email");`);
    this.addSql(`create index "contact_submissions_is_read_index" on "contact_submissions" ("is_read");`);
    this.addSql(`create index "contact_submissions_is_replied_index" on "contact_submissions" ("is_replied");`);

    this.addSql(`create table "projects" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" text not null, "image_url" varchar(500) null, "tags" jsonb null, "images" jsonb null, "category" text check ("category" in ('web-development', 'mobile-development', 'design', 'consulting', '3d-printing')) not null, "featured" boolean not null default false, "is_active" boolean not null default true, "project_url" varchar(1000) null, "github_url" varchar(1000) null, "technologies" text null, "completed_at" date null, constraint "projects_pkey" primary key ("id"));`);
    this.addSql(`create index "projects_title_index" on "projects" ("title");`);
    this.addSql(`create index "projects_category_index" on "projects" ("category");`);
    this.addSql(`create index "projects_featured_index" on "projects" ("featured");`);
    this.addSql(`create index "projects_is_active_index" on "projects" ("is_active");`);

    this.addSql(`create table "reviews" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "company" varchar(255) null, "position" varchar(255) null, "email" varchar(255) null, "rating" int not null, "comment" text not null, "featured" boolean not null default false, "is_approved" boolean not null default false, "avatar_url" varchar(500) null, constraint "reviews_pkey" primary key ("id"), constraint reviews_rating_check check (rating >= 1 AND rating <= 5));`);
    this.addSql(`create index "reviews_name_index" on "reviews" ("name");`);
    this.addSql(`create index "reviews_rating_index" on "reviews" ("rating");`);
    this.addSql(`create index "reviews_featured_index" on "reviews" ("featured");`);
    this.addSql(`create index "reviews_is_approved_index" on "reviews" ("is_approved");`);
  }

}
