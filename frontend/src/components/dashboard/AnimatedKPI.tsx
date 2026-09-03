import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { PrivacyMask } from '../common/PrivacyMask';

interface AnimatedKPIProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  icon: LucideIcon;
  changeText?: string;
  isPositive?: boolean;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'purple';
  delay?: number;
}

export const AnimatedKPI: React.FC<AnimatedKPIProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  isCurrency = false,
  icon: Icon,
  changeText,
  isPositive = true,
  colorScheme = 'blue',
  delay = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    blue: {
      bg: 'bg-brand-50 text-brand-700 border-brand-100',
      iconBg: 'bg-brand-100 text-brand-700',
      glow: 'pulse-glow-blue'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-700',
      glow: 'pulse-glow-green'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      iconBg: 'bg-amber-100 text-amber-700',
      glow: 'pulse-glow-amber'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-700 border-purple-100',
      iconBg: 'bg-purple-100 text-purple-700',
      glow: 'pulse-glow-blue'
    }
  }[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses.iconBg} shadow-xs`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {isCurrency ? (
            <PrivacyMask value={displayValue} type="currency" />
          ) : (
            `${prefix}${displayValue.toLocaleString('en-IN')}${suffix}`
          )}
        </span>
      </div>

      {changeText && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          {isPositive ? (
            <span className="flex items-center text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> {changeText}
            </span>
          ) : (
            <span className="flex items-center text-slate-400 font-medium">
              {changeText}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
