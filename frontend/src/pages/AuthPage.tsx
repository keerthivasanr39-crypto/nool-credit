import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building,
  Briefcase,
  CheckCircle2,
  FileSpreadsheet,
  Coins,
  Globe,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { LanguageSelector } from '../components/common/LanguageSelector';

export const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('MSME');
  const [email, setEmail] = useState('demo.msme@noolcredit.in');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'MSME') {
      setEmail('demo.msme@noolcredit.in');
      setPassword('demo1234');
    } else {
      setEmail('demo.lender@noolcredit.in');
      setPassword('demo1234');
    }
  };

  const handleQuickDemoLogin = (selectedRole: UserRole) => {
    setIsLoading(true);
    const demoEmail = selectedRole === 'MSME' ? 'demo.msme@noolcredit.in' : 'demo.lender@noolcredit.in';
    setRole(selectedRole);
    setEmail(demoEmail);
    setPassword('demo1234');

    setTimeout(() => {
      login(demoEmail, selectedRole);
      setIsLoading(false);
      if (selectedRole === 'LENDER') {
        navigate('/lender');
      } else {
        navigate('/dashboard');
      }
    }, 500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('google.user@srilakshmiknits.com', 'MSME');
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(email, role);
      setIsLoading(false);
      if (role === 'LENDER') {
        navigate('/lender');
      } else {
        navigate('/dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animated Financial Lines & Moving Rupee Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        
        {/* Floating Rupee Particles */}
        {['₹', '₹', '₹', '₹', '₹', '₹'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-300/20 font-extrabold select-none"
            style={{
              fontSize: `${24 + i * 8}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
              rotate: [-10, 10, -10],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.div>
        ))}

        {/* Floating Invoice Card Graphic 1 */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden xl:flex absolute top-20 left-12 w-64 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white shadow-2xl flex-col gap-2"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300">INV-2026-102</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              ✓ Verified
            </span>
          </div>
          <div className="text-xs text-slate-300">Buyer: ABC Garments Ltd</div>
          <div className="flex justify-between items-end pt-2 border-t border-white/10">
            <div>
              <div className="text-[10px] text-slate-400">Invoice Amount</div>
              <div className="text-base font-extrabold text-white">₹1,00,000</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Advance Available</div>
              <div className="text-xs font-bold text-emerald-400">₹85,000 (85%)</div>
            </div>
          </div>
        </motion.div>

        {/* Floating Invoice Card Graphic 2 */}
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden xl:flex absolute bottom-20 right-12 w-64 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white shadow-2xl flex-col gap-2"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300">POOL-1001</span>
            <span className="text-[10px] bg-brand-500/30 text-brand-200 px-2 py-0.5 rounded-full font-bold">
              3 Invoices Bundled
            </span>
          </div>
          <div className="text-xs text-slate-300">Sri Lakshmi Knits • Tirupur</div>
          <div className="flex justify-between items-end pt-2 border-t border-white/10">
            <div>
              <div className="text-[10px] text-slate-400">Risk Score</div>
              <div className="text-base font-extrabold text-emerald-400">86 / 100</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Disbursement</div>
              <div className="text-xs font-bold text-amber-300">48h Expedited</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Header Bar inside Login View with Language & Branding */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 p-0.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-tight text-white leading-tight">
              NOOL <span className="text-brand-400">CREDIT</span>
            </span>
            <span className="text-[9px] text-slate-400 tracking-wider">
              MSME FINTECH
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSelector compact />
        </div>
      </div>

      {/* Main Login Card with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-8 border border-white/40 shadow-2xl relative z-10 my-12"
      >
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-900 via-brand-700 to-brand-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-brand-900/30">
            <Layers className="w-6 h-6 text-amber-300" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            NOOL <span className="text-brand-600">CREDIT</span>
          </h2>
          <p className="text-[11px] font-semibold text-brand-700 mt-0.5">
            "One Platform. Smarter Financing. Faster Growth."
          </p>
          <div className="mt-2 text-xs font-bold text-slate-800">
            {isSignUp ? 'Create your business account' : 'Turn Your Pending Invoices Into Financial Opportunities'}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Smart invoice financing for growing businesses
          </p>
        </div>

        {/* Google Sign-In button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 shadow-xs transition-all hover:border-slate-300 mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">or email login</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-4">
          <button
            type="button"
            onClick={() => handleRoleChange('MSME')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'MSME'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>MSME Portal</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('LENDER')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'LENDER'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Lender Portal</span>
          </button>
        </div>

        {/* Login / Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 font-medium text-slate-800 transition-colors"
                placeholder="name@business.in"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password</label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setForgotSent(false);
                  }}
                  className="text-[11px] text-brand-600 hover:text-brand-700 font-semibold"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 font-medium text-slate-800 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2 hover:shadow-lg"
          >
            {isLoading ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Create Business Account' : `Sign In to ${role} Portal`}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Sign Up vs Sign In */}
        <div className="text-center mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-brand-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              New to Nool Credit?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-brand-600 font-bold hover:underline"
              >
                Register Business
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Reset Password</h3>
              <p className="text-xs text-slate-500">
                Enter your registered business email to receive an instant OTP reset link.
              </p>
              
              {forgotSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                  ✓ Reset instructions sent to {email}
                </div>
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  placeholder="name@business.in"
                />
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Close
                </button>
                {!forgotSent && (
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
                  >
                    Send Reset Link
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
