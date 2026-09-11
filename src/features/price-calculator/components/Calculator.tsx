import React, { useState, useMemo } from 'react';
import type {
  CalculatorMode,
  PriceToQuantityInputs,
  MoneyToQuantityInputs,
  PricePerKgInputs,
} from '../types';
import { CalculatorTabs } from './CalculatorTabs';
import { PriceToQuantity } from './PriceToQuantity';
import { MoneyToQuantity } from './MoneyToQuantity';
import { PricePerKg } from './PricePerKg';
import { ResultCard } from './ResultCard';
import {
  calculatePriceForQuantity,
  calculateQuantityForMoney,
  calculatePricePerKg,
} from '../utils/calculations';
import { validateNumericInput } from '../utils/validation';
import { RotateCcw } from 'lucide-react';
import type { QuickExample } from '../constants';

const INITIAL_PRICE_TO_QTY: PriceToQuantityInputs = {
  price: '500',
  originalQty: '1',
  originalUnit: 'kg',
  requiredQty: '250',
  requiredUnit: 'gm',
};

const INITIAL_MONEY_TO_QTY: MoneyToQuantityInputs = {
  price: '500',
  priceQty: '1',
  priceUnit: 'kg',
  budget: '200',
};

const INITIAL_PRICE_PER_KG: PricePerKgInputs = {
  price: '80',
  qty: '200',
  unit: 'gm',
};

interface CalculatorProps {
  externalExample?: QuickExample | null;
}

export const Calculator: React.FC<CalculatorProps> = ({ externalExample }) => {
  const [mode, setMode] = useState<CalculatorMode>('priceToQuantity');

  const [priceToQtyInputs, setPriceToQtyInputs] =
    useState<PriceToQuantityInputs>(INITIAL_PRICE_TO_QTY);

  const [moneyToQtyInputs, setMoneyToQtyInputs] =
    useState<MoneyToQuantityInputs>(INITIAL_MONEY_TO_QTY);

  const [pricePerKgInputs, setPricePerKgInputs] =
    useState<PricePerKgInputs>(INITIAL_PRICE_PER_KG);

  // Handle preset example loading
  React.useEffect(() => {
    if (externalExample) {
      setMode(externalExample.mode);
      if (externalExample.inputs.priceToQuantity) {
        setPriceToQtyInputs(externalExample.inputs.priceToQuantity);
      }
      if (externalExample.inputs.moneyToQuantity) {
        setMoneyToQtyInputs(externalExample.inputs.moneyToQuantity);
      }
      if (externalExample.inputs.pricePerKg) {
        setPricePerKgInputs(externalExample.inputs.pricePerKg);
      }
    }
  }, [externalExample]);

  // Real-time Validation and Calculation
  const { result, errors } = useMemo(() => {
    const errs: Record<string, string> = {};

    if (mode === 'priceToQuantity') {
      const pErr = validateNumericInput(priceToQtyInputs.price, 'Price');
      const oErr = validateNumericInput(priceToQtyInputs.originalQty, 'Original Quantity');
      const rErr = validateNumericInput(priceToQtyInputs.requiredQty, 'Required Quantity');

      if (!pErr.isValid && priceToQtyInputs.price.trim() !== '') errs.price = pErr.message || '';
      if (!oErr.isValid && priceToQtyInputs.originalQty.trim() !== '') errs.originalQty = oErr.message || '';
      if (!rErr.isValid && priceToQtyInputs.requiredQty.trim() !== '') errs.requiredQty = rErr.message || '';

      const calcRes = calculatePriceForQuantity(priceToQtyInputs);
      return { result: calcRes, errors: errs };
    }

    if (mode === 'moneyToQuantity') {
      const pErr = validateNumericInput(moneyToQtyInputs.price, 'Price');
      const qErr = validateNumericInput(moneyToQtyInputs.priceQty, 'Price Quantity');
      const bErr = validateNumericInput(moneyToQtyInputs.budget, 'Budget');

      if (!pErr.isValid && moneyToQtyInputs.price.trim() !== '') errs.price = pErr.message || '';
      if (!qErr.isValid && moneyToQtyInputs.priceQty.trim() !== '') errs.priceQty = qErr.message || '';
      if (!bErr.isValid && moneyToQtyInputs.budget.trim() !== '') errs.budget = bErr.message || '';

      const calcRes = calculateQuantityForMoney(moneyToQtyInputs);
      return { result: calcRes, errors: errs };
    }

    if (mode === 'pricePerKg') {
      const pErr = validateNumericInput(pricePerKgInputs.price, 'Price paid');
      const qErr = validateNumericInput(pricePerKgInputs.qty, 'Quantity');

      if (!pErr.isValid && pricePerKgInputs.price.trim() !== '') errs.price = pErr.message || '';
      if (!qErr.isValid && pricePerKgInputs.qty.trim() !== '') errs.qty = qErr.message || '';

      const calcRes = calculatePricePerKg(pricePerKgInputs);
      return { result: calcRes, errors: errs };
    }

    return { result: null, errors: {} };
  }, [mode, priceToQtyInputs, moneyToQtyInputs, pricePerKgInputs]);

  // Reset active calculator mode inputs
  const handleReset = () => {
    if (mode === 'priceToQuantity') {
      setPriceToQtyInputs({
        price: '',
        originalQty: '1',
        originalUnit: 'kg',
        requiredQty: '',
        requiredUnit: 'gm',
      });
    } else if (mode === 'moneyToQuantity') {
      setMoneyToQtyInputs({
        price: '',
        priceQty: '1',
        priceUnit: 'kg',
        budget: '',
      });
    } else if (mode === 'pricePerKg') {
      setPricePerKgInputs({
        price: '',
        qty: '',
        unit: 'gm',
      });
    }
  };

  return (
    <div id="calculator-section" className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/70 p-5 sm:p-8 md:p-10">
        {/* Header bar inside calculator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              PriceWise Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select mode and enter values for instant conversion
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            title="Reset active form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Tab switcher */}
        <CalculatorTabs activeMode={mode} onSelectMode={setMode} />

        {/* Main Grid: Inputs on Left (7 cols), Result on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Active Mode Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {mode === 'priceToQuantity' && (
              <PriceToQuantity
                inputs={priceToQtyInputs}
                onChange={setPriceToQtyInputs}
                errors={errors}
              />
            )}

            {mode === 'moneyToQuantity' && (
              <MoneyToQuantity
                inputs={moneyToQtyInputs}
                onChange={setMoneyToQtyInputs}
                errors={errors}
              />
            )}

            {mode === 'pricePerKg' && (
              <PricePerKg
                inputs={pricePerKgInputs}
                onChange={setPricePerKgInputs}
                errors={errors}
              />
            )}
          </div>

          {/* Result Highlight Card */}
          <div className="lg:col-span-5 min-h-[320px]">
            <ResultCard result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};
