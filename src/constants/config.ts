export const APP_CONFIG = {
  APP_NAME: 'React Base',
  APP_VERSION: '1.0.0',
  DEFAULT_LOCALE: 'en',
  SUPPORTED_LOCALES: ['en', 'vi'],
  API_TIMEOUT: 30000,
  TOAST_DURATION: 3000,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
  THEME: {
    DEFAULT: 'light',
    SUPPORTED: ['light', 'dark', 'system'],
  },
} as const 