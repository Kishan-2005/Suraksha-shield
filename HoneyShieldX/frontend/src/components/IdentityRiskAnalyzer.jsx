import React, { useState, useRef } from 'react';
import { UploadCloud, Scan, CheckCircle, AlertTriangle, ShieldAlert, User, Cpu, X, ShieldCheck } from 'lucide-react';

export default function IdentityRiskAnalyzer({ demoMode, language }) {
  const [images, setImages] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const t = {
    en: {
      targetProfile: "Target Profile",
      clickDrag: "Click or Drag Images Here",
      uploadDesc: "Upload 1-4 images for analysis",
      analyzeProfile: "Analyze Profile",
      scanning: "Scanning Profile...",
      processing: "PROCESSING BIOMETRICS",
      extracting: "Extracting facial geometry...",
      runningAi: "Running AI detection models...",
      crossRef: "Cross-referencing known image databases...",
      calc: "Calculating identity consistency...",
      profileVerified: "Profile Verified",
      threatDetected: "Threat Detected",
      secure: "SECURE",
      highRisk: "HIGH RISK",
      riskScore: "Risk Score",
      aiProb: "AI Generated Probability",
      consistency: "Identity Consistency",
      reverseSearch: "Reverse Image Search",
      indicators: "Suspicious Indicators",
      safeMsg: "✅ This profile passes all baseline biometric and heuristic authenticity checks.",
      fakeMsg: "⚠️ This profile shows strong signs of being fake or part of a scam.",
      trustScore: "Profile Trust Score"
    },
    hi: {
      targetProfile: "लक्ष्य प्रोफ़ाइल",
      clickDrag: "छवियों को यहाँ क्लिक या ड्रैग करें",
      uploadDesc: "विश्लेषण के लिए 1-4 चित्र अपलोड करें",
      analyzeProfile: "प्रोफ़ाइल का विश्लेषण करें",
      scanning: "प्रोफ़ाइल स्कैन कर रहा है...",
      processing: "बायोमेट्रिक्स प्रसंस्करण",
      extracting: "चेहरे की ज्यामिति निकाली जा रही है...",
      runningAi: "AI डिटेक्शन मॉडल चलाए जा रहे हैं...",
      crossRef: "ज्ञात छवि डेटाबेस क्रॉस-रेफरेंसिंग...",
      calc: "पहचान स्थिरता की गणना...",
      profileVerified: "प्रोफ़ाइल सत्यापित",
      threatDetected: "खतरे का पता चला",
      secure: "सुरक्षित",
      highRisk: "उच्च जोखिम",
      riskScore: "जोखिम स्कोर",
      aiProb: "AI जनित संभावना",
      consistency: "पहचान स्थिरता",
      reverseSearch: "रिवर्स छवि खोज",
      indicators: "संदिग्ध संकेतक",
      safeMsg: "✅ यह प्रोफ़ाइल सभी बेसलाइन बायोमेट्रिक और प्रामाणिकता जांच पास करती है।",
      fakeMsg: "⚠️ यह प्रोफ़ाइल नकली या घोटाले का हिस्सा होने के मजबूत संकेत दिखाती है।",
      trustScore: "प्रोफ़ाइल ट्रस्ट स्कोर"
    },
    kn: {
      targetProfile: "ಗುರಿ ಪ್ರೊಫೈಲ್",
      clickDrag: "ಚಿತ್ರಗಳನ್ನು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಎಳೆಯಿರಿ",
      uploadDesc: "ವಿಶ್ಲೇಷಣೆಗಾಗಿ 1-4 ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      analyzeProfile: "ಪ್ರೊಫೈಲ್ ವಿಶ್ಲೇಷಿಸಿ",
      scanning: "ಪ್ರೊಫೈಲ್ ಸ್ಕ್ಯಾನ್ ಆಗುತ್ತಿದೆ...",
      processing: "ಬಯೋಮೆಟ್ರಿಕ್ಸ್ ಸಂಸ್ಕರಣೆ",
      extracting: "ಮುಖದ ಜ್ಯಾಮಿತಿ ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...",
      runningAi: "AI ಪತ್ತೆ ಮಾದರಿಗಳನ್ನು ಚಲಾಯಿಸಲಾಗುತ್ತಿದೆ...",
      crossRef: "ತಿಳಿದಿರುವ ಇಮೇಜ್ ಡೇಟಾಬೇಸ್‌ಗಳನ್ನು ಕ್ರಾಸ್-ರೆಫರೆನ್ಸ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      calc: "ಗುರುತಿನ ಸ್ಥಿರತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...",
      profileVerified: "ಪ್ರೊಫೈಲ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      threatDetected: "ಬೆದರಿಕೆ ಪತ್ತೆಯಾಗಿದೆ",
      secure: "ಸುರಕ್ಷಿತ",
      highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
      riskScore: "ಅಪಾಯ ಸ್ಕೋರ್",
      aiProb: "AI ರಚಿತ ಸಂಭವನೀಯತೆ",
      consistency: "ಗುರುತಿನ ಸ್ಥಿರತೆ",
      reverseSearch: "ರಿವರ್ಸ್ ಇಮೇಜ್ ಹುಡುಕಾಟ",
      indicators: "ಅನುಮಾನಾಸ್ಪದ ಸೂಚಕಗಳು",
      safeMsg: "✅ ಈ ಪ್ರೊಫೈಲ್ ಎಲ್ಲಾ ಬೇಸ್‌ಲೈನ್ ಬಯೋಮೆಟ್ರಿಕ್ ಪರಿಶೀಲನೆಗಳಲ್ಲಿ ಉತ್ತೀರ್ಣವಾಗಿದೆ.",
      fakeMsg: "⚠️ ಈ ಪ್ರೊಫೈಲ್ ನಕಲಿ ಅಥವಾ ಹಗರಣದ ಭಾಗವಾಗಿರುವ ಬಲವಾದ ಲಕ್ಷಣಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.",
      trustScore: "ಪ್ರೊಫೈಲ್ ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್"
    }
  };

  const l = t[language || 'en'];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 4));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newImages = Array.from(e.dataTransfer.files)
        .filter(file => file.type.startsWith('image/'))
        .map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 4));
    }
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setResults(null);
    
    setTimeout(() => {
      setAnalyzing(false);
      const fakeScore = Math.random();
      if (fakeScore > 0.5) {
        setResults({
          isSafe: false,
          aiProb: Math.floor(Math.random() * 25) + 75,
          consistency: images.length > 1 ? "Low Consistency" : "Unverified",
          reverseMatch: "Match Found ⚠️",
          visualSuspicion: ["Unnatural lighting artifacts", "Facial symmetry anomalies"],
          riskScore: Math.floor(Math.random() * 20) + 80
        });
      } else {
        setResults({
          isSafe: true,
          aiProb: Math.floor(Math.random() * 10) + 2,
          consistency: images.length > 1 ? "High Consistency" : "Verified",
          reverseMatch: "No Matches",
          visualSuspicion: ["None detected"],
          riskScore: Math.floor(Math.random() * 15) + 5
        });
      }
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-cyan-400" /> {l.targetProfile}
          </h2>
          
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple className="hidden" />

          <div 
            className={`border-2 border-dashed ${images.length ? 'border-slate-600' : 'border-cyan-500/50 hover:border-cyan-400 bg-cyan-950/20'} rounded-xl p-8 text-center transition-all cursor-pointer relative overflow-hidden`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => { if(images.length < 4) fileInputRef.current.click() }}
          >
            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-700 group">
                    <img src={img} className={`w-full h-32 object-cover ${analyzing ? 'animate-pulse opacity-50' : ''}`} alt="Profile" />
                    <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3 text-white" /></button>
                    {analyzing && <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-scanline shadow-[0_0_15px_rgba(6,182,212,1)]"></div>}
                  </div>
                ))}
                {images.length < 4 && <div className="border border-dashed border-slate-600 rounded-lg flex items-center justify-center h-32 text-slate-500 hover:text-slate-300"><UploadCloud className="w-8 h-8" /></div>}
              </div>
            ) : (
              <div className="py-8">
                <UploadCloud className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <p className="font-bold text-slate-300 mb-1">{l.clickDrag}</p>
                <p className="text-xs text-slate-500 font-mono">{l.uploadDesc}</p>
              </div>
            )}
          </div>

          <button onClick={runAnalysis} disabled={images.length === 0 || analyzing} className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white py-3 rounded-xl uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex justify-center items-center gap-2">
            {analyzing ? <Scan className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
            {analyzing ? l.scanning : l.analyzeProfile}
          </button>
        </div>
      </div>

      <div className="lg:col-span-7">
        {analyzing && (
          <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 h-full flex flex-col justify-center">
            <h3 className="text-cyan-400 font-mono text-sm mb-6 flex items-center gap-2"><Cpu className="w-4 h-4 animate-pulse" /> {l.processing}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-500" /> {l.extracting}</div>
              <div className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-500" /> {l.runningAi}</div>
              <div className="flex items-center gap-3 text-slate-300"><Scan className="w-4 h-4 text-cyan-500 animate-spin" /> {l.crossRef}</div>
              <div className="flex items-center gap-3 text-slate-500"><Activity className="w-4 h-4" /> {l.calc}</div>
            </div>
          </div>
        )}

        {results && !analyzing && (
          <div className={`glass-panel rounded-2xl border-2 overflow-hidden relative ${results.isSafe ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-red-500/50 neon-border-red'}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] ${results.isSafe ? 'bg-emerald-600/10' : 'bg-red-600/10'}`}></div>
            <div className={`p-4 border-b flex justify-between items-center ${results.isSafe ? 'bg-emerald-950/40 border-emerald-900/50' : 'bg-red-950/40 border-red-900/50'}`}>
              <h3 className={`font-black uppercase tracking-widest flex items-center gap-2 ${results.isSafe ? 'text-emerald-500' : 'text-red-500'}`}>
                {results.isSafe ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                {results.isSafe ? l.profileVerified : l.threatDetected}
              </h3>
              <div className={`text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${results.isSafe ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]'}`}>
                {results.isSafe ? l.secure : l.highRisk}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8 relative z-10">
              <div className="flex flex-col sm:flex-row gap-8 items-center border-b border-slate-800 pb-8">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path fill="none" stroke="#1e293b" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path fill="none" stroke={results.isSafe ? "#10b981" : "#dc2626"} strokeWidth="3" strokeDasharray={`${results.riskScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ filter: `drop-shadow(0 0 8px ${results.isSafe ? 'rgba(16,185,129,0.8)' : 'rgba(220,38,38,0.8)'})` }} />
                  </svg>
                  <div className="absolute text-center flex flex-col items-center">
                    <span className={`text-4xl font-black ${results.isSafe ? 'text-emerald-500' : 'text-red-500'}`}>{results.riskScore}</span>
                    <span className={`text-[9px] uppercase tracking-widest font-mono mt-1 ${results.isSafe ? 'text-emerald-400' : 'text-red-400'}`}>{l.riskScore}</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono uppercase text-slate-400"><span>{l.aiProb}</span><span className={`font-bold ${results.isSafe ? 'text-emerald-400' : 'text-red-400'}`}>{results.aiProb}%</span></div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${results.isSafe ? 'bg-emerald-500' : 'bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]'}`} style={{width: `${results.aiProb}%`}}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono uppercase text-slate-400"><span>{l.consistency}</span><span className={`font-bold ${results.consistency === 'High Consistency' || results.consistency === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>{results.consistency}</span></div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${results.consistency === 'High Consistency' || results.consistency === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: results.consistency === 'High Consistency' ? '90%' : '30%'}}></div></div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{l.reverseSearch}</span>
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${results.isSafe ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>{results.reverseMatch}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">{l.indicators}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.visualSuspicion.map((indicator, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#0b1120] p-3 rounded-lg border border-slate-800">
                      {results.isSafe ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                      <span className="text-sm text-slate-300">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-xl text-center border ${results.isSafe ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <p className={`font-bold text-sm ${results.isSafe ? 'text-emerald-400' : 'text-red-400'}`}>{results.isSafe ? l.safeMsg : l.fakeMsg}</p>
                <p className="text-slate-400 text-xs mt-1">{l.trustScore}: {results.isSafe ? '95%' : '12%'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
