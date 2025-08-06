'use client'

import { useEffect, useState } from 'react'
import { supabase, type Sale } from '@/lib/supabase'

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSales()
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('sales-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sales' },
        () => fetchSales()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchSales() {
    try {
      console.log('Fetching sales from Supabase...')
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      console.log('Sales data received:', data)
      setSales(data || [])
    } catch (error: any) {
      console.error('Error fetching sales:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sales, loading, error, refetch: fetchSales }
}