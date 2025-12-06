import { create } from 'zustand';
import { PainEntry, Medication, ViewState, PainLocation, PainQuality, RecommendationLevel } from './types';
import { mockMedications, mockHistory } from './utils';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Navigation
  currentView: ViewState;
  setView: (view: ViewState) => void;

  // Auth (Mock)
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: () => void;
  logout: () => void;

  // Data
  history: PainEntry[];
  medications: Medication[];
  addPainEntry: (entry: PainEntry) => void;
  takeMedication: (id: string) => void;

  // Pain Recording Flow State (Draft)
  draftEntry: Partial<PainEntry>;
  updateDraft: (data: Partial<PainEntry>) => void;
  resetDraft: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  isDarkMode: false,
  toggleTheme: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newMode };
  }),

  // Navigation
  currentView: 'AUTH_LOGIN',
  setView: (view) => set({ currentView: view }),

  // Auth
  isAuthenticated: false,
  user: null,
  login: () => set({ isAuthenticated: true, user: { name: "Usuario Demo", email: "demo@alivia.app" }, currentView: 'HOME' }),
  logout: () => set({ isAuthenticated: false, user: null, currentView: 'AUTH_LOGIN' }),

  // Data
  history: mockHistory,
  medications: mockMedications,
  addPainEntry: (entry) => set((state) => ({ 
    history: [entry, ...state.history],
    currentView: 'HISTORY' 
  })),
  takeMedication: (id) => set((state) => ({
    medications: state.medications.map(m => {
      if (m.id === id) {
        // Mock update next dose 8 hours later
        const next = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
        return { ...m, nextDose: next, stock: m.stock - 1 };
      }
      return m;
    })
  })),

  // Pain Flow
  draftEntry: {},
  updateDraft: (data) => set((state) => ({ draftEntry: { ...state.draftEntry, ...data } })),
  resetDraft: () => set({ draftEntry: {} }),
}));

