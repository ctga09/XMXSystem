from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.models import CartPandaWebhook
from app.webhooks import process_webhook
from app.utils import verify_webhook_signature, format_webhook_response
import logging
import os
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="XMX System Webhook API",
    description="API for receiving and processing CartPanda webhooks",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint - health check."""
    return {"status": "healthy", "service": "XMX Webhook API"}


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "environment": os.environ.get("ENVIRONMENT", "unknown"),
        "version": "1.0.0"
    }


@app.post("/webhook/cartpanda")
async def cartpanda_webhook(
    request: Request,
    x_cartpanda_signature: Optional[str] = Header(None)
):
    """
    Endpoint to receive webhooks from CartPanda.
    
    Expected webhook types:
    - sale.approved
    - sale.refunded
    - sale.cancelled
    """
    try:
        # Get raw body for signature verification
        raw_body = await request.body()
        
        # Verify webhook signature
        if os.environ.get("ENVIRONMENT") != "development":
            if not verify_webhook_signature(raw_body, x_cartpanda_signature):
                logger.warning("Invalid webhook signature")
                raise HTTPException(status_code=401, detail="Invalid signature")
        
        # Parse webhook data
        webhook_data = CartPandaWebhook.parse_raw(raw_body)
        logger.info(f"Received webhook: {webhook_data.type} - {webhook_data.id}")
        
        # Process webhook
        result = await process_webhook(webhook_data)
        
        return JSONResponse(
            content=format_webhook_response(
                success=True,
                message=f"Webhook {webhook_data.type} processed successfully",
                data={"sale_id": result.get("cartpanda_id")}
            ),
            status_code=200
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing webhook: {str(e)}")
        return JSONResponse(
            content=format_webhook_response(
                success=False,
                message=f"Error processing webhook: {str(e)}"
            ),
            status_code=500
        )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions."""
    return JSONResponse(
        content=format_webhook_response(
            success=False,
            message=exc.detail
        ),
        status_code=exc.status_code
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    logger.error(f"Unexpected error: {str(exc)}")
    return JSONResponse(
        content=format_webhook_response(
            success=False,
            message="Internal server error"
        ),
        status_code=500
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)