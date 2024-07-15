export const getItem = (key) => {
  const item = window.localStorage.getItem(key);
  return item;
};
