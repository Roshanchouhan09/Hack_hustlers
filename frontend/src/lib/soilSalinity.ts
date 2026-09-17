export function classifySalinityHazard(ecDeciSiemens: number): { hazard: string; advice: string } {
  if (ecDeciSiemens < 2.0) {
    return { hazard: 'NON_SALINE', advice: 'Safe for all crop varieties.' };
  } else if (ecDeciSiemens < 4.0) {
    return { hazard: 'SLIGHTLY_SALINE', advice: 'Sensitive pulses may experience slight yield drop.' };
  } else if (ecDeciSiemens < 8.0) {
    return { hazard: 'MODERATELY_SALINE', advice: 'Use salt-tolerant varieties like KRL-210 wheat or CSR-36 rice.' };
  }
  return { hazard: 'STRONGLY_SALINE', advice: 'Immediate leaching fraction and drainage required.' };
}
