import { Entity, PrimaryKey, Property, Index, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'blog_posts' })
export class BlogPost {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'timestamptz' })
  @Index()
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: 'varchar', length: 255 })
  @Index()
  title!: string;

  @Property({ type: 'varchar', length: 255 })
  @Index()
  @Unique()
  slug!: string;

  @Property({ type: 'text', nullable: true })
  excerpt?: string;

  @Property({ type: 'text' })
  content!: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  featuredImage?: string;

  @Property({ type: 'jsonb', nullable: true })
  tags?: string[];

  @Property({ type: 'boolean', default: false })
  @Index()
  isPublished: boolean = false;

  @Property({ type: 'timestamptz', nullable: true })
  publishedAt?: Date;

  @Property({ type: 'varchar', length: 255, nullable: true })
  metaTitle?: string;

  @Property({ type: 'text', nullable: true })
  metaDescription?: string;
}
