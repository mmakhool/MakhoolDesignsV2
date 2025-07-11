import { BaseEntity, Entity, PrimaryKey, Property, Index, Unique, Enum } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_DEVELOPMENT = 'mobile-development',
  DESIGN = 'design',
  CONSULTING = 'consulting',
  THREE_D_PRINTING = '3d-printing',
}

/**
 * Base entity with common fields
 */
@Entity({ abstract: true })
export abstract class BaseEntityWithTimestamps extends BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

/**
 * Blog post entity
 */
@Entity({ tableName: 'blog_posts' })
export class BlogPost extends BaseEntityWithTimestamps {
  @Index()
  @Property({ type: 'varchar', length: 255 })
  title!: string;

  @Index()
  @Unique()
  @Property({ type: 'varchar', length: 255 })
  slug!: string;

  @Property({ type: 'text', nullable: true })
  excerpt?: string;

  @Property({ type: 'text' })
  content!: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  featuredImage?: string;

  @Property({ type: 'json', nullable: true })
  tags?: string[];

  @Index()
  @Property({ type: 'boolean', default: false })
  isPublished: boolean = false;

  @Property({ type: 'timestamptz', nullable: true })
  publishedAt?: Date;

  @Property({ type: 'varchar', length: 255, nullable: true })
  metaTitle?: string;

  @Property({ type: 'text', nullable: true })
  metaDescription?: string;
}

/**
 * Contact submission entity
 */
@Entity({ tableName: 'contact_submissions' })
export class ContactSubmission extends BaseEntityWithTimestamps {
  @Index()
  @Property({ type: 'varchar', length: 255 })
  name!: string;

  @Index()
  @Property({ type: 'varchar', length: 255 })
  email!: string;

  @Property({ type: 'varchar', length: 500 })
  subject!: string;

  @Property({ type: 'text' })
  message!: string;

  @Index()
  @Property({ type: 'boolean', default: false })
  isRead: boolean = false;

  @Index()
  @Property({ type: 'boolean', default: false })
  isReplied: boolean = false;
}

/**
 * Project entity
 */
@Entity({ tableName: 'projects' })
export class Project extends BaseEntityWithTimestamps {
  @Index()
  @Property({ type: 'varchar', length: 255 })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  imageUrl?: string;

  @Property({ type: 'json', nullable: true })
  tags?: string[];

  @Property({ type: 'json', nullable: true })
  images?: string[];

  @Index()
  @Enum(() => ProjectCategory)
  category!: ProjectCategory;

  @Index()
  @Property({ type: 'boolean', default: false })
  featured: boolean = false;

  @Index()
  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Property({ type: 'varchar', length: 1000, nullable: true })
  projectUrl?: string;

  @Property({ type: 'varchar', length: 1000, nullable: true })
  githubUrl?: string;

  @Property({ type: 'text', nullable: true })
  technologies?: string;

  @Property({ type: 'date', nullable: true })
  completedAt?: Date;
}

/**
 * Review entity
 */
@Entity({ tableName: 'reviews' })
export class Review extends BaseEntityWithTimestamps {
  @Index()
  @Property({ type: 'varchar', length: 255 })
  name!: string;

  @Property({ type: 'varchar', length: 255, nullable: true })
  company?: string;

  @Property({ type: 'varchar', length: 255, nullable: true })
  position?: string;

  @Property({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Index()
  @Property({ type: 'integer', check: 'rating >= 1 AND rating <= 5' })
  rating!: number;

  @Property({ type: 'text' })
  comment!: string;

  @Index()
  @Property({ type: 'boolean', default: false })
  featured: boolean = false;

  @Index()
  @Property({ type: 'boolean', default: false })
  isApproved: boolean = false;

  @Property({ type: 'varchar', length: 500, nullable: true })
  avatarUrl?: string;
}
