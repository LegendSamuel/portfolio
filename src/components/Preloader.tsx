'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('Inisialisasi Antarmuka Mistis...');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 8;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setStatusText('Gerbang Digital Terbuka.');
        clearInterval(interval);

        // Smooth curtain reveal
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to('#preloader-content', {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.inOut',
        }).to('#preloader-curtain', {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      } else {
        setPercent(current);
        if (current > 70) setStatusText('Menghubungkan Jaringan 60 FPS...');
        else if (current > 40) setStatusText('Membuka Grimoire Komponen...');
        else if (current > 15) setStatusText('Memuat Artifak Sinematik...');
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="preloader-curtain"
      className="fixed inset-0 z-50 bg-[#0B0818] flex flex-col items-center justify-center will-change-transform"
    >
      <div id="preloader-content" className="relative flex flex-col items-center max-w-xs w-full px-6 text-center">
        
        {/* Japanese Sigil Monogram with Rotating Golden & Violet Ring */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-2xl border border-[#7B5CFF]/30 animate-spin" style={{ animationDuration: '14s' }} />
          <div className="absolute -inset-1 rounded-2xl border-t-2 border-[#E0529C] animate-spin" style={{ animationDuration: '2.5s' }} />
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A1033] to-[#2D1A54] border border-[#7B5CFF]/50 flex items-center justify-center shadow-[0_0_25px_rgba(123,92,255,0.4)]">
            <span className="font-display font-bold text-base text-[#F5A3C7]">匠</span>
          </div>
        </div>

        {/* Monogram Name */}
        <span className="font-display font-bold text-sm tracking-[0.25em] text-[#F4EEFF] uppercase mb-1">
          SAMUEL SETIAWAN
        </span>
        <span className="font-condensed text-[10px] text-[#F4EEFF]/50 tracking-[0.2em] uppercase mb-5">
          SENIOR FRONTEND ARCHITECT
        </span>

        {/* Step Status Text */}
        <div className="h-5 overflow-hidden mb-3">
          <span className="font-mono text-[11px] text-[#FFB347] tracking-wider uppercase block transition-all duration-200">
            {statusText}
          </span>
        </div>

        {/* Sleek Progress Bar with Glowing Head */}
        <div className="w-full h-1 bg-[#1A1033] rounded-full overflow-hidden border border-white/5 relative mb-2">
          <div
            className="h-full bg-gradient-to-r from-[#5B3FD1] via-[#E0529C] to-[#FFB347] transition-all duration-150 ease-out rounded-full shadow-[0_0_10px_#E0529C]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#F4EEFF]/50">
          <span>SYSTEM INIT</span>
          <span className="text-[#F5A3C7] font-bold">{percent}%</span>
        </div>

      </div>
    </div>
  );
}
