const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const API_BASE_URL = rawApiUrl.replace(/\/$/, "");
