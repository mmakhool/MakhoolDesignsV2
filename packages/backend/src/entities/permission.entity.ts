import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'permissions' })
export class Permission {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Index()
  @Property({ type: 'varchar', length: 100, unique: true })
  name!: string; // e.g., 'admin:all', 'users:manage', 'users:read', 'roles:manage'

  @Property({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Index()
  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}