/**
 * Input validation utility functions for price calculator forms.
 */

export interface FieldValidationError {
  isValid: boolean;
  message?: string;
}

export function validateNumericInput(
  value: string,
  fieldName: string = 'Field'
): FieldValidationError {
  if (value === undefined || value === null || value.trim() === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return {
      isValid: false,
      message: 'Please enter a valid number',
    };
  }

  if (num <= 0) {
    return {
      isValid: false,
      message: `${fieldName} must be greater than 0`,
    };
  }

  return { isValid: true };
}
