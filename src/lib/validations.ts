import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Onboarding schema
export const onboardingSchema = z.object({
  experience: z.enum(['beginner', 'intermediate', 'expert']),
  objectives: z.array(z.string()).min(1, 'Selecciona al menos un objetivo'),
  firstAxolotary: z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().optional(),
  }),
});

// Axolotl schemas
export const axolotlSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.string().min(1, 'La especie es requerida'),
  age: z.number().min(0, 'La edad debe ser positiva'),
  gender: z.enum(['male', 'female', 'unknown']),
  pondId: z.string().min(1, 'Selecciona un estanque'),
  healthStatus: z.string().default('healthy'),
});

// Pond schema
export const pondSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  capacity: z.number().min(1, 'La capacidad debe ser mayor a 0'),
  temperature: z.number().min(0).max(30, 'Temperatura fuera de rango'),
  axolotaryId: z.string().min(1, 'Selecciona un ajolotario'),
});

// Axolotary schema
export const axolotarySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
});

// Alert schema
export const alertSchema = z.object({
  type: z.enum(['health', 'feeding', 'maintenance', 'reproduction']),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  relationId: z.string().optional(),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
    language: z.string(),
  }).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
export type AxolotlFormData = z.infer<typeof axolotlSchema>;
export type PondFormData = z.infer<typeof pondSchema>;
export type AxolotaryFormData = z.infer<typeof axolotarySchema>;
export type AlertFormData = z.infer<typeof alertSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
