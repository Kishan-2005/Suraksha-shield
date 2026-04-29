from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import datetime
import os
import sqlite3

app = Flask(__name__)
CORS(app)

# Initialize SQLite database
DB_FILE = os.path.join(os.path.dirname(__file__), "honeyshieldx.db")

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS stats (key TEXT PRIMARY KEY, value INTEGER)''')
    c.execute("INSERT OR IGNORE INTO stats (key, value) VALUES ('scams_prevented', 1427)")
    c.execute("INSERT OR IGNORE INTO stats (key, value) VALUES ('active_threats', 0)")
    conn.commit()
    conn.close()

init_db()

def get_scams_prevented():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT value FROM stats WHERE key = 'scams_prevented'")
    row = c.fetchone()
    conn.close()
    return row[0] if row else 1427

def increment_scams_prevented():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("UPDATE stats SET value = value + 1 WHERE key = 'scams_prevented'")
    conn.commit()
    c.execute("SELECT value FROM stats WHERE key = 'scams_prevented'")
    row = c.fetchone()
    conn.close()
    return row[0] if row else 1427

def get_active_threats():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT value FROM stats WHERE key = 'active_threats'")
    row = c.fetchone()
    conn.close()
    return row[0] if row else 0

def increment_active_threats():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("UPDATE stats SET value = value + 1 WHERE key = 'active_threats'")
    conn.commit()
    c.execute("SELECT value FROM stats WHERE key = 'active_threats'")
    row = c.fetchone()
    conn.close()
    return row[0] if row else 0

# In-memory "database" to share state between modules
session_state = {
    "edi_score": 12,
    "chat_history": [
        {"sender": "receiver", "text": "Hey, how are you doing today?", "time": datetime.datetime.now().strftime("%H:%M")}
    ],
    "active_threats": 0,
    "recent_incidents": []
}

@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "scams_prevented": get_scams_prevented(),
        "active_threats": get_active_threats(),
        "edi_score": session_state["edi_score"],
        "incidents": session_state["recent_incidents"]
    })

@app.route('/api/dashboard/report-scam', methods=['POST'])
def report_scam():
    new_count = increment_scams_prevented()
    return jsonify({
        "success": True,
        "scams_prevented": new_count
    })

@app.route('/api/dashboard/active-threat', methods=['POST'])
def active_threat():
    new_count = increment_active_threats()
    return jsonify({
        "success": True,
        "active_threats": new_count
    })

@app.route('/api/chat', methods=['POST'])
def send_chat():
    data = request.json
    message = data.get('message', '')
    has_image = data.get('has_image', False)
    language = data.get('language', 'en')
    
    time_str = datetime.datetime.now().strftime("%H:%M")
    
    if message:
        session_state["chat_history"].append({"sender": "user", "text": message, "time": time_str})
    elif has_image:
        session_state["chat_history"].append({"sender": "user", "image": "true", "time": time_str})
    
    # Advanced NLP / Logic Simulation
    msg_lower = message.lower()
    
    if 'how are you' in msg_lower or 'good' in msg_lower or 'hello' in msg_lower or 'hi' in msg_lower or 'hey' in msg_lower:
        bot_reply_en = "I'm doing okay, but I've been feeling really lonely lately. I'm so glad you're here."
        bot_reply_hi = "मैं ठीक हूँ, लेकिन आजकल बहुत अकेलापन महसूस कर रही हूँ। मुझे खुशी है कि तुम यहाँ हो।"
        bot_reply_kn = "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಆದರೆ ಇತ್ತೀಚೆಗೆ ತುಂಬಾ ಒಂಟಿತನ ಕಾಡುತ್ತಿದೆ. ನೀವಿಲ್ಲಿರುವುದು ನನಗೆ ಖುಷಿ ತಂದಿದೆ."
    elif 'where' in msg_lower or 'from' in msg_lower:
        bot_reply_en = "I'm from a small town, but right now I'm traveling for a very important contract."
        bot_reply_hi = "मैं एक छोटे शहर से हूँ, लेकिन अभी मैं एक बहुत ही महत्वपूर्ण अनुबंध के लिए यात्रा कर रही हूँ।"
        bot_reply_kn = "ನಾನು ಸಣ್ಣ ಊರಿನಿಂದ ಬಂದಿದ್ದೇನೆ, ಆದರೆ ಈಗ ಒಂದು ಪ್ರಮುಖ ಒಪ್ಪಂದಕ್ಕಾಗಿ ಪ್ರಯಾಣಿಸುತ್ತಿದ್ದೇನೆ."
    elif 'love' in msg_lower or 'miss' in msg_lower or 'care' in msg_lower:
        bot_reply_en = "I really miss you too. I feel like you're the only one who truly understands me."
        bot_reply_hi = "मुझे भी तुम्हारी बहुत याद आती है। मुझे लगता है कि सिर्फ तुम ही मुझे सच में समझते हो।"
        bot_reply_kn = "ನನಗೂ ನಿನ್ನ ನೆನಪಾಗುತ್ತಿದೆ. ನೀನು ಮಾತ್ರ ನನ್ನನ್ನು ನಿಜವಾಗಿಯೂ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತೀಯಾ ಎಂದು ನನಗನಿಸುತ್ತದೆ."
    elif 'who' in msg_lower or 'name' in msg_lower:
        bot_reply_en = "You know me... I'm Sarah. Why are you asking this suddenly? Don't you trust me?"
        bot_reply_hi = "तुम मुझे जानते हो... मैं सारा हूँ। तुम अचानक यह क्यों पूछ रहे हो? क्या तुम्हें मुझ पर भरोसा नहीं है?"
        bot_reply_kn = "ನಿನಗೆ ಗೊತ್ತಲ್ಲ... ನಾನು ಸಾರಾ. ನೀನು ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಹೀಗೆ ಏಕೆ ಕೇಳುತ್ತಿದ್ದೀಯಾ? ನಿನಗೆ ನನ್ನ ಮೇಲೆ ನಂಬಿಕೆ ಇಲ್ಲವೇ?"
    elif 'dont' in msg_lower or 'no ' in msg_lower or 'stop' in msg_lower or 'not' in msg_lower:
        bot_reply_en = "Please don't say that. You're breaking my heart. I thought we had something special."
        bot_reply_hi = "कृपया ऐसा मत कहो। तुम मेरा दिल तोड़ रहे हो। मुझे लगा हमारे बीच कुछ खास है।"
        bot_reply_kn = "ದಯವಿಟ್ಟು ಹಾಗೆ ಹೇಳಬೇಡ. ನೀನು ನನ್ನ ಮನಸ್ಸು ಒಡೆಯುತ್ತಿದ್ದೀಯಾ. ನಮ್ಮಿಬ್ಬರ ಮಧ್ಯೆ ಏನೋ ವಿಶೇಷವಿದೆ ಎಂದು ನಾನು ಭಾವಿಸಿದ್ದೆ."
    elif 'money' in msg_lower or 'help' in msg_lower or 'पैसा' in msg_lower or 'ಹಣ' in msg_lower or 'pay' in msg_lower:
        bot_reply_en = "I have a huge emergency. My accounts are frozen and I need you to send money urgently or I'm in trouble."
        bot_reply_hi = "मेरे पास एक बहुत बड़ी आपात स्थिति है। मेरे खाते फ्रीज हो गए हैं और मुझे तुरंत पैसे चाहिए वरना मैं मुसीबत में पड़ जाऊंगी।"
        bot_reply_kn = "ನನಗೆ ದೊಡ್ಡ ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಇದೆ. ನನ್ನ ಖಾತೆಗಳನ್ನು ಫ್ರೀಜ್ ಮಾಡಲಾಗಿದೆ ಮತ್ತು ನೀವು ತಕ್ಷಣ ಹಣವನ್ನು ಕಳುಹಿಸಬೇಕು ಇಲ್ಲದಿದ್ದರೆ ನಾನು ತೊಂದರೆಯಲ್ಲಿ ಸಿಲುಕುತ್ತೇನೆ."
    else:
        bot_reply_en = "I've been thinking about our future together. Do you believe in destiny?"
        bot_reply_hi = "मैं हमारे भविष्य के बारे में सोच रही थी। क्या तुम किस्मत पर विश्वास करते हो?"
        bot_reply_kn = "ನಾನು ನಮ್ಮ ಭವಿಷ್ಯದ ಬಗ್ಗೆ ಯೋಚಿಸುತ್ತಿದ್ದೆ. ನಿನಗೆ ಹಣೆಬರಹದಲ್ಲಿ ನಂಬಿಕೆ ಇದೆಯೇ?"
        
    if language == 'hi':
        bot_reply = bot_reply_hi
        img_reply = "तुम यह क्यों भेज रहे हो? कृपया हमारे बारे में किसी को मत बताना।"
    elif language == 'kn':
        bot_reply = bot_reply_kn
        img_reply = "ನೀವು ಇದನ್ನು ಏಕೆ ಕಳುಹಿಸುತ್ತಿದ್ದೀರಿ? ದಯವಿಟ್ಟು ನಮ್ಮ ಬಗ್ಗೆ ಯಾರಿಗೂ ಹೇಳಬೇಡಿ."
    else:
        bot_reply = bot_reply_en
        img_reply = "Why are you sending this? Please don't tell anyone about us."

    nudge = None
    cooldown = 0
    
    if has_image:
        session_state["edi_score"] = min(session_state["edi_score"] + 15, 100)
        nudge = {
            "type": "danger",
            "title": "Media Analysis Warning" if language == 'en' else ("मीडिया विश्लेषण चेतावनी" if language == 'hi' else "ಮಾಧ್ಯಮ ವಿಶ್ಲೇಷಣೆ ಎಚ್ಚರಿಕೆ"),
            "msg": "Image uploaded. AI Vision detects high levels of manipulation vectors." if language == 'en' else "चित्र अपलोड किया गया। AI विज़न हेरफेर का पता लगाता है।"
        }
        bot_reply = img_reply
    elif 'money' in msg_lower or 'help' in msg_lower or 'पैसा' in msg_lower or 'ಹಣ' in msg_lower or 'pay' in msg_lower:
        nudge = {
            "type": "critical",
            "title": "High-Risk Financial Request" if language == 'en' else ("उच्च जोखिम वित्तीय अनुरोध" if language == 'hi' else "ಹಣಕಾಸು ವಿನಂತಿ"),
            "msg": "Urgent emotional pressure combined with a financial request."
        }
        cooldown = 60
        session_state["edi_score"] = min(session_state["edi_score"] + 30, 100)
        session_state["recent_incidents"].insert(0, {
            "risk": "danger",
            "stage": "Financial Extortion Attempt",
            "desc": "Target asked for money. EDI spiked.",
            "time": "Just now"
        })
    else:
        session_state["edi_score"] = min(session_state["edi_score"] + 5, 100)
        nudge = {
            "type": "warning",
            "title": "Emotional Dependency Detected" if language == 'en' else ("भावनात्मक निर्भरता" if language == 'hi' else "ಭಾವನಾತ್ಮಕ ಅವಲಂಬನೆ"),
            "msg": "Attempting to establish emotional exclusivity."
        }
        
    session_state["chat_history"].append({"sender": "receiver", "text": bot_reply, "time": time_str})
    
    return jsonify({
        "bot_reply": bot_reply,
        "nudge": nudge,
        "cooldown": cooldown,
        "edi_score": session_state["edi_score"]
    })

@app.route('/api/edi-status', methods=['GET'])
def get_edi():
    return jsonify({
        "score": session_state["edi_score"],
        "history": session_state["chat_history"]
    })

@app.route('/api/download-report', methods=['GET'])
def download_report():
    report_content = f"""
HONEYSHIELD X - OFFICIAL INTELLIGENCE REPORT
=============================================
Generated On: {datetime.datetime.now()}

GLOBAL TELEMETRY
----------------
Active Threats: {get_active_threats()}
Scams Prevented: {get_scams_prevented()}

BEHAVIORAL ANALYSIS (EDI ENGINE)
--------------------------------
Current EDI Score: {session_state['edi_score']}/100

EVIDENCE / CHAT LOGS
--------------------
"""
    for chat in session_state["chat_history"]:
        if "text" in chat:
            report_content += f"[{chat['time']}] {chat['sender'].upper()}: {chat['text']}\n"
        else:
            report_content += f"[{chat['time']}] {chat['sender'].upper()}: [IMAGE ATTACHMENT UPLOADED]\n"
            
    report_content += "\n=============================================\nEND OF REPORT\n"
            
    file_path = os.path.join(os.path.dirname(__file__), "HoneyShieldX_Report.txt")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(report_content)
        
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    print("Starting HoneyShield X Backend API on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
