'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Menu, X, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // GSAP Fade-in from top on mount (y: -20 -> 0, stagger menu 0.06s)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '#nav-logo',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.nav-item-link',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '#nav-actions',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'projects', 'about', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playChime = () => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // AudioContext fallback
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled
        ? 'bg-[#0B0818]/85 backdrop-blur-md border-b border-[#7B5CFF]/25 shadow-[0_10px_35px_rgba(11,8,24,0.8)] py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left: Brand Monogram & Crest */}
        <a
          id="nav-logo"
          href="#home"
          onClick={() => playChime()}
          className="group flex items-center gap-3 focus:outline-none focus:ring-1 focus:ring-[#E0529C] rounded-lg p-1 transition-transform duration-200 active:scale-95"
        >

          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide text-[#F4EEFF] group-hover:text-[#F5A3C7] transition-colors">
              {PORTFOLIO_DATA.personal.name.toUpperCase()}
            </span>
            <span className="font-condensed text-[10px] text-[#F4EEFF]/60 tracking-[0.2em] uppercase">
              Web Developer // 2026
            </span>
          </div>
        </a>

        {/* Right Desktop Nav Menu */}
        <div className="hidden md:flex items-center gap-6">
          <nav
            aria-label="Navigasi Utama"
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#1A1033]/70 border border-[#7B5CFF]/30 backdrop-blur-md shadow-inner"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => playChime()}
                className={`nav-item-link relative font-condensed text-xs px-3.5 py-1.5 rounded-full tracking-[0.2em] group transition-all duration-200 ${activeSection === link.id
                  ? 'text-white bg-[#5B3FD1] shadow-[0_0_15px_rgba(91,63,209,0.5)] font-semibold'
                  : 'text-[#F4EEFF]/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>{link.label}</span>
                {/* Thin underline growing left to right on hover */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[1.5px] bg-gradient-to-r from-[#E0529C] to-[#FFB347] origin-left transition-transform duration-300 ease-out ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </a>
            ))}
          </nav>

          <div id="nav-actions" className="flex items-center gap-3">

            {/* CTA Outline Button with Self-Drawing Border on Hover */}
            <a
              href="#contact"
              onClick={() => playChime()}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-condensed text-xs tracking-[0.2em] uppercase text-[#F4EEFF] overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
            >
              

              {/* Background gradient on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#E0529C]/15 to-[#5B3FD1]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-full" />
              <MessageSquare size={13} className="text-[#F5A3C7] group-hover:text-white transition-colors group-hover:-translate-y-0.5" />
              <span className="font-bold">LET&apos;S TALK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB347] animate-pulse" />
            </a>
          </div>

        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-[#1A1033] border border-[#7B5CFF]/40 text-[#F4EEFF] hover:border-[#E0529C] transition-colors"
            aria-label={mobileOpen ? 'Tutup Menu' : 'Buka Menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#0B0818]/95 border border-[#7B5CFF]/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => {
                setMobileOpen(false);
                playChime();
              }}
              className={`font-condensed text-sm py-2 px-3 rounded-lg tracking-[0.2em] transition-colors ${activeSection === link.id
                ? 'text-[#F5A3C7] bg-[#5B3FD1]/20 font-bold border-l-2 border-[#E0529C]'
                : 'text-[#F4EEFF]/70 hover:text-white'
                }`}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="flex items-center gap-2 font-condensed text-xs text-[#F4EEFF]/70"
            >
              {audioEnabled ? <Volume2 size={16} className="text-[#F5A3C7]" /> : <VolumeX size={16} />}
              <span>{audioEnabled ? 'Sound ON' : 'Sound OFF'}</span>
            </button>

            <a
              href="#contact"
              onClick={() => {
                setMobileOpen(false);
                playChime();
              }}
              className="font-condensed text-xs px-4 py-2 rounded-xl bg-[#E0529C] text-white tracking-[0.15em] font-bold"
            >
              LET&apos;S TALK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
