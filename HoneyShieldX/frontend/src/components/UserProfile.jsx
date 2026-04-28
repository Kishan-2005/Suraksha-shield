import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Key, Bell, CreditCard, LogOut, Settings } from 'lucide-react';

export default function UserProfile({ onLogout }) {
  const [user, setUser] = useState({ name: 'Agent 007', email: 'agent@honeyshield.io' });

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
  };

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
            <h3 className="text-lg font-bold text-white">{user.name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-1 mb-4">{user.email}</p>
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              Verified Operative
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
            <div onClick={handleLogout} className="p-4 flex items-center gap-3 hover:bg-red-900/20 cursor-pointer transition-colors text-red-400">
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
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Full Name</label>
                  <input type="text" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-2 px-4 text-sm text-slate-200" defaultValue={user.name} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Clearance Level</label>
                  <input type="text" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-2 px-4 text-sm text-slate-500 cursor-not-allowed" disabled defaultValue="Level 4" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Email Address</label>
                <input type="email" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-2 px-4 text-sm text-slate-500 cursor-not-allowed" disabled defaultValue={user.email} />
              </div>
              <button type="button" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg text-xs uppercase tracking-widest font-bold transition-colors border border-slate-600">Save Changes</button>
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
