'use client'

import React from 'react';
import { useAppStore } from '../store';
import { Button, Card, Label, cn } from '../components/UI';
import { Icons } from '../components/Icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatTime } from '../utils';

// HOME
export const HomeTab = () => {
  const { user, setView, medications, history } = useAppStore();
  const nextMed = medications.sort((a, b) => a.nextDose.getTime() - b.nextDose.getTime())[0];
  const lastPain = history[0];

  return (
    <div className="p-6 space-y-6 pb-24 md:p-8 md:space-y-8 lg:p-10 lg:space-y-10">
      <header className="flex justify-between items-center md:mb-4 lg:mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white md:text-4xl lg:text-5xl">Hola, {user?.name.split(' ')[0]}</h1>
          <p className="text-slate-500 dark:text-slate-400 md:text-lg lg:text-xl">¿Cómo te sientes hoy?</p>
        </div>
        <button onClick={() => setView('PROFILE')} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center md:w-12 md:h-12 lg:w-14 lg:h-14 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
           <Icons.User className="w-6 h-6 text-slate-500 dark:text-slate-300 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </button>
      </header>

      {/* Main Action */}
      <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-none shadow-lg shadow-primary-500/30 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Registrar Nuevo Episodio</h2>
          <p className="text-primary-100 mb-4 text-sm">Monitorea tu progreso y obtén recomendaciones.</p>
          <Button 
            size="sm" 
            className="bg-white text-primary-600 hover:bg-primary-50"
            onClick={() => setView('PAIN_FLOW_LOC')}
          >
            Comenzar Ahora
          </Button>
        </div>
        <Icons.Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10" />
      </Card>

      {/* Widgets Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <Card className="p-4 flex flex-col justify-between h-40 md:h-48 md:p-5 lg:h-52 lg:p-6">
          <div className="flex items-start justify-between">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400 md:p-3 lg:p-3">
              <Icons.Pill size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1 md:text-sm lg:text-base">Próxima Dosis</Label>
            <p className="font-bold text-slate-800 dark:text-white md:text-lg lg:text-xl">{nextMed?.name}</p>
            <p className="text-sm text-slate-500 md:text-base lg:text-lg">{formatTime(nextMed?.nextDose)}</p>
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between h-40 md:h-48 md:p-5 lg:h-52 lg:p-6">
           <div className="flex items-start justify-between">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 md:p-3 lg:p-3">
              <Icons.Activity size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1 md:text-sm lg:text-base">Último Dolor</Label>
            <p className="text-2xl font-bold text-slate-800 dark:text-white md:text-3xl lg:text-4xl">{lastPain?.intensity}<span className="text-sm text-slate-400 font-normal md:text-base lg:text-lg">/10</span></p>
            <p className="text-xs text-slate-500 md:text-sm lg:text-base">Hace 2 horas</p>
          </div>
        </Card>
      </div>

      <div className="pt-2 md:pt-4 lg:pt-6">
        <div className="flex justify-between items-center mb-4 md:mb-6 lg:mb-8">
          <h3 className="font-bold text-lg dark:text-white md:text-xl lg:text-2xl">Resumen Semanal</h3>
          <span className="text-sm text-primary-500 md:text-base lg:text-lg cursor-pointer hover:text-primary-600 transition-colors">Ver todo</span>
        </div>
        <div className="h-48 w-full md:h-56 lg:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[...history].reverse().slice(-7)}>
              <defs>
                <linearGradient id="colorPain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
              />
              <Area 
                type="monotone" 
                dataKey="intensity" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPain)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// MEDICATIONS
export const MedicationsTab = () => {
  const { medications, takeMedication } = useAppStore();

  return (
    <div className="p-6 pb-24 md:p-8 md:pb-28 lg:p-10 lg:pb-32">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 md:text-4xl md:mb-8 lg:text-5xl lg:mb-10">Mis Medicamentos</h1>
      
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        {medications.map((med) => (
          <Card key={med.id} className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-500">
                  <Icons.Pill size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{med.name}</h3>
                  <p className="text-slate-500 text-sm">{med.dose} • {med.frequency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium uppercase">Próxima</p>
                <p className="font-bold text-primary-600 dark:text-primary-400">{formatTime(med.nextDose)}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-700 pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">Stock: {med.stock} unidades</span>
              <Button size="sm" variant="outline" onClick={() => takeMedication(med.id)}>
                Marcar como tomado
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <Button variant="ghost" className="w-full mt-6 border border-dashed border-slate-300 dark:border-slate-700">
        <Icons.Plus size={20} /> Agregar Medicamento
      </Button>
    </div>
  );
};

// HISTORY
export const HistoryTab = () => {
  const { history } = useAppStore();
  const data = [...history].reverse();

  return (
    <div className="p-6 pb-24 h-full flex flex-col md:p-8 md:pb-28 lg:p-10 lg:pb-32">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 md:text-4xl md:mb-8 lg:text-5xl lg:mb-10">Historial</h1>
      
      <Card className="mb-6 p-4 md:mb-8 md:p-5 lg:mb-10 lg:p-6">
        <Label className="md:text-base lg:text-lg">Tendencia de Dolor (Últimos 14 días)</Label>
        <div className="h-48 mt-4 md:h-56 lg:h-64 md:mt-6 lg:mt-8">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => format(new Date(date), 'd MMM', { locale: es })} 
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                labelFormatter={(label) => format(new Date(label), 'd MMMM yyyy', { locale: es })}
                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)' }}
              />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#0ea5e9" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar md:space-y-4 lg:space-y-5">
        <Label className="md:text-base lg:text-lg">Registros Recientes</Label>
        {history.map((entry) => (
          <div key={entry.id} className="flex gap-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors md:p-4 md:gap-5 lg:p-5 lg:gap-6">
            <div className="flex-shrink-0 w-12 text-center md:w-14 lg:w-16">
              <p className="font-bold text-slate-700 dark:text-slate-300 md:text-lg lg:text-xl">{format(new Date(entry.date), 'dd')}</p>
              <p className="text-xs text-slate-400 uppercase md:text-sm lg:text-base">{format(new Date(entry.date), 'MMM', { locale: es })}</p>
            </div>
            <div className="flex-1 border-l-2 border-slate-100 dark:border-slate-700 pl-4 md:pl-5 lg:pl-6">
               <div className="flex justify-between">
                 <h4 className="font-medium dark:text-white md:text-lg lg:text-xl">{entry.locations.join(', ')}</h4>
                 <span className={cn("font-bold md:text-lg lg:text-xl", entry.intensity > 6 ? "text-red-500" : "text-slate-600")}>
                   {entry.intensity}/10
                 </span>
               </div>
               <p className="text-sm text-slate-500 md:text-base lg:text-lg">{entry.quality.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PROFILE
export const ProfileTab = () => {
  const { user, logout, isDarkMode, toggleTheme } = useAppStore();

  return (
    <div className="p-6 pb-24 md:p-8 md:pb-28 lg:p-10 lg:pb-32">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 md:text-4xl md:mb-10 lg:text-5xl lg:mb-12">Perfil</h1>
      
      <div className="flex items-center gap-4 mb-8 md:gap-6 md:mb-10 lg:gap-8 lg:mb-12">
        <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-3xl font-bold text-primary-600 dark:text-primary-400 md:w-24 md:h-24 md:text-4xl lg:w-28 lg:h-28 lg:text-5xl">
          {user?.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold dark:text-white md:text-2xl lg:text-3xl">{user?.name}</h2>
          <p className="text-slate-500 md:text-lg lg:text-xl">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 lg:space-y-5">
        <Card className="flex items-center justify-between p-4 cursor-pointer md:p-5 lg:p-6" onClick={toggleTheme}>
          <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
            {isDarkMode ? <Icons.Moon className="text-primary-500 md:w-6 md:h-6 lg:w-7 lg:h-7" /> : <Icons.Sun className="text-orange-500 md:w-6 md:h-6 lg:w-7 lg:h-7" />}
            <span className="font-medium dark:text-white md:text-lg lg:text-xl">Modo Oscuro</span>
          </div>
          <div className={`w-12 h-6 rounded-full p-1 transition-colors md:w-14 md:h-7 lg:w-16 lg:h-8 ${isDarkMode ? 'bg-primary-500' : 'bg-slate-200'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform md:w-5 md:h-5 lg:w-6 lg:h-6 ${isDarkMode ? 'translate-x-6 md:translate-x-7 lg:translate-x-8' : 'translate-x-0'}`} />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4 cursor-pointer md:p-5 lg:p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
            <Icons.AlertCircle className="text-slate-400 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            <span className="font-medium dark:text-white md:text-lg lg:text-xl">Ayuda y Soporte</span>
          </div>
          <Icons.ChevronRight className="text-slate-300 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </Card>

        <Button variant="danger" className="w-full mt-8" onClick={logout}>
          <Icons.LogOut size={18} /> Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

