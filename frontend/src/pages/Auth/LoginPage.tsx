import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { 
  Layers, 
  Lock, 
  Mail, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('msme@noolcredit.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('MSME');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = await login(email, password, role);
    if (success) {
      if (role === 'MSME') {
        navigate('/msme/dashboard');
      } else {
        navigate('/lender/dashboard');
      }
    } else {
      setErrorMsg('Invalid credentials. Use demo credentials below.');
    }
  };

  const handleGoogleSignIn = async () => {
    await login('msme@noolcredit.com', 'password123', 'MSME');
    navigate('/msme/dashboard');
  };

  const handleFillDemo = (targetRole: UserRole) => {
    setRole(targetRole);
    if (targetRole === 'MSME') {
      setEmail('msme@noolcredit.com');
      setPassword('password123');
    } else {
      setEmail('lender@noolcredit.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden py-12">
      {/* Floating geometric background orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Main Glass Card */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl relative space-y-6">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 mx-auto shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Layers className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white font-display">
              {t('auth.welcomeBack')}
            </h1>
            <p className="text-xs text-slate-400">
              {t('auth.loginSubtitle')}
            </p>
          </div>

          {/* Google Sign-In Button (Google Pay style clean UI) */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center gap-3 shadow-md transition-all hover:scale-[1.01]"
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
            <span>{t('auth.googleSignIn')}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[10px] text-slate-500 uppercase font-semibold">or email sign-in</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* 1-Click Demo Credentials Quick Fill */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                {t('auth.demoCredentialsTitle')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('MSME')}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  role === 'MSME'
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>MSME Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('LENDER')}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  role === 'LENDER'
                    ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Lender Demo</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Role Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t('auth.roleLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('MSME')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    role === 'MSME'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  MSME
                </button>
                <button
                  type="button"
                  onClick={() => setRole('LENDER')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    role === 'LENDER'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  LENDER
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t('auth.emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {t('auth.passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{t('auth.loginButton')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="text-center text-[11px] text-slate-400">
            {t('auth.needAccount')}{' '}
            <Link to="/register" className="text-blue-400 hover:underline font-semibold">
              Create account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
