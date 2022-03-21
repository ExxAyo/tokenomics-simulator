export interface Allocation {
  id: string;
  label: string;
  percent: number;
  cliffMonths: number;
  vestMonths: number;
}

export interface MonthRow {
  month: number;
  circulating: number;
  locked: number;
}

export interface AllocationRow {
  id: string;
  label: string;
  tokens: number;
  unlocked: number;
  locked: number;
}

export interface SimulationResult {
  totalSupply: number;
  tgeCirculating: number;
  months: MonthRow[];
  allocations: AllocationRow[];
}

export interface SimulationInput {
  totalSupply: number;
  tgePercent: number;
  horizonMonths: number;
  allocations: Allocation[];
}
