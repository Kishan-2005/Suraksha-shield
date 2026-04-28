import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowLeft, User, Fingerprint, CheckCircle, AlertCircle } from 'lucide-react';

export default function Register({ onRegister, onNavigateLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate a database check and insert
    const users = JSON.parse(localStorage.getItem('honeyShieldUsers') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      setError('This identity is already registered in the system.');
      return;
    }

    // Register user
    users.push(formData);
    localStorage.setItem('honeyShieldUsers', JSON.stringify(users));
    
    setSuccess(true);
    setError('');
    
    // Switch to login automatically after success
    setTimeout(() => {
      onNavigateLogin();
    }, 2000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]"></div>
      
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative z-10">
        <button onClick={onNavigateLogin} className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-8 mt-2">
          <div className="p-3 rounded-xl bg-slate-900 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.3)] mb-4">
            <Fingerprint className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-widest text-white">Enrollment</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">Register New Identity</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {success ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
            <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Identity Registered</h2>
            <p className="text-xs text-slate-300 font-mono">Redirecting to terminal login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" name="name" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none transition-colors" placeholder="John Doe" value={formData.name} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" name="email" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none transition-colors" placeholder="agent@honeyshield.io" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="password" name="password" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none transition-colors" placeholder="••••••••" value={formData.password} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white py-3 rounded-lg uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)] flex justify-center items-center gap-2 mt-6">
              <Shield className="w-4 h-4" /> Create Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
