import type { WeightUnit } from '../types';

/**
 * Converts any quantity in grams or kilograms to grams.
 * Logic:
 * - gm -> value
 * - kg -> value * 1000
 */
export function toGrams(value: number, unit: WeightUnit): number {
  if (isNaN(value) || value <= 0) {
    return 0;
  }
  if (unit === 'kg') {
    return value * 1000;
  }
  return value;
}

/**
 * Converts a quantity in grams to the specified target weight unit.
 */
export function gramsToUnit(grams: number, targetUnit: WeightUnit): number {
  if (isNaN(grams) || grams <= 0) {
    return 0;
  }
  if (targetUnit === 'kg') {
    return grams / 1000;
  }
  return grams;
}
