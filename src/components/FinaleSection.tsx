'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Clock, Globe, Send, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export default function FinaleSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [timeJakarta, setTimeJakarta] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Landing Page & Frontend Architecture',
    message: '',
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const layerMountainRef = useRef<HTMLDivElement | null>(null);
  const layerPagodaRef = useRef<HTMLDivElement | null>(null);
  const layerBridgeRef = useRef<HTMLDivElement | null>(null);
  const layerForegroundRef = useRef<HTMLDivElement | null>(null);
  const brushStrokeRef = useRef<HTMLDivElement | null>(null);
  const logotypeRef = useRef<HTMLHeadingElement | null>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Real-time Jakarta Clock (WIB / UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeJakarta(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP 5-Layer Parallax & Logotype Reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Five Parallax Layers
      // Layer 2: Distant mountains (speed 0.2x)
      if (layerMountainRef.current) {
        gsap.to(layerMountainRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.2,
          },
        });
      }

      // Layer 3: Pagoda temple & lanterns (speed 0.5x)
      if (layerPagodaRef.current) {
        gsap.to(layerPagodaRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Layer 4: Arched wooden bridge (speed 0.8x)
      if (layerBridgeRef.current) {
        gsap.to(layerBridgeRef.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Layer 5: Foreground rock bank (speed 1.2x)
      if (layerForegroundRef.current) {
        gsap.to(layerForegroundRef.current, {
          y: -160,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Cranes breathing floating animation
      gsap.to('.crane-svg', {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. Horizontal Mist Drift Loop (30s)
      gsap.to('.mist-horizontal-drift', {
        x: '-20%',
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // 4. Logotype Reveal: letter-spacing 0.6em -> 0.3em, blur 12px -> 0, opacity 0 -> 1 (1.4s)
      const finaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: logotypeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Japanese Red Brush Stroke Wipes in from left to right via clipPath
      if (brushStrokeRef.current) {
        finaleTl.fromTo(
          brushStrokeRef.current,
          { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power2.inOut' }
        );
      }

      if (logotypeRef.current) {
        finaleTl.fromTo(
          logotypeRef.current,
          {
            letterSpacing: '0.6em',
            filter: 'blur(12px)',
            opacity: 0,
            y: 20,
          },
          {
            letterSpacing: '0.3em',
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
          },
          '-=0.9'
        );
      }

      finaleTl
        .fromTo(
          '.finale-sub-title',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.finale-narrative',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaBtnRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          '#inquiry-box',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen py-28 sm:py-36 overflow-hidden flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, #120A24 0%, #2D1A54 22%, #6B3478 45%, #B79CFF 70%, #F7A8C4 100%)',
      }}
    >
      {/* ================= 5-LAYER SUNSET SCENIC ARTWORK ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Layer 1: Sky Glowing Sun & Ethereal Aura */}
        <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-t from-[#FFF0F5] via-[#F7A8C4] to-transparent opacity-85 blur-2xl animate-pulse-warm" />

        {/* Breathing Cranes across twilight pastel sky */}
        <div className="crane-svg absolute top-24 left-16 opacity-75 will-change-transform">
          <svg width="130" height="65" viewBox="0 0 120 60" fill="none" className="text-white/85">
            <path d="M15,25 Q25,10 40,20 Q30,15 15,25 Z" fill="currentColor" />
            <path d="M15,25 Q25,40 40,30 Q30,35 15,25 Z" fill="currentColor" />
            <circle cx="12" cy="25" r="1.5" fill="currentColor" />
            <path d="M70,15 Q80,2 95,10 Q85,7 70,15 Z" fill="currentColor" />
            <path d="M70,15 Q80,28 95,20 Q85,23 70,15 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Layer 2: Distant Mountains (0.2x speed) */}
        <div ref={layerMountainRef} className="absolute bottom-44 inset-x-0 h-[420px] opacity-65 will-change-transform">
          <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full fill-[#31174D]">
            <path d="M0,400 L0,320 L300,280 L520,180 Q720,80 920,180 L1140,280 L1440,320 L1440,400 Z" />
          </svg>
        </div>

        {/* Layer 3: Pagoda Temple complex & Lantern fires (0.5x speed) */}
        <div ref={layerPagodaRef} className="absolute bottom-24 inset-x-0 h-80 opacity-85 will-change-transform">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-[#1A0C2E]">
            <path d="M80,320 L80,180 L60,180 L90,140 L70,140 L100,100 L95,60 L105,60 L100,100 L130,140 L110,140 L140,180 L120,180 L120,320 Z" />
            <path d="M50,180 Q100,165 150,180 L140,190 L60,190 Z" fill="#2B124C" />
            <path d="M65,140 Q100,128 135,140 L128,148 L72,148 Z" fill="#2B124C" />
          </svg>
          {/* Flickering Lantern Lights */}
          <div className="absolute bottom-28 left-[98px] w-6 h-6 rounded-full bg-[#FFB347] blur-[5px] animate-pulse-warm" />
          <div className="absolute bottom-28 right-[170px] w-5 h-5 rounded-full bg-[#FF7A3D] blur-[4px] animate-pulse-warm" />
        </div>

        {/* Layer 4: Arched Wooden Bridge & River Mist (0.8x speed) */}
        <div ref={layerBridgeRef} className="absolute bottom-16 inset-x-0 h-72 opacity-90 will-change-transform">
          <svg viewBox="0 0 1440 280" preserveAspectRatio="none" className="w-full h-full fill-[#200D36]">
            <path d="M480,280 Q720,200 960,280 L940,280 Q720,220 500,280 Z" fill="#3D1863" />
            <path d="M520,250 Q720,190 920,250 L920,260 Q720,200 520,260 Z" fill="#4C1D6E" />
          </svg>
        </div>

        {/* Drifting Horizontal Mist Layer (Loop 30s) */}
        <div className="mist-horizontal-drift absolute bottom-12 left-0 w-[200%] h-32 opacity-25 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none will-change-transform" />

        {/* Layer 5: Foreground Rock Bank & Dark Fade (1.2x speed) */}
        <div
          ref={layerForegroundRef}
          className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#0B0818] via-[#0B0818]/90 to-transparent will-change-transform"
        />
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center my-auto">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0818]/80 border border-[#F5A3C7]/40 mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(247,168,196,0.3)]">
          <Sparkles size={12} className="text-[#FFB347]" />
          <span className="eyebrow-red text-xs tracking-[0.25em]">
            FINALE SCENE 
          </span>
        </div>

        {/* Massive Glowing Logotype with Red Japanese Brush Stroke Behind */}
        <div className="relative my-4 flex flex-col items-center">
          {/* Red Japanese Brush Stroke (Wipes from left to right via GSAP) */}
          <div
            ref={brushStrokeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[75%] bg-gradient-to-r from-[#BE185D]/40 via-[#E0529C]/50 to-[#BE185D]/40 blur-xl rounded-full pointer-events-none -z-10 will-change-transform"
          />

          {/* Samuel Setiawan Logotype */}
          <h2
            ref={logotypeRef}
            className="font-logotype text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-[#F4EEFF] drop-shadow-[0_0_35px_rgba(244,238,255,0.7)] will-change-transform"
          >
            SAMUEL SETIAWAN
          </h2>

          <p className="finale-sub-title font-condensed text-xs sm:text-sm text-[#F4EEFF]/90 tracking-[0.25em] uppercase font-semibold mt-3">
            PORTFOLIO 2026
          </p>
        </div>
        {/* Big Translucent White/Lavender CTA Button with Soft Repeating Pulse Glow */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            ref={ctaBtnRef}
            href="#inquiry-box"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/50 text-white font-condensed text-sm tracking-[0.2em] font-extrabold backdrop-blur-xl shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(247,168,196,0.6)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
          >
            <span>HIRE ME // START A PROJECT</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#0B0818]/60 hover:bg-[#0B0818]/80 border border-white/20 text-[#F4EEFF] font-mono text-xs backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
            title="Salin Email ke Clipboard"
          >
            {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} className="text-[#F5A3C7]" />}
            <span>{copied ? 'EMAIL TERSALIN!' : personal.email}</span>
          </button>
        </div>

        {/* Interactive Inquiry Form Box */}
        <div
          id="inquiry-box"
          className="w-full max-w-4xl p-6 sm:p-10 rounded-3xl bg-[#0B0818]/80 border border-[#7B5CFF]/40 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-left will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <span className="font-condensed text-xs text-[#F5A3C7] tracking-[0.2em] uppercase font-bold">
                  DIRECT LINE
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-1">
                  Mulai Kolaborasi
                </h3>
                <p className="text-xs sm:text-sm text-[#F4EEFF]/70 font-light mt-2 leading-relaxed">
                  Tuliskan rencana proyek, jadwal peluncuran, atau scope kebutuhan Anda. Respon dalam
                  waktu &lt; 24 jam dijamin.
                </p>
              </div>

              <div className="flex flex-col gap-3 font-mono text-xs">
                {/* Real-time Clock */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FFB347]/10 text-[#FFB347]">
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#F4EEFF]/50 uppercase">Jakarta Time (WIB UTC+7)</span>
                    <span className="font-bold text-[#F4EEFF]">{timeJakarta || '09:00:00 WIB'}</span>
                  </div>
                </div>

                {/* Working Location */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8]">
                    <Globe size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#F4EEFF]/50 uppercase">Availability</span>
                    <span className="font-bold text-[#10B981]">Worldwide Remote // Open</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-[#5B3FD1]/20 border border-[#E0529C]">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mb-3">
                    <Check size={24} />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs text-[#F4EEFF]/70 mt-1 max-w-xs">
                    Terima kasih telah menghubungi saya. Saya akan segera meninjau pesan Anda dan membalas
                    melalui email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Raditya Pratama"
                        className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                        Email Perusahaan / Pribadi
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="raditya@startup.com"
                        className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                      Fokus Kebutuhan
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all"
                    >
                      <option value="Landing Page & Frontend Architecture">Landing Page Berkinerja Tinggi (Game / AAA Style)</option>
                      <option value="Full-Stack Web Application / SaaS">Pengembangan Aplikasi Web / SaaS Modern</option>
                      <option value="Frontend Modernization & Performance">Modernisasi Frontend & Audit 100/100 Core Vitals</option>
                      <option value="Consultancy & Web Architecture">Konsultasi Arsitektur Digital & Design System</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                      Ringkasan Kebutuhan
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan tentang proyek Anda, target waktu, dan ekspektasi yang diinginkan..."
                      className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5B3FD1] via-[#7B5CFF] to-[#E0529C] text-white font-condensed font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(224,82,156,0.5)] hover:shadow-[0_0_35px_rgba(245,163,199,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <span>TRANSMIT PACT MESSAGE</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
