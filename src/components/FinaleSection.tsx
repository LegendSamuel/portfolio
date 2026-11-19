'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Clock, Globe, Send, Sparkles, ArrowRight, FileText } from 'lucide-react';
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
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center my-auto">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1033]/90 border border-[#E0529C]/40 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(224,82,156,0.25)]">
          <Sparkles size={13} className="text-[#F5A3C7]" />
          <span className="eyebrow-red text-xs tracking-[0.25em]">
            GET IN TOUCH // CONTACT
          </span>
        </div>

        {/* Name Title & Subtitle */}
        <div className="relative my-3 flex flex-col items-center">
          <h2
            ref={logotypeRef}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] will-change-transform"
          >
            SAMUEL SETIAWAN
          </h2>

          <p className="finale-sub-title font-condensed text-xs sm:text-sm text-[#F5A3C7] tracking-[0.25em] uppercase font-bold mt-3">
            WEB DEVELOPER // 2026
          </p>
        </div>

        <p className="finale-narrative text-sm sm:text-base text-[#F4EEFF]/85 max-w-xl font-light mt-3 mb-8 leading-relaxed">
          Tertarik untuk berkolaborasi, membangun website modern, atau mendiskusikan peluang kerja sama? Silakan kirim pesan melalui formulir di bawah atau hubungi saya langsung.
        </p>

        {/* Quick CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <a
            ref={ctaBtnRef}
            href="#inquiry-box"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5B3FD1] via-[#7B5CFF] to-[#E0529C] text-white font-condensed text-xs tracking-[0.2em] font-bold shadow-[0_0_25px_rgba(123,92,255,0.4)] hover:shadow-[0_0_35px_rgba(224,82,156,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>HUBUNGI SAYA</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/cv-samuel-setiawan.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#FFB347] text-white font-condensed text-xs tracking-[0.15em] font-bold backdrop-blur-md hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <FileText size={15} className="text-[#FFB347]" />
            <span>DOWNLOAD CV (ATS)</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0B0818]/70 hover:bg-[#0B0818] border border-white/15 hover:border-[#F5A3C7] text-[#F4EEFF] font-mono text-xs backdrop-blur-md hover:scale-[1.03] active:scale-[0.98] transition-all"
            title="Salin Email ke Clipboard"
          >
            {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} className="text-[#F5A3C7]" />}
            <span>{copied ? 'EMAIL TERSALIN!' : personal.email}</span>
          </button>
        </div>

        {/* Interactive Inquiry Form Box */}
        <div
          id="inquiry-box"
          className="w-full max-w-3xl p-6 sm:p-9 rounded-2xl bg-[#0B0818]/90 border border-[#7B5CFF]/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div>
                <span className="font-condensed text-xs text-[#F5A3C7] tracking-[0.2em] uppercase font-bold">
                  DIRECT MESSAGE
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-1">
                  Mulai Kolaborasi
                </h3>
                <p className="text-xs sm:text-sm text-[#F4EEFF]/70 font-light mt-2 leading-relaxed">
                  Tuliskan ide proyek, kebutuhan website, atau pertanyaan Anda. Saya akan merespons dalam waktu 24 jam.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 font-mono text-xs">
                <Globe size={16} className="text-[#38BDF8]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#F4EEFF]/50 uppercase">Lokasi / Status</span>
                  <span className="font-semibold text-white">Jakarta, Indonesia • Open to Work</span>
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
                    Terima kasih telah menghubungi. Saya akan segera membaca pesan Anda dan membalas melalui email.
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
                        placeholder="Nama Anda"
                        className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@domain.com"
                        className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                      Kebutuhan / Layanan
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all"
                    >
                      <option value="Landing Page & Web Modern">Pembuatan Landing Page & Website Modern</option>
                      <option value="Full-Stack Web App">Pengembangan Aplikasi Web (Full Stack)</option>
                      <option value="Frontend Development">Frontend Development & Responsive Design</option>
                      <option value="Kolaborasi / Lainnya">Kolaborasi Proyek / Kesempatan Kerja</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-condensed text-[11px] text-[#F4EEFF]/70 uppercase tracking-wider">
                      Pesan
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan detail proyek atau pesan Anda di sini..."
                      className="px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E0529C] focus:ring-1 focus:ring-[#E0529C] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5B3FD1] via-[#7B5CFF] to-[#E0529C] text-white font-condensed font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(224,82,156,0.4)] hover:shadow-[0_0_30px_rgba(245,163,199,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                  >
                    <span>KIRIM PESAN</span>
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
