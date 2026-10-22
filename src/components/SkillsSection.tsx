'use client';

import { Sparkles, Terminal, Palette, Database, Server, Flame } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export default function SkillsSection() {
  const { skillCategories } = PORTFOLIO_DATA;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Terminal size={18} className="text-[#7B5CFF]" />;
      case 'Sparkles':
        return <Palette size={18} className="text-[#E0529C]" />;
      case 'Database':
        return <Database size={18} className="text-[#FFB347]" />;
      case 'Cpu':
        return <Server size={18} className="text-[#38BDF8]" />;
      default:
        return <Sparkles size={18} className="text-[#7B5CFF]" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 bg-[#0E091C] overflow-hidden border-t border-[#7B5CFF]/20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#5B3FD1]/10 via-[#E0529C]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1033] border border-[#E0529C]/40 mb-3 shadow-[0_0_15px_rgba(224,82,156,0.2)]">
          <Flame size={12} className="text-[#FFB347]" />
          <span className="eyebrow-red text-[11px] tracking-[0.25em]">
            TECH ECOSYSTEM // INVENTORY GRIMOIRE
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-extrabold tracking-[0.02em] text-[#F4EEFF] text-center mb-3">
          ARSENAL OF CAPABILITIES
        </h2>

        <p className="text-sm sm:text-base text-[#F4EEFF]/70 max-w-2xl text-center font-light mb-14">
          Koleksi instrumen teknis dan keahlian rekayasa perangkat lunak yang diasah selama 5+ tahun
          untuk menghadirkan produk digital tangguh berstandar industri.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="relative rounded-2xl p-5 bg-[#140E26] border border-[#7B5CFF]/30 hover:border-[#E0529C] transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_40px_rgba(91,63,209,0.3)]"
            >
              <div>
                {/* Header with Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#1A1033] border"
                    style={{ borderColor: `${category.color}60` }}
                  >
                    {getIcon(category.iconName)}
                  </div>

                  <span
                    className="font-condensed text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border"
                    style={{
                      color: category.color,
                      borderColor: `${category.color}50`,
                      backgroundColor: `${category.color}15`,
                    }}
                  >
                    SSR TIER
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-[#F4EEFF]/60 font-light mb-5 leading-relaxed">
                  {category.subtitle}
                </p>

                {/* Skills Progress List */}
                <div className="flex flex-col gap-3 font-mono text-xs">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-[#0B0818]/70 border border-white/5 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#F4EEFF]/90 font-medium">{skill.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[9px] px-1 py-0.2 rounded font-bold"
                            style={{ color: category.color }}
                          >
                            {skill.rank}
                          </span>
                          <span className="text-white font-bold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Bar */}
                      <div className="w-full h-1 bg-[#1A1033] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: category.color,
                            boxShadow: `0 0 8px ${category.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#F4EEFF]/40">
                <span>SLOT VERIFIED</span>
                <span className="text-[#10B981]">ACTIVE IN PROD</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
