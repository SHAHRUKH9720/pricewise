import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'bordered' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200';

  const variants = {
    default: 'bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50',
    gradient: 'bg-gradient-card text-white shadow-xl shadow-blue-500/20',
    bordered: 'bg-white border border-slate-200',
    flat: 'bg-slate-100/80 border border-slate-200/60',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
