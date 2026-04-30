import { create } from 'zustand';
import { OnboardingStep, OnboardingMode } from '../types/onboarding';

interface OnboardingState {
  isActive: boolean;
  mode: OnboardingMode;
  currentSteps: OnboardingStep[];
  currentStepIndex: number;
  isPaused: boolean;
  
  // Actions
  startOnboarding: (mode: OnboardingMode, steps: OnboardingStep[]) => void;
  stopOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setPaused: (paused: boolean) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isActive: false,
  mode: null,
  currentSteps: [],
  currentStepIndex: 0,
  isPaused: false,

  startOnboarding: (mode, steps) => set({
    isActive: true,
    mode,
    currentSteps: steps,
    currentStepIndex: 0,
    isPaused: false
  }),

  stopOnboarding: () => set({
    isActive: false,
    mode: null,
    currentSteps: [],
    currentStepIndex: 0,
    isPaused: false
  }),

  nextStep: () => set((state) => ({
    currentStepIndex: Math.min(state.currentStepIndex + 1, state.currentSteps.length - 1)
  })),

  prevStep: () => set((state) => ({
    currentStepIndex: Math.max(state.currentStepIndex - 1, 0)
  })),

  setPaused: (paused) => set({ isPaused: paused }),

  reset: () => set({
    isActive: false,
    mode: null,
    currentSteps: [],
    currentStepIndex: 0,
    isPaused: false
  })
}));
