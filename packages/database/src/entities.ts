import { BaseEntity, Entity, Enum, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';
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

/**
 * AI Agent entity - Represents individual AI agents in the system
 */
@Entity({ tableName: 'ai_agents' })
export class AIAgent extends BaseEntityWithTimestamps {
  @Index()
  @Unique()
  @Property({ type: 'varchar', length: 100 })
  agentId!: string; // e.g., 'backend-agent', 'frontend-agent'

  @Property({ type: 'varchar', length: 255 })
  name!: string; // e.g., 'Backend Development Agent'

  @Enum(() => AgentRole)
  role!: AgentRole;

  @Property({ type: 'varchar', length: 100 })
  model!: string; // e.g., 'claude-3-5-sonnet-20241022'

  @Property({ type: 'text' })
  systemPrompt!: string;

  @Property({ type: 'json' })
  capabilities!: AgentCapability[];

  @Property({ type: 'integer', default: 8000 })
  maxTokens: number = 8000;

  @Property({ type: 'float', default: 0.3 })
  temperature: number = 0.3;

  @Index()
  @Property({ type: 'boolean', default: true })
  enabled: boolean = true;

  @Property({ type: 'json', nullable: true })
  configuration?: Record<string, any>;

  @Property({ type: 'json', nullable: true })
  metrics?: Record<string, any>;

  @Index()
  @Property({ type: 'timestamptz', nullable: true })
  lastActiveAt?: Date;
}

export enum AgentRole {
  DEVELOPER = 'developer',
  DESIGNER = 'designer', 
  TESTER = 'tester',
  MANAGER = 'manager',
  ANALYST = 'analyst',
}

export interface AgentCapability {
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
}

/**
 * AI Task entity - Represents tasks assigned to AI agents
 */
@Entity({ tableName: 'ai_tasks' })
export class AITask extends BaseEntityWithTimestamps {
  @Property({ type: 'varchar', length: 255 })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Enum(() => TaskType)
  type!: TaskType;

  @Enum(() => TaskPriority)
  priority!: TaskPriority;

  @Enum(() => TaskStatus)
  status!: TaskStatus;

  @Property({ type: 'varchar', length: 100, nullable: true })
  assignedAgentId?: string; // References AIAgent.agentId

  @Property({ type: 'json', nullable: true })
  requiredCapabilities?: string[];

  @Property({ type: 'json', nullable: true })
  context?: Record<string, any>;

  @Property({ type: 'json', nullable: true })
  files?: string[];

  @Property({ type: 'json', nullable: true })
  result?: Record<string, any>;

  @Property({ type: 'text', nullable: true })
  error?: string;

  @Property({ type: 'integer', nullable: true })
  duration?: number; // milliseconds

  @Property({ type: 'float', nullable: true })
  confidence?: number;

  @Index()
  @Property({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Index()
  @Property({ type: 'timestamptz', nullable: true })
  completedAt?: Date;
}

export enum TaskType {
  FEATURE_DEVELOPMENT = 'feature_development',
  BUG_FIX = 'bug_fix',
  CODE_REVIEW = 'code_review',
  DOCUMENTATION = 'documentation',
  TESTING = 'testing',
  REFACTORING = 'refactoring',
  ARCHITECTURE = 'architecture',
  UI_DESIGN = 'ui_design',
  FEATURE_PLANNING = 'feature_planning',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

/**
 * Agent Coordination entity - Represents multi-agent collaboration sessions
 */
@Entity({ tableName: 'agent_coordinations' })
export class AgentCoordination extends BaseEntityWithTimestamps {
  @Property({ type: 'varchar', length: 255 })
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Enum(() => CoordinationType)
  collaborationType!: CoordinationType;

  @Property({ type: 'json' })
  participatingAgents!: string[]; // Array of agent IDs

  @Property({ type: 'varchar', length: 100, nullable: true })
  primaryTaskId?: string; // References AITask.id

  @Property({ type: 'json', nullable: true })
  coordinationResults?: CoordinationResult[];

  @Enum(() => TaskStatus)
  status!: TaskStatus;

  @Index()
  @Property({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Index()
  @Property({ type: 'timestamptz', nullable: true })
  completedAt?: Date;
}

export enum CoordinationType {
  SEQUENTIAL = 'sequential',
  PARALLEL = 'parallel',
  REVIEW = 'review',
}

export interface CoordinationResult {
  agentId: string;
  result: any;
  success: boolean;
  role?: string;
  duration?: number;
}

/**
 * MCP Server Status entity - Tracks MCP server health and metrics
 */
@Entity({ tableName: 'mcp_server_status' })
export class MCPServerStatus extends BaseEntityWithTimestamps {
  @Index()
  @Property({ type: 'varchar', length: 100 })
  serverName!: string; // e.g., 'makhool-designs-agents'

  @Property({ type: 'varchar', length: 50 })
  version!: string;

  @Index()
  @Property({ type: 'boolean', default: true })
  isRunning: boolean = true;

  @Property({ type: 'json', nullable: true })
  capabilities?: Record<string, any>;

  @Property({ type: 'json', nullable: true })
  metrics?: Record<string, any>;

  @Property({ type: 'integer', default: 0 })
  activeConnections: number = 0;

  @Property({ type: 'integer', default: 0 })
  totalRequestsProcessed: number = 0;

  @Property({ type: 'integer', default: 0 })
  errorCount: number = 0;

  @Index()
  @Property({ type: 'timestamptz', nullable: true })
  lastHealthCheck?: Date;

  @Property({ type: 'json', nullable: true })
  configuration?: Record<string, any>;
}
