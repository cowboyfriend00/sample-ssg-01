export const numberFormatter3Digit = (
  value = 0,
  options?: Intl.NumberFormatOptions
): string | number =>
  !isNaN(Number(value))
    ? new Intl.NumberFormat("en-US", options).format(value)
    : value;
