export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface Axolotary {
  id: string;
  name: string;
  description: string;
  userId: string;
  ponds: Pond[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Pond {
  id: string;
  name: string;
  capacity: number;
  temperature: number;
  axolotaryId: string;
  axolotls: Axolotl[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Axolotl {
  id: string;
  axolotaryId: string;
  pondId: string;
  code: string;
  name: string;
  gender: 'male' | 'female' | 'unknown';
  species: string;
  birthDate: Date;
  originZone: string;
  healthStatus: 'healthy' | 'sick' | 'critical' | 'treatment';
  lastHealthCheck: Date;
  notes: string;
  isActive: boolean;
  createdDate: Date;
  lastUpdatedDate: Date;
}

export interface Alert {
  id: string;
  type: 'health' | 'feeding' | 'maintenance' | 'reproduction';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
  userId: string;
  relationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReproductionEvent {
  id: string;
  axolotaryId: string;
  fatherAxolotlId: string;
  motherAxolotlId: string;
  scheduledDate: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  result: string;
  offspringSuccessCount: number;
  offspringFailedCount: number;
  notes: string;
  isActive: boolean;
  createdDate: Date;
  lastUpdatedDate: Date;
}

export interface MedicalIntervention {
  id: string;
  axolotlId: string;
  type: string;
  description: string;
  veterinarian: string;
  date: Date;
  result: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistic {
  id: string;
  type: string;
  value: number;
  unit: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly';
  userId: string;
  createdAt: Date;
}

export interface CreateAxolotlData {
  axolotaryId: string;
  pondId: string;
  code: string;
  name: string;
  gender: 'male' | 'female' | 'unknown';
  species: string;
  birthDate: Date;
  originZone: string;
  healthStatus: 'healthy' | 'sick' | 'critical' | 'treatment';
  notes?: string;
}

export interface UpdateAxolotlData extends Partial<CreateAxolotlData> {
  id: string;
  lastHealthCheck?: Date;
}

export interface CreateReproductionEventData {
  axolotaryId: string;
  fatherAxolotlId: string;
  motherAxolotlId: string;
  scheduledDate: Date;
  status: ReproductionEvent['status'];
  notes?: string;
}

export interface UpdateReproductionEventData extends Partial<Omit<CreateReproductionEventData, 'axolotaryId'>> {
  id: string;
  result?: string;
  offspringSuccessCount?: number;
  offspringFailedCount?: number;
}
