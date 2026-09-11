import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Developer Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50/90 via-indigo-50 to-blue-50/90 border border-blue-200/90 shadow-sm shadow-blue-500/10 mb-6 group transition-all duration-300 hover:shadow-md hover:border-blue-300 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide">
            Developed by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent font-extrabold tracking-tight">
              Shahrukh
            </span>
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4">
          Calculate Smarter. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Shop Better.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          Price, quantity & ₹/kg — instantly.
        </p>

        {/* Scroll CTA indicator */}
        {onStartClick && (
          <button
            onClick={onStartClick}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <span>Start calculating</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        )}
      </div>
    </section>
  );
};
