import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertTriangle, Users, TrendingUp, BarChart2, Globe } from 'lucide-react';
import GlobalThreatMap from './GlobalThreatMap';

import { useGlobalState } from '../context/GlobalStateContext';

export default function MainDashboard({ demoMode, language }) {
  const { sharedScamsPrevented, setSharedScamsPrevented, sharedActiveThreats, setSharedActiveThreats } = useGlobalState();
  const [statsData, setStatsData] = useState({ incidents: [] });
  const [mapThreats, setMapThreats] = useState([]);

  const t = {
    en: {
      title: "Command Center", subtitle: "Global Telemetry & System Status", scams: "Scams Prevented", threats: "Active Threats", profiles: "Profiles Scanned", uptime: "System Uptime", map: "Global Threat Map", monitoring: "Monitoring Network...", incidents: "Recent Incidents", highRisk: "High Risk", warning: "Warning", info: "Info", justNow: "Just Now", romanceScam: "Romance Scam Detected", romanceDesc: "EDI Spike + Financial Request intercepted.", deepfake: "Deepfake Audio Match", deepfakeDesc: "Known scammer voiceprint matched in call.", dbUpdate: "System DB Update", dbDesc: "Added 42k new known scam vectors."
    },
    hi: {
      title: "कमांड सेंटर", subtitle: "ग्लोबल टेलीमेट्री और सिस्टम स्थिति", scams: "स्कैम रोके गए", threats: "सक्रिय खतरे", profiles: "प्रोफ़ाइल स्कैन किए गए", uptime: "सिस्टम अपटाइम", map: "ग्लोबल थ्रेट मैप", monitoring: "नेटवर्क मॉनिटर कर रहा है...", incidents: "हाल की घटनाएँ", highRisk: "उच्च जोखिम", warning: "चेतावनी", info: "जानकारी", justNow: "अभी-अभी", romanceScam: "रोमांस स्कैम का पता चला", romanceDesc: "ईडीआई स्पाइक + वित्तीय अनुरोध इंटरसेप्ट किया गया।", deepfake: "डीपफेक ऑडियो मैच", deepfakeDesc: "कॉल में ज्ञात स्कैमर वॉयसप्रिंट मैच हुआ।", dbUpdate: "सिस्टम डीबी अपडेट", dbDesc: "42k नए ज्ञात स्कैम वैक्टर जोड़े गए।"
    },
    kn: {
      title: "ಕಮಾಂಡ್ ಸೆಂಟರ್", subtitle: "ಗ್ಲೋಬಲ್ ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು ಸಿಸ್ಟಮ್ ಸ್ಥಿತಿ", scams: "ತಡೆಗಟ್ಟಿದ ಸ್ಕ್ಯಾಮ್‌ಗಳು", threats: "ಸಕ್ರಿಯ ಬೆದರಿಕೆಗಳು", profiles: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಪ್ರೊಫೈಲ್‌ಗಳು", uptime: "ಸಿಸ್ಟಮ್ ಅಪ್‌ಟೈಮ್", map: "ಗ್ಲೋಬಲ್ ಥ್ರೆಟ್ ಮ್ಯಾಪ್", monitoring: "ನೆಟ್‌ವರ್ಕ್ ಮಾನಿಟರ್ ಆಗುತ್ತಿದೆ...", incidents: "ಇತ್ತೀಚಿನ ಘಟನೆಗಳು", highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ", warning: "ಎಚ್ಚರಿಕೆ", info: "ಮಾಹಿತಿ", justNow: "ಈಗಷ್ಟೇ", romanceScam: "ರೊಮ್ಯಾನ್ಸ್ ಸ್ಕ್ಯಾಮ್ ಪತ್ತೆಯಾಗಿದೆ", romanceDesc: "ಇಡಿಐ ಸ್ಪೈಕ್ + ಆರ್ಥಿಕ ವಿನಂತಿ ತಡೆಹಿಡಿಯಲಾಗಿದೆ.", deepfake: "ಡೀಪ್‌ಫೇಕ್ ಆಡಿಯೋ ಮ್ಯಾಚ್", deepfakeDesc: "ಕಾಲಿನಲ್ಲಿ ಪರಿಚಿತ ಸ್ಕ್ಯಾಮರ್ ವಾಯ್ಸ್‌ಪ್ರಿಂಟ್ ಮ್ಯಾಚ್ ಆಗಿದೆ.", dbUpdate: "ಸಿಸ್ಟಮ್ ಡಿಬಿ ಅಪ್‌ಡೇಟ್", dbDesc: "42k ಹೊಸ ಸ್ಕ್ಯಾಮ್ ವೆಕ್ಟರ್‌ಗಳನ್ನು ಸೇರಿಸಲಾಗಿದೆ."
    }
  };

  const l = t[language || 'en'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/stats');
        if (res.ok) {
          const data = await res.json();
          setSharedScamsPrevented(data.scams_prevented);
          setSharedActiveThreats(data.active_threats);
          setStatsData({
            incidents: data.incidents
          });
        }

        const mapRes = await fetch('http://127.0.0.1:5000/api/dashboard/threat-map');
        if (mapRes.ok) {
          const mapData = await mapRes.json();
          setMapThreats(mapData.map(t => ({
            id: t.id,
            lat: t.latitude,
            lng: t.longitude,
            type: t.threat_type
          })));
        }
      } catch (err) {
        console.error("Backend not running. Using fallback UI.", err);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: l.scams, value: sharedScamsPrevented.toLocaleString(), change: "+12%", icon: ShieldCheck, color: "emerald" },
    { label: l.threats, value: sharedActiveThreats.toString(), change: sharedActiveThreats > 0 ? `+${sharedActiveThreats}` : "0", icon: AlertTriangle, color: "red" },
    { label: l.profiles, value: "84,592", change: "+4.2%", icon: Users, color: "blue" },
    { label: l.uptime, value: "99.9%", change: "Stable", icon: Activity, color: "cyan" }
  ];

  const activeThreats = mapThreats.length > 0 ? mapThreats : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-cyan-400" /> {l.title}
        </h2>
        <p className="text-xs text-slate-400 font-mono tracking-widest mt-1 uppercase">{l.subtitle}</p>
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
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-700 h-[550px] flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> {l.map}
          </h3>
          <div className="flex-1 rounded-xl relative overflow-hidden">
            <GlobalThreatMap threats={activeThreats} />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-700 h-[400px] flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> {l.incidents}
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {statsData.incidents.map((inc, i) => (
              <div key={i} className="bg-red-950/30 border border-red-500/30 p-3 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{l.highRisk}</span>
                  <span className="text-[9px] font-mono text-slate-500">{inc.time}</span>
                </div>
                <p className="text-xs text-slate-300 font-bold">{inc.stage}</p>
                <p className="text-[10px] text-slate-400 mt-1">{inc.desc}</p>
              </div>
            ))}

            <div className="bg-[#0b1120] border border-slate-800 p-3 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{l.info}</span>
                <span className="text-[9px] font-mono text-slate-500">5h ago</span>
              </div>
              <p className="text-xs text-slate-300 font-bold">{l.dbUpdate}</p>
              <p className="text-[10px] text-slate-400 mt-1">{l.dbDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
