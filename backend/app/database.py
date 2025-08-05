import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import Optional, Dict, Any
import logging

# Load environment variables
load_dotenv('.env.local')

logger = logging.getLogger(__name__)


class SupabaseClient:
    _instance: Optional[Client] = None
    
    @classmethod
    def get_client(cls) -> Client:
        if cls._instance is None:
            url = os.environ.get("SUPABASE_URL")
            key = os.environ.get("SUPABASE_KEY")
            
            if not url or not key:
                raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY environment variables")
            
            cls._instance = create_client(url, key)
            logger.info("Supabase client initialized")
        
        return cls._instance


async def insert_sale(sale_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a new sale into the database.
    Handles duplicate key errors gracefully.
    """
    try:
        client = SupabaseClient.get_client()
        
        # Try to insert the sale
        result = client.table('sales').insert(sale_data).execute()
        
        if result.data:
            logger.info(f"Sale inserted successfully: {sale_data['cartpanda_id']}")
            return result.data[0]
        else:
            logger.error(f"Failed to insert sale: {result}")
            raise Exception("Failed to insert sale")
            
    except Exception as e:
        # Check if it's a duplicate key error
        if "duplicate key" in str(e).lower():
            logger.warning(f"Duplicate sale detected: {sale_data['cartpanda_id']}")
            # Fetch and return the existing record
            existing = client.table('sales').select("*").eq('cartpanda_id', sale_data['cartpanda_id']).execute()
            if existing.data:
                return existing.data[0]
        
        logger.error(f"Error inserting sale: {str(e)}")
        raise


async def get_sale_by_cartpanda_id(cartpanda_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a sale by its CartPanda ID.
    """
    try:
        client = SupabaseClient.get_client()
        result = client.table('sales').select("*").eq('cartpanda_id', cartpanda_id).execute()
        
        if result.data:
            return result.data[0]
        return None
        
    except Exception as e:
        logger.error(f"Error fetching sale: {str(e)}")
        return None


async def update_sale_status(cartpanda_id: str, status: str) -> Optional[Dict[str, Any]]:
    """
    Update the status of a sale.
    """
    try:
        client = SupabaseClient.get_client()
        result = client.table('sales').update({'status': status}).eq('cartpanda_id', cartpanda_id).execute()
        
        if result.data:
            logger.info(f"Sale status updated: {cartpanda_id} -> {status}")
            return result.data[0]
        return None
        
    except Exception as e:
        logger.error(f"Error updating sale status: {str(e)}")
        return None