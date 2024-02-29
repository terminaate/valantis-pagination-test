export const formatPrice = (value: string | number, separator = ' ') => {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
