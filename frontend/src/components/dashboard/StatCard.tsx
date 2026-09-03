import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  isCurrency?: boolean;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  colorScheme?: 'blue' | 'emerald' | 'cyan' | 'amber' | 'purple';
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  isCurrency = false,
  prefix = '',
  suffix = '',
  trend,
  icon: Icon,
  colorScheme = 'blue',
  subtitle,
}) => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof value === 'number' ? 0 : value
  );

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      const stepTime = duration / steps;

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
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const colorStyles = {
    blue: {
      border: 'hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'group-hover:shadow-blue-500/10',
      accent: 'from-blue-500/10 to-transparent',
    },
    emerald: {
      border: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:shadow-emerald-500/10',
      accent: 'from-emerald-500/10 to-transparent',
    },
    cyan: {
      border: 'hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'group-hover:shadow-cyan-500/10',
      accent: 'from-cyan-500/10 to-transparent',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:shadow-amber-500/10',
      accent: 'from-amber-500/10 to-transparent',
    },
    purple: {
      border: 'hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'group-hover:shadow-purple-500/10',
      accent: 'from-purple-500/10 to-transparent',
    },
  };

  const scheme = colorStyles[colorScheme];

  const formatNumber = (val: number | string) => {
    if (typeof val === 'number') {
      if (isCurrency) {
        return `₹${val.toLocaleString('en-IN')}`;
      }
      return val.toLocaleString('en-IN');
    }
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className={`glass-card p-5 rounded-2xl relative overflow-hidden group border transition-all ${scheme.border} ${scheme.glow}`}
    >
      {/* Background soft gradient wash */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${scheme.accent} rounded-full blur-2xl pointer-events-none`} />

      <div className="flex items-start justify-between mb-3 relative z-10">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border ${scheme.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 relative z-10">
        <span className="text-2xl font-bold font-display text-white tracking-tight">
          {prefix}{formatNumber(displayValue)}{suffix}
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-400 mt-2 relative z-10">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
