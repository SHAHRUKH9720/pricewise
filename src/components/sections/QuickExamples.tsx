import React from 'react';
import { QUICK_EXAMPLES } from '../../features/price-calculator/constants';
import type { QuickExample } from '../../features/price-calculator/constants';
import { ArrowRight, Tag } from 'lucide-react';

interface QuickExamplesProps {
  onSelectExample: (example: QuickExample) => void;
}

export const QuickExamples: React.FC<QuickExamplesProps> = ({ onSelectExample }) => {
  return (
    <section className="py-12 bg-slate-100/60 border-y border-slate-200/80 my-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Interactive Presets</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Try an example</h2>
          </div>
          <p className="text-sm text-slate-500">
            Click any card to pre-fill the calculator instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUICK_EXAMPLES.map((example) => (
            <button
              key={example.id}
              onClick={() => onSelectExample(example)}
              className="group text-left bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-100">
                    {example.badge}
                  </span>
                  <span className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Try now <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {example.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {example.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {example.resultLabel}
                </span>
                <span className="text-base font-extrabold text-blue-600">
                  {example.resultValue}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
