export type Currency = "EUR" | "GBP" | "USD" | "DKK";

export const localeByCurrency: Record<Currency, string> = {
  DKK: "da-DK",
  EUR: "en-IE",
  GBP: "en-GB",
  USD: "en-US",
};

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(localeByCurrency[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUnitPrice(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(localeByCurrency[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
