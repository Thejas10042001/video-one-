import React, { useEffect, useRef } from 'react';

interface RocketExhaustProps {
  isMoving: boolean;
  position: { x: number; y: number };
}

export const RocketExhaust: React.FC<RocketExhaustProps> = ({ isMoving, position }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const createParticle = () => {
      if (!isMoving && Math.random() > 0.1) return;
      
      const velocityScale = isMoving ? 2 : 1;
      particles.current.push({
        x: position.x + 80, // Offset to match mascot center
        y: position.y + 110,
        vx: (Math.random() - 0.5) * 4 * velocityScale + (isMoving ? -10 : 0),
        vy: Math.random() * 4 * velocityScale + 2,
        life: 1.0,
        size: Math.random() * 6 + 2,
        color: Math.random() > 0.5 ? '#6366f1' : '#f43f5e',
        prevX: position.x + 80,
        prevY: position.y + 110
      });
    };

    const update = () => {
      createParticle();
      
      // Motion blur trail effect on the background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      
      particles.current = particles.current.filter(p => p.life > 0);
      
      particles.current.forEach(p => {
        p.prevX = p.x;
        p.prevY = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        p.size *= 0.97;
        
        ctx.globalAlpha = p.life;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        
        // Glow effect
        ctx.shadowBlur = isMoving ? 15 : 5;
        ctx.shadowColor = p.color;
      });
      
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMoving, position]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};
