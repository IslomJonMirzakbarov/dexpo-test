export const charCurrency = (currency) => {
  let char, amount;

  if (currency / Math.pow(10, 18) >= 1) {
    char = "QT";
    amount = currency / Math.pow(10, 18);
  } else if (currency / Math.pow(10, 15) >= 1) {
    char = "QD";
    amount = currency / Math.pow(10, 15);
  } else if (currency / Math.pow(10, 12) >= 1) {
    char = "T";
    amount = currency / Math.pow(10, 12);
  } else if (currency / Math.pow(10, 9) >= 1) {
    char = "B";
    amount = currency / Math.pow(10, 9);
  } else if (currency / Math.pow(10, 6) >= 1) {
    char = "M";
    amount = currency / Math.pow(10, 6);
  } else if (currency / Math.pow(10, 3) >= 1) {
    char = "K";
    amount = currency / Math.pow(10, 3);
  } else {
    char = "";
    amount = currency;
  }

  return {
    char,
    amount,
  };
};
