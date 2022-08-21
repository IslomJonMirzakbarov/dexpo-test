export const compareMinutes = (start, end) =>
  end.getMinutes() - start.getMinutes();

export const compareHours = (start, end) => end.getHours() - start.getHours();

export const compareDays = (start, end) => end.getDate() - start.getDate();

export const compareMonths = (start, end) => end.getMonth() - start.getMonth();

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export const calculateDeadline = (start, end) => {
  const now = Math.round(new Date().getTime() / 1000);

  if (now < start) return 'Not started yet';

  const parsedStart = new Date(now * 1000);
  const parsedEnd = new Date(end * 1000);

  const currentYear = parsedEnd.getFullYear();
  const currentMonth = parsedEnd.getMonth() + 1;

  const dayInEndMonth = daysInMonth(currentMonth, currentYear);

  if (now > end) return '0 times';

  const comparedMonth = compareMonths(parsedStart, parsedEnd);
  const comparedDays = compareDays(parsedStart, parsedEnd);

  if (comparedMonth > 0 && comparedDays > 0) return comparedMonth + ' months';

  if (comparedDays + comparedMonth * dayInEndMonth > 0)
    return comparedDays + comparedMonth * dayInEndMonth + ' days';

  const comparedHours = compareHours(parsedStart, parsedEnd);
  if (comparedHours > 0) return comparedHours + ' hours';

  const comparedMinutes = compareMinutes(parsedStart, parsedEnd);
  if (comparedMinutes > 0) return comparedMinutes + ' minutes';

  return 'Auction finished';
};
