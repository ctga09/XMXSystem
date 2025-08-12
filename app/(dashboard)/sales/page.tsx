"use client"

import { useState, useMemo, useEffect } from "react"
import { CalendarIcon, Search, Filter } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useSales } from "@/hooks/use-sales"

export default function SalesPage() {
  const { sales, loading, error } = useSales()
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<DateRange | undefined>()
  
  // Extrair métodos de pagamento únicos
  const paymentMethods = useMemo(() => {
    const methods = new Set(sales.map(sale => sale.payment_method))
    return Array.from(methods)
  }, [sales])
  
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

  // Inicializar selectedMethods com todos os métodos quando carregados
  useEffect(() => {
    if (paymentMethods.length > 0 && selectedMethods.length === 0) {
      setSelectedMethods(paymentMethods)
    }
  }, [paymentMethods])

  const handleMethodChange = (method: string) => {
    setSelectedMethods((prev) => 
      prev.includes(method) 
        ? prev.filter((m) => m !== method) 
        : [...prev, method]
    )
  }

  // Filtrar vendas
  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      // Filtro de busca
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!sale.customer_name.toLowerCase().includes(query) && 
            !sale.product_name.toLowerCase().includes(query) &&
            !sale.customer_email.toLowerCase().includes(query)) {
          return false
        }
      }

      // Filtro de data
      if (date?.from || date?.to) {
        const saleDate = new Date(sale.created_at)
        if (date.from && saleDate < date.from) return false
        if (date.to && saleDate > date.to) return false
      }

      // Filtro de método de pagamento (se nenhum selecionado, mostra todos)
      if (selectedMethods.length > 0 && !selectedMethods.includes(sale.payment_method)) {
        return false
      }

      return true
    })
  }, [sales, searchQuery, date, selectedMethods])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600/80 text-white">Aprovado</Badge>
      case 'refunded':
        return <Badge className="bg-red-600/80 text-white">Reembolsado</Badge>
      case 'cancelled':
        return <Badge className="bg-gray-600/80 text-white">Cancelado</Badge>
      default:
        return <Badge className="bg-yellow-500/80 text-black">Pendente</Badge>
    }
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Erro ao carregar vendas: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vendas</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Pesquisar por produto, comprador ou email..."
            className="pl-8 w-full bg-[#1A1920] border-[#2A2833]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full md:w-auto justify-start text-left font-normal bg-[#1A1920] border-[#2A2833] hover:bg-[#2A2833] hover:text-white"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yy")} - {format(date.to, "dd/MM/yy")}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy")
                )
              ) : (
                <span>Selecione a data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1A1920] border-[#2A2833] text-white" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto bg-[#1A1920] border-[#2A2833] hover:bg-[#2A2833] hover:text-white"
            >
              <Filter className="mr-2 h-4 w-4" /> Pagamento
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1A1920] border-[#2A2833] text-white">
            <DropdownMenuLabel>Filtrar por método</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2A2833]" />
            {paymentMethods.map((method) => (
              <DropdownMenuCheckboxItem
                key={method}
                checked={selectedMethods.includes(method)}
                onCheckedChange={() => handleMethodChange(method)}
              >
                {method}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className="bg-[#1A1920] border-[#2A2833]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b-[#2A2833] hover:bg-transparent">
                <TableHead className="text-white">Cliente</TableHead>
                <TableHead className="text-white">Produto</TableHead>
                <TableHead className="text-white hidden md:table-cell">Data</TableHead>
                <TableHead className="text-white hidden lg:table-cell">Afiliado</TableHead>
                <TableHead className="text-white">Valor</TableHead>
                <TableHead className="text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-[#2A2833]">
                    <TableCell><Skeleton className="h-4 w-32 bg-gray-700" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40 bg-gray-700" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24 bg-gray-700" /></TableCell>
                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-20 bg-gray-700" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20 bg-gray-700" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 bg-gray-700" /></TableCell>
                  </TableRow>
                ))
              ) : filteredSales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    Nenhuma venda encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredSales.map((sale) => (
                  <TableRow key={sale.id} className="border-b-[#2A2833] hover:bg-[#2A2833]/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-100">{sale.customer_name}</p>
                        <p className="text-sm text-gray-400">{sale.customer_email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-100">{sale.product_name}</TableCell>
                    <TableCell className="hidden md:table-cell text-gray-300">
                      {formatDate(sale.created_at)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-300">
                      {sale.affiliate_name || '-'}
                    </TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(sale.price)}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-4 text-sm text-gray-400">
        {loading ? (
          <Skeleton className="h-4 w-48 bg-gray-700" />
        ) : (
          <p>Total de {filteredSales.length} vendas encontradas</p>
        )}
      </div>
    </div>
  )
}