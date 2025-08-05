# Status da Implementação do Webhook CartPanda

## 📅 Data: 05/08/2025

## 🚦 Status Atual

### ✅ O que está pronto:
1. **Banco de Dados**: Tabela `sales` criada no Supabase com RLS habilitado
2. **API Backend**: FastAPI funcionando e testada localmente
3. **Conexão**: Webhook salvando dados no Supabase com sucesso
4. **Ferramentas**: Python 3.11, Vercel CLI instalados

### 🔄 Onde estamos agora:
- Backend mantido localmente (não será commitado no GitHub)
- Backend será deployado no Google Cloud Run futuramente
- Frontend deployado no Vercel e conectado ao Supabase ✅
- Dashboard e página de vendas exibindo dados reais ✅
- Próximo passo: Deploy do backend e configurar webhook na CartPanda

## 🚀 Próximos Passos

### 1. Deploy da API (Google Cloud Run - FUTURO)

**⚠️ NOTA**: O deploy do backend será feito no Google Cloud Run em um projeto separado. Por enquanto, continue usando localmente.

```bash
# Para desenvolvimento local:
cd /Users/leonardoribeirofiore/Documents/Projetos/XMXSystem/backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**Credenciais para usar no futuro deploy:**
- SUPABASE_URL: `https://sclscnnfdeoylftoxmzf.supabase.co`
- SUPABASE_KEY: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbHNjbm5mZGVveWxmdG94bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjA1NzIsImV4cCI6MjA2OTkzNjU3Mn0.u_5s0g92PgGPuMvCr_pLAbz58Cc8M-4pCdvS46K7NO4`
- CARTPANDA_WEBHOOK_SECRET: Definir no momento do deploy
- ENVIRONMENT: `production`

### 2. Integrar Frontend com Supabase (FAZENDO AGORA)

#### 2.1 Instalar Cliente Supabase
```bash
cd /Users/leonardoribeirofiore/Documents/Projetos/XMXSystem/frontend
pnpm add @supabase/supabase-js
```

#### 2.2 Configurar Variáveis de Ambiente
```bash
# Criar ou atualizar .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=https://sclscnnfdeoylftoxmzf.supabase.co" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbHNjbm5mZGVveWxmdG94bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjA1NzIsImV4cCI6MjA2OTkzNjU3Mn0.u_5s0g92PgGPuMvCr_pLAbz58Cc8M-4pCdvS46K7NO4" >> .env.local
```

#### 2.3 Criar Cliente Supabase
Criar arquivo `frontend/lib/supabase.ts`:
```typescript
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
```

#### 2.4 Criar Hook para Vendas
Criar arquivo `frontend/hooks/use-sales.ts`:
```typescript
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
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      setSales(data || [])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sales, loading, error, refetch: fetchSales }
}
```

#### 2.5 Hook para Dashboard Metrics
Criar arquivo `frontend/hooks/use-dashboard-metrics.ts`:
```typescript
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
        const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.price), 0)
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
```

#### 2.6 Atualizar Páginas

**Dashboard Principal** (`frontend/app/(dashboard)/page.tsx`):
- Importar e usar `useDashboardMetrics()`
- Substituir dados mockados pelos dados reais

**Página de Vendas** (`frontend/app/(dashboard)/sales/page.tsx`):
- Importar e usar `useSales()`
- Mapear dados reais para a tabela
- Adicionar loading e error states

**Página de Afiliados** (`frontend/app/(dashboard)/affiliates/page.tsx`):
- Criar hook similar para afiliados
- Agrupar vendas por affiliate_code
- Calcular comissões totais

#### 2.7 Testar Integração

1. Reiniciar o servidor Next.js:
```bash
cd frontend && pnpm dev
```

2. Verificar no console do navegador:
- Sem erros de conexão Supabase
- Dados sendo carregados

3. Criar venda de teste via backend:
```bash
cd backend && source venv/bin/activate && python test_webhook.py
```

4. Verificar se a venda aparece em tempo real no dashboard

### 3. Configurar Webhook na CartPanda (AGUARDAR DEPLOY)

**⚠️ NOTA**: A configuração do webhook será feita após o deploy no Google Cloud Run.

1. Acessar https://app.cartpanda.com
2. Configurações > Webhooks > Adicionar
3. URL: `https://[SEU-PROJETO].run.app/webhook/cartpanda` (será definida após deploy)
4. Secret: (mesmo configurado no Cloud Run)
5. Eventos: Venda Aprovada, Reembolsada, Cancelada

## 📋 Checklist Rápido

- [x] Frontend conectado ao Supabase ✅
- [ ] Deploy do backend no Google Cloud Run (PRÓXIMO)
- [ ] Webhook configurado na CartPanda (APÓS DEPLOY)
- [ ] Teste com venda real (APÓS TUDO CONFIGURADO)

## 🆘 Troubleshooting

**Erro no deploy?**
```bash
cd backend && pip freeze > requirements.txt
```

**Webhook não funciona?**
- Verificar secret está igual no Cloud Run e CartPanda
- Ver logs no Google Cloud Console

**Dados não aparecem?**
- Verificar .env.local do frontend
- Testar query direto no Supabase

## 📊 Comandos Úteis

```bash
# Testar API localmente
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Rodar frontend localmente
cd frontend && pnpm dev

# Ver vendas no Supabase (SQL Editor)
SELECT * FROM sales ORDER BY created_at DESC LIMIT 5;
```

## 🔗 Links

- Supabase: https://supabase.com/dashboard/project/sclscnnfdeoylftoxmzf
- Tabela Sales: https://supabase.com/dashboard/project/sclscnnfdeoylftoxmzf/editor/sales
- Frontend (Vercel): https://xmx-system.vercel.app