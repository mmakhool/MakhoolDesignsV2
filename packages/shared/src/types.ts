import { z } from 'zod';

// Contact form schema
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

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
  imageUrl: string;
  tags: string[];
  category: ProjectCategory;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_DEVELOPMENT = 'mobile-development',
  DESIGN = 'design',
  CONSULTING = 'consulting',
  THREE_D_PRINTING = '3d-printing',
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
