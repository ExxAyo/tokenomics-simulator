import type { Allocation } from '../types';

export const DEFAULT_ALLOCATIONS: Allocation[] = [
  { id: 'team', label: 'Team', percent: 15, cliffMonths: 6, vestMonths: 24 },
  { id: 'investors', label: 'Investors', percent: 20, cliffMonths: 3, vestMonths: 18 },
  { id: 'community', label: 'Community', percent: 40, cliffMonths: 0, vestMonths: 36 },
  { id: 'treasury', label: 'Treasury', percent: 25, cliffMonths: 0, vestMonths: 48 },
];

export const PRESETS = [
  {
    id: 'standard',
    name: 'Standard launch',
    totalSupply: 1_000_000_000,
    tgePercent: 10,
    allocations: DEFAULT_ALLOCATIONS,
  },
  {
    id: 'lean',
    name: 'Lean team allocation',
    totalSupply: 500_000_000,
    tgePercent: 15,
    allocations: [
      { id: 'team', label: 'Team', percent: 10, cliffMonths: 12, vestMonths: 36 },
      { id: 'investors', label: 'Investors', percent: 15, cliffMonths: 6, vestMonths: 24 },
      { id: 'community', label: 'Community', percent: 50, cliffMonths: 0, vestMonths: 48 },
      { id: 'treasury', label: 'Treasury', percent: 25, cliffMonths: 0, vestMonths: 48 },
    ],
  },
];
