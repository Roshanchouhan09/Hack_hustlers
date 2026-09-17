import hashlib

class AgronomistSignService:
    def generate_report_signature(self, report_id: str, agronomist_id: str) -> str:
        payload = f"{report_id}-{agronomist_id}-AGRIVISION-VERIFIED"
        return hashlib.sha256(payload.encode()).hexdigest()[:16].upper()

crypto_sign_service = AgronomistSignService()
