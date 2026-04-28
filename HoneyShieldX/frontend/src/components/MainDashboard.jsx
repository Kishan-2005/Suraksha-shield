import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, Users, TrendingUp, BarChart2, Globe } from 'lucide-react';

export default function MainDashboard({ demoMode }) {
  const stats = [
    { label: "Scams Prevented", value: demoMode ? "1,428" : "1,427", change: "+12%", icon: ShieldCheck, color: "emerald" },
    { label: "Active Threats", value: demoMode ? "1" : "0", change: demoMode ? "+1" : "0", icon: AlertTriangle, color: "red" },
    { label: "Profiles Scanned", value: "84,592", change: "+4.2%", icon: Users, color: "blue" },
    { label: "System Uptime", value: "99.9%", change: "Stable", icon: Activity, color: "cyan" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-cyan-400" /> Command Center
        </h2>
        <p className="text-xs text-slate-400 font-mono tracking-widest mt-1">Global Telemetry & System Status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`glass-panel p-6 rounded-2xl border border-slate-700 relative overflow-hidden group hover:border-${s.color}-500/50 transition-colors`}>
              <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${s.color}-500/10 rounded-full blur-xl group-hover:bg-${s.color}-500/20 transition-colors`}></div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${s.color}-500/10 border border-${s.color}-500/20`}>
                  <Icon className={`w-5 h-5 text-${s.color}-400`} />
                </div>
                <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded bg-slate-800 text-${s.change.includes('+') ? 'emerald' : 'slate'}-400`}>
                  {s.change}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white font-mono">{s.value}</h3>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-700 h-[400px] flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Global Threat Map
          </h3>
          <div className="flex-1 bg-[#0b1120] border border-slate-800 rounded-xl relative flex items-center justify-center overflow-hidden">
            {/* Mock map visualization using CSS */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            {demoMode && (
              <>
                <div className="absolute top-[40%] left-[30%] w-3 h-3 bg-red-500 rounded-full animate-ping shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                <div className="absolute top-[40%] left-[30%] w-3 h-3 bg-red-500 rounded-full"></div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path d="M 30% 40% Q 50% 10% 70% 30%" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                </svg>
              </>
            )}
            {!demoMode && <div className="text-slate-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2"><Activity className="w-4 h-4" /> Monitoring Network...</div>}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-700 h-[400px] flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Recent Incidents
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {demoMode && (
              <div className="bg-red-950/30 border border-red-500/30 p-3 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded">High Risk</span>
                  <span className="text-[9px] font-mono text-slate-500">Just Now</span>
                </div>
                <p className="text-xs text-slate-300 font-bold">Romance Scam Detected</p>
                <p className="text-[10px] text-slate-400 mt-1">EDI Spike + Financial Request intercepted.</p>
              </div>
            )}
            <div className="bg-[#0b1120] border border-slate-800 p-3 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Warning</span>
                <span className="text-[9px] font-mono text-slate-500">2h ago</span>
              </div>
              <p className="text-xs text-slate-300 font-bold">Deepfake Audio Match</p>
              <p className="text-[10px] text-slate-400 mt-1">Known scammer voiceprint matched in call.</p>
            </div>
            <div className="bg-[#0b1120] border border-slate-800 p-3 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Info</span>
                <span className="text-[9px] font-mono text-slate-500">5h ago</span>
              </div>
              <p className="text-xs text-slate-300 font-bold">System DB Update</p>
              <p className="text-[10px] text-slate-400 mt-1">Added 42k new known scam vectors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
