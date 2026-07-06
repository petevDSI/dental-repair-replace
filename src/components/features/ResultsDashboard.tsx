import type { CalculationResult } from '@/types/calculator';
import { BRAND_RECOMMENDATIONS, EQUIPMENT_UPGRADE_CONTENT } from '@/constants/calculatorData';
import ScoreRing from './ScoreRing';
import TimelineChart from './TimelineChart';
import { toast } from 'sonner';

interface Props {
  result: CalculationResult;
  equipmentLabel: string;
  manufacturer: string;
  onReset: () => void;
}

const VERDICT_CONFIG = {
  repair_recommended: {
    bg: 'bg-emerald-50 border-emerald-200',
    badge: 'bg-emerald-500 text-white',
    icon: '🔧',
    iconBg: 'bg-emerald-100',
    label: 'Repair Recommended',
  },
  repair_acceptable: {
    bg: 'bg-teal-50 border-teal-200',
    badge: 'bg-teal-500 text-white',
    icon: '⚙️',
    iconBg: 'bg-teal-100',
    label: 'Repair Acceptable',
  },
  plan_replacement: {
    bg: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-500 text-white',
    icon: '📅',
    iconBg: 'bg-amber-100',
    label: 'Plan Replacement',
  },
  replace_recommended: {
    bg: 'bg-red-50 border-red-200',
    badge: 'bg-red-500 text-white',
    icon: '🔄',
    iconBg: 'bg-red-100',
    label: 'Replace Recommended',
  },
};

const BRAND_COLORS: Record<string, { gradient: string; check: string; feature: string }> = {
  teal: { gradient: 'from-teal-700 to-teal-600', check: 'bg-teal-100 text-teal-700', feature: 'bg-teal-50 border-teal-100' },
  blue: { gradient: 'from-blue-700 to-blue-600', check: 'bg-blue-100 text-blue-700', feature: 'bg-blue-50 border-blue-100' },
  violet: { gradient: 'from-violet-700 to-violet-600', check: 'bg-violet-100 text-violet-700', feature: 'bg-violet-50 border-violet-100' },
  indigo: { gradient: 'from-indigo-700 to-indigo-600', check: 'bg-indigo-100 text-indigo-700', feature: 'bg-indigo-50 border-indigo-100' },
  amber: { gradient: 'from-amber-600 to-amber-500', check: 'bg-amber-100 text-amber-700', feature: 'bg-amber-50 border-amber-100' },
  slate: { gradient: 'from-slate-700 to-slate-600', check: 'bg-slate-100 text-slate-700', feature: 'bg-slate-50 border-slate-100' },
};

