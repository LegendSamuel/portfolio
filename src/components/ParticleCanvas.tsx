'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  type: 'firefly' | 'sakura' | 'starlight';
  angle?: number;
  spin?: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 20000), 55);

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let type: 'firefly' | 'sakura' | 'starlight' = 'firefly';
        let color = '#FFB347'; // amber firefly

        if (rand > 0.65) {
          type = 'sakura';
          color = '#F5A3C7'; // pink sakura
        } else if (rand > 0.4) {
          type = 'starlight';
          color = '#B79CFF'; // lavender starlight
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (type === 'sakura' ? 0.8 : 0.4),
          vy: type === 'sakura' ? Math.random() * 0.7 + 0.3 : (Math.random() - 0.5) * 0.5,
          size: type === 'sakura' ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1.2,
          alpha: Math.random() * 0.6 + 0.2,
          color,
          type,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
        });
      }
    }

    initParticles();

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Gentle wrapping
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse slight repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }

        ctx.save();
        if (p.type === 'sakura') {
          // Draw soft sakura petal
          p.angle = (p.angle || 0) + (p.spin || 0.01);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'firefly') {
          // Firefly pulsing glow
          const glowAlpha = Math.max(0.1, p.alpha + Math.sin(tick * 0.05 + i) * 0.25);
          ctx.globalAlpha = glowAlpha;

          // Outer halo
          const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          radGrad.addColorStop(0, 'rgba(255, 179, 71, 0.8)');
          radGrad.addColorStop(0.4, 'rgba(255, 122, 61, 0.3)');
          radGrad.addColorStop(1, 'rgba(255, 179, 71, 0)');

          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = '#FFF7D6';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Starlight shimmer
          ctx.globalAlpha = Math.max(0.15, p.alpha + Math.sin(tick * 0.03 + i * 2) * 0.3);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      aria-hidden="true"
    />
  );
}
