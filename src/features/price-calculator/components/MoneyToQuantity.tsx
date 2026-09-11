import React from 'react';
import type { MoneyToQuantityInputs, WeightUnit } from '../types';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

interface MoneyToQuantityProps {
  inputs: MoneyToQuantityInputs;
  onChange: (newInputs: MoneyToQuantityInputs) => void;
  errors: Record<string, string>;
}

export const MoneyToQuantity: React.FC<MoneyToQuantityProps> = ({
  inputs,
  onChange,
  errors,
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, price: e.target.value });
  };

  const handlePriceQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, priceQty: e.target.value });
  };

  const handlePriceUnitChange = (unit: WeightUnit) => {
    onChange({ ...inputs, priceUnit: unit });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, budget: e.target.value });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Input 1: Product Price */}
      <Input
        label="Product Price"
        prefixSymbol="₹"
        type="number"
        step="any"
        min="0"
        placeholder="e.g. 500"
        value={inputs.price}
        onChange={handlePriceChange}
        error={errors.price}
        autoFocus
      />

      {/* Input 2: Price is for quantity */}
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-1.5">
          Price is for
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input
              type="number"
              step="any"
              min="0"
              placeholder="e.g. 1"
              value={inputs.priceQty}
              onChange={handlePriceQtyChange}
              error={errors.priceQty}
            />
          </div>
          <div className="col-span-1">
            <Select
              value={inputs.priceUnit}
              onChange={handlePriceUnitChange}
            />
          </div>
        </div>
      </div>

      {/* Input 3: Budget */}
      <Input
        label="I want to spend (Budget)"
        prefixSymbol="₹"
        type="number"
        step="any"
        min="0"
        placeholder="e.g. 200"
        value={inputs.budget}
        onChange={handleBudgetChange}
        error={errors.budget}
      />
    </div>
  );
};
