import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export enum RoleType {
  SYSADMIN = 'sysadmin',
  SYSMANAGER = 'sysmanager',
  USER = 'user'
}

@Entity({ tableName: 'roles' })
export class Role {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Index()
  @Enum({ items: () => RoleType, type: 'string' })
  name!: RoleType;

  @Property({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Index()
  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  constructor(name: RoleType, description?: string) {
    this.name = name;
    this.description = description;
  }
}
