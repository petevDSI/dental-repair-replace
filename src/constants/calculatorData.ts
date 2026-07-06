import type {
  EquipmentCategory,
  ReplacementCategory,
  DowntimePerFailure,
  PartsAvailability,
  PMFrequency,
} from '@/types/calculator';

export const EQUIPMENT_LABELS: Record<EquipmentCategory, string> = {
  dental_chair: 'Dental Chair',
  delivery_unit: 'Delivery Unit',
  operatory_light: 'Operatory Light',
  cabinetry: 'Cabinetry',
  compressor: 'Compressor',
  vacuum_system: 'Vacuum System',
  utility_room: 'Utility Room',
  cbct: 'CBCT / Cone Beam',
  intraoral_xray: 'Intraoral X-Ray',
  sensor: 'Digital Sensor',
  panoramic: 'Panoramic (Pan/Ceph)',
  cad_cam: 'CAD/CAM System',
  intraoral_scanner: 'Intraoral Scanner',
  sterilizer: 'Sterilizer / Autoclave',
  suction_system: 'Suction System',
  handpiece_system: 'Handpiece System',
  other: 'Other Equipment',
};

export const EQUIPMENT_MANUFACTURERS: Partial<Record<EquipmentCategory, string[]>> = {
  // Chairs — US-sold dental operatory seating brands
  dental_chair: [
    'A-dec',
    'DCI Edge',
    'Midmark',
    'Pelton & Crane',
    'Belmont',
    'Takara Belmont',
    'Marus',
    'Flight Dental Systems',
    'Engle Dental',
    'Other',
  ],
  // Delivery units — US-distributed dental instrument delivery systems
  delivery_unit: [
    'A-dec',
    'DCI Edge',
    'Midmark',
    'Pelton & Crane',
    'Belmont',
    'Takara Belmont',
    'Marus',
    'Flight Dental Systems',
    'Other',
  ],
  // Operatory lights — US dental-rated overhead and LED surgical lights
  operatory_light: [
    'A-dec',
    'DCI Edge',
    'Midmark',
    'Pelton & Crane',
    'Belmont',
    'Takara Belmont',
    'Flight Dental Systems',
    'Engle Dental',
    'Other',
  ],
  // Cabinetry — US dental-specific treatment room cabinetry
  cabinetry: [
    'A-dec',
    'DCI Edge',
    'Midmark',
    'Pelton & Crane',
    'Takara Belmont',
    'Boyd Industries',
    'Flight Dental Systems',
    'Other',
  ],
  // Compressors — US dental-rated oil-free compressed air systems only
  compressor: [
    'Air Techniques',
    'Midmark',
    'Ramvac (DentalEZ)',
    'Dentair',
    'Quincy Dental',
    'Other',
  ],
  // Vacuum systems — US dental-rated wet/dry vacuum systems
  vacuum_system: [
    'Air Techniques',
    'Midmark',
    'Ramvac (DentalEZ)',
    'Dentair',
    'Other',
  ],
  // Utility room — US dental utility room package systems
  utility_room: [
    'Air Techniques',
    'Midmark',
    'Ramvac (DentalEZ)',
    'Other',
  ],
  // CBCT — US-distributed cone beam CT systems for dental use
  cbct: [
    'i-CAT (Envista)',
    'Planmeca',
    'Carestream Dental',
    'Dentsply Sirona (Orthophos)',
    'Acteon (MyRay)',
    'Vatech (PaX-i3D)',
    'Owandy Radiology',
    'NewTom (Cefla)',
    'Other',
  ],
  // Intraoral X-ray — US dental intraoral radiography units
  intraoral_xray: [
    'Dexis (KaVo Kerr)',
    'Carestream Dental',
    'Planmeca',
    'Dentsply Sirona',
    'Acteon (Sopro)',
    'Progeny Dental',
    'Vatech',
    'Other',
  ],
  // Digital sensors — US dental intraoral digital sensor systems
  sensor: [
    'Dexis (KaVo Kerr)',
    'Carestream Dental',
    'Planmeca',
    'Dentsply Sirona (Schick)',
    'Acteon (Sopro)',
    'Apteryx (KaVo Kerr)',
    'Other',
  ],
  // Panoramic — US dental panoramic / cephalometric imaging
  panoramic: [
    'Planmeca',
    'Dentsply Sirona (Orthophos)',
    'Carestream Dental',
    'i-CAT (Envista)',
    'Acteon (MyRay)',
    'Vatech (PaX-i)',
    'Owandy Radiology',
    'Other',
  ],
  // CAD/CAM — US dental in-office milling and design systems
  cad_cam: [
    'Dentsply Sirona (CEREC)',
    '3Shape (TRIOS + Dental Desktop)',
    'Planmeca (PlanMill)',
    'Glidewell (GlideWell.io)',
    'Roland DGA (dental)',
    'Other',
  ],
  // Intraoral scanners — US-distributed digital impression systems
  intraoral_scanner: [
    '3Shape (TRIOS)',
    'Align Technology (iTero)',
    'Dentsply Sirona (Primescan)',
    'Planmeca (Emerald)',
    'Medit (i700)',
    'Carestream Dental (CS 3700)',
    'Other',
  ],
  // Sterilizers — US dental-rated autoclave / steam sterilizer systems
  sterilizer: [
    'Midmark (M-Series)',
    'SciCan (Statim / Bravo)',
    'Tuttnauer',
    'Pelton & Crane (Magnaclave)',
    'Hu-Friedy (SciCan)',
    'Other',
  ],
  // Suction — US dental wet / dry suction evacuation systems
  suction_system: [
    'Air Techniques',
    'Midmark',
    'Ramvac (DentalEZ)',
    'Dentair',
    'Other',
  ],
  // Handpieces — US dental high/low-speed and electric handpiece brands
  handpiece_system: [
    'KaVo (Envista)',
    'Dentsply Sirona (XG / Smart)',
    'W&H (US distribution)',
    'Bien-Air (US distribution)',
    'NSK (US operations)',
    'Brasseler USA',
    'Aseptico',
    'Midwest (Dentsply)',
    'Star Dental (Dentsply)',
    'Other',
  ],
  other: ['Other'],
};

