'use client'

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/20',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
    outline: 'border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
    icon: 'h-12 w-12 flex items-center justify-center p-0'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={cn(
        'rounded-2xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div 
      className={cn(
        'bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50', 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Label: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children }) => (
  <div className={cn("text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider", className)}>
    {children}
  </div>
);

export const Slider: React.FC<{
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  labels?: Record<number, string>;
  colorClass?: string;
  showFill?: boolean;
  trackClassName?: string;
}> = ({ value, min, max, onChange, labels, colorClass = "text-primary-500", showFill = true, trackClassName }) => {
  return (
    <div className="w-full py-4">
      <div className={cn("relative h-4 rounded-full", trackClassName || "bg-slate-200 dark:bg-slate-700")}>
        {showFill && (
          <div 
            className="absolute top-0 left-0 h-full bg-primary-500 rounded-full" 
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-8 w-8 bg-white dark:bg-slate-800 rounded-full shadow-lg border-2 flex items-center justify-center pointer-events-none transition-all z-20",
            colorClass
          )}
          style={{ 
            left: `${((value - min) / (max - min)) * 100}%`, 
            transform: `translate(-50%, -50%)`,
            borderColor: 'currentColor'
          }}
        >
          <span className="text-xs font-bold">{value}</span>
        </div>
      </div>
      {labels && (
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
          <span>{labels[min]}</span>
          <span>{labels[max]}</span>
        </div>
      )}
    </div>
  );
};

