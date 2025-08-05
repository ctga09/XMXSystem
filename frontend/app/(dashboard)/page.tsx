'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { metrics, loading } = useDashboardMetrics()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const formatPercentage = (value: number) => {
    const prefix = value > 0 ? '+' : ''
    return `${prefix}${value.toFixed(1)}%`
  }

  const stats = [
    {
      title: "Faturamento Total",
      value: formatCurrency(metrics.totalRevenue),
      icon: DollarSign,
      change: `${formatPercentage(metrics.revenueChange)} do último mês`,
      loading: loading,
    },
    {
      title: "Vendas",
      value: formatNumber(metrics.totalSales),
      icon: ShoppingCart,
      change: `${formatPercentage(metrics.salesChange)} do último mês`,
      loading: loading,
    },
    {
      title: "Ticket Médio",
      value: formatCurrency(metrics.averageTicket),
      icon: TrendingUp,
      change: `${formatPercentage(metrics.ticketChange)} do último mês`,
      loading: loading,
    },
    {
      title: "Afiliados Ativos",
      value: formatNumber(metrics.totalAffiliates),
      icon: Users,
      change: `${formatPercentage(metrics.affiliatesChange)} do último mês`,
      loading: loading,
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-[#1A1920] border-[#2A2833] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              {stat.loading ? (
                <>
                  <Skeleton className="h-8 w-32 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-400">{stat.change}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card className="bg-[#1A1920] border-[#2A2833] text-white">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-gray-400">Gráfico de vendas aparecerá aqui.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}