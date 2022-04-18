import type { SimulationInput, SimulationResult, MonthRow, AllocationRow } from '../types';
import { allocationTokens, unlockedAtMonth, clampPercent } from './math';

export function simulateTokenomics(input: SimulationInput): SimulationResult {
  const totalSupply = Math.max(0, input.totalSupply);
  const tgeAmount = (totalSupply * clampPercent(input.tgePercent)) / 100;

  const allocRows: AllocationRow[] = input.allocations.map((item) => {
    const tokens = allocationTokens(totalSupply, item.percent);
    return {
      id: item.id,
      label: item.label,
      tokens,
      unlocked: 0,
      locked: tokens,
    };
  });

  const months: MonthRow[] = [];

  for (let month = 0; month <= input.horizonMonths; month += 1) {
    let vested = tgeAmount;

    input.allocations.forEach((item, index) => {
      vested += unlockedAtMonth(
        allocRows[index].tokens,
        item.cliffMonths,
        item.vestMonths,
        month,
      );
    });

    const circulating = Math.min(totalSupply, vested);
    months.push({
      month,
      circulating,
      locked: totalSupply - circulating,
    });
  }

  const updatedAllocations = allocRows.map((row, index) => {
    const item = input.allocations[index];
    const unlocked = unlockedAtMonth(row.tokens, item.cliffMonths, item.vestMonths, input.horizonMonths);
    return {
      ...row,
      unlocked,
      locked: row.tokens - unlocked,
    };
  });

  return {
    totalSupply,
    tgeCirculating: tgeAmount,
    months,
    allocations: updatedAllocations,
  };
}
