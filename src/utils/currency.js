export const charCurrency = (currency) => {
  let char, amount;

  if (currency / 1000000000 >= 1) {
    char = 'b';
    amount = currency / 1000000;
  } else if (currency / 1000000 >= 1) {
    char = 'm';
    amount = currency / 1000000;
  } else if (currency / 1000 >= 1) {
    char = 'k';
    amount = currency / 1000;
  } else {
    char = '';
    amount = currency;
  }

  return {
    char,
    amount
  };
};
