"use client"

import { useState } from "react"
import { CalendarIcon, Search, Filter } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

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

const salesData = [
  {
    id: 1,
    buyerName: "Ana Souza",
    product: "Produto Alpha",
    date: "2024-07-20",
    platform: "CartPanda",
    value: 199.9,
    status: "Completo",
  },
  {
    id: 2,
    buyerName: "Bruno Lima",
    product: "Produto Beta",
    date: "2024-07-20",
    platform: "BuyGoods",
    value: 249.0,
    status: "Completo",
  },
  {
    id: 3,
    buyerName: "Carla Dias",
    product: "Produto Gamma",
    date: "2024-07-19",
    platform: "ClickBank",
    value: 99.5,
    status: "Pendente",
  },
  {
    id: 4,
    buyerName: "Daniel Alves",
    product: "Produto Alpha",
    date: "2024-07-19",
    platform: "CartPanda",
    value: 199.9,
    status: "Reembolsado",
  },
  {
    id: 5,
    buyerName: "Eduarda Costa",
    product: "Produto Delta",
    date: "2024-07-18",
    platform: "BuyGoods",
    value: 399.0,
    status: "Completo",
  },
]

export default function SalesPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: addDays(new Date(2024, 6, 20), 20),
  })

  const platforms = ["CartPanda", "BuyGoods", "ClickBank"]
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(platforms)

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vendas</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Pesquisar por produto ou comprador..."
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto bg-[#1A1920] border-[#2A2833] hover:bg-[#2A2833] hover:text-white"
            >
              <Filter className="mr-2 h-4 w-4" /> Plataforma
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1A1920] border-[#2A2833] text-white">
            <DropdownMenuLabel>Filtrar por plataforma</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2A2833]" />
            {platforms.map((platform) => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => handlePlatformChange(platform)}
              >
                {platform}
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
                <TableHead className="text-white hidden sm:table-cell">Nome</TableHead>
                <TableHead className="text-white">Produto</TableHead>
                <TableHead className="text-white hidden md:table-cell">Data</TableHead>
                <TableHead className="text-white hidden lg:table-cell">Plataforma</TableHead>
                <TableHead className="text-white">Valor</TableHead>
                <TableHead className="text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id} className="border-b-[#2A2833] hover:bg-[#2A2833]/50">
                  <TableCell className="font-medium text-gray-100 hidden sm:table-cell">{sale.buyerName}</TableCell>
                  <TableCell className="font-medium text-gray-100">{sale.product}</TableCell>
                  <TableCell className="hidden md:table-cell text-gray-300">{sale.date}</TableCell>
                  <TableCell className="hidden lg:table-cell text-gray-300">{sale.platform}</TableCell>
                  <TableCell className="text-gray-300">R$ {sale.value.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sale.status === "Completo"
                          ? "default"
                          : sale.status === "Pendente"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        sale.status === "Completo"
                          ? "bg-green-600/80 text-white"
                          : sale.status === "Pendente"
                            ? "bg-yellow-500/80 text-black"
                            : "bg-red-600/80 text-white"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
