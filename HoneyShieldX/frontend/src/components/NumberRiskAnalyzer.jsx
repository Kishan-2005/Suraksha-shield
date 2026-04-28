import React, { useState } from 'react';
import { Phone, Search, AlertTriangle, ShieldCheck, ShieldAlert, Globe, MapPin, Radio, Activity, Cpu, CheckCircle, Database } from 'lucide-react';

export default function NumberRiskAnalyzer({ demoMode, language }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const t = {
    en: {
      title: "Manual Phone Number Intelligence",
      subtitle: "Deep Scan Telemetry & Fraud Classification",
      inputLabel: "Target MSISDN / Phone Number",
      placeholder: "+1 (555) 000-0000",
      analyze: "Analyze",
      scanning: "Scanning...",
      demo: "Demo",
      safe: "Safe",
      spam: "Spam",
      scam: "Scam",
      interrogating: "INTERROGATING GLOBAL TELECOM REGISTRIES",
      step1: "Connecting to signaling network...",
      step2: "Resolving carrier routing data...",
      step3: "Querying international spam honeypots...",
      step4: "Calculating reputation hash...",
      origin: "Origin Country",
      carrier: "Carrier Network",
      type: "Number Type",
      xai: "Explainable AI Reasoning",
      actionRequired: "Action Required",
      highlyLikely: "This number is highly likely to be a scam or fraud.",
      ignore: "Ignore",
      blockReport: "Block & Report"
    },
    hi: {
      title: "मैनुअल फ़ोन नंबर इंटेलिजेंस",
      subtitle: "डीप स्कैन टेलीमेट्री और धोखाधड़ी वर्गीकरण",
      inputLabel: "लक्ष्य MSISDN / फ़ोन नंबर",
      placeholder: "+91 00000 00000",
      analyze: "विश्लेषण करें",
      scanning: "स्कैन कर रहा है...",
      demo: "डेमो",
      safe: "सुरक्षित",
      spam: "स्पैम",
      scam: "स्कैम",
      interrogating: "वैश्विक दूरसंचार रजिस्ट्रियों से पूछताछ",
      step1: "सिग्नलिंग नेटवर्क से कनेक्ट हो रहा है...",
      step2: "कैरियर रूटिंग डेटा हल कर रहा है...",
      step3: "अंतर्राष्ट्रीय स्पैम हनीपॉट की क्वेरी कर रहा है...",
      step4: "रेप्यूटेशन हैश की गणना कर रहा है...",
      origin: "मूल देश",
      carrier: "कैरियर नेटवर्क",
      type: "नंबर का प्रकार",
      xai: "समझाने योग्य AI तर्क",
      actionRequired: "कार्रवाई आवश्यक",
      highlyLikely: "यह नंबर घोटाले या धोखाधड़ी होने की अत्यधिक संभावना है।",
      ignore: "अनदेखा करें",
      blockReport: "ब्लॉक और रिपोर्ट करें"
    },
    kn: {
      title: "ಮ್ಯಾನುಯಲ್ ಫೋನ್ ನಂಬರ್ ಇಂಟೆಲಿಜೆನ್ಸ್",
      subtitle: "ಡೀಪ್ ಸ್ಕ್ಯಾನ್ ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು ವಂಚನೆ ವರ್ಗೀಕರಣ",
      inputLabel: "ಗುರಿ MSISDN / ಫೋನ್ ಸಂಖ್ಯೆ",
      placeholder: "+91 00000 00000",
      analyze: "ವಿಶ್ಲೇಷಿಸಿ",
      scanning: "ಸ್ಕ್ಯಾನ್ ಆಗುತ್ತಿದೆ...",
      demo: "ಡೆಮೊ",
      safe: "ಸುರಕ್ಷಿತ",
      spam: "ಸ್ಪ್ಯಾಮ್",
      scam: "ಸ್ಕ್ಯಾಮ್",
      interrogating: "ಜಾಗತಿಕ ಟೆಲಿಕಾಂ ರಿಜಿಸ್ಟ್ರಿಗಳನ್ನು ಪ್ರಶ್ನಿಸಲಾಗುತ್ತಿದೆ",
      step1: "ಸಿಗ್ನಲಿಂಗ್ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...",
      step2: "ಕ್ಯಾರಿಯರ್ ರೂಟಿಂಗ್ ಡೇಟಾವನ್ನು ಪರಿಹರಿಸಲಾಗುತ್ತಿದೆ...",
      step3: "ಅಂತರರಾಷ್ಟ್ರೀಯ ಸ್ಪ್ಯಾಮ್ ಹನಿಪಾಟ್‌ಗಳನ್ನು ಪ್ರಶ್ನಿಸಲಾಗುತ್ತಿದೆ...",
      step4: "ಖ್ಯಾತಿಯ ಹ್ಯಾಶ್ ಅನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...",
      origin: "ಮೂಲ ದೇಶ",
      carrier: "ಕ್ಯಾರಿಯರ್ ನೆಟ್‌ವರ್ಕ್",
      type: "ಸಂಖ್ಯೆಯ ಪ್ರಕಾರ",
      xai: "ವಿವರಿಸಬಹುದಾದ AI ತಾರ್ಕಿಕತೆ",
      actionRequired: "ಕ್ರಿಯೆ ಅಗತ್ಯವಿದೆ",
      highlyLikely: "ಈ ಸಂಖ್ಯೆಯು ಹಗರಣ ಅಥವಾ ವಂಚನೆಯಾಗುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು.",
      ignore: "ನಿರ್ಲಕ್ಷಿಸಿ",
      blockReport: "ಬ್ಲಾಕ್ ಮತ್ತು ವರದಿ ಮಾಡಿ"
    }
  };

  const l = t[language || 'en'];

  const analyzeNumber = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setAnalyzing(true);
    setResults(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber, language: language || 'en' })
      });
      const data = await res.json();
      
      // Artificial delay for UX
      setTimeout(() => {
        setAnalyzing(false);
        setResults(data);
      }, 1500);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setAnalyzing(false);
        setResults({ risk_score: 50, risk_level: "Unknown", classification: "Error", number_reputation: "API Unreachable", country: "Unknown", carrier: "Unknown", number_type: "Unknown", ai_explanation: "Backend API is currently offline. Start the FastAPI server." });
      }, 1000);
    }
  };

  const getRiskColor = (score) => score >= 70 ? 'red' : score >= 30 ? 'amber' : 'emerald';
  const getRiskGlow = (score) => score >= 70 ? 'shadow-[0_0_15px_rgba(220,38,38,0.5)] border-red-500/50' : score >= 30 ? 'shadow-[0_0_15px_rgba(245,158,11,0.5)] border-amber-500/50' : 'shadow-[0_0_15px_rgba(16,185,129,0.5)] border-emerald-500/50';

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center justify-center gap-3"><Phone className="w-6 h-6 text-cyan-400" /> {l.title}</h2>
        <p className="text-xs text-slate-400 font-mono tracking-widest mt-2 uppercase">{l.subtitle}</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/50 max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/20 rounded-full blur-[50px] pointer-events-none"></div>
        <form onSubmit={analyzeNumber} className="relative z-10">
          <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">{l.inputLabel}</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="tel" required className="w-full bg-[#0b1120] border-2 border-slate-700 hover:border-slate-600 rounded-xl py-4 pl-12 pr-4 text-lg font-mono text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors" placeholder={l.placeholder} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} disabled={analyzing} />
            </div>
            <button type="submit" disabled={!phoneNumber || analyzing} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl uppercase tracking-widest text-sm font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 flex items-center justify-center gap-2">
              {analyzing ? <Scan className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {analyzing ? l.scanning : l.analyze}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs text-slate-500 font-mono">
            <span>{l.demo}: </span>
            <button type="button" onClick={() => setPhoneNumber('+91 9876543210')} className="hover:text-cyan-400 underline decoration-slate-700">{l.safe}</button> | 
            <button type="button" onClick={() => setPhoneNumber('+91 9123456789')} className="hover:text-cyan-400 underline decoration-slate-700">{l.spam}</button> | 
            <button type="button" onClick={() => setPhoneNumber('+91 9999999999')} className="hover:text-cyan-400 underline decoration-slate-700">{l.scam}</button>
          </div>
        </form>
      </div>

      {analyzing && (
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          <Activity className="w-10 h-10 text-cyan-400 mb-4 animate-pulse" />
          <h3 className="text-cyan-400 font-mono text-sm mb-6">{l.interrogating}</h3>
          <div className="space-y-3 text-left w-full max-w-xs mx-auto">
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-500" /> {l.step1}</div>
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-500" /> {l.step2}</div>
            <div className="flex items-center gap-3 text-slate-400"><Scan className="w-4 h-4 text-cyan-500 animate-spin" /> {l.step3}</div>
            <div className="flex items-center gap-3 text-slate-500"><Database className="w-4 h-4" /> {l.step4}</div>
          </div>
        </div>
      )}

      {results && !analyzing && (() => {
        const color = getRiskColor(results.risk_score);
        const glow = getRiskGlow(results.risk_score);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className={`glass-panel p-8 rounded-3xl border-2 ${glow} relative overflow-hidden flex flex-col items-center justify-center text-center`}>
              <div className={`absolute top-0 right-0 w-full h-32 bg-${color}-600/10 rounded-full blur-[80px]`}></div>
              <h3 className={`font-black uppercase tracking-widest flex items-center gap-2 mb-6 text-${color}-500`}>
                {color === 'emerald' ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                {results.classification}
              </h3>
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path fill="none" stroke="#1e293b" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path fill="none" stroke={color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#dc2626'} strokeWidth="3" strokeDasharray={`${results.risk_score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ filter: `drop-shadow(0 0 8px ${color === 'emerald' ? 'rgba(16,185,129,0.8)' : color === 'amber' ? 'rgba(245,158,11,0.8)' : 'rgba(220,38,38,0.8)'})` }} />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-5xl font-black text-${color}-500`}>{results.risk_score}</span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold mt-1 bg-${color}-500/20 text-${color}-400 px-2 py-0.5 rounded`}>{results.risk_level}</span>
                </div>
              </div>
              <div className={`w-full py-3 px-4 rounded-xl font-bold text-sm bg-${color}-500/10 border border-${color}-500/30 text-${color}-400`}>{results.number_reputation}</div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-slate-700 bg-slate-900/50">
                  <Globe className="w-5 h-5 text-cyan-400 mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{l.origin}</p>
                  <p className="text-sm text-slate-200 font-bold mt-1">{results.country}</p>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-slate-700 bg-slate-900/50">
                  <Radio className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{l.carrier}</p>
                  <p className="text-sm text-slate-200 font-bold mt-1">{results.carrier}</p>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-slate-700 bg-slate-900/50">
                  <MapPin className="w-5 h-5 text-fuchsia-400 mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{l.type}</p>
                  <p className="text-sm text-slate-200 font-bold mt-1">{results.number_type}</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" /> {l.xai}</h3>
                <div className="bg-[#0b1120] p-5 rounded-xl border border-slate-800"><p className="text-sm text-slate-300 leading-relaxed font-mono">"{results.ai_explanation}"</p></div>
              </div>

              {results.risk_score >= 70 && (
                <div className="glass-panel p-6 rounded-2xl border border-red-500/50 bg-red-950/20">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 text-red-400"><ShieldAlert className="w-8 h-8 shrink-0" /><div><h4 className="font-bold text-sm uppercase tracking-wider">{l.actionRequired}</h4><p className="text-xs text-red-400/80 mt-1">{l.highlyLikely}</p></div></div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs uppercase tracking-widest font-bold rounded-lg border border-slate-600 transition-colors">{l.ignore}</button>
                      <button className="flex-1 sm:flex-none px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-widest font-bold rounded-lg shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-colors">{l.blockReport}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
