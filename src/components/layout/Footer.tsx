import React from 'react';
import { Calculator, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800">PriceWise</span>
        </div>

        <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
          <span>Calculate smarter. Shop better. Developed with</span>
          <span>by <strong className="text-slate-800 font-semibold">Shahrukh</strong>.</span>
        </p>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} PriceWise. Designed & Built by Shahrukh.
        </p>
      </div>
    </footer>
  );
};
