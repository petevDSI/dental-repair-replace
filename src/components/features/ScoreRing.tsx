interface ScoreRingProps {
  score: number;          // 0-100
  label: string;
  size?: number;
  strokeWidth?: number;
  color?: 'teal' | 'amber' | 'red' | 'blue' | 'slate';
}

const COLOR_MAP = {
  teal: { stroke: '#14b8a6', text: '#0d9488', bg: '#f0fdfa' },
  amber: { stroke: '#f59e0b', text: '#d97706', bg: '#fffbeb' },
  red: { stroke: '#ef4444', text: '#dc2626', bg: '#fef2f2' },
  blue: { stroke: '#3b82f6', text: '#2563eb', bg: '#eff6ff' },
  slate: { stroke: '#64748b', text: '#475569', bg: '#f8fafc' },
};

function getColorByScore(score: number): 'teal' | 'amber' | 'red' {
  if (score <= 35) return 'teal';
  if (score <= 65) return 'amber';
  return 'red';
}

const ScoreRing = ({ score, label, size = 100, strokeWidth = 8, color }: ScoreRingProps) => {
  const resolvedColor = color ?? getColorByScore(score);
  const colors = COLOR_MAP[resolvedColor];
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold leading-none"
            style={{ color: colors.text, fontSize: size * 0.22 }}
          >
            {score}
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-600 text-center leading-tight max-w-[90px]">{label}</p>
    </div>
  );
};

export default ScoreRing;
