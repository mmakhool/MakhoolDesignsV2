import { z } from 'zod';

// Contact form schema
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Authentication schemas
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;

// User management schemas
export const CreateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  roleId: z.string().uuid('Invalid role ID'),
  isActive: z.boolean().default(true).optional(),
});

export const UpdateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

// Role management schemas
export const CreateRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
  permissionNames: z.array(z.string()).min(1, 'At least one permission is required'),
});

export const UpdateRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required').optional(),
  description: z.string().optional(),
  permissionNames: z.array(z.string()).min(1, 'At least one permission is required').optional(),
});

export type CreateRoleData = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleData = z.infer<typeof UpdateRoleSchema>;

// Project types and enums
export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_DEVELOPMENT = 'mobile-development',
  DESIGN = 'design',
  CONSULTING = 'consulting',
  THREE_D_PRINTING = '3d-printing',
}

// Project management schemas
export const CreateProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  category: z.nativeEnum(ProjectCategory),
  featured: z.boolean().default(false).optional(),
  isActive: z.boolean().default(true).optional(),
  projectUrl: z.string().url('Invalid project URL').optional(),
  githubUrl: z.string().url('Invalid GitHub URL').optional(),
  technologies: z.string().optional(),
  completedAt: z.date().optional(),
});

export const UpdateProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  category: z.nativeEnum(ProjectCategory).optional(),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  projectUrl: z.string().url('Invalid project URL').optional(),
  githubUrl: z.string().url('Invalid GitHub URL').optional(),
  technologies: z.string().optional(),
  completedAt: z.date().optional(),
});

export type CreateProjectData = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectData = z.infer<typeof UpdateProjectSchema>;

// User and Role types
export enum RoleType {
  SYSADMIN = 'sysadmin',
  SYSMANAGER = 'sysmanager',
  USER = 'user',
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions?: Permission[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: Role;
  isActive?: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Common UI types
export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Theme types
export type Theme = 'light' | 'dark';

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  images?: string[];
  category: ProjectCategory;
  featured: boolean;
  isActive: boolean;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Review types
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  featured: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
