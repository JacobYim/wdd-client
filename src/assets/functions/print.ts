export const rangeWithUnit = (range: number, integer?: boolean) =>
  range < 1
    ? `${Math.round(range * 1000)}m`
    : `${integer ? Math.floor(range) : range.toFixed(2)}km`;

export const timeWithUnit = (seconds: number) => {
  if (seconds < 60) return `${seconds}초`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분`;
  return `${Math.floor(seconds / 3600)}시간`;
};
