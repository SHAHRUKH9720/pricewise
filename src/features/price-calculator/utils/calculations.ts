import type {
  PriceToQuantityInputs,
  MoneyToQuantityInputs,
  PricePerKgInputs,
  PriceToQuantityResult,
  MoneyToQuantityResult,
  PricePerKgResult,
  ProductItem,
  ProductComparisonResult,
  FormulaStep,
} from '../types';
import { toGrams } from './conversion';
import { formatCurrency, formatQuantity, formatCleanNumber } from './formatting';

/**
 * Calculator Mode 1: Price -> Quantity
 * Known: price of original quantity.
 * Target: required price for requested quantity.
 *
 * Example: ₹500 for 1 kg, want 250 gm -> ₹125
 */
export function calculatePriceForQuantity(
  inputs: PriceToQuantityInputs
): PriceToQuantityResult | null {
  const price = parseFloat(inputs.price);
  const originalQtyVal = parseFloat(inputs.originalQty);
  const requiredQtyVal = parseFloat(inputs.requiredQty);

  if (
    isNaN(price) ||
    price <= 0 ||
    isNaN(originalQtyVal) ||
    originalQtyVal <= 0 ||
    isNaN(requiredQtyVal) ||
    requiredQtyVal <= 0
  ) {
    return null;
  }

  const originalGrams = toGrams(originalQtyVal, inputs.originalUnit);
  const requiredGrams = toGrams(requiredQtyVal, inputs.requiredUnit);

  if (originalGrams <= 0 || requiredGrams <= 0) {
    return null;
  }

  // Intermediate calculations without rounding
  const pricePerGram = price / originalGrams;
  const requiredPrice = pricePerGram * requiredGrams;
  const pricePerKg = pricePerGram * 1000;

  if (!isFinite(requiredPrice) || !isFinite(pricePerKg)) {
    return null;
  }

  const formulaMath = `Required Price = (Price ÷ Original Quantity in gm) × Desired Quantity in gm`;
  const formulaExplanation = `${formatCurrency(price)} ÷ ${formatCleanNumber(
    originalGrams
  )} gm × ${formatCleanNumber(requiredGrams)} gm = ${formatCurrency(requiredPrice)}`;

  const steps: FormulaStep[] = [
    {
      stepNumber: 1,
      label: 'Convert Given Quantity to Grams',
      expression: `${inputs.originalQty} ${inputs.originalUnit} = ${formatCleanNumber(originalGrams)} gm`,
      explanation: 'Normalize the base quantity into grams for accurate calculation.',
    },
    {
      stepNumber: 2,
      label: 'Calculate Price Per Gram',
      expression: `${formatCurrency(price)} ÷ ${formatCleanNumber(originalGrams)} gm = ${formatCurrency(pricePerGram)}/gm`,
      explanation: 'Divide the price by total grams to find cost of 1 gram.',
    },
    {
      stepNumber: 3,
      label: 'Multiply by Desired Quantity',
      expression: `${formatCurrency(pricePerGram)} × ${formatCleanNumber(requiredGrams)} gm = ${formatCurrency(requiredPrice)}`,
      explanation: 'Multiply rate per gram by the requested quantity to get final price.',
    },
  ];

  return {
    mode: 'priceToQuantity',
    requiredPrice,
    requiredQtyGrams: requiredGrams,
    pricePerKg,
    pricePerGram,
    formulaExplanation,
    formulaMath,
    steps,
    formattedRequiredQty: formatQuantity(requiredGrams),
  };
}

/**
 * Calculator Mode 2: Money -> Quantity
 * Known: price of product for certain quantity, and available budget.
 * Target: quantity of product received.
 *
 * Example: Price ₹500/kg, Budget ₹200 -> 400 gm
 */
export function calculateQuantityForMoney(
  inputs: MoneyToQuantityInputs
): MoneyToQuantityResult | null {
  const price = parseFloat(inputs.price);
  const priceQtyVal = parseFloat(inputs.priceQty);
  const budget = parseFloat(inputs.budget);

  if (
    isNaN(price) ||
    price <= 0 ||
    isNaN(priceQtyVal) ||
    priceQtyVal <= 0 ||
    isNaN(budget) ||
    budget <= 0
  ) {
    return null;
  }

  const priceGrams = toGrams(priceQtyVal, inputs.priceUnit);
  if (priceGrams <= 0) {
    return null;
  }

  // Intermediate calculations
  const pricePerGram = price / priceGrams;
  const obtainedGrams = budget / pricePerGram;
  const pricePerKg = pricePerGram * 1000;

  if (!isFinite(obtainedGrams) || !isFinite(pricePerKg)) {
    return null;
  }

  const formulaMath = `Obtained Quantity in gm = (Budget ÷ Price) × Item Quantity in gm`;
  const formulaExplanation = `(${formatCurrency(budget)} ÷ ${formatCurrency(price)}) × ${formatCleanNumber(priceGrams)} gm = ${formatQuantity(obtainedGrams)}`;

  const steps: FormulaStep[] = [
    {
      stepNumber: 1,
      label: 'Convert Item Quantity to Grams',
      expression: `${inputs.priceQty} ${inputs.priceUnit} = ${formatCleanNumber(priceGrams)} gm`,
      explanation: 'Convert product base weight into grams.',
    },
    {
      stepNumber: 2,
      label: 'Calculate Price Per Gram',
      expression: `${formatCurrency(price)} ÷ ${formatCleanNumber(priceGrams)} gm = ${formatCurrency(pricePerGram)}/gm`,
      explanation: 'Determine how much 1 gram of product costs.',
    },
    {
      stepNumber: 3,
      label: 'Divide Budget by Price Per Gram',
      expression: `${formatCurrency(budget)} ÷ ${formatCurrency(pricePerGram)}/gm = ${formatQuantity(obtainedGrams)}`,
      explanation: 'Divide your total budget by the per-gram price to get total grams obtained.',
    },
  ];

  return {
    mode: 'moneyToQuantity',
    budget,
    obtainedGrams,
    formattedQuantity: formatQuantity(obtainedGrams),
    pricePerKg,
    pricePerGram,
    formulaExplanation,
    formulaMath,
    steps,
  };
}

