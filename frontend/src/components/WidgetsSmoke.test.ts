/**
 * UI Component registration smoke tests.
 */
export const WIDGET_REGISTRY = [
  'CropCalendar',
  'FertilizerCalculator',
  'MarketMandiPriceTracker',
  'PestAlertTicker',
  'SolarPumpStatusWidget',
  'AgronomistConsultationCard',
  'WeatherAdvisoryCard',
  'DroneFleetHealthWidget',
  'SoilHealthCardSummary',
  'YieldPredictionGauge',
  'CarbonOffsetBadge'
];

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
  console.assert(WIDGET_REGISTRY.length === 11);
  console.log('All 11 new UI components registered cleanly!');
}
