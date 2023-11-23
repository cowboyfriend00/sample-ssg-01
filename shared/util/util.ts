export const toUnit = (value?: string | number, unit = "px") => {
  if (value !== undefined) {
    return typeof value === "string" ? value : `${value}${unit}`;
  }
};

export const numberStringToDateFormat = (value: string) => {
  const match = value.match(/^(\d{0,4})?(\d{0,2})?(\d{0,2})?$/);

  return (
    match?.filter((value, index) => index !== 0 && !!value).join("-") || ""
  );
};

export const checkNullAndConvertToValue = (
  value: unknown,
  defineValue: string,
  defaultValue = "-"
) => (value ? defineValue : defaultValue);

export const isEmpty = (value: unknown) =>
  value === undefined || value === null || value === "" || value === "null";
