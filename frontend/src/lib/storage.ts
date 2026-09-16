export function getStoredUserPreference<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(`agrivision_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredUserPreference<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`agrivision_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('Could not persist preference to localStorage', e);
  }
}
