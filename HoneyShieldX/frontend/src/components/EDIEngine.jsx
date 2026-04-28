import React, { useState, useEffect } from 'react';
import { BrainCircuit, Activity, Heart, Shield, Unlock, DollarSign, TrendingUp, Cpu } from 'lucide-react';

export default function EDIEngine({ demoMode }) {
  const [data, setData] = useState({
    score: 12,
    velocity: 5,
    loveBombing: 10,
    isolation: 0,
    replacement: 0,
    financial: 0,
    status: "SAFE",
    color: "emerald"
  });

  useEffect(() => {
    if (demoMode) {
      setTimeout(() => {
        setData({
          score: 91,
          velocity: 88,
          loveBombing: 93,
          isolation: 84,
          replacement: 89,
          financial: 95,
          status: "CRITICAL",
          color: "red"
        });
      }, 1500);
    } else {
      setData({
        score: 12,
        velocity: 5,
        loveBombing: 10,
        isolation: 0,
        replacement: 0,
        financial: 0,
        status: "SAFE",
        color: "emerald"
      });
    }
  }, [demoMode]);

  const ProgressBar = ({ label, val, color }) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1 font-mono uppercase text-slate-400">
        <span>{label}</span>
        <span className={`text-${color}-400 font-bold`}>{val}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-500 transition-all duration-1000`} style={{ width: `${val}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-800 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-fuchsia-500" /> EDI Engine
          </h2>
          <p className="text-xs text-slate-400 font-mono tracking-widest mt-1">Emotional Dependency Intelligence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <div className={`glass-panel p-8 rounded-2xl border-t-4 border-t-${data.color}-500 flex flex-col items-center transition-all duration-1000 relative overflow-hidden`}>
            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${data.color}-500/10 rounded-full blur-[80px]`}></div>
            
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest w-full text-left mb-6">EDI Score</h3>
            
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className={`w-full h-full -rotate-90 drop-shadow-[0_0_20px_rgba(${data.color === 'red' ? '220,38,38' : '16,185,129'},0.4)]`}>
                <path fill="none" stroke="#1e293b" strokeWidth="1.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path fill="none" stroke={data.color === 'red' ? '#dc2626' : '#10b981'} strokeWidth="2.5" strokeDasharray={`${data.score}, 100`} strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" className="transition-all duration-1500 ease-out" />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className={`text-6xl font-black text-${data.color}-500 font-mono tracking-tighter`}>{data.score}</span>
                <span className={`text-[10px] uppercase font-bold text-${data.color}-400 bg-${data.color}-500/10 px-3 py-1 rounded-full mt-2 border border-${data.color}-500/30 tracking-widest`}>
                  {data.status}
                </span>
              </div>
            </div>

            <div className="w-full mt-8 grid grid-cols-2 gap-4">
              <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 text-center">
                <TrendingUp className={`w-5 h-5 mx-auto mb-2 text-${data.color}-500`} />
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Velocity</p>
                <p className={`text-lg font-mono font-bold text-${data.color}-400`}>{data.velocity} / 100</p>
              </div>
              <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 text-center">
                <DollarSign className={`w-5 h-5 mx-auto mb-2 text-${data.financial > 80 ? 'red' : 'slate'}-500`} />
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Financial Risk</p>
                <p className={`text-lg font-mono font-bold text-${data.financial > 80 ? 'red' : 'slate'}-400`}>{data.financial}%</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-fuchsia-500" /> Explainable AI</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {demoMode ? 
                "The conversation demonstrates accelerated emotional dependency formation combined with isolation manipulation and emotional control reinforcement patterns commonly found in honey trap scams." : 
                "Conversation behavior is currently within normal parameters. No manipulative patterns detected."}
            </p>
            {demoMode && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-1">Prediction</p>
                <p className="text-sm text-red-300">High probability of financial extraction attempt within upcoming interactions.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Psychological Manipulation Vectors</h3>
            
            <div className="space-y-6">
              <div className="bg-[#0b1120] p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-10 group-hover:scale-110 transition-transform"><Heart className="w-32 h-32 text-pink-500" /></div>
                <ProgressBar label="Love Bombing Intensity" val={data.loveBombing} color={demoMode ? "pink" : "emerald"} />
                {demoMode && <p className="text-[10px] font-mono text-pink-400">DETECTED: "You are my soulmate", "I love you already"</p>}
              </div>

              <div className="bg-[#0b1120] p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-10 group-hover:scale-110 transition-transform"><Unlock className="w-32 h-32 text-amber-500" /></div>
                <ProgressBar label="Isolation Pressure" val={data.isolation} color={demoMode ? "amber" : "emerald"} />
                {demoMode && <p className="text-[10px] font-mono text-amber-400">DETECTED: "Don't tell anyone about us", "Keep us a secret"</p>}
              </div>

              <div className="bg-[#0b1120] p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-10 group-hover:scale-110 transition-transform"><Shield className="w-32 h-32 text-purple-500" /></div>
                <ProgressBar label="Emotional Replacement" val={data.replacement} color={demoMode ? "purple" : "emerald"} />
                {demoMode && <p className="text-[10px] font-mono text-purple-400">DETECTED: "Only I truly understand you"</p>}
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Emotional Hook Timeline</h3>
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
              {demoMode && <div className="absolute left-0 top-1/2 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 -translate-y-1/2 z-0 animate-[pulse_2s_ease-in-out_infinite]"></div>}
              
              {["Contact", "Bonding", "Trust", "Isolation", "Exploit"].map((step, idx) => {
                const active = demoMode || idx === 0;
                const isDanger = demoMode && idx >= 3;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-[#020617] transition-all duration-500 ${active ? (isDanger ? 'border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.8)]' : 'border-emerald-500') : 'border-slate-700'}`}>
                      <div className={`w-3 h-3 rounded-full ${active ? (isDanger ? 'bg-red-500 animate-ping' : 'bg-emerald-500') : 'bg-slate-700'}`}></div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? (isDanger ? 'text-red-400' : 'text-slate-300') : 'text-slate-600'}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
