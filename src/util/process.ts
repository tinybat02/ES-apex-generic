export const processData = (buffer: number[]) => {
  return buffer.slice(-7).reduce((total, elm) => total + elm, 0);
};
