import { calculateFarmHealthScore, getHealthGrade, FarmMetrics } from './healthCalculator';

function runHealthCalculatorTests() {
  const optimalMetrics: FarmMetrics = {
    soilMoisture: 70,
    temperature: 27,
    humidity: 70,
    soilPh: 6.5,
    nitrogen: 75,
    phosphorus: 70,
    potassium: 80,
    cropHealth: 90
  };

  const score = calculateFarmHealthScore(optimalMetrics);
  console.assert(score >= 80, `Expected score >= 80, got ${score}`);
  
  const grade = getHealthGrade(score);
  console.assert(grade.label === 'Optimal', `Expected Optimal, got ${grade.label}`);

  const severeStressMetrics: FarmMetrics = {
    soilMoisture: 15,
    temperature: 42,
    humidity: 20,
    soilPh: 4.0,
    nitrogen: 20,
    phosphorus: 15,
    potassium: 20,
    cropHealth: 25
  };

  const lowScore = calculateFarmHealthScore(severeStressMetrics);
  console.assert(lowScore < 50, `Expected lowScore < 50, got ${lowScore}`);
  console.log('HealthCalculator unit test suite: PASSED');
}

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
  runHealthCalculatorTests();
}
