import re

def clean_imports(content):
    content = content.replace("export default function", "function")
    content = re.sub(r"import\s+.*?from\s+['\"].*?['\"];?\n?", "", content)
    return content

def build_standalone():
    with open("frontend/src/components/IdentityRiskAnalyzer.jsx", "r", encoding="utf-8") as f:
        identity = clean_imports(f.read())

    with open("frontend/src/components/ReportsDashboard.jsx", "r", encoding="utf-8") as f:
        reports = clean_imports(f.read())

    with open("frontend/src/components/EDIEngine.jsx", "r", encoding="utf-8") as f:
        edi = clean_imports(f.read())

    with open("frontend/src/components/NudgeSystem.jsx", "r", encoding="utf-8") as f:
        nudge = clean_imports(f.read())

    with open("frontend/src/components/Login.jsx", "r", encoding="utf-8") as f:
        login = clean_imports(f.read())

    with open("frontend/src/components/Register.jsx", "r", encoding="utf-8") as f:
        register = clean_imports(f.read())

    with open("frontend/src/components/MainDashboard.jsx", "r", encoding="utf-8") as f:
        dashboard = clean_imports(f.read())

    with open("frontend/src/components/UserProfile.jsx", "r", encoding="utf-8") as f:
        profile = clean_imports(f.read())


    with open("frontend/src/App.jsx", "r", encoding="utf-8") as f:
        app = clean_imports(f.read())


    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HoneyShield X - AI Scam Detection</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <style>
    @keyframes fade-in {{
      from {{ opacity: 0; transform: translateY(10px); }}
      to {{ opacity: 1; transform: translateY(0); }}
    }}
    .animate-fade-in {{ animation: fade-in 0.5s ease-out forwards; }}
    
    @keyframes scanline {{
      0% {{ top: 0; opacity: 0; }}
      10% {{ opacity: 1; }}
      90% {{ opacity: 1; }}
      100% {{ top: 100%; opacity: 0; }}
    }}
    .animate-scanline {{ animation: scanline 2.5s ease-in-out infinite; }}
    
    @keyframes shake {{
      0%, 100% {{ transform: translateX(0); }}
      10%, 30%, 50%, 70%, 90% {{ transform: translateX(-5px); }}
      20%, 40%, 60%, 80% {{ transform: translateX(5px); }}
    }}
    .animate-shake {{ animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }}
    
    .glass-panel {{
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }}
    .neon-border-red {{ box-shadow: 0 0 15px rgba(220,38,38,0.5), inset 0 0 10px rgba(220,38,38,0.2); }}
    .neon-border-cyan {{ box-shadow: 0 0 15px rgba(6,182,212,0.5), inset 0 0 10px rgba(6,182,212,0.2); }}
    .neon-text-cyan {{ text-shadow: 0 0 10px rgba(6,182,212,0.6); }}
  </style>

  <script type="importmap">
    {{
      "imports": {{
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "lucide-react": "https://esm.sh/lucide-react@0.294.0"
      }}
    }}
  </script>
</head>
<body class="bg-[#020617] text-white">
  <div id="root"></div>

  <script type="text/babel" data-type="module">
    import React, {{ useState, useEffect, useRef }} from 'react';
    import {{ createRoot }} from 'react-dom/client';
    import * as Lucide from 'lucide-react';
    
    // Auto map all lucide icons to global scope for easy use
    const {{
      Shield, AlertTriangle, Phone, User, MessageCircle, Activity, LayoutDashboard,
      FileText, PhoneOff, Menu, Bell, Download, Play, Pause, FastForward,
      Cpu, Zap, Eye, Crosshair, Fingerprint, MapPin, BarChart2, CheckCircle2, CheckCircle, ScanLine,
      Lock, Globe, Database, BrainCircuit, ActivitySquare, UploadCloud, Image: ImageIcon, Scan, ShieldAlert,
      Share2, Heart, Clock, DollarSign, Unlock, TrendingUp, XOctagon, StopCircle, UserX, MessageSquare,
      Mail, ArrowRight, UserPlus, ArrowLeft, Key, CreditCard, LogOut, Settings, ShieldCheck, Users, AlertCircle, Send, X
    }} = Lucide;

{identity}
{reports}
{edi}
{nudge}
{login}
{register}
{dashboard}
{profile}
{app}

    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
"""

    with open("standalone_demo.html", "w", encoding="utf-8") as f:
        f.write(html)

build_standalone()
