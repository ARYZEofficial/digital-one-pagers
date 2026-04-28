export const SANDBOX_MARKETS = [
  "United Kingdom",
  "Denmark",
  "European Union",
  "Global",
  "Other",
] as const;

export type SandboxMarket = (typeof SANDBOX_MARKETS)[number];

export const averageTransactionBands: Record<SandboxMarket, readonly string[]> = {
  "United Kingdom": [
    "Under £25",
    "£25 to £100",
    "£100 to £500",
    "£500 to £2,500",
    "£2,500+",
  ],
  Denmark: [
    "Under DKK 200",
    "DKK 200 to DKK 750",
    "DKK 750 to DKK 3,750",
    "DKK 3,750 to DKK 18,500",
    "DKK 18,500+",
  ],
  "European Union": [
    "Under €25",
    "€25 to €100",
    "€100 to €500",
    "€500 to €2,500",
    "€2,500+",
  ],
  Global: [
    "Under $25",
    "$25 to $100",
    "$100 to $500",
    "$500 to $2,500",
    "$2,500+",
  ],
  Other: [
    "Under $25",
    "$25 to $100",
    "$100 to $500",
    "$500 to $2,500",
    "$2,500+",
  ],
};

export function bandsForMarket(market: SandboxMarket | ""): readonly string[] {
  if (!market) return averageTransactionBands["United Kingdom"];
  return averageTransactionBands[market] ?? averageTransactionBands.Global;
}