// Expected lifespans (years)
export const EXPECTED_LIFESPANS: Record<EquipmentCategory, number> = {
  dental_chair: 18,
  delivery_unit: 15,
  operatory_light: 12,
  cabinetry: 20,
  compressor: 12,
  vacuum_system: 10,
  utility_room: 12,
  cbct: 8,
  intraoral_xray: 10,
  sensor: 8,
  panoramic: 10,
  cad_cam: 7,
  intraoral_scanner: 6,
  sterilizer: 10,
  suction_system: 10,
  handpiece_system: 5,
  other: 10,
};

// Estimated replacement costs (USD)
export const ESTIMATED_REPLACEMENT_COSTS: Record<EquipmentCategory, number> = {
  dental_chair: 12000,
  delivery_unit: 9000,
  operatory_light: 3500,
  cabinetry: 15000,
  compressor: 6500,
  vacuum_system: 5500,
  utility_room: 12000,
  cbct: 85000,
  intraoral_xray: 8000,
  sensor: 7500,
  panoramic: 35000,
  cad_cam: 55000,
  intraoral_scanner: 30000,
  sterilizer: 4500,
  suction_system: 5000,
  handpiece_system: 1800,
  other: 8000,
};

// Downtime in workdays per failure event
export const DOWNTIME_DAYS: Record<DowntimePerFailure, number> = {
  under_1hr: 0.125,
  '1_4hr': 0.375,
  half_day: 0.5,
  full_day: 1,
  multi_day: 2.5,
};

// Failure frequency multipliers
export const FAILURE_MULTIPLIERS: Record<number, number> = {
  0: 1.0,
  1: 1.1,
  2: 1.25,
  3: 1.5,
};
export const FAILURE_MULTIPLIER_HIGH = 1.8; // 4+

// Parts availability scores
export const PARTS_SCORES: Record<PartsAvailability, number> = {
  available: 0,
  limited: 10,
  difficult: 20,
  discontinued: 40,
};

// PM frequency modifiers
export const PM_MODIFIERS: Record<PMFrequency, number> = {
  always: -15,
  mostly: -5,
  occasionally: 10,
  rarely: 25,
};

// Replacement category mapping
export const REPLACEMENT_CATEGORY: Record<EquipmentCategory, ReplacementCategory> = {
  dental_chair: 'chair_unit_light',
  delivery_unit: 'chair_unit_light',
  operatory_light: 'chair_unit_light',
  cabinetry: 'chair_unit_light',
  compressor: 'utility',
  vacuum_system: 'utility',
  utility_room: 'utility',
  suction_system: 'utility',
  cbct: 'imaging',
  intraoral_xray: 'imaging',
  sensor: 'imaging',
  panoramic: 'imaging',
  intraoral_scanner: 'scanner',
  cad_cam: 'cad_cam',
  sterilizer: 'sterilizer',
  handpiece_system: 'other',
  other: 'other',
};

export interface BrandRecommendation {
  brand: string;
  tagline: string;
  features: string[];
  rationale: string;
  color: 'teal' | 'blue' | 'violet' | 'indigo' | 'amber' | 'slate';
}

