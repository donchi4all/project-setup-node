import moment from 'moment';

export function toDateTime(date: string) {
  return moment(date, 'YYYY-MM-DD').toDate();
}

export function startOfDay(date: string) {
  return new Date(new Date(`${date} GMT`).setUTCHours(0, 0, 0, 0));
}

export function endOfDay(date: string) {
  return new Date(new Date(`${date} GMT`).setUTCHours(23, 59, 59, 999));
}

export function toDateFormat(date: string | number, format: string = 'DD MMMM YYYY') {
  return moment(new Date(date)).format(format);
}
// unitOfTime can be hours or days etc..
export function checkDate(
  date: string | Date | number,
  interval: number = 24,
  unitOfTime: moment.unitOfTime.Diff = 'hours',
) {
  const newDate = moment(new Date(date));
  const currentDate = moment(new Date());
  const diff = currentDate.diff(newDate, unitOfTime);
  if (diff <= interval) return true;
  return false;
}

export function isValidYear(year: number) {
  if (!Number.isInteger(year)) {
    return false;
  }

  const currentYear = moment().year();
  const minYear = 1900;
  const maxYear = currentYear;

  if (year < minYear || year > maxYear) {
    return false;
  }

  return true;
}

export function getCurrentYear() {
  return moment().year();
}

export function getCurrentMonth() {
  return moment().month() + 1;
}

export function isValidMonth(month: number) {
  return month >= 1 && month <= 12;
}

export function startOfMonth(month: number, year: number) {
  return moment({ year, month: month - 1 })
    .startOf('month')
    .format('YYYY-MM-DD HH:mm:ss');
}

export function endOfMonth(month: number, year: number) {
  return moment({ year, month: month - 1 })
    .endOf('month')
    .format('YYYY-MM-DD HH:mm:ss');
}

export function currentMonth() {
  return moment().month() + 1;
}

export function currentYear() {
  return moment().year();
}
