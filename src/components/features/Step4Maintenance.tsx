import type { Step4Data, PMFrequency, ServiceContractStatus } from '@/types/calculator';

interface Props {
  data: Step4Data;
  onChange: (updates: Partial<Step4Data>) => void;
  onCalculate: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const PM_OPTIONS: { value: PMFrequency; label: string; sub: string; icon: string }[] = [
  { value: 'always', label: 'Always', sub: 'Scheduled PM every 6–12 months', icon: '✅' },
  { value: 'mostly', label: 'Mostly', sub: 'Usually maintained, occasional gaps', icon: '🟡' },
  { value: 'occasionally', label: 'Occasionally', sub: 'Irregular maintenance schedule', icon: '🟠' },
  { value: 'rarely', label: 'Rarely / Never', sub: 'Reactive maintenance only', icon: '🔴' },
];

const SERVICE_OPTIONS: { value: ServiceContractStatus; label: string; sub: string }[] = [
  { value: 'active', label: 'Active Contract', sub: 'Currently covered by service agreement' },
  { value: 'expired', label: 'Expired', sub: 'Contract previously existed, now lapsed' },
  { value: 'never', label: 'Never Had One', sub: 'No service contract history' },
];

const Step4Maintenance = ({ data, onChange, onCalculate, onBack, isLoading }: Props) => {
  const isValid = data.pmFrequency !== '' && data.serviceContractStatus !== '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Maintenance History</h2>
        <p className="text-sm text-slate-500">Maintenance compliance significantly impacts equipment lifecycle and risk assessment.</p>
      </div>

      {/* PM Frequency */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Preventive Maintenance Performed Regularly? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ pmFrequency: opt.value })}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                data.pmFrequency === opt.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{opt.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{opt.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{opt.sub}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Service Contract Status */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Service Contract Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SERVICE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ serviceContractStatus: opt.value })}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                data.serviceContractStatus === opt.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-sm font-semibold text-slate-800">{opt.label}</p>
              <p className="text-xs text-slate-500 mt-1">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Summary notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Maintenance history accounts for 10% of the final decision score. Consistent PM lowers overall lifecycle risk and can extend viable equipment life by 20–30%.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all text-sm">
          ← Back
        </button>
        <button
          onClick={onCalculate}
          disabled={!isValid || isLoading}
          className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-8 rounded-xl transition-all text-sm shadow-sm hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Running Analysis…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Generate Intelligence Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4Maintenance;
