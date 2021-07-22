export const round = (val, decimalDigits = 2) => {
  if (!val || !val.toFixed) {
    return 0;
  }
  return Number(val.toFixed(decimalDigits));
};
