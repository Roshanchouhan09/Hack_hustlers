export function parseAccumulatedGdd(dailyObservations: Array<{ tMax: number; tMin: number }>, tBase = 5.0): number {
  return dailyObservations.reduce((acc, obs) => {
    const mean = (obs.tMax + obs.tMin) / 2;
    const gdd = Math.max(0, mean - tBase);
    return Number((acc + gdd).toFixed(1));
  }, 0);
}
