import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface Props {
  repairCosts: number[];
  replaceCosts: number[];
}

const TimelineChart = ({ repairCosts, replaceCosts }: Props) => {
  const data = [
    { year: 'Year 1', repair: repairCosts[0], replace: replaceCosts[0] },
    { year: 'Year 2', repair: repairCosts[1], replace: replaceCosts[1] },
    { year: 'Year 3', repair: repairCosts[2], replace: replaceCosts[2] },
    { year: 'Year 4', repair: repairCosts[3], replace: replaceCosts[3] },
    { year: 'Year 5', repair: repairCosts[4], replace: replaceCosts[4] },
  ];

  // Find crossover year
  let crossoverYear: string | null = null;
  for (let i = 1; i < data.length; i++) {
    if (data[i - 1].repair < data[i - 1].replace && data[i].repair >= data[i].replace) {
      crossoverYear = data[i].year;
      break;
    }
  }

  const formatDollar = (val: number) => `$${(val / 1000).toFixed(0)}k`;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <h3 className="text-sm font-semibold text-slate-800">5-Year Projected Cost Comparison</h3>
        {crossoverYear && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
            Crossover: {crossoverYear}
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatDollar} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={45} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`,
              name === 'repair' ? 'Repair Path (Cumulative)' : 'Replace Path (Cumulative)',
            ]}
            contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)' }}
            labelStyle={{ fontWeight: 600, color: '#1e293b' }}
          />
          <Legend
            formatter={(value) => (value === 'repair' ? 'Repair Path' : 'Replacement Path')}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
          {crossoverYear && (
            <ReferenceLine
              x={crossoverYear}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{ value: 'Crossover', position: 'top', fontSize: 10, fill: '#d97706' }}
            />
          )}
          <Line type="monotone" dataKey="repair" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4, fill: '#14b8a6' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="replace" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-slate-400 mt-2">Repair path reflects escalating costs based on age, failure frequency, and downtime exposure. Replacement path includes acquisition and minimal ongoing maintenance.</p>
    </div>
  );
};

export default TimelineChart;
