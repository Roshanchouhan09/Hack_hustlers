export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatAcreage(acres: number): string {
  return `${acres.toFixed(2)} Acres (${(acres * 0.404686).toFixed(2)} Ha)`;
}
