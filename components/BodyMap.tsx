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

  const Path = ({ loc, d, className }: { loc: PainLocation; d: string; className?: string }) => (
    <motion.path
      d={d}
      fill={isSelected(loc) ? '#0ea5e9' : '#e2e8f0'}
      className={cn("cursor-pointer stroke-white dark:stroke-slate-800 stroke-2 hover:opacity-80 transition-colors", className)}
      onClick={() => onToggle(loc)}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, fill: isSelected(loc) ? '#0ea5e9' : (document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0') }}
    />
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

      <div className="relative w-64 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem]">
        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-xl">
          {view === 'front' ? (
            <>
              {/* Head */}
              <Path loc={PainLocation.HEAD} d="M70,50 Q100,20 130,50 Q130,80 100,90 Q70,80 70,50" />
              {/* Neck */}
              <Path loc={PainLocation.NECK} d="M85,90 L115,90 L115,105 L85,105 Z" />
              {/* Chest */}
              <Path loc={PainLocation.CHEST} d="M60,105 L140,105 L135,160 L65,160 Z" />
              {/* Abdomen */}
              <Path loc={PainLocation.ABDOMEN} d="M65,160 L135,160 L130,220 L70,220 Z" />
              {/* Arms (Merged for simplicity) */}
              <Path loc={PainLocation.ARMS} d="M40,110 L60,110 L60,200 L40,200 M140,110 L160,110 L160,200 L140,200" />
              {/* Legs */}
              <Path loc={PainLocation.LEGS} d="M70,220 L98,220 L95,380 L75,380 M102,220 L130,220 L125,380 L105,380" />
            </>
          ) : (
            <>
              {/* Head Back */}
              <Path loc={PainLocation.HEAD} d="M70,50 Q100,20 130,50 Q130,80 100,90 Q70,80 70,50" />
              {/* Neck Back */}
              <Path loc={PainLocation.NECK} d="M85,90 L115,90 L115,105 L85,105 Z" />
              {/* Upper Back */}
              <Path loc={PainLocation.BACK_UPPER} d="M60,105 L140,105 L135,160 L65,160 Z" />
              {/* Lower Back */}
              <Path loc={PainLocation.BACK_LOWER} d="M65,160 L135,160 L130,220 L70,220 Z" />
               {/* Arms */}
               <Path loc={PainLocation.ARMS} d="M40,110 L60,110 L60,200 L40,200 M140,110 L160,110 L160,200 L140,200" />
              {/* Legs */}
              <Path loc={PainLocation.LEGS} d="M70,220 L98,220 L95,380 L75,380 M102,220 L130,220 L125,380 L105,380" />
            </>
          )}
        </svg>
      </div>
      <p className="mt-4 text-sm text-slate-500 md:text-base md:mt-5 lg:text-lg lg:mt-6">Toca las zonas afectadas</p>
    </div>
  );
};

