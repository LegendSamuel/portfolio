'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import ParticleCanvas from '@/components/ParticleCanvas';
import HeroSection from '@/components/HeroSection';
import ProjectCarousel from '@/components/ProjectCarousel';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FinaleSection from '@/components/FinaleSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#0B0818] text-[#F4EEFF] overflow-x-hidden selection:bg-[#E0529C] selection:text-white">
        {/* Preloader with curtain reveal */}
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

        {/* Custom Lerp Interactive Pointer & Glowing Ring Cursor */}
        <CustomCursor />

        {/* 60 FPS Particle Canvas (Kunang-kunang & Sakura) */}
        <ParticleCanvas />

        {/* Atmospheric Film Grain (4% opacity) */}
        <div className="fixed inset-0 film-grain z-30 pointer-events-none" />

        {/* Dark Vignette Edge Shadow Overlay */}
        <div className="fixed inset-0 vignette-overlay z-20 pointer-events-none" />

        {/* Fixed Blur Glass Navbar with Self-drawing Outline & Audio Toggle */}
        <Navbar />

        {/* SCENE 1: HERO (100vh Full Viewport, 3-Layer Parallax, Line Mask Reveals) */}
        <HeroSection ready={preloaderDone} />

        {/* SCENE 2: PROJECT CARDS CAROUSEL (3D Tilt, Scroll Flip, Glare Sweep, Screen Absorb Exit) */}
        <ProjectCarousel />

        {/* SCENE 3: DETAIL / ABOUT (Mastery Chronicles, Magnetic CTA, Inverse Artwork Parallax) */}
        <AboutSection />

        {/* COMPANION: RPG INVENTORY TECH SKILLS */}
        <SkillsSection />

        {/* COMPANION: CREDIBILITY & TESTIMONIALS */}
        <TestimonialsSection />

        {/* SCENE 4: FINALE / CONTACT (5-Layer Sunset Parallax, Brush Stroke Wipe, Logotype Blur Reveal) */}
        <FinaleSection />

        {/* Minimal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
