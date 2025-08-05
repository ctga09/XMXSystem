"use client"

import { useState } from "react"
import { CalendarIcon, Search } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const affiliatesData = [
  { id: 1, name: "João Silva", sales: 150, revenue: 25000.0, refunds: 1200.5, avatar: "/placeholder-user.jpg" },
  { id: 2, name: "Maria Oliveira", sales: 120, revenue: 21500.0, refunds: 800.0, avatar: "/placeholder-user.jpg" },
  { id: 3, name: "Carlos Pereira", sales: 95, revenue: 18000.0, refunds: 550.75, avatar: "/placeholder-user.jpg" },
  { id: 4, name: "Ana Costa", sales: 210, revenue: 35000.0, refunds: 2100.0, avatar: "/placeholder-user.jpg" },
  { id: 5, name: "Pedro Martins", sales: 80, revenue: 15000.0, refunds: 300.0, avatar: "/placeholder-user.jpg" },
]

export default function AffiliatesPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: addDays(new Date(2024, 6, 20), 20),
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Afiliados</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Pesquisar por afiliado..."
            className="pl-8 w-full bg-[#1A1920] border-[#2A2833]"
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
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
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
      </div>
      <Card className="bg-[#1A1920] border-[#2A2833]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b-[#2A2833] hover:bg-transparent">
                <TableHead className="text-white">Afiliado</TableHead>
                <TableHead className="text-white hidden md:table-cell">Vendas</TableHead>
                <TableHead className="text-white hidden lg:table-cell">Faturamento</TableHead>
                <TableHead className="text-white">Reembolso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliatesData.map((affiliate) => (
                <TableRow key={affiliate.id} className="border-b-[#2A2833] hover:bg-[#2A2833]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={affiliate.avatar || "/placeholder.svg"} alt={affiliate.name} />
                        <AvatarFallback>{affiliate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-100">{affiliate.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-300">{affiliate.sales}</TableCell>
                  <TableCell className="hidden lg:table-cell text-gray-300">
                    R$ {affiliate.revenue.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-red-400">R$ {affiliate.refunds.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
