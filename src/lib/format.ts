import type { MonthRow } from '../types';

export function formatTokenAmount(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function exportScheduleCsv(months: MonthRow[]): string {
  const header = 'month,circulating,locked\n';
  const rows = months
    .map((row) => `${row.month},${Math.round(row.circulating)},${Math.round(row.locked)}`)
    .join('\n');
  return header + rows;
}
