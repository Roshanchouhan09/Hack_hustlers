import time
import os
from fastapi import APIRouter
from app.database.session import engine

router = APIRouter(tags=["System Health"])

@router.get("/health")
def health_check():
    """
    Liveness probe returning system uptime and process status.
    """
    return {
        "status": "healthy",
        "service": "agrivision-backend",
        "timestamp": int(time.time()),
        "python_env": "production" if os.getenv("ENVIRONMENT") == "production" else "development"
    }

@router.get("/ready")
def readiness_probe():
    """
    Readiness probe verifying database connectivity.
    """
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        db_status = "CONNECTED"
    except Exception as e:
        db_status = f"ERROR: {str(e)}"

    return {
        "ready": db_status == "CONNECTED",
        "database": db_status,
        "static_dir": os.path.exists("./static")
    }
