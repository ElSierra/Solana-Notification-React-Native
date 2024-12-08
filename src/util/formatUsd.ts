const number = 1234.56;

// Format the number as US currency

export const formatUsd = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};
