import { useState } from 'react';
import type { CalculatorFormData, CalculationResult, Step1Data, Step2Data, Step3Data, Step4Data } from '@/types/calculator';
import { runCalculation } from '@/lib/calculatorEngine';
import { EQUIPMENT_LABELS } from '@/constants/calculatorData';
import StepProgress from './StepProgress';
import Step1Equipment from './Step1Equipment';
import Step2Condition from './Step2Condition';
import Step3Financial from './Step3Financial';
import Step4Maintenance from './Step4Maintenance';
import ResultsDashboard from './ResultsDashboard';

const INITIAL_FORM: CalculatorFormData = {
  step1: {
    category: '',
    manufacturer: '',
    model: '',
    yearInstalled: '',
    estimatedOriginalCost: '',
  },
  step2: {
    issueType: '',
    currentRepairEstimate: '',
    repairsLast24Months: 1,
    downtimePerFailure: '',
    reliabilityRating: '',
    partsAvailability: '',
    productionImpact: '',
  },
  step3: {
    estimatedDailyProduction: '',
    backupStatus: '',
    plannedExpansion: null,
    obsolescenceScore: 5,
  },
  step4: {
    pmFrequency: '',
    serviceContractStatus: '',
  },
};

const STEP_LABELS = ['Equipment', 'Condition', 'Financials', 'Maintenance'];

const DentalCalculator = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CalculatorFormData>(INITIAL_FORM);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateStep1 = (updates: Partial<Step1Data>) =>
    setForm((p) => ({ ...p, step1: { ...p.step1, ...updates } }));
  const updateStep2 = (updates: Partial<Step2Data>) =>
    setForm((p) => ({ ...p, step2: { ...p.step2, ...updates } }));
  const updateStep3 = (updates: Partial<Step3Data>) =>
    setForm((p) => ({ ...p, step3: { ...p.step3, ...updates } }));
  const updateStep4 = (updates: Partial<Step4Data>) =>
    setForm((p) => ({ ...p, step4: { ...p.step4, ...updates } }));

  const handleCalculate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const calcResult = runCalculation(form);
      setResult(calcResult);
      setIsLoading(false);
      setStep(5);
    }, 1200);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setResult(null);
    setStep(1);
  };

  const equipmentLabel = form.step1.category
    ? EQUIPMENT_LABELS[form.step1.category as keyof typeof EQUIPMENT_LABELS]
    : 'Equipment';

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden w-full max-w-2xl mx-auto">
      {/* Calculator header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest">DentalAssetIQ</p>
            <h1 className="text-lg font-bold text-white leading-tight">Repair vs Replace Intelligence</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {step < 5 && (
          <StepProgress currentStep={step} totalSteps={4} stepLabels={STEP_LABELS} />
        )}

        {step === 1 && (
          <Step1Equipment data={form.step1} onChange={updateStep1} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2Condition data={form.step2} onChange={updateStep2} onNext={() => setStep(3)} onBack={() => setStep(1)} category={form.step1.category} />
        )}
        {step === 3 && (
          <Step3Financial data={form.step3} onChange={updateStep3} onNext={() => setStep(4)} onBack={() => setStep(2)} />
        )}
        {step === 4 && (
          <Step4Maintenance data={form.step4} onChange={updateStep4} onCalculate={handleCalculate} onBack={() => setStep(3)} isLoading={isLoading} />
        )}
        {step === 5 && result && (
          <ResultsDashboard
            result={result}
            equipmentLabel={equipmentLabel}
            manufacturer={form.step1.manufacturer || 'Unknown'}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default DentalCalculator;
