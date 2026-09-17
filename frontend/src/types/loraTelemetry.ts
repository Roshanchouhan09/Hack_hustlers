export interface LoRaSoilPacket {
  devEui: string;
  gatewayId: string;
  snrDb: number;
  rssiDbm: number;
  frequencyMhz: number;
  batteryVoltageMv: number;
  soilMoistureVwc: number; // Volumetric Water Content (%)
  soilTemperatureC: number;
  soilEcMicroSiemens: number;
  timestamp: string;
}
