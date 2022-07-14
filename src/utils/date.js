export function dateFormatted(date) {
  return date.toISOString().slice(0, 10);
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function daysMinusfromDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
