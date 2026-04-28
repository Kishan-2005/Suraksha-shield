import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# ========================================
# BACKEND - FLASK
# ========================================
create_file("backend-flask/app.py", """
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze-profile', methods=['POST'])
def analyze_profile():
    return jsonify({
        "risk_score": 88,
        "risk_level": "High Risk",
        "ai_probability": 92,
        "consistency": "Low Consistency",
        "reverse_match": "Match Found ⚠️",
        "visual_suspicion": ["Too perfect face", "Low background variation", "Stock image detected"],
        "trust_score": 12
    })

@app.route('/analyze-chat', methods=['POST'])
def analyze_chat():
    return jsonify({
        "risk_score": 82,
        "risk_level": "High",
        "summary": "The conversation shows progressive emotional bonding followed by an urgent financial request.",
        "patterns": [
            {"type": "Emotional Manipulation", "confidence": 87, "example": "I feel like you're the only one..."},
            {"type": "Urgency", "confidence": 92, "example": "I need help right now"}
        ],
        "timeline": ["Initial Contact", "Emotional Bonding", "Trust Building", "Financial Request"],
        "evidence": [
            {"message": "Can you send money urgently?", "flagged_words": ["send money", "urgently"]}
        ],
        "ai_explanation": "This follows a known honey trap scam pattern."
    })

@app.route('/analyze-dependency', methods=['POST'])
def analyze_dependency():
    return jsonify({
        "edi_score": 91,
        "risk_level": "CRITICAL",
        "dependency_growth_velocity": 88,
        "love_bombing_score": 93,
        "isolation_pressure_score": 84,
        "emotional_replacement_score": 89,
        "financial_exploitation_correlation": 95,
        "summary": "Rapid emotional dependency formation followed by isolation tactics and financial exploitation progression.",
        "timeline": ["Initial Contact", "Emotional Bonding", "Trust Formation", "Isolation Attempts", "Financial Exploitation"],
        "future_prediction": "High probability of financial extraction attempt within upcoming interactions.",
        "ai_explanation": "Accelerated emotional dependency formation combined with isolation manipulation."
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
""")

create_file("backend-flask/requirements.txt", "flask\nflask-cors\n")

# ========================================
# BACKEND - NODE.JS
# ========================================
create_file("backend-node/server.js", """
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze-profile', (req, res) => {
    res.json({
        risk_score: 88,
        risk_level: "High Risk",
        ai_probability: 92,
        consistency: "Low Consistency",
        reverse_match: "Match Found ⚠️",
        visual_suspicion: ["Too perfect face", "Low background variation", "Stock image detected"],
        trust_score: 12
    });
});

app.post('/analyze-chat', (req, res) => {
    res.json({
        risk_score: 82,
        risk_level: "High",
        summary: "The conversation shows progressive emotional bonding followed by an urgent financial request.",
        patterns: [
            {type: "Emotional Manipulation", confidence: 87, example: "I feel like you're the only one..."},
            {type: "Urgency", confidence: 92, example: "I need help right now"}
        ],
        timeline: ["Initial Contact", "Emotional Bonding", "Trust Building", "Financial Request"],
        evidence: [
            {message: "Can you send money urgently?", flagged_words: ["send money", "urgently"]}
        ],
        ai_explanation: "This follows a known honey trap scam pattern."
    });
});

app.post('/analyze-dependency', (req, res) => {
    res.json({
        edi_score: 91,
        risk_level: "CRITICAL",
        dependency_growth_velocity: 88,
        love_bombing_score: 93,
        isolation_pressure_score: 84,
        emotional_replacement_score: 89,
        financial_exploitation_correlation: 95,
        summary: "Rapid emotional dependency formation followed by isolation tactics.",
        timeline: ["Initial Contact", "Emotional Bonding", "Trust Formation", "Isolation Attempts", "Financial Exploitation"],
        future_prediction: "High probability of financial extraction attempt within upcoming interactions.",
        ai_explanation: "Accelerated emotional dependency formation combined with isolation manipulation."
    });
});

app.listen(3000, () => console.log('Node Server running on port 3000'));
""")

create_file("backend-node/package.json", """
{
  "name": "honeyshield-backend",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
""")

# ========================================
# FRONTEND CONFIG FILES
# ========================================
create_file("frontend/package.json", """
{
  "name": "honeyshieldx-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^5.0.0"
  }
}
""")

create_file("frontend/vite.config.js", """
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
""")

create_file("frontend/tailwind.config.js", """
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#020617',
          blue: '#1e3a8a',
          cyan: '#06b6d4',
          red: '#dc2626',
          green: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
""")

create_file("frontend/postcss.config.js", """
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
""")

create_file("frontend/index.html", """
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HoneyShield X</title>
  </head>
  <body class="bg-[#020617] text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
""")

create_file("frontend/src/index.css", """
@tailwind base;
@tailwind components;
@tailwind utilities;

.glass-panel {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.neon-border-red { box-shadow: 0 0 15px rgba(220,38,38,0.5), inset 0 0 10px rgba(220,38,38,0.2); }
.neon-border-cyan { box-shadow: 0 0 15px rgba(6,182,212,0.5), inset 0 0 10px rgba(6,182,212,0.2); }
.neon-text-cyan { text-shadow: 0 0 10px rgba(6,182,212,0.6); }

@keyframes scanline {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.animate-scanline { animation: scanline 2s linear infinite; }
""")

create_file("frontend/src/main.jsx", """
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""")

print("Project generated successfully.")