export const BRAND_RECOMMENDATIONS: Record<ReplacementCategory, BrandRecommendation> = {
  chair_unit_light: {
    brand: 'DCI Edge',
    tagline: 'Long-term operational value, strong warranty protection',
    features: [
      '10-year structural warranty — strongest in category',
      'Favorable cost-to-lifespan ratio for independent practices and DSOs',
      'Modern operatory integration with standardized delivery systems',
      'Broad parts availability and national service network',
      'Widely adopted across private practices seeking lifecycle reliability',
    ],
    rationale:
      'DCI Edge systems are frequently selected for practices seeking long-term operational value, strong warranty protection, and standardized operatory integration.',
    color: 'teal',
  },
  utility: {
    brand: 'Air Techniques',
    tagline: 'Industry benchmark for reliability and serviceability',
    features: [
      'Oil-free compressors with validated air purity standards',
      'Broad dealer and service support across all major markets',
      'Established long-term reliability in practice settings',
      'Strong parts availability and documented service histories',
      'Common benchmark for utility room standardization in DSOs',
    ],
    rationale:
      'Air Techniques systems remain a common benchmark for reliability and supportability across private practices and larger organizations.',
    color: 'blue',
  },
  imaging: {
    brand: 'Dexis',
    tagline: 'Integration, imaging quality, and workflow compatibility',
    features: [
      'Strong imaging ecosystem with broad PMS integration',
      'Workflow-optimized capture and diagnostic toolset',
      'Widely adopted imaging platform with established service infrastructure',
      'Long-term software update and compatibility commitments',
      'Commonly favored for diagnostic clarity and practice compatibility',
    ],
    rationale:
      'Dexis imaging platforms are commonly favored for integration, imaging quality, and long-term workflow compatibility.',
    color: 'violet',
  },
  scanner: {
    brand: '3Shape',
    tagline: 'Leading scanner ecosystem with broad lab integration',
    features: [
      'Industry-leading scan accuracy and speed',
      'Broad dental lab and CAD/CAM integration',
      'Strong digital workflow compatibility',
      'Extensive clinical case library and support resources',
      'Widely used across DSOs and specialist practices',
    ],
    rationale:
      '3Shape scanners are frequently selected for their workflow efficiency, integration breadth, and strong clinical adoption.',
    color: 'indigo',
  },
  cad_cam: {
    brand: 'Multiple Options',
    tagline: 'Workflow and ROI depend on practice volume and integration',
    features: [
      'Evaluate based on restoration volume and workflow preference',
      'Consider integration with existing digital ecosystem',
      'Compare total cost including milling units and materials',
      'Review training requirements and local support availability',
      'Assess open vs. closed system tradeoffs carefully',
    ],
    rationale:
      'Several modern CAD/CAM systems offer strong ROI depending on practice workflow, restoration volume, and integration preferences. We recommend evaluating 2–3 systems with a certified rep before deciding.',
    color: 'amber',
  },
  sterilizer: {
    brand: 'Midmark',
    tagline: 'Validated sterilization cycles and compliance documentation',
    features: [
      'FDA-cleared cycles with validated performance documentation',
      'Automated compliance reporting for regulatory requirements',
      'Broad service network and parts availability',
      'Intuitive interface reducing operator error risk',
      'Industry-standard in both private and institutional settings',
    ],
    rationale:
      'Midmark sterilizers are widely adopted for their validated performance, compliance support, and long-term service infrastructure.',
    color: 'teal',
  },
  other: {
    brand: 'Consult Your Dealer',
    tagline: 'Specialist evaluation recommended for this category',
    features: [
      'Request quotes from 2–3 certified dealers in your area',
      'Verify parts availability and service network coverage',
      'Compare warranty terms and response commitments',
      'Review integration requirements with existing systems',
      'Evaluate total cost of ownership over 5–7 years',
    ],
    rationale:
      'For this equipment category, we recommend requesting comparative quotes from certified dealers and evaluating total cost of ownership rather than purchase price alone.',
    color: 'slate',
  },
};

export interface IssueType {
  label: string;
  avgCost: number;          // estimated total (labor + parts, USD)
  laborHours: number;       // estimated tech hours
  severity: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
}

