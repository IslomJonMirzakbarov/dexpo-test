export const compareMinutes = (start, end) =>
  end.getMinutes() - start.getMinutes();

export const compareHours = (start, end) => end.getHours() - start.getHours();

export const compareDays = (start, end) => end.getDate() - start.getDate();

export const compareMonths = (start, end) => end.getMonth() - start.getMonth();

export const calculateDeadline = (start, end) => {
  const now = Math.round(new Date().getTime() / 1000);
  const parsedStart = new Date(now * 1000);
  const parsedEnd = new Date(end * 1000);

  if (now > end) return '0 times';

  const comparedMonth = compareMonths(parsedStart, parsedEnd);
  if (comparedMonth > 0) return comparedMonth + ' months';

  const comparedDays = compareDays(parsedStart, parsedEnd);
  if (comparedDays > 0) return comparedDays + ' days';

  const comparedHours = compareHours(parsedStart, parsedEnd);
  if (comparedHours > 0) return comparedHours + ' hours';

  const comparedMinutes = compareMinutes(parsedStart, parsedEnd);
  if (comparedMinutes > 0) return comparedMinutes + ' minutes';

  return '0 times';
};
