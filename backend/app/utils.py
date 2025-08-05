import hmac
import hashlib
import os
from typing import Optional
import logging

logger = logging.getLogger(__name__)


def verify_webhook_signature(payload: bytes, signature: Optional[str]) -> bool:
    """
    Verify the webhook signature from CartPanda.
    
    Args:
        payload: The raw request body
        signature: The signature from the X-CartPanda-Signature header
        
    Returns:
        True if signature is valid, False otherwise
    """
    if not signature:
        logger.warning("No signature provided in webhook request")
        return False
    
    secret = os.environ.get("CARTPANDA_WEBHOOK_SECRET")
    if not secret:
        logger.error("CARTPANDA_WEBHOOK_SECRET not configured")
        return False
    
    # Calculate expected signature
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    # Compare signatures in a timing-safe manner
    is_valid = hmac.compare_digest(signature, expected_signature)
    
    if not is_valid:
        logger.warning("Invalid webhook signature")
    
    return is_valid


def format_webhook_response(success: bool, message: str, data: Optional[dict] = None) -> dict:
    """
    Format a standardized webhook response.
    """
    response = {
        "success": success,
        "message": message
    }
    
    if data:
        response["data"] = data
    
    return response