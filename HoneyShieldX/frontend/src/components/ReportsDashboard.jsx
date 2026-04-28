import React, { useState, useEffect } from 'react';
import { Download, Share2, AlertTriangle, Shield, Heart, Clock, DollarSign, ActivitySquare, CheckCircle, Database, FileText } from 'lucide-react';

export default function ReportsDashboard({ demoMode }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (demoMode) {
      generateReport();
    }
  }, [demoMode]);

  const generateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReport({
        riskScore: 82,
        riskLevel: "High",
        summary: "The conversation shows progressive emotional bonding followed by an urgent financial request. This strongly aligns with standard Romance Scam methodology.",
        patterns: [
          { type: "Emotional Manipulation", confidence: 87, icon: Heart, color: "text-pink-500", example: "I feel like you're the only one who understands me..." },
          { type: "Urgency", confidence: 92, icon: Clock, color: "text-amber-500", example: "I need help right now, it's an emergency!" },
          { type: "Financial Request", confidence: 96, icon: DollarSign, color: "text-red-500", example: "Can you send $500 via crypto urgently?" },
          { type: "Deepfake Suspicion", confidence: 64, icon: UserSquare, color: "text-orange-500", example: "Voice pitch anomalies detected in last call." }
        ],
        timeline: [
          { stage: "Initial Contact", risk: "safe", desc: "Casual greeting" },
          { stage: "Emotional Bonding", risk: "warning", desc: "Rapid attachment" },
          { stage: "Trust Building", risk: "warning", desc: "Isolation tactics" },
          { stage: "Financial Request", risk: "danger", desc: "Urgent crisis" }
        ],
        evidence: [
          { sender: "target", text: "I really care about you so much.", highlight: "" },
          { sender: "target", text: "But I have a huge problem. I need to send money to the hospital urgently.", highlight: "send money", highlightClass: "bg-red-500/20 text-red-500 font-bold px-1 rounded border border-red-500/50" }
        ]
      });
    }, 1500);
  };

  function UserSquare(props) { return <Database {...props} />; }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">AI Scam Intelligence Report</h2>
          <p className="text-xs text-slate-400 font-mono tracking-widest mt-1">Behavioral & Pattern-Based Detection Summary</p>
        </div>
        <div className="flex gap-2">
          <button onClick={generateReport} disabled={loading} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors">
            {loading ? <ActivitySquare className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} Generate Report
          </button>
          {report && (
            <>
              <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center gap-2 border border-slate-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center gap-2 border border-slate-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {!report && !loading && (
        <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-slate-500 border border-slate-800 border-dashed">
          <Shield className="w-16 h-16 mb-4 opacity-50" />
          <p className="font-mono text-sm uppercase tracking-widest">Awaiting Analysis</p>
          <p className="text-xs mt-2">Click "Generate Report" or enable Demo Mode to proceed.</p>
        </div>
      )}

      {loading && (
        <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-cyan-500 border border-cyan-500/30">
          <ActivitySquare className="w-16 h-16 mb-4 animate-spin" />
          <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Synthesizing Telemetry...</p>
        </div>
      )}

      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-red-500 neon-border-red flex flex-col items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest w-full text-left mb-6">Threat Assessment</h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  <path fill="none" stroke="#1e293b" strokeWidth="2" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray={`${report.riskScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ filter: 'drop-shadow(0 0 5px #dc2626)' }} />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-5xl font-black text-red-500">{report.riskScore}</span>
                  <span className="text-[10px] uppercase font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded mt-2 border border-red-500/30">HIGH RISK</span>
                </div>
              </div>

              <div className="mt-8 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">AI Summary</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{report.summary}</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Evidence Timeline</h3>
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-red-500"></div>
                {report.timeline.map((item, idx) => {
                  const colors = { safe: 'bg-emerald-500', warning: 'bg-amber-500', danger: 'bg-red-500 border-2 border-red-400 shadow-[0_0_10px_rgba(220,38,38,0.8)]' };
                  return (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-[29px] w-3 h-3 rounded-full ${colors[item.risk]}`}></div>
                      <h4 className={`text-sm font-bold uppercase tracking-wider ${item.risk === 'danger' ? 'text-red-400' : 'text-slate-200'}`}>{item.stage}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-1">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Patterns</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {report.patterns.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div key={idx} className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-16 h-16 ${p.color.replace('text', 'bg')}/10 rounded-full blur-xl`}></div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${p.color}`} />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">{p.type}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${p.color.replace('text-', 'text-').replace('text-', 'border-')}/30 ${p.color.replace('text-', 'bg-')}/10`}>
                          {p.confidence}% CONF
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 italic">"{p.example}"</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Message Evidence Viewer</h3>
              <div className="bg-[#090f1a] rounded-xl p-4 border border-slate-800 space-y-4">
                {report.evidence.map((msg, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 max-w-[85%] self-start relative">
                    <span className="absolute -top-2 -left-2 bg-slate-800 text-slate-400 text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-slate-700">Extracted</span>
                    <p className="text-sm text-slate-300 pt-2">
                      {msg.highlight ? (
                        <>
                          {msg.text.split(msg.highlight)[0]}
                          <span className={msg.highlightClass}>{msg.highlight}</span>
                          {msg.text.split(msg.highlight)[1]}
                        </>
                      ) : (
                        msg.text
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Explainable AI Reasoning</h3>
              <p className="text-sm text-slate-300">{report.ai_explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
