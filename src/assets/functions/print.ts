export const rangeWithUnit = (range: number, integer?: boolean) =>
  range < 1
    ? `${Math.round(range * 1000)}m`
    : `${integer ? Math.floor(range) : range.toFixed(2)}km`;
