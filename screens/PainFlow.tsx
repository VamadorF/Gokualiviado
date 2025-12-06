'use client'

import React from 'react';
import { useAppStore } from '../store';
import { Button, Card, Label, Slider, cn } from '../components/UI';
import { BodyMap } from '../components/BodyMap';
import { Icons } from '../components/Icons';
import { PainLocation, PainQuality, RecommendationLevel } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateRecommendation } from '../utils';

// Face Icon Component
const FaceIcon = ({ level, active }: { level: number; active: boolean }) => {
  const getFaceData = (l: number) => {
    switch (l) {
      case 0: return { color: '#60a5fa', eye: 'circle', mouth: 'M30 65 Q50 85 70 65' }; // Smile
      case 2: return { color: '#4ade80', eye: 'circle', mouth: 'M35 70 Q50 80 65 70' }; // Small Smile
      case 4: return { color: '#facc15', eye: 'circle', mouth: 'M35 75 L65 75' }; // Neutral
      case 6: return { color: '#fb923c', eye: 'circle', mouth: 'M35 80 Q50 65 65 80' }; // Frown
      case 8: return { color: '#f87171', eye: 'circle', mouth: 'M30 80 Q50 55 70 80' }; // Hard Frown
      case 10: return { color: '#ef4444', eye: 'cross', mouth: 'M30 75 Q50 45 70 75' }; // Cry/Open
      default: return { color: '#94a3b8', eye: 'circle', mouth: 'M35 75 L65 75' };
    }
  };

  const { color, eye, mouth } = getFaceData(level);
  
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full transition-all duration-300", active ? "scale-110" : "scale-100 opacity-80")}>
      <circle cx="50" cy="50" r="45" fill={active ? color : 'transparent'} stroke={color} strokeWidth="4" className="transition-all duration-300" />
      
      {/* Eyes */}
      <g fill={active ? 'white' : color} className="transition-colors duration-300">
        {eye === 'circle' ? (
          <>
            <circle cx="35" cy="40" r="5" />
            <circle cx="65" cy="40" r="5" />
          </>
        ) : (
          <>
            <path d="M28 35 L42 45 M42 35 L28 45" stroke={active ? 'white' : color} strokeWidth="4" strokeLinecap="round" />
            <path d="M58 35 L72 45 M72 35 L58 45" stroke={active ? 'white' : color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Mouth */}
      <path 
        d={mouth} 
        fill="none" 
        stroke={active ? 'white' : color} 
        strokeWidth="5" 
        strokeLinecap="round" 
        className="transition-colors duration-300"
      />
    </svg>
  );
};

export const PainFlow = () => {
  const { currentView, setView, draftEntry, updateDraft, addPainEntry } = useAppStore();

  const handleNext = (nextView: any) => setView(nextView);
  const handleBack = (prevView: any) => setView(prevView);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // 1. Location
  if (currentView === 'PAIN_FLOW_LOC') {
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full flex flex-col p-6 md:p-8 lg:p-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 dark:text-white md:text-3xl md:mb-3 lg:text-4xl lg:mb-4">¿Dónde te duele?</h2>
          <p className="text-slate-500 mb-6 md:text-lg md:mb-8 lg:text-xl lg:mb-10">Selecciona las zonas en el mapa.</p>
          <BodyMap 
            selected={draftEntry.locations || []} 
            onToggle={(loc) => {
              const current = draftEntry.locations || [];
              const newLocs = current.includes(loc) ? current.filter(l => l !== loc) : [...current, loc];
              updateDraft({ locations: newLocs });
            }}
          />
        </div>
        <div className="mt-auto flex gap-4">
          <Button variant="ghost" className="flex-1" onClick={() => setView('HOME')}>Cancelar</Button>
          <Button className="flex-1" onClick={() => handleNext('PAIN_FLOW_INT')} disabled={!draftEntry.locations?.length}>
            Siguiente
          </Button>
        </div>
      </motion.div>
    );
  }

  // 2. Intensity
  if (currentView === 'PAIN_FLOW_INT') {
    const intensity = draftEntry.intensity || 0;
    const faces = [0, 2, 4, 6, 8, 10];
    
    const getLabel = (val: number) => {
      if (val === 0) return "Sin dolor";
      if (val <= 2) return "Dolor leve";
      if (val <= 4) return "Dolor moderado";
      if (val <= 6) return "Dolor severo";
      if (val <= 8) return "Dolor muy severo";
      return "Dolor insoportable";
    };

    const getClosestFace = (val: number) => {
      return faces.reduce((prev, curr) => Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
    };

    const getColorClass = (val: number) => {
       if (val <= 1) return "text-blue-500 border-blue-500";
       if (val <= 3) return "text-green-500 border-green-500";
       if (val <= 5) return "text-yellow-500 border-yellow-500";
       if (val <= 7) return "text-orange-500 border-orange-500";
       return "text-red-500 border-red-500";
    };

    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full flex flex-col p-6 md:p-8 lg:p-10">
        <h2 className="text-2xl font-bold mb-2 dark:text-white md:text-3xl md:mb-3 lg:text-4xl lg:mb-4">Intensidad</h2>
        <p className="text-slate-500 mb-6 md:text-lg md:mb-8 lg:text-xl lg:mb-10">Selecciona el nivel de dolor.</p>
        
        <div className="flex-1 flex flex-col">
          {/* Faces Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8 md:gap-4 md:mb-10 lg:gap-6 lg:mb-12">
            {faces.map((faceVal) => {
              const isActive = getClosestFace(intensity) === faceVal;
              return (
                <button
                  key={faceVal}
                  onClick={() => updateDraft({ intensity: faceVal })}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-2xl transition-all duration-200 border-2",
                    isActive 
                      ? "bg-slate-50 dark:bg-slate-800 scale-105 shadow-md border-transparent"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <div className="w-12 h-12 mb-1 md:w-14 md:h-14 lg:w-16 lg:h-16">
                    <FaceIcon level={faceVal} active={isActive} />
                  </div>
                  <span className={cn("text-xs font-bold md:text-sm lg:text-base", isActive ? "text-slate-800 dark:text-white" : "text-slate-400")}>{faceVal}</span>
                </button>
              );
            })}
          </div>

          {/* Numeric Display & Description */}
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
             <h3 className={cn("text-4xl font-bold transition-colors md:text-5xl lg:text-6xl", getColorClass(intensity).split(' ')[0])}>
               {intensity} <span className="text-xl text-slate-300 font-normal md:text-2xl lg:text-3xl">/ 10</span>
             </h3>
             <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mt-1 uppercase tracking-wide md:text-xl lg:text-2xl md:mt-2 lg:mt-3">
               {getLabel(intensity)}
             </p>
          </div>

          {/* Gradient Slider */}
          <div className="px-2">
            <Slider 
              min={0} 
              max={10} 
              value={intensity} 
              onChange={(val) => updateDraft({ intensity: val })}
              showFill={false}
              trackClassName="bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 h-4"
              colorClass={getColorClass(intensity)}
            />
            <div className="flex justify-between mt-1 text-xs text-slate-400 font-medium px-1">
              <span>Sin dolor</span>
              <span>Inimaginable</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={() => handleBack('PAIN_FLOW_LOC')}>Atrás</Button>
          <Button className="flex-1" onClick={() => handleNext('PAIN_FLOW_QUAL')}>Siguiente</Button>
        </div>
      </motion.div>
    );
  }

  // 3. Quality
  if (currentView === 'PAIN_FLOW_QUAL') {
    const selected = draftEntry.quality || [];
    const toggle = (q: PainQuality) => {
      const isSel = selected.includes(q);
      updateDraft({ quality: isSel ? selected.filter(i => i !== q) : [...selected, q] });
    };

    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full flex flex-col p-6 md:p-8 lg:p-10">
        <h2 className="text-2xl font-bold mb-6 dark:text-white md:text-3xl md:mb-8 lg:text-4xl lg:mb-10">¿Cómo es el dolor?</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6 md:gap-4 md:mb-8 lg:gap-5 lg:mb-10">
          {Object.values(PainQuality).map((q) => (
            <button
              key={q}
              onClick={() => toggle(q)}
              className={`p-4 rounded-2xl text-left font-medium transition-all md:p-5 md:text-lg lg:p-6 lg:text-xl ${
                selected.includes(q) 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 transform scale-[1.02]' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="mt-auto flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={() => handleBack('PAIN_FLOW_INT')}>Atrás</Button>
          <Button className="flex-1" onClick={() => handleNext('PAIN_FLOW_IMP')} disabled={selected.length === 0}>Siguiente</Button>
        </div>
      </motion.div>
    );
  }

  // 4. Impact
  if (currentView === 'PAIN_FLOW_IMP') {
    const impact = draftEntry.impact || { physical: 0, work: 0, sleep: 0 };
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full flex flex-col p-6 md:p-8 lg:p-10">
        <h2 className="text-2xl font-bold mb-6 dark:text-white md:text-3xl md:mb-8 lg:text-4xl lg:mb-10">Impacto Funcional</h2>
        
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          <div>
            <Label>Actividad Física</Label>
            <Slider 
              min={0} max={10} value={impact.physical} 
              onChange={(v) => updateDraft({ impact: { ...impact, physical: v } })} 
            />
          </div>
          <div>
            <Label>Trabajo / Tareas</Label>
            <Slider 
              min={0} max={10} value={impact.work} 
              onChange={(v) => updateDraft({ impact: { ...impact, work: v } })} 
            />
          </div>
          <div>
            <Label>Sueño / Descanso</Label>
            <Slider 
              min={0} max={10} value={impact.sleep} 
              onChange={(v) => updateDraft({ impact: { ...impact, sleep: v } })} 
            />
          </div>
        </div>

        <div className="mt-auto flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={() => handleBack('PAIN_FLOW_QUAL')}>Atrás</Button>
          <Button className="flex-1" onClick={() => handleNext('PAIN_FLOW_REC')}>Finalizar</Button>
        </div>
      </motion.div>
    );
  }

  // 5. Recommendation & Save
  if (currentView === 'PAIN_FLOW_REC') {
    const intensity = draftEntry.intensity || 0;
    const impact = draftEntry.impact || { physical: 0, work: 0, sleep: 0 };
    const impactScore = impact.physical + impact.work + impact.sleep;
    const rec = calculateRecommendation(intensity, impactScore);
    
    const colors = {
      [RecommendationLevel.SELF_CARE]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      [RecommendationLevel.CONSULT]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      [RecommendationLevel.URGENT]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      [RecommendationLevel.EMERGENCY]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };

    const handleSave = () => {
      addPainEntry({
        id: Math.random().toString(),
        date: new Date(),
        locations: draftEntry.locations!,
        intensity: draftEntry.intensity!,
        quality: draftEntry.quality!,
        duration: '1h',
        impact: draftEntry.impact!,
        emotional: { phq2: 0, gad2: 0 },
        medicationTaken: false,
        recommendation: rec
      } as any);
    };

    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full flex flex-col p-6 md:p-8 lg:p-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30 md:w-24 md:h-24 md:mb-8 lg:w-28 lg:h-28 lg:mb-10"
          >
            <Icons.CheckCircle className="text-white w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2 dark:text-white md:text-3xl md:mb-3 lg:text-4xl lg:mb-4">Registro Completo</h2>
          <p className="text-slate-500 mb-8 md:text-lg md:mb-10 lg:text-xl lg:mb-12">Hemos analizado tus síntomas.</p>

          <Card className={`w-full p-6 border-l-4 border-l-primary-500 md:p-7 lg:p-8 ${colors[rec]}`}>
            <h3 className="font-bold text-lg mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">Recomendación</h3>
            <p className="text-lg md:text-xl lg:text-2xl">{rec}</p>
          </Card>
        </div>

        <Button className="w-full mt-8 md:mt-10 lg:mt-12 md:text-lg lg:text-xl md:h-14 lg:h-16" onClick={handleSave}>Guardar y Volver</Button>
      </motion.div>
    );
  }

  return null;
};

