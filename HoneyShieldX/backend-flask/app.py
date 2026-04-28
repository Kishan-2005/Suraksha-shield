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
