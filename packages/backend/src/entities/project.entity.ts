import { Entity, PrimaryKey, Property, Index, Enum } from '@mikro-orm/core';

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_DEVELOPMENT = 'mobile-development',
  DESIGN = 'design',
  CONSULTING = 'consulting',
  THREE_D_PRINTING = '3d-printing',
}

@Entity({ tableName: 'projects' })
export class Project {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Index()
  @Property({ type: 'varchar', length: 255 })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  imageUrl?: string;

  @Property({ type: 'jsonb', nullable: true })
  tags?: string[];

  @Property({ type: 'jsonb', nullable: true })
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

  constructor(title: string, description: string, category: ProjectCategory) {
    this.title = title;
    this.description = description;
    this.category = category;
  }
}
