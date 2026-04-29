import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, Clock, XOctagon, StopCircle, UserX, MessageSquare, Send, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';

export default function NudgeSystem({ demoMode, language }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [activeNudge, setActiveNudge] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { scammerProfile, setSharedChatHistory, setSharedEdiScore, setSharedScamsPrevented, setSharedActiveThreats } = useGlobalState();

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportDesc, setReportDesc] = useState('');
  const [reportType, setReportType] = useState('Romance Scam');
  const [chatAlert, setChatAlert] = useState(null);
  const [threatLevel, setThreatLevel] = useState(0);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [isChatTerminated, setIsChatTerminated] = useState(false);
  const [popupSuspiciousCount, setPopupSuspiciousCount] = useState(0);
  const [popupThreshold, setPopupThreshold] = useState(2);
  const lastCategoryIndex = useRef(-1);

  useEffect(() => {
    setSharedChatHistory(messages);
  }, [messages, setSharedChatHistory]);

  // Backend handles dynamic replies and message analysis

  const t = {
    en: { session: "Active Session", placeholder: "Type a message...", engine: "Intervention Engine", desc: "The Counter-Manipulation system actively analyzes inbound messages to psychologically protect you from emotional exploitation and grooming tactics.", monitoring: "Monitoring Stream...", block: "Block Contact", report: "Report Scam", cooldownTitle: "Cognitive Cooldown Active", cooldownDesc: "Extreme emotional manipulation detected. Take a moment to think rationally. Actions are temporarily locked.", devilsAdvocate: "Devil's Advocate Reality Check", realityCheck: "\"Have you verified this person's identity on a live video call? If not, why are they asking for money?\"" },
    hi: { session: "सक्रिय सत्र", placeholder: "एक संदेश टाइप करें...", engine: "हस्तक्षेप इंजन", desc: "काउंटर-मैनिपुलेशन सिस्टम मनोवैज्ञानिक रूप से आपको शोषण से बचाने के लिए इनबाउंड संदेशों का विश्लेषण करता है।", monitoring: "स्ट्रीम की निगरानी...", block: "संपर्क ब्लॉक करें", report: "घोटाले की रिपोर्ट करें", cooldownTitle: "संज्ञानात्मक कूलडाउन सक्रिय", cooldownDesc: "अत्यधिक भावनात्मक हेरफेर का पता चला। तार्किक रूप से सोचने के लिए कुछ समय लें। कार्रवाई अस्थायी रूप से लॉक हैं।", devilsAdvocate: "डेविल्स एडवोकेट रियलिटी चेक", realityCheck: "\"क्या आपने लाइव वीडियो कॉल पर पहचान सत्यापित की है? यदि नहीं, तो वे पैसे क्यों मांग रहे हैं?\"" },
    kn: { session: "ಸಕ್ರಿಯ ಸೆಷನ್", placeholder: "ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...", engine: "ಮಧ್ಯಸ್ಥಿಕೆ ಎಂಜಿನ್", desc: "ಕೌಂಟರ್-ಮ್ಯಾನಿಪುಲೇಷನ್ ಸಿಸ್ಟಮ್ ಭಾವನಾತ್ಮಕ ಶೋಷಣೆಯಿಂದ ನಿಮ್ಮನ್ನು ರಕ್ಷಿಸಲು ಒಳಬರುವ ಸಂದೇಶಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.", monitoring: "ಮಾನಿಟರಿಂಗ್ ಸ್ಟ್ರೀಮ್...", block: "ಸಂಪರ್ಕವನ್ನು ನಿರ್ಬಂಧಿಸಿ", report: "ಹಗರಣವನ್ನು ವರದಿ ಮಾಡಿ", cooldownTitle: "ಕಾಗ್ನಿಟಿವ್ ಕೂಲ್‌ಡೌನ್ ಸಕ್ರಿಯ", cooldownDesc: "ತೀವ್ರ ಭಾವನಾತ್ಮಕ ಕುಶಲತೆಯನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ. ತರ್ಕಬದ್ಧವಾಗಿ ಯೋಚಿಸಲು ಒಂದು ಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳಿ. ಕ್ರಿಯೆಗಳನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಾಕ್ ಮಾಡಲಾಗಿದೆ.", devilsAdvocate: "ಡೆವಿಲ್ಸ್ ಅಡ್ವೊಕೇಟ್ ರಿಯಾಲಿಟಿ ಚೆಕ್", realityCheck: "\"ಲೈವ್ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ನೀವು ಗುರುತನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೀರಾ? ಇಲ್ಲದಿದ್ದರೆ, ಅವರು ಏಕೆ ಹಣವನ್ನು ಕೇಳುತ್ತಿದ್ದಾರೆ?\"" }
  };

  const l = t[language || 'en'];

  useEffect(() => {
    // Initial fetch of chat history
    fetch('http://127.0.0.1:5000/api/edi-status')
      .then(res => res.json())
      .then(data => {
        if (data.history) setMessages(data.history);
      })
      .catch(err => {
        setMessages([{ sender: 'receiver', text: "Hey, how are you doing today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeNudge]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (chatAlert) {
      const timer = setTimeout(() => setChatAlert(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [chatAlert]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: inputText, time };
    setMessages(prev => [...prev, userMsg]);
    
    const msgToSend = inputText;
    setInputText('');

    try {
      const res = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgToSend, language: language || 'en' })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { sender: 'receiver', text: data.bot_reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      
      if (data.nudge) {
        setChatAlert({ type: data.nudge.type, text: data.nudge.title });
        setSharedEdiScore(data.edi_score);
        setThreatLevel(prev => {
          const newLevel = prev + 1;
          setActiveNudge(data.nudge);
          return newLevel;
        });
        
        setPopupSuspiciousCount(prev => {
          const newCount = prev + 1;
          if (newCount >= popupThreshold) {
            setCooldown(data.cooldown > 0 ? data.cooldown : 10);
            setShowContinueModal(true);
          }
          return newCount;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages(prev => [...prev, { sender: 'user', image: imgUrl, time }]);
      
      try {
        const res = await fetch('http://127.0.0.1:5000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ has_image: true, language: language || 'en' })
        });
        const data = await res.json();
        
        setMessages(prev => [...prev, { sender: 'receiver', text: data.bot_reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        
        if (data.nudge) {
          setChatAlert({ type: data.nudge.type, text: data.nudge.title });
          setSharedEdiScore(data.edi_score);
          setThreatLevel(prev => {
            const newLevel = prev + 1;
            setActiveNudge(data.nudge);
            return newLevel;
          });
          
          setPopupSuspiciousCount(prev => {
            const newCount = prev + 1;
            if (newCount >= popupThreshold) {
              setCooldown(data.cooldown > 0 ? data.cooldown : 10);
              setShowContinueModal(true);
            }
            return newCount;
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in relative">
      {scammerProfile && scammerProfile.imageUrl && (
        <div style={{ 
          backgroundImage: `url(${scammerProfile.imageUrl})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1, 
          filter: 'grayscale(1)',
          position: 'absolute', 
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '1rem'
        }} />
      )}
      {cooldown > 0 && !showContinueModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md rounded-2xl animate-fade-in">
          <div className="bg-slate-900 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full text-center neon-border-red">
            <Clock className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-black text-red-500 uppercase tracking-widest mb-2">{l.cooldownTitle}</h2>
            <p className="text-sm text-slate-300 mb-6">{l.cooldownDesc}</p>
            <div className="text-5xl font-mono text-white font-bold">{cooldown}</div>
          </div>
        </div>
      )}

      {showContinueModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md rounded-2xl animate-fade-in p-4">
          <div className="glass-panel border-2 border-red-500/50 rounded-2xl p-8 max-w-md w-full relative">
            <h2 className="text-xl font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 animate-pulse" /> Security Warning
            </h2>
            <p className="text-sm text-slate-300 mb-8">
              ⚠ Suspicious manipulation behavior detected. Continue conversation?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={async () => {
                setShowContinueModal(false);
                setIsChatTerminated(true);
                try {
                  const res = await fetch('http://127.0.0.1:5000/api/dashboard/active-threat', { method: 'POST' });
                  const data = await res.json();
                  if (data.success && data.active_threats !== undefined) setSharedActiveThreats(data.active_threats);
                } catch (e) { console.error(e); }
              }} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                Exit Conversation
              </button>
              <button onClick={async () => {
                setShowContinueModal(false);
                setPopupSuspiciousCount(0);
                setPopupThreshold(3);
                try {
                  const res = await fetch('http://127.0.0.1:5000/api/dashboard/active-threat', { method: 'POST' });
                  const data = await res.json();
                  if (data.success && data.active_threats !== undefined) setSharedActiveThreats(data.active_threats);
                } catch (e) { console.error(e); }
              }} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-800 transition-colors border border-slate-700">
                Continue Chat
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-7 glass-panel rounded-2xl flex flex-col h-[600px] border border-slate-700/50 shadow-2xl overflow-hidden relative">
        <div className="bg-slate-900/80 p-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-200">Sarah_Love99</h3>
              <p className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">{l.session}</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#090f1a] relative z-10">
          {chatAlert && (
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm border rounded-lg p-3 shadow-lg animate-fade-in backdrop-blur-sm pointer-events-none transition-all ${threatLevel >= 3 ? 'bg-red-950/90 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.6)]' : 'bg-orange-950/90 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]'}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 animate-pulse mt-0.5 shrink-0 ${threatLevel >= 3 ? 'text-red-500' : 'text-orange-500'}`} />
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${threatLevel >= 3 ? 'text-red-400' : 'text-orange-400'}`}>{chatAlert.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className={`text-[10px] uppercase tracking-widest inline-block px-2 py-0.5 rounded border ${threatLevel >= 3 ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-orange-500/20 text-orange-300 border-orange-500/30'}`}>
                      Detected: {chatAlert.type}
                    </p>
                    {threatLevel >= 2 && (
                      <span className={`text-[9px] font-bold uppercase tracking-widest animate-pulse ${threatLevel >= 3 ? 'text-red-400' : 'text-orange-400'}`}>
                        [Threat Level: High]
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`rounded-xl p-3 max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-cyan-700 text-white self-end ml-auto' : 'bg-slate-800 text-slate-200 border border-slate-700/50 self-start'}`}>
              {msg.image ? (
                msg.image === "true" ? <div className="p-2 bg-cyan-900/50 border border-cyan-400 rounded">[Image Uploaded]</div> : <img src={msg.image} alt="uploaded" className="max-w-[200px] rounded-lg border border-cyan-400/50" />
              ) : (
                msg.text
              )}
              <div className="text-[10px] opacity-50 text-right mt-1 font-mono">{msg.time}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        {isChatTerminated ? (
          <div className="p-4 bg-red-950/80 border-t border-red-900/50 flex flex-col items-center justify-center gap-2 z-10 text-center">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <p className="text-sm font-bold text-red-400 uppercase tracking-widest">Conversation terminated for user safety.</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2 z-10">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={cooldown > 0} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"><ImageIcon className="w-5 h-5" /></button>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={l.placeholder} disabled={cooldown > 0} className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors" />
            <button type="submit" disabled={cooldown > 0 || !inputText.trim()} className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50"><Send className="w-5 h-5" /></button>
          </form>
        )}
      </div>

      <div className="lg:col-span-5 space-y-6 relative z-10">
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-cyan-500">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="text-cyan-400 w-5 h-5" /> {l.engine}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">{l.desc}</p>

          {activeNudge ? (
            <div className={`p-5 rounded-xl border-2 animate-shake ${activeNudge.type === 'critical' ? 'bg-red-900/20 border-red-500 neon-border-red' : activeNudge.type === 'danger' ? 'bg-orange-900/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-amber-900/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'}`}>
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className={`w-6 h-6 ${activeNudge.type === 'critical' ? 'text-red-500 animate-pulse' : activeNudge.type === 'danger' ? 'text-orange-500' : 'text-amber-500'}`} />
                <h4 className={`font-black uppercase tracking-wider text-sm ${activeNudge.type === 'critical' ? 'text-red-400' : activeNudge.type === 'danger' ? 'text-orange-400' : 'text-amber-400'}`}>{activeNudge.title}</h4>
              </div>
              <p className="text-sm text-slate-300 mb-4">{activeNudge.msg}</p>
              
              <div className="bg-[#020617]/50 p-3 rounded-lg border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">{l.devilsAdvocate}</p>
                <p className="text-xs text-cyan-300 italic font-mono">{l.realityCheck}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 border border-slate-800 border-dashed rounded-xl text-center text-slate-500">
              <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-mono uppercase tracking-widest">{l.monitoring}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setShowBlockModal(true)} className="glass-panel p-4 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-400 flex flex-col items-center justify-center gap-2 transition-colors">
            <UserX className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{l.block}</span>
          </button>
          <button onClick={() => setShowReportModal(true)} className="glass-panel p-4 rounded-xl border border-orange-500/30 hover:bg-orange-500/10 text-orange-400 flex flex-col items-center justify-center gap-2 transition-colors">
            <StopCircle className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{l.report}</span>
          </button>
        </div>
      </div>

      {/* Block Contact Modal */}
      {showBlockModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md rounded-2xl animate-fade-in p-4">
          <div className="glass-panel border-2 border-red-500/50 rounded-2xl p-8 max-w-md w-full relative">
            <h2 className="text-xl font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <UserX className="w-6 h-6" /> Block Contact
            </h2>
            
            {!blockSuccess ? (
              <>
                <p className="text-sm text-slate-300 mb-8">
                  Are you sure you want to block this account? This contact will no longer be able to interact with you.
                </p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setShowBlockModal(false)} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-800 transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => setBlockSuccess(true)} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    Confirm Block
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center py-4">
                  <ShieldCheck className="w-16 h-16 text-emerald-500 mb-4 animate-pulse" />
                  <p className="text-sm text-emerald-400 font-bold text-center mb-6">Account successfully blocked.</p>
                  <button onClick={() => { setShowBlockModal(false); setBlockSuccess(false); }} className="px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-600">
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Report Scam Modal */}
      {showReportModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md rounded-2xl animate-fade-in p-4">
          <div className="glass-panel border-2 border-orange-500/50 rounded-2xl p-8 max-w-md w-full relative">
            <h2 className="text-lg font-black text-orange-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <StopCircle className="w-6 h-6" /> Report Suspicious Activity
            </h2>
            
            {!reportSuccess ? (
              <>
                <p className="text-sm text-slate-300 mb-6">
                  Are you sure you want to report this account to cyber security monitoring systems?
                </p>
                
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (reportDesc.trim()) {
                    try {
                      const res = await fetch('http://127.0.0.1:5000/api/dashboard/report-scam', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      });
                      const data = await res.json();
                      if (data.success && data.scams_prevented) {
                        setSharedScamsPrevented(data.scams_prevented);
                      }
                      setReportSuccess(true);
                    } catch (err) {
                      console.error("Error reporting scam:", err);
                      setReportSuccess(true);
                    }
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Scam Type</label>
                    <select 
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 px-4 text-sm text-slate-200 focus:border-orange-500 focus:outline-none transition-colors"
                    >
                      <option value="Romance Scam">Romance Scam</option>
                      <option value="Fake Identity">Fake Identity</option>
                      <option value="Financial Fraud">Financial Fraud</option>
                      <option value="AI Generated Profile">AI Generated Profile</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Describe suspicious activity</label>
                    <textarea 
                      required
                      value={reportDesc}
                      onChange={(e) => setReportDesc(e.target.value)}
                      placeholder="Please provide details..."
                      rows="3"
                      className="w-full bg-[#0b1120] border border-slate-700 rounded-lg py-3 px-4 text-sm text-slate-200 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-800 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={!reportDesc.trim()} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest bg-orange-600 hover:bg-orange-500 text-white transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50">
                      Submit Report
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center py-4">
                  <ShieldCheck className="w-16 h-16 text-emerald-500 mb-4 animate-pulse" />
                  <p className="text-sm text-emerald-400 font-bold text-center mb-6">Report submitted successfully to cyber security monitoring.</p>
                  <button onClick={() => { setShowReportModal(false); setReportSuccess(false); setReportDesc(''); }} className="px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-600">
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
