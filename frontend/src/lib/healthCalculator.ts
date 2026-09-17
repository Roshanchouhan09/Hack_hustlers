export interface FarmMetrics {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  soilPh: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  cropHealth: number;
}

export function calculateFarmHealthScore(metrics: FarmMetrics): number {
  const temperatureScore = Math.max(0, Math.min(100, 100 - Math.abs(metrics.temperature - 27) * 8));
  const soilPhScore = Math.max(0, Math.min(100, 100 - Math.abs(metrics.soilPh - 6.5) * 35));

  const weightedScore = (
    metrics.cropHealth * 0.30 +
    metrics.soilMoisture * 0.16 +
    metrics.humidity * 0.12 +
    metrics.nitrogen * 0.12 +
    metrics.phosphorus * 0.10 +
    metrics.potassium * 0.11 +
    temperatureScore * 0.09 +
    soilPhScore * 0.10
  ) / 1.10;

  return Math.round(weightedScore);
}

export function getHealthGrade(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Optimal', color: '#10b981' };
  if (score >= 60) return { label: 'Moderate Stress', color: '#f59e0b' };
  return { label: 'Critical Action Required', color: '#ef4444' };
}
