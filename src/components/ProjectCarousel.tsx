'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, RotateCw, ChevronLeft, ChevronRight, Sparkles, X, Info } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA, ProjectItem } from '@/data/portfolio-data';

export default function ProjectCarousel() {
  const { projects } = PORTFOLIO_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);
  const total = projects.length;

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // GSAP Entrance & Exit Scroll Storytelling
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance: 3 cards rise from below with stagger (y: 120 -> 0, rotateX: 25 -> 0, opacity: 0 -> 1)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        },
      });

      entranceTl
        .fromTo(
          '.carousel-header',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          '.carousel-card-item',
          { y: 120, rotateX: 25, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .fromTo(
          '.carousel-controls',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );

      // 2. Center Card Auto 3D Flip on scroll crossing center
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: 'top 55%',
        once: true,
        onEnter: () => {
          // Trigger shine sweep & flip center card to front
          const shine = document.querySelector('.card-shine-sweep');
          if (shine) {
            gsap.fromTo(
              shine,
              { xPercent: -150, opacity: 0.8 },
              { xPercent: 150, opacity: 0, duration: 1.2, ease: 'power2.inOut' }
            );
          }
        },
      });

      // 3. Exit Transition: Active card scales up and "absorbs" screen as background darkens
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'bottom 85%',
        end: 'bottom top',
        scrub: 1,
        animation: gsap
          .timeline()
          .to(cardsContainerRef.current, { scale: 1.25, opacity: 0.1, ease: 'power2.in' }, 0)
          .to(sectionRef.current, { backgroundColor: '#0B0818', ease: 'none' }, 0),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Mouse Tilt Effect (max ±8°)
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xNorm = (x / rect.width - 0.5) * 2;
    const yNorm = (y / rect.height - 0.5) * 2;

    const tiltX = -yNorm * 8;
    const tiltY = xNorm * 8;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.3,
      ease: 'power1.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeaveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const prevIndex = (activeIndex - 1 + total) % total;
  const centerIndex = activeIndex;
  const nextIndex = (activeIndex + 1) % total;

  const visibleIndices = [
    { idx: prevIndex, position: 'left' },
    { idx: centerIndex, position: 'center' },
    { idx: nextIndex, position: 'right' },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-28 sm:py-36 bg-[#120A24] overflow-hidden border-t border-[#7B5CFF]/20 transition-colors duration-700"
    >
      {/* Background Subtle Textured Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#5B3FD1_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#5B3FD1]/15 via-[#E0529C]/15 to-[#7B5CFF]/15 blur-[150px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Header Block with Line Masking */}
        <div className="carousel-header flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1033] border border-[#E0529C]/40 mb-3 shadow-[0_0_15px_rgba(224,82,156,0.2)]">
            <Sparkles size={12} className="text-[#F5A3C7]" />
            <span className="eyebrow-red text-[11px] tracking-[0.25em]">
              COLLECTIBLE WORKS // ARTIFACT CAROUSEL
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-extrabold tracking-[0.02em] text-[#F4EEFF] mb-3">
            CHRONICLES OF SHIPPED REALMS
          </h2>

          <p className="text-sm sm:text-base text-[#F4EEFF]/70 max-w-2xl font-light mb-12">
            Tiga kartu mistis berwujud artifak koleksi. Gerakkan kursor untuk 3D tilt, atau klik
            kartu tengah untuk membalikkan (3D Flip) tampak depan dan ukiran ornamen kartu.
          </p>
        </div>

        {/* 3 Portrait Cards Carousel (Perspective 1200px) */}
        <div
          ref={cardsContainerRef}
          className="w-full flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 perspective-[1200px] my-4 min-h-[580px] will-change-transform"
        >
          {visibleIndices.map(({ idx, position }) => {
            const project = projects[idx];
            const isCenter = position === 'center';
            const isFlipped = flippedCards[idx] || false;

            return (
              <div
                key={`${project.id}-${position}`}
                className={`carousel-card-item transition-all duration-700 ease-out flex flex-col items-center ${
                  isCenter
                    ? 'z-30 scale-100 opacity-100 w-[290px] sm:w-[340px] md:w-[390px]'
                    : 'hidden sm:flex z-10 scale-[0.85] opacity-60 hover:opacity-85 cursor-pointer w-[240px] sm:w-[270px] md:w-[300px]'
                }`}
                onClick={() => {
                  if (!isCenter) {
                    if (position === 'left') prevProject();
                    else nextProject();
                  }
                }}
              >
                {/* 3D Tilt Card Wrapper */}
                <div
                  ref={isCenter ? centerCardRef : null}
                  onMouseMove={isCenter ? handleMouseMoveTilt : undefined}
                  onMouseLeave={isCenter ? handleMouseLeaveTilt : undefined}
                  className="relative w-full aspect-[2/3] rounded-2xl perspective-[1200px] group cursor-pointer will-change-transform"
                  onClick={(e) => {
                    if (isCenter) {
                      e.stopPropagation();
                      toggleFlip(idx);
                    }
                  }}
                  title={isCenter ? 'Klik untuk membalik kartu (3D Flip)' : 'Pilih kartu ini'}
                >
                  {/* Dynamic Shine Glare Sweep during flip/hover */}
                  <div className="card-shine-sweep absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-40 rounded-2xl opacity-0" />

                  {/* Inner Rotating 3D Flip Card */}
                  <div
                    className={`relative w-full h-full rounded-2xl transform-style-3d transition-transform duration-700 ease-out ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${
                      isCenter
                        ? 'shadow-[0_20px_60px_rgba(91,63,209,0.55),0_0_35px_rgba(224,82,156,0.3)] border-2 border-[#7B5CFF]'
                        : 'shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-[#7B5CFF]/30'
                    }`}
                  >
                    
                    {/* ================= CARD FRONT ================= */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden bg-[#0B0818] flex flex-col justify-between p-3.5 border border-[#7B5CFF]/40">
                      
                      {/* Top Label Banner (Category & Rank) */}
                      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="font-condensed text-[10px] text-[#F5A3C7] tracking-[0.2em] font-bold">
                          {project.categoryLabel}
                        </span>
                        
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5B3FD1]/40 border border-[#7B5CFF]/60 text-[10px] font-mono text-white">
                          <span className="text-[#FFB347] font-bold">{project.cardRank}</span>
                          <span className="text-[#F4EEFF]/60">|</span>
                          <span className="text-white text-[9px]">{project.element}</span>
                        </div>
                      </div>

                      {/* Center Thumbnail Artwork */}
                      <div className="relative flex-1 w-full my-2 rounded-xl overflow-hidden bg-[#1A1033] border border-[#7B5CFF]/25">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 300px, 400px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0818] via-transparent to-transparent opacity-60" />
                        
                        {/* 3D Flip Hint Pill on Center Card */}
                        {isCenter && (
                          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#0B0818]/85 backdrop-blur-sm border border-white/20 text-[9px] font-condensed tracking-widest text-[#F4EEFF]/90 flex items-center gap-1.5 shadow-sm">
                            <RotateCw size={10} className="text-[#FFB347]" />
                            <span>CLICK TO FLIP</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Banner (Title, Tagline & Action) */}
                      <div className="relative z-10 flex flex-col text-left p-2.5 rounded-xl bg-gradient-to-t from-[#1A1033] to-[#120A24] border border-[#7B5CFF]/30">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display font-bold text-lg text-[#F4EEFF] tracking-wide">
                            {project.title}
                          </h3>
                          <span className="text-[10px] font-mono text-[#FFB347] font-semibold">
                            {project.stats.val}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#F4EEFF]/70 line-clamp-1 mt-0.5 font-light">
                          {project.tagline}
                        </p>

                        {/* Tech tags preview */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0B0818] border border-white/10 text-[#F4EEFF]/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Deep Case Study Button on Center Card */}
                        {isCenter && (
                          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className="font-condensed text-[11px] text-[#F5A3C7] hover:text-white flex items-center gap-1 tracking-wider uppercase transition-colors"
                            >
                              <Info size={12} />
                              <span>INSPECT CASE STUDY</span>
                            </button>

                            <div className="flex items-center gap-2">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#F4EEFF]/70 hover:text-white transition-colors"
                                title="Source Code"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#F4EEFF]/70 hover:text-white transition-colors"
                                title="Live Preview"
                              >
                                <ExternalLink size={13} />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* ================= CARD BACK ================= */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180 bg-[#0B0818] p-1 border-2 border-[#E0529C]/70 shadow-2xl">
                      <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                        <Image
                          src="/images/card_back.jpg"
                          alt="Card Back Symmetrical Game Ornament"
                          fill
                          sizes="(max-width: 768px) 300px, 400px"
                          className="object-cover object-center"
                        />
                        <div className="absolute bottom-4 inset-x-4 p-2 rounded-xl bg-[#0B0818]/85 backdrop-blur-md border border-[#E0529C]/50 flex items-center justify-center gap-2 text-[10px] font-condensed tracking-widest text-[#F5A3C7]">
                          <RotateCw size={11} className="text-[#FFB347]" />
                          <span>CARD BACK // KLIK UNTUK BALIK KE DEPAN</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Subtitle / Indicator for Active Card */}
                {isCenter && (
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(idx);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1033] border border-[#7B5CFF]/40 text-[#F4EEFF]/80 font-condensed text-[11px] tracking-wider hover:border-[#E0529C] hover:text-white hover:scale-105 active:scale-95 transition-all"
                    >
                      <RotateCw size={11} className="text-[#FFB347]" />
                      <span>{isFlipped ? 'TAMPILKAN DEPAN' : 'TAMPILKAN CARD BACK'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Bottom Bar */}
        <div className="carousel-controls mt-8 flex items-center justify-between max-w-md w-full px-4">
          
          {/* Previous Button */}
          <button
            onClick={prevProject}
            className="group flex items-center gap-1.5 font-condensed text-xs tracking-[0.2em] text-[#F4EEFF]/70 hover:text-white transition-all py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95"
            aria-label="Previous Project Card"
          >
            <ChevronLeft size={16} className="text-[#F5A3C7] group-hover:-translate-x-1 transition-transform" />
            <span>‹ PREVIOUS</span>
          </button>

          {/* Segmented Progress Bar (scaleX smooth fill) */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Jump to project ${i + 1}`}
                className={`h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                  activeIndex === i
                    ? 'w-9 bg-[#E0529C] shadow-[0_0_12px_rgba(224,82,156,0.8)]'
                    : 'w-3.5 bg-white/20 hover:bg-white/40'
                }`}
              >
                <div
                  className="h-full bg-white transition-transform duration-500 origin-left"
                  style={{ transform: activeIndex === i ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextProject}
            className="group flex items-center gap-1.5 font-condensed text-xs tracking-[0.2em] text-[#F4EEFF]/70 hover:text-white transition-all py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95"
            aria-label="Next Project Card"
          >
            <span>NEXT ›</span>
            <ChevronRight size={16} className="text-[#F5A3C7] group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

      </div>

      {/* ================= MODAL DEEP CASE STUDY ================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0818]/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-[#1A1033] border-2 border-[#7B5CFF]/60 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#E0529C] text-white transition-colors"
              aria-label="Close Case Study"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col text-left mb-6">
              <span className="eyebrow-red text-[10px] tracking-[0.25em]">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FFB347] font-mono mt-0.5">
                {selectedProject.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-4 text-left text-sm text-[#F4EEFF]/85 mb-6">
              <div className="p-4 rounded-xl bg-[#0B0818]/60 border border-white/5">
                <span className="font-condensed text-xs text-[#E0529C] tracking-widest uppercase block mb-1 font-bold">
                  // THE CHALLENGE
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#F4EEFF]/80">
                  {selectedProject.caseStudy.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0818]/60 border border-white/5">
                <span className="font-condensed text-xs text-[#38BDF8] tracking-widest uppercase block mb-1 font-bold">
                  // ARCHITECTURAL SOLUTION
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#F4EEFF]/80">
                  {selectedProject.caseStudy.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0818]/60 border border-white/5">
                <span className="font-condensed text-xs text-[#10B981] tracking-widest uppercase block mb-1 font-bold">
                  // BUSINESS & PERFORMANCE IMPACT
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#F4EEFF]/80">
                  {selectedProject.caseStudy.impact}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#0B0818] border border-[#7B5CFF]/30 text-[#F4EEFF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-condensed tracking-wider text-white flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW REPO</span>
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#E0529C] hover:bg-[#F5A3C7] text-white font-condensed tracking-wider text-xs font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(224,82,156,0.4)] transition-all"
                >
                  <ExternalLink size={14} />
                  <span>LIVE SYSTEM</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
