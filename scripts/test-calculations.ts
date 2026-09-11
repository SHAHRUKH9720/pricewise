import { calculatePriceForQuantity, calculateQuantityForMoney, calculatePricePerKg } from '../src/features/price-calculator/utils/calculations';
import { formatQuantity, formatCurrency } from '../src/features/price-calculator/utils/formatting';

console.log('=== RUNNING BUSINESS LOGIC VERIFICATION TESTS ===\n');

let failed = false;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}`);
    failed = true;
  }
}

// Test 1: ₹500 / 1 kg → 250 gm = ₹125
const res1 = calculatePriceForQuantity({
  price: '500',
  originalQty: '1',
  originalUnit: 'kg',
  requiredQty: '250',
  requiredUnit: 'gm',
});
assert(res1 !== null && res1.requiredPrice === 125, '₹500 / 1 kg → 250 gm = ₹125');

// Test 2: ₹80 / 200 gm → ₹400/kg
const res2 = calculatePricePerKg({
  price: '80',
  qty: '200',
  unit: 'gm',
});
assert(res2 !== null && res2.pricePerKg === 400, '₹80 / 200 gm → ₹400/kg');

// Test 3: ₹750 / 1.5 kg → ₹500/kg
const res3 = calculatePricePerKg({
  price: '750',
  qty: '1.5',
  unit: 'kg',
});
assert(res3 !== null && res3.pricePerKg === 500, '₹750 / 1.5 kg → ₹500/kg');

// Test 4: ₹500/kg → ₹200 budget = 400 gm
const res4 = calculateQuantityForMoney({
  price: '500',
  priceQty: '1',
  priceUnit: 'kg',
  budget: '200',
});
assert(res4 !== null && res4.obtainedGrams === 400 && res4.formattedQuantity === '400 gm', '₹500/kg → ₹200 budget = 400 gm');

// Test 5: ₹500/kg → ₹750 budget = 1 kg 500 gm
const res5 = calculateQuantityForMoney({
  price: '500',
  priceQty: '1',
  priceUnit: 'kg',
  budget: '750',
});
assert(res5 !== null && res5.formattedQuantity === '1 kg 500 gm', '₹500/kg → ₹750 budget = 1 kg 500 gm');

// Test 6: ₹100 / 250 gm → ₹400/kg
const res6 = calculatePricePerKg({
  price: '100',
  qty: '250',
  unit: 'gm',
});
assert(res6 !== null && res6.pricePerKg === 400, '₹100 / 250 gm → ₹400/kg');

// Quantity Formatting Tests
assert(formatQuantity(1000) === '1 kg', '1000 gm → 1 kg');
assert(formatQuantity(1500) === '1 kg 500 gm', '1500 gm → 1 kg 500 gm');
assert(formatQuantity(2000) === '2 kg', '2000 gm → 2 kg');
assert(formatQuantity(2500) === '2 kg 500 gm', '2500 gm → 2 kg 500 gm');
assert(formatQuantity(3250) === '3 kg 250 gm', '3250 gm → 3 kg 250 gm');

if (failed) {
  console.error('\n❌ SOMETHING FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ ALL BUSINESS LOGIC TESTS PASSED PERFECTLY!');
}
