'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Flame, Shield, Award, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

interface HeroSectionProps {
  ready?: boolean;
}

export default function HeroSection({ ready = true }: HeroSectionProps) {
  const { personal, metrics, techStack } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const lanternLayerRef = useRef<HTMLDivElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // 1. Text reveal per baris with overflow hidden mask
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-line-inner',
          { yPercent: 100 },
          { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-paragraph',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-tech-item',
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          characterRef.current,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=1.0'
        )
        .fromTo(
          '.hero-metric-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
          '-=0.6'
        );

      if (!prefersReducedMotion) {
        // 2. Living lights: random flickering scale/opacity looping
        gsap.to('.hero-light-flicker', {
          scale: 'random(0.92, 1.06)',
          opacity: 'random(0.7, 1)',
          duration: 'random(0.8, 1.6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // 3. Floating cards yoyo animation (3s)
        gsap.to('.hero-floating-card', {
          y: -10,
          rotate: 1.5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });

        // 4. Scroll-Triggered Scene Exit: Character zoom-in (1 -> 1.15), text fades upward
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          animation: gsap
            .timeline()
            .to(characterRef.current, { scale: 1.15, yPercent: 10, ease: 'none' }, 0)
            .to('.hero-text-block', { y: -80, opacity: 0.15, ease: 'none' }, 0)
            .to('.hero-vignette-transition', { opacity: 0.8, ease: 'none' }, 0),
        });

        // 5. Fade out scroll indicator after first scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '150px top',
          onLeave: () => {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
          },
          onEnterBack: () => {
            gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 });
          },
        });
      }

      // 6. Mouse Parallax (3 Layers of depth, disabled on mobile/reduced motion)
      if (!isMobile && !prefersReducedMotion) {
        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xNorm = (e.clientX / innerWidth - 0.5) * 2;
          const yNorm = (e.clientY / innerHeight - 0.5) * 2;

          // Layer 1: Character (delicate ±12px)
          if (characterRef.current) {
            gsap.to(characterRef.current, {
              x: xNorm * 12,
              y: yNorm * 10,
              duration: 1.2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          // Layer 2: Lantern / Candles (opposite direction ±18px)
          if (lanternLayerRef.current) {
            gsap.to(lanternLayerRef.current, {
              x: -xNorm * 18,
              y: -yNorm * 14,
              duration: 1.2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          // Layer 3: Background glow blobs (±8px)
          if (bgLayerRef.current) {
            gsap.to(bgLayerRef.current, {
              x: xNorm * 8,
              y: yNorm * 6,
              duration: 1.8,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Dynamic Vignette Exit Transition Overlay */}
      <div className="hero-vignette-transition fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#0B0818]/40 to-[#0B0818] opacity-0 z-30 transition-opacity" />

      {/* Layer 3: Background Ambient Light Blobs (Parallax Layer) */}
      <div ref={bgLayerRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#5B3FD1]/20 via-[#E0529C]/15 to-transparent rounded-full blur-[140px]" />
        <div className="hero-light-flicker absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#FFB347]/20 via-[#FF7A3D]/10 to-transparent rounded-full blur-[130px] will-change-transform" />
        <div className="absolute inset-0 bg-[radial-gradient(#7B5CFF_1px,transparent_1px)] [background-size:36px_36px] opacity-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Line Reveal Typography & CTAs */}
          <div className="hero-text-block lg:col-span-7 flex flex-col items-start text-left will-change-transform">
            
            {/* Eyebrow badge */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1033] border border-[#E0529C]/40 mb-6 shadow-[0_0_20px_rgba(224,82,156,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#FFB347] animate-ping" />
              <span className="eyebrow-red text-[11px] tracking-[0.25em]">
                {personal.availability}
              </span>
            </div>

            {/* Headline Display with Overflow Hidden Line Masks */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl uppercase font-extrabold tracking-[0.02em] leading-[1.05] text-[#F4EEFF] mb-6 drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              {/* Line 1 Mask */}
              <div className="overflow-hidden">
                <div className="hero-line-inner will-change-transform">
                  CREATIVE DEVELOPER
                </div>
              </div>
              {/* Line 2 Mask */}
              <div className="overflow-hidden">
                <div className="hero-line-inner text-shimmer-gold will-change-transform">
                  THAT BUILDS WORLDS
                </div>
              </div>
            </h1>

            {/* Sub-headline & Bio */}
            <p className="hero-paragraph text-sm sm:text-base text-[#F4EEFF]/75 max-w-xl font-light leading-[1.75] mb-8">
              Membangun antarmuka web modern dengan arsitektur reaktif, performa 60 FPS tanpa latensi,
              dan estetika visual sinematik bergaya game AAA. Menghubungkan dunia kode yang tangguh
              dengan pengalaman pengguna yang memikat.
            </p>

            {/* Action CTA Buttons */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5B3FD1] via-[#7B5CFF] to-[#E0529C] text-white font-condensed text-xs tracking-[0.2em] font-bold shadow-[0_0_30px_rgba(123,92,255,0.4)] hover:shadow-[0_0_45px_rgba(224,82,156,0.6)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 overflow-hidden"
              >
                <span>EQUIP QUEST // VIEW PROJECTS</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1033]/80 border border-[#7B5CFF]/40 text-[#F4EEFF] font-condensed text-xs tracking-[0.2em] hover:border-[#E0529C] hover:bg-[#1A1033] hover:text-[#F5A3C7] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 backdrop-blur-sm"
              >
                <Flame size={14} className="text-[#FFB347]" />
                <span>INITIATE PACT // CONTACT</span>
              </a>
            </div>

            {/* Tech Stack Horizontal Strip with Small Labels */}
            <div className="w-full pt-4 border-t border-[#7B5CFF]/20">
              <span className="font-condensed text-[10px] text-[#F4EEFF]/50 tracking-[0.2em] block mb-3 uppercase">
                // ARSENAL & WEAPONRY STACK
              </span>

              <div className="flex flex-wrap items-center gap-2.5">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="hero-tech-item group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1033]/90 border border-[#7B5CFF]/30 text-xs font-mono text-[#F4EEFF]/85 hover:border-[#E0529C] hover:text-[#F5A3C7] transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B5CFF] group-hover:bg-[#E0529C] transition-colors" />
                    <span className="text-[11px] font-medium tracking-wide">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Character Avatar Showcase (Parallax Layer 1 & 2) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Layer 2: Lantern Opposite Parallax Layer & Living Light */}
            <div
              ref={lanternLayerRef}
              className="absolute -top-10 -right-6 w-32 h-32 rounded-full pointer-events-none z-10 will-change-transform"
            >
              <div className="hero-light-flicker w-full h-full bg-[#FFB347]/25 rounded-full blur-xl animate-pulse" />
            </div>

            {/* Glowing Ambient Halo */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#5B3FD1]/30 via-[#E0529C]/30 to-[#FFB347]/20 blur-2xl -z-10 animate-pulse-warm" />

            {/* Ornate Game Poster Frame with Parallax Layer 1 */}
            <div
              ref={characterRef}
              className="hero-floating-card relative w-full max-w-md rounded-2xl p-1 bg-gradient-to-b from-[#7B5CFF]/60 via-[#E0529C]/40 to-[#1A1033] shadow-[0_20px_60px_rgba(0,0,0,0.85)] group will-change-transform"
            >
              {/* Inner Container */}
              <div className="relative rounded-[14px] overflow-hidden bg-[#0B0818] border border-[#7B5CFF]/30">
                
                {/* Character Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/hero_character.jpg"
                    alt="Samuel Setiawan - Digital Craftsman and Sorcerer Coder"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0818] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Card Gem Accent */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0B0818]/85 border border-[#FFB347]/50 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,179,71,0.3)]">
                    <Sparkles size={11} className="text-[#FFB347] animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="font-condensed text-[10px] text-[#FFB347] tracking-widest font-bold">
                      SSR ARCHITECT
                    </span>
                  </div>
                </div>

                {/* Character Overlay Card Banner */}
                <div className="p-4 bg-gradient-to-b from-[#1A1033]/90 to-[#0B0818] border-t border-[#7B5CFF]/30 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-condensed text-[10px] text-[#F5A3C7] tracking-[0.2em]">
                      IDENTITY // CHARACTER
                    </span>
                    <span className="font-display font-bold text-base text-[#F4EEFF] tracking-wider">
                      SAMUEL SETIAWAN
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#5B3FD1]/30 border border-[#7B5CFF]/50 text-[11px] font-mono text-[#F4EEFF]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>LVL 99 ENGINEER</span>
                  </div>
                </div>

              </div>

              {/* Decorative Corner Ornaments */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#FFB347]" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#FFB347]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#E0529C]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#E0529C]" />
            </div>

            {/* Quick Micro Stat Badges */}
            <div className="mt-4 w-full max-w-md grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#1A1033]/60 border border-[#7B5CFF]/20 flex items-center gap-2.5">
                <Shield size={16} className="text-[#7B5CFF]" />
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-xs text-[#F4EEFF]">Zero Latency</span>
                  <span className="text-[10px] text-[#F4EEFF]/60 font-mono">60 FPS Fluidity</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1A1033]/60 border border-[#7B5CFF]/20 flex items-center gap-2.5">
                <Award size={16} className="text-[#FFB347]" />
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-xs text-[#F4EEFF]">100% Core Vitals</span>
                  <span className="text-[10px] text-[#F4EEFF]/60 font-mono">Lighthouse Grade</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Live Metrics Counter Bar (Bottom of Hero) */}
        <div className="mt-16 w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#1A1033]/90 via-[#2D1A54]/70 to-[#1A1033]/90 border border-[#7B5CFF]/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="hero-metric-card flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#0B0818]/60 border border-white/5 relative group hover:border-[#E0529C]/40 transition-colors"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EEFF] to-[#FFB347]">
                  {item.value}
                </span>
              </div>
              <span className="font-condensed text-xs text-[#F5A3C7] tracking-[0.15em] uppercase font-semibold mt-1">
                {item.label}
              </span>
              <span className="text-[10px] font-mono text-[#F4EEFF]/50 mt-0.5">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Scroll Indicator at bottom edge (fades out on scroll) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-opacity duration-300 pointer-events-none"
      >
        <span className="font-condensed text-[10px] text-[#F5A3C7] tracking-[0.25em] uppercase font-semibold">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-[#7B5CFF]/60 flex items-start justify-center p-1 bg-[#1A1033]/50">
          <div className="w-1.5 h-2 rounded-full bg-[#E0529C] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
