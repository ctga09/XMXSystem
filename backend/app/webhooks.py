from fastapi import HTTPException
from app.models import CartPandaWebhook, SaleCreate
from app.database import insert_sale, update_sale_status
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)


async def process_sale_approved(webhook_data: CartPandaWebhook) -> Dict[str, Any]:
    """
    Process a sale.approved webhook event.
    """
    try:
        # Extract data from webhook
        data = webhook_data.data
        
        # Prepare sale data for database
        sale_data = SaleCreate(
            cartpanda_id=data.sale_id,
            customer_email=data.customer.email,
            customer_name=data.customer.name,
            product_name=data.product.name,
            product_id=data.product.id,
            price=data.product.price,
            status="approved",
            affiliate_code=data.affiliate.code if data.affiliate else None,
            affiliate_name=data.affiliate.name if data.affiliate else None,
            commission_value=data.affiliate.commission if data.affiliate else None,
            payment_method=data.payment.method,
            transaction_id=data.payment.transaction_id,
            metadata={
                "webhook_id": webhook_data.id,
                "webhook_type": webhook_data.type,
                "original_created_at": data.created_at.isoformat()
            }
        )
        
        # Insert into database
        result = await insert_sale(sale_data.dict())
        
        logger.info(f"Sale approved processed: {data.sale_id}")
        return result
        
    except Exception as e:
        logger.error(f"Error processing sale.approved: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing webhook: {str(e)}")


async def process_sale_refunded(webhook_data: CartPandaWebhook) -> Dict[str, Any]:
    """
    Process a sale.refunded webhook event.
    """
    try:
        data = webhook_data.data
        
        # Update sale status to refunded
        result = await update_sale_status(data.sale_id, "refunded")
        
        if not result:
            logger.warning(f"Sale not found for refund: {data.sale_id}")
            raise HTTPException(status_code=404, detail="Sale not found")
        
        logger.info(f"Sale refunded processed: {data.sale_id}")
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing sale.refunded: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing webhook: {str(e)}")


async def process_sale_cancelled(webhook_data: CartPandaWebhook) -> Dict[str, Any]:
    """
    Process a sale.cancelled webhook event.
    """
    try:
        data = webhook_data.data
        
        # Update sale status to cancelled
        result = await update_sale_status(data.sale_id, "cancelled")
        
        if not result:
            logger.warning(f"Sale not found for cancellation: {data.sale_id}")
            raise HTTPException(status_code=404, detail="Sale not found")
        
        logger.info(f"Sale cancelled processed: {data.sale_id}")
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing sale.cancelled: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing webhook: {str(e)}")


async def process_webhook(webhook_data: CartPandaWebhook) -> Dict[str, Any]:
    """
    Main webhook processor that routes to appropriate handlers.
    """
    webhook_handlers = {
        "sale.approved": process_sale_approved,
        "sale.refunded": process_sale_refunded,
        "sale.cancelled": process_sale_cancelled,
    }
    
    handler = webhook_handlers.get(webhook_data.type)
    
    if not handler:
        logger.warning(f"Unknown webhook type: {webhook_data.type}")
        raise HTTPException(status_code=400, detail=f"Unknown webhook type: {webhook_data.type}")
    
    return await handler(webhook_data)