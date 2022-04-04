export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function allocationTokens(totalSupply: number, percent: number): number {
  return (totalSupply * clampPercent(percent)) / 100;
}

export function unlockedAtMonth(
  tokens: number,
  cliffMonths: number,
  vestMonths: number,
  month: number,
): number {
  if (month < cliffMonths) return 0;
  if (vestMonths <= 0) return tokens;
  const elapsed = month - cliffMonths + 1;
  const progress = Math.min(1, elapsed / vestMonths);
  return tokens * progress;
}
