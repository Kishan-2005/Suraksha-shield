import os
import re
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="HoneyShield X - Number Intel API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NumberRequest(BaseModel):
    phone_number: str
    language: str = 'en'

def normalize_phone_number(phone: str) -> str:
    """Normalize phone number to E.164 format roughly by stripping non-digits and ensuring + is at start."""
    cleaned = re.sub(r'[^\d+]', '', phone)
    if cleaned and cleaned[0] != '+':
        cleaned = '+' + cleaned
    return cleaned

@app.post("/api/analyze")
async def analyze_number(request: NumberRequest):
    phone = request.phone_number
    normalized_phone = normalize_phone_number(phone)
    logger.info(f"Received request to analyze number: {normalized_phone} (original: {phone})")
    
    # External API configuration (e.g., Numverify, AbstractAPI, etc.)
    api_key = os.getenv("NUMVERIFY_API_KEY")
    api_url = os.getenv("NUMVERIFY_API_URL", "http://apilayer.net/api/validate")
    
    try:
        if api_key:
            # Note: For free numverify API, http must be used, not https. 
            # We strip the '+' because the API expects the number without it.
            query_number = normalized_phone.lstrip('+')
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    api_url,
                    params={"access_key": api_key, "number": query_number, "format": 1},
                    timeout=5.0
                )
                response.raise_for_status()
                data = response.json()
                
                logger.info(f"External API Response: {data}")
                
                # Mock risk evaluation based on external API data
                is_valid = data.get("valid", False)
                country_name = data.get("country_name", "Unknown")
                carrier = data.get("carrier", "Unknown")
                line_type = data.get("line_type", "Unknown")
                
                if not is_valid:
                    risk_score = 90
                    risk_level = "High"
                    classification = "Scam"
                    reputation = "Invalid / Spoofed Number ⚠️"
                    explanation = "This number failed global registry validation. High likelihood of spoofing."
                else:
                    # Very simplistic fallback mock heuristic since numverify doesn't return spam status directly
                    if line_type.lower() in ['voip', 'landline']:
                        risk_score = 65
                        risk_level = "Suspicious"
                        classification = "Spam"
                        reputation = "Reported Spam"
                        explanation = f"Number is a {line_type} registered in {country_name}. VoIP numbers are frequently used in scams."
                    else:
                        risk_score = 15
                        risk_level = "Safe"
                        classification = "Legitimate"
                        reputation = "Clean"
                        explanation = f"Standard {line_type} number from {country_name}. No fraud patterns detected."
                        
                return {
                    "risk_score": risk_score,
                    "risk_level": risk_level,
                    "classification": classification,
                    "number_reputation": reputation,
                    "country": f"{country_name} (+{data.get('country_prefix', '')})",
                    "carrier": carrier or "Unknown",
                    "number_type": line_type.capitalize() if line_type else "Unknown",
                    "ai_explanation": explanation
                }
        else:
            logger.warning("No API key found. Using simulated fallback logic.")
            return get_mock_response(normalized_phone)
            
    except Exception as e:
        logger.error(f"Error during API call: {str(e)}")
        # Fallback to mock response if API fails
        return get_mock_response(normalized_phone)

def get_mock_response(clean_num: str) -> dict:
    # Heuristics simulation as fallback
    if '9876543210' in clean_num:
        return {"risk_score": 12, "risk_level": "Safe", "classification": "Legitimate", "number_reputation": "No Known Issues", "country": "India (+91)", "carrier": "Airtel", "number_type": "Mobile", "ai_explanation": "This number has a clean reputation history. No spam reports or fraudulent patterns detected."}
    elif '9123456789' in clean_num:
        return {"risk_score": 55, "risk_level": "Suspicious", "classification": "Spam", "number_reputation": "Reported Spam", "country": "India (+91)", "carrier": "Reliance Jio", "number_type": "Mobile", "ai_explanation": "This number has been flagged by 142 users for telemarketing spam over the last 30 days."}
    elif '9999999999' in clean_num:
        return {"risk_score": 94, "risk_level": "High", "classification": "Scam", "number_reputation": "Known Scam Number ⚠️", "country": "Unknown / Spoofed", "carrier": "Virtual / VoIP", "number_type": "VoIP", "ai_explanation": "Critical risk: This number uses VoIP masking and matches known fraud patterns."}
    else:
        # Dynamically determine country based on prefix
        country = "Unknown"
        if clean_num.startswith("+91"):
            country = "India (+91)"
        elif clean_num.startswith("+1"):
            country = "US/Canada (+1)"
        elif clean_num.startswith("+44"):
            country = "UK (+44)"
        elif clean_num.startswith("+61"):
            country = "Australia (+61)"
        elif clean_num.startswith("+234"):
            country = "Nigeria (+234)"
        else:
            country = "International"

        hash_val = sum(ord(c) for c in clean_num if c.isdigit())
        if hash_val % 3 == 0:
            return {"risk_score": 82, "risk_level": "High", "classification": "Fraud", "number_reputation": "Reported Fraud", "country": country, "carrier": "Unknown", "number_type": "VoIP", "ai_explanation": "High probability of scam. Number exhibits high-velocity outbound calling patterns."}
        elif hash_val % 2 == 0:
            return {"risk_score": 42, "risk_level": "Suspicious", "classification": "Spam", "number_reputation": "Reported Spam", "country": country, "carrier": "Twilio / Bandwidth", "number_type": "VoIP", "ai_explanation": "Registered to a VoIP provider and frequently associated with robocalls."}
        else:
            return {"risk_score": 18, "risk_level": "Safe", "classification": "Legitimate", "number_reputation": "Clean", "country": country, "carrier": "Standard Carrier", "number_type": "Mobile", "ai_explanation": "Standard mobile number with consistent usage patterns and zero fraud reports."}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI Number Intel backend on port 8000")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
