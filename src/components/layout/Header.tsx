import React from 'react';
import { Calculator } from 'lucide-react';

export const Header: React.FC = () => {
  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand logo & title */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:bg-blue-700 transition-colors">
            <Calculator className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
              PriceWise
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              Smart Shopping Tool
            </span>
          </div>
        </a>

        {/* Right side navigation */}
        <nav className="flex items-center gap-4">
          <a
            href="#how-it-works"
            onClick={scrollToHowItWorks}
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100/80"
          >
            How it works
          </a>
        </nav>
      </div>
    </header>
  );
};
