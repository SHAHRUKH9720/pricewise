import React from 'react';
import { QUICK_QUANTITY_PRESETS } from '../constants';
import type { QuickQuantityPreset } from '../constants';
import type { WeightUnit } from '../types';

interface QuickQuantityButtonsProps {
  currentQty: string;
  currentUnit: WeightUnit;
  onSelect: (qty: string, unit: WeightUnit) => void;
}

export const QuickQuantityButtons: React.FC<QuickQuantityButtonsProps> = ({
  currentQty,
  currentUnit,
  onSelect,
}) => {
  return (
    <div className="mt-3">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
        Quick Quantity Select
      </label>
      <div className="flex flex-wrap gap-2">
        {QUICK_QUANTITY_PRESETS.map((preset: QuickQuantityPreset) => {
          const isActive =
            currentQty === preset.qty && currentUnit === preset.unit;

          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onSelect(preset.qty, preset.unit)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
