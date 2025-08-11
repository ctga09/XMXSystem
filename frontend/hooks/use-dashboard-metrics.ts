'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardMetrics {
  totalRevenue: number
  totalSales: number
  totalAffiliates: number
  averageTicket: number
  revenueChange: number
  salesChange: number
  affiliatesChange: number
  ticketChange: number
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    totalSales: 0,
    totalAffiliates: 0,
    averageTicket: 0,
    revenueChange: 0,
    salesChange: 0,
    affiliatesChange: 0,
    ticketChange: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    calculateMetrics()
  }, [])

  async function calculateMetrics() {
    try {
      // Buscar todas as vendas aprovadas
      const { data: sales } = await supabase
        .from('sales')
        .select('*')
        .eq('status', 'approved')

      if (sales) {
        // Prefer USD if available; fallback to BRL
        const totalRevenue = sales.reduce((sum, sale: any) => {
          const usd = sale.amount_usd
          if (usd != null) return sum + Number(usd)
          return sum + Number(sale.price)
        }, 0)
        const totalSales = sales.length
        const uniqueAffiliates = new Set(sales.map(s => s.affiliate_code).filter(Boolean))
        const totalAffiliates = uniqueAffiliates.size
        const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0

        setMetrics({
          totalRevenue,
          totalSales,
          totalAffiliates,
          averageTicket,
          // TODO: Calcular mudanças comparando com período anterior
          revenueChange: 12.5,
          salesChange: 8.2,
          affiliatesChange: 15.3,
          ticketChange: -3.1
        })
      }
    } catch (error) {
      console.error('Error calculating metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  return { metrics, loading, refetch: calculateMetrics }
}