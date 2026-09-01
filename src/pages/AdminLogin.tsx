import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token
      localStorage.setItem('adminToken', data.token);
      toast.success('Logged in successfully!');
      
      // Redirect to dashboard
      navigate('/admin/events');
      
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans flex flex-col">
      {/* Light Grid Background for the bottom part */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', 
          backgroundSize: '4rem 4rem',
          opacity: 0.4
        }} 
      />

      {/* Top Blue Curved Header */}
      <div className="absolute top-0 left-0 right-0 h-[45vh] bg-blue-700 z-0 rounded-b-[50%] scale-150 transform origin-top translate-y-[-10%] sm:translate-y-0" />
      
      {/* Decorative stars/particles in the blue area */}
      <div className="absolute top-10 left-20 w-2 h-2 bg-white/40 rounded-full blur-[1px]" />
      <div className="absolute top-32 left-1/4 w-3 h-3 bg-white/30 rounded-full blur-[2px]" />
      <div className="absolute top-20 right-1/4 w-1.5 h-1.5 bg-white/50 rounded-full blur-[1px]" />
      <div className="absolute top-40 right-20 w-2.5 h-2.5 bg-white/40 rounded-full blur-[1px]" />

      <div className="relative z-10 flex flex-col items-center pt-12 min-h-screen">
        {/* Header Texts */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white mb-8"
        >
          <h1 className="text-3xl font-bold tracking-wider mb-6">Admin Pannel </h1>
          <h2 className="text-4xl font-semibold">Hello <span className="inline-block animate-wave origin-bottom-right">👋</span> Welcome Back!</h2>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl px-4 mt-4 relative">
          
          {/* Login Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-md lg:mr-10 z-20"
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-slate-800 mb-2">LogIn</h3>
              <p className="text-slate-500 text-sm">Please login to admin dashboard</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 ml-1">Email/Username*</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourmail@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 ml-1">Password*</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-300"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4" />
                  <span className="text-slate-600 font-medium">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Forgot password?</a>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all mt-6 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </motion.div>

          {/* Avatar Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block relative z-30"
          >
            <img 
              src="/admin_pannel_avatar-removebg-preview.png" 
              alt="Admin Avatar" 
              className="w-[450px] object-contain drop-shadow-2xl animate-float"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
