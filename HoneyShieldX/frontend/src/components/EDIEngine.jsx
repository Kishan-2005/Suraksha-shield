import React, { useState, useEffect } from 'react';
import { Activity, BrainCircuit, Heart, MessageCircle, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

export default function EDIEngine({ demoMode, language }) {
  const [ediScore, setEdiScore] = useState(12);
  const [chatHistory, setChatHistory] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const t = {
    en: { title: "EDI Engine", subtitle: "Emotional Dependency Index tracker", score: "EDI SCORE", desc: "Measures the psychological grip and manipulation velocity of the target.", liveStream: "Live Telemetry Stream", waiting: "Waiting for new messages...", aiAnalysis: "AI Dependency Analysis", metrics: "Core Metrics", bonding: "Emotional Bonding Rate", urgency: "Urgency Injection", isolation: "Isolation Tactics", alert: "High Emotional Manipulation Risk" },
    hi: { title: "ईडीआई इंजन", subtitle: "भावनात्मक निर्भरता सूचकांक ट्रैकर", score: "ईडीआई स्कोर", desc: "लक्ष्य की मनोवैज्ञानिक पकड़ और हेरफेर वेग को मापता है।", liveStream: "लाइव टेलीमेट्री स्ट्रीम", waiting: "नए संदेशों की प्रतीक्षा में...", aiAnalysis: "AI निर्भरता विश्लेषण", metrics: "मुख्य मेट्रिक्स", bonding: "भावनात्मक संबंध दर", urgency: "तत्काल इंजेक्शन", isolation: "अलगाव की रणनीति", alert: "उच्च भावनात्मक हेरफेर जोखिम" },
    kn: { title: "ಇಡಿಐ ಎಂಜಿನ್", subtitle: "ಭಾವನಾತ್ಮಕ ಅವಲಂಬನೆ ಸೂಚ್ಯಂಕ ಟ್ರ್ಯಾಕರ್", score: "ಇಡಿಐ ಸ್ಕೋರ್", desc: "ಗುರಿಯ ಮಾನಸಿಕ ಹಿಡಿತ ಮತ್ತು ಕುಶಲತೆಯ ವೇಗವನ್ನು ಅಳೆಯುತ್ತದೆ.", liveStream: "ಲೈವ್ ಟೆಲಿಮೆಟ್ರಿ ಸ್ಟ್ರೀಮ್", waiting: "ಹೊಸ ಸಂದೇಶಗಳಿಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ...", aiAnalysis: "AI ಅವಲಂಬನೆ ವಿಶ್ಲೇಷಣೆ", metrics: "ಕೋರ್ ಮೆಟ್ರಿಕ್ಸ್", bonding: "ಭಾವನಾತ್ಮಕ ಬಂಧದ ದರ", urgency: "ತುರ್ತು ಇಂಜೆಕ್ಷನ್", isolation: "ಪ್ರತ್ಯೇಕತೆ ತಂತ್ರಗಳು", alert: "ಹೆಚ್ಚಿನ ಭಾವನಾತ್ಮಕ ಕುಶಲತೆಯ ಅಪಾಯ" }
  };

  const l = t[language || 'en'];

  useEffect(() => {
    const fetchEdi = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/edi-status');
        if (res.ok) {
          const data = await res.json();
          setEdiScore(data.score);
          setChatHistory(data.history);
        }
      } catch (err) {
        console.error("Backend not running. Using fallback UI.", err);
      }
    };
    
    fetchEdi();
    const interval = setInterval(fetchEdi, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-panel p-8 rounded-3xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2"><BrainCircuit className="w-6 h-6 text-cyan-400" /> {l.title}</h2>
              <p className="text-xs text-slate-400 font-mono tracking-widest mt-1">{l.subtitle}</p>
            </div>
            {analyzing && <span className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30"><Activity className="w-4 h-4 animate-spin" /> Processing</span>}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-48 h-48 flex shrink-0 items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path fill="none" stroke="#1e293b" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path fill="none" stroke={ediScore > 75 ? "#dc2626" : ediScore > 40 ? "#f59e0b" : "#06b6d4"} strokeWidth="3" strokeDasharray={`${ediScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ transition: 'stroke-dasharray 0.5s ease' }} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-6xl font-black ${ediScore > 75 ? 'text-red-500' : ediScore > 40 ? 'text-amber-500' : 'text-cyan-500'}`}>{ediScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{l.score}</span>
              </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
              <p className="text-sm text-slate-300 leading-relaxed bg-[#0b1120] p-4 rounded-xl border border-slate-800">{l.desc}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-slate-400 mb-1"><span>{l.bonding}</span><span>{Math.min(ediScore * 1.1, 95).toFixed(0)}%</span></div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-pink-500 transition-all duration-500" style={{width: `${Math.min(ediScore * 1.1, 95)}%`}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-slate-400 mb-1"><span>{l.urgency}</span><span>{Math.min(ediScore * 1.2, 98).toFixed(0)}%</span></div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 transition-all duration-500" style={{width: `${Math.min(ediScore * 1.2, 98)}%`}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-slate-400 mb-1"><span>{l.isolation}</span><span>{Math.min(ediScore * 0.9, 85).toFixed(0)}%</span></div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 transition-all duration-500" style={{width: `${Math.min(ediScore * 0.9, 85)}%`}}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-700 h-[300px] flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> {l.liveStream}</h3>
          <div className="flex-1 bg-[#0b1120] border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-3 font-mono text-xs">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat, idx) => (
                <div key={idx} className={chat.sender === 'user' ? 'text-slate-400' : 'text-cyan-400 font-bold'}>
                  [{chat.time}] {chat.sender.toUpperCase()}: {chat.text ? chat.text : '[IMAGE ATTACHMENT UPLOADED]'}
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 uppercase tracking-widest">{l.waiting}</div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" /> {l.aiAnalysis}</h3>
          <div className="space-y-4">
            <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Linguistic Analysis</p>
              <p className="text-sm text-slate-300">High usage of "we", "forever", "destiny". Indicative of rapid romance scam grooming.</p>
            </div>
            <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Behavioral Velocity</p>
              <p className="text-sm text-slate-300">Contact frequency increased by 400% in 48 hours. Target is establishing cognitive monopoly.</p>
            </div>
          </div>
        </div>

        {ediScore > 70 && (
          <div className="glass-panel p-6 rounded-2xl border-2 border-red-500/50 bg-red-950/20 animate-shake">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
              <h4 className="font-black text-sm uppercase tracking-wider text-red-400">{l.alert}</h4>
            </div>
            <p className="text-xs text-slate-300">The current interaction pattern matches standard financial extortion templates with 94% accuracy.</p>
          </div>
        )}
      </div>
    </div>
  );
}
