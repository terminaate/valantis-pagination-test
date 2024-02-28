export const getUniqueArrayByField = <T extends object>(
  arr: Array<T>,
  property: keyof T,
) => {
  return arr.reduce((acc, curr) => {
    if (acc.find((o) => o[property] === curr[property])) {
      return acc;
    }

    return [...acc, curr];
  }, [] as Array<T>);
};
