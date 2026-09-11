import React, { useState } from 'react';
import type { CalculationResult } from '../types';
import { formatCurrency, formatPricePerKg } from '../utils/formatting';
import { Calculator, Copy, Check, Sparkles, ChevronDown, ChevronUp, CalculatorIcon } from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const [showFormulaSteps, setShowFormulaSteps] = useState(true);

  if (!result) {
    return (
      <div className="h-full min-h-[320px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 mb-4">
          <Calculator className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-1">
          Ready to Calculate
        </h3>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Enter your price and quantity details on the left to see instant calculations and formula breakdowns.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    let summaryText = '';
    if (result.mode === 'priceToQuantity') {
      summaryText = `Price: ${formatCurrency(result.requiredPrice)} for ${result.formattedRequiredQty} (${formatPricePerKg(result.pricePerKg)}). Formula: ${result.formulaExplanation}`;
    } else if (result.mode === 'moneyToQuantity') {
      summaryText = `With ${formatCurrency(result.budget)}, you get ${result.formattedQuantity} (${formatPricePerKg(result.pricePerKg)}). Formula: ${result.formulaExplanation}`;
    } else if (result.mode === 'pricePerKg') {
      summaryText = `Price per kg: ${formatPricePerKg(result.pricePerKg)} (${formatCurrency(result.pricePaid)} for ${result.formattedQuantity}). Formula: ${result.formulaExplanation}`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-900/10 border border-slate-800 animate-fade-in">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header Tag */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Calculation Result</span>
        </div>

        <button
          onClick={handleCopy}
          title="Copy result to clipboard"
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Prominent Output based on Mode */}
      <div className="my-2 relative z-10">
        {result.mode === 'priceToQuantity' && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              You need to pay
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {formatCurrency(result.requiredPrice)}
            </div>
            <div className="text-sm font-semibold text-blue-300">
              for <span className="text-white font-bold">{result.formattedRequiredQty}</span>
            </div>
          </div>
        )}

        {result.mode === 'moneyToQuantity' && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              With {formatCurrency(result.budget)} you can buy
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {result.formattedQuantity}
            </div>
            <div className="text-sm font-semibold text-blue-300">
              at rate of <span className="text-white font-bold">{formatPricePerKg(result.pricePerKg)}</span>
            </div>
          </div>
        )}

        {result.mode === 'pricePerKg' && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Price per kilogram
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {formatPricePerKg(result.pricePerKg)}
            </div>
            <div className="text-sm font-semibold text-blue-300">
              for <span className="text-white font-bold">{result.formattedQuantity}</span> at {formatCurrency(result.pricePaid)}
            </div>
          </div>
        )}
      </div>

      {/* Secondary Metrics */}
      <div className="my-3 pt-4 border-t border-slate-800 relative z-10">
        {result.mode === 'priceToQuantity' && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Normalized Rate</span>
            <span className="text-sm font-bold text-blue-400">
              {formatPricePerKg(result.pricePerKg)}
            </span>
          </div>
        )}

        {result.mode === 'moneyToQuantity' && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Normalized Rate</span>
            <span className="text-sm font-bold text-blue-400">
              {formatPricePerKg(result.pricePerKg)}
            </span>
          </div>
        )}

        {result.mode === 'pricePerKg' && (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-medium">Per 100 gm</span>
              <span className="text-sm font-bold text-white">
                {formatCurrency(result.pricePer100g)}
              </span>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-medium">Per gram</span>
              <span className="text-sm font-bold text-white">
                {formatCurrency(result.pricePerGram)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Prominent Formula & Step-by-Step Calculation Section */}
      <div className="pt-4 border-t border-slate-800 relative z-10 space-y-3">
        {/* Formula Section Toggle Header */}
        <button
          onClick={() => setShowFormulaSteps(!showFormulaSteps)}
          className="w-full flex items-center justify-between text-xs font-bold text-blue-300 hover:text-white transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-1.5">
            <CalculatorIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>How it is calculated (Formula)</span>
          </div>
          {showFormulaSteps ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showFormulaSteps && (
          <div className="space-y-2.5 animate-fade-in">
            {/* Mathematical Formula Banner */}
            <div className="bg-slate-800/90 p-3 rounded-xl border border-blue-500/30">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block mb-1">
                Formula
              </span>
              <div className="font-mono text-xs text-white font-medium break-all">
                {result.formulaMath}
              </div>
            </div>

            {/* Substitution & Step-by-Step Breakdown */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Calculation Steps
              </span>
              {result.steps.map((step) => (
                <div key={step.stepNumber} className="text-xs space-y-0.5 border-l-2 border-blue-500/50 pl-2.5 py-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300 text-[11px]">
                      Step {step.stepNumber}: {step.label}
                    </span>
                  </div>
                  <div className="font-mono text-white text-xs font-bold">
                    {step.expression}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {step.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