// Avg dental service tech labor rate used in estimates: ~$165/hr (national, 2025)
// Costs = labor + parts; ranges are mid-point estimates
export const EQUIPMENT_ISSUES: Partial<Record<EquipmentCategory, IssueType[]>> = {
  dental_chair: [
    { label: 'Upholstery replacement', avgCost: 450, laborHours: 2, severity: 'low' },
    { label: 'Foot control malfunction', avgCost: 650, laborHours: 2.5, severity: 'medium' },
    { label: 'Air/water syringe — leaking or inoperable', avgCost: 280, laborHours: 1.5, severity: 'low' },
    { label: 'Backrest actuator / positioning motor failure', avgCost: 850, laborHours: 3.5, severity: 'medium' },
    { label: 'Hydraulic cylinder leak', avgCost: 1400, laborHours: 5, severity: 'high' },
    { label: 'Junction box / electrical failure', avgCost: 700, laborHours: 3, severity: 'medium' },
    { label: 'Base motor failure', avgCost: 1100, laborHours: 4, severity: 'high' },
    { label: 'Cuspidor / spittoon drain issue', avgCost: 320, laborHours: 1.5, severity: 'low' },
  ],
  delivery_unit: [
    { label: 'Leaky tubing / syringe tip seal', avgCost: 220, laborHours: 1.5, severity: 'low' },
    { label: 'Solenoid valve failure (water / air)', avgCost: 480, laborHours: 2.5, severity: 'medium' },
    { label: 'Handpiece holder / port failure', avgCost: 380, laborHours: 2, severity: 'low' },
    { label: 'Junction box electrical fault', avgCost: 620, laborHours: 3, severity: 'medium' },
    { label: 'Chip blower / 3-way syringe failure', avgCost: 350, laborHours: 2, severity: 'medium' },
    { label: 'Water line pressure regulator failure', avgCost: 420, laborHours: 2.5, severity: 'medium' },
    { label: 'Full unit electrical board failure', avgCost: 1600, laborHours: 5, severity: 'high' },
  ],
  operatory_light: [
    { label: 'LED module / bulb replacement', avgCost: 380, laborHours: 1.5, severity: 'low' },
    { label: 'Arm joint friction / balance failure', avgCost: 290, laborHours: 1.5, severity: 'low' },
    { label: 'Control switch / dimmer failure', avgCost: 220, laborHours: 1, severity: 'low' },
    { label: 'Full light head replacement', avgCost: 950, laborHours: 2.5, severity: 'medium' },
    { label: 'Ceiling mount / bracket failure', avgCost: 480, laborHours: 2, severity: 'medium' },
  ],
  cabinetry: [
    { label: 'Drawer slide / hardware replacement', avgCost: 180, laborHours: 1, severity: 'low' },
    { label: 'Cabinet door hinge / panel damage', avgCost: 250, laborHours: 1.5, severity: 'low' },
    { label: 'Countertop resurfacing or replacement', avgCost: 650, laborHours: 3, severity: 'medium' },
    { label: 'Plumbing rough-in / sink issue', avgCost: 480, laborHours: 2.5, severity: 'medium' },
    { label: 'Full cabinet module replacement', avgCost: 2200, laborHours: 6, severity: 'high' },
  ],
  compressor: [
    { label: 'Belt replacement', avgCost: 320, laborHours: 1.5, severity: 'low' },
    { label: 'Air dryer failure', avgCost: 750, laborHours: 3, severity: 'medium' },
    { label: 'Intake filter / valve replacement', avgCost: 280, laborHours: 1.5, severity: 'low' },
    { label: 'Head gasket / valve plate failure', avgCost: 900, laborHours: 4, severity: 'high' },
    { label: 'Pump rebuild', avgCost: 1500, laborHours: 6, severity: 'high' },
    { label: 'Motor failure', avgCost: 1200, laborHours: 4.5, severity: 'high' },
    { label: 'Tank corrosion / tank replacement', avgCost: 800, laborHours: 3.5, severity: 'high', notes: 'Safety-critical — immediate evaluation required' },
    { label: 'Pressure switch / regulator failure', avgCost: 350, laborHours: 2, severity: 'medium' },
  ],
  vacuum_system: [
    { label: 'Strainer / trap cleaning', avgCost: 180, laborHours: 1, severity: 'low' },
    { label: 'Valve / gasket replacement', avgCost: 350, laborHours: 2, severity: 'medium' },
    { label: 'Separator tank failure', avgCost: 650, laborHours: 3, severity: 'medium' },
    { label: 'Vacuum motor bearing failure', avgCost: 900, laborHours: 4, severity: 'high' },
    { label: 'Vacuum motor seizure / replacement', avgCost: 1600, laborHours: 5, severity: 'critical' },
    { label: 'Control board / electrical fault', avgCost: 750, laborHours: 3.5, severity: 'medium' },
  ],
  suction_system: [
    { label: 'Strainer / trap clog', avgCost: 160, laborHours: 1, severity: 'low' },
    { label: 'Evacuation line blockage / flush', avgCost: 220, laborHours: 1.5, severity: 'low' },
    { label: 'Valve / gasket replacement', avgCost: 350, laborHours: 2, severity: 'medium' },
    { label: 'Motor bearing failure', avgCost: 850, laborHours: 3.5, severity: 'high' },
    { label: 'Motor replacement', avgCost: 1500, laborHours: 5, severity: 'critical' },
  ],
  cbct: [
    { label: 'Software / licensing issue', avgCost: 900, laborHours: 3, severity: 'medium' },
    { label: 'Positioning / collimator adjustment', avgCost: 650, laborHours: 3, severity: 'medium' },
    { label: 'Rotation arm mechanical failure', avgCost: 3500, laborHours: 8, severity: 'high' },
    { label: 'Generator / high-voltage board failure', avgCost: 6500, laborHours: 10, severity: 'critical' },
    { label: 'X-ray tube replacement', avgCost: 8000, laborHours: 8, severity: 'critical' },
    { label: 'Flat panel detector / sensor failure', avgCost: 14000, laborHours: 6, severity: 'critical', notes: 'Most expensive CBCT repair — strongly evaluate replacement ROI' },
  ],
  intraoral_xray: [
    { label: 'Arm tension / positioning issue', avgCost: 280, laborHours: 1.5, severity: 'low' },
    { label: 'Exposure button / control failure', avgCost: 420, laborHours: 2, severity: 'medium' },
    { label: 'Wall mount / arm assembly replacement', avgCost: 750, laborHours: 3, severity: 'medium' },
    { label: 'X-ray tube head replacement', avgCost: 2200, laborHours: 4, severity: 'high' },
    { label: 'Generator board failure', avgCost: 1800, laborHours: 4, severity: 'high' },
  ],
  sensor: [
    { label: 'USB cable / connection repair', avgCost: 280, laborHours: 1, severity: 'low' },
    { label: 'Software driver / integration issue', avgCost: 350, laborHours: 2, severity: 'low' },
    { label: 'Sensor housing / coating damage', avgCost: 800, laborHours: 2, severity: 'medium' },
    { label: 'Sensor CMOS / imaging element failure', avgCost: 3800, laborHours: 2, severity: 'critical', notes: 'Sensor replacement — evaluate warranty and age before repair' },
  ],
  panoramic: [
    { label: 'Positioning / chin rest adjustment', avgCost: 320, laborHours: 2, severity: 'low' },
    { label: 'Rotation motor / drive failure', avgCost: 1800, laborHours: 5, severity: 'high' },
    { label: 'X-ray tube replacement', avgCost: 4500, laborHours: 5, severity: 'critical' },
    { label: 'Panoramic detector / sensor failure', avgCost: 7500, laborHours: 4, severity: 'critical', notes: 'High-value repair — evaluate replacement timeline' },
    { label: 'Software / image quality issue', avgCost: 650, laborHours: 3, severity: 'medium' },
  ],
  cad_cam: [
    { label: 'Milling bur / spindle replacement', avgCost: 480, laborHours: 2, severity: 'low' },
    { label: 'Milling chamber / coolant system', avgCost: 950, laborHours: 3.5, severity: 'medium' },
    { label: 'Software license / update issue', avgCost: 600, laborHours: 2, severity: 'medium' },
    { label: 'Spindle motor failure', avgCost: 2800, laborHours: 6, severity: 'high' },
    { label: 'Scanner tip / lens damage', avgCost: 1200, laborHours: 2, severity: 'medium' },
    { label: 'Main control board failure', avgCost: 3500, laborHours: 6, severity: 'critical' },
  ],
  intraoral_scanner: [
    { label: 'Tip / sleeve replacement', avgCost: 180, laborHours: 0.5, severity: 'low' },
    { label: 'Software / connectivity issue', avgCost: 320, laborHours: 2, severity: 'low' },
    { label: 'Handpiece cable damage', avgCost: 550, laborHours: 1.5, severity: 'medium' },
    { label: 'Optic / camera lens failure', avgCost: 2200, laborHours: 3, severity: 'high' },
    { label: 'Handpiece full replacement', avgCost: 4500, laborHours: 2, severity: 'critical', notes: 'Verify warranty — scanner handpieces often covered 1–2 yrs' },
  ],
  sterilizer: [
    { label: 'Door gasket / seal replacement', avgCost: 240, laborHours: 1.5, severity: 'low' },
    { label: 'Thermistor / temperature sensor', avgCost: 380, laborHours: 2, severity: 'medium' },
    { label: 'Chamber drain / valve issue', avgCost: 420, laborHours: 2.5, severity: 'medium' },
    { label: 'Control board / display failure', avgCost: 850, laborHours: 3.5, severity: 'high' },
    { label: 'Heating element failure', avgCost: 650, laborHours: 3, severity: 'high' },
    { label: 'Chamber / vessel crack (pressure vessel)', avgCost: 2800, laborHours: 4, severity: 'critical', notes: 'Safety-critical — OSHA/CDC compliance implications' },
  ],
  handpiece_system: [
    { label: 'Turbine / rotor replacement (high-speed)', avgCost: 280, laborHours: 0.5, severity: 'low' },
    { label: 'Chuck / bur lock failure', avgCost: 180, laborHours: 0.5, severity: 'low' },
    { label: 'Light rod / fiber optic failure', avgCost: 320, laborHours: 1, severity: 'medium' },
    { label: 'Low-speed motor failure', avgCost: 450, laborHours: 1.5, severity: 'medium' },
    { label: 'Electric motor / controller failure', avgCost: 900, laborHours: 2.5, severity: 'high' },
    { label: 'Full handpiece replacement (high-speed)', avgCost: 650, laborHours: 0.5, severity: 'medium' },
  ],
  other: [
    { label: 'Minor — cosmetic or simple adjustment', avgCost: 300, laborHours: 2, severity: 'low' },
    { label: 'Moderate — electrical or mechanical', avgCost: 750, laborHours: 4, severity: 'medium' },
    { label: 'Major — significant component failure', avgCost: 2000, laborHours: 8, severity: 'high' },
  ],
};

