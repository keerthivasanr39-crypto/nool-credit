import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo.msme@noolcredit.in');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // We default role to MSME in this simplified UI.
  // In a real app, backend determines role from the email, or user selects it.
  const role: UserRole = 'MSME'; 

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
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Background Waves/Circles to match Canva */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-50/50 rounded-b-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-blue-600 rounded-t-[50%] opacity-90 -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-1/2 bg-blue-500 rounded-t-[50%] opacity-40 -z-20" />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm overflow-hidden p-2">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                document.getElementById('fallback-icon-canva')!.style.display = 'flex';
              }}
            />
            <div id="fallback-icon-canva" style={{display: 'none'}} className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white">
              <span className="font-bold text-xl">NC</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Nool Credit
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">
            Welcome back! Please sign in to continue
          </p>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold text-slate-700 ml-1">Email or Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-blue-500" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
                placeholder="Enter your email or username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-blue-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-1">
            <button type="button" className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] flex justify-center items-center h-[52px] mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="bg-white px-3">OR</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Footer Link */}
        <div className="mt-8 text-center text-[11px] font-medium text-slate-500">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create Account</Link>
        </div>
      </motion.div>
    </div>
  );
};
