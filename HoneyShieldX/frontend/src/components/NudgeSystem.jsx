import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, Clock, XOctagon, StopCircle, UserX, MessageSquare, Send, Image as ImageIcon } from 'lucide-react';

export default function NudgeSystem({ demoMode }) {
  const [messages, setMessages] = useState([
    { sender: 'receiver', text: "Hey, how are you doing today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputText, setInputText] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [activeNudge, setActiveNudge] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeNudge]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: inputText, time }]);
    setInputText('');

    // Simulate bot reply based on keywords
    setTimeout(() => {
      let botResponse = "I really miss you. Only you understand me.";
      let newNudge = {
        type: 'warning',
        title: 'Emotional Dependency Detected',
        msg: 'This person is attempting to establish emotional exclusivity. This is a common manipulation tactic.'
      };

      if (inputText.toLowerCase().includes('money') || inputText.toLowerCase().includes('help')) {
        botResponse = "I have a huge emergency. I need you to send money urgently or I'm in trouble.";
        newNudge = {
          type: 'critical',
          title: 'High-Risk Financial Request',
          msg: 'Urgent emotional pressure combined with a financial request matches a 98% probability of romance fraud.'
        };
        setCooldown(60);
      }

      setMessages(prev => [...prev, { sender: 'receiver', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setActiveNudge(newNudge);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages(prev => [...prev, { sender: 'user', image: imgUrl, time }]);
      
      // Instantly trigger EDI detection on image upload
      setActiveNudge({
        type: 'danger',
        title: 'Media Analysis Warning',
        msg: 'Image uploaded. AI Vision detects high levels of manipulation vectors in this media. EDI Risk Score increased by +15.'
      });
      
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'receiver', text: "Why are you sending this? Please don't tell anyone about us.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in relative">
      {cooldown > 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md rounded-2xl animate-fade-in">
          <div className="bg-slate-900 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full text-center neon-border-red">
            <Clock className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-black text-red-500 uppercase tracking-widest mb-2">Cognitive Cooldown Active</h2>
            <p className="text-sm text-slate-300 mb-6">Extreme emotional manipulation detected. Take a moment to think rationally. Actions are temporarily locked.</p>
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
              <p className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">Active Session</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#090f1a] relative">
          {messages.map((msg, idx) => (
            <div key={idx} className={`rounded-xl p-3 max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-cyan-700 text-white self-end ml-auto' : 'bg-slate-800 text-slate-200 border border-slate-700/50 self-start'}`}>
              {msg.image ? (
                <img src={msg.image} alt="uploaded" className="max-w-[200px] rounded-lg border border-cyan-400/50" />
              ) : (
                msg.text
              )}
              <div className="text-[10px] opacity-50 text-right mt-1 font-mono">{msg.time}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <form onSubmit={handleSend} className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            disabled={cooldown > 0} 
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..." 
            disabled={cooldown > 0} 
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors" 
          />
          <button 
            type="submit" 
            disabled={cooldown > 0 || !inputText.trim()} 
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-cyan-500">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="text-cyan-400 w-5 h-5" /> Intervention Engine
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            The Counter-Manipulation system actively analyzes inbound messages to psychologically protect you from emotional exploitation and grooming tactics.
          </p>

          {activeNudge ? (
            <div className={`p-5 rounded-xl border-2 animate-shake ${activeNudge.type === 'critical' ? 'bg-red-900/20 border-red-500 neon-border-red' : activeNudge.type === 'danger' ? 'bg-orange-900/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-amber-900/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'}`}>
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className={`w-6 h-6 ${activeNudge.type === 'critical' ? 'text-red-500 animate-pulse' : activeNudge.type === 'danger' ? 'text-orange-500' : 'text-amber-500'}`} />
                <h4 className={`font-black uppercase tracking-wider text-sm ${activeNudge.type === 'critical' ? 'text-red-400' : activeNudge.type === 'danger' ? 'text-orange-400' : 'text-amber-400'}`}>{activeNudge.title}</h4>
              </div>
              <p className="text-sm text-slate-300 mb-4">{activeNudge.msg}</p>
              
              <div className="bg-[#020617]/50 p-3 rounded-lg border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Devil's Advocate Reality Check</p>
                <p className="text-xs text-cyan-300 italic font-mono">"Have you verified this person's identity on a live video call? If not, why are they asking for money?"</p>
              </div>
            </div>
          ) : (
            <div className="p-8 border border-slate-800 border-dashed rounded-xl text-center text-slate-500">
              <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-mono uppercase tracking-widest">Monitoring Stream...</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="glass-panel p-4 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-400 flex flex-col items-center justify-center gap-2 transition-colors">
            <UserX className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Block Contact</span>
          </button>
          <button className="glass-panel p-4 rounded-xl border border-orange-500/30 hover:bg-orange-500/10 text-orange-400 flex flex-col items-center justify-center gap-2 transition-colors">
            <StopCircle className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Report Scam</span>
          </button>
        </div>
      </div>
    </div>
  );
}
