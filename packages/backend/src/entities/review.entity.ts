import { Entity, PrimaryKey, Property, Index, Check } from '@mikro-orm/core';

@Entity({ tableName: 'reviews' })
export class Review {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

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
  @Property({ type: 'int' })
  @Check({ expression: 'rating >= 1 AND rating <= 5' })
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

  constructor(name: string, rating: number, comment: string) {
    this.name = name;
    this.rating = rating;
    this.comment = comment;
  }
}
