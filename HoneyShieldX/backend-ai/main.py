import os
import logging
import requests
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="AI Image Detector", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Configuration
API_KEY = os.getenv("GOOGLE_API_KEY")
HF_API_URL = "https://api-inference.huggingface.co/models/dillfrescott/ai-generated-detector"

if not API_KEY:
    logger.warning("⚠️ GOOGLE_API_KEY not found in environment variables. Image detection will fail.")


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "AI Image Detector"}


@app.post("/api/v1/detect-image")
async def detect_image(file: UploadFile = File(...)):
    """
    Analyze an image to detect if it's AI-generated or authentic.
    
    Args:
        file: Image file (multipart/form-data)
    
    Returns:
        JSON response with classification and confidence score
    """
    try:
        # Validate file is an image
        if not file.content_type.startswith("image/"):
            logger.error(f"❌ Invalid file type: {file.content_type}")
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image file
        contents = await file.read()
        
        logger.info(f"✓ Image loaded: {file.filename} ({len(contents)} bytes)")
        
        # Call Hugging Face API
        if not API_KEY:
            logger.error("❌ GOOGLE_API_KEY not configured")
            raise HTTPException(status_code=500, detail="Service not properly configured")
        
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "x-wait-for-model": "true"
        }
        image_data = contents
        
        logger.info(f"🔄 Sending image to Hugging Face API: {HF_API_URL}")
        
        response = requests.post(HF_API_URL, headers=headers, data=image_data)
        
        # NEW: This will force your terminal to print the real error
        if response.status_code != 200:
            print("--- API ERROR DETAILS ---")
            print(f"Status Code: {response.status_code}")
            print(f"Response Text: {response.text}")
            print("-------------------------")
        
        hf_result = response.json()
        logger.info(f"✓ Hugging Face API response: {hf_result}")
        
        # Parse Hugging Face response
        # Expected format: [{"label": "AI", "score": 0.95}, {"label": "real", "score": 0.05}]
        if isinstance(hf_result, list) and len(hf_result) > 0:
            predictions = hf_result
            
            # Find highest confidence prediction
            top_prediction = max(predictions, key=lambda x: x.get("score", 0))
            label = top_prediction.get("label", "unknown").lower()
            confidence = round(top_prediction.get("score", 0) * 100, 2)
            
            # Map label to classification
            if "ai" in label or "fake" in label:
                classification = "AI-Generated"
            elif "real" in label or "authentic" in label or "human" in label:
                classification = "Authentic"
            else:
                classification = label.capitalize()
            
            # Log confidence score
            logger.info(f"🎯 SCAN RESULT - Classification: {classification}, Confidence: {confidence}%")
            
            return JSONResponse(
                status_code=200,
                content={
                    "classification": classification,
                    "confidence_score": confidence,
                    "detailed_predictions": predictions
                }
            )
        else:
            logger.error(f"❌ Unexpected Hugging Face response format: {hf_result}")
            raise HTTPException(status_code=500, detail="Unexpected API response format")
    
    except requests.exceptions.Timeout:
        logger.error("❌ Hugging Face API timeout (30 seconds)")
        raise HTTPException(status_code=504, detail="Hugging Face API timeout")
    
    except requests.exceptions.ConnectionError:
        logger.error("❌ Failed to connect to Hugging Face API")
        raise HTTPException(status_code=503, detail="Unable to reach Hugging Face API")
    
    except requests.exceptions.HTTPError as e:
        logger.error(f"❌ Hugging Face API error: {e.response.status_code} - {e.response.text}")
        raise HTTPException(status_code=e.response.status_code, detail="Hugging Face API error")
    
    except Exception as e:
        logger.error(f"❌ Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


if __name__ == "__main__":
    logger.info("🚀 Starting AI Image Detector Service on http://127.0.0.1:8002")
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)
