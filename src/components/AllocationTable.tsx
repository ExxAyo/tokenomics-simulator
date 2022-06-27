import type { AllocationRow } from '../types';
import { formatTokenAmount } from '../lib/format';

interface Props {
  rows: AllocationRow[];
}

export function AllocationTable({ rows }: Props) {
  return (
    <section className="panel">
      <h2>Allocation snapshot</h2>
      <table>
        <thead>
          <tr>
            <th>Bucket</th>
            <th>Tokens</th>
            <th>Unlocked</th>
            <th>Locked</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.label}</td>
              <td>{formatTokenAmount(row.tokens)}</td>
              <td>{formatTokenAmount(row.unlocked)}</td>
              <td>{formatTokenAmount(row.locked)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
