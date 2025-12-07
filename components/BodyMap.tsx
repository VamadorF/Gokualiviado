'use client'

import React, { useState } from 'react';
import { PainLocation } from '../types';
import { cn } from './UI';
import { motion } from 'framer-motion';

interface BodyMapProps {
  selected: PainLocation[];
  onToggle: (loc: PainLocation) => void;
}

export const BodyMap: React.FC<BodyMapProps> = ({ selected, onToggle }) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const isSelected = (loc: PainLocation) => selected.includes(loc);

  const Path = ({ loc, d, className, labelX, labelY }: { 
    loc: PainLocation; 
    d: string; 
    className?: string;
    labelX?: number;
    labelY?: number;
  }) => (
    <g>
      <motion.path
        d={d}
        fill={isSelected(loc) ? '#0ea5e9' : '#e2e8f0'}
        className={cn("cursor-pointer stroke-white dark:stroke-slate-800 stroke-2 hover:opacity-80 transition-colors", className)}
        onClick={() => onToggle(loc)}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1, 
          fill: isSelected(loc) ? '#0ea5e9' : (document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0') 
        }}
      />
      {isSelected(loc) && labelX && labelY && (
        <text
          x={labelX}
          y={labelY}
          className="fill-primary-700 dark:fill-primary-300 text-xs font-bold pointer-events-none"
          textAnchor="middle"
        >
          ✓
        </text>
      )}
    </g>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        <button 
          onClick={() => setView('front')}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", view === 'front' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-white' : 'text-slate-400')}
        >
          Frontal
        </button>
        <button 
          onClick={() => setView('back')}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", view === 'back' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-white' : 'text-slate-400')}
        >
          Dorsal
        </button>
      </div>

      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
        <svg viewBox="0 0 200 450" className="w-full h-auto drop-shadow-xl">
          {view === 'front' ? (
            <>
              {/* CABEZA - Regiones */}
              <Path loc={PainLocation.HEAD_FOREHEAD} d="M70,45 Q100,15 130,45 Q130,65 100,75 Q70,65 70,45" labelX={100} labelY={55} />
              <Path loc={PainLocation.HEAD_EYE} d="M75,60 L95,60 L95,75 L75,75 Z M105,60 L125,60 L125,75 L105,75 Z" labelX={85} labelY={67} />
              <Path loc={PainLocation.HEAD_NOSE} d="M90,75 L110,75 L105,88 L95,88 Z" labelX={100} labelY={81} />
              <Path loc={PainLocation.HEAD_JAW} d="M75,88 L125,88 L125,95 L75,95 Z" labelX={100} labelY={91} />
              <Path loc={PainLocation.HEAD_CRANIAL} d="M75,35 Q100,10 125,35 Q125,45 100,50 Q75,45 75,35" labelX={100} labelY={40} />
              
              {/* CUELLO */}
              <Path loc={PainLocation.NECK_ANTERIOR} d="M85,95 L115,95 L115,110 L85,110 Z" labelX={100} labelY={102} />
              
              {/* HOMBROS */}
              <Path loc={PainLocation.SHOULDER_RIGHT} d="M50,110 Q60,115 65,125 Q60,130 50,125 Q45,120 50,110" labelX={52} labelY={117} />
              <Path loc={PainLocation.SHOULDER_LEFT} d="M135,110 Q145,115 150,125 Q145,130 135,125 Q130,120 135,110" labelX={148} labelY={117} />
              
              {/* REGIÓN TORÁCICA */}
              <Path loc={PainLocation.CHEST_ANTERIOR} d="M65,110 L135,110 L130,155 L70,155 Z" labelX={100} labelY={132} />
              <Path loc={PainLocation.CHEST_SIDES} d="M50,115 L65,115 L65,150 L50,150 Z M135,115 L150,115 L150,150 L135,150 Z" labelX={57} labelY={132} />
              
              {/* REGIÓN ABDOMINAL */}
              <Path loc={PainLocation.ABDOMEN_UPPER} d="M70,155 L130,155 L125,185 L75,185 Z" labelX={100} labelY={170} />
              <Path loc={PainLocation.ABDOMEN_LOWER} d="M75,185 L125,185 L120,210 L80,210 Z" labelX={100} labelY={197} />
              <Path loc={PainLocation.ABDOMEN_LATERAL} d="M50,155 L70,155 L75,205 L55,205 Z M130,155 L150,155 L145,205 L125,205 Z" labelX={57} labelY={180} />
              
              {/* INGLES */}
              <Path loc={PainLocation.GROIN_RIGHT} d="M75,210 L90,210 L88,225 L80,225 Z" labelX={82} labelY={217} />
              <Path loc={PainLocation.GROIN_LEFT} d="M110,210 L125,210 L120,225 L115,225 Z" labelX={118} labelY={217} />
              
              {/* EXTREMIDAD SUPERIOR DERECHA */}
              <Path loc={PainLocation.ARM_UPPER_ANTERIOR_RIGHT} d="M45,115 L55,115 L52,155 L45,155 Z" labelX={50} labelY={135} />
              <Path loc={PainLocation.ELBOW_RIGHT} d="M42,155 Q45,160 42,165 Q45,170 42,175" labelX={42} labelY={165} />
              <Path loc={PainLocation.FOREARM_ANTERIOR_RIGHT} d="M42,165 L52,165 L50,210 L42,210 Z" labelX={47} labelY={187} />
              <Path loc={PainLocation.WRIST_RIGHT} d="M40,210 Q42,215 40,220 Q42,225 40,230" labelX={40} labelY={220} />
              <Path loc={PainLocation.HAND_RIGHT} d="M35,220 L45,220 L43,235 L37,235 Z" labelX={40} labelY={227} />
              <Path loc={PainLocation.FINGERS_RIGHT} d="M35,230 L45,230 L44,245 L36,245 Z" labelX={40} labelY={237} />
              
              {/* EXTREMIDAD SUPERIOR IZQUIERDA */}
              <Path loc={PainLocation.ARM_UPPER_ANTERIOR_LEFT} d="M145,115 L155,115 L152,155 L145,155 Z" labelX={150} labelY={135} />
              <Path loc={PainLocation.ELBOW_LEFT} d="M158,155 Q155,160 158,165 Q155,170 158,175" labelX={158} labelY={165} />
              <Path loc={PainLocation.FOREARM_ANTERIOR_LEFT} d="M148,165 L158,165 L150,210 L148,210 Z" labelX={153} labelY={187} />
              <Path loc={PainLocation.WRIST_LEFT} d="M160,210 Q158,215 160,220 Q158,225 160,230" labelX={160} labelY={220} />
              <Path loc={PainLocation.HAND_LEFT} d="M155,220 L165,220 L163,235 L157,235 Z" labelX={160} labelY={227} />
              <Path loc={PainLocation.FINGERS_LEFT} d="M155,230 L165,230 L164,245 L156,245 Z" labelX={160} labelY={237} />
              
              {/* EXTREMIDAD INFERIOR DERECHA */}
              <Path loc={PainLocation.THIGH_ANTERIOR_RIGHT} d="M80,225 L95,225 L92,300 L85,300 Z" labelX={87} labelY={262} />
              <Path loc={PainLocation.KNEE_RIGHT} d="M85,300 Q87,305 85,310 Q87,315 85,320" labelX={85} labelY={310} />
              <Path loc={PainLocation.SHIN_RIGHT} d="M82,310 L88,310 L86,360 L84,360 Z" labelX={85} labelY={335} />
              <Path loc={PainLocation.ANKLE_RIGHT} d="M83,360 Q85,365 83,370 Q85,375 83,380" labelX={83} labelY={370} />
              <Path loc={PainLocation.FOOT_RIGHT} d="M78,375 L88,375 L86,390 L80,390 Z" labelX={83} labelY={382} />
              <Path loc={PainLocation.TOES_RIGHT} d="M78,385 L88,385 L87,395 L79,395 Z" labelX={83} labelY={390} />
              
              {/* EXTREMIDAD INFERIOR IZQUIERDA */}
              <Path loc={PainLocation.THIGH_ANTERIOR_LEFT} d="M105,225 L120,225 L117,300 L110,300 Z" labelX={112} labelY={262} />
              <Path loc={PainLocation.KNEE_LEFT} d="M115,300 Q117,305 115,310 Q117,315 115,320" labelX={115} labelY={310} />
              <Path loc={PainLocation.SHIN_LEFT} d="M112,310 L118,310 L116,360 L114,360 Z" labelX={115} labelY={335} />
              <Path loc={PainLocation.ANKLE_LEFT} d="M117,360 Q115,365 117,370 Q115,375 117,380" labelX={117} labelY={370} />
              <Path loc={PainLocation.FOOT_LEFT} d="M112,375 L122,375 L120,390 L114,390 Z" labelX={117} labelY={382} />
              <Path loc={PainLocation.TOES_LEFT} d="M112,385 L122,385 L121,395 L113,395 Z" labelX={117} labelY={390} />
            </>
          ) : (
            <>
              {/* CABEZA POSTERIOR */}
              <Path loc={PainLocation.HEAD_CRANIAL} d="M70,45 Q100,15 130,45 Q130,65 100,75 Q70,65 70,45" labelX={100} labelY={55} />
              <Path loc={PainLocation.HEAD_JAW} d="M75,88 L125,88 L125,95 L75,95 Z" labelX={100} labelY={91} />
              
              {/* CUELLO POSTERIOR */}
              <Path loc={PainLocation.NECK_POSTERIOR} d="M85,95 L115,95 L115,110 L85,110 Z" labelX={100} labelY={102} />
              
              {/* LÍNEA MEDIA POSTERIOR */}
              <Path loc={PainLocation.MIDLINE_CERVICAL} d="M95,100 L105,100 L105,110 L95,110 Z" labelX={100} labelY={105} />
              <Path loc={PainLocation.MIDLINE_THORACIC} d="M95,110 L105,110 L105,155 L95,155 Z" labelX={100} labelY={132} />
              <Path loc={PainLocation.MIDLINE_LUMBAR} d="M95,155 L105,155 L105,210 L95,210 Z" labelX={100} labelY={182} />
              <Path loc={PainLocation.MIDLINE_SACRAL} d="M95,210 L105,210 L105,225 L95,225 Z" labelX={100} labelY={217} />
              
              {/* HOMBROS POSTERIORES */}
              <Path loc={PainLocation.SHOULDER_RIGHT} d="M50,110 Q60,115 65,125 Q60,130 50,125 Q45,120 50,110" labelX={52} labelY={117} />
              <Path loc={PainLocation.SHOULDER_LEFT} d="M135,110 Q145,115 150,125 Q145,130 135,125 Q130,120 135,110" labelX={148} labelY={117} />
              
              {/* ESPALDA ALTA */}
              <Path loc={PainLocation.BACK_UPPER} d="M65,110 L135,110 L130,155 L70,155 Z" labelX={100} labelY={132} />
              
              {/* ZONA LUMBAR */}
              <Path loc={PainLocation.BACK_LOWER} d="M70,155 L130,155 L125,210 L75,210 Z" labelX={100} labelY={182} />
              
              {/* SACRO */}
              <Path loc={PainLocation.SACRUM} d="M75,210 L125,210 L120,225 L80,225 Z" labelX={100} labelY={217} />
              
              {/* CADERAS Y GLÚTEOS */}
              <Path loc={PainLocation.HIP_RIGHT} d="M50,210 L75,210 L72,240 L55,240 Z" labelX={62} labelY={225} />
              <Path loc={PainLocation.HIP_LEFT} d="M125,210 L150,210 L145,240 L128,240 Z" labelX={138} labelY={225} />
              <Path loc={PainLocation.BUTTOCK_RIGHT} d="M60,225 L85,225 L82,260 L65,260 Z" labelX={72} labelY={242} />
              <Path loc={PainLocation.BUTTOCK_LEFT} d="M115,225 L140,225 L135,260 L120,260 Z" labelX={128} labelY={242} />
              
              {/* EXTREMIDAD SUPERIOR DERECHA POSTERIOR */}
              <Path loc={PainLocation.ARM_UPPER_POSTERIOR_RIGHT} d="M45,115 L55,115 L52,155 L45,155 Z" labelX={50} labelY={135} />
              <Path loc={PainLocation.ELBOW_RIGHT} d="M42,155 Q45,160 42,165 Q45,170 42,175" labelX={42} labelY={165} />
              <Path loc={PainLocation.FOREARM_POSTERIOR_RIGHT} d="M42,165 L52,165 L50,210 L42,210 Z" labelX={47} labelY={187} />
              <Path loc={PainLocation.WRIST_RIGHT} d="M40,210 Q42,215 40,220 Q42,225 40,230" labelX={40} labelY={220} />
              <Path loc={PainLocation.HAND_RIGHT} d="M35,220 L45,220 L43,235 L37,235 Z" labelX={40} labelY={227} />
              <Path loc={PainLocation.FINGERS_RIGHT} d="M35,230 L45,230 L44,245 L36,245 Z" labelX={40} labelY={237} />
              
              {/* EXTREMIDAD SUPERIOR IZQUIERDA POSTERIOR */}
              <Path loc={PainLocation.ARM_UPPER_POSTERIOR_LEFT} d="M145,115 L155,115 L152,155 L145,155 Z" labelX={150} labelY={135} />
              <Path loc={PainLocation.ELBOW_LEFT} d="M158,155 Q155,160 158,165 Q155,170 158,175" labelX={158} labelY={165} />
              <Path loc={PainLocation.FOREARM_POSTERIOR_LEFT} d="M148,165 L158,165 L150,210 L148,210 Z" labelX={153} labelY={187} />
              <Path loc={PainLocation.WRIST_LEFT} d="M160,210 Q158,215 160,220 Q158,225 160,230" labelX={160} labelY={220} />
              <Path loc={PainLocation.HAND_LEFT} d="M155,220 L165,220 L163,235 L157,235 Z" labelX={160} labelY={227} />
              <Path loc={PainLocation.FINGERS_LEFT} d="M155,230 L165,230 L164,245 L156,245 Z" labelX={160} labelY={237} />
              
              {/* EXTREMIDAD INFERIOR DERECHA POSTERIOR */}
              <Path loc={PainLocation.THIGH_POSTERIOR_RIGHT} d="M80,225 L95,225 L92,300 L85,300 Z" labelX={87} labelY={262} />
              <Path loc={PainLocation.KNEE_RIGHT} d="M85,300 Q87,305 85,310 Q87,315 85,320" labelX={85} labelY={310} />
              <Path loc={PainLocation.CALF_RIGHT} d="M82,310 L88,310 L86,360 L84,360 Z" labelX={85} labelY={335} />
              <Path loc={PainLocation.ANKLE_RIGHT} d="M83,360 Q85,365 83,370 Q85,375 83,380" labelX={83} labelY={370} />
              <Path loc={PainLocation.FOOT_RIGHT} d="M78,375 L88,375 L86,390 L80,390 Z" labelX={83} labelY={382} />
              <Path loc={PainLocation.TOES_RIGHT} d="M78,385 L88,385 L87,395 L79,395 Z" labelX={83} labelY={390} />
              
              {/* EXTREMIDAD INFERIOR IZQUIERDA POSTERIOR */}
              <Path loc={PainLocation.THIGH_POSTERIOR_LEFT} d="M105,225 L120,225 L117,300 L110,300 Z" labelX={112} labelY={262} />
              <Path loc={PainLocation.KNEE_LEFT} d="M115,300 Q117,305 115,310 Q117,315 115,320" labelX={115} labelY={310} />
              <Path loc={PainLocation.CALF_LEFT} d="M112,310 L118,310 L116,360 L114,360 Z" labelX={115} labelY={335} />
              <Path loc={PainLocation.ANKLE_LEFT} d="M117,360 Q115,365 117,370 Q115,375 117,380" labelX={117} labelY={370} />
              <Path loc={PainLocation.FOOT_LEFT} d="M112,375 L122,375 L120,390 L114,390 Z" labelX={117} labelY={382} />
              <Path loc={PainLocation.TOES_LEFT} d="M112,385 L122,385 L121,395 L113,395 Z" labelX={117} labelY={390} />
            </>
          )}
        </svg>
      </div>
      <p className="mt-4 text-sm text-slate-500 md:text-base md:mt-5 lg:text-lg lg:mt-6 text-center px-4">
        Toca las zonas afectadas. Puedes seleccionar múltiples áreas.
      </p>
    </div>
  );
};
