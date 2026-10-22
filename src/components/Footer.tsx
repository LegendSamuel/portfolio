'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0B0818] border-t border-[#7B5CFF]/20 py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs font-mono text-[#F4EEFF]/60">
        
        {/* Left: Monogram Crest & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#1A1033] border border-[#7B5CFF]/40 flex items-center justify-center font-display font-bold text-xs text-[#F5A3C7]">
            SS
          </div>
          <span>
            © {personal.year} {personal.name}. All digital rights reserved.
          </span>
        </div>

        {/* Center: Social Links (Outline Icons) */}
        <div className="flex items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#E0529C] hover:text-[#F5A3C7] text-white transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#E0529C] hover:text-[#F5A3C7] text-white transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#E0529C] hover:text-[#F5A3C7] text-white transition-all"
            aria-label="Kirim Email"
          >
            <Mail size={15} />
          </a>
        </div>

        {/* Right: Back to Top Trigger */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-[#F4EEFF]/70 hover:text-white transition-colors"
          aria-label="Kembali ke atas"
        >
          <span className="font-condensed text-xs tracking-widest uppercase">KEMBALI KE ATAS</span>
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E0529C] group-hover:-translate-y-0.5 transition-all">
            <ArrowUp size={12} className="text-[#F5A3C7]" />
          </div>
        </button>

      </div>
    </footer>
  );
}
