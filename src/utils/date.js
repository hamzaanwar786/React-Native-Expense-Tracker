export function dateFormatted(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function daysMinusfromDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
