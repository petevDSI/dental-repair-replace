interface Props {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepProgress = ({ currentStep, totalSteps, stepLabels }: Props) => {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Step labels row */}
      <div className="flex justify-between mb-3 relative">
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isComplete = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all duration-300 z-10 relative ${
                  isComplete
                    ? 'bg-teal-500 text-white'
                    : isActive
                    ? 'bg-navy-800 border-2 border-teal-500 text-teal-500 bg-white'
                    : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                }`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[11px] font-medium text-center hidden sm:block leading-tight ${
                  isActive ? 'text-teal-600' : isComplete ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
        {/* Track line behind bubbles */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 z-0 mx-4" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-teal-500 z-0 ml-4 transition-all duration-500"
          style={{ width: `calc(${progressPercent}% - 2rem)` }}
        />
      </div>
    </div>
  );
};

export default StepProgress;
