export const getTimeStamp = () => {
  // TODO: refactor
  return new Date().toISOString().split('T')[0].split('-').join('');
};
