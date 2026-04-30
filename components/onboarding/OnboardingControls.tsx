import React from 'react';
import { motion } from 'motion/react';
import { useOnboardingStore } from '../../store/onboardingStore';
import { ChevronLeft, ChevronRight, X, Pause, Play } from 'lucide-react';

export const OnboardingControls: React.FC = () => {
  const { isActive, currentStepIndex, currentSteps, nextStep, prevStep, stopOnboarding, isPaused, setPaused } = useOnboardingStore();

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-2 rounded-2xl shadow-2xl flex items-center gap-2"
    >
      <div className="px-4 py-2 border-r border-slate-700/50">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Step {currentStepIndex + 1} of {currentSteps.length}
        </span>
      </div>

      <div className="flex gap-1">
        <ControlButton onClick={prevStep} disabled={currentStepIndex === 0} icon={<ChevronLeft className="w-4 h-4" />} />
        
        <ControlButton 
          onClick={() => setPaused(!isPaused)} 
          icon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />} 
        />

        {currentStepIndex < currentSteps.length - 1 ? (
          <ControlButton onClick={nextStep} icon={<ChevronRight className="w-4 h-4" />} highlight />
        ) : (
          <button 
            onClick={stopOnboarding}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            Finish
          </button>
        )}
      </div>

      <div className="pl-2 border-l border-slate-700/50">
        <ControlButton onClick={stopOnboarding} icon={<X className="w-4 h-4" />} danger />
      </div>
    </motion.div>
  );
};

const ControlButton: React.FC<{ 
  onClick: () => void; 
  disabled?: boolean; 
  icon: React.ReactNode; 
  highlight?: boolean; 
  danger?: boolean 
}> = ({ onClick, disabled, icon, highlight, danger }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
      highlight ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 
      danger ? 'hover:bg-rose-500/20 text-slate-400 hover:text-rose-500' :
      'bg-slate-800 hover:bg-slate-700 text-slate-300'
    }`}
  >
    {icon}
  </button>
);
