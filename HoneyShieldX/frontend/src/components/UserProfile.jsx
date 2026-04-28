import React from 'react';
import { User, Shield, ShieldCheck, Mail, Key, LogOut } from 'lucide-react';

export default function UserProfile({ onLogout, language }) {
  const user = JSON.parse(localStorage.getItem('hs_user') || '{}');
  
  const t = {
    en: {
      profile: "Operative Profile",
      details: "Session & Clearance Details",
      clearance: "CLEARANCE",
      status: "STATUS",
      active: "ACTIVE",
      email: "Email Address",
      pass: "Password",
      hidden: "••••••••",
      session: "Active Session",
      sessionActive: "Session Active",
      logout: "Terminate Session"
    },
    hi: {
      profile: "ऑपरेटिव प्रोफ़ाइल",
      details: "सत्र और क्लीयरेंस विवरण",
      clearance: "क्लीयरेंस",
      status: "स्थिति",
      active: "सक्रिय",
      email: "ईमेल पता",
      pass: "पासवर्ड",
      hidden: "••••••••",
      session: "सक्रिय सत्र",
      sessionActive: "सत्र सक्रिय",
      logout: "सत्र समाप्त करें"
    },
    kn: {
      profile: "ಆಪರೇಟಿವ್ ಪ್ರೊಫೈಲ್",
      details: "ಸೆಷನ್ ಮತ್ತು ಕ್ಲಿಯರೆನ್ಸ್ ವಿವರಗಳು",
      clearance: "ಕ್ಲಿಯರೆನ್ಸ್",
      status: "ಸ್ಥಿತಿ",
      active: "ಸಕ್ರಿಯ",
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      pass: "ಪಾಸ್ವರ್ಡ್",
      hidden: "••••••••",
      session: "ಸಕ್ರಿಯ ಸೆಷನ್",
      sessionActive: "ಸೆಷನ್ ಸಕ್ರಿಯ",
      logout: "ಸೆಷನ್ ಮುಕ್ತಾಯಗೊಳಿಸಿ"
    }
  };

  const l = t[language || 'en'];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-cyan-900/30 border-2 border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <User className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-widest text-white">{l.profile}</h2>
        <p className="text-xs text-slate-400 font-mono tracking-widest mt-2 uppercase">{l.details}</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-700 space-y-6">
        <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-800">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{l.clearance}</p>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" /> Level 3
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{l.status}</p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> {l.active}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> {l.email}</label>
            <div className="bg-[#0b1120] border border-slate-700 px-4 py-3 rounded-lg text-slate-300 font-mono text-sm">{user.email || 'agent@honeyshield.x'}</div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2"><Key className="w-4 h-4" /> {l.pass}</label>
            <div className="bg-[#0b1120] border border-slate-700 px-4 py-3 rounded-lg text-slate-300 font-mono text-sm">{l.hidden}</div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
          <div className="text-xs text-slate-500 font-mono">{l.session}: <span className="text-emerald-400">{l.sessionActive}</span></div>
          <button onClick={onLogout} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(220,38,38,0.3)]">
            <LogOut className="w-4 h-4" /> {l.logout}
          </button>
        </div>
      </div>
    </div>
  );
}
