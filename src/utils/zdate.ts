import {ZTime} from './ztime';

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function timeToMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function isNumberInRange(
  num: number,
  from: number,
  to: number,
): boolean {
  return num >= from && num <= to;
}

export function isDateInRange(
  date: Date,
  from: Date,
  to: Date | null,
  ignoreTime: boolean = true,
): boolean {
  const _date = new Date(date);
  const _from = new Date(from);
  const _to = to ? new Date(to) : null;
  if (ignoreTime) {
    _date.setHours(0, 0, 0, 0);
    _from.setHours(0, 0, 0, 0);
    _to && _to.setHours(0, 0, 0, 0);
  }

  return (
    _date.getTime() >= _from.getTime() &&
    (_to === null || _date.getTime() <= _to.getTime())
  );
}

export function dateRange(startDate: Date, dayCount: number): Array<Date> {
  var dateArray = new Array();
  var stopDate = addDays(startDate, dayCount);
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

export function addDays(date: Date, days: number): Date {
  var newdate = new Date(date.valueOf());
  newdate.setDate(date.getDate() + days);
  return newdate;
}

export function getStringFromDate(date: Date, withTime: boolean): string {
  return (
    `${addZero(date.getDate())}-${addZero(
      date.getMonth() + 1,
    )}-${date.getFullYear()}` +
    (withTime
      ? `T${addZero(date.getHours())}:${addZero(date.getMinutes())}`
      : '')
  );
}

function addZero(num: number): string {
  return ('0' + num).slice(-2);
}

export function getDateFromString(dateTimeString: string): Date {
  const [dateString, timeString] = dateTimeString.split('T');

  const [day, month, year] = dateString.split('-').map(val => parseInt(val));
  if (day > 31 || month > 12 || year < 2019)
    throw new Error('the date format should be of type DD-MM-YYYY');

  if (timeString) {
    let ztime = ZTime.fromString(timeString);
    return new Date(year, month - 1, day, ztime.hours, ztime.minutes);
  }
  return new Date(year, month - 1, day);
}

export function getDayName(date: Date): string {
  const days = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  return days[date.getDay()];
}
export function getMonthName(date: Date, short: boolean = true): string {
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juiellet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ];

  return short
    ? months[date.getMonth()].substring(0, 4)
    : months[date.getMonth()];
}
