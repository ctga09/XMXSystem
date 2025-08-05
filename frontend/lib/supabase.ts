import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para a tabela sales
export interface Sale {
  id: string
  cartpanda_id: string
  customer_email: string
  customer_name: string
  product_name: string
  product_id: string
  price: number
  currency: string
  status: 'approved' | 'refunded' | 'cancelled'
  affiliate_code?: string
  affiliate_name?: string
  commission_value?: number
  payment_method: string
  transaction_id: string
  webhook_received_at: string
  metadata?: any
  created_at: string
  updated_at: string
}