import { useMemo, useState } from 'react';
import { Controls } from './components/Controls';
import { AllocationTable } from './components/AllocationTable';
import { SupplyChart } from './components/SupplyChart';
import { PRESETS, DEFAULT_ALLOCATIONS } from './lib/presets';
import { exportScheduleCsv, simulateTokenomics } from './lib/simulate';
import { sumAllocationPercents } from './lib/math';
import type { Allocation } from './types';

export default function App() {
  const [totalSupply, setTotalSupply] = useState(1_000_000_000);
  const [tgePercent, setTgePercent] = useState(10);
  const [horizonMonths, setHorizonMonths] = useState(48);
  const [allocations, setAllocations] = useState<Allocation[]>(DEFAULT_ALLOCATIONS);

  const result = useMemo(
    () =>
      simulateTokenomics({
        totalSupply,
        tgePercent,
        horizonMonths,
        allocations,
      }),
    [totalSupply, tgePercent, horizonMonths, allocations],
  );

  function updateAllocation(id: string, patch: Partial<Allocation>) {
    setAllocations((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function loadPreset(presetId: string) {
    const preset = PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    setTotalSupply(preset.totalSupply);
    setTgePercent(preset.tgePercent);
    setAllocations(preset.allocations);
  }

  function downloadCsv() {
    const csv = exportScheduleCsv(result.months);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tokenomics-schedule.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  const allocationTotal = sumAllocationPercents(allocations);

  return (
    <div className="app">
      <header>
        <h1>Tokenomics Simulator</h1>
        <p>Model vesting schedules and circulating supply over time.</p>
      </header>

      <div className="summary">
        <div>
          <span>Total supply</span>
          <strong>{totalSupply.toLocaleString()}</strong>
        </div>
        <div>
          <span>TGE circulating</span>
          <strong>{Math.round(result.tgeCirculating).toLocaleString()}</strong>
        </div>
        <div>
          <span>Allocation total</span>
          <strong className={allocationTotal !== 100 ? 'warn' : ''}>{allocationTotal.toFixed(1)}%</strong>
        </div>
      </div>

      <div className="layout">
        <Controls
          totalSupply={totalSupply}
          tgePercent={tgePercent}
          horizonMonths={horizonMonths}
          allocations={allocations}
          onTotalSupplyChange={setTotalSupply}
          onTgeChange={setTgePercent}
          onHorizonChange={setHorizonMonths}
          onAllocationChange={updateAllocation}
          onPreset={loadPreset}
        />

        <div className="results">
          <SupplyChart months={result.months} />
          <AllocationTable rows={result.allocations} />
          <div className="actions">
            <button type="button" onClick={downloadCsv}>
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <footer className="note">Linear vesting only. Verify numbers before publishing a token plan.</footer>
    </div>
  );
}
