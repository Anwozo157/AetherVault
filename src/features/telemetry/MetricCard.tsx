import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MetricCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  color: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      layout
      className="flex flex-col items-start min-w-0 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-2xl border border-white/5"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">
          {label}
        </span>
      </div>
      <span
        className={`w-full text-2xl sm:text-3xl font-mono font-medium tracking-tight break-words ${color}`}
      >
        {value}
      </span>
    </motion.div>
  );
}
