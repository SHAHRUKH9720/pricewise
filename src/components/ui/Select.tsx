import React from 'react';
import type { WeightUnit } from '../../features/price-calculator/types';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  value: WeightUnit;
  onChange: (value: WeightUnit) => void;
  label?: string;
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  label,
  containerClassName = '',
  className = '',
  id,
  disabled,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value as WeightUnit)}
          className={`appearance-none w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 pr-8 text-base font-semibold text-slate-800 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 hover:border-slate-400 cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          <option value="gm">gm</option>
          <option value="kg">kg</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
