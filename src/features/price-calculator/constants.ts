import type { WeightUnit, CalculatorMode } from './types';

export interface QuickQuantityPreset {
  label: string;
  qty: string;
  unit: WeightUnit;
}

export const QUICK_QUANTITY_PRESETS: QuickQuantityPreset[] = [
  { label: '50 gm', qty: '50', unit: 'gm' },
  { label: '100 gm', qty: '100', unit: 'gm' },
  { label: '250 gm', qty: '250', unit: 'gm' },
  { label: '500 gm', qty: '500', unit: 'gm' },
  { label: '1 kg', qty: '1', unit: 'kg' },
];

export interface QuickExample {
  id: string;
  mode: CalculatorMode;
  title: string;
  subtitle: string;
  badge: string;
  resultLabel: string;
  resultValue: string;
  inputs: {
    priceToQuantity?: {
      price: string;
      originalQty: string;
      originalUnit: WeightUnit;
      requiredQty: string;
      requiredUnit: WeightUnit;
    };
    moneyToQuantity?: {
      price: string;
      priceQty: string;
      priceUnit: WeightUnit;
      budget: string;
    };
    pricePerKg?: {
      price: string;
      qty: string;
      unit: WeightUnit;
    };
  };
}

export const QUICK_EXAMPLES: QuickExample[] = [
  {
    id: 'example-1',
    mode: 'pricePerKg',
    title: '₹80 for 200 gm',
    subtitle: 'Find price per kg when buying small snacks or spices',
    badge: 'Spice & Packets',
    resultLabel: 'Price per kg',
    resultValue: '₹400/kg',
    inputs: {
      pricePerKg: {
        price: '80',
        qty: '200',
        unit: 'gm',
      },
    },
  },
  {
    id: 'example-2',
    mode: 'pricePerKg',
    title: '₹750 for 1.5 kg',
    subtitle: 'Bulk items or dry fruits purchase calculation',
    badge: 'Bulk Buying',
    resultLabel: 'Price per kg',
    resultValue: '₹500/kg',
    inputs: {
      pricePerKg: {
        price: '750',
        qty: '1.5',
        unit: 'kg',
      },
    },
  },
  {
    id: 'example-3',
    mode: 'moneyToQuantity',
    title: '₹500/kg with ₹200 budget',
    subtitle: 'Know how much quantity you get for a fixed amount of cash',
    badge: 'Fixed Budget',
    resultLabel: 'You will receive',
    resultValue: '400 gm',
    inputs: {
      moneyToQuantity: {
        price: '500',
        priceQty: '1',
        priceUnit: 'kg',
        budget: '200',
      },
    },
  },
];
