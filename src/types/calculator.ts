export type EquipmentCategory =
  | 'dental_chair'
  | 'delivery_unit'
  | 'operatory_light'
  | 'cabinetry'
  | 'compressor'
  | 'vacuum_system'
  | 'utility_room'
  | 'cbct'
  | 'intraoral_xray'
  | 'sensor'
  | 'panoramic'
  | 'cad_cam'
  | 'intraoral_scanner'
  | 'sterilizer'
  | 'suction_system'
  | 'handpiece_system'
  | 'other';

export type PartsAvailability = 'available' | 'limited' | 'difficult' | 'discontinued';
export type ProductionImpact = 'minimal' | 'moderate' | 'significant' | 'critical';
export type BackupStatus = 'full' | 'partial' | 'none';
export type PMFrequency = 'always' | 'mostly' | 'occasionally' | 'rarely';
export type ServiceContractStatus = 'active' | 'expired' | 'never';
export type ReliabilityRating = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type DowntimePerFailure = 'under_1hr' | '1_4hr' | 'half_day' | 'full_day' | 'multi_day';

export type ReplacementCategory = 'chair_unit_light' | 'utility' | 'imaging' | 'scanner' | 'cad_cam' | 'sterilizer' | 'other';

export type FinalVerdict =
  | 'repair_recommended'
  | 'repair_acceptable'
  | 'plan_replacement'
  | 'replace_recommended';

export interface Step1Data {
  category: EquipmentCategory | '';
  manufacturer: string;
  model: string;
  yearInstalled: string;
  estimatedOriginalCost: string;
}

export interface Step2Data {
  issueType: string;
  currentRepairEstimate: string;
  repairsLast24Months: number;
  downtimePerFailure: DowntimePerFailure | '';
  reliabilityRating: ReliabilityRating | '';
  partsAvailability: PartsAvailability | '';
  productionImpact: ProductionImpact | '';
}

export interface Step3Data {
  estimatedDailyProduction: string;
  backupStatus: BackupStatus | '';
  plannedExpansion: boolean | null;
  obsolescenceScore: number;
}

export interface Step4Data {
  pmFrequency: PMFrequency | '';
  serviceContractStatus: ServiceContractStatus | '';
}

export interface CalculatorFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
}

export interface ScoreBreakdown {
  ageScore: number;
  repairBurden: number;
  adjustedRepairBurden: number;
  failureFrequencyMultiplier: number;
  downtimeCost: number;
  obsolescenceScore: number;
  maintenanceModifier: number;
  finalScore: number;
}

export interface CalculationResult {
  verdict: FinalVerdict;
  verdictLabel: string;
  verdictSubtext: string;
  scores: ScoreBreakdown;
  ageYears: number;
  expectedLifespan: number;
  agePercentage: number;
  replacementCost: number;
  currentRepairCost: number;
  totalDowntimeCost: number;
  projectedRepairCosts: number[];   // 5-year array
  projectedReplaceCosts: number[];  // 5-year array
  replacementCategory: ReplacementCategory;
  equipmentCategory: EquipmentCategory;
  industryBenchmark: string;
  partsFlag: boolean;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
}
