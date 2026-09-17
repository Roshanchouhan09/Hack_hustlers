import time
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from typing import Dict, List

class SecurityRateLimiterMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests_per_minute: int = 120):
        super().__init__(app)
        self.max_requests = max_requests_per_minute
        self.request_timestamps: Dict[str, List[float]] = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        # Extract client IP
        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()

        # Remove timestamps older than 60 seconds
        self.request_timestamps[client_ip] = [
            ts for ts in self.request_timestamps[client_ip] if now - ts < 60.0
        ]

        if len(self.request_timestamps[client_ip]) >= self.max_requests:
            return Response(
                content='{"detail":"Rate limit exceeded. Maximum 120 requests per minute allowed."}',
                status_code=429,
                media_type="application/json"
            )

        self.request_timestamps[client_ip].append(now)

        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        
        # Inject standard security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Process-Time-Sec"] = f"{process_time:.4f}"
        
        return response
