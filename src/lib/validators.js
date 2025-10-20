import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
  username: z.string().min(1, 'שם משתמש נדרש'),
  password: z.string().min(1, 'סיסמה נדרשת'),
});

// Greeting form schema
export const greetingSchema = z.object({
  fromName: z
    .string()
    .min(2, 'שם חייב להכיל לפחות 2 תווים')
    .max(50, 'שם ארוך מדי'),
  message: z
    .string()
    .min(1, 'הודעה נדרשת')
    .max(500, 'ההודעה ארוכה מדי (מקסימום 500 תווים)'),
  mediaUrl: z.string().url().optional().or(z.literal('')),
});

// File validation
export const validateFile = (file) => {
  const maxSizeMB = parseInt(import.meta.env.VITE_MAX_UPLOAD_MB || '20');
  const allowedTypes = (import.meta.env.VITE_ALLOWED_MIME || 'image/jpeg,image/png,video/mp4').split(',');

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `הקובץ גדול מדי. מקסימום ${maxSizeMB}MB`,
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'סוג קובץ לא נתמך. אפשר רק תמונות ווידאו',
    };
  }

  return { valid: true, error: null };
};

// Email validation (if needed)
export const isValidEmail = (email) => {
  return z.string().email().safeParse(email).success;
};

// URL validation
export const isValidUrl = (url) => {
  return z.string().url().safeParse(url).success;
};

export default {
  loginSchema,
  greetingSchema,
  validateFile,
  isValidEmail,
  isValidUrl,
};

