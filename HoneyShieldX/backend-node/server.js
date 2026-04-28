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
