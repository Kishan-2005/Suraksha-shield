import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, UserPlus, AlertCircle } from 'lucide-react';

export default function Login({ onLogin, onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate checking a database using localStorage
    const users = JSON.parse(localStorage.getItem('honeyShieldUsers') || '[]');
    
    const validUser = users.find(u => u.email === email && u.password === password);
    
    if (validUser) {
      setError('');
      // Store current session
      localStorage.setItem('currentUser', JSON.stringify(validUser));
      onLogin(validUser);
    } else {
      setError('Access Denied: Unrecognized operative credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-4">
            <Shield className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-white">HoneyShield X</h1>
          <p className="text-xs text-cyan-500 font-mono tracking-widest uppercase mt-1">Secure Terminal Login</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Operative ID / Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="email" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="agent@honeyshield.io" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Access Code</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="password" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex justify-center items-center gap-2 mt-4">
            Authenticate <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-400">New Operative?</p>
          <button onClick={onNavigateRegister} className="mt-2 text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 mx-auto transition-colors">
            <UserPlus className="w-3 h-3" /> Request Access
          </button>
        </div>
      </div>
    </div>
  );
}
