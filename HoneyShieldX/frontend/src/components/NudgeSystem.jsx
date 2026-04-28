import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, Clock, XOctagon, StopCircle, UserX, MessageSquare, Send, Image as ImageIcon } from 'lucide-react';

export default function NudgeSystem({ demoMode, language }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [activeNudge, setActiveNudge] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

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
        body: JSON.stringify({ message: msgToSend, has_image: false, language: language })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'receiver', text: data.bot_reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        if (data.nudge) setActiveNudge(data.nudge);
        if (data.cooldown > 0) setCooldown(data.cooldown);
      }, 1000);
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
          body: JSON.stringify({ message: '', has_image: true, language: language })
        });
        const data = await res.json();
        
        setTimeout(() => {
          if (data.nudge) setActiveNudge(data.nudge);
        }, 500);

        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'receiver', text: data.bot_reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        }, 2000);
      } catch(err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in relative">
      {cooldown > 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md rounded-2xl animate-fade-in">
          <div className="bg-slate-900 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full text-center neon-border-red">
            <Clock className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-black text-red-500 uppercase tracking-widest mb-2">{l.cooldownTitle}</h2>
            <p className="text-sm text-slate-300 mb-6">{l.cooldownDesc}</p>
            <div className="text-5xl font-mono text-white font-bold">{Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, '0')}</div>
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
        
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#090f1a] relative">
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
        
        <form onSubmit={handleSend} className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2">
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={cooldown > 0} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"><ImageIcon className="w-5 h-5" /></button>
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={l.placeholder} disabled={cooldown > 0} className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors" />
          <button type="submit" disabled={cooldown > 0 || !inputText.trim()} className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50"><Send className="w-5 h-5" /></button>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-6">
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
          <button className="glass-panel p-4 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-400 flex flex-col items-center justify-center gap-2 transition-colors">
            <UserX className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{l.block}</span>
          </button>
          <button className="glass-panel p-4 rounded-xl border border-orange-500/30 hover:bg-orange-500/10 text-orange-400 flex flex-col items-center justify-center gap-2 transition-colors">
            <StopCircle className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{l.report}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
