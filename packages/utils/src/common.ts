export const delayTimer = async (delay = 0) => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      resolve(true);
      clearTimeout(timer);
    }, delay);
  });
};
