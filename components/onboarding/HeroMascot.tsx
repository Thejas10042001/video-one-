import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { HeroExpression, HeroGesture } from '../../types/onboarding';

interface HeroMascotProps {
  expression: HeroExpression;
  gesture: HeroGesture;
  isMoving: boolean;
  lookAt?: { x: number; y: number };
  heroPos?: { x: number; y: number };
}

export const HeroMascot: React.FC<HeroMascotProps> = ({ expression, gesture, isMoving, lookAt, heroPos }) => {
  // Eye gaze calculation
  const gazeOffset = useMemo(() => {
    if (!lookAt || !heroPos) return { x: 0, y: 0 };
    
    const dx = lookAt.x - (heroPos.x + 80); // 80 is half of w-40 (160px)
    const dy = lookAt.y - (heroPos.y + 80);
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(2, Math.sqrt(dx * dx + dy * dy) / 100); // Max 2px offset
    
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist
    };
  }, [lookAt, heroPos]);

  // Expression variants
  const mouthPath = useMemo(() => {
    switch (expression) {
      case 'happy': return "M 42 62 Q 50 70 58 62";
      case 'thinking': return "M 45 65 Q 50 62 55 65";
      case 'serious': return "M 45 65 L 55 65";
      case 'surprised': return "M 47 65 A 3 3 0 1 0 53 65 A 3 3 0 1 0 47 65";
      case 'explaining': return "M 42 65 Q 50 68 58 65";
      case 'celebrating': return "M 40 62 Q 50 75 60 62";
      default: return "M 45 67 Q 50 67 55 67";
    }
  }, [expression]);

  const eyeY = expression === 'surprised' ? 48 : 52;
  const eyeHeight = expression === 'thinking' ? 1.5 : 4;

  return (
    <div className="relative w-40 h-40 select-none pointer-events-none">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-2xl"
        animate={{
          y: isMoving ? [0, -10, 0] : [0, -4, 0],
          rotate: isMoving ? [0, 2, -2, 0] : 0,
          filter: isMoving ? "url(#motionBlur)" : "none"
        }}
        transition={{
          duration: isMoving ? 0.4 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <defs>
          <filter id="motionBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
          <linearGradient id="boardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Modern AI Skateboard */}
        <motion.g
          animate={{
            rotate: isMoving ? [-2, 2, -2] : 0
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          {/* Main Board Body - Made taller */}
          <path 
            d="M 12 88 Q 10 85 15 85 L 85 85 Q 90 85 88 88 L 85 97 Q 80 99 20 99 L 15 97 Z" 
            fill="url(#boardGrad)" 
            stroke="#6366f1" 
            strokeWidth="0.5" 
          />
          
          {/* "!" Logo on the left - Repositioned for more space */}
          <g transform="translate(18, 92)">
            <circle cx="0" cy="0" r="4" fill="#6366f1" />
            <circle cx="0" cy="0" r="3.5" fill="#f43f5e" />
            <text x="0" y="1.5" fontSize="6" fontWeight="900" textAnchor="middle" fill="white" style={{ fontFamily: 'Inter, sans-serif' }}>!</text>
          </g>

          {/* SPIKED AI Text in center of board */}
          <text 
            x="52" y="93.5" 
            fontSize="5.5" 
            fontWeight="900" 
            textAnchor="middle" 
            fill="white" 
            className="font-black tracking-tighter"
            style={{ fontFamily: 'Inter, sans-serif', opacity: 0.9 }}
          >
            SPIKED <tspan fill="#f43f5e">AI</tspan>
          </text>

          {/* Futuristic Hover Wheels */}
          <g>
            <rect x="25" y="97" width="10" height="3" rx="1.5" fill="#6366f1" opacity="0.8" />
            <rect x="65" y="97" width="10" height="3" rx="1.5" fill="#6366f1" opacity="0.8" />
          </g>
        </motion.g>

        {/* Human Body */}
        <g>
          {/* Legs */}
          <rect x="42" y="75" width="6" height="15" fill="#334155" />
          <rect x="52" y="75" width="6" height="15" fill="#334155" />
          
          {/* Torso (The T-Shirt) */}
          <path d="M 35 55 L 65 55 L 68 80 L 32 80 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          
          {/* T-Shirt Brand Details */}
          <g transform="translate(50, 68)">
            {/* Spiked Logo (The Spike) */}
            <path d="M -8 2 L 0 -12 L 8 2 Z" fill="#f43f5e" />
            <path d="M -4 2 L 0 -8 L 4 2 Z" fill="#ffffff" />
            
            {/* SpikedAI Text */}
            <text 
              x="0" y="8" 
              fontSize="5" 
              fontWeight="900" 
              textAnchor="middle" 
              className="font-black uppercase tracking-tighter"
              fill="#0f172a"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              SPIKED<tspan fill="#f43f5e">AI</tspan>
            </text>
          </g>

          {/* Arms */}
          <motion.g animate={gesture === 'point' ? { rotate: -45, x: -5, y: -5 } : {}}>
             <rect x="28" y="55" width="10" height="6" rx="3" fill="#ffffff" />
             <rect x="20" y="55" width="10" height="4" rx="2" fill="#ffdbac" /> {/* Skin tone arm */}
          </motion.g>
          
          <motion.g 
            animate={gesture === 'wave' ? { rotate: [0, 60, 0], x: [0, 5, 0], y: [0, -5, 0] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
             <rect x="62" y="55" width="10" height="6" rx="3" fill="#ffffff" />
             <rect x="70" y="55" width="10" height="4" rx="2" fill="#ffdbac" />
          </motion.g>

          {/* Head */}
          <g>
            {/* Neck */}
            <rect x="47" y="50" width="6" height="6" fill="#ffdbac" />
            
            {/* Face Shape */}
            <rect x="38" y="38" width="24" height="28" rx="8" fill="#ffdbac" />
            
            {/* Hair (Rad Style) */}
            <path d="M 36 45 Q 35 30 50 30 Q 65 30 64 45 L 66 38 Q 50 25 34 38 Z" fill="#4b2c20" />
            
            {/* Eyes */}
            <motion.ellipse 
              cx={45 + gazeOffset.x} cy={eyeY + gazeOffset.y} rx="1.5" ry={eyeHeight} fill="#0f172a" 
              animate={{ scaleY: [1, 0.1, 1] }} 
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.ellipse 
              cx={55 + gazeOffset.x} cy={eyeY + gazeOffset.y} rx="1.5" ry={eyeHeight} fill="#0f172a" 
              animate={{ scaleY: [1, 0.1, 1] }} 
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            
            {/* Mouth */}
            <path d={mouthPath} stroke="#4b2c20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </motion.svg>
    </div>
  );
};
