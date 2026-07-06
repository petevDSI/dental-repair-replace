import type {
  CalculatorFormData,
  CalculationResult,
  ScoreBreakdown,
  FinalVerdict,
  ReplacementCategory,
  EquipmentCategory,
} from '@/types/calculator';
import {
  EXPECTED_LIFESPANS,
  ESTIMATED_REPLACEMENT_COSTS,
  REPLACEMENT_CATEGORY,
  DOWNTIME_DAYS,
  FAILURE_MULTIPLIERS,
  FAILURE_MULTIPLIER_HIGH,
  PARTS_SCORES,
  PM_MODIFIERS,
  DEFAULT_DAILY_PRODUCTION,
} from '@/constants/calculatorData';

function parseNum(val: string, fallback = 0): number {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? fallback : n;
}

function getFailureMultiplier(count: number): number {
  if (count >= 4) return FAILURE_MULTIPLIER_HIGH;
  return FAILURE_MULTIPLIERS[count] ?? 1.0;
}

function verdictFromScore(score: number): { verdict: FinalVerdict; label: string; subtext: string } {
  if (score <= 35) {
    return {
      verdict: 'repair_recommended',
      label: 'Repair Recommended',
      subtext: 'Current repair economics remain favorable. This equipment is within acceptable lifecycle and cost thresholds.',
    };
  }
  if (score <= 55) {
    return {
      verdict: 'repair_acceptable',
      label: 'Repair Acceptable — Monitor Closely',
      subtext: 'Repair is still viable, but rising cost trends suggest planning for replacement within 12–24 months.',
    };
  }
  if (score <= 75) {
    return {
      verdict: 'plan_replacement',
      label: 'Plan Replacement Within 12–24 Months',
      subtext: 'This equipment is approaching the end of its cost-effective lifecycle. Begin evaluating replacement options.',
    };
  }
  return {
    verdict: 'replace_recommended',
    label: 'Immediate Replacement Recommended',
    subtext: 'This equipment is operating beyond optimal lifecycle thresholds. Continued repair investment is unlikely to be cost-effective.',
  };
}

function buildProjections(
  repairCostYear1: number,
  replacementCost: number,
  ageScore: number,
  repairsCount: number
): { repair: number[]; replace: number[] } {
  // Repair path: escalating costs year over year
  const escalationRate = 1 + (ageScore / 100) * 0.15 + (repairsCount * 0.05);
  const repairPath: number[] = [];
  let cumRepair = 0;
  for (let i = 1; i <= 5; i++) {
    cumRepair += repairCostYear1 * Math.pow(escalationRate, i - 1);
    repairPath.push(Math.round(cumRepair));
  }

  // Replace path: upfront cost, then minimal maintenance (~2% of cost/yr)
  const replacePath: number[] = [];
  let cumReplace = replacementCost;
  for (let i = 1; i <= 5; i++) {
    if (i > 1) cumReplace += replacementCost * 0.02;
    replacePath.push(Math.round(cumReplace));
  }

  return { repair: repairPath, replace: replacePath };
}

function buildBenchmark(
  ageYears: number,
  expectedLifespan: number,
  category: EquipmentCategory
): string {
  const pct = Math.round((ageYears / expectedLifespan) * 100);
  const LABELS: Partial<Record<EquipmentCategory, string>> = {
    dental_chair: 'comparable dental chairs',
    compressor: 'comparable compressor systems',
    cbct: 'comparable CBCT units',
    intraoral_scanner: 'comparable intraoral scanners',
    sterilizer: 'comparable sterilizers',
  };
  const label = LABELS[category] ?? 'comparable equipment in this category';

  if (pct >= 100) {
    return `This equipment has exceeded its ${expectedLifespan}-year average lifespan (currently ${ageYears} yrs). Most practices replace ${label} at or before this stage.`;
  }
  if (pct >= 75) {
    return `At ${ageYears} years, this equipment is in the late phase of its ${expectedLifespan}-year expected lifespan — ${pct}% through its cycle. Practices with ${label} at this stage typically begin budgeting for replacement.`;
  }
  return `At ${ageYears} years, this equipment has used ${pct}% of its ${expectedLifespan}-year expected lifespan. Comparable ${label} in this age range are generally repair-viable when costs are controlled.`;
}

