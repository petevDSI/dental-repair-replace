import type { Step2Data, ReliabilityRating, DowntimePerFailure, PartsAvailability, ProductionImpact, EquipmentCategory } from '@/types/calculator';
import { EQUIPMENT_ISSUES } from '@/constants/calculatorData';

interface Props {
  data: Step2Data;
  onChange: (updates: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  category: EquipmentCategory | '';
}

const RELIABILITY_OPTIONS: { value: ReliabilityRating; label: string; color: string }[] = [
  { value: 'excellent', label: 'Excellent', color: 'emerald' },
  { value: 'good', label: 'Good', color: 'teal' },
  { value: 'fair', label: 'Fair', color: 'amber' },
  { value: 'poor', label: 'Poor', color: 'orange' },
  { value: 'critical', label: 'Critical', color: 'red' },
];

const DOWNTIME_OPTIONS: { value: DowntimePerFailure; label: string }[] = [
  { value: 'under_1hr', label: 'Less than 1 hour' },
  { value: '1_4hr', label: '1–4 hours' },
  { value: 'half_day', label: 'Half day' },
  { value: 'full_day', label: 'Full day' },
  { value: 'multi_day', label: 'Multi-day' },
];

const PARTS_OPTIONS: { value: PartsAvailability; label: string; sub: string }[] = [
  { value: 'available', label: 'Readily Available', sub: 'Standard parts, fast lead time' },
  { value: 'limited', label: 'Limited', sub: 'Some parts require ordering' },
  { value: 'difficult', label: 'Difficult to Source', sub: 'Long lead times, specialty suppliers' },
  { value: 'discontinued', label: 'Discontinued', sub: 'Parts no longer manufactured' },
];

const PRODUCTION_OPTIONS: { value: ProductionImpact; label: string }[] = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'significant', label: 'Significant' },
  { value: 'critical', label: 'Critical' },
];

const reliabilityColorMap: Record<string, string> = {
  emerald: 'border-emerald-400 bg-emerald-50 text-emerald-700',
  teal: 'border-teal-400 bg-teal-50 text-teal-700',
  amber: 'border-amber-400 bg-amber-50 text-amber-700',
  orange: 'border-orange-400 bg-orange-50 text-orange-700',
  red: 'border-red-400 bg-red-50 text-red-700',
};

const SEVERITY_CONFIG = {
  low: { label: 'Minor', classes: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  medium: { label: 'Moderate', classes: 'bg-amber-50 border-amber-200 text-amber-700' },
  high: { label: 'Major', classes: 'bg-orange-50 border-orange-200 text-orange-700' },
  critical: { label: 'Critical', classes: 'bg-red-50 border-red-200 text-red-700' },
};

const Step2Condition = ({ data, onChange, onNext, onBack, category }: Props) => {
  const issues = category ? (EQUIPMENT_ISSUES[category as EquipmentCategory] ?? EQUIPMENT_ISSUES['other']!) : EQUIPMENT_ISSUES['other']!;
  const selectedIssue = issues?.find((i) => i.label === data.issueType);

  const handleIssueSelect = (label: string, avgCost: number) => {
    onChange({
      issueType: label,
      currentRepairEstimate: String(avgCost),
    });
  };

  const isValid =
    data.issueType !== '' &&
    data.currentRepairEstimate !== '' &&
    data.downtimePerFailure !== '' &&
    data.reliabilityRating !== '' &&
    data.partsAvailability !== '' &&
    data.productionImpact !== '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Current Condition</h2>
        <p className="text-sm text-slate-500">Select the primary issue and describe recent repair history.</p>
      </div>

      {/* Issue Type Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Primary Issue / Reason for Assessment <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 gap-2">
          {issues?.map((issue) => {
            const sev = SEVERITY_CONFIG[issue.severity];
            const isSelected = data.issueType === issue.label;
            return (
              <button
                key={issue.label}
                onClick={() => handleIssueSelect(issue.label, issue.avgCost)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-150 ${
                  isSelected ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-300' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isSelected ? 'text-teal-800' : 'text-slate-800'}`}>{issue.label}</p>
                    {issue.notes && (
                      <p className="text-xs text-orange-600 mt-0.5 font-medium">⚠ {issue.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${sev.classes}`}>
                      {sev.label}
                    </span>
                    <span className="text-sm font-bold text-slate-700 min-w-[70px] text-right">
                      ~${issue.avgCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {selectedIssue && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-xs text-slate-600">
            <svg className="w-4 h-4 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Estimate based on ~{selectedIssue.laborHours}hr tech time at $165/hr + parts average.
              Adjust the cost below if you have an actual quote.
            </span>
          </div>
        )}
      </div>

      {/* Current Repair Estimate + Repairs Last 24mo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="repairCost">
            Repair Estimate <span className="text-xs text-slate-400 font-normal">(adjust if needed)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input
              id="repairCost"
              type="number"
              min="0"
              placeholder="Auto-filled from issue type"
              value={data.currentRepairEstimate}
              onChange={(e) => onChange({ currentRepairEstimate: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Repairs in Last 24 Months
          </label>
          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={data.repairsLast24Months}
              onChange={(e) => onChange({ repairsLast24Months: parseInt(e.target.value) })}
              className="flex-1 accent-teal-500"
            />
            <span className="w-10 text-center font-bold text-slate-800 text-lg">
              {data.repairsLast24Months >= 10 ? '10+' : data.repairsLast24Months}
            </span>
          </div>
          <p className="text-xs text-slate-400">Slide to indicate frequency</p>
        </div>
      </div>

      {/* Downtime per Failure */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Average Downtime Per Failure <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DOWNTIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ downtimePerFailure: opt.value })}
              className={`py-2.5 px-2 rounded-xl text-xs font-medium border-2 transition-all duration-150 text-center ${
                data.downtimePerFailure === opt.value
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reliability Rating */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Equipment Reliability Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {RELIABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ reliabilityRating: opt.value })}
              className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-150 ${
                data.reliabilityRating === opt.value
                  ? reliabilityColorMap[opt.color] + ' border-2'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parts Availability */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Are Parts Readily Available? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PARTS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ partsAvailability: opt.value })}
              className={`text-left p-3 rounded-xl border-2 transition-all duration-150 ${
                data.partsAvailability === opt.value
                  ? opt.value === 'discontinued'
                    ? 'border-red-400 bg-red-50'
                    : opt.value === 'difficult'
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-teal-400 bg-teal-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-sm font-medium text-slate-800">{opt.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Production Impact */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Does Failure Impact Production? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRODUCTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ productionImpact: opt.value })}
              className={`py-3 rounded-xl text-sm font-medium border-2 transition-all duration-150 ${
                data.productionImpact === opt.value
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
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

export default Step2Condition;
