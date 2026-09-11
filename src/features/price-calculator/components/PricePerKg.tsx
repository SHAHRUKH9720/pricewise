import React from 'react';
import type { PricePerKgInputs, WeightUnit } from '../types';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

interface PricePerKgProps {
  inputs: PricePerKgInputs;
  onChange: (newInputs: PricePerKgInputs) => void;
  errors: Record<string, string>;
}

export const PricePerKg: React.FC<PricePerKgProps> = ({
  inputs,
  onChange,
  errors,
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, price: e.target.value });
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...inputs, qty: e.target.value });
  };

  const handleUnitChange = (unit: WeightUnit) => {
    onChange({ ...inputs, unit });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Input 1: Price paid */}
      <Input
        label="Price paid"
        prefixSymbol="₹"
        type="number"
        step="any"
        min="0"
        placeholder="e.g. 80"
        value={inputs.price}
        onChange={handlePriceChange}
        error={errors.price}
        autoFocus
      />

      {/* Input 2: Quantity received */}
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-1.5">
          Quantity received
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input
              type="number"
              step="any"
              min="0"
              placeholder="e.g. 200"
              value={inputs.qty}
              onChange={handleQtyChange}
              error={errors.qty}
            />
          </div>
          <div className="col-span-1">
            <Select value={inputs.unit} onChange={handleUnitChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
