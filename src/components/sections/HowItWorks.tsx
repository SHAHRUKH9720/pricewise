import React from 'react';
import { Banknote, Scale, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Enter the price',
      description: 'Input the price of the item along with its original unit (gm or kg).',
      icon: <Banknote className="w-6 h-6 text-blue-600" />,
    },
    {
      number: '02',
      title: 'Enter quantity or budget',
      description: 'Specify how much you want to buy, or how much money you want to spend.',
      icon: <Scale className="w-6 h-6 text-blue-600" />,
    },
    {
      number: '03',
      title: 'Get your answer',
      description: 'Instantly view your calculated price, exact quantity breakdown, and normalized ₹/kg.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 my-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">How It Works</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Get accurate shopping decisions in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                {step.icon}
              </div>
              <span className="text-2xl font-black text-slate-200">{step.number}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
