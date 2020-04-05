export const validateInputLength = (item, length) => {
  const lengthToCheck = length || 70;
  return item > lengthToCheck;
};
