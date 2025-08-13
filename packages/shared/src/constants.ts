// Application constants

export const APP_NAME = 'MakhoolDesigns';
export const APP_DESCRIPTION = 'Professional web development and design services';
export const APP_URL = 'https://makhooldesigns.com';

// Contact information
export const CONTACT_EMAIL = 'info@makhooldesigns.com';
export const CONTACT_PHONE = '+1 (555) 123-4567';

// Navigation items
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

// Theme constants
export const THEME_STORAGE_KEY = 'theme-preference';
export const DEFAULT_THEME = 'dark';

// API endpoints
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.makhooldesigns.com' 
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  PROJECTS: '/api/projects',
  REVIEWS: '/api/reviews',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Validation
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 254;
export const MESSAGE_MAX_LENGTH = 2000;

// File upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Social media
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/makhooldesigns',
  LINKEDIN: 'https://linkedin.com/company/makhooldesigns',
  GITHUB: 'https://github.com/makhooldesigns',
  INSTAGRAM: 'https://instagram.com/makhooldesigns',
} as const;

// Project categories
export const PROJECT_CATEGORIES = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  DESIGN: 'Design',
  CONSULTING: 'Consulting',
  THREE_D_PRINTING: '3D Printing',
} as const;

// Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
