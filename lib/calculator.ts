export type CalculatorInput = {
  monthlyTransactions: number;
  averageTransactionValue: number;
  currentCardFeePercent: number;
};

export type CalculatorResult = {
  monthlyVolume: number;
  currentCardCost: number;
  unitPrice: number;
  aryzeInternalCost: number;
  monthlySavings: number;
  yearlySavings: number;
  isNegative: boolean;
};

export const getUnitPrice = (monthlyTransactions: number): number =>
  monthlyTransactions < 50_000 ? 0.75 : 0.5;

export function computeSavings(input: CalculatorInput): CalculatorResult {
  const monthlyVolume =
    input.monthlyTransactions * input.averageTransactionValue;
  const currentCardCost = monthlyVolume * (input.currentCardFeePercent / 100);
  const unitPrice = getUnitPrice(input.monthlyTransactions);
  const aryzeInternalCost = input.monthlyTransactions * unitPrice;
  const monthlySavings = currentCardCost - aryzeInternalCost;
  return {
    monthlyVolume,
    currentCardCost,
    unitPrice,
    aryzeInternalCost,
    monthlySavings,
    yearlySavings: monthlySavings * 12,
    isNegative: monthlySavings < 0,
  };
}

export const monthlyTransactionOptions = [
  { value: 25_000, key: "under50k" },
  { value: 75_000, key: "50to100k" },
  { value: 175_000, key: "100to250k" },
  { value: 375_000, key: "250to500k" },
  { value: 750_000, key: "500to1m" },
  { value: 1_750_000, key: "1to2_5m" },
  { value: 3_750_000, key: "2_5to5m" },
  { value: 5_000_000, key: "5mPlus" },
] as const;

export const averageTransactionValueOptions = [
  { value: 10, key: "under20" },
  { value: 25, key: "20to35" },
  { value: 50, key: "35to75" },
  { value: 100, key: "75to150" },
  { value: 250, key: "150plus" },
] as const;
