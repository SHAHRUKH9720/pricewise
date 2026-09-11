import React from 'react';
import type { PriceToQuantityInputs, WeightUnit } from '../types';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { QuickQuantityButtons } from './QuickQuantityButtons';

interface PriceToQuantityProps {
  inputs: PriceToQuantityInputs;
  onChange: (newInputs: PriceToQuantityInputs) => void;
  errors: Record<string, string>;
}

export const PriceToQuantity: React.FC<PriceToQuantityProps> = ({
  inputs,
  onChange,
  errors,
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, price: e.target.value });
  };

  const handleOriginalQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, originalQty: e.target.value });
  };

  const handleOriginalUnitChange = (unit: WeightUnit) => {
    onChange({ ...inputs, originalUnit: unit });
  };

  const handleRequiredQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, requiredQty: e.target.value });
  };

  const handleRequiredUnitChange = (unit: WeightUnit) => {
    onChange({ ...inputs, requiredUnit: unit });
  };

  const handleQuickSelect = (qty: string, unit: WeightUnit) => {
    onChange({
      ...inputs,
      requiredQty: qty,
      requiredUnit: unit,
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Input 1: Price */}
      <Input
        label="Price"
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

      {/* Input 2: Original quantity */}
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
              value={inputs.originalQty}
              onChange={handleOriginalQtyChange}
              error={errors.originalQty}
            />
          </div>
          <div className="col-span-1">
            <Select
              value={inputs.originalUnit}
              onChange={handleOriginalUnitChange}
            />
          </div>
        </div>
      </div>

      {/* Input 3: Required quantity */}
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-1.5">
          I want to buy
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input
              type="number"
              step="any"
              min="0"
              placeholder="e.g. 250"
              value={inputs.requiredQty}
              onChange={handleRequiredQtyChange}
              error={errors.requiredQty}
            />
          </div>
          <div className="col-span-1">
            <Select
              value={inputs.requiredUnit}
              onChange={handleRequiredUnitChange}
            />
          </div>
        </div>

        {/* Quick select buttons */}
        <QuickQuantityButtons
          currentQty={inputs.requiredQty}
          currentUnit={inputs.requiredUnit}
          onSelect={handleQuickSelect}
        />
      </div>
    </div>
  );
};
