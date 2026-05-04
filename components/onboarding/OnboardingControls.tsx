import React from 'react';
import { motion } from 'motion/react';
import { useOnboardingStore } from '../../store/onboardingStore';
import { ChevronLeft, ChevronRight, X, Pause, Play } from 'lucide-react';

export const OnboardingControls: React.FC = () => {
  const { isActive, currentStepIndex, currentSteps, nextStep, prevStep, stopOnboarding, isPaused, setPaused } = useOnboardingStore();

  if (!isActive) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[10001] w-full max-w-lg px-4">
      {/* Progress Block */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] shadow-2xl overflow-hidden mb-4"
      >
        <div className="h-1.5 w-full bg-slate-800/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / currentSteps.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 p-2 rounded-[2.5rem] shadow-2xl flex items-center gap-2"
      >
        <div className="px-6 py-2">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Protocol Progress</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white italic">
                {String(currentStepIndex + 1).padStart(2, '0')}
              </span>
              <div className="w-4 h-[1px] bg-slate-700" />
              <span className="text-[10px] font-bold text-slate-400">
                {String(currentSteps.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-auto">
          <ControlButton onClick={prevStep} disabled={currentStepIndex === 0} icon={<ChevronLeft className="w-5 h-5" />} />
          
          <ControlButton 
            onClick={() => setPaused(!isPaused)} 
            icon={isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />} 
          />

          {currentStepIndex < currentSteps.length - 1 ? (
            <button 
              onClick={nextStep}
              className="flex items-center gap-3 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="text-[10px] font-black uppercase tracking-widest">Deploy Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={stopOnboarding}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all shadow-lg shadow-emerald-500/20"
            >
              Initialize Protocol
            </button>
          )}
        </div>

        <div className="pl-2 pr-2 border-l border-slate-700/50">
          <button 
            onClick={stopOnboarding}
            className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
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
