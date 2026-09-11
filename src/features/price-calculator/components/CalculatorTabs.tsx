import React from 'react';
import type { CalculatorMode } from '../types';
import { ShoppingCart, Banknote, Scale } from 'lucide-react';

interface CalculatorTabsProps {
  activeMode: CalculatorMode;
  onSelectMode: (mode: CalculatorMode) => void;
}

export const CalculatorTabs: React.FC<CalculatorTabsProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const tabs = [
    {
      id: 'priceToQuantity' as CalculatorMode,
      label: 'Price → Quantity',
      mobileLabel: 'Price → Qty',
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      id: 'moneyToQuantity' as CalculatorMode,
      label: 'Money → Quantity',
      mobileLabel: 'Budget → Qty',
      icon: <Banknote className="w-4 h-4" />,
    },
    {
      id: 'pricePerKg' as CalculatorMode,
      label: 'Price → ₹/kg',
      mobileLabel: 'Price → ₹/kg',
      icon: <Scale className="w-4 h-4" />,
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="Calculator Modes"
      className="flex items-center p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 mb-6 gap-1"
    >
      {tabs.map((tab) => {
        const isActive = activeMode === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onSelectMode(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive
                ? 'bg-white text-blue-600 shadow-md shadow-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.mobileLabel}</span>
          </button>
        );
      })}
    </div>
  );
};
