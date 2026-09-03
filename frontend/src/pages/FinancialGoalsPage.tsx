import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Plus,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentSavings: number;
  deadline: string;
  category: string;
  motivationalMessage: string;
}

export const FinancialGoalsPage: React.FC = () => {
  const { t } = useTranslation();
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: 'g-1',
      name: 'Buy New High-Speed Circular Knitting Machinery',
      targetAmount: 600000,
      currentSavings: 390000,
      deadline: 'December 2026',
      category: 'Capital Expenditure',
      motivationalMessage: '🎯 65% achieved! Financing pending invoices can bridge the remaining ₹2,10,000.',
    },
    {
      id: 'g-2',
      name: 'Expand Production to Dyeing & Finishing Unit',
      targetAmount: 1000000,
      currentSavings: 450000,
      deadline: 'March 2027',
      category: 'Capacity Expansion',
      motivationalMessage: '🚀 Steady progress. On track to increase monthly revenue by 40%.',
    },
    {
      id: 'g-3',
      name: 'Increase Working Capital Buffer for Peak Season',
      targetAmount: 500000,
      currentSavings: 400000,
      deadline: 'October 2026',
      category: 'Working Capital',
      motivationalMessage: '🔥 80% achieved! Almost ready for major festival export orders.',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newTargetAmount, setNewTargetAmount] = useState(500000);
  const [newCurrentSavings, setNewCurrentSavings] = useState(150000);
  const [newDeadline, setNewDeadline] = useState('January 2027');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName) return;

    const newGoal: FinancialGoal = {
      id: `g-${Date.now()}`,
      name: newGoalName,
      targetAmount: Number(newTargetAmount),
      currentSavings: Number(newCurrentSavings),
      deadline: newDeadline,
      category: 'Strategic Investment',
      motivationalMessage: '✨ Great goal! Accelerated invoice financing helps MSMEs hit milestones faster.',
    };

    setGoals((prev) => [newGoal, ...prev]);
    setShowAddModal(false);
    setNewGoalName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-brand-700/60 px-2.5 py-0.5 rounded-full">
              Growth Planner
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Business Financial Goals</h1>
          <p className="text-xs text-brand-200">
            Set working capital milestones and track accelerated capital deployment.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Goals Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentSavings / goal.targetAmount) * 100));
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    {goal.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {goal.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target Date: {goal.deadline}</span>
                  </div>
                </div>

                {/* Progress Bar & Values */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">
                      Saved: <span className="text-slate-900">₹{goal.currentSavings.toLocaleString('en-IN')}</span>
                    </span>
                    <span className="text-brand-700">₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-emerald-500"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-emerald-600">{pct}% Completed</span>
                    <span className="text-slate-400 text-[11px]">
                      Remaining: ₹{(goal.targetAmount - goal.currentSavings).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Motivational Callout */}
                <div className="p-3 rounded-2xl bg-brand-50/70 border border-brand-100 text-xs text-brand-800 font-medium">
                  {goal.motivationalMessage}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left"
            >
              <h3 className="text-base font-extrabold text-slate-900">Create Business Financial Goal</h3>
              <p className="text-xs text-slate-500">
                Plan machinery upgrades, working capital reserves, or factory expansion.
              </p>

              <form onSubmit={handleAddGoal} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Goal Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Upgrade Dyeing Machinery"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={newTargetAmount}
                      onChange={(e) => setNewTargetAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Current Savings (₹)</label>
                    <input
                      type="number"
                      required
                      value={newCurrentSavings}
                      onChange={(e) => setNewCurrentSavings(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Completion Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. December 2026"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md"
                  >
                    Save Goal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
