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
  { value: 25_000, label: "Under 50,000" },
  { value: 75_000, label: "50,000 – 100,000" },
  { value: 175_000, label: "100,000 – 250,000" },
  { value: 375_000, label: "250,000 – 500,000" },
  { value: 750_000, label: "500,000 – 1M" },
  { value: 1_750_000, label: "1M – 2.5M" },
  { value: 3_750_000, label: "2.5M – 5M" },
  { value: 5_000_000, label: "5M+" },
] as const;

export const averageTransactionValueOptions = [
  { value: 10, label: "Under 20" },
  { value: 25, label: "20 – 35" },
  { value: 50, label: "35 – 75" },
  { value: 100, label: "75 – 150" },
  { value: 250, label: "150+" },
] as const;
