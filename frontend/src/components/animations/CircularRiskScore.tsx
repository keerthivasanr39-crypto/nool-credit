import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import { RiskLevel } from '../../types';

interface CircularRiskScoreProps {
  score: number;
  riskLevel?: RiskLevel;
  size?: number;
  strokeWidth?: number;
  showBadge?: boolean;
}

export const CircularRiskScore: React.FC<CircularRiskScoreProps> = ({
  score = 86,
  riskLevel,
  size = 180,
  strokeWidth = 12,
  showBadge = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Determine risk level if not provided
  const level: RiskLevel = riskLevel || (score >= 80 ? 'LOW' : score >= 60 ? 'MEDIUM' : 'HIGH');

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Colors based on risk level
  const colorMap = {
    LOW: {
      stroke: '#10B981', // emerald-500
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      label: 'LOW RISK',
      icon: ShieldCheck,
    },
    MEDIUM: {
      stroke: '#F59E0B', // amber-500
      glow: 'rgba(245, 158, 11, 0.4)',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      label: 'MEDIUM RISK',
      icon: AlertTriangle,
    },
    HIGH: {
      stroke: '#F43F5E', // rose-500
      glow: 'rgba(244, 63, 94, 0.4)',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      label: 'HIGH RISK',
      icon: AlertOctagon,
    },
  };

  const theme = colorMap[level];
  const Icon = theme.icon;

  // Smooth number count-up
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = score / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glowing backdrop shadow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-700"
          style={{ background: theme.glow }}
        />

        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Animated active score circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 8px ${theme.glow})`,
            }}
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold font-display tracking-tight text-white">
                {animatedScore}
              </span>
              <span className="text-xs text-slate-400 font-medium ml-0.5">/100</span>
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-0.5">
              Score
            </span>
          </motion.div>
        </div>
      </div>

      {/* Risk Badge */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${theme.bg} ${theme.border} ${theme.text}`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{theme.label}</span>
        </motion.div>
      )}
    </div>
  );
};
