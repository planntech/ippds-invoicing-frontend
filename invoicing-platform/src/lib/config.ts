export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  appName: import.meta.env.VITE_APP_NAME || 'Invoicing Platform',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
