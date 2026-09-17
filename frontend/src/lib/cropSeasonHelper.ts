import { CroppingSeason } from '../types/cropCalendar';

export function getCurrentCroppingSeason(monthIndex = new Date().getMonth()): CroppingSeason {
  // monthIndex: 0 = Jan, 11 = Dec
  if (monthIndex >= 5 && monthIndex <= 9) {
    return 'KHARIF'; // June to October
  } else if (monthIndex >= 10 || monthIndex <= 2) {
    return 'RABI'; // November to March
  }
  return 'ZAID'; // April to May
}
