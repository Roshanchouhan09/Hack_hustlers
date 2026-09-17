export type CroppingSeason = 'KHARIF' | 'RABI' | 'ZAID';

export interface CropSeasonInfo {
  season: CroppingSeason;
  sowingMonths: string[];
  harvestMonths: string[];
  benchmarkThermalUnitsGdd: number;
  dominantWaterSource: 'MONSOON_RAINFED' | 'TUBEWELL_IRRIGATED' | 'CANAL_LIFT';
}
