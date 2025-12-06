import React, { useEffect } from 'react';
import { useAppStore } from './store';
import { HomeTab, MedicationsTab, HistoryTab, ProfileTab } from './screens/Tabs';
import { PainFlow } from './screens/PainFlow';
import { Icons } from './components/Icons';
import { Button, cn } from './components/UI';
import { motion, AnimatePresence } from 'framer-motion';

// Auth Screen Component
const AuthScreen = () => {
  const { login } = useAppStore();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 md:p-10 lg:p-12">
      <div className="w-24 h-24 bg-primary-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-primary-500/40 md:w-28 md:h-28 md:mb-8 lg:w-32 lg:h-32 lg:mb-10">
        <Icons.Activity className="text-white w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
      </div>
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight md:text-5xl md:mb-3 lg:text-6xl lg:mb-4">AlivIA</h1>
      <p className="text-slate-500 text-center mb-12 md:text-lg md:mb-14 lg:text-xl lg:mb-16">Gestión inteligente de tu bienestar.</p>
      
      <div className="w-full max-w-sm space-y-4 md:max-w-md md:space-y-5 lg:max-w-lg lg:space-y-6">
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          className="w-full h-14 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary-500 transition-colors md:h-16 md:px-5 md:text-base lg:h-18 lg:px-6 lg:text-lg"
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="w-full h-14 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary-500 transition-colors md:h-16 md:px-5 md:text-base lg:h-18 lg:px-6 lg:text-lg"
        />
        <Button className="w-full" onClick={login}>Iniciar Sesión</Button>
        <Button variant="ghost" className="w-full">Crear Cuenta</Button>
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNav = () => {
  const { currentView, setView } = useAppStore();
  
  const tabs = [
    { id: 'HOME', icon: Icons.Home, label: 'Inicio' },
    { id: 'MEDICATIONS', icon: Icons.Pill, label: 'Meds' },
    { id: 'HISTORY', icon: Icons.History, label: 'Historial' },
    { id: 'PROFILE', icon: Icons.User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 h-20 flex justify-between items-start z-50 md:px-8 lg:px-12">
      {tabs.map((tab) => {
        const isActive = currentView === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id as any)}
            className="flex flex-col items-center gap-1 w-16 group md:w-20"
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-all duration-300",
              isActive ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 -translate-y-1" : "text-slate-400 group-hover:text-slate-600"
            )}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="md:w-6 md:h-6" />
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-colors md:text-xs",
              isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-400"
            )}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  );
};

const App = () => {
  const { currentView, isAuthenticated } = useAppStore();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const isPainFlow = currentView.startsWith('PAIN_FLOW');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 max-w-md mx-auto relative shadow-2xl overflow-hidden md:max-w-lg lg:max-w-xl">
      
      {/* Content Area */}
      <main className="h-full overflow-y-auto no-scrollbar scroll-smooth">
        <AnimatePresence mode="wait">
          {!isPainFlow && currentView === 'HOME' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeTab />
            </motion.div>
          )}
          {!isPainFlow && currentView === 'MEDICATIONS' && (
            <motion.div key="meds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MedicationsTab />
            </motion.div>
          )}
          {!isPainFlow && currentView === 'HISTORY' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HistoryTab />
            </motion.div>
          )}
          {!isPainFlow && currentView === 'PROFILE' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProfileTab />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pain Flow Wizard Overlay */}
        <AnimatePresence>
          {isPainFlow && (
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-white dark:bg-slate-900 max-w-md mx-auto md:max-w-lg lg:max-w-xl"
            >
              <PainFlow />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation (Only show if not in wizard flow) */}
      {!isPainFlow && <BottomNav />}
    </div>
  );
};

export default App;

