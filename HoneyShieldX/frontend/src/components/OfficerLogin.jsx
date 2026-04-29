import React, { useState } from 'react';
import { ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

export default function OfficerLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:5000/api/officer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('officer_token', data.token);
        onLogin();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      </div>
      
      <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-slate-700/50 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(15,23,42,0.5)]">
            <ShieldAlert className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Officer Portal</h2>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/50 text-red-400 p-3 rounded-xl text-xs font-bold uppercase tracking-wider mb-6 text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Officer ID / Email</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#0b1120] border border-slate-800 hover:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="officer@police.gov" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Passcode</label>
            <div className="relative">
              <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#0b1120] border border-slate-800 hover:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder="••••••••" />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Access Portal'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
