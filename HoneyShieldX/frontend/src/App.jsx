import React, { useState } from 'react';
import { Shield, BrainCircuit, ScanLine, Activity, AlertTriangle, ShieldAlert, LayoutDashboard, User, Globe, LogOut } from 'lucide-react';
import IdentityRiskAnalyzer from './components/IdentityRiskAnalyzer';
import ReportsDashboard from './components/ReportsDashboard';
import EDIEngine from './components/EDIEngine';
import NudgeSystem from './components/NudgeSystem';
import Login from './components/Login';
import Register from './components/Register';
import MainDashboard from './components/MainDashboard';
import UserProfile from './components/UserProfile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' or 'register'
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [demoMode, setDemoMode] = useState(false);
  const [language, setLanguage] = useState('en');

  // Basic mock translation dictionary
  const t = {
    en: {
      title: "HoneyShield X",
      subtitle: "AI Scam Detection System",
      runScan: "Run Full AI Scan",
      simActive: "SIMULATION ACTIVE",
      dashboard: "Dashboard",
      identity: "Identity Risk",
      reports: "Intelligence",
      edi: "EDI Engine",
      defense: "Active Defense",
      profile: "Profile",
      logout: "Logout"
    },
    hi: {
      title: "हनीशील्ड एक्स",
      subtitle: "एआई स्कैम डिटेक्शन सिस्टम",
      runScan: "पूर्ण एआई स्कैन चलाएं",
      simActive: "सिमुलेशन सक्रिय",
      dashboard: "डैशबोर्ड",
      identity: "पहचान जोखिम",
      reports: "रिपोर्ट",
      edi: "ईडीआई इंजन",
      defense: "सक्रिय रक्षा",
      profile: "प्रोफ़ाइल",
      logout: "लॉग आउट"
    },
    kn: {
      title: "ಹನಿಶೀಲ್ಡ್ ಎಕ್ಸ್",
      subtitle: "ಎಐ ಸ್ಕ್ಯಾಮ್ ಡಿಟೆಕ್ಷನ್ ಸಿಸ್ಟಮ್",
      runScan: "ಪೂರ್ಣ ಎಐ ಸ್ಕ್ಯಾನ್ ರನ್ ಮಾಡಿ",
      simActive: "ಸಿಮ್ಯುಲೇಶನ್ ಸಕ್ರಿಯವಾಗಿದೆ",
      dashboard: "ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      identity: "ಗುರುತಿನ ಅಪಾಯ",
      reports: "ವರದಿಗಳು",
      edi: "ಇಡಿಐ ಎಂಜಿನ್",
      defense: "ಸಕ್ರಿಯ ರಕ್ಷಣೆ",
      profile: "ಪ್ರೊಫೈಲ್",
      logout: "ಲಾಗ್ ಔಟ್"
    }
  };

  const l = t[language];

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
    { id: 'reports', label: l.reports, icon: FileTextIcon },
    { id: 'edi', label: l.edi, icon: BrainCircuit },
    { id: 'nudge', label: l.defense, icon: ShieldAlert },
    { id: 'profile', label: l.profile, icon: User }
  ];

  function FileTextIcon(props) {
    return <Activity {...props} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 pb-20">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        {demoMode && <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-red-900/20 blur-[150px] animate-pulse"></div>}
      </div>

      <nav className="glass-panel sticky top-0 z-50 border-b border-slate-800/80 bg-[#020617]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded bg-slate-900 border ${demoMode ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]'}`}>
              <Shield className={`w-6 h-6 ${demoMode ? 'text-red-500' : 'text-cyan-400'}`} />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-widest uppercase text-white leading-none">{l.title}</h1>
              <p className="text-[9px] text-cyan-500 font-mono tracking-widest uppercase mt-1">{l.subtitle}</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 neon-text-cyan' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer flex items-center gap-2 bg-[#0b1120] border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
              <Globe className="w-4 h-4 text-cyan-400" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-slate-300 font-bold outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            <button 
              onClick={triggerSimulation}
              className={`hidden md:flex px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all items-center gap-2 ${demoMode ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'}`}
            >
              <AlertTriangle className="w-4 h-4" />
              {demoMode ? l.simActive : l.runScan}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-8 relative z-10">
        {activeTab === 'dashboard' && <MainDashboard demoMode={demoMode} />}
        {activeTab === 'identity' && <IdentityRiskAnalyzer demoMode={demoMode} />}
        {activeTab === 'reports' && <ReportsDashboard demoMode={demoMode} />}
        {activeTab === 'edi' && <EDIEngine demoMode={demoMode} />}
        {activeTab === 'nudge' && <NudgeSystem demoMode={demoMode} />}
        {activeTab === 'profile' && <UserProfile onLogout={() => setIsLoggedIn(false)} />}
      </main>
    </div>
  );
}
