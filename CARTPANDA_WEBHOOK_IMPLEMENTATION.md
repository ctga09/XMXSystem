# CartPanda Webhook Implementation Guide

## 📋 Overview

This guide details the complete implementation of a webhook system to receive real-time sales data from CartPanda and store it in Supabase, using Python with FastAPI deployed on Vercel.

## 🏗️ Architecture

```
CartPanda → Webhook → Vercel Function (FastAPI) → Supabase Database → Next.js Frontend
```

## 🚀 Quick Start

### Prerequisites
- macOS with Homebrew
- Node.js 18+ (for Vercel CLI)
- Supabase project with MCP configured
- CartPanda account with webhook access
- Vercel account

### Installation Steps

1. **Install Python**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3.11
brew install python@3.11

# Verify installation
python3 --version
```

2. **Setup Backend Environment**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

3. **Install Dependencies**
```bash
pip install fastapi uvicorn[standard] supabase python-dotenv pydantic httpx
pip freeze > requirements.txt
```

## 📁 Project Structure

```
backend/
├── api/
│   ├── __init__.py
│   └── index.py          # Vercel entry point
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI application
│   ├── models.py         # Pydantic models
│   ├── database.py       # Supabase connection
│   ├── webhooks.py       # Webhook handlers
│   └── utils.py          # Helper functions
├── .env.local            # Local environment variables
├── .env.example          # Environment template
├── requirements.txt      # Python dependencies
└── vercel.json          # Vercel configuration
```

## 🗄️ Database Schema

### Sales Table
```sql
CREATE TABLE sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cartpanda_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_id TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT NOT NULL,
  affiliate_code TEXT,
  affiliate_name TEXT,
  commission_value DECIMAL(10,2),
  payment_method TEXT,
  transaction_id TEXT,
  webhook_received_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_sales_customer_email ON sales(customer_email);
CREATE INDEX idx_sales_affiliate_code ON sales(affiliate_code);
CREATE INDEX idx_sales_created_at ON sales(created_at DESC);
CREATE INDEX idx_sales_status ON sales(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sales_updated_at BEFORE UPDATE
    ON sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🔧 Implementation Details

### Environment Variables
```bash
# .env.local
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
CARTPANDA_WEBHOOK_SECRET=your_webhook_secret
ENVIRONMENT=development
```

### Webhook Payload Structure (CartPanda)
```json
{
  "id": "12345",
  "type": "sale.approved",
  "data": {
    "sale_id": "SALE_12345",
    "customer": {
      "email": "customer@example.com",
      "name": "John Doe"
    },
    "product": {
      "id": "PROD_123",
      "name": "Product Name",
      "price": 99.90
    },
    "affiliate": {
      "code": "AFF123",
      "name": "Affiliate Name",
      "commission": 29.97
    },
    "payment": {
      "method": "credit_card",
      "transaction_id": "TRX_12345",
      "status": "approved"
    },
    "created_at": "2024-01-05T10:30:00Z"
  }
}
```

### API Endpoints

#### POST /webhook/cartpanda
Receives webhook notifications from CartPanda.

**Headers:**
- `X-CartPanda-Signature`: HMAC signature for validation
- `Content-Type`: application/json

**Response:**
- 200: Success
- 400: Bad Request (invalid payload)
- 401: Unauthorized (invalid signature)
- 500: Internal Server Error

#### GET /health
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-05T10:30:00Z"
}
```

## 🚀 Deployment

### Vercel Configuration
```json
// vercel.json
{
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ],
  "env": {
    "PYTHON_VERSION": "3.11"
  }
}
```

### Deploy Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
cd backend
vercel --prod

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_KEY
vercel env add CARTPANDA_WEBHOOK_SECRET
```

## 🧪 Testing

### Local Testing
```bash
# Run locally
uvicorn app.main:app --reload --port 8000

# Test webhook endpoint
curl -X POST http://localhost:8000/webhook/cartpanda \
  -H "Content-Type: application/json" \
  -H "X-CartPanda-Signature: test_signature" \
  -d '{"type": "sale.approved", "data": {...}}'
```

### Using ngrok for External Testing
```bash
# Install ngrok
brew install ngrok

# Expose local server
ngrok http 8000

# Use the ngrok URL in CartPanda webhook configuration
```

## 🔍 Monitoring & Debugging

### Vercel Logs
```bash
vercel logs --follow
```

### Supabase Logs
Check the Supabase dashboard for:
- Database query logs
- Row-level security logs
- Function execution logs

### Error Handling
The API implements comprehensive error handling:
- Webhook signature validation
- Duplicate sale prevention
- Retry logic for database operations
- Detailed error logging

## 📱 Frontend Integration

### Fetch Sales Data
```typescript
// hooks/useSales.ts
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function useSales() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSales()
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('sales_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sales' },
        payload => {
          fetchSales()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error) {
      setSales(data || [])
    }
    setLoading(false)
  }

  return { sales, loading, refetch: fetchSales }
}
```

## 🔒 Security Considerations

1. **Webhook Signature Validation**: Always validate the webhook signature to ensure requests come from CartPanda
2. **Environment Variables**: Never commit sensitive keys to version control
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Input Validation**: Validate all incoming data with Pydantic models
5. **Error Messages**: Don't expose sensitive information in error responses

## 📚 Additional Resources

- [CartPanda Webhook Documentation](https://docs.cartpanda.com/webhooks)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vercel Python Runtime](https://vercel.com/docs/runtimes/python)
- [Supabase Python Client](https://supabase.com/docs/reference/python/introduction)

## 🆘 Troubleshooting

### Common Issues

1. **Webhook not receiving data**
   - Check Vercel function logs
   - Verify webhook URL in CartPanda
   - Ensure environment variables are set

2. **Database connection errors**
   - Verify Supabase credentials
   - Check network connectivity
   - Review Supabase connection limits

3. **Signature validation failing**
   - Ensure webhook secret matches
   - Check for encoding issues
   - Verify signature algorithm

### Support

For issues specific to:
- **CartPanda**: support@cartpanda.com
- **Vercel**: vercel.com/support
- **Supabase**: supabase.com/support

## 📈 Next Steps

1. Implement webhook retry logic
2. Add webhook event filtering
3. Create admin dashboard for webhook monitoring
4. Implement data export functionality
5. Add analytics and reporting features