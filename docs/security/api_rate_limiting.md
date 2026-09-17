# API Rate Limiting & DoS Mitigation

180 requests/minute per client IP using in-memory sliding window queue. Exceeding requests trigger HTTP 429 Too Many Requests with retry-after hints.
