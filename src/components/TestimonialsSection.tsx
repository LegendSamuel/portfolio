'use client';

import { Star, ShieldCheck, Quote } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export default function TestimonialsSection() {
  const { testimonials } = PORTFOLIO_DATA;

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#120A24] overflow-hidden border-t border-[#7B5CFF]/20">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1033] border border-[#E0529C]/40 mb-3 shadow-[0_0_15px_rgba(224,82,156,0.2)]">
          <ShieldCheck size={12} className="text-[#10B981]" />
          <span className="eyebrow-red text-[11px] tracking-[0.25em]">
            SOCIAL PROOF // COMRADES & ALLIES
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl uppercase font-extrabold tracking-[0.02em] text-[#F4EEFF] text-center mb-3">
          WORDS FROM FELLOW LEADERS
        </h2>

        <p className="text-sm sm:text-base text-[#F4EEFF]/70 max-w-xl text-center font-light mb-12">
          Kesaksian langsung dari CTO, Lead Product Designer, dan Engineering VP yang telah berkolaborasi
          bersama dalam meluncurkan produk digital kelas enterprise.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="relative p-6 rounded-2xl bg-[#1A1033]/80 border border-[#7B5CFF]/30 hover:border-[#F5A3C7]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[#FFB347] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFB347" />
                  ))}
                  <span className="ml-1 text-[11px] font-mono text-[#F4EEFF]/80 font-bold">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-[#F4EEFF]/85 font-light leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5B3FD1] to-[#E0529C] flex items-center justify-center font-display font-bold text-xs text-white shadow-md">
                  {item.name.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-xs text-white">{item.name}</span>
                  <span className="text-[10px] text-[#F5A3C7] font-mono">{item.role}</span>
                  <span className="text-[9px] text-[#F4EEFF]/50">{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
