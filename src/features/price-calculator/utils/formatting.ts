/**
 * Utility functions for formatting quantities and currencies (INR).
 */

/**
 * Formats a raw number cleanly without trailing zeros.
 * Examples:
 * 250 -> "250"
 * 250.50 -> "250.5"
 * 250.25 -> "250.25"
 */
export function formatCleanNumber(val: number, maxDecimals: number = 2): string {
  if (isNaN(val)) return '0';
  
  // Round to maxDecimals
  const factor = Math.pow(10, maxDecimals);
  const rounded = Math.round((val + Number.EPSILON) * factor) / factor;
  
  return rounded.toLocaleString('en-IN', {
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Formats grams into an intelligent human-friendly weight string.
 *
 * Examples:
 * 250    -> "250 gm"
 * 999    -> "999 gm"
 * 1000   -> "1 kg"
 * 1500   -> "1 kg 500 gm"
 * 2000   -> "2 kg"
 * 2500   -> "2 kg 500 gm"
 * 3250   -> "3 kg 250 gm"
 */
export function formatQuantity(grams: number): string {
  if (isNaN(grams) || grams <= 0) {
    return '0 gm';
  }

  // Round to nearest 2 decimal places for fractional grams
  const roundedGrams = Math.round((grams + Number.EPSILON) * 100) / 100;

  if (roundedGrams < 1000) {
    return `${formatCleanNumber(roundedGrams, 2)} gm`;
  }

  const kgs = Math.floor(roundedGrams / 1000);
  const remainingGrams = Math.round(((roundedGrams % 1000) + Number.EPSILON) * 100) / 100;

  if (remainingGrams === 0) {
    return `${formatCleanNumber(kgs, 2)} kg`;
  }

  return `${formatCleanNumber(kgs, 2)} kg ${formatCleanNumber(remainingGrams, 2)} gm`;
}

/**
 * Formats monetary amounts in Indian Rupees (₹).
 * Does not display decimals if the amount is a whole number.
 *
 * Examples:
 * 100     -> "₹100"
 * 1250    -> "₹1,250"
 * 125.5   -> "₹125.50"
 * 125000  -> "₹1,25,000"
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) {
    return '₹0';
  }

  const isWhole = Math.abs(amount - Math.round(amount)) < 0.001;

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  });

  return formatter.format(amount);
}

/**
 * Formats a price per kilogram string.
 * Example: 500 -> "₹500/kg"
 */
export function formatPricePerKg(pricePerKg: number): string {
  return `${formatCurrency(pricePerKg)}/kg`;
}
