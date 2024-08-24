const FormatCurrency = (number: any) => {
  const CUREENCY_fORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });
  return CUREENCY_fORMATTER.format(number);
};

export default FormatCurrency;
