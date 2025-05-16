// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#FE6F61',
    BACKGROUND: {
      LIGHT: '#FBFBFB',
      DARK: '#212121',
    },
    SURFACE: {
      LIGHT: '#FFFFFF',
      DARK: '#2D2D2D',
    },
    BORDER: {
      LIGHT: '#E5E5E5',
      DARK: '#404040',
    },
    TEXT: {
      PRIMARY: {
        LIGHT: '#1A1A1A',
        DARK: '#FFFFFF',
      },
      SECONDARY: {
        LIGHT: '#6B7280',
        DARK: '#9CA3AF',
      },
    },
  },
} as const;

// Navigation menu items
export const NAVIGATION_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: 'Home',
  },
  {
    href: '/dashboard/mis-axolotls',
    label: 'Mis Axolotls',
    icon: 'Heart',
  },
  {
    href: '/dashboard/reproduccion',
    label: 'Reproducción',
    icon: 'Users',
  },
  {
    href: '/dashboard/alertas',
    label: 'Alertas',
    icon: 'AlertTriangle',
  },
  {
    href: '/dashboard/reportes',
    label: 'Reportes',
    icon: 'BarChart3',
  },
  {
    href: '/dashboard/estanques',
    label: 'Estanques',
    icon: 'Package',
  },
  {
    href: '/dashboard/ajolotarios',
    label: 'Ajolotarios',
    icon: 'Building2',
  },
  {
    href: '/dashboard/configuracion',
    label: 'Configuración',
    icon: 'Settings',
  },
  {
    href: '/dashboard/perfil',
    label: 'Perfil',
    icon: 'User',
  },
] as const;

// Alert types and severities
export const ALERT_TYPES = {
  HEALTH: 'health',
  FEEDING: 'feeding',
  MAINTENANCE: 'maintenance',
  REPRODUCTION: 'reproduction',
} as const;

export const ALERT_SEVERITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// Axolotl genders
export const AXOLOTL_GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  UNKNOWN: 'unknown',
} as const;

// Experience levels
export const EXPERIENCE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert',
} as const;

// Objectives
export const OBJECTIVES = {
  BREEDING: 'breeding',
  COLLECTING: 'collecting',
  RESEARCH: 'research',
  BUSINESS: 'business',
  HOBBY: 'hobby',
} as const;

// Reproduction event statuses
export const REPRODUCTION_STATUSES = {
  PLANNED: 'planned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
  },
  USER: {
    PROFILE: '/api/user/profile',
    ONBOARDING: '/api/user/onboarding',
  },
  AXOLOTARIES: '/api/axolotaries',
  AXOLOTLS: '/api/axolotls',
  PONDS: '/api/ponds',
  ALERTS: '/api/alerts',
  REPRODUCTION: '/api/reproduction',
  STATISTICS: '/api/statistics',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'salo-saas-theme',
  SIDEBAR: 'salo-saas-sidebar',
  USER_PREFERENCES: 'salo-saas-user-preferences',
} as const;

// Default values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  TEMPERATURE_RANGE: {
    MIN: 14,
    MAX: 20,
  },
  PH_RANGE: {
    MIN: 6.5,
    MAX: 8.0,
  },
} as const;
