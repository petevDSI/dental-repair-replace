import type { Step1Data, EquipmentCategory } from '@/types/calculator';
import { EQUIPMENT_LABELS, EQUIPMENT_MANUFACTURERS } from '@/constants/calculatorData';

interface Props {
  data: Step1Data;
  onChange: (updates: Partial<Step1Data>) => void;
  onNext: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 45 }, (_, i) => String(currentYear - i));

const CATEGORIES = Object.entries(EQUIPMENT_LABELS) as [EquipmentCategory, string][];

const Step1Equipment = ({ data, onChange, onNext }: Props) => {
  const manufacturers = data.category ? (EQUIPMENT_MANUFACTURERS[data.category] ?? ['Other']) : [];
  const isValid = data.category !== '' && data.yearInstalled !== '' && data.manufacturer.trim() !== '';

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Equipment Identification</h2>
        <p className="text-sm text-slate-500">Tell us about the equipment you're evaluating.</p>
      </div>

      {/* Equipment Category */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700" htmlFor="category">
          Equipment Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="category"
            value={data.category}
            onChange={(e) => onChange({ category: e.target.value as EquipmentCategory, manufacturer: '' })}
            className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all pr-10"
          >
            <option value="">Select equipment category…</option>
            {CATEGORIES.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Manufacturer */}
      {data.category && (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="manufacturer">
            Manufacturer <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="manufacturer"
              value={data.manufacturer}
              onChange={(e) => onChange({ manufacturer: e.target.value })}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all pr-10"
            >
              <option value="">Select manufacturer…</option>
              {manufacturers.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Model */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700" htmlFor="model">
          Model <span className="text-slate-400 font-normal text-xs">(optional)</span>
        </label>
        <input
          id="model"
          type="text"
          placeholder="e.g., 511, Trios 4, M11 UltraClave"
          value={data.model}
          onChange={(e) => onChange({ model: e.target.value })}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Year + Original Cost row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="year">
            Year Installed <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="year"
              value={data.yearInstalled}
              onChange={(e) => onChange({ yearInstalled: e.target.value })}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all pr-10"
            >
              <option value="">Select year…</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="origCost">
            Original Purchase Price
            <span className="ml-1 text-slate-400 font-normal text-xs">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input
              id="origCost"
              type="number"
              min="0"
              placeholder="Auto-estimated if blank"
              value={data.estimatedOriginalCost}
              onChange={(e) => onChange({ estimatedOriginalCost: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step1Equipment;
