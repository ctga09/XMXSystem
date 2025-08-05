import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Faturamento Total",
      value: "R$ 1.234.567,89",
      icon: DollarSign,
      change: "+20.1% do último mês",
    },
    {
      title: "Vendas",
      value: "+12.345",
      icon: ShoppingCart,
      change: "+15.2% do último mês",
    },
    {
      title: "Gasto Total",
      value: "R$ 345.678,90",
      icon: TrendingUp,
      change: "+5.5% do último mês",
    },
    {
      title: "Novos Afiliados",
      value: "+234",
      icon: Users,
      change: "+30 desde ontem",
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
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-400">{stat.change}</p>
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
