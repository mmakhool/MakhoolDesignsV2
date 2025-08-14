import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@Entity({ tableName: 'user_sessions' })
export class UserSession {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Index()
  @Property({ type: 'varchar', length: 500, unique: true })
  accessToken!: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  refreshToken?: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: 'timestamptz' })
  expiresAt!: Date;

  @Property({ type: 'varchar', length: 255, nullable: true })
  ipAddress?: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  userAgent?: string;

  @Index()
  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Property({ type: 'timestamptz', nullable: true })
  lastActivityAt?: Date;

  constructor(user: User, accessToken: string, expiresAt: Date) {
    this.user = user;
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
    this.lastActivityAt = new Date();
  }
}
