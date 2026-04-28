import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# ==========================================
# NEW COMPONENT: Login
# ==========================================
create_file("frontend/src/components/Login.jsx", """
import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

export default function Login({ onLogin, onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Operator ID / Email</label>
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
""")

# ==========================================
# NEW COMPONENT: Register
# ==========================================
create_file("frontend/src/components/Register.jsx", """
import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowLeft, User, Fingerprint } from 'lucide-react';

export default function Register({ onRegister, onNavigateLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none transition-colors" placeholder="John Doe" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="email" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none transition-colors" placeholder="john@example.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="password" required className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white py-3 rounded-lg uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)] flex justify-center items-center gap-2 mt-6">
            <Shield className="w-4 h-4" /> Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
""")

# ==========================================
# NEW COMPONENT: UserProfile
# ==========================================
create_file("frontend/src/components/UserProfile.jsx", """
import React from 'react';
import { User, Mail, Shield, Key, Bell, CreditCard, LogOut, Settings } from 'lucide-react';

export default function UserProfile({ onLogout }) {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" /> Operative Profile
        </h2>
        <p className="text-xs text-slate-400 font-mono tracking-widest mt-1">Identity & Security Settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-900/30 to-transparent"></div>
            <div className="relative w-24 h-24 mx-auto bg-slate-800 rounded-full border-4 border-[#020617] shadow-[0_0_0_2px_rgba(6,182,212,0.5)] flex items-center justify-center mb-4 mt-4">
              <User className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Agent 007</h3>
            <p className="text-xs text-slate-400 font-mono mt-1 mb-4">agent@honeyshield.io</p>
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              System Admin
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3 hover:bg-slate-800/50 cursor-pointer transition-colors text-cyan-400">
              <Settings className="w-4 h-4" /> <span className="text-sm font-bold uppercase tracking-wider">Account Settings</span>
            </div>
            <div className="p-4 border-b border-slate-800 flex items-center gap-3 hover:bg-slate-800/50 cursor-pointer transition-colors text-slate-400">
              <Shield className="w-4 h-4" /> <span className="text-sm font-bold uppercase tracking-wider">Security</span>
            </div>
            <div className="p-4 border-b border-slate-800 flex items-center gap-3 hover:bg-slate-800/50 cursor-pointer transition-colors text-slate-400">
              <Bell className="w-4 h-4" /> <span className="text-sm font-bold uppercase tracking-wider">Notifications</span>
            </div>
            <div onClick={onLogout} className="p-4 flex items-center gap-3 hover:bg-red-900/20 cursor-pointer transition-colors text-red-400">
              <LogOut className="w-4 h-4" /> <span className="text-sm font-bold uppercase tracking-wider">Terminate Session</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Personal Information</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">First Name</label>
                  <input type="text" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-2 px-4 text-sm text-slate-200" defaultValue="James" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Last Name</label>
                  <input type="text" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-2 px-4 text-sm text-slate-200" defaultValue="Bond" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Email Address</label>
                <input type="email" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-2 px-4 text-sm text-slate-500 cursor-not-allowed" disabled defaultValue="agent@honeyshield.io" />
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg text-xs uppercase tracking-widest font-bold transition-colors border border-slate-600">Save Changes</button>
            </form>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Platform Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0b1120] border border-slate-800 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-slate-200">2-Factor Authentication</p>
                  <p className="text-xs text-slate-500 mt-1">Requires code from authenticator app</p>
                </div>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0b1120] border border-slate-800 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-slate-200">Desktop Notifications</p>
                  <p className="text-xs text-slate-500 mt-1">Alert on High Risk threats</p>
                </div>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
""")

# ==========================================
# NEW COMPONENT: MainDashboard
# ==========================================
create_file("frontend/src/components/MainDashboard.jsx", """
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
""")

print("New components built.")
