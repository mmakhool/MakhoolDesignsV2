import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'contact_submissions' })
export class ContactSubmission {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

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

  constructor(name: string, email: string, subject: string, message: string) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }
}
