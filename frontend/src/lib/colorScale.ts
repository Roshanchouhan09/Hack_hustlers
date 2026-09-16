export function getNDVIColor(ndvi: number): string {
  if (ndvi >= 0.7) return '#15803d'; // dense healthy green
  if (ndvi >= 0.5) return '#22c55e'; // moderate green
  if (ndvi >= 0.3) return '#eab308'; // early stress yellow
  return '#ef4444'; // critical stress / soil red
}
