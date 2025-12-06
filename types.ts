export enum PainLocation {
  HEAD = 'Cabeza',
  NECK = 'Cuello',
  CHEST = 'Pecho',
  ABDOMEN = 'Abdomen',
  BACK_UPPER = 'Espalda Alta',
  BACK_LOWER = 'Espalda Baja',
  ARMS = 'Brazos',
  LEGS = 'Piernas',
  JOINTS = 'Articulaciones'
}

export enum PainQuality {
  PUNZANTE = 'Punzante',
  QUEMANTE = 'Quemante',
  ELECTRICO = 'Eléctrico',
  OPRESIVO = 'Opresivo',
  PULSATIL = 'Pulsátil',
  SORDO = 'Sordo',
  CONSTANTE = 'Constante'
}

export enum RecommendationLevel {
  SELF_CARE = 'Autocuidado',
  CONSULT = 'Consultar CESFAM',
  URGENT = 'Urgencia SAPU/SAR',
  EMERGENCY = 'Emergencia Vital'
}

export interface PainEntry {
  id: string;
  date: Date;
  locations: PainLocation[];
  intensity: number; // 0-10
  quality: PainQuality[];
  duration: string;
  impact: {
    physical: number;
    work: number;
    sleep: number;
  };
  emotional: {
    phq2: number;
    gad2: number;
  };
  medicationTaken: boolean;
  medicationRelief?: number;
  notes?: string;
  recommendation?: RecommendationLevel;
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string; // e.g., "Cada 8 horas"
  nextDose: Date;
  stock: number;
  type: 'pilla' | 'jarabe' | 'inyeccion' | 'topico';
}

export type ViewState = 
  | 'AUTH_LOGIN' 
  | 'AUTH_REGISTER' 
  | 'HOME' 
  | 'MEDICATIONS' 
  | 'HISTORY' 
  | 'PROFILE'
  | 'PAIN_FLOW_START'
  | 'PAIN_FLOW_LOC'
  | 'PAIN_FLOW_INT'
  | 'PAIN_FLOW_QUAL'
  | 'PAIN_FLOW_DUR'
  | 'PAIN_FLOW_IMP'
  | 'PAIN_FLOW_EMO'
  | 'PAIN_FLOW_MED'
  | 'PAIN_FLOW_REC';

