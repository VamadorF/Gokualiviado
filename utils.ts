import { PainEntry, Medication, PainLocation, PainQuality, RecommendationLevel } from './types';
import { format, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date) => {
  return format(date, "d 'de' MMMM", { locale: es });
};

export const formatTime = (date: Date) => {
  return format(date, "HH:mm");
};

export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Paracetamol',
    dose: '1g',
    frequency: 'Cada 8 horas',
    nextDose: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // in 2 hours
    stock: 12,
    type: 'pilla'
  },
  {
    id: '2',
    name: 'Pregabalina',
    dose: '75mg',
    frequency: 'Cada 12 horas',
    nextDose: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // in 6 hours
    stock: 28,
    type: 'pilla'
  },
  {
    id: '3',
    name: 'Tramadol',
    dose: '10 gotas',
    frequency: 'SOS',
    nextDose: new Date(),
    stock: 1,
    type: 'jarabe'
  }
];

export const mockHistory: PainEntry[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `mock-${i}`,
  date: subDays(new Date(), i),
  locations: i % 3 === 0 ? [PainLocation.HEAD_FOREHEAD] : [PainLocation.BACK_LOWER],
  intensity: Math.floor(Math.random() * 5) + 3, // Random 3-8
  quality: [PainQuality.PUNZANTE],
  duration: '2 horas',
  impact: { physical: 4, work: 3, sleep: 2 },
  emotional: { phq2: 1, gad2: 0 },
  medicationTaken: true,
  medicationRelief: 7,
  recommendation: RecommendationLevel.SELF_CARE
}));

export const calculateRecommendation = (intensity: number, impact: number): RecommendationLevel => {
  if (intensity >= 9 || impact > 25) return RecommendationLevel.URGENT;
  if (intensity >= 7) return RecommendationLevel.CONSULT;
  if (intensity >= 4) return RecommendationLevel.CONSULT;
  return RecommendationLevel.SELF_CARE;
};

