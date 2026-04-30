import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOnboardingStore } from '../../store/onboardingStore';

export const OnboardingOverlay: React.FC = () => {
  const { isActive, currentSteps, currentStepIndex, isPaused } = useOnboardingStore();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const currentStep = currentSteps[currentStepIndex];
  const cursorRef = useRef<HTMLDivElement>(null);

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
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget, true);

    const interval = setInterval(updateTarget, 500); // Poll in case of layout changes

    return () => {
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget, true);
      clearInterval(interval);
    };
  }, [isActive, currentStep, currentStepIndex]);

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

  const tooltipPosition = currentStep.position || 'bottom';
  const highlightPadding = currentStep.highlightPadding ?? 4;
  const tooltipOffset = currentStep.tooltipOffset ?? { x: 0, y: 0 };
  
  const getTooltipStyle = () => {
    const padding = 12;
    switch (tooltipPosition) {
      case 'top':
        return { 
          bottom: window.innerHeight - targetRect.top + padding + tooltipOffset.y, 
          left: targetRect.left + (targetRect.width / 2) + tooltipOffset.x 
        };
      case 'bottom':
        return { 
          top: targetRect.bottom + padding + tooltipOffset.y, 
          left: targetRect.left + (targetRect.width / 2) + tooltipOffset.x 
        };
      case 'left':
        return { 
          top: targetRect.top + (targetRect.height / 2) + tooltipOffset.y, 
          right: window.innerWidth - targetRect.left + padding + tooltipOffset.x 
        };
      case 'right':
        return { 
          top: targetRect.top + (targetRect.height / 2) + tooltipOffset.y, 
          left: targetRect.right + padding + tooltipOffset.x 
        };
      default:
        return { 
          top: targetRect.bottom + padding + tooltipOffset.y, 
          left: targetRect.left + (targetRect.width / 2) + tooltipOffset.x 
        };
    }
  };

  const tooltipStyle = getTooltipStyle();

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Dim Background with Highlight Hole */}
      <svg className="absolute inset-0 w-full h-full">
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
        className="absolute border-2 border-indigo-500 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 border-4 border-indigo-400 rounded-lg"
        />
      </motion.div>

      {/* Fake Animated Cursor */}
      <motion.div
        ref={cursorRef}
        animate={{
          x: targetRect.left + targetRect.width / 2,
          y: targetRect.top + targetRect.height / 2,
          scale: currentStep.action === 'click' ? [1, 0.8, 1] : 1
        }}
        transition={{ 
          x: { type: 'spring', damping: 20, stiffness: 100 },
          y: { type: 'spring', damping: 20, stiffness: 100 },
          scale: { type: 'tween', duration: 0.3 }
        }}
        className="absolute top-0 left-0"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.65376 12.3822L17.4452 3.10505C18.6656 2.14447 20.354 3.83282 19.3934 5.05327L10.1163 16.8447C9.37934 17.7816 8.01428 17.7126 7.37129 16.7077L5.34005 13.5332C4.85764 12.7792 5.05047 11.8542 5.65376 12.3822Z" fill="white" stroke="black" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          style={{
            position: 'absolute',
            ...(tooltipPosition === 'top' || tooltipPosition === 'bottom' 
              ? { left: tooltipStyle.left, transform: 'translateX(-50%)' } 
              : {}),
            ...(tooltipPosition === 'top' ? { bottom: tooltipStyle.bottom } : {}),
            ...(tooltipPosition === 'bottom' ? { top: tooltipStyle.top } : {}),
            ...(tooltipPosition === 'left' ? { top: tooltipStyle.top, right: tooltipStyle.right, transform: 'translateY(-50%)' } : {}),
            ...(tooltipPosition === 'right' ? { top: tooltipStyle.top, left: tooltipStyle.left, transform: 'translateY(-50%)' } : {}),
          }}
          className="bg-indigo-600 text-white p-4 rounded-xl shadow-2xl max-w-xs pointer-events-auto z-[10000]"
        >
          <p className="text-sm font-bold leading-relaxed">{currentStep.text}</p>
          <div className={`absolute w-3 h-3 bg-indigo-600 rotate-45 ${
            tooltipPosition === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2' :
            tooltipPosition === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2' :
            tooltipPosition === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2' :
            'left-[-6px] top-1/2 -translate-y-1/2'
          }`} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
