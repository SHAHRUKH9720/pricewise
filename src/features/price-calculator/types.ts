export type WeightUnit = 'gm' | 'kg';

export type CalculatorMode = 'priceToQuantity' | 'moneyToQuantity' | 'pricePerKg';

export interface PriceToQuantityInputs {
  price: string;
  originalQty: string;
  originalUnit: WeightUnit;
  requiredQty: string;
  requiredUnit: WeightUnit;
}

export interface MoneyToQuantityInputs {
  price: string;
  priceQty: string;
  priceUnit: WeightUnit;
  budget: string;
}

export interface PricePerKgInputs {
  price: string;
  qty: string;
  unit: WeightUnit;
}

export interface FormulaStep {
  stepNumber: number;
  label: string;
  expression: string;
  explanation: string;
}

export interface PriceToQuantityResult {
  mode: 'priceToQuantity';
  requiredPrice: number;
  requiredQtyGrams: number;
  pricePerKg: number;
  pricePerGram: number;
  formulaExplanation: string;
  formulaMath: string;
  steps: FormulaStep[];
  formattedRequiredQty: string;
}

export interface MoneyToQuantityResult {
  mode: 'moneyToQuantity';
  budget: number;
  obtainedGrams: number;
  formattedQuantity: string;
  pricePerKg: number;
  pricePerGram: number;
  formulaExplanation: string;
  formulaMath: string;
  steps: FormulaStep[];
}

export interface PricePerKgResult {
  mode: 'pricePerKg';
  pricePaid: number;
  quantityGrams: number;
  pricePerKg: number;
  pricePer100g: number;
  pricePerGram: number;
  formattedQuantity: string;
  formulaExplanation: string;
  formulaMath: string;
  steps: FormulaStep[];
}

export type CalculationResult =
  | PriceToQuantityResult
  | MoneyToQuantityResult
  | PricePerKgResult;

// Structure for future Product Comparison feature (as mandated in Section 26)
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  unit: WeightUnit;
}

export interface ProductComparisonResult {
  product: ProductItem;
  pricePerKg: number;
  pricePerGram: number;
  formattedQuantity: string;
  isBestValue: boolean;
  savingsVsHighestPercent?: number;
}
