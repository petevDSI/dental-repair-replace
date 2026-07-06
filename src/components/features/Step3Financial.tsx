import type { Step3Data, BackupStatus } from '@/types/calculator';

interface Props {
  data: Step3Data;
  onChange: (updates: Partial<Step3Data>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BACKUP_OPTIONS: { value: BackupStatus; label: string; sub: string }[] = [
  { value: 'full', label: 'Full Redundancy', sub: 'Full backup available, no production loss' },
  { value: 'partial', label: 'Partial Backup', sub: 'Some impact, limited backup exists' },
  { value: 'none', label: 'No Backup', sub: 'Equipment failure directly halts production' },
];

const Step3Financial = ({ data, onChange, onNext, onBack }: Props) => {
  const isValid = data.backupStatus !== '' && data.plannedExpansion !== null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Financial Impact</h2>
        <p className="text-sm text-slate-500">Help us understand the production and financial exposure from potential downtime.</p>
      </div>

      {/* Daily Production */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700" htmlFor="dailyProd">
          Estimated Daily Production Affected
          <span className="ml-2 text-xs text-slate-400 font-normal">(optional — defaults to $3,500)</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
          <input
            id="dailyProd"
            type="number"
            min="0"
            placeholder="3500"
            value={data.estimatedDailyProduction}
            onChange={(e) => onChange({ estimatedDailyProduction: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
        </div>
        <p className="text-xs text-slate-400">Estimate the production value affected if this equipment becomes unavailable for one full day.</p>
      </div>

      {/* Backup Status */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Backup Equipment Available? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {BACKUP_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ backupStatus: opt.value })}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                data.backupStatus === opt.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{opt.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{opt.sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.backupStatus === opt.value ? 'border-teal-500 bg-teal-500' : 'border-slate-300'
                }`}>
                  {data.backupStatus === opt.value && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Planned Expansion */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Planned Practice Expansion in Next 3 Years? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: true, label: 'Yes — We plan to grow', icon: '📈' },
            { val: false, label: 'No — Maintaining current size', icon: '🏥' },
          ].map((opt) => (
            <button
              key={String(opt.val)}
              onClick={() => onChange({ plannedExpansion: opt.val })}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                data.plannedExpansion === opt.val
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-xl block mb-1">{opt.icon}</span>
              <p className="text-sm font-medium text-slate-800 leading-snug">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Technology Obsolescence Slider */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Technology Obsolescence Concern
          <span className="ml-2 text-xs text-slate-400 font-normal">(1 = minimal, 10 = very concerned)</span>
        </label>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 w-16">Minimal</span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={data.obsolescenceScore}
              onChange={(e) => onChange({ obsolescenceScore: parseInt(e.target.value) })}
              className="flex-1 accent-teal-500"
            />
            <span className="text-xs text-slate-500 w-16 text-right">Very High</span>
            <span className="w-10 text-center font-bold text-teal-600 text-xl">{data.obsolescenceScore}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Consider: imaging quality, workflow speed, software integration, patient experience.
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all text-sm">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 sm:flex-none bg-teal-600 hover:bg-teal-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-all text-sm shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step3Financial;
