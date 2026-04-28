# AI Image Detection Backend

FastAPI service for detecting AI-generated vs authentic images using Hugging Face inference API.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend-ai
pip install -r requirements.txt
```

### 2. Configure Environment Variables
```bash
# Copy the template
cp .env.template .env

# Edit .env and add your Hugging Face API token
# Get your token from: https://huggingface.co/settings/tokens
```

### 3. Start the Server
```bash
python main.py
```

The server will start on `http://127.0.0.1:8001`

## API Endpoints

### Health Check
```
GET /health
```

### Detect Image (AI vs Authentic)
```
POST /api/v1/detect-image
Content-Type: multipart/form-data

Body:
  - file: <image_file>

Response:
{
  "classification": "AI-Generated" | "Authentic",
  "confidence_score": 95.3,
  "detailed_predictions": [
    {"label": "AI", "score": 0.953},
    {"label": "real", "score": 0.047}
  ]
}
```

## Features

✅ **AI Image Detection** - Uses Hugging Face's pre-trained AI detector model
✅ **CORS Enabled** - Works with frontend on localhost:5173
✅ **Comprehensive Logging** - Every scan logs confidence scores to terminal
✅ **Error Handling** - Graceful failures for API timeouts/connection issues
✅ **Image Validation** - Validates file type and image integrity
✅ **Security** - API key stored in environment variables (never hardcoded)

## Logging Output

Example terminal output during image scan:
```
2024-01-15 10:45:23,123 - INFO - ✓ Image loaded: JPEG (1024x768)
2024-01-15 10:45:23,456 - INFO - 🔄 Sending image to Hugging Face API: https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector
2024-01-15 10:45:26,789 - INFO - ✓ Hugging Face API response: [{"label": "AI", "score": 0.95}, {"label": "real", "score": 0.05}]
2024-01-15 10:45:26,790 - INFO - 🎯 SCAN RESULT - Classification: AI-Generated, Confidence: 95.0%
```

## Error Handling

- **Invalid file type**: Returns 400 with error message
- **Corrupted image**: Returns 400 with error message
- **API timeout**: Returns 504 with timeout message
- **Connection error**: Returns 503 with connection error message
- **Missing HF_TOKEN**: Returns 500 with configuration error

## Architecture

```
backend-ai/
├── main.py           # FastAPI application
├── requirements.txt  # Python dependencies
├── .env.template     # Environment variable template
├── .env              # Your actual environment (git-ignored)
└── .gitignore        # Git ignore rules
```

## Notes

- The service communicates with Hugging Face's inference API (requires internet)
- First request to a model may take longer as it warms up
- Keep your HF_TOKEN confidential and never commit .env to git
