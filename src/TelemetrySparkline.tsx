import React from 'react';

interface TelemetrySparklineProps {
  data: number[];
  color: string;
  fillId: string;
  label: string;
  currentValue: string;
  unit: string;
}

export default function TelemetrySparkline({
  data,
  color,
  fillId,
  label,
  currentValue,
  unit
}: TelemetrySparklineProps) {
  const width = 280;
  const height = 54;
  const padding = 4;

  const min = Math.min(...data, 0);
  const max = Math.max(...data, 1);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - padding},${height} L ${padding},${height} Z`;

  return (
    <div className="flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-3 flex-1 min-w-[200px]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">{label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>
          {currentValue} <span className="text-[10px] font-normal text-zinc-500">{unit}</span>
        </span>
      </div>
      <div className="relative w-full h-[54px] overflow-hidden">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill={`url(#${fillId})`} />
          <path 
            d={pathD} 
            fill="none" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </div>
  );
}
