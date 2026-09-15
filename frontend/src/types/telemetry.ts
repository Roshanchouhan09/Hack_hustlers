export interface DroneAvionicsTelemetry {
  droneId: string;
  altitudeMeters: number;
  groundSpeedMps: number;
  batteryPercentage: number;
  satellitesLocked: number;
  rtkStatus: 'FIXED' | 'FLOAT' | 'STANDALONE';
  timestamp: string;
}

export interface SensorNodeReading {
  sensorId: string;
  depthCm: number;
  moisturePercentage: number;
  temperatureCelsius: number;
  batteryVoltage: number;
}
