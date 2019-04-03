export const rangeWithUnit = (range: number) =>
  range < 1 ? `${Math.round(range * 1000)}m` : `${range.toFixed(2)}km`;
