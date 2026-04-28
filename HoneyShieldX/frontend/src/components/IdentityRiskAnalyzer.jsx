import React, { useState, useRef } from 'react';
import { UploadCloud, Scan, CheckCircle, AlertTriangle, ShieldAlert, User, Cpu, X } from 'lucide-react';

export default function IdentityRiskAnalyzer({ demoMode }) {
  const [images, setImages] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 4)); // Max 4 images
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
    
    // Simulate API call delay
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        aiProb: 94,
        consistency: "Low Consistency",
        reverseMatch: "Match Found ⚠️",
        visualSuspicion: ["Too perfect face", "StyleGAN Artifacts", "Stock Image Detected"],
        riskScore: 88
      });
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-cyan-400" /> Target Profile
          </h2>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            multiple 
            className="hidden" 
          />

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
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                      className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                    {analyzing && <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-scanline shadow-[0_0_15px_rgba(6,182,212,1)]"></div>}
                  </div>
                ))}
                {images.length < 4 && (
                  <div className="border border-dashed border-slate-600 rounded-lg flex items-center justify-center h-32 text-slate-500 hover:text-slate-300">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8">
                <UploadCloud className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <p className="font-bold text-slate-300 mb-1">Click or Drag Images Here</p>
                <p className="text-xs text-slate-500 font-mono">Upload 1-4 images for analysis</p>
              </div>
            )}
          </div>

          <button 
            onClick={runAnalysis}
            disabled={images.length === 0 || analyzing}
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white py-3 rounded-xl uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex justify-center items-center gap-2"
          >
            {analyzing ? <Scan className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
            {analyzing ? 'Scanning Profile...' : 'Analyze Profile'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-7">
        {analyzing && (
          <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 h-full flex flex-col justify-center">
            <h3 className="text-cyan-400 font-mono text-sm mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-pulse" /> PROCESSING BIOMETRICS
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-500" /> Extracting facial geometry...</div>
              <div className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-500" /> Running StyleGAN detection models...</div>
              <div className="flex items-center gap-3 text-slate-300"><Scan className="w-4 h-4 text-cyan-500 animate-spin" /> Cross-referencing 4.2B known scammer images...</div>
              <div className="flex items-center gap-3 text-slate-500"><Activity className="w-4 h-4" /> Calculating identity consistency...</div>
            </div>
          </div>
        )}

        {results && !analyzing && (
          <div className="glass-panel rounded-2xl border-2 border-red-500/50 neon-border-red overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]"></div>
            
            <div className="bg-red-950/40 p-4 border-b border-red-900/50 flex justify-between items-center">
              <h3 className="font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Threat Detected
              </h3>
              <div className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                HIGH RISK
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8 relative z-10">
              <div className="flex flex-col sm:flex-row gap-8 items-center border-b border-slate-800 pb-8">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path fill="none" stroke="#1e293b" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray={`${results.riskScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.8))' }} />
                  </svg>
                  <div className="absolute text-center flex flex-col items-center">
                    <span className="text-4xl font-black text-red-500">{results.riskScore}</span>
                    <span className="text-[9px] uppercase tracking-widest text-red-400 font-mono mt-1">Risk Score</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono uppercase text-slate-400">
                      <span>AI Generated Probability</span>
                      <span className="text-red-400 font-bold">{results.aiProb}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]" style={{width: `${results.aiProb}%`}}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono uppercase text-slate-400">
                      <span>Identity Consistency</span>
                      <span className="text-amber-400 font-bold">{results.consistency}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{width: '30%'}}></div></div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Reverse Image Search</span>
                    <span className="text-xs text-red-500 font-mono font-bold bg-red-500/10 px-2 py-1 rounded">{results.reverseMatch}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Suspicious Indicators</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.visualSuspicion.map((indicator, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#0b1120] p-3 rounded-lg border border-slate-800">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center">
                <p className="text-red-400 font-bold text-sm">⚠️ This profile shows strong signs of being fake or part of a scam.</p>
                <p className="text-slate-400 text-xs mt-1">Profile Trust Score: 12%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
