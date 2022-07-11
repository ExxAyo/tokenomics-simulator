import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MonthRow } from '../types';
import { formatTokenAmount } from '../lib/format';

interface Props {
  months: MonthRow[];
}

export function SupplyChart({ months }: Props) {
  return (
    <section className="panel chart-panel">
      <h2>Circulating supply</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={months}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} label={{ value: 'Month', position: 'insideBottom', offset: -4 }} />
          <YAxis tickFormatter={(v) => formatTokenAmount(Number(v))} tick={{ fontSize: 12 }} width={56} />
          <Tooltip formatter={(value: number) => formatTokenAmount(value)} />
          <Legend />
          <Line type="monotone" dataKey="circulating" name="Circulating" stroke="#2563eb" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="locked" name="Locked" stroke="#737373" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
