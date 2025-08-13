import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Index()
  @Property({ type: 'varchar', length: 255 })
  firstName!: string;

  @Index()
  @Property({ type: 'varchar', length: 255 })
  lastName!: string;

  @Unique()
  @Index()
  @Property({ type: 'varchar', length: 255 })
  email!: string;

  @Unique()
  @Index()
  @Property({ type: 'varchar', length: 100 })
  username!: string;

  @Property({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Index()
  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Property({ type: 'timestamptz', nullable: true })
  lastLoginAt?: Date;

  @Property({ type: 'varchar', length: 255, nullable: true })
  profilePictureUrl?: string;

  @ManyToOne(() => Role, { eager: true })
  role!: Role;

  @Index()
  @Property({ type: 'boolean', default: false })
  emailVerified: boolean = false;

  @Property({ type: 'timestamptz', nullable: true })
  emailVerifiedAt?: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    role: Role
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.role = role;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