export function runCalculation(form: CalculatorFormData): CalculationResult {
  const { step1, step2, step3, step4 } = form;
  const category = step1.category as EquipmentCategory;

  const currentYear = new Date().getFullYear();
  const ageYears = step1.yearInstalled ? Math.max(0, currentYear - parseInt(step1.yearInstalled)) : 5;
  const expectedLifespan = EXPECTED_LIFESPANS[category];
  const replacementCost = parseNum(step1.estimatedOriginalCost) || ESTIMATED_REPLACEMENT_COSTS[category];
  const currentRepairCost = parseNum(step2.currentRepairEstimate, 500);
  const dailyProduction = parseNum(step3.estimatedDailyProduction, DEFAULT_DAILY_PRODUCTION);

  // ── 1. AGE SCORE ──────────────────────────────────────
  const ageScore = Math.min(120, (ageYears / expectedLifespan) * 100);

  // ── 2. REPAIR BURDEN ──────────────────────────────────
  const rawRepairBurden = (currentRepairCost / replacementCost) * 100;
  const failureMultiplier = getFailureMultiplier(step2.repairsLast24Months);
  const adjustedRepairBurden = Math.min(100, rawRepairBurden * failureMultiplier);

  // ── 3. DOWNTIME COST MODEL ────────────────────────────
  const downtimeDays = step2.downtimePerFailure ? DOWNTIME_DAYS[step2.downtimePerFailure] : 0.5;
  const backupMultiplier = step3.backupStatus === 'full' ? 0.5 : step3.backupStatus === 'partial' ? 0.8 : 1.25;
  const totalDowntimeCost = Math.round(dailyProduction * downtimeDays * step2.repairsLast24Months * backupMultiplier);

  // Downtime risk score (0-100)
  const downtimeRiskScore = Math.min(100, (totalDowntimeCost / (replacementCost * 0.5)) * 100);

  // ── 4. OBSOLESCENCE SCORE ────────────────────────────
  const partsScore = step2.partsAvailability ? PARTS_SCORES[step2.partsAvailability] : 0;
  const obsolescenceScore = Math.min(100, step3.obsolescenceScore * 10 + partsScore);

  // ── 5. MAINTENANCE MODIFIER ──────────────────────────
  const maintenanceModifier = step4.pmFrequency ? PM_MODIFIERS[step4.pmFrequency] : 0;
  const serviceContractBonus = step4.serviceContractStatus === 'active' ? -5 : step4.serviceContractStatus === 'never' ? 10 : 0;
  const totalMaintenanceModifier = maintenanceModifier + serviceContractBonus;

  // ── 6. FINAL WEIGHTED SCORE ──────────────────────────
  // Age: 20%, Repair Burden: 25%, Failure Freq (via burden): 15%, Downtime: 20%, Obsolescence: 10%, Maintenance: 10%
  const rawScore =
    ageScore * 0.20 +
    adjustedRepairBurden * 0.40 + // Adjusted already includes failure frequency
    downtimeRiskScore * 0.20 +
    obsolescenceScore * 0.10 +
    0; // Maintenance applied as modifier below

  const finalScore = Math.max(0, Math.min(100, rawScore + totalMaintenanceModifier));

  const scores: ScoreBreakdown = {
    ageScore: Math.round(ageScore),
    repairBurden: Math.round(rawRepairBurden),
    adjustedRepairBurden: Math.round(adjustedRepairBurden),
    failureFrequencyMultiplier: failureMultiplier,
    downtimeCost: totalDowntimeCost,
    obsolescenceScore: Math.round(obsolescenceScore),
    maintenanceModifier: totalMaintenanceModifier,
    finalScore: Math.round(finalScore),
  };

  const { verdict, label, subtext } = verdictFromScore(finalScore);
  const replacementCategory: ReplacementCategory = REPLACEMENT_CATEGORY[category];
  const partsFlag = step2.partsAvailability === 'discontinued' || step2.partsAvailability === 'difficult';

  const annualRepairEstimate = currentRepairCost + totalDowntimeCost / 2;
  const { repair: projectedRepairCosts, replace: projectedReplaceCosts } = buildProjections(
    annualRepairEstimate,
    replacementCost,
    ageScore,
    step2.repairsLast24Months
  );

  const industryBenchmark = buildBenchmark(ageYears, expectedLifespan, category);

  return {
    verdict,
    verdictLabel: label,
    verdictSubtext: subtext,
    scores,
    ageYears,
    expectedLifespan,
    agePercentage: Math.min(100, Math.round((ageYears / expectedLifespan) * 100)),
    replacementCost,
    currentRepairCost,
    totalDowntimeCost,
    projectedRepairCosts,
    projectedReplaceCosts,
    replacementCategory,
    equipmentCategory: category,
    industryBenchmark,
    partsFlag,
  };
}
