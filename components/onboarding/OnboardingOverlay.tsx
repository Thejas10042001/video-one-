import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { useOnboardingStore } from '../../store/onboardingStore';
import { HeroExpression, HeroGesture } from '../../types/onboarding';
import { HeroMascot } from './HeroMascot';
import { ICONS } from '../../constants';

export const OnboardingOverlay: React.FC = () => {
  const { isActive, currentSteps, currentStepIndex, isPaused } = useOnboardingStore();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const currentStep = currentSteps[currentStepIndex];
  
  // Hero Position Motion Values
  const heroX = useSpring(0, { damping: 20, stiffness: 80 });
  const heroY = useSpring(window.innerHeight, { damping: 20, stiffness: 80 });
  
  // Anchored Tooltip Position
  const tooltipX = useSpring(0, { damping: 25, stiffness: 100 });
  const tooltipY = useSpring(0, { damping: 25, stiffness: 100 });
  const [heroPos, setHeroPos] = useState({ x: 0, y: window.innerHeight });

  const heroConfig = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const defaultMeta = { expression: 'neutral' as HeroExpression, gesture: 'none' as HeroGesture, scale: isMobile ? 0.7 : 1 };
    
    if (!currentStep?.hero) return defaultMeta;
    
    // Auto-map expressions if keywords are found and expression is neutral
    let expression: HeroExpression = currentStep.hero.expression;
    let gesture: HeroGesture = currentStep.hero.gesture;

    if (expression === 'neutral') {
      const text = currentStep.text.toLowerCase();
      if (text.includes('welcome') || text.includes('ready') || text.includes('success')) expression = 'happy';
      else if (text.includes('strategy') || text.includes('analyze') || text.includes('think')) expression = 'thinking';
      else if (text.includes('important') || text.includes('note') || text.includes('caution')) expression = 'serious';
      
      if (text.includes('click') || text.includes('select') || text.includes('here')) gesture = 'point';
    }

    return { 
      expression, 
      gesture, 
      scale: (currentStep.hero.scale || 1) * (isMobile ? 0.7 : 1),
      position: currentStep.hero.position || 'auto'
    };
  }, [currentStep]);

  useEffect(() => {
    if (isActive && currentStep) {
      currentStep.onStepStart?.();
      return () => currentStep.onStepEnd?.();
    }
  }, [isActive, currentStepIndex]);

  useEffect(() => {
    if (!isActive || !currentStep) return;

    const updateTarget = () => {
      const el = document.querySelector(currentStep.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (currentStep.scroll || !isInViewport) {
          el.scrollIntoView({ 
            behavior: currentStep.scrollBehavior || 'smooth', 
            block: 'center',
            inline: 'center'
          });
        }
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    updateTarget();
    
    // Set Moving state for hero
    setIsMoving(true);
    const movingTimer = setTimeout(() => setIsMoving(false), 800);

    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget, true);

    const interval = setInterval(updateTarget, 500); // Poll in case of layout changes

    return () => {
      clearTimeout(movingTimer);
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget, true);
      clearInterval(interval);
    };
  }, [isActive, currentStep, currentStepIndex]);

  // Update Hero Position based on target
  useEffect(() => {
    if (targetRect) {
      const heroConfig = currentStep?.hero;
      const pos = heroConfig?.position || 'auto';
      
      let x = targetRect.left + targetRect.width / 2;
      let y = targetRect.top + targetRect.height / 2;

      // Position hero near target
      if (pos === 'top' || (pos === 'auto' && targetRect.top > 300)) {
        y = targetRect.top - 160;
      } else if (pos === 'bottom' || (pos === 'auto' && targetRect.bottom < window.innerHeight - 300)) {
        y = targetRect.bottom + 60;
      } else if (pos === 'left' || (pos === 'auto' && targetRect.left > 300)) {
        x = targetRect.left - 160;
        y = targetRect.top + targetRect.height / 2;
      } else {
        x = targetRect.right + 60;
        y = targetRect.top + targetRect.height / 2;
      }

      heroX.set(x - 80); 
      heroY.set(y - 80);

      // Position Tooltip Near Target
      let tx = targetRect.left + targetRect.width / 2;
      let ty = targetRect.top - 40;

      if (ty < 150) {
        ty = targetRect.bottom + 40;
      }

      tooltipX.set(tx);
      tooltipY.set(ty);
    } else if (!isActive) {
      heroY.set(window.innerHeight + 200);
    }
  }, [targetRect, isActive, heroX, heroY, tooltipX, tooltipY, currentStep]);

  useEffect(() => {
    if (!isActive || isPaused || !currentStep) return;

    if (currentStep.action === 'click') {
      const timer = setTimeout(() => {
        const el = document.querySelector(currentStep.target) as HTMLElement;
        if (el) {
          el.click();
        }
      }, 1000); // Wait for cursor move animation
      return () => clearTimeout(timer);
    }

    if (currentStep.action === 'type' && currentStep.value) {
      const timer = setTimeout(() => {
        const el = document.querySelector(currentStep.target) as HTMLInputElement;
        if (el) {
          el.focus();
          el.value = currentStep.value || '';
          // Trigger change event for React to detect the update
          const event = new Event('input', { bubbles: true });
          el.dispatchEvent(event);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive, isPaused, currentStepIndex]);

  if (!isActive || !currentStep || !targetRect) return null;

  const highlightPadding = currentStep.highlightPadding ?? 4;
  
  return (
    <div className="fixed inset-0 z-[100000] pointer-events-none overflow-hidden">
      {/* Journey Mode Title Banner */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[1000] p-6 flex justify-center pointer-events-none"
      >
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-full px-8 py-3 flex items-center gap-4 shadow-2xl">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
            Spiked AI – <span className="text-indigo-400">Interactive User Journey</span>
          </h1>
          <div className="w-px h-4 bg-slate-800" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Step {currentStepIndex + 1} of {currentSteps.length}
          </span>
        </div>
      </motion.div>

      {/* Dim Background with Highlight Hole */}
      <svg className="absolute inset-0 w-full h-full z-[10]">
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - highlightPadding}
              y={targetRect.top - highlightPadding}
              width={targetRect.width + (highlightPadding * 2)}
              height={targetRect.height + (highlightPadding * 2)}
              rx="8"
              fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="black" fillOpacity="0.5" mask="url(#hole)" />
      </svg>

      {/* Pulsing Highlight Border */}
      <motion.div
        initial={false}
        animate={{
          left: targetRect.left - highlightPadding,
          top: targetRect.top - highlightPadding,
          width: targetRect.width + (highlightPadding * 2),
          height: targetRect.height + (highlightPadding * 2)
        }}
        className="absolute border-2 border-indigo-500 rounded-lg shadow-[0_0_30px_rgba(79,70,229,0.8)] z-[20]"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 bg-indigo-500/10 rounded-lg blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 border-4 border-indigo-400 rounded-lg"
        />
      </motion.div>

      {/* Hero Mascot */}
      <motion.div
        style={{ x: heroX, y: heroY }}
        className="fixed top-0 left-0 z-[30]"
        initial={{ y: window.innerHeight, x: -200 }}
        animate={{ scale: heroConfig.scale }}
      >
        <HeroMascot 
          expression={heroConfig.expression} 
          gesture={heroConfig.gesture}
          isMoving={isMoving}
          lookAt={{ 
            x: targetRect.left + targetRect.width / 2, 
            y: targetRect.top + targetRect.height / 2 
          }}
          heroPos={heroPos}
        />
      </motion.div>

      {/* Fake Animated Cursor with Intelligence */}
      <motion.div
        animate={{
          x: targetRect.left + targetRect.width / 2,
          y: targetRect.top + targetRect.height / 2,
          scale: currentStep.action === 'click' ? [1, 0.8, 1.2, 1] : 1,
          opacity: 1
        }}
        transition={{ 
          x: { type: 'spring', damping: 25, stiffness: 120 },
          y: { type: 'spring', damping: 25, stiffness: 120 },
          scale: { duration: 0.4, ease: "easeInOut" }
        }}
        className="absolute top-0 left-0 z-[50000] drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]"
      >
        <div className="relative">
          {/* Cursor Core */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-xl">
            <path d="M5.65376 12.3822L17.4452 3.10505C18.6656 2.14447 20.354 3.83282 19.3934 5.05327L10.1163 16.8447C9.37934 17.7816 8.01428 17.7126 7.37129 16.7077L5.34005 13.5332C4.85764 12.7792 5.05047 11.8542 5.65376 12.3822Z" fill="white" stroke="#6366f1" strokeWidth="2" />
          </svg>
          
          {/* Pulse Effect for Actions */}
          <AnimatePresence>
            {currentStep.action === 'click' && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute inset-0 bg-indigo-500 rounded-full blur-md"
              />
            )}
          </AnimatePresence>

          {/* Magnetic Glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-indigo-400/30 blur-2xl rounded-full -z-10"
          />
        </div>
      </motion.div>

      {/* Tooltip (Speech Bubble) - Refined Pos & Style */}
      <motion.div
        style={{ x: tooltipX, y: tooltipY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        className="fixed z-[100001] bg-slate-900 border-2 border-indigo-500/50 text-white p-6 rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] max-w-sm pointer-events-auto backdrop-blur-2xl -translate-x-1/2 -translate-y-full mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-900/20">
            <ICONS.Brain className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Neural Guidance</h4>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-sm font-black leading-relaxed text-white whitespace-pre-line"
              >
                {currentStep.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        {/* Tail */}
        <div className="absolute w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-indigo-500/50 rotate-45 bottom-[-10px] left-1/2 -translate-x-1/2" />
      </motion.div>

    </div>
  );
};
