const CUREENCY_fORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export function FormatCurrency(number: any) {
  return CUREENCY_fORMATTER.format(number);
}
