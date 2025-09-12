
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from catalogue.routes import router as catalogue_router
from config import BASE_DIR
import os
from datetime import datetime

app = FastAPI(
    title="VisioBiz AI Catalogue Generator",
    description="AI-powered product catalogue generation with Firebase integration",
    version="1.0.0"
)

# Mount static directory for serving generated PDFs
static_dir = os.path.join(BASE_DIR, "static")
os.makedirs(static_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(catalogue_router, prefix="/api/catalogue", tags=["Catalogue"])

@app.get("/")
async def root():
    return {
        "message": "VisioBiz AI Catalogue Generator API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)