const ResultsDashboard = ({ result, equipmentLabel, manufacturer, onReset }: Props) => {
  const cfg = VERDICT_CONFIG[result.verdict];
  const brandData = BRAND_RECOMMENDATIONS[result.replacementCategory];
  // Use equipment-specific content when available, fall back to generic brand content
  const specificContent = EQUIPMENT_UPGRADE_CONTENT[result.equipmentCategory];
  const upgradeTagline = specificContent?.tagline ?? brandData.tagline;
  const upgradeFeatures = specificContent?.features ?? brandData.features;
  const upgradeRationale = specificContent?.rationale ?? brandData.rationale;
  const bc = BRAND_COLORS[brandData.color];
  const isReplace = result.verdict === 'plan_replacement' || result.verdict === 'replace_recommended';
  const finalScore = result.scores.finalScore;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `DentalAssetIQ Analysis: ${result.verdictLabel} for ${equipmentLabel} (${manufacturer}). Decision Score: ${finalScore}/100. ${result.verdictSubtext}`;
    if (navigator.share) {
      navigator.share({ title: 'DentalAssetIQ Analysis', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Summary copied to clipboard');
    }
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Intelligence Report</p>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">{equipmentLabel} — {manufacturer}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-teal-600 bg-white border border-slate-200 hover:border-teal-300 px-3 py-2 rounded-lg transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button onClick={handlePrint} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-teal-600 bg-white border border-slate-200 hover:border-teal-300 px-3 py-2 rounded-lg transition-all print:hidden">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / PDF
          </button>
        </div>
      </div>

      {/* Primary Verdict Card */}
      <div className={`rounded-2xl p-6 border-2 ${cfg.bg}`}>
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl ${cfg.iconBg} flex items-center justify-center text-2xl shrink-0`}>
            {cfg.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${cfg.badge}`}>
                {result.verdictLabel}
              </span>
              {result.partsFlag && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                  ⚠ Parts Restricted
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{result.verdictSubtext}</p>
          </div>
        </div>
      </div>

      {/* Decision Score + Component Rings */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-slate-800">Decision Score Analysis</h3>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-900 leading-none">{finalScore}</p>
            <p className="text-xs text-slate-400 mt-0.5">out of 100</p>
          </div>
        </div>
        {/* Overall score bar */}
        <div className="mb-5">
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                finalScore <= 35 ? 'bg-emerald-500' :
                finalScore <= 55 ? 'bg-teal-500' :
                finalScore <= 75 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${finalScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
            <span>Repair Recommended</span>
            <span>Repair Acceptable</span>
            <span>Plan Replacement</span>
            <span>Replace Now</span>
          </div>
        </div>
        {/* Score rings */}
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          <ScoreRing score={result.scores.ageScore > 100 ? 100 : result.scores.ageScore} label="Lifecycle Risk" size={88} />
          <ScoreRing score={Math.min(100, result.scores.adjustedRepairBurden)} label="Repair Burden" size={88} />
          <ScoreRing score={Math.min(100, result.scores.obsolescenceScore)} label="Obsolescence" size={88} />
          <ScoreRing
            score={result.scores.maintenanceModifier < 0 ? 20 : result.scores.maintenanceModifier > 15 ? 80 : 45}
            label="Maint. Risk"
            size={88}
            color={result.scores.maintenanceModifier < 0 ? 'teal' : result.scores.maintenanceModifier > 15 ? 'red' : 'amber'}
          />
        </div>
      </div>

      {/* Age vs Lifespan */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Lifecycle Position</h3>
          <div className="text-right">
            <span className={`text-sm font-bold ${result.agePercentage >= 100 ? 'text-red-600' : result.agePercentage >= 75 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {result.agePercentage}% of lifespan used
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-700 ${
              result.agePercentage >= 100 ? 'bg-red-500' :
              result.agePercentage >= 75 ? 'bg-amber-400' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, result.agePercentage)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-slate-400">
          <span>Installed ({result.ageYears > 0 ? new Date().getFullYear() - result.ageYears : '—'})</span>
          <span className="font-medium text-slate-600">{result.ageYears} yrs old</span>
          <span>Expected EOL ({result.expectedLifespan} yrs)</span>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Current Repair Est.',
            value: `$${result.currentRepairCost.toLocaleString()}`,
            sub: `${result.scores.repairBurden}% of replacement value`,
            color: result.scores.repairBurden > 35 ? 'text-red-600' : 'text-emerald-600',
          },
          {
            label: 'Downtime Exposure',
            value: result.totalDowntimeCost > 0 ? `$${result.totalDowntimeCost.toLocaleString()}` : '—',
            sub: 'Est. production loss (24mo)',
            color: result.totalDowntimeCost > 5000 ? 'text-red-600' : 'text-slate-800',
          },
          {
            label: 'Est. Replacement Cost',
            value: `$${result.replacementCost.toLocaleString()}`,
            sub: 'Industry estimate',
            color: 'text-slate-800',
          },
        ].map((m) => (
          <div key={m.label} className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1">{m.label}</p>
            <p className={`text-lg font-bold ${m.color} leading-tight`}>{m.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Timeline Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <TimelineChart repairCosts={result.projectedRepairCosts} replaceCosts={result.projectedReplaceCosts} />
      </div>

      {/* Industry Benchmark */}
      <div className="bg-navy-50 border border-slate-200 rounded-2xl p-5 bg-slate-900">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1">Industry Benchmark</p>
            <p className="text-sm text-slate-300 leading-relaxed">{result.industryBenchmark}</p>
          </div>
        </div>
      </div>

      {/* Suggested Upgrade Path — only for replace/plan */}
      {isReplace && (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className={`bg-gradient-to-r ${bc.gradient} p-6 text-white`}>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">Suggested Upgrade Path — {equipmentLabel}</p>
            <h3 className="text-2xl font-bold">{brandData.brand}</h3>
            <p className="text-sm opacity-90 mt-0.5">{upgradeTagline}</p>
          </div>
          <div className="bg-white p-5">
            <p className="text-sm text-slate-600 leading-relaxed mb-4 italic">"{upgradeRationale}"</p>
            <ul className="space-y-2.5">
              {upgradeFeatures.map((feature, idx) => (
                <li key={idx} className={`flex items-start gap-3 text-sm text-slate-600 rounded-lg p-2.5 border ${bc.feature}`}>
                  <div className={`w-5 h-5 rounded-full ${bc.check} flex items-center justify-center shrink-0 mt-0.5`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              This recommendation is based on lifecycle analysis specific to your {equipmentLabel.toLowerCase()} assessment. We recommend requesting comparative quotes from 2–3 local distributors before making a final decision.
            </p>
          </div>
        </div>
      )}

      {/* DentalAssetIQ Platform CTA */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582 4-8 4m0 5c0 2.21 3.582 4 8 4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Optimize Equipment Decisions with DentalAssetIQ</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Track lifecycle performance, maintenance history, repair trends, depreciation, and replacement planning across your entire practice or organization.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <a
                href="https://dentalassetiq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              >
                Explore DentalAssetIQ
              </a>
              <a
                href="https://dentalassetiq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
              >
                View Sample Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Run Another Assessment */}
      <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">Assess another piece of equipment?</p>
          <p className="text-xs text-slate-400 mt-0.5">Each assessment takes under 3 minutes.</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all text-sm shadow-sm hover:shadow-md active:scale-[0.98] whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Run Another Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
