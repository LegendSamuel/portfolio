'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Code, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export default function AboutSection() {
  const { personal } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardFrameRef = useRef<HTMLDivElement | null>(null);
  const cardImageInnerRef = useRef<HTMLDivElement | null>(null);
  const foregroundRidgeRef = useRef<HTMLDivElement | null>(null);
  const backgroundMistRef = useRef<HTMLDivElement | null>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Text reveals: heading per line, eyebrow left to right
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.about-eyebrow',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.about-title-line',
          { yPercent: 100 },
          { yPercent: 0, duration: 1.0, stagger: 0.12, ease: 'expo.out' },
          '-=0.4'
        )
        .fromTo(
          '.about-desc-p',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.about-principle-badge',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.about-terminal-box',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );

      // 2. Big Framed Card: slide-in from right (x: 150 -> 0, rotate: 4deg -> 0)
      gsap.fromTo(
        cardFrameRef.current,
        { x: 150, rotate: 4, opacity: 0 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardFrameRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Inverse parallax inside artwork (image moves slower than frame)
      if (cardImageInnerRef.current) {
        gsap.to(cardImageInnerRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Multi-layer depth scroll parallax: Foreground ridge 1.3x speed, background 0.6x speed
      if (foregroundRidgeRef.current) {
        gsap.to(foregroundRidgeRef.current, {
          y: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        });
      }

      if (backgroundMistRef.current) {
        gsap.to(backgroundMistRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    // 5. Magnetic CTA Button Logic (attracted within 80px radius)
    const btn = magneticBtnRef.current;
    if (btn && !prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

        if (dist < 80) {
          const moveX = (e.clientX - btnCenterX) * 0.35;
          const moveY = (e.clientY - btnCenterY) * 0.35;
          gsap.to(btn, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-28 sm:py-36 bg-gradient-to-b from-[#120A24] via-[#0D0B1D] to-[#1A1033] overflow-hidden border-t border-[#7B5CFF]/20"
    >
      {/* Background Mountain Silhouette & Mist Parallax Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft firefly glow blobs (Background layer, 0.6x) */}
        <div ref={backgroundMistRef} className="absolute inset-0 will-change-transform">
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#FFB347]/10 rounded-full blur-[120px] animate-pulse-warm" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#7B5CFF]/15 rounded-full blur-[140px]" />
        </div>

        {/* Foreground Mountain Ridge Silhouette (1.3x speed) */}
        <div
          ref={foregroundRidgeRef}
          className="absolute bottom-0 inset-x-0 h-48 opacity-35 pointer-events-none will-change-transform"
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#0B0818]">
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Narrative, Philosophy & Terminal */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow sliding left to right */}
            <div className="about-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1033] border border-[#E0529C]/40 mb-4 shadow-[0_0_15px_rgba(224,82,156,0.2)] will-change-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0529C] animate-pulse" />
              <span className="eyebrow-red text-[11px] tracking-[0.25em]">
                CHRONICLES // DESIGN & CODE MASTERY
              </span>
            </div>

            {/* Heading with 2 Line Masks */}
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-extrabold tracking-[0.02em] leading-[1.05] text-[#F4EEFF] mb-6">
              <div className="overflow-hidden">
                <div className="about-title-line will-change-transform">
                  TRANSLATING COMPLEXITY
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="about-title-line text-transparent bg-clip-text bg-gradient-to-r from-[#F5A3C7] via-[#B79CFF] to-[#FFB347] will-change-transform">
                  INTO DIGITAL MAGIC
                </div>
              </div>
            </h2>

            {/* Narrative Description */}
            <div className="flex flex-col gap-4 text-sm sm:text-base text-[#F4EEFF]/80 font-light leading-relaxed mb-8">
              <p className="about-desc-p">
                Saya mendedikasikan keahlian teknik untuk merekayasa antarmuka web yang tidak hanya
                memiliki estetika kelas poster AAA, namun juga bertopang pada arsitektur kode modern,
                skalabilitas komponen modular, dan performa 60 FPS tanpa jeda.
              </p>
              <p className="about-desc-p text-xs sm:text-sm text-[#F4EEFF]/65">
                Setiap detail micro-interaction, transisi antar halaman, hingga optimasi metrik Core Web
                Vitals diperhitungkan secara presisi demi memastikan pengguna merasakan pengalaman
                digital yang mulus, responsif, dan meningkatkan rasio konversi secara maksimal.
              </p>
            </div>

            {/* Principles Badges */}
            <div className="grid grid-cols-3 gap-3 w-full mb-8">
              <div className="about-principle-badge p-3 rounded-xl bg-[#1A1033]/80 border border-[#7B5CFF]/30 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#38BDF8]">
                  <Zap size={14} />
                  <span className="font-display font-bold text-xs text-white">0.6s Load</span>
                </div>
                <span className="text-[10px] text-[#F4EEFF]/60 font-mono">Ultra-fast FCP</span>
              </div>

              <div className="about-principle-badge p-3 rounded-xl bg-[#1A1033]/80 border border-[#7B5CFF]/30 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#E0529C]">
                  <Sparkles size={14} />
                  <span className="font-display font-bold text-xs text-white">60 FPS</span>
                </div>
                <span className="text-[10px] text-[#F4EEFF]/60 font-mono">Fluid GPU Motion</span>
              </div>

              <div className="about-principle-badge p-3 rounded-xl bg-[#1A1033]/80 border border-[#7B5CFF]/30 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#10B981]">
                  <ShieldCheck size={14} />
                  <span className="font-display font-bold text-xs text-white">Strict TS</span>
                </div>
                <span className="text-[10px] text-[#F4EEFF]/60 font-mono">Type-safe Clean Code</span>
              </div>
            </div>

            {/* Magnetic CTA Button with Shine Sweep on Hover */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                ref={magneticBtnRef}
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F4EEFF] hover:bg-[#B79CFF] text-[#0B0818] font-condensed text-xs tracking-[0.2em] font-bold shadow-[0_0_25px_rgba(244,238,255,0.4)] hover:shadow-[0_0_35px_rgba(183,156,255,0.6)] overflow-hidden transition-all duration-300 will-change-transform"
              >
                <span>VIEW CASE STUDY // INVENTORY</span>
                <ArrowUpRight size={15} />
                {/* Shine Sweep Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1033] border border-[#7B5CFF]/40 text-[#F4EEFF] font-condensed text-xs tracking-[0.2em] hover:border-[#E0529C] hover:text-[#F5A3C7] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Code size={14} className="text-[#38BDF8]" />
                <span>EXPLORE TECH ARSENAL</span>
              </a>
            </div>

            {/* Interactive Code Terminal (Samuel Setiawan Spec) */}
            <div className="about-terminal-box w-full rounded-2xl bg-[#0B0818]/90 border border-[#7B5CFF]/30 shadow-xl overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#1A1033]/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-[#F4EEFF]/60 ml-2">architect.config.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>ONLINE // ACTIVE</span>
                </div>
              </div>

              <div className="p-4 text-[#F4EEFF]/75 space-y-1 overflow-x-auto leading-relaxed">
                <div>
                  <span className="text-[#7B5CFF]">const</span> <span className="text-[#38BDF8]">architect</span>:{' '}
                  <span className="text-[#F5A3C7]">Developer</span> = {'{'}
                </div>
                <div className="pl-4">
                  name: <span className="text-[#FFB347]">&apos;{personal.name}&apos;</span>,
                </div>
                <div className="pl-4">
                  role: <span className="text-[#FFB347]">&apos;{personal.title}&apos;</span>,
                </div>
                <div className="pl-4">
                  location: <span className="text-[#FFB347]">&apos;{personal.location}&apos;</span>,
                </div>
                <div className="pl-4">
                  coreStack: [
                  <span className="text-[#38BDF8]">&apos;Next.js 15&apos;</span>,{' '}
                  <span className="text-[#38BDF8]">&apos;React 19&apos;</span>,{' '}
                  <span className="text-[#38BDF8]">&apos;TypeScript&apos;</span>,{' '}
                  <span className="text-[#38BDF8]">&apos;Tailwind CSS&apos;</span>],
                </div>
                <div className="pl-4">
                  philosophy: () =&gt; <span className="text-[#10B981]">&apos;Pixel Perfection + 60 FPS Fluidity&apos;</span>
                </div>
                <div>{'};'}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Slide-in Framed Card with Inverse Artwork Parallax */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-[#7B5CFF]/30 via-[#E0529C]/25 to-[#FFB347]/20 blur-2xl -z-10 animate-pulse-warm" />

            <div
              ref={cardFrameRef}
              className="relative w-full max-w-lg rounded-3xl p-1.5 bg-gradient-to-b from-[#7B5CFF] via-[#E0529C]/50 to-[#120A24] shadow-[0_25px_70px_rgba(0,0,0,0.85)] group will-change-transform"
            >
              <div className="relative rounded-[22px] overflow-hidden bg-[#0B0818] border border-[#7B5CFF]/40">
                
                {/* Artwork with Inverse Parallax Inner Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <div ref={cardImageInnerRef} className="relative w-full h-[120%] -top-[10%] will-change-transform">
                    <Image
                      src="/images/about_mastery.jpg"
                      alt="Samuel Setiawan Mastery Studio Sanctuary"
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Gradient seamless bottom blend into mountain silhouettes */}
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B0818] via-[#0B0818]/70 to-transparent" />
                  
                  {/* Floating firefly badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0B0818]/80 backdrop-blur-md border border-[#FFB347]/50 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#FFB347] animate-ping" />
                    <span className="font-condensed text-xs text-[#FFB347] tracking-widest font-bold">
                      ASTRAL WORKSHOP
                    </span>
                  </div>
                </div>

                {/* Bottom Card Integration Content */}
                <div className="relative z-10 p-5 bg-[#0B0818] border-t border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-condensed text-xs text-[#F5A3C7] tracking-[0.2em] font-bold">
                      MASTER CRAFT DOMAIN
                    </span>
                    <span className="text-[11px] font-mono text-[#FFB347]">
                      EST. 2019 - 2026
                    </span>
                  </div>
                  <p className="text-xs text-[#F4EEFF]/70 font-light">
                    Sistem arsitektur web dirancang dengan prinsip modularitas tinggi, menjamin
                    kecepatan render kilat pada perangkat desktop maupun mobile.
                  </p>
                </div>

              </div>

              {/* Japanese Carved Corner Accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#FFB347]" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#FFB347]" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#E0529C]" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#E0529C]" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
