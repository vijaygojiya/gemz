export const convertNumUnit = (number: number) => {
  const suffixes = ["", "K", "M", "B"];
  let suffixIndex = 0;

  const isNegative = number < 0;
  number = Math.abs(number); // Convert to positive for formatting

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  const formattedNumber = `${number.toFixed(2)} ${suffixes[suffixIndex]}`;
  return isNegative ? `-${formattedNumber}` : formattedNumber;
};