export const DEFAULT_DAILY_PRODUCTION = 3500;

// Equipment-specific upgrade content — overrides generic BrandRecommendation copy
// Each entry is tailored to the exact product the user just assessed
export interface EquipmentUpgradeContent {
  tagline: string;
  features: string[];
  rationale: string;
}

export const EQUIPMENT_UPGRADE_CONTENT: Partial<Record<EquipmentCategory, EquipmentUpgradeContent>> = {
  // ── CHAIRS / DELIVERY / LIGHTS / CABINETRY ──────────────────────────
  dental_chair: {
    tagline: 'Purpose-built seating engineered for 18+ years of clinical reliability',
    features: [
      'Hydraulic systems rated for 500,000+ positioning cycles — industry-leading durability',
      '10-year structural warranty covers the frame, hydraulics, and base components',
      'Low-profile programmable foot control reduces the exact failure points common in aging chairs',
      'Full upholstery replacement available through a national parts network — no extended lead times',
      'Single-source service support simplifies maintenance and reduces callback frequency',
    ],
    rationale:
      'DCI Edge dental chairs are engineered specifically to address the failure modes most common in aging operatory seating — hydraulics, actuators, and foot controls — with one of the strongest warranty coverages in the US market.',
  },
  delivery_unit: {
    tagline: 'Modular delivery systems designed to minimize solenoid and tubing failures',
    features: [
      'Solid-state solenoid manifolds reduce intermittent failure risk significantly vs. legacy designs',
      'Tool-free tubing access allows technicians to service water lines in under 30 minutes',
      'Independent air/water circuits isolate failures to one port without shutting down the full unit',
      'Handpiece ports rated for 250,000+ cycles — eliminates the most common delivery unit failure mode',
      'Full tubing kit replacements stocked by most US dental distributors — same-week availability',
    ],
    rationale:
      'Most delivery unit failures — leaky syringe seals, solenoid faults, handpiece port wear — are design-related in legacy units. DCI Edge delivery systems use updated manifold and port architecture that directly addresses these failure patterns.',
  },
  operatory_light: {
    tagline: 'LED operatory lights with 60,000-hour rated modules and no lamp replacement costs',
    features: [
      '60,000-hour LED module lifespan eliminates recurring bulb replacement — the #1 light maintenance cost',
      'Balanced arm system with tool-free tension adjustment maintains positioning without service calls',
      'Color rendering index (CRI) > 95 for accurate tissue and restorative shade assessment',
      'Touch-free control panel options reduce contamination risk and switch failure frequency',
      'Replacement light head modules available overnight through US distribution — minimizes downtime',
    ],
    rationale:
      'LED-based DCI Edge operatory lights are engineered to eliminate the failure modes most common in halogen-era and first-generation LED lights — bulb burnout, arm drift, and switch deterioration.',
  },
  cabinetry: {
    tagline: 'Dental-specific modular cabinetry with clinical-grade surface materials',
    features: [
      'Phenolic resin work surfaces resist chemical disinfectants that degrade standard laminate over time',
      'Undermount drawer slides rated for 100,000+ cycles — eliminates the most common cabinetry failure',
      'Modular panel system allows single-module replacement without full operatory rebuild',
      'Pre-plumbed sink bases and electrical rough-in reduce installation time and disruption',
      'Available in standard configurations for rapid delivery vs. fully custom builds',
    ],
    rationale:
      'DCI Edge dental cabinetry is manufactured to clinical standards — chemical resistance, drawer durability, and modular serviceability — that general commercial cabinetry cannot match in a dental environment.',
  },

  // ── UTILITY / COMPRESSORS / VACUUMS ─────────────────────────────────
  compressor: {
    tagline: 'Oil-free dental air compressors with validated purity standards and broad service networks',
    features: [
      'Dual-head oil-free pump design allows one head to continue operation during maintenance',
      'Integrated air drying and filtration meets ISO 8573-1 Class 1 dental air purity standards',
      'Automatic alternating run cycles equalize wear between pump heads — extends service life significantly',
      'Quiet-running models (< 60 dBA) for utility room placement near treatment areas',
      'Parts stocked by Air Techniques distributors across all 50 states — next-day availability on most components',
    ],
    rationale:
      'Air Techniques compressors are purpose-engineered for dental utility rooms — addressing the pump wear, moisture contamination, and air purity failures that ultimately drove your current repair situation.',
  },
  vacuum_system: {
    tagline: 'Dental vacuum systems built for continuous clinical use with minimal unplanned downtime',
    features: [
      'Dual-motor configurations allow one motor to remain operational during servicing — zero practice downtime',
      'Amalgam separator integrated at the factory — pre-certified for EPA compliance, no retrofit required',
      'Corrosion-resistant chamber linings address the separator tank degradation common in aging systems',
      'Variable-speed motor control reduces energy consumption up to 30% vs. single-speed legacy motors',
      'Nationwide service network with same-day tech response in most metropolitan markets',
    ],
    rationale:
      'Air Techniques vacuum systems are specifically engineered to address the motor wear, separator failure, and evacuation line inefficiency that characterize aging dental wet vacuum systems — the exact failure pattern driving your current assessment.',
  },
  suction_system: {
    tagline: 'High-efficiency dental suction rated for multi-chair practice demands',
    features: [
      'Multi-user capacity configurations support 4–12 operatories on a single system',
      'Cleanable strainer and trap assemblies reduce blockage-related service calls',
      'Motor run-hour monitoring alerts before failure — enabling scheduled vs. emergency service',
      'Compatible with existing evacuation line plumbing in most operatory configurations',
      'US-based service techs available in all major markets with documented response times',
    ],
    rationale:
      'Air Techniques suction systems are a common replacement benchmark for aging wet vacuum and dry vacuum evacuation systems, offering improved reliability and serviceability over legacy configurations.',
  },
  utility_room: {
    tagline: 'Matched compressor and vacuum packages engineered as an integrated utility room system',
    features: [
      'Factory-matched compressor and vacuum sizing eliminates the pressure/flow mismatches common in mixed-brand utility rooms',
      'Single-vendor service relationship simplifies maintenance scheduling and accountability',
      'Integrated control panel monitors both systems from one display — faster diagnosis during failures',
      'Utility room packages available with installation coordination through Air Techniques distributor network',
      'Warranty covers both units under one service agreement — reduces administrative overhead',
    ],
    rationale:
      'Air Techniques utility room packages address a common failure pattern: aging compressor and vacuum systems that were never sized or maintained as an integrated pair. A matched replacement resolves underlying pressure and flow inefficiencies simultaneously.',
  },

  // ── IMAGING ─────────────────────────────────────────────────────────
  cbct: {
    tagline: '3D diagnostic imaging with updated detector technology and lower dose profiles',
    features: [
      'Flat panel detector technology delivers 40–60% lower effective dose vs. comparable legacy CBCT units',
      'Dexis Imaging Suite integrates CBCT, 2D, and intraoral imaging into one unified workflow platform',
      'AI-assisted detection tools reduce interpretation time and flag pathology automatically',
      'Sub-millimeter voxel resolution supports implant planning, endo, and airway analysis in one scan',
      'Remote software updates maintain regulatory compliance — no service call required for protocol updates',
    ],
    rationale:
      'CBCT detector and generator failures — the most expensive repairs in your category — signal the end of cost-effective service life. A Dexis replacement delivers not just new hardware, but a fully updated diagnostic ecosystem that aging platforms cannot provide.',
  },
  intraoral_xray: {
    tagline: 'Wall-mounted intraoral X-ray with updated generator technology and positioning precision',
    features: [
      'Solid-state DC generator delivers consistent, repeatable exposure settings — eliminates the retake-causing variation in aging AC tube heads',
      'Lightweight maneuverable arm with friction-lock positioning holds placement between patient and sensor placement',
      'Universal sensor compatibility — works with all major intraoral sensor brands without adapters',
      'Reduced tube head weight (< 4 lbs) decreases arm joint wear vs. legacy heavy heads',
      'Tube head replacement — the most common major repair — eliminated under the Dexis warranty period',
    ],
    rationale:
      'Intraoral X-ray tube head failure and generator board issues are the most common major repair events in this category — and frequently recur. A Dexis replacement resolves the root cause rather than repairing aging components that will fail again.',
  },
  sensor: {
    tagline: 'Intraoral digital sensors with updated CMOS architecture and durable, field-tested housings',
    features: [
      'CMOS active pixel sensor delivers 70 lp/mm resolution — diagnostic clarity beyond legacy CCD and early CMOS designs',
      'Rounded, bite-tolerant housing reduces the patient pressure that causes sensor body cracking in earlier generations',
      'Reinforced direct-connect cable eliminates the USB fraying and connector failure that drives the majority of sensor repairs',
      'Sizes 0, 1, and 2 available — full range stocked by US dealers for next-day replacement if needed',
      'RVG integration works natively with most major PMS platforms — no drivers or middleware required',
    ],
    rationale:
      'Sensor CMOS failure and cable damage account for the overwhelming majority of intraoral sensor repair costs. Dexis sensor architecture is specifically designed to address these failure modes with updated imaging elements and reinforced connection systems.',
  },
  panoramic: {
    tagline: 'Panoramic and cephalometric imaging with updated detector and rotation mechanics',
    features: [
      'Digital linear tomography eliminates the X-ray tube and film cassette mechanisms most prone to failure in aging panoramic units',
      'Updated rotation motor and drive belt system addresses the mechanical failure mode driving most panoramic repair events',
      'Cephalometric arm included on most configurations — replaces both your pan and ceph in one capital investment',
      'Automatic patient positioning guides reduce retakes and operator variability',
      'Dexis Imaging Suite integration enables panoramic, CBCT, and intraoral review in a single platform',
    ],
    rationale:
      'Panoramic detector failure, rotation motor wear, and X-ray tube degradation are the defining failure modes in aging panoramic units — and each repair defers an inevitable replacement. Dexis panoramic systems address each of these failure points with updated architecture.',
  },

  // ── SCANNING ────────────────────────────────────────────────────────
  intraoral_scanner: {
    tagline: 'Intraoral scanning with industry-leading accuracy, speed, and open-format lab compatibility',
    features: [
      'Sub-20-micron accuracy across full-arch scans — meets or exceeds the precision of conventional impressions for virtually all restorative applications',
      'Open STL output connects to 400+ certified dental lab partners without lock-in or conversion fees',
      'Tip sterilization protocol validated for Statim and M-Series autoclaves — no special sterilization required',
      'AI-powered scan assist detects gaps and prompts repositioning in real time — reduces rescanning time per patient',
      'Handpiece warranty covers optics and electronics for the first 2 years — the highest-risk failure window for scanner hardware',
    ],
    rationale:
      '3Shape TRIOS scanners address the two most common failure scenarios in aging intraoral scanners: optic degradation that reduces scan accuracy over time, and handpiece failures that require expensive component replacement.',
  },

  // ── CAD/CAM ─────────────────────────────────────────────────────────
  cad_cam: {
    tagline: 'In-office milling system comparison — workflow, restoration volume, and integration matter more than brand',
    features: [
      'Evaluate single-visit vs. two-visit workflows based on your restoration volume and scheduling model',
      'Open vs. closed material systems significantly affect per-unit material costs over a 7-year ownership horizon',
      'Consider existing scanner compatibility — TRIOS, iTero, and Primescan each have preferred milling integrations',
      'Training and CAD design support vary significantly between vendors — assess local dealer capacity before deciding',
      'Total cost of ownership (hardware + materials + service) over 5 years is the most reliable comparison metric',
    ],
    rationale:
      'CAD/CAM replacement decisions are highly workflow-dependent. We recommend requesting side-by-side demos from 2–3 vendors with cases representative of your actual restoration mix before committing.',
  },

  // ── STERILIZER ──────────────────────────────────────────────────────
  sterilizer: {
    tagline: 'Validated steam sterilization with automated compliance documentation',
    features: [
      'FDA 510(k)-cleared sterilization cycles with documented Biological Indicator validation — supports OSHA and CDC compliance requirements',
      'Automated cycle logging exports to digital compliance records — eliminates manual log sheets',
      'Door gasket and thermistor replacement — the two most common sterilizer repair events — are field-serviceable in under 20 minutes',
      'Chamber drain valve redesigned in current M-Series to address the clogging pattern common in older Midmark and competitive units',
      'Nationwide Midmark service network provides next-day response in most US markets',
    ],
    rationale:
      'Sterilizer chamber pressure vessel issues carry OSHA and CDC compliance implications that make continued repair unacceptable beyond a certain threshold. Midmark M-Series replacements are the industry benchmark for validated, documentable sterilization in private practice and DSO settings.',
  },

  // ── HANDPIECE ───────────────────────────────────────────────────────
  handpiece_system: {
    tagline: 'High-speed and electric handpieces designed for consistent torque, low vibration, and rebuild longevity',
    features: [
      'Fiber-optic LED integrated into handpiece head — eliminates the separate light rod failure that is one of the most common repair events',
      'Precision-balanced turbine cartridges replaceable in under 5 minutes chairside — reduces service call frequency',
      'Electric motor handpieces eliminate turbine wear entirely for high-volume cutting applications',
      'Autoclave-rated to 135°C for 200+ cycles without chuck or bearing degradation',
      'KaVo repair service centers in the US offer same-week factory rebuild on high-speed and electric units',
    ],
    rationale:
      'Handpiece turbine wear, chuck failure, and fiber optic degradation are the defining repair events for aging high-speed systems. KaVo handpieces are engineered for rebuild longevity — most practices report lower per-procedure maintenance costs over a 5-year ownership period.',
  },
}
