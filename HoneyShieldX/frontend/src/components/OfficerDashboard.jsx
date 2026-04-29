import React, { useState, useEffect } from 'react';
import { Shield, ActivitySquare, AlertTriangle, CheckCircle, LogOut, FileText } from 'lucide-react';
import { io } from 'socket.io-client';

export default function OfficerDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertToast, setAlertToast] = useState(null);
  const [expandedReports, setExpandedReports] = useState({});
  const [relatedReportsData, setRelatedReportsData] = useState(null);

  useEffect(() => {
    fetchReports();

    const socket = io('http://127.0.0.1:5000');
    
    socket.on('new_report', (report) => {
      setReports(prev => {
        // avoid duplicates
        if (prev.find(r => r.id === report.id)) return prev;
        return [report, ...prev];
      });
    });

    socket.on('high_risk_alert', (data) => {
      setAlertToast(data.message || "🚨 High Risk Scam Detected");
      setTimeout(() => setAlertToast(null), 5000);
    });

    socket.on('critical_alert', (data) => {
      setAlertToast(data.message || "🚨 CRITICAL SCAM DETECTED");
      setTimeout(() => setAlertToast(null), 5000);
    });

    const fallbackInterval = setInterval(async () => {
      if (!socket.connected) {
        try {
          const res = await fetch('http://127.0.0.1:5000/api/reports/latest');
          if (res.ok) {
            const latest = await res.json();
            setReports(prev => {
              const merged = [...prev];
              latest.forEach(lr => {
                if (!merged.find(r => r.id === lr.id)) merged.unshift(lr);
              });
              return merged.sort((a, b) => b.id - a.id);
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    }, 5000);

    return () => {
      socket.disconnect();
      clearInterval(fallbackInterval);
    };
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('officer_token');
      if (!token) {
        window.location.href = '/officer-login';
        return;
      }
      
      const res = await fetch('http://127.0.0.1:5000/api/officer/reports', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('officer_token');
        window.location.href = '/officer-login';
        return;
      }
      const data = await res.json();
      setReports(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reports');
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('officer_token');
      await fetch(`http://127.0.0.1:5000/api/officer/reports/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const escalateReport = async (id) => {
    try {
      const token = localStorage.getItem('officer_token');
      await fetch(`http://127.0.0.1:5000/api/officer/reports/${id}/escalate`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const blockNumber = async (phone) => {
    if (!phone) return;
    try {
      const token = localStorage.getItem('officer_token');
      await fetch(`http://127.0.0.1:5000/api/block-number`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phone_number: phone })
      });
      setAlertToast("Number Successfully Blocked");
      setTimeout(() => setAlertToast(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const viewRelated = async (phone) => {
    if (!phone) return;
    try {
      const token = localStorage.getItem('officer_token');
      const res = await fetch(`http://127.0.0.1:5000/api/reports/linked/${encodeURIComponent(phone)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setRelatedReportsData({ phone, reports: data });
    } catch (err) {
      console.error(err);
    }
  };

  const viewOnMap = (lat, lng) => {
    window.location.href = `/?lat=${lat}&lng=${lng}`;
  };

  const toggleDetails = (id) => {
    setExpandedReports(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const logout = () => {
    localStorage.removeItem('officer_token');
    window.location.href = '/officer-login';
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-6 overflow-x-hidden selection:bg-cyan-500/30 relative">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      </div>

      {alertToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
          <div className="bg-red-950/90 border-2 border-red-500 rounded-xl px-6 py-3 shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-red-400 font-black uppercase tracking-widest text-sm">{alertToast}</span>
          </div>
        </div>
      )}

      <header className="flex justify-between items-center mb-8 relative z-10 glass-panel p-6 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-black uppercase tracking-widest text-white">Cyber Crime Unit</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Intelligence Dashboard</p>
          </div>
        </div>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-700 transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto relative z-10 pb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-cyan-500" /> Incoming Reports Queue</h2>
        
        {relatedReportsData && (
          <div className="mb-8 p-6 glass-panel border border-amber-500/50 rounded-2xl bg-amber-950/20 relative animate-fade-in">
            <button onClick={() => setRelatedReportsData(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Related Cases for {relatedReportsData.phone}
            </h3>
            <div className="space-y-3">
              {relatedReportsData.reports.map(r => (
                <div key={r.id} className="flex justify-between items-center bg-[#0b1120] p-3 rounded-lg border border-slate-800">
                  <span className="text-xs font-mono text-slate-300">Report #{r.id} - {r.country || 'Unknown Location'}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${r.risk_score >= 80 ? 'text-red-400 border-red-500/30 bg-red-900/20' : 'text-amber-400 border-amber-500/30 bg-amber-900/20'}`}>Score: {r.risk_score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 glass-panel rounded-2xl">
            <ActivitySquare className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">Loading Intelligence...</p>
          </div>
        ) : error ? (
          <div className="bg-red-950/50 border border-red-500/50 text-red-400 p-6 rounded-2xl text-sm font-bold text-center">
            {error}
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-panel p-20 rounded-2xl border border-dashed border-slate-700 text-center flex flex-col items-center justify-center">
            <Shield className="w-16 h-16 text-slate-600 mb-4 opacity-50" />
            <p className="text-sm uppercase tracking-widest text-slate-500 font-mono">No active reports found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map(report => (
              <div key={report.id} className={`glass-panel p-6 rounded-2xl border transition-all duration-500 ${report.status === 'critical' ? 'border-red-500/80 bg-red-950/20 shadow-[0_0_15px_rgba(220,38,38,0.3)] animate-pulse' : 'border-slate-700/50 hover:border-slate-600'}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                      <span className={`text-xl font-black ${report.risk_score >= 70 ? 'text-red-500' : report.risk_score >= 40 ? 'text-amber-500' : 'text-emerald-500'}`}>{report.risk_score}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-200 uppercase tracking-widest text-sm flex items-center gap-2">
                        {report.report_type === 'chat' ? 'Chat/Scam Activity' : 'Number Profile'} 
                        <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">#{report.id}</span>
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{new Date(report.created_at).toLocaleString()}</p>
                        {report.country && (
                          <p className="text-[10px] text-cyan-500 font-mono tracking-widest uppercase">
                            Origin: {report.country} ({report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)})
                          </p>
                        )}
                        {report.linked_count > 0 && (
                          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                            Linked to {report.linked_count} similar reports
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                      report.status === 'critical' ? 'bg-red-900/30 text-red-400 border-red-500/50' :
                      report.status === 'resolved' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' :
                      report.status === 'investigating' ? 'bg-amber-900/30 text-amber-400 border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-600'
                    }`}>
                      {report.status}
                    </span>
                    
                    {report.status !== 'resolved' && (
                      <div className="flex flex-wrap gap-2">
                        {report.status !== 'critical' && (
                          <button onClick={() => escalateReport(report.id)} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                            Escalate
                          </button>
                        )}
                        {report.status === 'pending' && (
                          <button onClick={() => updateStatus(report.id, 'investigating')} className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                            Investigate
                          </button>
                        )}
                        <button onClick={() => updateStatus(report.id, 'resolved')} className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                          Resolve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {report.phone_number && (
                    <button onClick={() => blockNumber(report.phone_number)} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-[9px] font-bold uppercase tracking-widest transition-colors">
                      Block Number
                    </button>
                  )}
                  {report.linked_count > 0 && (
                    <button onClick={() => viewRelated(report.phone_number)} className="px-3 py-1 bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 border border-amber-500/30 rounded text-[9px] font-bold uppercase tracking-widest transition-colors">
                      View Related
                    </button>
                  )}
                  {report.latitude && report.longitude && (
                    <button onClick={() => viewOnMap(report.latitude, report.longitude)} className="px-3 py-1 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 border border-cyan-500/30 rounded text-[9px] font-bold uppercase tracking-widest transition-colors">
                      View On Map
                    </button>
                  )}
                  <button onClick={() => toggleDetails(report.id)} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-[9px] font-bold uppercase tracking-widest transition-colors ml-auto">
                    {expandedReports[report.id] ? 'Hide Details' : 'Details'}
                  </button>
                </div>

                <div className="bg-[#0b1120] border border-slate-800 p-4 rounded-xl">
                  {report.report_type === 'chat' && report.data.summary ? (
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">{report.data.summary}</p>
                  ) : report.report_type === 'number' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {report.data.number && (
                        <div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Target Number</p>
                          <p className="text-sm text-slate-200 font-mono">{report.data.number}</p>
                        </div>
                      )}
                      {(report.data.scamType || report.data.details?.threat_type) && (
                        <div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Threat Type</p>
                          <p className="text-xs text-slate-300 font-mono">{report.data.scamType || report.data.details?.threat_type}</p>
                        </div>
                      )}
                      {(report.data.details?.country || report.country) && (
                        <div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Origin Country</p>
                          <p className="text-xs text-slate-300 font-mono">{report.data.details?.country || report.country}</p>
                        </div>
                      )}
                      {(report.data.details?.latitude || report.latitude) ? (
                        <div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Coordinates</p>
                          <p className="text-xs text-slate-300 font-mono">
                            {report.data.details?.latitude?.toFixed(4) || report.latitude?.toFixed(4)}, {report.data.details?.longitude?.toFixed(4) || report.longitude?.toFixed(4)}
                          </p>
                        </div>
                      ) : null}
                      {report.data.description && (
                        <div className="col-span-2 md:col-span-4 mt-2 border-t border-slate-800/50 pt-3">
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Analyst Notes</p>
                          <p className="text-xs text-slate-300 font-mono leading-relaxed">{report.data.description}</p>
                        </div>
                      )}
                      {expandedReports[report.id] && (
                        <div className="col-span-2 md:col-span-4 mt-4 border-t border-slate-800/50 pt-4">
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">Raw Intelligence Data</p>
                          <pre className="text-[10px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap bg-[#050810] p-4 rounded-lg border border-slate-800/80">
                            {JSON.stringify(report, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {/* Fallback if no specific data keys found */}
                      {!report.data.number && !report.data.description && !report.data.details && (
                         <pre className="text-[10px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap col-span-2 md:col-span-4">{JSON.stringify(report.data, null, 2)}</pre>
                      )}
                    </div>
                  ) : (
                    <>
                      <pre className="text-[10px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap">{JSON.stringify(report.data, null, 2)}</pre>
                      {expandedReports[report.id] && (
                        <div className="mt-4 border-t border-slate-800/50 pt-4">
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">Raw Intelligence Data</p>
                          <pre className="text-[10px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap bg-[#050810] p-4 rounded-lg border border-slate-800/80">
                            {JSON.stringify(report, null, 2)}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
