"""
Vercel serverless function entry point.
This file exports the FastAPI app for Vercel to use.
"""
import sys
from pathlib import Path

# Add the parent directory to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.main import app

# Export the app for Vercel
application = app