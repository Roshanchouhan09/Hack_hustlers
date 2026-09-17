export function dmsToDecimal(degrees: number, minutes: number, seconds: number, direction: 'N' | 'S' | 'E' | 'W'): number {
  let decimal = degrees + (minutes / 60) + (seconds / 3600);
  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  }
  return Number(decimal.toFixed(6));
}

export function decimalToDms(decimal: number, isLatitude: boolean): string {
  const direction = isLatitude ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'W');
  const abs = Math.abs(decimal);
  const degrees = Math.floor(abs);
  const minutes = Math.floor((abs - degrees) * 60);
  const seconds = Number(((abs - degrees - minutes / 60) * 3600).toFixed(2));
  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
}
