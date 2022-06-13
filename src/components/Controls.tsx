import type { Allocation } from '../types';

interface Props {
  totalSupply: number;
  tgePercent: number;
  horizonMonths: number;
  allocations: Allocation[];
  onTotalSupplyChange: (value: number) => void;
  onTgeChange: (value: number) => void;
  onHorizonChange: (value: number) => void;
  onAllocationChange: (id: string, patch: Partial<Allocation>) => void;
  onPreset: (presetId: string) => void;
}

export function Controls({
  totalSupply,
  tgePercent,
  horizonMonths,
  allocations,
  onTotalSupplyChange,
  onTgeChange,
  onHorizonChange,
  onAllocationChange,
  onPreset,
}: Props) {
  return (
    <section className="panel">
      <h2>Inputs</h2>

      <div className="field-row">
        <label htmlFor="supply">Total supply</label>
        <input
          id="supply"
          type="number"
          min={0}
          value={totalSupply}
          onChange={(e) => onTotalSupplyChange(Number(e.target.value))}
        />
      </div>

      <div className="field-row">
        <label htmlFor="tge">TGE unlock (%)</label>
        <input
          id="tge"
          type="number"
          min={0}
          max={100}
          step={0.1}
          value={tgePercent}
          onChange={(e) => onTgeChange(Number(e.target.value))}
        />
      </div>

      <div className="field-row">
        <label htmlFor="horizon">Months to simulate</label>
        <input
          id="horizon"
          type="number"
          min={12}
          max={72}
          value={horizonMonths}
          onChange={(e) => onHorizonChange(Number(e.target.value))}
        />
      </div>

      <div className="field-row">
        <label htmlFor="preset">Preset</label>
        <select id="preset" defaultValue="" onChange={(e) => e.target.value && onPreset(e.target.value)}>
          <option value="" disabled>
            Load preset
          </option>
          <option value="standard">Standard launch</option>
          <option value="lean">Lean team allocation</option>
        </select>
      </div>

      <h3>Allocations</h3>
      <div className="alloc-list">
        {allocations.map((item) => (
          <div className="alloc-item" key={item.id}>
            <div className="field-row">
              <label>{item.label}</label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={item.percent}
                onChange={(e) =>
                  onAllocationChange(item.id, { percent: Number(e.target.value) })
                }
              />
            </div>
            <div className="inline-fields">
              <div className="field-row">
                <label>Cliff (mo)</label>
                <input
                  type="number"
                  min={0}
                  value={item.cliffMonths}
                  onChange={(e) =>
                    onAllocationChange(item.id, { cliffMonths: Number(e.target.value) })
                  }
                />
              </div>
              <div className="field-row">
                <label>Vest (mo)</label>
                <input
                  type="number"
                  min={1}
                  value={item.vestMonths}
                  onChange={(e) =>
                    onAllocationChange(item.id, { vestMonths: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
