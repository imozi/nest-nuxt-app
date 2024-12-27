export const getDeclension = (n: number, forms: [string, string, string]): string => {
  const absNumber = Math.abs(n);
  const lastDigit = absNumber % 10;
  const lastTwoDigits = absNumber % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${n} ${forms[2]}`;
  }

  switch (lastDigit) {
    case 1:
      return `${n} ${forms[0]}`;
    case 2:
    case 3:
    case 4:
      return `${n} ${forms[1]}`;
    default:
      return `${n} ${forms[2]}`;
  }
};
