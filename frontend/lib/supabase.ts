import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

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
  // New monetary normalization fields (may be null until migration is applied)
  amount_brl?: number | null
  amount_usd?: number | null
  fx_rate_brl_usd?: number | null
  fx_at?: string | null
  fx_source?: string | null
  payment_currency?: string | null
  status: 'approved' | 'refunded' | 'cancelled'
  affiliate_code?: string
  affiliate_name?: string
  commission_value?: number
  commission_usd?: number | null
  payment_method: string
  transaction_id: string
  webhook_received_at: string
  metadata?: any
  created_at: string
  updated_at: string
}