export type CropDiseaseSeverity = 'STAGE_1_EARLY' | 'STAGE_2_MODERATE' | 'STAGE_3_SEVERE' | 'STAGE_4_CRITICAL';

export interface DiseaseDetectionResult {
  diseaseId: string;
  commonName: string;
  scientificName: string;
  confidenceScore: number;
  affectedAcres: number;
  severityGrade: CropDiseaseSeverity;
  activeChemicalIngredient: string;
  recommendedDosageMlPerAcre: number;
}
