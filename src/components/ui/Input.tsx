import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefixSymbol?: string;
  suffixSymbol?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  prefixSymbol,
  suffixSymbol,
  error,
  helperText,
  containerClassName = '',
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-slate-700 flex items-center justify-between"
        >
          <span>{label}</span>
        </label>
      )}

      <div className="relative flex items-center rounded-xl shadow-sm">
        {prefixSymbol && (
          <div className="absolute left-0 pl-3.5 pointer-events-none flex items-center text-slate-500 font-semibold text-base">
            {prefixSymbol}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`w-full rounded-xl border bg-white text-slate-900 text-base py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${
            prefixSymbol ? 'pl-9' : 'pl-3.5'
          } ${suffixSymbol ? 'pr-12' : 'pr-3.5'} ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 hover:border-slate-400'
          } ${className}`}
          {...props}
        />

        {suffixSymbol && (
          <div className="absolute right-0 pr-3.5 pointer-events-none flex items-center text-slate-400 font-medium text-sm">
            {suffixSymbol}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-0.5 animate-fade-in">
          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};
