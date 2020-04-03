export const validateInputLength = (item, length) => {
  const lengthToCheck = length || 70;
  console.log(item);
  console.log(lengthToCheck);
  return item > lengthToCheck;
};
