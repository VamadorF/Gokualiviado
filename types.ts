export enum PainLocation {
  // Cabeza
  HEAD_FOREHEAD = 'Frente',
  HEAD_EYE = 'Región ocular',
  HEAD_NOSE = 'Región nasal',
  HEAD_JAW = 'Región maxilar/mandibular',
  HEAD_CRANIAL = 'Región craneal',
  
  // Cuello
  NECK_ANTERIOR = 'Cuello anterior',
  NECK_POSTERIOR = 'Cuello posterior (nuca)',
  
  // Hombros
  SHOULDER_RIGHT = 'Hombro derecho',
  SHOULDER_LEFT = 'Hombro izquierdo',
  
  // Región torácica (tronco superior)
  CHEST_ANTERIOR = 'Pecho anterior',
  CHEST_SIDES = 'Costados del tórax',
  BACK_UPPER = 'Espalda alta (zona escapular)',
  
  // Región abdominal (tronco medio)
  ABDOMEN_UPPER = 'Abdomen superior',
  ABDOMEN_LOWER = 'Abdomen inferior',
  ABDOMEN_LATERAL = 'Lateral abdominal',
  
  // Región lumbar (tronco inferior)
  BACK_LOWER = 'Zona lumbar',
  SACRUM = 'Sacro',
  
  // Cintura pélvica / caderas
  HIP_RIGHT = 'Cadera derecha',
  HIP_LEFT = 'Cadera izquierda',
  GROIN_RIGHT = 'Ingle derecha',
  GROIN_LEFT = 'Ingle izquierda',
  BUTTOCK_RIGHT = 'Glúteo derecho',
  BUTTOCK_LEFT = 'Glúteo izquierdo',
  
  // Extremidad superior
  ARM_UPPER_ANTERIOR_RIGHT = 'Brazo superior anterior derecho',
  ARM_UPPER_ANTERIOR_LEFT = 'Brazo superior anterior izquierdo',
  ARM_UPPER_POSTERIOR_RIGHT = 'Brazo superior posterior derecho',
  ARM_UPPER_POSTERIOR_LEFT = 'Brazo superior posterior izquierdo',
  ELBOW_RIGHT = 'Codo derecho',
  ELBOW_LEFT = 'Codo izquierdo',
  FOREARM_ANTERIOR_RIGHT = 'Antebrazo anterior derecho',
  FOREARM_ANTERIOR_LEFT = 'Antebrazo anterior izquierdo',
  FOREARM_POSTERIOR_RIGHT = 'Antebrazo posterior derecho',
  FOREARM_POSTERIOR_LEFT = 'Antebrazo posterior izquierdo',
  WRIST_RIGHT = 'Muñeca derecha',
  WRIST_LEFT = 'Muñeca izquierda',
  HAND_RIGHT = 'Mano derecha',
  HAND_LEFT = 'Mano izquierda',
  FINGERS_RIGHT = 'Dedos de la mano derecha',
  FINGERS_LEFT = 'Dedos de la mano izquierda',
  
  // Extremidad inferior
  THIGH_ANTERIOR_RIGHT = 'Muslo anterior derecho',
  THIGH_ANTERIOR_LEFT = 'Muslo anterior izquierdo',
  THIGH_POSTERIOR_RIGHT = 'Muslo posterior derecho',
  THIGH_POSTERIOR_LEFT = 'Muslo posterior izquierdo',
  KNEE_RIGHT = 'Rodilla derecha',
  KNEE_LEFT = 'Rodilla izquierda',
  CALF_RIGHT = 'Pantorrilla derecha',
  CALF_LEFT = 'Pantorrilla izquierda',
  SHIN_RIGHT = 'Espinilla derecha',
  SHIN_LEFT = 'Espinilla izquierda',
  ANKLE_RIGHT = 'Tobillo derecho',
  ANKLE_LEFT = 'Tobillo izquierdo',
  FOOT_RIGHT = 'Pie derecho',
  FOOT_LEFT = 'Pie izquierdo',
  TOES_RIGHT = 'Dedos del pie derecho',
  TOES_LEFT = 'Dedos del pie izquierdo',
  
  // Línea media posterior
  MIDLINE_CERVICAL = 'Cervical posterior',
  MIDLINE_THORACIC = 'Torácica posterior',
  MIDLINE_LUMBAR = 'Lumbar posterior',
  MIDLINE_SACRAL = 'Sacra media'
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

