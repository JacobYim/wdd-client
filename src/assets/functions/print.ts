export const rangeWithUnit = (range: number, integer?: boolean) =>
  range < 1
    ? `${Math.round(range * 1000)}m`
    : `${integer ? Math.floor(range) : range.toFixed(2)}km`;

export const timeWithUnit = (seconds: number) => {
  const calcSecond = seconds / 60;
  if (calcSecond < 1) return `${seconds}초`;
  const calcMinute = calcSecond / 60;
  if (calcMinute < 1) return `${Math.floor(calcMinute)}분`;
  return `${Math.floor(calcMinute / 60)}시간`;
};
