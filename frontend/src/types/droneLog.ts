export interface DgcaFlightLogEntry {
  flightId: string;
  uinNumber: string;
  rpcLicenseNumber: string;
  takeoffTime: string;
  landingTime: string;
  takeoffLat: number;
  takeoffLon: number;
  maxAltitudeAglM: number;
  batteryStartVolt: number;
  batteryEndVolt: number;
  chemicalAppliedKg: number;
  areaCoveredAcres: number;
}
