import { Entity, Index, ManyToMany, Collection, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Permission } from './permission.entity';

// Keep the enum for backward compatibility, but allow string roles too
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
  @Property({ type: 'varchar', length: 100, unique: true })
  name!: string; // Changed from enum to string for flexibility

  @Property({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Index()
  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @ManyToMany(() => Permission, undefined, { 
    pivotTable: 'role_permissions',
    eager: true 
  })
  permissions = new Collection<Permission>(this);

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}

