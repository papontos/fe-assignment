const toCurrencyItem = (value, currency = "USD", enableCurrency = true) => {
  if (enableCurrency) {
    return value.toFixed(2) + " " + currency;
  }
  return value.toFixed(2) + "";
};

export default toCurrencyItem;
