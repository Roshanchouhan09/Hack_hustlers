export function calculatePumpDurationHours(acres: number, waterDepthMm: number, pumpDischargeLph: number): number {
  // 1 acre-mm of water = 101,171.4 liters
  const totalLiters = acres * waterDepthMm * 101171.4;
  const hours = totalLiters / pumpDischargeLph;
  return Number(hours.toFixed(1));
}
