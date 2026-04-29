import React, { useState, useEffect } from 'react';
import { Shield, BrainCircuit, ScanLine, Activity, AlertTriangle, ShieldAlert, LayoutDashboard, User, Globe, LogOut, Phone, FileText, Menu, X } from 'lucide-react';
import IdentityRiskAnalyzer from './components/IdentityRiskAnalyzer';
import ReportsDashboard from './components/ReportsDashboard';
import EDIEngine from './components/EDIEngine';
import NudgeSystem from './components/NudgeSystem';
import Login from './components/Login';
import Register from './components/Register';
import MainDashboard from './components/MainDashboard';
import UserProfile from './components/UserProfile';
import NumberRiskAnalyzer from './components/NumberRiskAnalyzer';
import OfficerLogin from './components/OfficerLogin';
import OfficerDashboard from './components/OfficerDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState('login'); 
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [demoMode, setDemoMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    en: {
      title: "HoneyShield X",
      subtitle: "AI Scam Detection System",
      runScan: "Run Global AI Scan",
      simActive: "SIMULATION ACTIVE",
      dashboard: "Command Center",
      identity: "Identity Risk",
      numberIntel: "Number Intel",
      reports: "Intelligence",
      edi: "EDI Engine",
      defense: "Active Defense",
      profile: "Operative Profile",
      logout: "Terminate Session"
    },
    hi: {
      title: "हनीशील्ड एक्स",
      subtitle: "एआई स्कैम डिटेक्शन सिस्टम",
      runScan: "ग्लोबल एआई स्कैन चलाएं",
      simActive: "सिमुलेशन सक्रिय",
      dashboard: "कमांड सेंटर",
      identity: "पहचान जोखिम",
      numberIntel: "नंबर इंटेल",
      reports: "रिपोर्ट",
      edi: "ईडीआई इंजन",
      defense: "सक्रिय रक्षा",
      profile: "प्रोफ़ाइल",
      logout: "लॉग आउट"
    },
    kn: {
      title: "ಹನಿಶೀಲ್ಡ್ ಎಕ್ಸ್",
      subtitle: "ಎಐ ಸ್ಕ್ಯಾಮ್ ಡಿಟೆಕ್ಷನ್ ಸಿಸ್ಟಮ್",
      runScan: "ಗ್ಲೋಬಲ್ ಎಐ ಸ್ಕ್ಯಾನ್ ರನ್ ಮಾಡಿ",
      simActive: "ಸಿಮ್ಯುಲೇಶನ್ ಸಕ್ರಿಯವಾಗಿದೆ",
      dashboard: "ಕಮಾಂಡ್ ಸೆಂಟರ್",
      identity: "ಗುರುತಿನ ಅಪಾಯ",
      numberIntel: "ನಂಬರ್ ಇಂಟೆಲ್",
      reports: "ವರದಿಗಳು",
      edi: "ಇಡಿಐ ಎಂಜಿನ್",
      defense: "ಸಕ್ರಿಯ ರಕ್ಷಣೆ",
      profile: "ಪ್ರೊಫೈಲ್",
      logout: "ಲಾಗ್ ಔಟ್"
    }
  };

  const l = t[language];

  const path = window.location.pathname;
  if (path === '/officer-login') {
    return <OfficerLogin onLogin={() => window.location.href = '/officer-dashboard'} />;
  }
  if (path === '/officer-dashboard') {
    return <OfficerDashboard />;
  }

  if (!isLoggedIn) {
    if (authScreen === 'login') {
      return <Login onLogin={() => setIsLoggedIn(true)} onNavigateRegister={() => setAuthScreen('register')} />;
    } else {
      return <Register onRegister={() => { setIsLoggedIn(true); setAuthScreen('login'); }} onNavigateLogin={() => setAuthScreen('login')} />;
    }
  }

  const triggerSimulation = () => {
    setDemoMode(true);
  };

  const tabs = [
    { id: 'dashboard', label: l.dashboard, icon: LayoutDashboard },
    { id: 'identity', label: l.identity, icon: ScanLine },
    { id: 'number-intel', label: l.numberIntel, icon: Phone },
    { id: 'reports', label: l.reports, icon: FileText },
    { id: 'edi', label: l.edi, icon: BrainCircuit },
    { id: 'nudge', label: l.defense, icon: ShieldAlert },
    { id: 'profile', label: l.profile, icon: User }
  ];

  const activeTabDetails = tabs.find(t => t.id === activeTab);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        {demoMode && <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-red-900/10 blur-[150px] animate-pulse"></div>}
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 glass-panel border-r border-slate-800/80 z-20 h-full">
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-slate-900 border ${demoMode ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)]'}`}>
            <Shield className={`w-7 h-7 ${demoMode ? 'text-red-500' : 'text-cyan-400'}`} />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-widest uppercase text-white leading-none whitespace-nowrap">{l.title}</h1>
            <p className="text-[9px] text-cyan-500 font-mono tracking-widest uppercase mt-1.5">{l.subtitle}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Core Modules</p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'neon-text-cyan' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/80">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/30">
            <LogOut className="w-5 h-5" />
            {l.logout}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-lg font-black uppercase tracking-widest text-white flex items-center gap-2">
                {activeTabDetails && <activeTabDetails.icon className="w-5 h-5 text-cyan-500" />}
                {activeTabDetails?.label}
              </h2>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">Secure Terminal / {activeTab}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group cursor-pointer flex items-center gap-2 bg-[#0b1120] border border-slate-700 px-4 py-2 rounded-xl text-xs shadow-inner">
              <Globe className="w-4 h-4 text-cyan-400" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-slate-300 font-bold outline-none cursor-pointer appearance-none pr-6 tracking-wider uppercase"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>

            <button 
              onClick={triggerSimulation}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center gap-2 ${demoMode ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'}`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">{demoMode ? l.simActive : l.runScan}</span>
              <span className="sm:hidden">{demoMode ? 'ACTIVE' : 'SCAN'}</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto pb-20">
            {activeTab === 'dashboard' && <MainDashboard demoMode={demoMode} language={language} />}
            {activeTab === 'identity' && <IdentityRiskAnalyzer demoMode={demoMode} language={language} />}
            {activeTab === 'number-intel' && <NumberRiskAnalyzer demoMode={demoMode} language={language} />}
            {activeTab === 'reports' && <ReportsDashboard demoMode={demoMode} language={language} />}
            {activeTab === 'edi' && <EDIEngine demoMode={demoMode} language={language} />}
            {activeTab === 'nudge' && <NudgeSystem demoMode={demoMode} language={language} />}
            {activeTab === 'profile' && <UserProfile onLogout={() => setIsLoggedIn(false)} language={language} />}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-72 glass-panel border-r border-slate-700 p-6 flex flex-col animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h1 className="font-black tracking-widest uppercase text-white">{l.title}</h1>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400'}`}
                  >
                    <Icon className="w-5 h-5" /> {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
