import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Calculator } from '../features/price-calculator/components/Calculator';
import { QuickExamples } from '../components/sections/QuickExamples';
import { HowItWorks } from '../components/sections/HowItWorks';
import type { QuickExample } from '../features/price-calculator/constants';

export const Home: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<QuickExample | null>(null);

  const handleSelectExample = (example: QuickExample) => {
    setSelectedExample(example);

    // Smooth scroll to calculator section
    const calcSection = document.getElementById('calculator-section');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleStartClick = () => {
    const calcSection = document.getElementById('calculator-section');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero onStartClick={handleStartClick} />
        <Calculator externalExample={selectedExample} />
        <QuickExamples onSelectExample={handleSelectExample} />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};