/**
 * Calculator Mode 3: Price -> ₹/kg
 * Known: total price paid and quantity received.
 * Target: normalized price per kg, per 100g, per g.
 *
 * Example: ₹80 for 200 gm -> ₹400/kg
 */
export function calculatePricePerKg(
  inputs: PricePerKgInputs
): PricePerKgResult | null {
  const pricePaid = parseFloat(inputs.price);
  const qtyVal = parseFloat(inputs.qty);

  if (
    isNaN(pricePaid) ||
    pricePaid <= 0 ||
    isNaN(qtyVal) ||
    qtyVal <= 0
  ) {
    return null;
  }

  const quantityGrams = toGrams(qtyVal, inputs.unit);
  if (quantityGrams <= 0) {
    return null;
  }

  const pricePerGram = pricePaid / quantityGrams;
  const pricePerKg = pricePerGram * 1000;
  const pricePer100g = pricePerGram * 100;

  if (!isFinite(pricePerKg) || !isFinite(pricePer100g)) {
    return null;
  }

  const formulaMath = `Price per kg = (Price Paid ÷ Quantity in gm) × 1000 gm`;
  const formulaExplanation = `(${formatCurrency(pricePaid)} ÷ ${formatCleanNumber(
    quantityGrams
  )} gm) × 1000 gm = ${formatCurrency(pricePerKg)}/kg`;

  const steps: FormulaStep[] = [
    {
      stepNumber: 1,
      label: 'Convert Quantity Received to Grams',
      expression: `${inputs.qty} ${inputs.unit} = ${formatCleanNumber(quantityGrams)} gm`,
      explanation: 'Express the product weight in grams.',
    },
    {
      stepNumber: 2,
      label: 'Calculate Price Per Gram',
      expression: `${formatCurrency(pricePaid)} ÷ ${formatCleanNumber(quantityGrams)} gm = ${formatCurrency(pricePerGram)}/gm`,
      explanation: 'Calculate cost per single gram.',
    },
    {
      stepNumber: 3,
      label: 'Scale up to 1 Kilogram (1,000 gm)',
      expression: `${formatCurrency(pricePerGram)} × 1000 gm = ${formatCurrency(pricePerKg)}/kg`,
      explanation: 'Multiply per-gram rate by 1,000 to get normalized cost per 1 kg.',
    },
  ];

  return {
    mode: 'pricePerKg',
    pricePaid,
    quantityGrams,
    pricePerKg,
    pricePer100g,
    pricePerGram,
    formattedQuantity: formatQuantity(quantityGrams),
    formulaExplanation,
    formulaMath,
    steps,
  };
}

/**
 * Reusable Utility for Future Product Comparison Feature (Section 26)
 * Compares multiple products by their normalized price per kg.
 */
export function compareProducts(products: ProductItem[]): ProductComparisonResult[] {
  if (!products || products.length === 0) return [];

  const evaluated = products.map((prod) => {
    const totalGrams = toGrams(prod.qty, prod.unit);
    const pricePerGram = totalGrams > 0 ? prod.price / totalGrams : Infinity;
    const pricePerKg = pricePerGram * 1000;

    return {
      product: prod,
      pricePerKg,
      pricePerGram,
      formattedQuantity: formatQuantity(totalGrams),
      isBestValue: false,
    };
  });

  // Find lowest price per kg
  let minPricePerKg = Infinity;
  let maxPricePerKg = 0;

  evaluated.forEach((item) => {
    if (isFinite(item.pricePerKg)) {
      if (item.pricePerKg < minPricePerKg) minPricePerKg = item.pricePerKg;
      if (item.pricePerKg > maxPricePerKg) maxPricePerKg = item.pricePerKg;
    }
  });

  return evaluated.map((item) => {
    const isBestValue = item.pricePerKg === minPricePerKg && isFinite(minPricePerKg);
    const savingsVsHighestPercent =
      maxPricePerKg > 0 && maxPricePerKg !== Infinity
        ? Math.round(((maxPricePerKg - item.pricePerKg) / maxPricePerKg) * 100)
        : 0;

    return {
      ...item,
      isBestValue,
      savingsVsHighestPercent: Math.max(0, savingsVsHighestPercent),
    };
  });
}
