export function getWeatherConditionTheme(condition: string) {
  const lower = condition.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) {
    return { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
  }
  if (lower.includes('rain') || lower.includes('drizzle')) {
    return { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
  }
  return { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
}
