interface ResultsMetricProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  variant?: 'default' | 'warning' | 'success';
}

const ResultsMetric = ({ label, value, sub, highlight, variant = 'default' }: ResultsMetricProps) => {
  const variantClass =
    variant === 'warning'
      ? 'bg-red-50 border-red-100'
      : variant === 'success'
      ? 'bg-emerald-50 border-emerald-100'
      : 'bg-slate-50 border-slate-100';

  const valueClass =
    variant === 'warning'
      ? 'text-red-600'
      : variant === 'success'
      ? 'text-emerald-600'
      : highlight
      ? 'text-teal-600'
      : 'text-slate-800';

  return (
    <div className={`border rounded-xl p-4 ${variantClass}`}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-xl font-bold ${valueClass}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
};

export default ResultsMetric;
